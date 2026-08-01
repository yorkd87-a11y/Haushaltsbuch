const CACHE = 'mein-budget-v41';
const FILES = [
  './', './index.html', './styles.css?v=1.14.3', './app.js?v=1.14.3',
  './firebase-push-config.js?v=1.14.3', './firebase-push.js?v=1.14.3',
  './manifest.webmanifest?v=1.14.3', './budget-app-icon.jpg?v=1.14.3'
];

self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('message', event => { if (event.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('/version.json')) { event.respondWith(fetch(event.request, { cache: 'no-store' })); return; }
  event.respondWith(fetch(event.request, { cache: 'no-store' }).then(response => { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response; }).catch(() => caches.match(event.request)));
});

try {
  importScripts('./firebase-push-config.js', 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js', 'https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js');
  if (self.MEIN_BUDGET_FIREBASE_CONFIG?.enabled) {
    firebase.initializeApp(self.MEIN_BUDGET_FIREBASE_CONFIG);
    firebase.messaging().onBackgroundMessage(payload => {
      const title = payload.data?.title || 'Mein Budget';
      const body = payload.data?.body || 'Hast du heute schon deine Ausgaben eingetragen?';
      return self.registration.showNotification(title, { body, tag: 'mein-budget-daily-reminder', data: { url: payload.data?.url || './' } });
    });
  }
} catch (error) { console.warn('Firebase Push konnte nicht vorbereitet werden.', error); }

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || './';
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => { const existing = clients.find(client => 'focus' in client); return existing ? existing.focus() : self.clients.openWindow(url); }));
});
