# Decision Log

Binding decisions for Glynt. Newest entries at the bottom. When a decision changes, add a new entry that supersedes the old one — never rewrite history.

> Convention: docs & code are **English**, the app UI is **German** (see D-018).

## D-001 … D-023 — v1 scope (2026-08-20, answered by Marvin in question round 1)

| # | Topic | Decision |
|---|---|---|
| D-001 | Weight goals | Neutral default (maintenance TDEE) + optional "approach": **Nähren (halten)** / **Sanft reduzieren (−10–15 %)** / **Aufbauen (+10–15 %)**; energy target always manually overridable. |
| D-002 | Water tracking | **In v1.** Quick-tap glasses on Today, personal goal from EFSA total-water AI. |
| D-003 | Supplements | **In v1.** Supplements are a food type; a saved daily regimen ("Mein Stack") logs in one tap; counts toward micros incl. UL warnings. |
| D-004 | Body metrics | Weight + optional body-fat % journal with trend chart. Neutral framing, no target weight required. |
| D-005 | Streak | Subtle "days logged" streak chip. No badges/XP/confetti. |
| D-006 | Exercise & extras | **Out of v1:** exercise logging (activity covered via TDEE level), fasting timer, AI coach, social. |
| D-007 | Smart suggestions | **In v1 (added by Marvin):** deterministic algorithm suggesting foods/meals that close today's remaining nutrient gaps (e.g. low vitamin A → suggests rich sources in sensible portions). Explainable, one-tap loggable. Spec: [SCIENCE.md §6](./SCIENCE.md). |
| D-008 | Food data sources | Hybrid: **bundled offline seed DB** (German-market foods, full micro panels, machine-validated) + **Open Food Facts API** at runtime (branded products, barcode) + **import pipelines** for USDA FDC (gap-filling) and **BLS 4.0** (licensed — importer ready, data NOT bundled; see [DATA.md §4](./DATA.md)). |
| D-009 | Barcode scanning | **In v1** (camera; native `BarcodeDetector` + zxing fallback), paired with OFF. |
| D-010 | Food focus | German/European staples first (Vollkornbrot, Quark, Skyr, Linsen …) + international basics. |
| D-011 | Reference values | Ship **EFSA (default)** and **NIH/DRI**, switchable in settings. |
| D-012 | Sex & gender | Calculations default to **sex assigned at birth**; explicit settings override "Berechnungsgrundlage: Weiblich/Männlich" with respectful explanation. Gender identity stored separately, personalization only, never math. |
| D-013 | Protein default | Scales with activity: 0.8 g/kg sedentary → 1.2 moderate → 1.6 very active+. Always editable. |
| D-014 | Pregnancy/breastfeeding | Post-v1. v1 shows a notice that targets don't cover pregnancy/breastfeeding. |
| D-015 | Nutrient panel | As specced in [SCIENCE.md §5](./SCIENCE.md) (energy, water, alcohol, macro+fat breakdown incl. omega-3, cholesterol, 14 vitamins, 12 minerals, extended set). |
| D-016 | Accent color | **Fresh green** `#30c96e` family (see [DESIGN.md §2](./DESIGN.md)). Everything else stays CleanOS monochrome. |
| D-017 | Logo & brand | Logo/app icon designed in-project (minimal SVG mark). "Glynt" = modern/techy name; wordplay with *glint* (EN) / *glänzen* (DE) is welcome in copy. |
| D-018 | Language | **German only for v1** (informal "du", target market Germany). Architecture i18n-ready; more languages post-v1. Code, comments & docs remain English. |
| D-019 | Units | Metric default; imperial (lb, ft/in) switchable. |
| D-020 | Meal slots | Default Frühstück · Mittagessen · Abendessen · Snacks; rename/add/remove/reorder in settings. |
| D-021 | Notifications | None in v1 (quiet in-app nudges only, e.g. backup reminder). Push revisited in Capacitor phase. |
| D-022 | Analytics | None. "Private by design" stays literally true (revisit only at public release). |
| D-023 | Tone of voice | Calm, encouraging, factual German ("Vitamin D ist heute noch niedrig — Lachs, Eier oder dein Supplement würden es decken."). Never guilt, never bro-fitness. |

## D-024 — Components (2026-08-20)

CleanOS is the foundation, but **custom components are explicitly allowed and expected** wherever the app needs them — as long as they follow the CleanOS design language (tokens, radii, motion, monochrome+accent). Custom components live in `src/components/glynt/`.

## D-025 — Nothing hardcoded (2026-08-20)

Standing engineering rule from Marvin: the app must stay **easily editable, adaptable and tweakable**. Concretely: all domain constants (nutrient panel, reference values, activity factors, target rules, meal defaults, feature flags, copy) live in dedicated config/data modules — never inline in components. See [ARCHITECTURE.md §3](./ARCHITECTURE.md).

## D-026 — Default behaviors accepted without objection (2026-08-20)

Midnight day boundary · Monday week start · kcal primary (kJ secondary) · salt g + sodium mg (×2.5) · dark mode system+toggle · diary snapshots at log time with per-entry recalculate · destructive confirms + Undo for diary deletes · JSON export with merge/replace import + ~30-day backup nudge · desktop renders centered phone-width column · medical disclaimer at onboarding + About · no external runtime requests except Open Food Facts; Inter self-hosted.

---

## Template for future decisions

```md
## D-0XX — <topic> (<date>)
**Context:** <why this came up>
**Decision:** <what was decided>
**Supersedes:** <D-0YY or —>
```
