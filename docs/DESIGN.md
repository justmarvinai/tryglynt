# Design — CleanOS Foundation, Glynt Identity, Copy

> The visual & verbal contract. Product behavior: [PRODUCT.md](./PRODUCT.md). CleanOS source of truth: local clone of [EinPallux/CleanOS](https://github.com/EinPallux/CleanOS) (components copied into `src/components/ui/`).

## 1. CleanOS design language (we follow this strictly)

- **Canvas:** pure white `bg-background`; interactive surfaces soft gray `bg-surface` (pressed `bg-surface-2`). Almost no borders — shape + contrast; hairlines only for grouping.
- **Type:** Inter. Bold confident titles (`text-title1/2/3`), muted support (`text-muted`/`text-faint`), huge tabular stat numbers (`text-display`). Body 17 px.
- **Color:** monochrome + **one accent** (Glynt green, §2). Near-black `bg-inverse` for premium CTAs/toggles. Status green/red/orange + playful pink for selection highlights. `*-soft` tints for backgrounds.
- **Shape:** `rounded-field` 16 · `rounded-row` 20 · `rounded-card` 28 · `rounded-sheet` 40 · `rounded-full` for every button/chip/pill.
- **Depth:** flat by default; `shadow-soft` white-on-gray circles, `shadow-pop` floating, `shadow-fab` FAB glow, `shadow-sheet` sheets.
- **Motion:** 150–400 ms, transform+opacity only; `pressable` (scale 0.97) on everything interactive; `--ease-out-quart` entrances, `--ease-spring` playful.
- **Layout:** mobile-first in `<Screen>` (max-w-md, px-5, centered on desktop); 12 px grid-tile gaps; sections `mt-8`; rows min-h-16/14; touch ≥ 44 px; safe-area utilities; dark mode via `.dark` class.

Component picks per job: CleanOS cheatsheet (`src/lib/cheatsheet.ts` in the clone). Custom components are welcome when CleanOS lacks a piece (D-024) — they live in `src/components/glynt/` and must be indistinguishable in language from CleanOS.

## 2. Glynt accent — Fresh Green (D-016)

Single-token swap of the CleanOS accent. Success stays its own (very close) green — in a nutrition app "covered = green = brand" is intentional coherence. Pink remains the playful day-selection highlight. Everything else untouched.

```css
:root {
  --cos-accent:            #30c96e;   /* Glynt green — FILLS only */
  --cos-accent-strong:     #23b25e;   /* pressed / emphasis */
  --cos-accent-soft:       #e2f8eb;   /* tinted backgrounds */
  --cos-accent-foreground: #05301a;   /* ink ON the green fill (8.8:1) */
  --cos-accent-text:       #0f7a3d;   /* accent as TEXT on light (5.4:1) */
}
.dark {
  --cos-accent:            #3bd47d;
  --cos-accent-strong:     #63e099;
  --cos-accent-soft:       #102b1c;
  --cos-accent-foreground: #062a16;
  --cos-accent-text:       #4ede8d;   /* bright green already clears AA on dark */
}
```

**Three accent tokens, three jobs** (D-027): `bg-accent` fills (buttons,
FAB, progress) · `text-accent-foreground` is the ink on those fills ·
`text-accent-text` is the accent as text/icons on light surfaces. White on
the brand green is only 2.2:1, so fills carry dark ink — the standard
accessible treatment for a bright green, and it looks sharp.

Usage rules: accent = primary action, FAB, active nav item, focus, links, "covered" progress. Limits (Zucker/gesättigt/Salz) render neutral-gray progress that turns `warning` past 100 % — **never** danger-red shaming. UL exceedance uses `warning` with an explanatory sheet.

## 3. Brand

- **Name:** Glynt — modern/techy (D-017). Wordplay welcome: *glint* (EN) / *glänzen* (DE).
- **Taglines:** primary German **„Alle Nährstoffe im Blick."** · onboarding-reveal moment: **„Zeit zu glänzen."** · international (later): "Get a glint of your daily nutrients."
- **Logo:** minimal SVG mark — a rounded ring with a bar forming a **G** that doubles as the energy ring motif, tiny spark dot, accent green on white (white on green for the app icon). Files: `public/icons/` + `src/assets/logo.svg`. Iterated with Marvin.
- **Iconography:** lucide-react exclusively (consistent 2 px stroke). Nutrient-group glyphs come from lucide (e.g. `Zap` Energie, `Beef`/`Wheat`/`Droplets` macros, `Pill` Supplemente, `Sparkles` Vorschläge).

## 4. Glynt custom components (`src/components/glynt/`)

| Component | Purpose |
|---|---|
| `EnergyRing` | Large SVG ring, remaining kcal centered (`text-display`, tabular), over-target state without shaming |
| `MacroBars` | Protein/KH/Fett/Ballaststoffe bars with g-values; limit-style variant (stay-under) |
| `CoverageSummary` | „18 von 26 im Plan" + worst-gap chips → day panel |
| `NutrientRow` | Name · amount · animated % bar · target; UL badge; „keine Daten"-state |
| `SuggestionCard` | Food/portion, „Warum?"-line, one-tap log |
| `MealSection` | Meal header with kcal sum, entry rows, add-row |
| `PortionSheet` | Stepper + unit select + live preview + meal select + favorite |
| `WaterCard` | Glass grid, +/-, goal state |
| `StreakChip` | Quiet consistency indicator |
| `CoverageGrid` | Insights: per-nutrient coverage, worst-first |
| `TrendChart` / `WeightSparkline` | SVG line/area in CleanOS style |
| `TargetsRevealScreen` | Onboarding payoff moment |

All follow CleanOS tokens/motion; stat numbers always `tabular-nums`.

## 5. Tone of voice (D-023) — German, „du"

- Calm, encouraging, factual. „Vitamin D ist heute noch niedrig — Lachs, Eier oder dein Supplement würden es decken."
- Never guilt („zu viel", „gesündigt" ❌), never bro-fitness („Gains" ❌), never medical claims.
- Informal **du** (lowercase mid-sentence). Sie-Form nowhere.
- Numbers: `Intl` de-DE (1.234,5); units with narrow space (12 g, 340 kcal).
- Empty states always name the next action. Errors say what happened + what helps, no codes.
- Microcopy pattern: **fact → gentle option**, never command. („Noch 12 g Protein bis zu deinem Ziel." not „Iss mehr Protein!")

## 6. States & accessibility bar

Empty/loading/error/offline designed for every surface (skeletons for async, Callout for OFF-offline). Reduced motion honored (`prefers-reduced-motion` → no springs, fades only). Focus-visible everywhere (CleanOS default), labels on every icon button, pinch-zoom never disabled, scroll rails keyboard-reachable. Screen-reader: rings/bars carry aria values („Vitamin C: 80 % des Tagesziels").

**AA is enforced, not assumed:** `e2e/a11y.spec.ts` runs axe-core (WCAG 2 A/AA + 2.1) over onboarding, all four tabs in light *and* dark, and the log sheet. Every text token clears 4.5:1 on `background`, `surface` and `surface-2`; dimming uses tokens, never `opacity` (D-027).
