# Roadmap

Every milestone ends in a working, committed, pushed app state — no placeholder features, ever. Details per area: [docs/](./docs).

## v1 — feature-complete (M0–M7 done, in iteration)

| # | Milestone | Contents | Done when |
|---|---|---|---|
| ✅ M0 | Foundation | Vite+React19+TS+Tailwind4 scaffold, CleanOS tokens/components with Glynt green, router + tab shell, Dexie base, theme system, i18n(de) module, logo/icons, PWA base, Vercel config, lint/typecheck/test tooling | Boots clean on Vercel, dark mode works, `npm run check` green |
| ✅ M1 | Engine | Nutrient panel config, units, BMR/TDEE/targets, EFSA+NIH reference tables, aggregation — fully unit-tested | Engine tests green incl. hand-computed cases |
| ✅ M2 | Onboarding | Full German wizard incl. wheel pickers, validation, targets reveal, profile persistence, re-edit + diff | New user reaches personalized dashboard |
| ✅ M3 | Food DB + logging | Seed pipeline + validator + German food tranche, search (virtualized), portion sheet, meals, diary CRUD + undo, quick-add, copy day/meal, favorites/recents, custom foods, recipes, supplements + „Mein Stack" | 30-second log loop real with accurate math |
| ✅ M4 | Today | EnergyRing, MacroBars, CoverageSummary, meal sections, water, day strip, streak | Today screen delivers the product promise |
| ✅ M5 | Detail + Insights | Day panel, per-nutrient detail (trend, top sources, info), Insights (Woche/Monat/3M), weight journal, **smart suggestions** | Gap-closing loop end-to-end |
| ✅ M6 | Settings + OFF | Complete Du-tab, overrides, units, reference source, meal slots; Open Food Facts search + **barcode**; export/import/erase; About | Data round-trips; branded products scannable |
| ✅ M7 | Hardening | PWA polish (offline, update toast, persist), Playwright e2e, a11y/perf pass, seed data audit & expansion, copy polish | Installable, e2e green, ready for Marvin's iteration rounds |

**Status:** all milestones complete — the app onboards, logs, analyses,
suggests, syncs nothing, backs up and installs. Now in Marvin's
iteration/feedback rounds until v1 is declared done; the Capacitor phase
starts only after that.

Verification gates in place: `npm run check` (lint + typecheck + 79 unit
tests incl. the seed-data validator) and `npm run e2e` (13 Playwright
journeys incl. 4 axe accessibility audits).

## Post-v1 backlog (unordered — decide when we get there)

- Additional languages (EN first), incl. food-name localization strategy
- **Capacitor phase** (own plan): native iOS/Android shell, haptics, local notification reminders (D-021), native barcode, HealthKit/Health Connect, store assets & release pipeline
- Pregnancy/breastfeeding target sets (D-014)
- BLS 4.0 data activation once licensed (importer ships in v1 — [docs/DATA.md §4](./docs/DATA.md))
- USDA gap-filling run for seed micros
- Dietary-preference filter for suggestions (vegan/vegetarian)
- Seed DB continuous expansion (community wishes)
- Optional cookieless analytics at public release (D-022 revisit)
- Account/sync (only if ever truly needed — privacy-first stays)

## Anti-goals (won't do)

Weight-loss gamification, ads, data selling, social feeds, engagement dark patterns.
