/* Öffentliche Firebase-Konfiguration für die Push-Anmeldung.
   Sie enthält keine Server-Schlüssel und keine Haushaltsdaten. */
globalThis.MEIN_BUDGET_FIREBASE_CONFIG = Object.freeze({
  enabled: true,
  apiKey: 'AIzaSyBeXuSL1RQBdulUUFIyXaWWb2sULS0W38o',
  authDomain: 'kulturverein-ec831.firebaseapp.com',
  projectId: 'kulturverein-ec831',
  storageBucket: 'kulturverein-ec831.firebasestorage.app',
  messagingSenderId: '801254533597',
  appId: '1:801254533597:web:07ba454bed0e512de62e34',
  vapidKey: 'BNZeaeZHBnnt7wvcdxlJG6rSOQCnxla1JLFA1icciRbYjSscF_VlCqkWZnK9HYhYrMltTGaq-KO1sC4YvW5V4Ak',
  endpoint: 'https://europe-west3-kulturverein-ec831.cloudfunctions.net/budgetPush'
});
