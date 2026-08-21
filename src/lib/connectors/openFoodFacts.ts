/**
 * Open Food Facts connector (D-008, docs/DATA.md §4) — the ONLY external
 * origin the app talks to, and only when the user searches or scans.
 *
 * License: ODbL. Attribution lives in „Über Glynt"; every imported food
 * keeps `source: "off"` and `dataQuality: "label"` so the UI can say
 * honestly that micro data is thin.
 */

import { db, newId, searchKey } from "@/lib/db/db";
import type { Food, Portion } from "@/lib/db/models";
import type { NutrientId, NutrientVector } from "@/lib/engine/types";

const BASE = "https://de.openfoodfacts.org";
const USER_AGENT_PARAM = "Glynt/1.0";
const TIMEOUT_MS = 8000;

/** OFF nutriment key → our nutrient id. Values are per 100 g/ml. */
const NUTRIMENT_MAP: Record<string, NutrientId> = {
  "energy-kcal_100g": "energy",
  proteins_100g: "protein",
  carbohydrates_100g: "carbs",
  sugars_100g: "sugar",
  fiber_100g: "fiber",
  fat_100g: "fat",
  "saturated-fat_100g": "satFat",
  "monounsaturated-fat_100g": "monoFat",
  "polyunsaturated-fat_100g": "polyFat",
  "trans-fat_100g": "transFat",
  cholesterol_100g: "cholesterol",
  sodium_100g: "sodium",
  potassium_100g: "potassium",
  calcium_100g: "calcium",
  iron_100g: "iron",
  magnesium_100g: "magnesium",
  zinc_100g: "zinc",
  phosphorus_100g: "phosphorus",
  selenium_100g: "selenium",
  copper_100g: "copper",
  manganese_100g: "manganese",
  iodine_100g: "iodine",
  "vitamin-a_100g": "vitA",
  "vitamin-b1_100g": "vitB1",
  "vitamin-b2_100g": "vitB2",
  "vitamin-pp_100g": "vitB3",
  "pantothenic-acid_100g": "vitB5",
  "vitamin-b6_100g": "vitB6",
  biotin_100g: "vitB7",
  "vitamin-b9_100g": "vitB9",
  "vitamin-b12_100g": "vitB12",
  "vitamin-c_100g": "vitC",
  "vitamin-d_100g": "vitD",
  "vitamin-e_100g": "vitE",
  "vitamin-k_100g": "vitK",
  caffeine_100g: "caffeine",
  alcohol_100g: "alcohol",
};

/** OFF reports these in grams; our panel uses mg or µg. */
const SCALE_TO_UNIT: Partial<Record<NutrientId, number>> = {
  sodium: 1000,
  potassium: 1000,
  calcium: 1000,
  iron: 1000,
  magnesium: 1000,
  zinc: 1000,
  phosphorus: 1000,
  copper: 1000,
  manganese: 1000,
  cholesterol: 1000,
  vitB1: 1000,
  vitB2: 1000,
  vitB3: 1000,
  vitB5: 1000,
  vitB6: 1000,
  vitC: 1000,
  vitE: 1000,
  caffeine: 1000,
  selenium: 1_000_000,
  iodine: 1_000_000,
  vitA: 1_000_000,
  vitB7: 1_000_000,
  vitB9: 1_000_000,
  vitB12: 1_000_000,
  vitD: 1_000_000,
  vitK: 1_000_000,
};

interface OffProduct {
  code?: string;
  product_name?: string;
  product_name_de?: string;
  brands?: string;
  quantity?: string;
  serving_size?: string;
  serving_quantity?: number | string;
  nutriments?: Record<string, unknown>;
  categories_tags?: string[];
}

export class OffError extends Error {
  constructor(public reason: "offline" | "network" | "notFound") {
    super(reason);
  }
}

function mapNutriments(nutriments: Record<string, unknown> = {}): NutrientVector {
  const out: NutrientVector = {};
  for (const [key, id] of Object.entries(NUTRIMENT_MAP)) {
    const raw = nutriments[key];
    const value = typeof raw === "number" ? raw : Number(raw);
    if (!Number.isFinite(value) || value < 0) continue;
    out[id] = value * (SCALE_TO_UNIT[id] ?? 1);
  }
  // Fall back to kJ when kcal is missing (1 kcal = 4.184 kJ).
  if (out.energy == null) {
    const kj = Number(nutriments["energy_100g"]);
    if (Number.isFinite(kj) && kj > 0) out.energy = kj / 4.184;
  }
  return out;
}

function servingPortions(product: OffProduct): Portion[] {
  const portions: Portion[] = [];
  const grams = Number(product.serving_quantity);
  if (Number.isFinite(grams) && grams > 0 && grams <= 1000) {
    portions.push({
      label: product.serving_size?.trim() || "1 Portion",
      grams,
    });
  }
  return portions;
}

function toFood(product: OffProduct): Food | null {
  const name = (product.product_name_de || product.product_name || "").trim();
  if (!name) return null;
  const per100 = mapNutriments(product.nutriments);
  if (per100.energy == null) return null; // unusable without energy
  const brand = product.brands?.split(",")[0]?.trim() || undefined;
  const isLiquid = product.categories_tags?.some((tag) =>
    /beverage|getranke|drinks/i.test(tag)
  );
  const now = Date.now();
  return {
    id: product.code ? `off-${product.code}` : newId(),
    source: "off",
    kind: "food",
    name,
    nameNormalized: searchKey(`${name} ${brand ?? ""}`),
    brand,
    category: "gerichte",
    per100,
    isLiquid: isLiquid || undefined,
    portions: servingPortions(product),
    barcode: product.code,
    dataQuality: "label",
    createdAt: now,
    updatedAt: now,
  };
}

async function offFetch(url: string): Promise<unknown> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw new OffError("offline");
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new OffError("network");
    return await response.json();
  } catch (error) {
    if (error instanceof OffError) throw error;
    throw new OffError("network");
  } finally {
    clearTimeout(timer);
  }
}

const FIELDS =
  "code,product_name,product_name_de,brands,quantity,serving_size,serving_quantity,nutriments,categories_tags";

/** Text search against Open Food Facts (German instance). */
export async function searchOff(query: string, limit = 20): Promise<Food[]> {
  const url =
    `${BASE}/api/v2/search?search_terms=${encodeURIComponent(query)}` +
    `&fields=${FIELDS}&page_size=${limit}&json=1&app_name=${USER_AGENT_PARAM}`;
  const data = (await offFetch(url)) as { products?: OffProduct[] };
  return (data.products ?? []).map(toFood).filter((f): f is Food => f !== null);
}

/** Barcode lookup. Throws OffError("notFound") when unknown. */
export async function fetchOffProduct(barcode: string): Promise<Food> {
  const url =
    `${BASE}/api/v2/product/${encodeURIComponent(barcode)}` +
    `?fields=${FIELDS}&app_name=${USER_AGENT_PARAM}`;
  const data = (await offFetch(url)) as { status?: number; product?: OffProduct };
  const food = data.product ? toFood(data.product) : null;
  if (!food || data.status === 0) throw new OffError("notFound");
  return food;
}

/** Caches an OFF product locally so it works offline afterwards. */
export async function cacheOffFood(food: Food): Promise<Food> {
  const existing = await db.foods.get(food.id);
  if (existing) return existing;
  await db.foods.put(food);
  return food;
}

export const __testing = { mapNutriments, toFood, servingPortions };
