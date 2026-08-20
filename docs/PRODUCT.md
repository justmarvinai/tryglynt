# Product — Vision, Features, Flows

> What Glynt is and everything it does in v1. Technical detail lives in [ARCHITECTURE.md](./ARCHITECTURE.md), [DATA.md](./DATA.md), [SCIENCE.md](./SCIENCE.md); visual language in [DESIGN.md](./DESIGN.md); binding decisions in [DECISIONS.md](./DECISIONS.md).

## 1. Vision

**Glynt** is a privacy-first nutrition companion for the **German market**. Not a diet app — a complete picture of what your body gets each day: calories, macronutrients and the full panel of vitamins & minerals, measured against *your* personal daily needs.

MyFitnessPal and Yazio are weight-loss funnels with nutrition attached. Glynt inverts that. The daily question it answers:

> **„Bekommt mein Körper heute alles, was er braucht — und wo sind die Lücken?"**

### Principles

1. **Micros are first-class.** Vitamin D, Eisen, Magnesium, B12 get the same prominence as calories. "Top-Quellen" and "Was dir heute noch fehlt" are headline features.
2. **No guilt mechanics.** No red shaming, no weight-loss default. Neutral, calm, factual. Progress toward *coverage*, not restriction.
3. **Private by design.** No account, no server, no analytics. All data on-device (IndexedDB) with export/import. Only external call: Open Food Facts (user-triggered search/barcode).
4. **Honest data.** Unknown nutrient values are shown as "keine Daten", never counted as 0. Reference values cite their source (EFSA/NIH). OFF products show their thinner data coverage honestly.
5. **Premium feel.** CleanOS design language, every state designed (empty/loading/error/offline), German copy with care.

**Not medical advice** — population-level reference information; disclaimer at onboarding + About. v1 targets do not cover pregnancy/breastfeeding (notice shown, D-014).

## 2. v1 feature set (complete — no placeholders)

### Onboarding
Multi-step wizard: Welcome-Carousel → Name → Geschlecht bei Geburt (mit „Warum fragen wir das?") → Geschlechtsidentität (Weiblich · Männlich · Nicht-binär · Divers · Selbst beschreiben · Keine Angabe) → Geburtstag → Größe → Gewicht → Körperfett % (überspringbar) → Aktivitätslevel (5 Stufen mit Alltagsbeschreibung) → Ansatz (Nähren / Sanft reduzieren / Aufbauen) → animierte Berechnung → **Ziele-Reveal** (Energiering, Makro-Balken, „… und 26 Mikronährstoff-Ziele, personalisiert für dich"). Alles später editierbar; Änderungen zeigen einen „Deine Ziele haben sich geändert"-Diff.

### Needs engine
BMR (Mifflin-St Jeor; Katch-McArdle bei Körperfett-%), TDEE, Energieziel mit Ansatz-Anpassung, Makro-Ziele (Protein nach Aktivität, Fett 30 %E, Kohlenhydrate Rest, Ballaststoffe, Limits für Zucker/gesättigte FS/Salz), volle Vitamin- & Mineralstoff-Referenzwerte inkl. Upper Limits (EFSA default, NIH umschaltbar), Wasserziel. Details: [SCIENCE.md](./SCIENCE.md).

### Logging (the 30-second loop)
FAB → Sheet mit fokussierter Suche + Zuletzt/Favoriten/Meine Lebensmittel/Rezepte → Lebensmittel → Portion (Stepper, g/ml/Portionen/Haushaltsmaße, Live-Nährwert-Vorschau) → Mahlzeit (nach Uhrzeit vorgeschlagen) → Hinzufügen → Toast mit Rückgängig → zurück zur Suche (Multi-Add). Plus: Schnell-Eintrag (kcal+Makros), Mahlzeit/Tag kopieren, Einträge bearbeiten/löschen mit Undo.

### Food data
- **Seed-DB**: gebündelte, offline verfügbare Generika mit **vollständigen Mikro-Panels**, deutsche Namen, deutsche/europäische Staples, Haushaltsportionen, maschinell validiert.
- **Open Food Facts**: Online-Suche + **Barcode-Scanner** für Markenprodukte (Datenlücken klar gekennzeichnet), gefundene Produkte werden lokal gecacht.
- **Eigene Lebensmittel** (voller Nährstoff-Editor) & **Rezepte** (Zutaten → Nährwerte pro Portion).
- **Supplemente**: eigener Typ + „Mein Stack" (Tagesroutine mit einem Tap loggen), zählt auf Mikros inkl. UL-Warnung.
- Import-Pipelines für USDA FDC & BLS 4.0 (lizenzpflichtig, nicht gebündelt): [DATA.md §4](./DATA.md).

### Today (Startscreen)
Tagesstreifen (Wochen-Swipe) · Energiering mit „übrig" · Makro-Balken · **Mikro-Abdeckung** („18 von 26 im Plan" + größte Lücken) · **Vorschläge** (siehe unten) · Mahlzeiten-Sektionen mit Summen · Wasser-Karte · dezenter Streak-Chip.

### Smart suggestions (D-007)
Deterministischer, erklärbarer Algorithmus: bewertet Lebensmittel/Rezepte danach, wie gut eine sinnvolle Portion die **heute verbleibenden Lücken** schließt (Energie-Budget- und UL-bewusst, Vertrautheits-Bonus für Favoriten/Historie, Kategorie-Diversität). Ausgespielt als „Das würde heute helfen"-Karten auf Today und im Nährstoff-Detail; jede Karte mit „Warum?"-Begründung und One-Tap-Log. Spec: [SCIENCE.md §6](./SCIENCE.md).

### Nutrition detail
Voller Tages-Panel-Screen (gruppiert: Energie & Makros / Fette im Detail / Vitamine / Mineralstoffe / Weitere), je Nährstoff Fortschritt vs. Ziel, UL-Warnungen, „unvollständige Daten"-Hinweis. Pro Nährstoff: 7/30-Tage-Trend, **Top-Quellen** (heute & generell), Kurztext „Wofür ist das gut?", Ziel + Quellenangabe.

### Insights
Woche/Monat/3 Monate: Energie-Balken vs. Ziel, Makro-Durchschnitte, Mikro-Abdeckungs-Übersicht (schlechteste zuerst), Gewichtstrend (+ optional Körperfett), Logging-Konsistenz, Wochenrückblick-Karte.

### Library (Bibliothek)
Alle Lebensmittel nach Kategorie durchsuchen · Meine Lebensmittel · Rezepte · Favoriten · Supplemente/Stack verwalten · anlegen/bearbeiten/duplizieren.

### You (Du)
Profil bearbeiten (Neuberechnung mit Diff) · Ziele & Overrides (Energie, Makro-Strategie, einzelne Werte) · Einheiten · Theme (System/Hell/Dunkel) · Referenzquelle (EFSA/NIH) · Mahlzeiten-Slots · Wasserziel · Berechnungsgrundlage (D-012) · Daten (Export/Import/Löschen) · Über (Quellen, Disclaimer, Lizenzen, Version).

### PWA
Installierbar (Manifest, maskable Icons, iOS-Meta), nach erstem Laden voll offline, selbst gehostete Inter, Update-Toast, `storage.persist()` + Backup-Nudges (iOS-Eviction-Schutz).

### Out of v1
Accounts/Sync · Push-Reminder (Capacitor-Phase) · Schwangerschaft/Stillzeit-Ziele · Fasten-Timer · Training/Verbrauch · Social · AI-Features · weitere Sprachen.

## 3. Navigation & screens

Bottom navigation, four tabs + floating log FAB on logging-relevant screens:

```
Heute · Insights · Bibliothek · Du            (+) FAB → Loggen
```

```
/onboarding/*                 (guard: only while profile absent)
/heute                        Day dashboard (default)
  /heute/naehrstoffe?date=…   Full-panel day detail
  /naehrstoff/:id             Single-nutrient detail
/insights
/bibliothek                   All / Meine / Rezepte / Favoriten / Supplemente
  /bibliothek/lebensmittel/neu|:id
  /bibliothek/rezept/neu|:id
/du                           Settings hub
  /du/profil  /du/ziele  /du/daten  /du/ueber
Log flow: bottom sheets (search → detail → portion), not routes.
```

## 4. The two core loops

1. **Logging loop (30 s):** FAB → Suche/Zuletzt → Portion → Hinzufügen → Undo-Toast → Multi-Add.
2. **Gap-closing loop (the differentiator):** Today zeigt „Heute noch niedrig: Vitamin D · Eisen · Ballaststoffe" → Vorschlags-Karten bzw. Nährstoff-Detail mit Top-Quellen → One-Tap-Log. Insight → Aktion in zwei Taps.

## 5. Quality bar

Every list has a designed empty state with next action; every async surface has skeletons; destructive actions confirm + Undo where possible; offline is silent except OFF search (clear Callout degradation); reduced motion respected; touch targets ≥ 44 px; AA contrast; desktop shows the centered phone-width column beautifully.
