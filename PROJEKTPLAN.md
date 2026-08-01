# Projektplan: Haushaltsbuch-App

## Ziel

Eine persönliche, mobil nutzbare Haushaltsbuch-Web-App. Sie soll Gehaltseingänge automatisch auf vier Budgettöpfe verteilen, laufende und einmalige Ausgaben erfassen und die finanzielle Entwicklung übersichtlich auswerten. Der Code wird später auf GitHub versioniert und kann als Web-App auf dem Smartphone verwendet werden.

## 1. Funktionsumfang der ersten Version

### Gehalt und automatische Verteilung

- Eingabefeld **„Gehalt hinzufügen“** für einen frei wählbaren Betrag und ein Datum.
- Beim Speichern wird der Betrag automatisch nach einem anpassbaren Verteilungsschlüssel aufgeteilt:
  - Sparen / Aktienportfolio: 500 €
  - Lebenshaltungskosten: 930 €
  - Gemeinkosten: 1.000 €
  - Kleidung: 100 €
- Da das Einkommen schwankt, wird zunächst mit festen Zielbeträgen gearbeitet. Reicht ein Gehaltseingang nicht aus, zeigt die App transparent an, welche Töpfe vollständig bzw. anteilig gefüllt wurden.
- In den Einstellungen kann später gewählt werden, ob die Aufteilung mit festen Beträgen oder Prozentwerten erfolgt.

### Konten und Budgets

- Vier Budgetkonten mit aktuellem Stand, Monatsbudget und verbleibendem Betrag:
  - Sparen / Aktienportfolio
  - Lebenshaltungskosten
  - Gemeinkosten
  - Kleidung
- Alle Konten können vom Nutzer umbenannt, ergänzt, bearbeitet oder deaktiviert werden.
- Jede Buchung wird in einer Historie gespeichert; Kontostände werden daraus berechnet.

### Ausgaben und Einnahmen

- Ausgaben mit Betrag, Datum, Konto, Kategorie, Symbol, Notiz und optionalem Foto/Beleg.
- Einnahmen können zusätzlich zum Gehalt erfasst werden.
- Für das Lebenshaltungskonto wird jede Ausgabe direkt vom verfügbaren Monatsbudget abgezogen.
- Buchungen können nachträglich bearbeitet oder gelöscht werden.

### Wiederkehrende Gemeinkosten

- Wiederkehrende Ausgaben anlegen, z. B. Miete, Telefon, Streaming oder ChatGPT.
- Felder: Name, Betrag, Kategorie, Symbol, Fälligkeitstag, Intervall und aktiv/inaktiv.
- Die App erzeugt jeden Monat die passende Buchung oder zeigt sie als fällig zur Bestätigung an.
- Wiederkehrende Posten sind jederzeit anpassbar oder löschbar.

### Kategorien und Symbole

- Standardkategorien, z. B. Wohnen (Haus), Strom (Blitz), Telefon (Smartphone), Lebensmittel (Einkaufswagen), Mobilität (Auto), Kleidung (T-Shirt), Sparen (Diagramm).
- Eigene Kategorien mit Name, Farbe und auswählbarem Symbol erstellen, bearbeiten und löschen.

### Dashboard und Auswertungen

- Übersicht der vier Kontostände und des verbleibenden Budgets.
- Monatsübersicht: Einnahmen, Ausgaben, Sparbetrag und Differenz.
- Diagramme für Ausgaben nach Kategorie, Ausgabenverlauf und Budgetverbrauch.
- Filter nach Zeitraum, Konto, Kategorie und Buchungsart.
- Hinweise bei überschrittenen oder fast ausgeschöpften Budgets.

## 2. Gestaltung

- Farbwelt: Weiß als Grundfläche, Blau und Hellblau für Orientierung, Buttons und Diagramme.
- Klarer, ruhiger Aufbau mit gut lesbaren Zahlen und großen Bedienelementen.
- Smartphone zuerst denken: Navigation unten, schnelle Schaltfläche zum Hinzufügen einer Buchung und kurze Wege.
- Desktop-Dashboard erhält zusätzlich mehr Platz für Tabellen und detaillierte Auswertungen.

## 3. Datenmodell (erste Fassung)

- **Konten**: ID, Name, Farbe, Symbol, Monatsziel, aktueller Kontostand, Status.
- **Buchungen**: ID, Datum, Betrag, Typ (Einnahme/Ausgabe/Verteilung), Konto, Kategorie, Notiz, Quelle, Wiederholung.
- **Kategorien**: ID, Name, Symbol, Farbe, Standardkonto.
- **Verteilungsregeln**: Konto, Modus (fester Betrag/Prozent), Wert, Priorität.
- **Wiederkehrende Ausgaben**: ID, Name, Betrag, Konto, Kategorie, Fälligkeit, Intervall, Status.

## 4. Technischer Aufbau

1. Moderne Web-App mit React und TypeScript erstellen.
2. Daten zunächst lokal im Browser speichern, damit die App schnell ausprobierbar ist.
3. Anschließend eine Datenbank mit Anmeldung ergänzen, damit Daten auf Smartphone und Computer synchron bleiben.
4. Als installierbare Web-App (PWA) ausbauen: Startbildschirm-Symbol, mobile Darstellung und grundlegende Offline-Nutzung.
5. GitHub-Repository anlegen und den Quellcode inklusive Einrichtungsanleitung sichern.
6. Die App über einen Web-Host veröffentlichen und auf dem Smartphone zum Startbildschirm hinzufügen.

## 5. Umsetzungsreihenfolge

### Phase 1 – Fundament

- Projektgrundlage, responsives Design und Navigationsstruktur.
- Konten, Kategorien und Beispielbuchungen.
- Lokale Speicherung im Browser.

### Phase 2 – Kernfunktionen

- Gehaltseingang und automatische Aufteilung.
- Buchungen hinzufügen, bearbeiten und löschen.
- Lebenshaltungsbudget und Kontostände korrekt berechnen.

### Phase 3 – Wiederkehrende Kosten und Dashboard

- Verwaltung monatlicher Gemeinkosten.
- Dashboard, Filter, Diagramme und Budgetwarnungen.

### Phase 4 – Smartphone und Veröffentlichung

- PWA-Funktionen und Optimierung für kleine Bildschirme.
- Datenbank/Anmeldung für Synchronisierung.
- GitHub, Deployment und Installation auf dem Smartphone.

## 6. Entscheidungen vor der Umsetzung

- Soll die automatische Verteilung bei zu niedrigem Gehalt nach einer festen Priorität laufen oder alle vier Töpfe prozentual kürzen?
- Sollen wiederkehrende Kosten automatisch gebucht oder vor der Buchung bestätigt werden?
- Soll das Aktienportfolio nur als Sparsumme geführt werden oder später auch Wertpapierpositionen und Kursentwicklung enthalten?

