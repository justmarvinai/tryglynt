/**
 * Core nutrient model — the single vocabulary the whole app speaks.
 * Panel definition (names, units, groups, order): src/config/nutrients.ts
 * Docs: docs/SCIENCE.md §5, docs/DATA.md §1
 */

export const NUTRIENT_IDS = [
  // Energy & hydration
  "energy", // kcal
  "water", // ml
  "alcohol", // g
  // Macros
  "protein", // g
  "carbs", // g
  "sugar", // g (part of carbs)
  "fiber", // g
  "fat", // g
  // Fats in detail
  "satFat", // g
  "monoFat", // g
  "polyFat", // g
  "transFat", // g
  "omega3", // g (ALA + EPA/DHA)
  "cholesterol", // mg
  // Vitamins
  "vitA", // µg RAE
  "vitB1", // mg
  "vitB2", // mg
  "vitB3", // mg NE
  "vitB5", // mg
  "vitB6", // mg
  "vitB7", // µg
  "vitB9", // µg DFE
  "vitB12", // µg
  "vitC", // mg
  "vitD", // µg
  "vitE", // mg α-TE
  "vitK", // µg
  "choline", // mg
  // Minerals
  "calcium", // mg
  "iron", // mg
  "magnesium", // mg
  "zinc", // mg
  "potassium", // mg
  "sodium", // mg (salt display = ×2.5 in UI)
  "phosphorus", // mg
  "selenium", // µg
  "copper", // mg
  "manganese", // mg
  "iodine", // µg
  "chloride", // mg
  // Extended (tracked when data exists)
  "chromium", // µg
  "molybdenum", // µg
  "fluoride", // mg
  "caffeine", // mg
] as const;

export type NutrientId = (typeof NUTRIENT_IDS)[number];

/**
 * Amounts per 100 g (or 100 ml for liquids), keyed by nutrient.
 * An ABSENT key means "no data" — never a verified zero. A present 0 is
 * a verified zero. This distinction powers the honest-gap UI.
 */
export type NutrientVector = Partial<Record<NutrientId, number>>;

/** Sex basis used for formulas & reference values (docs/DECISIONS.md D-012). */
export type SexBasis = "female" | "male";

export type ActivityLevelId =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extra";

export type ApproachId = "nourish" | "reduce" | "build";

export type ReferenceSourceId = "efsa" | "nih";
