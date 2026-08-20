/**
 * Persistence models — docs/DATA.md §2.
 * Dates are local calendar days as "YYYY-MM-DD"; timestamps are epoch ms.
 */

import type {
  ActivityLevelId,
  ApproachId,
  NutrientVector,
  ReferenceSourceId,
  SexBasis,
} from "@/lib/engine/types";

export type GenderIdentity =
  | { kind: "female" }
  | { kind: "male" }
  | { kind: "nonbinary" }
  | { kind: "diverse" }
  | { kind: "self"; label: string }
  | { kind: "none" };

export interface Profile {
  id: "me";
  name: string;
  sexAtBirth: SexBasis;
  gender: GenderIdentity;
  birthDate: string; // YYYY-MM-DD
  heightCm: number;
  weightKg: number;
  bodyFatPct?: number;
  activityLevel: ActivityLevelId;
  approach: ApproachId;
  /** Energy modifier for the approach, e.g. 0.85–1.15 (docs/SCIENCE.md §1). */
  approachModifier: number;
  /** D-012: explicit override for formula/reference basis. */
  calculationBasisOverride?: SexBasis;
  referenceSource: ReferenceSourceId;
  createdAt: number;
  updatedAt: number;
}

export interface MealSlot {
  id: string;
  name: string;
  /** Auto-suggestion window, hours 0–23 (docs/PRODUCT.md logging loop). */
  fromHour: number;
  toHour: number;
}

export interface Settings {
  id: "app";
  units: "metric" | "imperial";
  mealSlots: MealSlot[];
  glassSizeMl: number;
  /** Explicit target overrides — win over engine-derived values. */
  energyTargetOverride?: number;
  proteinTargetOverride?: number; // g
  fatTargetOverride?: number; // g
  carbsTargetOverride?: number; // g
  waterGoalMlOverride?: number;
  updatedAt: number;
}

export type FoodSource = "seed" | "user" | "off" | "bls" | "usda";
export type FoodKind = "food" | "supplement";
export type DataQuality = "full" | "label" | "partial";

export interface Portion {
  label: string; // "1 mittlerer Apfel"
  grams: number;
}

export interface Food {
  id: string;
  source: FoodSource;
  kind: FoodKind;
  name: string;
  /** Lowercased, diacritics-folded name for search. */
  nameNormalized: string;
  brand?: string;
  category: string; // id from src/config/categories.ts
  per100: NutrientVector; // per 100 g (or 100 ml if isLiquid)
  isLiquid?: boolean;
  portions: Portion[];
  barcode?: string;
  dataQuality: DataQuality;
  createdAt: number;
  updatedAt: number;
}

export interface RecipeIngredient {
  foodId: string;
  grams: number;
}

export interface Recipe {
  id: string;
  name: string;
  nameNormalized: string;
  servings: number;
  ingredients: RecipeIngredient[];
  createdAt: number;
  updatedAt: number;
}

export type DiaryRef =
  | { type: "food"; id: string }
  | { type: "recipe"; id: string }
  | { type: "quick" };

export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD (local, midnight boundary — D-026.1)
  mealId: string;
  ref: DiaryRef;
  /** Ref id duplicated for indexing ("" for quick adds). */
  refId: string;
  amount: number;
  unit: string; // 'g' | 'ml' | 'portion:<label>'
  grams: number;
  /** Nutrients computed at log time — immutable history (D-026.5). */
  snapshot: NutrientVector;
  /** Display name, survives later food edits/deletions. */
  name: string;
  loggedAt: number;
}

export interface WaterEntry {
  id: string;
  date: string;
  ml: number;
  loggedAt: number;
}

export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPct?: number;
  loggedAt: number;
}

/** One supplement in „Mein Stack" (D-003). */
export interface RegimenItem {
  id: string;
  foodId: string;
  amount: number;
  unit: string;
  grams: number;
  /** Meal slot the one-tap log goes to. */
  mealId: string;
  sortOrder: number;
}

export interface FavoriteRow {
  foodRef: string; // "food:<id>" | "recipe:<id>"
  addedAt: number;
}

export interface RecentRow {
  foodRef: string;
  lastUsedAt: number;
  useCount: number;
}

export interface MetaRow {
  key: string;
  value: unknown;
}
