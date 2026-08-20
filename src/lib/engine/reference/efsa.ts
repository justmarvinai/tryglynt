/**
 * EFSA Dietary Reference Values (default source, D-011).
 *
 * Source: EFSA DRV Finder (https://efsa.europa.eu — Dietary Reference
 * Values for the EU), individual EFSA scientific opinions 2010–2023.
 * Units match src/config/nutrients.ts. Bands cover ages ≥ 15 (app minimum,
 * docs/SCIENCE.md §3); pregnancy/breastfeeding sets are post-v1 (D-014).
 *
 * Not in this table (handled in engine code, docs/SCIENCE.md §2–3):
 *  - fiber, water            → config/targets.ts rules
 *  - vitB1, vitB3, omega3    → energy-derived (0.1 mg/MJ · 1.6 mg NE/MJ ·
 *                              0.5 %E ALA + 250 mg EPA/DHA)
 *  - sodium                  → limit from salt rule (EFSA safe & adequate
 *                              2 g sodium ≙ WHO 5 g salt)
 *  - chromium                → EFSA sets no DRV (NIH-only)
 *  - magnesium UL            → EFSA UL (250 mg) covers dissociable
 *                              supplements only; flagging total intake
 *                              would false-positive on normal diets
 */

import type { RefTable } from "./types";

export const EFSA: RefTable = {
  // ------------------------------------------------------------- vitamins
  vitA: {
    // PRI (µg RAE); UL 3000 µg preformed retinol.
    kind: "PRI",
    f: [{ from: 15, value: 650, ul: 3000 }],
    m: [{ from: 15, value: 750, ul: 3000 }],
  },
  vitB2: {
    // PRI 1.6 mg adults (EFSA 2017); adolescents identical.
    kind: "PRI",
    f: [{ from: 15, value: 1.6 }],
    m: [{ from: 15, value: 1.6 }],
  },
  vitB5: {
    kind: "AI",
    f: [{ from: 15, value: 5 }],
    m: [{ from: 15, value: 5 }],
  },
  vitB6: {
    // PRI (EFSA 2016); UL 12 mg (EFSA 2023 revised opinion).
    kind: "PRI",
    f: [{ from: 15, value: 1.6, ul: 12 }],
    m: [{ from: 15, value: 1.7, ul: 12 }],
  },
  vitB7: {
    kind: "AI",
    f: [{ from: 15, value: 40 }],
    m: [{ from: 15, value: 40 }],
  },
  vitB9: {
    // PRI 330 µg DFE adults; UL 1000 µg applies to folic acid.
    kind: "PRI",
    f: [{ from: 15, value: 330, ul: 1000 }],
    m: [{ from: 15, value: 330, ul: 1000 }],
  },
  vitB12: {
    kind: "AI",
    f: [{ from: 15, value: 4 }],
    m: [{ from: 15, value: 4 }],
  },
  vitC: {
    // PRI (EFSA 2013): adults f 95 / m 110; 15–17: f 90 / m 100.
    kind: "PRI",
    f: [
      { from: 15, value: 90 },
      { from: 18, value: 95 },
    ],
    m: [
      { from: 15, value: 100 },
      { from: 18, value: 110 },
    ],
  },
  vitD: {
    // AI 15 µg (EFSA 2016); UL 100 µg.
    kind: "AI",
    f: [{ from: 15, value: 15, ul: 100 }],
    m: [{ from: 15, value: 15, ul: 100 }],
  },
  vitE: {
    // AI as α-tocopherol (EFSA 2015); UL 300 mg.
    kind: "AI",
    f: [{ from: 15, value: 11, ul: 300 }],
    m: [{ from: 15, value: 13, ul: 300 }],
  },
  vitK: {
    // AI 1 µg/kg ≈ 70 µg adults (phylloquinone, EFSA 2017).
    kind: "AI",
    f: [{ from: 15, value: 70 }],
    m: [{ from: 15, value: 70 }],
  },
  choline: {
    kind: "AI",
    f: [{ from: 15, value: 400 }],
    m: [{ from: 15, value: 400 }],
  },
  // ------------------------------------------------------------- minerals
  calcium: {
    // PRI (EFSA 2015): 15–17 1150 · 18–24 1000 · 25+ 950; UL 2500.
    kind: "PRI",
    f: [
      { from: 15, value: 1150, ul: 2500 },
      { from: 18, value: 1000, ul: 2500 },
      { from: 25, value: 950, ul: 2500 },
    ],
    m: [
      { from: 15, value: 1150, ul: 2500 },
      { from: 18, value: 1000, ul: 2500 },
      { from: 25, value: 950, ul: 2500 },
    ],
  },
  iron: {
    // PRI (EFSA 2015): m 11; f 13 (15–17), 16 (18–49), 11 (50+, post-
    // menopause approximation on age).
    kind: "PRI",
    f: [
      { from: 15, value: 13 },
      { from: 18, value: 16 },
      { from: 50, value: 11 },
    ],
    m: [{ from: 15, value: 11 }],
  },
  magnesium: {
    // AI (EFSA 2015). UL intentionally omitted — see header.
    kind: "AI",
    f: [{ from: 15, value: 300 }],
    m: [{ from: 15, value: 350 }],
  },
  zinc: {
    // PRI (EFSA 2014) at moderate phytate intake (600 mg/d); UL 25 mg.
    kind: "PRI",
    f: [{ from: 15, value: 9.3, ul: 25 }],
    m: [{ from: 15, value: 11.7, ul: 25 }],
  },
  potassium: {
    kind: "AI",
    f: [{ from: 15, value: 3500 }],
    m: [{ from: 15, value: 3500 }],
  },
  phosphorus: {
    kind: "AI",
    f: [
      { from: 15, value: 640 },
      { from: 18, value: 550 },
    ],
    m: [
      { from: 15, value: 640 },
      { from: 18, value: 550 },
    ],
  },
  selenium: {
    // AI 70 µg (EFSA 2014); UL 255 µg (EFSA 2023).
    kind: "AI",
    f: [{ from: 15, value: 70, ul: 255 }],
    m: [{ from: 15, value: 70, ul: 255 }],
  },
  copper: {
    // AI (EFSA 2015); UL 5 mg (SCF).
    kind: "AI",
    f: [{ from: 15, value: 1.3, ul: 5 }],
    m: [
      { from: 15, value: 1.3, ul: 5 },
      { from: 18, value: 1.6, ul: 5 },
    ],
  },
  manganese: {
    kind: "AI",
    f: [{ from: 15, value: 3 }],
    m: [{ from: 15, value: 3 }],
  },
  iodine: {
    // AI 150 µg (EFSA 2014); UL 600 µg (SCF).
    kind: "AI",
    f: [{ from: 15, value: 150, ul: 600 }],
    m: [{ from: 15, value: 150, ul: 600 }],
  },
  chloride: {
    // Safe and adequate intake 3.1 g/d (EFSA 2019).
    kind: "safe",
    f: [{ from: 15, value: 3100 }],
    m: [{ from: 15, value: 3100 }],
  },
  // ------------------------------------------------------------- extended
  molybdenum: {
    kind: "AI",
    f: [{ from: 15, value: 65, ul: 600 }],
    m: [{ from: 15, value: 65, ul: 600 }],
  },
  fluoride: {
    kind: "AI",
    f: [{ from: 15, value: 2.9, ul: 7 }],
    m: [{ from: 15, value: 3.4, ul: 7 }],
  },
};
