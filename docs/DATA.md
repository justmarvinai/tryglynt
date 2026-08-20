# Data — Model, Storage, Food Sources, Backup

> Everything about what Glynt stores and where food data comes from. Domain formulas: [SCIENCE.md](./SCIENCE.md). Stack rationale: [ARCHITECTURE.md](./ARCHITECTURE.md).

## 1. Nutrient model

```ts
// src/lib/engine/types.ts
type NutrientId = 'energy' | 'water' | 'alcohol' | 'protein' | 'carbs' | 'sugar'
  | 'fiber' | 'fat' | 'satFat' | 'monoFat' | 'polyFat' | 'transFat' | 'omega3'
  | 'cholesterol' | 'vitA' | 'vitB1' | ... | 'choline' | 'calcium' | ... | 'caffeine';

type NutrientVector = Partial<Record<NutrientId, number>>;  // per 100 g/ml
// Absent key = "no data" (honest gap). 0 = verified zero. Never conflate.
```

The panel (ids, units, groups, order, decimals, German names, info texts) is defined once in `src/config/nutrients.ts` — UI, engine, seed validator and importers all consume it (D-025).

## 2. IndexedDB schema (Dexie)

```ts
// src/lib/db/db.ts — indexes after the colon
profile:       'id'                              // single row 'me'
settings:      'id'                              // single row 'app' (overrides, prefs)
foods:         'id, nameNormalized, category, source, barcode'
recipes:       'id, name'
diaryEntries:  'id, date, [date+mealId], refId'  // date 'YYYY-MM-DD' local
waterLog:      'id, date'
weightLog:     'id, date'
regimen:       'id'                              // supplement stack items
favorites:     'foodRef'
recents:       'foodRef, lastUsedAt'
meta:          'key'                             // seedVersion, schemaVersion, installedAt, nudges
```

**Food record**

```ts
{ id, source: 'seed'|'user'|'off'|'bls'|'usda',
  kind: 'food'|'supplement',
  name, brand?, category,          // category ids in src/config/categories.ts
  per100: NutrientVector,          // per 100 g (or 100 ml when isLiquid)
  isLiquid?: boolean,
  portions: [{ label: '1 mittlerer Apfel', grams: 182 }],
  barcode?: string,
  dataQuality: 'full'|'label'|'partial',   // seed=full · OFF≈label · user=whatever entered
  verified?: boolean, createdAt, updatedAt }
```

**Diary entry**

```ts
{ id, date, mealId,
  ref: { type: 'food'|'recipe'|'quick', id? },
  amount, unit,                    // as entered ('g'|'ml'|'portion:<label>'|'stueck'…)
  grams,                           // resolved mass
  snapshot: NutrientVector,        // computed at log time (D-026.5)
  name,                            // denormalized display name (survives food deletion)
  loggedAt }
```

Migrations: Dexie versioned upgrades; every release keeps an upgrade path. `meta.schemaVersion` mirrors the Dexie version for diagnostics.

## 3. Bundled seed database

- German names, German/EU staples + international basics (D-010); target ~1,500–2,500 foods across ~20 categories; **complete core micro panels** (`dataQuality: 'full'`), household portions per food.
- **Authoring format:** compact per-category JSON in `src/data/foods/` (column-array format keyed by the nutrient panel to keep files small and diffable), compiled by `scripts/build-seed.ts` into versioned chunks lazy-loaded on first run (progress UI) and `bulkPut` into `foods`. `meta.seedVersion` drives additive upgrades on app updates without touching user data.
- **Validator (`scripts/validate-seed.ts`, runs in CI/tests):**
  - energy reconciliation: kcal ≈ 4·carbs + 4·protein + 9·fat + 7·alcohol + 2·fiber (tolerance band),
  - Σ macro mass + water plausibility ≤ 100 g, satFat+mono+poly ≤ fat, sugar ≤ carbs,
  - per-category plausibility ranges for micros (e.g. vitamin C caps, sodium ranges),
  - required-field completeness for seed foods, duplicate/near-duplicate name detection,
  - portion sanity (grams within category bounds).
- **Provenance constraint:** this build environment cannot reach USDA/OFF/BLS (egress-blocked), so seed values are hand-curated from standard published reference values and machine-validated; every food carries `source: 'seed'`. Post-v1 refinement can overlay importer data (below) without schema changes.

## 4. External sources & importers (D-008)

| Source | Mode | Notes |
|---|---|---|
| **Open Food Facts** | **Runtime connector** (v1): search + barcode against `de.openfoodfacts.org` API v2 from the browser; results mapped `nutriments → NutrientVector`, cached into `foods` as `source:'off'`, `dataQuality:'label'` (label basics only — UI marks thin micro data honestly). License **ODbL** → attribution in „Über" + per-food source label. Offline: connector degrades with a Callout; cached products keep working. | No API key. Rate-friendly (debounced search, single product fetch on scan). |
| **USDA FoodData Central** | **Import pipeline** `scripts/import-usda.ts`: consumes an FDC CSV/JSON download (provided into `data-sources/`, gitignored) and *fills nutrient gaps* in matched seed foods (match table maintained in the script). Public domain (CC0). English names → gap-filler only, not new entries. | Run manually when data is available; validator re-runs after. |
| **BLS 4.0** | **Import pipeline** `scripts/import-bls.ts`: consumes a **licensed** BLS export (CSV) → maps BLS nutrient codes → `source:'bls'` foods with German names, or overlays onto seed matches. **BLS is NOT freely redistributable** (license via MRI/blsdb.de) — the importer ships, the data does not. When Marvin obtains a license, running the script upgrades the DB. | Legal note stays in „Über" only if BLS data is actually present. |

All importers are thin adapters onto one shared `FoodImport` interface — adding future sources (e.g. Swiss DB) is a new adapter, nothing else changes (D-025).

## 5. Export / import / durability

- **Export:** `glynt-backup-YYYY-MM-DD.json` — versioned envelope: profile, settings, user foods (+cached OFF), recipes, regimen, diary, water, weight, meta. Share-sheet/download.
- **Import:** validate envelope version → choose **Zusammenführen** (merge by id/timestamps) or **Ersetzen** (wipe + restore). Dry-run summary shown before applying.
- **iOS eviction protection:** request `navigator.storage.persist()` after onboarding; encourage installation (installed PWAs are durable); gentle backup nudge every ~30 days (`meta.nudges`).
- **Erase:** „Alle Daten löschen" (double-confirm, types app name) resets DB to fresh-install state.

## 6. Privacy

No account, no server, no analytics (D-022). Runtime network: only user-triggered Open Food Facts calls (and nothing else — fonts self-hosted). This sentence must stay true; any change is a new decision entry.
