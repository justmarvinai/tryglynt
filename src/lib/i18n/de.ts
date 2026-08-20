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
