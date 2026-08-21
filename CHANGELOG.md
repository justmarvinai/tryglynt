# Changelog

All notable changes to Glynt. Format follows [Keep a Changelog](https://keepachangelog.com/); versioning follows SemVer once releases start. Every user-visible change lands under **Unreleased** first.

## [Unreleased]

### Added

**Onboarding & Ziele**
- Mehrstufiges Onboarding auf Deutsch: Welcome-Carousel, Name, Geschlecht bei Geburt (mit Erklärung), Geschlechtsidentität, Geburtstag, Größe, Gewicht, optionaler Körperfettanteil, Aktivitätslevel und Ansatz (Nähren / Sanft reduzieren / Aufbauen).
- „Zeit zu glänzen“-Reveal mit persönlichem Energieziel, Makros und der Anzahl personalisierter Mikronährstoff-Ziele.
- Nährstoff-Engine: Grundumsatz (Mifflin-St Jeor bzw. Katch-McArdle), Gesamtumsatz, Makro- und Limit-Ziele, EFSA- und NIH-Referenzwerte mit Altersbändern und Höchstmengen.

**Tracking**
- Loggen in Sekunden: Suche mit Zuletzt/Favoriten/Meine/Rezepte, Sofort-Hinzufügen mit Rückgängig, Portions-Sheet mit Haushaltsmaßen, Live-Nährwertvorschau und Mahlzeiten-Vorschlag nach Uhrzeit.
- Schnell-Eintrag (nur kcal + optionale Makros), Mahlzeit oder ganzen Tag von gestern kopieren, Einträge bearbeiten und löschen.
- Eigene Lebensmittel mit vollem Nährstoff-Editor und Energie-Plausibilitätswarnung, Rezepte mit Nährwerten pro Portion, Supplemente inkl. „Mein Stack“ (Tagesroutine mit einem Tap).
- Wasser-Tracking mit Gläser-Raster und persönlichem Ziel.

**Heute & Auswertung**
- Heute-Dashboard: Energiering mit „übrig“, Makro- und Limit-Balken, Mikronährstoff-Abdeckung („9 von 24 im Plan“) mit den größten Lücken, Wasser, Mahlzeiten, Wochenstreifen und dezenter Streak.
- Vollständiges Tages-Nährstoffpanel, gruppiert nach Energie, Makros, Fetten, Vitaminen, Mineralstoffen und Weiteren.
- Nährstoff-Detail mit 7/30-Tage-Verlauf, Top-Quellen von heute, guten Quellen aus der Datenbank (mit realistischer Portion, ein Tap zum Loggen), Zielart samt Quelle, Höchstmenge und Kurztext „Wofür ist das gut?“.
- Insights: Woche/Monat/3 Monate mit Energieverlauf, Makro-Durchschnitten, Mikro-Abdeckung (schlechteste zuerst), Rückblick und Gewichtsverlauf.
- Smarte Vorschläge: erklärbare Karten („Deckt 100 % deines Vitamin-K-Bedarfs“), die zu den offenen Lücken und zum Energiebudget passen — mit einem Tap loggbar.

**Daten**
- Mitgelieferte Lebensmitteldatenbank mit 196 Einträgen in 16 Kategorien, vollen Mikro-Panels und Haushaltsportionen; automatisch auf Plausibilität geprüft (Energiebilanz, Massen, Wertebereiche).
- Open Food Facts: Online-Suche und Barcode-Scanner für Markenprodukte, lokal gecacht, Datenlücken klar gekennzeichnet.
- Backup: JSON-Export, Import mit Vorschau und Zusammenführen/Ersetzen, dauerhafter Speicher, vollständiges Löschen mit Bestätigung, Erinnerung nach 30 Tagen.

**App**
- Vier Tabs (Heute, Insights, Bibliothek, Du), Einstellungen für Profil, Ziele, Referenzquelle, Berechnungsgrundlage, Mahlzeiten, Wasser, Einheiten und Theme (System/Hell/Dunkel).
- PWA: installierbar, nach dem ersten Laden vollständig offline, Update-Hinweis, Install-Nudge (inkl. iOS-Hinweis).
- „Über Glynt“ mit wissenschaftlichen Quellen, Lizenzen, Datenschutz und medizinischem Hinweis.

### Notes
- Alle Referenzwerte gelten für gesunde Erwachsene; Schwangerschaft und Stillzeit sind noch nicht abgedeckt.
- Barrierefreiheit: WCAG 2 AA automatisiert geprüft (axe-core) über Onboarding, alle Tabs in Hell und Dunkel sowie das Log-Sheet.
