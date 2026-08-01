# Mein Budget

Eine lokale, mobile Haushaltsbuch-App mit automatischer Gehaltsverteilung, Budgettöpfen, Ausgaben, Fixkosten und Kategorien.

## Starten

Die Datei `index.html` in einem Browser öffnen. Für die Installation auf einem Smartphone sollte die App später über GitHub Pages oder einen anderen HTTPS-Webhost bereitgestellt werden.

## Bedienung am Smartphone

Unterhalb von 680 px Breite schaltet die App auf ein eigenes Layout um:

- Untere Navigationsleiste mit allen fünf Bereichen, dazu ein schwebender Plus-Knopf unten rechts.
- Der Plus-Knopf klappt die Shortcuts auf, darunter steht **Andere Ausgabe** für die manuelle Eingabe. Das Eingabefenster schwebt danach von unten herein. Auf dem Desktop bleiben die Shortcuts als sichtbare Reihe auf der Übersicht.
- Auf der Übersicht ist der blaue Block der Kopf der Seite: Datum, „Guthaben für Lebenshaltung“ als große Zahl mit einem Statusbalken darunter (voll bis leer, je nach Budgetziel des Lebenshaltungskontos), darunter mit Abstand das Tagesbudget. Die Topbar mit dem Seitentitel entfällt dort; auf allen anderen Seiten bleibt sie.
- Die Rechnung hinter dem Tagesbudget (Tage × 30 € abzüglich Ausgaben) steht nur noch im Tooltip des Blocks.
- Ist ein Backup fällig (14 Tage oder älter, oder noch nie gesichert), erscheint oben rechts im Kopf ein Ausrufezeichen. Ein Klick öffnet die Optionen „Backup laden“ und „Backup speichern“.
- Der restliche Übersicht-Body ist ein wischbarer Slider mit acht Folien: Letzte Buchungen (10, neueste oben), Budget im Blick (Töpfe), Ausgaben nach Tags, Ausgaben nach Kategorie, Ausgabenverlauf (Balken je Tag im Monat), Sparziele, Monatsabschluss und Vergangene Gehaltszeiträume. Punkte darunter zeigen die Position und sind antippbar. Auf dem Desktop bleibt stattdessen die bekannte Kachel-/Panel-Ansicht.
- Die Übersicht ist dabei ein starrer Bildschirm: Kopf und untere Navigation stehen fest, die Seite selbst lässt sich nicht scrollen. Nur der Slider ist wischbar; hat eine einzelne Folie mehr Inhalt als Platz (z. B. viele Buchungen), scrollt nur diese Folie intern. Alle anderen Seiten (Buchungen, Fixkosten, Kategorien, Einstellungen) scrollen weiterhin normal.
- Die Abschnitte auf Einstellungen sind eingeklappt und lassen sich einzeln öffnen; ab Tablet-Breite stehen sie dauerhaft offen.
- Die Filter der Buchungsliste liegen hinter dem Knopf **Filter**, der die Anzahl aktiver Filter anzeigt.
- Buchungen werden über **⋯** bearbeitet; gelöscht wird im Bearbeiten-Dialog, damit ein Fehltipp keine Buchung vernichtet.
- Dialoge erscheinen als Bottom-Sheet und berücksichtigen Notch und Home-Indikator.

Alle Regeln dazu stehen gesammelt am Ende von `styles.css` im Abschnitt `MOBILANSICHT`.

## Speicherung

Alle Daten werden in dieser ersten Version ausschließlich im Browser gespeichert. Sie verlassen das Gerät nicht. Eine Anmeldung und Synchronisierung können später ergänzt werden.

## Sicherung und Export

Unter **Einstellungen → Datensicherung** lassen sich alle Daten als JSON-Backup speichern und später wieder laden. Für Excel gibt es zusätzlich einen CSV-Export aller Buchungen. Belege werden lokal als Teil des Backups gesichert.

## Updates veröffentlichen

Bei jeder Veröffentlichung die Versionsnummer in `app.js` und `version.json` gemeinsam erhöhen, zum Beispiel von `1.2.0` auf `1.3.0`. Die App prüft beim Start die Datei `version.json` und zeigt bei einer neueren Version einen Aktualisieren-Button an.
