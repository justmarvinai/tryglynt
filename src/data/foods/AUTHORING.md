# Seed food authoring guide

How to author category files in `src/data/foods/categories/`. Reference example: `categories/obst.ts`. Validator: `npx vitest run tests/seed.test.ts` — must be green.

## Format

One file per category id (see `src/config/categories.ts`), exporting a `SeedCategoryFile` (type in `../types.ts`). Field `n` is a `NutrientVector` per **100 g edible portion** (per 100 ml for `isLiquid` drinks). Keep each `n` object on ONE line (diff-friendly).

## Hard rules

1. **Values from standard reference tables** (USDA FoodData Central / BLS-typical published values). Never invent numbers. If you do not know a nutrient's value for a food with reasonable confidence → **omit the key** (absent = "no data", the app handles it honestly).
2. **EU carbs convention:** `carbs` EXCLUDES fiber (German label style). USDA "carbohydrate by difference" must be converted: `carbs = usdaCarbs − fiber`.
3. **Energy reconciliation:** `energy ≈ 4·carbs + 4·protein + 9·fat + 7·alcohol + 2·fiber`, tolerance ±max(15 kcal, 12 %). Adjust energy to the reconciled value when your source's label energy disagrees more than that.
4. **Verified zeros:** plant foods get `vitB12: 0, vitD: 0, cholesterol: 0` (real zeros). Water/black coffee/tea get near-all-zero panels. Do NOT write 0 for values that are merely unknown.
5. **Units** exactly as in `src/config/nutrients.ts`: energy kcal · macros/fats g · cholesterol mg · vitamins A/D/K/B7/B9/B12 µg, others mg · minerals mg except selenium/iodine/chromium/molybdenum µg · water ml(=g) · caffeine mg.
6. **sugar ≤ carbs**, fatty acids (sat+mono+poly+trans) ≤ fat, omega3 ≤ polyFat. Round to the precision in the example file.
7. **German names** (market DE), with preparation state where relevant: „Reis, weiß (gekochte)" → style: „Reis, weiß (gekocht)". Cooked variants for foods logged cooked (Reis, Nudeln, Linsen…), raw for produce.
8. **Portions:** 1–4 realistic household measures `["Label", grams]`, FIRST = the most common default (e.g. `["1 Scheibe", 25]` for bread). German labels („1 EL", „1 Glas (250 ml)", „1 Portion (125 g)").
9. **ids:** kebab-case, unique app-wide, no umlauts (ä→ae …).
10. Include where known & relevant: `water` (g/100g), `iodine` (fish/dairy/eggs/Jodsalz), `vitD` (fish/eggs/margarine), `caffeine` (Kaffee/Tee/Cola/Schoko), `alcohol` (Bier/Wein), `omega3` (Fisch, Lein, Walnuss, Raps), `transFat` (Milchfett/Fleisch ~0.1–0.5, Margarine), `vitB7`/`choline` where published.
11. Aim for the fullest honest panel: the big minerals (K, Ca, Fe, Mg, P, Na, Zn, Cu, Mn, Se) and vitamins (A, B1, B2, B3, B5, B6, B9, B12, C, D, E, K) should be present for nearly all whole foods; `chromium`/`molybdenum`/`fluoride` only when confidently known.

## Workflow

1. Write `categories/<id>.ts`.
2. `npx vitest run tests/seed.test.ts` → fix until green.
3. `npx tsc --noEmit` → must stay clean.

Touch ONLY your assigned category files — never shared files, never other categories.
