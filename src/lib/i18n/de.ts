/**
 * German UI strings — the only shipped locale in v1 (D-018).
 * Rule: NO user-visible string literals in components; everything lives
 * here so future locales are a file, not a refactor. Tone: docs/DESIGN.md §5.
 */

export const de = {
  app: {
    name: "Glynt",
    tagline: "Alle Nährstoffe im Blick.",
  },

  nav: {
    today: "Heute",
    insights: "Insights",
    library: "Bibliothek",
    you: "Du",
  },

  common: {
    add: "Hinzufügen",
    save: "Speichern",
    cancel: "Abbrechen",
    back: "Zurück",
    next: "Weiter",
    done: "Fertig",
    delete: "Löschen",
    edit: "Bearbeiten",
    undo: "Rückgängig",
    close: "Schließen",
    search: "Suchen",
    skip: "Überspringen",
    retry: "Erneut versuchen",
    loading: "Lädt …",
    of: "von",
    noData: "keine Daten",
  },

  onboarding: {
    slides: [
      {
        title: "Mehr als Kalorien",
        body: "Glynt zeigt dir alle Nährstoffe: Makros, Vitamine und Mineralstoffe — auf einen Blick.",
      },
      {
        title: "Dein persönlicher Bedarf",
        body: "Aus Alter, Körper und Aktivität berechnet Glynt, was dein Körper täglich braucht.",
      },
      {
        title: "Privat by design",
        body: "Kein Konto, keine Cloud: Alle deine Daten bleiben auf deinem Gerät.",
      },
    ],
    start: "Los geht's",
    stepOf: "Schritt {current} von {total}",

    nameTitle: "Wie heißt du?",
    namePlaceholder: "Dein Name",
    nameHint: "Dein Name bleibt auf deinem Gerät.",

    sexTitle: "Dein Geschlecht bei Geburt",
    sexWhyTitle: "Warum fragen wir das?",
    sexWhyBody:
      "Grundumsatz und Nährstoff-Referenzwerte sind wissenschaftlich nach biologischem Geschlecht definiert. Die Berechnungsgrundlage kannst du später jederzeit ändern.",
    sexFemale: "Weiblich",
    sexMale: "Männlich",

    genderTitle: "Deine Geschlechtsidentität",
    genderSubtitle: "Optional — hat keinen Einfluss auf die Berechnung.",
    genderFemale: "Weiblich",
    genderMale: "Männlich",
    genderNonbinary: "Nicht-binär",
    genderDiverse: "Divers",
    genderSelf: "Selbst beschreiben",
    genderSelfPlaceholder: "So beschreibst du dich",
    genderNone: "Keine Angabe",

    birthdayTitle: "Wann bist du geboren?",
    birthdaySubtitle: "Dein Alter fließt in die Berechnung deines Bedarfs ein.",
    day: "Tag",
    month: "Monat",
    year: "Jahr",
    months: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],

    heightTitle: "Wie groß bist du?",
    weightTitle: "Wie viel wiegst du?",
    weightSubtitle: "Dein aktuelles Gewicht — du kannst es jederzeit aktualisieren.",

    bodyFatTitle: "Kennst du deinen Körperfettanteil?",
    bodyFatSubtitle:
      "Optional. Damit wird dein Grundumsatz noch genauer berechnet (Katch-McArdle-Formel).",
    bodyFatSkip: "Weiß ich nicht",

    activityTitle: "Wie aktiv bist du?",
    activitySubtitle: "Alltag und Training zusammen — wähle, was am besten passt.",

    approachTitle: "Was ist dein Ansatz?",
    approachSubtitle: "Glynt ist keine Diät-App — du entscheidest die Richtung.",
    approachIntensity: "Intensität",

    computing: "Wir berechnen deinen Bedarf …",
    revealTitle: "Zeit zu glänzen.",
    revealSubtitle: "Das braucht dein Körper an einem Tag:",
    revealEnergy: "Energie",
    revealMicros: "+ {count} Mikronährstoff-Ziele, personalisiert für dich",
    revealAdjustHint: "Alles später anpassbar — in deinem Profil.",
    revealDisclaimer:
      "Referenzwerte sind wissenschaftliche Richtwerte für gesunde Erwachsene, kein medizinischer Rat. Schwangerschaft und Stillzeit werden aktuell nicht abgedeckt.",
    finish: "Auf geht's",
  },

  today: {
    title: "Heute",
    emptyTitle: "Noch nichts geloggt",
    emptyBody: "Füge dein erstes Lebensmittel hinzu, um deinen Tag zu sehen.",
    logFood: "Lebensmittel loggen",
  },

  insights: {
    title: "Insights",
    emptyTitle: "Noch keine Auswertungen",
    emptyBody: "Logge ein paar Tage, dann siehst du hier deine Trends und Durchschnitte.",
  },

  library: {
    title: "Bibliothek",
    emptyTitle: "Deine Bibliothek",
    emptyBody: "Hier findest du alle Lebensmittel, deine Rezepte und Favoriten.",
  },

  you: {
    title: "Du",
    appearance: "Darstellung",
    theme: "Theme",
    themeSystem: "System",
    themeLight: "Hell",
    themeDark: "Dunkel",
    about: "Über Glynt",
    version: "Version",
  },
} as const;
