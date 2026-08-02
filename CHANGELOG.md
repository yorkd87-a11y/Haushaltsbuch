# Changelog – Mein Budget

## Version 1.14.5 · 2. August 2026

### Einnahmen ohne Gehaltsverteilung

- Einnahmen können jetzt als **einmalige Einnahme oder Guthaben** erfasst werden.
- Dafür wird ein Budgettopf gewählt, dem der Betrag direkt gutgeschrieben wird.
- Diese Buchung verändert weder den Gehaltszeitraum noch die automatischen Verteilungsregeln.
- Der bisherige Gehalt-Button heißt nun **„Einnahme“** und bietet beide Möglichkeiten in einem klaren Eingabefenster.

### Stabile Betragseingabe

- Ausgaben akzeptieren jetzt zuverlässig Eingaben wie `65`, `65,50` oder `65.50`.
- Die automatische Formatierung erfolgt erst nach der Eingabe, damit der Cursor auf dem Smartphone nicht mehr springt und Beträge nicht falsch als Tausenderwert gespeichert werden.

## Version 1.14.3 · 1. August 2026

Heute wurde die App gemeinsam umfassend weiterentwickelt – von der mobilen Oberfläche bis zu echten Hintergrund-Erinnerungen.

### Oberfläche & Bedienung

- Die Seiten **Übersicht, Buchungen, Fixkosten, Kategorien und Mehr** wurden optisch vereinheitlicht und für das Smartphone aufgeräumt.
- Auf allen Hauptseiten gibt es nun einen einheitlichen Plus-Button für die passenden Aktionen.
- Die Eingabe für Ausgaben ist als übersichtliches Vollbild-Fenster mit großem Betragsfeld, Schnellwahlen, Zwei-Spalten-Layout und Tag-Auswahl gestaltet.
- Karten, Überschriften, Abstände und mobile Safe-Areas wurden für iPhones nachgebessert.
- Das App-Icon für den Home-Bildschirm wurde ergänzt.
- Rückmeldehinweise verschwinden nun zuverlässig vollständig vom Bildschirm.

### Buchungen & Budget

- Buchungen werden auf Übersicht und Buchungsseite immer mit den neuesten Einträgen zuerst angezeigt.
- Ausgaben lassen sich bearbeiten; Kategorien, Tags und Zahlkonten können verwendet und gefiltert werden.
- Für den Gehaltseingang und die Einrichtung zeigt die App nun, wie viel Geld noch zur Verteilung verfügbar ist.
- Der Restbetrag eines Gehalts kann auf jeden vorhandenen Budgettopf verteilt werden.
- Das Tagesbudget wird aus dem Lebenshaltungs-Topf berechnet und ist in den Verteilungsregeln anpassbar.

### Einführung für neue Nutzer

- Die neue Einführung führt durch Grundgehalt, Budgetverteilung, ersten Geldeingang, Tagesbudget, Fixkosten und Schnellwahlen.
- Fixkosten und Shortcuts können während der Einrichtung mehrfach angelegt werden.
- Standard-Fixkosten werden bei einem neuen Start nicht mehr fälschlich übernommen.
- Am Ende fragt die Einführung nun freiwillig nach einer abendlichen Push-Erinnerung.
- Bei „Jetzt nicht“ erscheint nach 30 Tagen ein freundlicher erneuter Hinweis in der App.

### Erinnerungen & Push-Benachrichtigungen

- Echte Web-Push-Benachrichtigungen über Firebase sind eingerichtet.
- Die Push-Anmeldung, Nachricht und Uhrzeit werden sicher getrennt von den Haushaltsdaten verwaltet; Buchungen bleiben lokal auf dem Gerät.
- Die Erinnerung kann unter **Mehr → Tägliche Erinnerung** aktiviert, angepasst und getestet werden.
- Der Zwei-Minuten-Test funktioniert auch bei gesperrtem Bildschirm bzw. wenn die installierte App im Hintergrund ist.

### PWA, Updates & Sicherheit

- Die App erkennt neue Versionen zuverlässiger und kann sich als installierte Web-App aktualisieren.
- Hinweise zum Hinzufügen auf den Home-Bildschirm wurden vereinfacht und klarer formuliert.
- Backup-Erinnerung sowie Backup-Export und -Import stehen bereit.

### Technik

- Firebase-Projekt „Kulturverein“ wird für die Push-Infrastruktur mit einer getrennten Haushaltsbuch-Web-App genutzt.
- Zwei serverseitige Funktionen übernehmen die sichere Push-Anmeldung und die zeitgesteuerte Zustellung.
- App-Version auf **1.14.3** erhöht.
