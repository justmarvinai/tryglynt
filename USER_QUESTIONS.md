# Glynt — Questions before development starts

Everything below shapes the v1 build. Each question has options and my **recommendation** with a one-line reason — feel free to just confirm recommendations wholesale for any section.

**How to answer:** edit this file and write under each `➡️ Answer:` line, **or** reply in chat like `1B, 2 yes, 3A, …`. Anything unanswered = I go with the recommendation.

---

## A · Product scope

### 1. Weight goals — how neutral should Glynt be?
Glynt's identity is "cover your needs", not dieting. But some users will still want a gentle calorie direction.
- **A** — Pure coverage: energy target = maintenance (TDEE) only, manually overridable.
- **B (recommended)** — Neutral default (maintenance) + optional "approach" in onboarding/settings: *Nourish (maintain)* / *Gently reduce (−10–15%)* / *Build up (+10–15%)*. Keeps the positioning, adds real-world flexibility.

➡️ Answer:

### 2. Water tracking on the Today screen (quick-tap glasses, personal daily goal)?
- **A (recommended)** — Yes, v1.
- **B** — No.

➡️ Answer:

### 3. Supplement tracking (log vitamin D drops, magnesium, B12 etc. so they count toward micros — with upper-limit warnings)?
Fits the micro-focused USP perfectly, but is real extra scope.
- **A (recommended)** — Yes, v1: supplements as a food type + a saved "daily regimen" you can log in one tap.
- **B** — Post-v1.

➡️ Answer:

### 4. Body metrics journal?
- **A (recommended)** — Weight (+ optional body fat %) with trend chart in Insights. Neutral framing, no target weight required.
- **B** — Weight only.
- **C** — None.

➡️ Answer:

### 5. Streak / consistency mechanics?
- **A (recommended)** — Subtle: a quiet "days logged" streak chip, no badges/XP/confetti.
- **B** — None at all.

➡️ Answer:

### 6. Anything you explicitly do NOT want in v1? (e.g. fasting timer, AI coach, social/sharing, calorie "burn" from exercise…)
My assumption: none of those in v1; **exercise logging is out** (activity is covered by the TDEE activity level) — tell me if you disagree, especially about exercise.

➡️ Answer:

---

## B · Food data (the most important section)

### 7. Where does food data come from?
Context: the build environment has no access to USDA/Open Food Facts downloads (network-blocked), so a bundled database is **hand-curated by me from standard reference values and machine-validated** (energy reconciliation, plausibility checks — see PLAN §5.2). The *deployed app* in users' browsers CAN call the Open Food Facts API directly (their public API, not "our backend").
- **A** — Bundled offline generic-food DB only (~1,500–2,500 foods, full micro panels, works 100% offline).
- **B (recommended)** — A + Open Food Facts **online search** for branded/supermarket products when online (their micro data is sparse — usually just the label basics — clearly marked as such).
- **C** — A, but you provide a reference CSV (e.g. USDA FoodData Central download) in the repo and I build the DB from it — most accurate numbers, slightly US-flavored foods.

➡️ Answer:

### 8. Barcode scanning (camera-based, in the web app — pairs with Open Food Facts)?
Works well on Android/Chrome; iOS Safari needs a fallback library (planned). Only meaningful if 7 = B.
- **A (recommended if 7=B)** — Yes, v1.
- **B** — Post-v1 (Capacitor phase has nicer native scanning anyway).

➡️ Answer:

### 9. Generic food focus for the bundled DB?
- **A (recommended)** — European staples + international coverage (Vollkornbrot, Quark, Skyr, lentils, tofu, olive oil… alongside global basics).
- **B** — More US-flavored.

➡️ Answer:

---

## C · Science & calculations

### 10. Reference values for vitamins & minerals?
- **A (recommended)** — Ship **both** EFSA (EU) and NIH (US) tables, switchable in settings; default **EFSA**.
- **B** — EFSA only. · **C** — NIH only.

➡️ Answer:

### 11. Sex-based values for trans & non-binary users?
Formulas and reference values are sex-differentiated. My proposed approach: calculations default to **sex assigned at birth**, with an explicit, findable setting "Calculation basis: Female / Male" the user can change (with a short, respectful explanation of why the app asks). Gender identity is stored separately and used only for personalization, never for math.
- **A (recommended)** — Exactly that.
- **B** — Something else (describe).

➡️ Answer:

### 12. Default protein target?
Always editable; this is just the smart default.
- **A (recommended)** — Scales with activity level: 0.8 g/kg (sedentary) → 1.2 (moderate) → 1.6 (very active+).
- **B** — Flat official RDA (0.83 g/kg). · **C** — Flat 1.6 g/kg fitness-style.

➡️ Answer:

### 13. Pregnancy / breastfeeding target sets?
Different reference values apply. Real scope + sensitive territory.
- **A (recommended)** — Post-v1 (v1 shows a notice that targets don't cover pregnancy/breastfeeding).
- **B** — Include in v1.

➡️ Answer:

### 14. The nutrient panel (PLAN §4.4) — anything to add or drop?
Proposed: energy, water, alcohol, full macro/fat breakdown incl. omega-3, cholesterol, 14 vitamins (incl. choline), 12 minerals, extended set (chromium, molybdenum, fluoride, caffeine) where data exists. Missing anything you personally care about?

➡️ Answer:

---

## D · Design & brand

### 15. Accent color?
CleanOS is monochrome + ONE accent. Single-token swap. Options:
- **A** — CleanOS stock sky-blue `#34a9fe`.
- **B (recommended)** — Fresh green (e.g. `#30c96e` family) — signals health/vitality, differentiates from every blue fitness app, still calm.
- **C** — Warm coral (e.g. `#ff6b57`). · **D** — Violet (e.g. `#8b5cf6`). · **E** — Your pick (give a hex or vibe).

➡️ Answer:

### 16. Logo & app icon?
- **A (recommended)** — I design a minimal SVG mark (a "G" / spark glyph in the accent color, CleanOS-clean) + matching PWA/app icons; you iterate on it with me.
- **B** — You'll provide one.

Also: does the name **Glynt** have an intended meaning/story (glint/glimmer?) I should reflect in the brand and copy?

➡️ Answer:

### 17. Tone of voice?
- **A (recommended)** — Calm, encouraging, factual ("Vitamin D is still low today — salmon, eggs or your supplement would cover it."). Never guilt, never bro-fitness.
- **B** — Strictly neutral/clinical.

➡️ Answer:

### 18. Language(s) for v1?
- **A (recommended)** — English UI, built i18n-ready; German added right after v1 (food names too).
- **B** — English + German both in v1 (adds real time: all UI strings + 1,500–2,500 food names × 2).
- **C** — German only.

➡️ Answer:

### 19. Units?
- **A (recommended)** — Metric default, imperial (lb, ft/in, fl oz) switchable in settings & onboarding.
- **B** — Metric only.

➡️ Answer:

---

## E · Tracking UX

### 20. Meal slots?
- **A (recommended)** — Default Breakfast · Lunch · Dinner · Snacks; rename/add/remove/reorder in settings (e.g. "Pre-workout", 6-meal days).
- **B** — Fixed 4.

➡️ Answer:

### 21. Notifications / reminders in v1?
Web push on iOS PWAs is possible since iOS 16.4 but flaky and permission-heavy; proper reminders shine in the Capacitor phase.
- **A (recommended)** — None in v1 (quiet in-app nudges only, e.g. backup reminder).
- **B** — Try web push reminders in v1.

➡️ Answer:

### 22. Analytics?
- **A (recommended)** — None. "Private by design" stays literally true.
- **B** — Cookieless Vercel Analytics (page views only) to see usage.

➡️ Answer:

---

## F · Defaults I'll apply unless you object

No need to answer individually — flag anything you dislike:

1. Day boundary = midnight (local); week starts Monday.
2. Energy in **kcal** (kJ shown secondary in detail views).
3. Salt shown as salt (g) with sodium (mg) in detail; conversion ×2.5.
4. Dark mode: follows system + manual override toggle.
5. Diary entries snapshot nutrients at log time (editing a custom food later doesn't silently rewrite history; per-entry "recalculate" exists).
6. Deleting anything destructive → confirm dialog; diary deletes → instant with Undo toast.
7. Export = JSON file; import offers merge/replace. Gentle backup nudge every ~30 days (because no account = no cloud safety net).
8. On desktop the app renders as the centered phone-width column (CleanOS `Screen`) — looks intentional, not stretched.
9. Medical disclaimer shown once at onboarding + permanently in About.
10. No cookies, no external requests at runtime except (if chosen) Open Food Facts + nothing else; Inter font self-hosted.

➡️ Objections:

---

## G · Anything else?

Features, details, pet peeves from MyFitnessPal/Yazio you want done better, favorite foods that MUST be in the seed DB, anything at all:

➡️ Answer:
