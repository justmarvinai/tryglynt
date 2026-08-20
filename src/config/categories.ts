/**
 * Food categories (docs/DATA.md). `mealFit` feeds the suggestion engine's
 * meal-fit bonus (docs/SCIENCE.md §6): meal slot ids this category suits.
 */

export interface FoodCategory {
  id: string;
  name: string;
  /** Meal slots this category naturally fits (suggestion bonus). */
  mealFit: string[];
}

export const CATEGORIES: readonly FoodCategory[] = [
  { id: "obst", name: "Obst", mealFit: ["breakfast", "snacks"] },
  { id: "gemuese", name: "Gemüse", mealFit: ["lunch", "dinner"] },
  { id: "getreide", name: "Getreide & Beilagen", mealFit: ["lunch", "dinner"] },
  { id: "brot", name: "Brot & Backwaren", mealFit: ["breakfast", "dinner"] },
  { id: "milch-eier", name: "Milchprodukte & Eier", mealFit: ["breakfast"] },
  { id: "fleisch", name: "Fleisch & Geflügel", mealFit: ["lunch", "dinner"] },
  { id: "fisch", name: "Fisch & Meeresfrüchte", mealFit: ["lunch", "dinner"] },
  { id: "huelsenfruechte", name: "Hülsenfrüchte", mealFit: ["lunch", "dinner"] },
  { id: "nuesse", name: "Nüsse & Saaten", mealFit: ["breakfast", "snacks"] },
  { id: "oele", name: "Öle & Fette", mealFit: ["lunch", "dinner"] },
  { id: "getraenke", name: "Getränke", mealFit: [] },
  { id: "suesses", name: "Süßes & Snacks", mealFit: ["snacks"] },
  { id: "wuerzen", name: "Würzen & Saucen", mealFit: ["lunch", "dinner"] },
  { id: "pflanzlich", name: "Pflanzliche Alternativen", mealFit: ["lunch", "dinner"] },
  { id: "gerichte", name: "Gerichte & Fast Food", mealFit: ["lunch", "dinner"] },
  { id: "supplemente", name: "Supplemente", mealFit: ["breakfast"] },
] as const;

export const CATEGORY_BY_ID: Record<string, FoodCategory> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

/** Category for user-created foods without an explicit pick. */
export const DEFAULT_USER_CATEGORY = "gerichte";
