# AGENTS.md — Working on Glynt

Guide for any AI agent (and human) developing this repo. Read this before changing anything.

## What this is

**Glynt** — privacy-first nutrition tracking PWA for the German market. Tracks calories, macros and the full micronutrient panel against personal daily needs. Mobile-first, no backend, IndexedDB, German-only UI (v1), CleanOS design system, deployed on Vercel; Capacitor wrap comes after v1. Full picture: [docs/PRODUCT.md](./docs/PRODUCT.md).

## Documentation map (keep it in sync!)

| File | Owns |
|---|---|
| [docs/PRODUCT.md](./docs/PRODUCT.md) | Vision, features, flows, screens |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Stack, structure, conventions, config layer |
| [docs/DATA.md](./docs/DATA.md) | Nutrient model, Dexie schema, food sources/importers, backup |
| [docs/SCIENCE.md](./docs/SCIENCE.md) | Formulas, reference values, suggestion algorithm |
| [docs/DESIGN.md](./docs/DESIGN.md) | CleanOS rules, Glynt green, custom components, German tone |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Binding decision log (append-only) |
| [ROADMAP.md](./ROADMAP.md) | Milestones + post-v1 backlog |
| [CHANGELOG.md](./CHANGELOG.md) | Keep-a-Changelog, update with every user-visible change |
| [USER_QUESTIONS.md](./USER_QUESTIONS.md) | Open questions for Marvin (empty when none) |

**Rule:** code change ⇒ check whether a doc owns that topic and update it in the same commit. New product/tech decision ⇒ append to DECISIONS.md. Question for Marvin ⇒ add to USER_QUESTIONS.md instead of guessing on important calls.

## Hard rules

1. **No placeholder features.** Everything merged is finished, working, German, designed (incl. empty/loading/error states).
2. **Nothing hardcoded** (D-025): domain constants/config → `src/config/` or `lib/engine/reference/`; user-visible strings → `src/lib/i18n/de.ts` (no literals in JSX); components receive config, never contain it.
3. **German UI, English code/docs** (D-018): informal „du", tone per [DESIGN.md §5](./docs/DESIGN.md).
4. **CleanOS design language** for everything visual; custom components allowed (D-024) but must match tokens/radii/motion. CleanOS source reference: https://github.com/EinPallux/CleanOS (copy from `src/components/ui/`).
5. **Honest data:** absent nutrient ≠ 0. Never fake completeness. Seed foods must pass the validator.
6. **Privacy:** no analytics, no external calls except user-triggered Open Food Facts. No new origins without a decision entry.
7. **Engine changes require tests.** `lib/engine` is pure and unit-tested; seed data changes must keep `validate-seed` green.
8. **BLS data is licensed** — importer ships, data never gets committed ([DATA.md §4](./docs/DATA.md)).
9. Update CHANGELOG under „Unreleased" with every user-visible change.
10. **Accessibility is a gate, not a nicety** (D-027): `npm run e2e` runs axe over onboarding, all tabs in both themes and the log sheet. Never dim text with `opacity`; use the `muted`/`faint` tokens. Accent as text → `text-accent-text`; accent as fill → `bg-accent` + `text-accent-foreground`.

## Commands

```bash
npm run dev            # Vite dev server
npm run build          # production build
npm run check          # lint + typecheck + unit tests  ← run before every push
npm run test           # vitest
npm run e2e            # playwright journeys + axe accessibility audits
npm run seed:validate  # food data validator on its own
npm run icons          # regenerate PWA icons from the Glynt mark
npm run import:usda    # USDA gap-filler  (needs data-sources/, see DATA.md §4)
npm run import:bls     # BLS importer     (licensed data, never committed)
```

Both gates must be green before pushing: `npm run check` **and** `npm run e2e`.

## Git

- Branch for current work: `claude/glynt-nutrition-app-ucj8lk` (push with `git push -u origin <branch>`).
- Conventional commits: `feat:` `fix:` `docs:` `data:` (seed food data) `chore:` `test:` `refactor:`.
- Commit per coherent unit; milestone completion = its own commit + push.

## Where things live (quick map)

| Need to change… | Go to |
|---|---|
| A nutrient, its German name, unit or info text | `src/config/nutrients.ts` |
| Target rules (protein/kg, fat %, limits, water) | `src/config/targets.ts` |
| Activity levels & factors | `src/config/activity.ts` |
| Reference values (EFSA/NIH) | `src/lib/engine/reference/` |
| Suggestion weights & thresholds | `src/config/suggestions.ts` |
| Default meal slots & time windows | `src/config/meals.ts` |
| Feature flags (OFF, barcode, suggestions, supplements) | `src/config/app.ts` |
| Any user-visible German string | `src/lib/i18n/de.ts` |
| Colors, radii, motion | `src/styles/globals.css` |
| Seed foods | `src/data/foods/categories/*.ts` (+ `AUTHORING.md`) |

## Environment notes (Claude Code on the web)

- Network egress is restricted: USDA/Open Food Facts/BLS **not reachable from the sandbox** (runtime OFF calls from users' browsers are unaffected). Seed data is authored in-repo; importers run when data/network is available.
- A local clone of CleanOS may exist at `/home/user/einpallux/cleanos` (re-clone: `GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/EinPallux/cleanos /home/user/einpallux/cleanos`).
- npm registry is reachable through the proxy.
