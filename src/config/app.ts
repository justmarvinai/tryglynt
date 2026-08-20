/**
 * App-level configuration & feature flags (docs/DECISIONS.md D-025).
 * Tweak behavior here — never inline in components.
 */

export const APP = {
  name: "Glynt",
  tagline: "Alle Nährstoffe im Blick.",
  version: __APP_VERSION__,
  /** Minimum supported age for personal targets (docs/SCIENCE.md §3). */
  minAgeYears: 15,
} as const;

export const FEATURES = {
  /** Open Food Facts online search + product fetch (docs/DATA.md §4). */
  openFoodFacts: true,
  /** Camera barcode scanning (needs openFoodFacts). */
  barcode: true,
  /** Smart gap-closing suggestions (docs/SCIENCE.md §6). */
  suggestions: true,
  /** Supplement tracking + „Mein Stack" (D-003). */
  supplements: true,
} as const;

export const NUDGES = {
  /** Gentle backup reminder cadence in days (D-026.7). */
  backupReminderDays: 30,
} as const;
