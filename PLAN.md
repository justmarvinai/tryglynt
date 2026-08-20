# Glynt — Product & Technical Plan (v1)

> **Glynt** is a privacy-first nutrition companion. Not a diet app — a complete picture of what your body gets each day: calories, macronutrients, and the full panel of vitamins and minerals, measured against *your* personal daily needs.
>
> This document is the full plan for the shipping-ready v1 web app (PWA, mobile-first, no backend, IndexedDB, deployed on Vercel; Capacitor wrap comes later, after v1 is finished and iterated on).
>
> Open decisions are marked **[→ Q#]** and reference [`USER_QUESTIONS.md`](./USER_QUESTIONS.md).

---

## 1. Product vision

**Positioning.** MyFitnessPal and Yazio are weight-loss funnels with nutrition attached. Glynt inverts that: the product is *nourishment awareness*. The core question it answers every day is:

> "Am I giving my body everything it needs — and where are the gaps?"

**Principles.**

1. **Micros are first-class.** Vitamin D, iron, magnesium, B12 get the same visual prominence as calories. "Top sources" and "what's still missing today" are headline features, not buried tables.
2. **No guilt mechanics.** No red "over budget" shaming, no weight-loss default. Neutral, factual, calm. Progress toward *coverage*, not restriction.
3. **Private by design.** No account, no server, no tracking. Everything lives on-device in IndexedDB. Export/import puts the user in control of their data.
4. **Honest data.** A nutrient value we don't know is shown as "no data", never silently counted as 0 toward totals-of-known. Reference values cite their source (EFSA / NIH).
5. **Premium feel.** CleanOS design language throughout — white canvas, soft gray surfaces, one confident accent, bold Inter type, pill shapes, springy press feedback. Every state designed: empty, loading, error, offline.

**Not medical advice.** Reference intakes are population guidance. The app carries a clear disclaimer (onboarding footnote + About screen) and never gives clinical recommendations.

---

## 2. Core feature set (v1 — complete, no placeholders)

| Area | Features |
|---|---|
| **Onboarding** | Multi-step wizard: welcome carousel → name → sex assigned at birth (for formulas, with explanation) → gender identity (separate, respectful, full option list) → birthday → height → weight → optional body-fat % → activity level → approach **[→ Q1]** → animated "calculating" → personal targets reveal. Editable later at any time. |
| **Needs engine** | BMR (Mifflin-St Jeor; Katch-McArdle when body-fat % given), TDEE via activity factor, energy target, macro targets (protein/carbs/fat/fiber/sugar-limit/sat-fat-limit/salt-limit), full vitamin & mineral reference intakes + tolerable upper limits by age/sex **[→ Q11, Q12, Q13]**, water goal **[→ Q2]**. |
| **Food logging** | Search-first log flow (recents, favorites, my foods, recipes), portion entry in g/ml/servings/household units, per-meal diary (default Breakfast · Lunch · Dinner · Snacks, customizable **[→ Q21]**), quick-add (energy+macros only), copy meal/day, edit & delete with undo, multi-add friendly flow. |
| **Food database** | Bundled offline generic-food database with **complete micro panels** (~1,500–2,500 curated foods, seeded into IndexedDB on first run, validated by an automated sanity suite) **[→ Q7, Q9]**; user-created foods; recipes (ingredients → per-serving nutrition); optionally Open Food Facts online search + barcode scan for branded products **[→ Q7, Q8]**. |
| **Today dashboard** | Day strip (swipe days), energy ring with remaining, macro bars, **micronutrient coverage summary** ("18 of 26 on track" + biggest gaps), meal sections with totals, water card **[→ Q2]**, subtle logging streak **[→ Q5]**. |
| **Day nutrition detail** | Full nutrient panel for any day, grouped (Energy & Macros / Fats detail / Vitamins / Minerals / Other), each with progress vs. target, UL warnings when exceeded, and per-nutrient drill-down: 7/30-day trend, **top food sources**, short plain-language "what it does" text, target + source citation. |
| **Insights** | Week / Month / 3-Month views: energy bar chart vs. target, macro averages, **micro coverage overview sorted worst-first**, weight trend **[→ Q4]**, logging consistency. Weekly recap card. |
| **Library** | Browse/search all foods by category, manage my foods, recipes, favorites. Create/edit/duplicate custom foods with full nutrient entry (all fields optional except energy+macros). |
| **Profile & Settings** | Edit profile (auto-recalculates targets with a "your targets changed" diff), target overrides (energy, macro strategy, per-value custom), units (metric/imperial) **[→ Q19]**, theme (system/light/dark), reference-value source (EFSA/NIH) **[→ Q11]**, meal slots, water goal, language **[→ Q18]**, data export/import/erase, About (science sources, disclaimer, licenses, version). |
| **PWA** | Installable (manifest, maskable icons, iOS meta), fully offline after first load, self-hosted Inter font, update toast, persistent-storage request + backup nudges (iOS eviction protection). |

**Deliberately out of v1** (revisit post-v1): accounts/sync, push reminders (unreliable in iOS PWAs — Capacitor phase **[→ Q25]**), pregnancy/breastfeeding target sets **[→ Q14]**, fasting timers, social features, AI features.

---

## 3. Information architecture

### 3.1 Navigation

Bottom navigation (CleanOS `BottomNav`), four tabs + floating log button (CleanOS `Fab`) on logging-relevant screens:

```
┌──────────────────────────────────────────────┐
│  Today   ·   Insights   ·   Library   ·  You │
└──────────────────────────────────────────────┘
                                    (+) FAB → Log food
```

### 3.2 Screen map

```
/onboarding                     (guard: only when profile absent)
  welcome → name → sex-at-birth → gender → birthday → height →
  weight → body-fat (skippable) → activity → approach → reveal

/today                          Day dashboard (default screen)
  /today/nutrients?date=…       Full-panel day detail
  /nutrient/:id                 Single-nutrient detail (trend, sources, info)

/insights                       Trends & recaps
/library                        Food browser (All / My foods / Recipes / Favorites)
  /library/food/:id             Food detail / edit (own foods)
  /library/recipe/new|:id       Recipe builder

/you                            Profile & settings hub
  /you/profile                  Edit personal data
  /you/targets                  Targets & overrides
  /you/data                     Export / import / erase
  /you/about                    Sources, disclaimer, licenses

Log flow (bottom sheets, not routes): search → food detail → portion → added-toast
```

### 3.3 Key flows

**Daily logging (the 30-second loop):** FAB → sheet opens with search focused + recents visible → tap food → portion (stepper + unit select, live nutrient preview) → meal auto-suggested by time of day → Add → toast with Undo → sheet back to search for multi-add.

**Gap closing (the differentiator):** Today shows "Low today: Vitamin D · Iron · Fiber" → tap → nutrient detail → "Top sources in your foods" list → tap a food → log it. The app closes the loop from *insight* to *action*.

**Onboarding reveal:** after the wizard, a brief animated computation, then the targets screen — energy ring, macro bars, "and 26 micronutrient targets personalised to you" — sets the product promise in the first minute.

---

## 4. The science layer

All formulas are pure, unit-tested functions in `src/lib/engine/`, with sources cited in code and in the About screen.

### 4.1 Energy

- **BMR — Mifflin-St Jeor** (default):
  `men: 10·kg + 6.25·cm − 5·age + 5` · `women: 10·kg + 6.25·cm − 5·age − 161`
- **BMR — Katch-McArdle** (auto-used when body-fat % provided):
  `370 + 21.6 · leanMassKg`
- **TDEE** = BMR × activity factor: Sedentary 1.2 · Light 1.375 · Moderate 1.55 · Very 1.725 · Extra 1.9 (each with concrete lifestyle descriptions in UI).
- **Energy target** = TDEE, optionally adjusted by approach **[→ Q1]** (gentle −10–15% / +10–15%), always manually overridable.
- Sex-based formula input defaults to sex assigned at birth, with an explicit user override in settings **[→ Q12]**.

### 4.2 Macronutrient targets (defaults, all editable)

| Target | Default rule **[→ Q13]** |
|---|---|
| Protein | g/kg body weight scaled by activity (0.8 sedentary → 1.2 moderate → 1.6+ very active) |
| Fat | 30% of energy (AMDR 20–35%) |
| Carbohydrates | Remainder of energy |
| Fiber | EFSA 25 g/day (NIH: 14 g/1000 kcal) |
| Sugar (limit) | < 10% of energy (WHO) |
| Saturated fat (limit) | < 10% of energy |
| Salt (limit) | < 5 g/day (WHO); shown as salt and sodium |
| Water | EFSA total-water AIs mapped to a drinking goal **[→ Q2]** |

### 4.3 Micronutrient reference values

Static, versioned data tables in `src/lib/engine/referenceValues/` keyed by `(nutrient, sex, ageBand)` with `target` (RDA/PRI/AI) and `upperLimit` (UL) where established — both **EFSA DRVs** and **NIH DRIs** shipped, switchable in settings **[→ Q11]**. Each value carries its source + type (RDA vs AI) so the UI can label honestly.

### 4.4 Tracked nutrient panel (v1) **[→ Q15]**

- **Energy & hydration:** energy (kcal, kJ secondary), water, alcohol (contributes 7 kcal/g).
- **Macros:** protein, carbohydrates, of which sugars, fiber, fat, saturated, monounsaturated, polyunsaturated, trans (limit), omega-3 (ALA + EPA/DHA), cholesterol.
- **Vitamins (14):** A (µg RAE), B1, B2, B3 (mg NE), B5, B6, B7 (µg), B9 (µg DFE), B12 (µg), C, D (µg), E (mg α-TE), K (µg), choline.
- **Minerals (12):** calcium, iron, magnesium, zinc, potassium, sodium, phosphorus, selenium (µg), copper, manganese, iodine (µg), chloride.
- **Extended (shown when data exists):** chromium, molybdenum, fluoride, caffeine.

Rule: unknown values are `null` ("no data"), never fake zeros; day totals mark nutrients whose sources had gaps with a subtle "incomplete data" hint.

### 4.5 Aggregation

Diary entries snapshot their computed nutrient amounts at log time (fast day sums, immutable history even if a custom food is edited later; a "recalculate this entry" affordance exists on edit). Day totals = sum of snapshots + water entries; coverage % = total / personal target, capped display at 100% with UL flagging above the limit.

---

## 5. Data architecture

### 5.1 Stack: Dexie 4 (IndexedDB) + `dexie-react-hooks`

```ts
// src/lib/db/schema.ts  (Dexie tables — indexes after the colon)
profile:       'id'                                   // single row 'me'
settings:      'id'                                   // single row 'app'
foods:         'id, name, category, source'           // seeded + user ('user' source)
recipes:       'id, name'
diaryEntries:  'id, date, [date+mealId], foodId'      // date = 'YYYY-MM-DD' local
waterEntries:  'id, date'
weightEntries: 'id, date'
favorites:     'foodId'
recents:       'foodId, lastUsedAt'
meta:          'key'                                  // seedVersion, schemaVersion, install date
```

- **Food record:** `{ id, source: 'seed'|'user'|'off', name, brand?, category, per100: NutrientVector, portions: [{label, grams}], isLiquid, density?, barcode?, verified }` — `NutrientVector = Partial<Record<NutrientId, number>>` per 100 g.
- **Diary entry:** `{ id, date, mealId, foodId?, recipeId?, quickAdd?, amount, unit, grams, snapshot: NutrientVector, loggedAt }`.
- **Seeding:** compressed JSON chunks lazy-imported on first run (async, with progress UI), `bulkPut` into `foods`; `meta.seedVersion` drives additive upgrades on app updates without touching user foods.
- **Migrations:** Dexie versioned schema upgrades; every release keeps an upgrade path.

### 5.2 Bundled food database (the big content task)

- ~1,500–2,500 generic foods across ~20 categories (produce, grains, legumes, nuts & seeds, dairy, eggs, meat, poultry, fish, oils, breads, pasta & rice, cereals, beverages, sweets, condiments, herbs & spices, plant-based alternatives, common prepared dishes, basic supplements) — European + international focus **[→ Q9]**.
- Full core-panel micro coverage per food; household portions per food ("1 medium apple — 182 g").
- **Automated validation suite** (runs in CI/tests): energy reconciliation (kcal ≈ 4·P + 4·C + 9·F + 7·alcohol + 2·fiber, tolerance-checked), macro mass ≤ 100 g, micro plausibility ranges per category, required-field completeness, duplicate detection. This is what separates a trustworthy DB from slop.
- Sourcing constraint: this build environment cannot reach USDA/Open Food Facts (network egress blocked), so v1 seed data is hand-curated from standard reference values and machine-validated — or built from a reference CSV you provide **[→ Q7]**.

### 5.3 Backup & durability

- **Export:** single `glynt-backup-YYYY-MM-DD.json` (versioned schema: profile, settings, user foods, recipes, diary, water, weight). **Import:** validate → choose merge or replace.
- **iOS reality check:** Safari can evict IndexedDB for non-installed sites after ~7 days of disuse. Mitigations: request `navigator.storage.persist()`, encourage Add-to-Home-Screen (installed PWAs are durable), periodic gentle backup reminder **[→ Q24]**.

---

## 6. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Build/framework | **Vite 7 + React 19 + TypeScript (strict)** | CleanOS needs React 19 + Tailwind v4; a local-first IndexedDB app gains nothing from SSR; Vite's static `dist/` is exactly what Capacitor consumes later — zero re-architecture. |
| Styling | **Tailwind CSS v4** + CleanOS tokens (`globals.css`) | The component library's native styling. |
| Components | **CleanOS** copied into `src/components/ui/` (MIT) + `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react` | Copy-paste model per its own docs; we own and can extend every component. |
| Routing | **React Router v7** (library mode) | Standard SPA routing, tab shells, route code-splitting. |
| State | **Zustand** (profile/targets/UI slices) + **Dexie `useLiveQuery`** for DB-backed views | Minimal, no boilerplate; DB is the source of truth. |
| Storage | **Dexie 4** (IndexedDB) | Mature, migrations, live queries, bulk ops. |
| Dates | **date-fns v4** | Tree-shakeable, local-date safe. |
| Charts | **Custom SVG** (ring, bars, sparkline) + CleanOS `BarChart` | Exact CleanOS aesthetic, tiny bundle, no chart-lib look. |
| Lists | `@tanstack/react-virtual` for food search | Smooth 2,000+ row search. |
| PWA | **vite-plugin-pwa** (Workbox) | Precache shell, offline, update flow. |
| Font | **@fontsource-variable/inter** (self-hosted) | Offline + GDPR-clean (no Google CDN). |
| i18n | Lightweight typed dictionary module | EN shipped, DE-ready **[→ Q18]** without i18next weight. |
| Tests | **Vitest** + Testing Library (engine, stores, seed validator) · **Playwright** e2e (onboard → log → totals) | The engine and seed DB are correctness-critical. |
| Quality | ESLint + Prettier + `tsc --noEmit` + CI script | Keeps the codebase shippable. |
| Hosting | **Vercel** static SPA (`vercel.json`: SPA rewrite, immutable asset caching, security headers) | Requirement. |
| Barcode (if approved) | Native `BarcodeDetector` + `zxing-wasm` fallback | Works on Android Chrome + iOS Safari **[→ Q8]**. |

**Bundle discipline:** initial route target < 200 KB gz JS; seed DB lazy-loaded post-first-paint; charts hand-rolled; route-level code splitting.

### 6.1 Project structure

```
src/
  app/                 # router, shell, providers, tab layout
  components/ui/       # CleanOS components (copied, owned)
  components/glynt/    # composed app components (EnergyRing, MacroBars,
                       #   NutrientRow, CoverageGrid, MealSection, PortionSheet…)
  features/            # onboarding/ today/ log/ insights/ library/ settings/
  lib/
    engine/            # BMR/TDEE/targets, referenceValues/ (EFSA, NIH), units
    db/                # dexie schema, repositories, seed loader, export/import
    i18n/              # typed strings
    utils/
  data/
    foods/             # seed source JSON (by category) + build validator
  styles/globals.css   # CleanOS tokens (+ Glynt accent [→ Q16])
public/                # manifest, icons, apple meta
tests/  e2e/
```

---

## 7. Design

### 7.1 CleanOS integration

Tokens, helpers (`cn`, `hooks`, `Portal`) and needed components copied verbatim from the CleanOS repo, then owned. The design rules are followed strictly: white canvas, `bg-surface` cards, almost no borders, one accent, `rounded-field/row/card/sheet` silhouette, `pressable` on everything interactive, 150–400 ms transform/opacity motion, dark mode via `.dark` class (system + manual toggle), safe-area utilities everywhere.

Key components per screen: `Screen`, `TopBar`, `BottomNav`, `Fab`, `Sheet` (all pickers & log flow), `Card`, `StatCard`, `ProgressCard`, `Progress`/rings, `BarChart`, `DayStrip`, `SegmentedControl`, `WheelPicker` (height/weight/birthday), `OptionList`, `RowGroup/Row`, `TextField`, `SearchField`, `Stepper`, `Chip`, `Badge`, `Callout`, `Toast`, `EmptyState`, `Skeleton`, `Dialog` (destructive confirms), `ActionSheet` (entry context menus), `Accordion` (full-panel disclosure), `Carousel` (onboarding).

### 7.2 Glynt-specific composites (built in CleanOS language)

- **EnergyRing** — large SVG ring, `text-display` center (remaining kcal), tabular numerals.
- **MacroBars** — four labeled progress bars with g-values; limits (sugar/sat-fat/salt) render as "stay under" style, never red-shame (warning tint only past 100%).
- **CoverageSummary** — "18 of 26 on track" + worst-gaps chips.
- **NutrientRow** — name · amount · animated % bar · target; UL badge when exceeded.
- **CoverageGrid / trend heat strip** — insights overview, worst-first.
- **WeightSparkline**, **WaterGlasses**, **StreakChip**.

Accent color: CleanOS ships sky-blue; Glynt may adopt a signature accent **[→ Q16]** — single-variable swap by design. Iconography: lucide-react only (consistent stroke); app icon/logo designed in-project as SVG **[→ Q17]**.

### 7.3 States & polish bar

Every list has a designed empty state with a next action; every async surface has skeletons; destructive actions confirm via Dialog and support Undo where possible; offline is silent (app just works) except OFF search, which degrades with a clear Callout; reduced-motion respected; touch targets ≥ 44 px; AA contrast; desktop gets the centered `max-w-md` column (CleanOS `Screen`) so it stays beautiful in a browser.

---

## 8. Delivery plan

Each milestone ends in a working, pushed app state. No milestone ships placeholder UI.

| # | Milestone | Contents | Done when |
|---|---|---|---|
| M0 | Foundation | Vite+TS+Tailwind v4 scaffold, CleanOS tokens/helpers/components, router shell + tabs, Dexie schema, theme system, CI scripts (lint/typecheck/test), Vercel config | App boots to empty shell on Vercel, dark mode works |
| M1 | Engine | Units, BMR/TDEE/targets, EFSA+NIH reference tables, nutrient model — fully unit-tested | 100% of engine functions tested against hand-computed cases |
| M2 | Onboarding | Full wizard incl. pickers, validation, targets reveal, profile persistence, re-edit flow | New user reaches personalized dashboard |
| M3 | Food DB + logging | Seed DB (curation + validator), search, portions, meals, diary CRUD with undo, quick-add, favorites/recents, custom foods, recipes | The 30-second log loop is real with accurate math |
| M4 | Today dashboard | EnergyRing, MacroBars, coverage summary, meal sections, water, day switching, streak | Today screen is the product promise, live |
| M5 | Nutrition detail + insights | Day panel, per-nutrient drilldown (trend, top sources, info texts), Insights tab, weight journal | Gap-closing loop works end-to-end |
| M6 | Settings + data | Full You tab, overrides, units/i18n plumbing, export/import/erase, About/disclaimer | Data round-trips through backup files |
| M7 | PWA + hardening | Manifest/icons/iOS meta, offline, update toast, storage persistence, Playwright e2e, perf pass, a11y pass, seed-data audit, copy polish | Lighthouse PWA installable; e2e green; ready for your iteration rounds |
| — | (Optional per answers) | OFF search + barcode **[→ Q7/Q8]**, supplements **[→ Q3]** | |

After M7: your iteration/feedback rounds → fixes/changes → only then the Capacitor phase (separate plan: native shell, haptics, local notifications, health-app integrations, store assets).

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Seed nutrient data accuracy (no USDA/OFF egress from build env) | Machine-validated curation (energy reconciliation, plausibility ranges), category-by-category review, optional reference-CSV path **[→ Q7]**, per-food source labeling, post-v1 refinement pipeline |
| iOS storage eviction | `storage.persist()`, install prompt, backup nudges, tested export/import |
| Scope creep vs. "full app" bar | This plan + your answers = frozen v1 scope; everything else is a post-v1 list |
| Micro-tracking overwhelm (UX) | Coverage summary first, full table one tap deeper; progressive disclosure via Accordion |
| Medical-adjacent guidance | RDA/AI/UL labeled with sources; disclaimer at onboarding + About; no clinical claims |

---

*Next step: answer [`USER_QUESTIONS.md`](./USER_QUESTIONS.md) — then M0 begins.*
