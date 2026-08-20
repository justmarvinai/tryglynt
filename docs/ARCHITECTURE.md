# Architecture — Stack, Structure, Conventions

> How Glynt is built and why. Data model: [DATA.md](./DATA.md) · Domain logic: [SCIENCE.md](./SCIENCE.md) · Visuals: [DESIGN.md](./DESIGN.md).

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Build | **Vite 7 + React 19 + TypeScript (strict)** | CleanOS needs React 19 + Tailwind v4; local-first app gains nothing from SSR; Vite's static `dist/` is exactly what Capacitor wraps later — zero re-architecture. |
| Styling | **Tailwind CSS v4** + CleanOS tokens | Library-native. Glynt green accent via tokens only. |
| Components | **CleanOS** (copied, owned, MIT) + custom `glynt/` components in the same language (D-024) | Copy-paste model per CleanOS docs; deps: clsx, tailwind-merge, cva, lucide-react. |
| Routing | **React Router v7** (library mode) | SPA tabs, route code-splitting. |
| State | **Zustand** slices + **Dexie `useLiveQuery`** | DB is source of truth; stores hold derived/UI state only. |
| Storage | **Dexie 4** (IndexedDB) | Migrations, live queries, bulk ops. |
| Dates | **date-fns v4** | Local-date safe, tree-shakeable. |
| Charts | **Custom SVG** (+ CleanOS BarChart) | Exact aesthetic, tiny bundle. |
| Virtual lists | `@tanstack/react-virtual` | 2k+ row food search. |
| PWA | **vite-plugin-pwa** (Workbox) | Precache shell, offline, update toast. |
| Font | **@fontsource-variable/inter** | Self-hosted → offline + GDPR-clean. |
| i18n | Typed dictionary module, `de` shipped | No i18next weight; more locales post-v1 (D-018). |
| Tests | **Vitest** + Testing Library · **Playwright** e2e | Engine & seed data are correctness-critical. |
| Quality | ESLint + Prettier + `tsc --noEmit` | `npm run check` gates every push. |
| Hosting | **Vercel** static SPA | `vercel.json`: SPA rewrite, immutable assets, security headers. |
| Barcode | Native `BarcodeDetector`, `zxing-wasm` fallback | Android Chrome + iOS Safari. |

**Bundle discipline:** initial route < 200 KB gz JS; seed DB lazy-loads post-first-paint; route-level code splitting; no chart/date/i18n mega-libs.

## 2. Project structure

```
src/
  app/                  # router, providers, tab shell, theme bootstrap
  components/
    ui/                 # CleanOS components (copied, owned)
    glynt/              # custom composites (EnergyRing, MacroBars, CoverageSummary,
                        #   NutrientRow, SuggestionCard, MealSection, PortionSheet, …)
  features/             # vertical slices: onboarding/ today/ log/ insights/
                        #   nutrients/ library/ settings/
  lib/
    engine/             # pure domain logic (see SCIENCE.md) + reference/ tables
    db/                 # dexie schema, repositories, seeding, export/import
    connectors/         # off.ts (runtime), shared FoodImport interface
    i18n/               # t(), de.ts dictionary
    utils/
  config/               # ★ the "nothing hardcoded" layer (see §3)
  data/foods/           # seed authoring JSON per category
  styles/globals.css    # CleanOS tokens + Glynt accent
scripts/                # build-seed, validate-seed, import-usda, import-bls, icons
public/                 # manifest, icons
tests/                  # vitest unit/integration
e2e/                    # playwright
```

**Feature slices** own their screens/hooks/components; shared visual pieces graduate to `components/glynt/`; anything domain-pure lives in `lib/engine`. Import direction: `features → components/lib/config`, never sideways between features.

## 3. Configuration over hardcoding (D-025)

Standing rule: **all domain constants live in `src/config/` or `lib/engine/reference/`** — components receive them via typed imports/props, never inline literals. Concretely:

| Config module | Owns |
|---|---|
| `config/nutrients.ts` | Panel: ids, units, groups, order, decimals, German names, info texts |
| `config/categories.ts` | Food categories (ids, names, icons, meal-fit table) |
| `config/activity.ts` | Activity levels, factors, descriptions |
| `config/targets.ts` | Default target rules (protein-by-activity, fat %, limits, water) |
| `config/meals.ts` | Default meal slots + time windows for auto-suggest |
| `config/suggestions.ts` | Suggestion weights, thresholds, diversity rules |
| `config/units.ts` | Unit definitions & conversions (metric/imperial, salt↔sodium) |
| `config/app.ts` | App meta, feature flags (offConnector, barcode, suggestions…), nudge cadence |
| `lib/engine/reference/` | EFSA + NIH value tables (versioned, cited) |
| `lib/i18n/de.ts` | Every user-visible string (no literals in JSX) |

User-facing tweakability: overridable values (targets, meals, water goal, units, theme, reference source, calculation basis) persist in `settings`/`profile` and always win over config defaults. Feature flags let us stage risky features.

## 4. State & data flow

```
Dexie (source of truth) ──useLiveQuery──▶ feature hooks ──▶ screens
        ▲                                      │
   repositories (lib/db)  ◀── actions ─────────┘
        │
  engine (pure) computes targets/aggregations/suggestions from plain data
```

- `profileStore` (Zustand): profile + derived targets (recomputed via engine on change, cached).
- `uiStore`: active date, open sheets, toasts, theme.
- Repositories wrap all writes (single place for snapshots, timestamps, recents upkeep). Components never touch Dexie directly.

## 5. i18n (German-first)

`t('today.remaining', { kcal })` with a fully typed key map; `de.ts` is the only shipped locale in v1 but the mechanism is locale-plural-ready. Numbers/dates format via `Intl` with `de-DE`. Rule: **no user-visible string literals in components** — everything through the dictionary, so future locales are a file, not a refactor.

## 6. PWA

- Manifest: name/short_name „Glynt", `lang: de`, standalone, maskable icons, theme/background per scheme.
- Workbox: precache shell + fonts; no runtime caching of OFF API (fresh data, cached products live in Dexie instead); OFF product images cache-first with cap.
- Update flow: new SW → „Update verfügbar" toast → reload on confirm.
- iOS: apple-touch-icon, status-bar meta, `storage.persist()`, install hint sheet (dismissible, remembered).

## 7. Testing strategy

- **Engine:** exhaustive unit tests (BMR/TDEE/targets vs hand-computed cases, reference lookups incl. band edges, aggregation incl. honest-gap semantics, suggestion scoring fixtures, unit conversions).
- **Seed data:** validator suite runs as tests — red CI on implausible food data.
- **Repositories:** integration tests on in-memory IndexedDB (fake-indexeddb).
- **e2e (Playwright):** onboard → log → totals visible → backup export/import roundtrip → offline reload.
- Command gate: `npm run check` = lint + typecheck + unit tests. Run before every push.

## 8. Capacitor readiness (post-v1, do not build now)

Static `dist/` + no SSR + hash-free router (history mode fine) + all storage client-side means `npx cap add ios/android` later consumes the app as-is. Native phase adds: haptics, local notifications (D-021), native barcode, health integrations, store assets. Keep dependencies browser-pure (no Node APIs in app code) to preserve this.

## 9. Conventions

- TypeScript strict; no `any` without a comment.
- Conventional commits (`feat:`, `fix:`, `docs:`, `data:` for seed food data, `chore:`).
- Components: PascalCase files in `glynt/`, kebab-case in `ui/` (CleanOS convention preserved).
- Update [CHANGELOG.md](../CHANGELOG.md) under „Unreleased" with every user-visible change; new decisions → [DECISIONS.md](./DECISIONS.md).
