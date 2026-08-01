# Mein Budget

Eine lokale, mobile Haushaltsbuch-App mit automatischer Gehaltsverteilung, Budgettöpfen, Ausgaben, Fixkosten und Kategorien.

## Starten

Die Datei `index.html` in einem Browser öffnen. Für die Installation auf einem Smartphone sollte die App später über GitHub Pages oder einen anderen HTTPS-Webhost bereitgestellt werden.

## Speicherung

Alle Daten werden in dieser ersten Version ausschließlich im Browser gespeichert. Sie verlassen das Gerät nicht. Eine Anmeldung und Synchronisierung können später ergänzt werden.

## Sicherung und Export

Unter **Einstellungen → Datensicherung** lassen sich alle Daten als JSON-Backup speichern und später wieder laden. Für Excel gibt es zusätzlich einen CSV-Export aller Buchungen. Belege werden lokal als Teil des Backups gesichert.

## Updates veröffentlichen

Bei jeder Veröffentlichung die Versionsnummer in `app.js` und `version.json` gemeinsam erhöhen, zum Beispiel von `1.2.0` auf `1.3.0`. Die App prüft beim Start die Datei `version.json` und zeigt bei einer neueren Version einen Aktualisieren-Button an.
