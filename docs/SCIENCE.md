# Science — Formulas, Reference Values, Suggestion Algorithm

> The domain logic contract. Implemented as pure, unit-tested functions in `src/lib/engine/` with sources cited in code and surfaced in the About screen. Nothing here is hardcoded into UI components (D-025).

## 1. Energy

**BMR — Mifflin-St Jeor** (default; Mifflin et al. 1990):

```
male:   10·weightKg + 6.25·heightCm − 5·ageYears + 5
female: 10·weightKg + 6.25·heightCm − 5·ageYears − 161
```

**BMR — Katch-McArdle** (auto-selected when body-fat % is provided):

```
370 + 21.6 · leanMassKg        // leanMass = weight · (1 − bodyFat%)
```

**TDEE** = BMR × activity factor:

| Level (UI German) | Factor | Description shown |
|---|---|---|
| Sitzend | 1.2 | Bürojob, wenig Bewegung |
| Leicht aktiv | 1.375 | 1–3× Sport/Woche oder viel zu Fuß |
| Moderat aktiv | 1.55 | 3–5× Sport/Woche |
| Sehr aktiv | 1.725 | 6–7× Sport/Woche |
| Extrem aktiv | 1.9 | Körperliche Arbeit + tägliches Training |

**Energy target** = TDEE × approach modifier (D-001): Nähren ×1.0 · Sanft reduzieren ×0.85–0.90 · Aufbauen ×1.10–1.15 (slider within range). Always manually overridable (override stored separately; profile changes re-derive the auto value but never silently clobber an explicit override — the diff screen offers to update it).

**Calculation basis** (D-012): formulas & sex-keyed reference values use sex assigned at birth by default; explicit override "Berechnungsgrundlage" in settings. Gender identity never enters math.

**Age** derives from birth date at calculation time; targets auto-refresh when an age-band boundary is crossed.

## 2. Macronutrient targets (defaults — every value user-overridable)

| Target | Default rule | Source |
|---|---|---|
| Protein | by activity: sitzend 0.8 g/kg · leicht 1.0 · moderat 1.2 · sehr 1.4 · extrem 1.6 g/kg | D-013; DGE/EFSA baseline 0.8, sports-nutrition consensus upper |
| Fat | 30 % of energy (AMDR 20–35 %) | EFSA/DGE |
| Carbohydrates | remainder: (energy − protein·4 − fat·9) / 4 | — |
| Fiber | EFSA AI 25 g/d (NIH mode: 14 g/1000 kcal) | EFSA 2010 / IOM |
| Sugar (limit) | < 10 % of energy | WHO 2015 |
| Saturated fat (limit) | < 10 % of energy | DGE/WHO |
| Salt (limit) | < 5 g/d (≈ 2 g sodium; ×2.5 conversion, shown both) | WHO |
| Water (drink goal) | EFSA total-water AI (2.0 L f / 2.5 L m adults) × 0.8 food-share correction, rounded to glass size | EFSA 2010 |
| Alcohol | tracked, contributes 7 kcal/g, no "target" — informational only | — |

Energy from macros for validation: **4/4/9/7/2** kcal per g (carbs/protein/fat/alcohol/fiber, EU convention).

## 3. Micronutrient reference values

Static versioned tables in `src/lib/engine/reference/`, keyed `(nutrientId, basis: f|m, ageBand)` → `{ value, kind: 'RDA'|'AI'|'PRI', ul?: number, ulKind?: 'UL'|'guidance' }`.

- **Sources shipped:** EFSA DRVs (default, EU) and NIH/IOM DRIs (switchable, D-011). Each table file carries citation comments; the UI labels values with kind + source („PRI, EFSA").
- **Age bands:** v1 covers ≥ 15 years in EFSA bands (15–17, 18–24, 25–50, 51–64, 65–74, ≥ 75 where sources differentiate; collapsed where they don't). Younger users see a notice (app is 16+ anyway).
- **ULs:** shown only where the source establishes one; exceeding UL flags a warning (relevant mostly with supplements). No UL ≠ "unlimited" — copy says „kein Limit festgelegt".
- v1 excludes pregnancy/breastfeeding sets (D-014) — notice in profile when relevant.

## 4. Aggregation rules

- Diary entries **snapshot** computed nutrients at log time (immutable history; per-entry „neu berechnen" on edit).
- Day totals = Σ snapshots (+ water log). Coverage = total / personal target; ring/bars cap at 100 % display, UL flag above limit.
- **Honest gaps:** if any logged food lacks data for nutrient N, the day's N total gets `incomplete: true` → subtle hint („Datenlücke bei 2 Einträgen"), never fake zeros (only OFF/user foods can be incomplete; seed foods have full core panels).

## 5. Tracked nutrient panel (D-015)

Panel definition lives in `src/config/nutrients.ts` (ids, units, groups, display order, decimals, German names, info texts) — the single source of truth for the whole app.

| Group | Nutrients (unit) |
|---|---|
| Energie | Energie (kcal; kJ secondary) · Alkohol (g) · Wasser (ml) |
| Makros | Protein (g) · Kohlenhydrate (g) · davon Zucker (g) · Ballaststoffe (g) · Fett (g) |
| Fette im Detail | gesättigt (g) · einfach ungesättigt (g) · mehrfach ungesättigt (g) · trans (g, limit) · Omega-3 gesamt ALA+EPA/DHA (g) · Cholesterin (mg) |
| Vitamine | A (µg RAE) · B1 Thiamin (mg) · B2 Riboflavin (mg) · B3 Niacin (mg NE) · B5 Pantothensäure (mg) · B6 (mg) · B7 Biotin (µg) · B9 Folat (µg DFE) · B12 (µg) · C (mg) · D (µg) · E (mg α-TE) · K (µg) · Cholin (mg) |
| Mineralstoffe | Calcium (mg) · Eisen (mg) · Magnesium (mg) · Zink (mg) · Kalium (mg) · Natrium (mg, + Salz g display) · Phosphor (mg) · Selen (µg) · Kupfer (mg) · Mangan (mg) · Jod (µg) · Chlorid (mg) |
| Erweitert (shown when data exists) | Chrom (µg) · Molybdän (µg) · Fluorid (mg) · Koffein (mg) |

## 6. Smart suggestions (D-007) — deterministic, explainable

**Trigger surfaces:** „Das würde heute helfen" card on Today (when ≥ 1 meaningful gap and > ~300 kcal budget remain) and inside each nutrient detail screen (nutrient-scoped variant).

**Inputs:** remaining gaps per nutrient `gapN = max(0, target − loggedToday)`, remaining energy budget, remaining limit headroom (sugar/satfat/salt/UL), time of day, user history (favorites, recents, frequency), candidate set = seed foods + user foods + recipes + supplements (OFF-cached excluded by default — thin micro data).

**Scoring per candidate** (at its default sensible portion):

```
score = Σ_over-gap-nutrients  weight_n · min(amount_n / gap_n, 1)   // gap closing, capped
      − energyPenalty   // portion kcal vs remaining budget (soft, steep when exceeding)
      − limitPenalty    // pushes past sugar/satfat/salt limits or any UL → strong penalty
      + familiarity     // small bonus for favorites/frequently logged
      + mealFit         // small bonus if category fits time of day (config table)
```

`weight_n` prioritizes the worst relative gaps (lowest coverage first). Results are **diversified** (max 2 per food category), top ~6 shown. Each card explains itself: „Deckt 45 % deines Magnesium-Bedarfs · 120 kcal" with one-tap log at the suggested portion (adjustable). All weights/thresholds live in `src/config/suggestions.ts` (D-025), unit-tested with fixture profiles.

**Non-goals:** no ML, no cloud, no dietary-preference modeling in v1 (post-v1 candidate: vegan/vegetarian filter).

## 7. Disclaimer & framing

Reference values are population-level guidance (healthy adults). The app: shows „Kein medizinischer Rat" at onboarding + About; labels every target with kind+source; presents limits as „bleib möglichst darunter", coverage as „gut versorgt", never diagnostic language.
