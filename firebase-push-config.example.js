/*
  Vorbereitung für echte Hintergrund-Push-Nachrichten.

  Diese Datei enthält absichtlich keine Zugangsdaten und wird aktuell nicht geladen.
  Beim Firebase-Anschluss wird daraus eine lokale, nicht versionierte Datei
  firebase-push-config.js. Die private Server-Konfiguration gehört niemals in
  die Web-App oder nach GitHub.

  Benötigt werden später:
  1. Firebase-Projekt mit Cloud Messaging
  2. öffentliche Web-Konfiguration und VAPID Public Key
  3. ein sicherer Server/Cloud Function, der abends Pushs versendet
  4. eine Speicherung der Push-Anmeldung pro Gerät
*/

window.MEIN_BUDGET_FIREBASE_CONFIG = {
  enabled: false,
  apiKey: 'DEINE_PUBLIC_API_KEY',
  authDomain: 'DEIN_PROJEKT.firebaseapp.com',
  projectId: 'DEIN_PROJEKT_ID',
  messagingSenderId: 'DEINE_SENDER_ID',
  appId: 'DEINE_APP_ID',
  vapidKey: 'DEIN_PUBLIC_VAPID_KEY'
};
