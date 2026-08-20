/**
 * NIH/IOM Dietary Reference Intakes (switchable source, D-011).
 *
 * Source: NIH Office of Dietary Supplements DRI tables (IOM/NASEM),
 * https://ods.od.nih.gov. Units match src/config/nutrients.ts. Bands cover
 * ages ≥ 15 via the 14–18 adolescent group; pregnancy/breastfeeding sets
 * are post-v1 (D-014).
 *
 * Not in this table (engine code, docs/SCIENCE.md §2–3):
 *  - fiber (14 g/1000 kcal), water → config/targets.ts rules
 *  - sodium limit                  → salt rule (CDRR 2.3 g sodium)
 *  - magnesium UL                  → supplemental-only UL, omitted to
 *                                    avoid false positives on food intake
 * vitB1/vitB3/omega3 are fixed RDAs/AIs here (unlike EFSA's energy-
 * derived values) and therefore ARE in this table.
 */

import type { RefTable } from "./types";

export const NIH: RefTable = {
  // ------------------------------------------------------------- vitamins
  vitA: {
    // RDA µg RAE; UL 3000 µg preformed. 14–18: f 700 / m 900 equal adult.
    kind: "RDA",
    f: [{ from: 15, value: 700, ul: 3000 }],
    m: [{ from: 15, value: 900, ul: 3000 }],
  },
  vitB1: {
    kind: "RDA",
    f: [
      { from: 15, value: 1.0 },
      { from: 19, value: 1.1 },
    ],
    m: [{ from: 15, value: 1.2 }],
  },
  vitB2: {
    kind: "RDA",
    f: [
      { from: 15, value: 1.0 },
      { from: 19, value: 1.1 },
    ],
    m: [{ from: 15, value: 1.3 }],
  },
  vitB3: {
    // RDA mg NE; UL 35 mg (supplemental niacin).
    kind: "RDA",
    f: [{ from: 15, value: 14, ul: 35 }],
    m: [{ from: 15, value: 16, ul: 35 }],
  },
  vitB5: {
    kind: "AI",
    f: [{ from: 15, value: 5 }],
    m: [{ from: 15, value: 5 }],
  },
  vitB6: {
    // RDA; UL 100 mg. 51+: f 1.5 / m 1.7.
    kind: "RDA",
    f: [
      { from: 15, value: 1.2, ul: 100 },
      { from: 19, value: 1.3, ul: 100 },
      { from: 51, value: 1.5, ul: 100 },
    ],
    m: [
      { from: 15, value: 1.3, ul: 100 },
      { from: 51, value: 1.7, ul: 100 },
    ],
  },
  vitB7: {
    kind: "AI",
    f: [
      { from: 15, value: 25 },
      { from: 19, value: 30 },
    ],
    m: [
      { from: 15, value: 25 },
      { from: 19, value: 30 },
    ],
  },
  vitB9: {
    // RDA µg DFE; UL 1000 µg folic acid.
    kind: "RDA",
    f: [{ from: 15, value: 400, ul: 1000 }],
    m: [{ from: 15, value: 400, ul: 1000 }],
  },
  vitB12: {
    kind: "RDA",
    f: [{ from: 15, value: 2.4 }],
    m: [{ from: 15, value: 2.4 }],
  },
  vitC: {
    // RDA; UL 2000 mg. 14–18: f 65 / m 75.
    kind: "RDA",
    f: [
      { from: 15, value: 65, ul: 1800 },
      { from: 19, value: 75, ul: 2000 },
    ],
    m: [
      { from: 15, value: 75, ul: 1800 },
      { from: 19, value: 90, ul: 2000 },
    ],
  },
  vitD: {
    // RDA 600 IU (15 µg) to 70, 800 IU (20 µg) 71+; UL 100 µg.
    kind: "RDA",
    f: [
      { from: 15, value: 15, ul: 100 },
      { from: 71, value: 20, ul: 100 },
    ],
    m: [
      { from: 15, value: 15, ul: 100 },
      { from: 71, value: 20, ul: 100 },
    ],
  },
  vitE: {
    // RDA mg α-tocopherol; UL 1000 mg (supplemental).
    kind: "RDA",
    f: [{ from: 15, value: 15, ul: 1000 }],
    m: [{ from: 15, value: 15, ul: 1000 }],
  },
  vitK: {
    kind: "AI",
    f: [
      { from: 15, value: 75 },
      { from: 19, value: 90 },
    ],
    m: [
      { from: 15, value: 75 },
      { from: 19, value: 120 },
    ],
  },
  choline: {
    // AI; UL 3500 mg (3000 mg for 14–18).
    kind: "AI",
    f: [
      { from: 15, value: 400, ul: 3000 },
      { from: 19, value: 425, ul: 3500 },
    ],
    m: [
      { from: 15, value: 550, ul: 3000 },
      { from: 19, value: 550, ul: 3500 },
    ],
  },
  // ------------------------------------------------------------- minerals
  calcium: {
    // RDA: 14–18 1300 · 19–50 1000 · f 51+ 1200 · m 51–70 1000, 71+ 1200.
    // UL: 3000 (14–18), 2500 (19–50), 2000 (51+).
    kind: "RDA",
    f: [
      { from: 15, value: 1300, ul: 3000 },
      { from: 19, value: 1000, ul: 2500 },
      { from: 51, value: 1200, ul: 2000 },
    ],
    m: [
      { from: 15, value: 1300, ul: 3000 },
      { from: 19, value: 1000, ul: 2500 },
      { from: 51, value: 1000, ul: 2000 },
      { from: 71, value: 1200, ul: 2000 },
    ],
  },
  iron: {
    // RDA; UL 45 mg. f: 14–18 15 · 19–50 18 · 51+ 8; m: 14–18 11 · 19+ 8.
    kind: "RDA",
    f: [
      { from: 15, value: 15, ul: 45 },
      { from: 19, value: 18, ul: 45 },
      { from: 51, value: 8, ul: 45 },
    ],
    m: [
      { from: 15, value: 11, ul: 45 },
      { from: 19, value: 8, ul: 45 },
    ],
  },
  magnesium: {
    // RDA. UL omitted (see header). f: 14–18 360 · 19–30 310 · 31+ 320;
    // m: 14–18 410 · 19–30 400 · 31+ 420.
    kind: "RDA",
    f: [
      { from: 15, value: 360 },
      { from: 19, value: 310 },
      { from: 31, value: 320 },
    ],
    m: [
      { from: 15, value: 410 },
      { from: 19, value: 400 },
      { from: 31, value: 420 },
    ],
  },
  zinc: {
    // RDA; UL 40 mg (34 for 14–18).
    kind: "RDA",
    f: [
      { from: 15, value: 9, ul: 34 },
      { from: 19, value: 8, ul: 40 },
    ],
    m: [{ from: 15, value: 11, ul: 34 }, { from: 19, value: 11, ul: 40 }],
  },
  potassium: {
    // AI (NASEM 2019): f 2600 / m 3400 (14–18: f 2300 / m 3000).
    kind: "AI",
    f: [
      { from: 15, value: 2300 },
      { from: 19, value: 2600 },
    ],
    m: [
      { from: 15, value: 3000 },
      { from: 19, value: 3400 },
    ],
  },
  phosphorus: {
    // RDA: 14–18 1250 · 19+ 700; UL 4000 mg (3000 for 71+).
    kind: "RDA",
    f: [
      { from: 15, value: 1250, ul: 4000 },
      { from: 19, value: 700, ul: 4000 },
      { from: 71, value: 700, ul: 3000 },
    ],
    m: [
      { from: 15, value: 1250, ul: 4000 },
      { from: 19, value: 700, ul: 4000 },
      { from: 71, value: 700, ul: 3000 },
    ],
  },
  selenium: {
    // RDA 55 µg; UL 400 µg.
    kind: "RDA",
    f: [{ from: 15, value: 55, ul: 400 }],
    m: [{ from: 15, value: 55, ul: 400 }],
  },
  copper: {
    // RDA 0.9 mg (14–18: 0.89); UL 10 mg (8 for 14–18).
    kind: "RDA",
    f: [
      { from: 15, value: 0.89, ul: 8 },
      { from: 19, value: 0.9, ul: 10 },
    ],
    m: [
      { from: 15, value: 0.89, ul: 8 },
      { from: 19, value: 0.9, ul: 10 },
    ],
  },
  manganese: {
    // AI; UL 11 mg (9 for 14–18).
    kind: "AI",
    f: [
      { from: 15, value: 1.6, ul: 9 },
      { from: 19, value: 1.8, ul: 11 },
    ],
    m: [
      { from: 15, value: 2.2, ul: 9 },
      { from: 19, value: 2.3, ul: 11 },
    ],
  },
  iodine: {
    // RDA 150 µg; UL 1100 µg (900 for 14–18).
    kind: "RDA",
    f: [
      { from: 15, value: 150, ul: 900 },
      { from: 19, value: 150, ul: 1100 },
    ],
    m: [
      { from: 15, value: 150, ul: 900 },
      { from: 19, value: 150, ul: 1100 },
    ],
  },
  chloride: {
    // AI 2.3 g (19–50), 2.0 g (51–70), 1.8 g (71+).
    kind: "AI",
    f: [
      { from: 15, value: 2300 },
      { from: 51, value: 2000 },
      { from: 71, value: 1800 },
    ],
    m: [
      { from: 15, value: 2300 },
      { from: 51, value: 2000 },
      { from: 71, value: 1800 },
    ],
  },
  // ------------------------------------------------------------- extended
  chromium: {
    // AI: f 24/25 · m 35; 51+: f 20 · m 30.
    kind: "AI",
    f: [
      { from: 15, value: 24 },
      { from: 19, value: 25 },
      { from: 51, value: 20 },
    ],
    m: [
      { from: 15, value: 35 },
      { from: 51, value: 30 },
    ],
  },
  molybdenum: {
    // RDA 45 µg (14–18: 43); UL 2000 µg (1700 for 14–18).
    kind: "RDA",
    f: [
      { from: 15, value: 43, ul: 1700 },
      { from: 19, value: 45, ul: 2000 },
    ],
    m: [
      { from: 15, value: 43, ul: 1700 },
      { from: 19, value: 45, ul: 2000 },
    ],
  },
  fluoride: {
    // AI: f 3 / m 4 (adults); 14–18: 3; UL 10 mg.
    kind: "AI",
    f: [{ from: 15, value: 3, ul: 10 }],
    m: [
      { from: 15, value: 3, ul: 10 },
      { from: 19, value: 4, ul: 10 },
    ],
  },
  omega3: {
    // ALA AI: f 1.1 / m 1.6 g (14–18: f 1.1 / m 1.6).
    kind: "AI",
    f: [{ from: 15, value: 1.1 }],
    m: [{ from: 15, value: 1.6 }],
  },
};
