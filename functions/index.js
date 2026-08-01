const { onRequest } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { setGlobalOptions } = require('firebase-functions/v2/options');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const crypto = require('crypto');

admin.initializeApp();
setGlobalOptions({ region: 'europe-west3', maxInstances: 3 });

const db = admin.firestore();
const devices = db.collection('meinBudgetPushDevices');
const appUrl = 'https://yorkd87-a11y.github.io/Haushaltsbuch/';
const allowedOrigins = new Set(['https://yorkd87-a11y.github.io', 'http://127.0.0.1:5500', 'http://localhost:5500']);

const cleanText = value => String(value || '').trim().slice(0, 180);
const cleanTime = value => /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value)) ? String(value) : '20:00';
function timingSafeEqual(left, right) {
  const a = Buffer.from(String(left || ''));
  const b = Buffer.from(String(right || ''));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function settingsFrom(value = {}) {
  return {
    enabled: Boolean(value.enabled),
    time: cleanTime(value.time),
    message: cleanText(value.message) || 'Hast du heute schon deine Ausgaben eingetragen?',
    timeZone: cleanText(value.timeZone) || 'Europe/Berlin'
  };
}
async function authenticatedDevice(deviceId, secret) {
  const ref = devices.doc(String(deviceId || ''));
  const snapshot = await ref.get();
  if (!snapshot.exists || !timingSafeEqual(snapshot.get('secret'), secret)) {
    const error = new Error('unauthorized'); error.status = 401; throw error;
  }
  return { ref, data: snapshot.data() };
}
function localClock(timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const value = Object.fromEntries(parts.filter(part => part.type !== 'literal').map(part => [part.type, part.value]));
  return { date: `${value.year}-${value.month}-${value.day}`, time: `${value.hour}:${value.minute}` };
}
async function sendPush(data, title = 'Mein Budget') {
  return admin.messaging().send({
    token: data.token,
    data: { title, body: data.message, url: appUrl },
    webpush: {
      headers: { Urgency: 'high' },
      fcmOptions: { link: appUrl }
    }
  });
}

exports.budgetPush = onRequest({ cors: [...allowedOrigins] }, async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
    const { action, token, deviceId, secret, settings } = req.body || {};
    if (action === 'register') {
      if (typeof token !== 'string' || token.length < 40) return res.status(400).json({ ok: false, error: 'token' });
      const ref = devices.doc();
      const deviceSecret = crypto.randomBytes(32).toString('base64url');
      await ref.set({ token, secret: deviceSecret, ...settingsFrom(settings), createdAt: admin.firestore.FieldValue.serverTimestamp(), updatedAt: admin.firestore.FieldValue.serverTimestamp() });
      return res.json({ ok: true, deviceId: ref.id, secret: deviceSecret });
    }
    const device = await authenticatedDevice(deviceId, secret);
    if (action === 'configure') {
      const next = settingsFrom(settings);
      const update = { ...next, updatedAt: admin.firestore.FieldValue.serverTimestamp() };
      if (typeof token === 'string' && token.length >= 40) update.token = token;
      await device.ref.update(update);
      return res.json({ ok: true });
    }
    if (action === 'test') {
      await device.ref.update({ testAt: admin.firestore.Timestamp.fromMillis(Date.now() + 120000), updatedAt: admin.firestore.FieldValue.serverTimestamp() });
      return res.json({ ok: true });
    }
    return res.status(400).json({ ok: false, error: 'action' });
  } catch (error) {
    logger.warn('Budget push request rejected', error);
    return res.status(error.status || 500).json({ ok: false, error: error.message || 'server' });
  }
});

exports.budgetPushTicker = onSchedule('* * * * *', async () => {
  const now = admin.firestore.Timestamp.now();
  const snapshot = await devices.where('enabled', '==', true).get();
  for (const document of snapshot.docs) {
    const data = document.data();
    const clock = localClock(data.timeZone || 'Europe/Berlin');
    const testDue = data.testAt && data.testAt.toMillis() <= now.toMillis();
    const dailyDue = data.time === clock.time && data.lastDailyDate !== clock.date;
    if (!testDue && !dailyDue) continue;
    try {
      await sendPush(data, testDue ? 'Mein Budget – Test' : 'Mein Budget');
      const update = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
      if (testDue) update.testAt = admin.firestore.FieldValue.delete();
      if (dailyDue) update.lastDailyDate = clock.date;
      await document.ref.update(update);
    } catch (error) {
      logger.warn('Budget push could not be delivered', { code: error.code });
      if (['messaging/registration-token-not-registered', 'messaging/invalid-registration-token'].includes(error.code)) await document.ref.delete();
    }
  }
});
