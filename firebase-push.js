import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getMessaging, getToken, isSupported, onMessage } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging.js';

const config = globalThis.MEIN_BUDGET_FIREBASE_CONFIG;
const deviceKey = 'mein-budget-push-device';
const appUrl = 'https://yorkd87-a11y.github.io/Haushaltsbuch/';
let messaging = null;

const readDevice = () => {
  try { return JSON.parse(localStorage.getItem(deviceKey) || 'null'); } catch { return null; }
};
const writeDevice = data => localStorage.setItem(deviceKey, JSON.stringify(data));

async function setupMessaging() {
  if (!config?.enabled || !(await isSupported())) throw new Error('unsupported');
  if (!messaging) {
    messaging = getMessaging(initializeApp(config));
    onMessage(messaging, async payload => {
      const title = payload.data?.title || 'Mein Budget';
      const body = payload.data?.body || 'Hast du heute schon deine Ausgaben eingetragen?';
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, { body, tag: 'mein-budget-daily-reminder', data: { url: appUrl } });
    });
  }
  return messaging;
}

async function getPushToken() {
  if (!('Notification' in window)) throw new Error('unsupported');
  if (Notification.permission !== 'granted') {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('permission');
  }
  const registration = await navigator.serviceWorker.ready;
  const client = await setupMessaging();
  const token = await getToken(client, { vapidKey: config.vapidKey, serviceWorkerRegistration: registration });
  if (!token) throw new Error('token');
  return token;
}

async function callServer(action, payload) {
  const response = await fetch(config.endpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) throw new Error(data.error || 'server');
  return data;
}

async function configure(settings) {
  const token = await getPushToken();
  const current = readDevice();
  const payload = { token, settings: { enabled: Boolean(settings.enabled), time: settings.time || '20:00', message: settings.message || '', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Berlin' } };
  if (current?.deviceId && current?.secret) {
    await callServer('configure', { ...payload, ...current });
  } else {
    const created = await callServer('register', payload);
    writeDevice({ deviceId: created.deviceId, secret: created.secret });
  }
  return true;
}

async function scheduleTest(settings) {
  await configure({ ...settings, enabled: true });
  const device = readDevice();
  await callServer('test', { ...device });
  return true;
}

globalThis.MeinBudgetPush = { available: Boolean(config?.enabled), configure, scheduleTest };
