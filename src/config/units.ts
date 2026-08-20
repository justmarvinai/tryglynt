/**
 * Unit system & conversions (D-019: metric default, imperial switchable).
 * Storage is ALWAYS metric (kg, cm, ml, g) — imperial exists only at the
 * display/input boundary.
 */

export type UnitSystem = "metric" | "imperial";

export const KG_PER_LB = 0.45359237;
export const CM_PER_IN = 2.54;
export const INCHES_PER_FOOT = 12;

export const kgToLb = (kg: number) => kg / KG_PER_LB;
export const lbToKg = (lb: number) => lb * KG_PER_LB;

export const cmToFtIn = (cm: number): { ft: number; inch: number } => {
  const totalIn = cm / CM_PER_IN;
  let ft = Math.floor(totalIn / INCHES_PER_FOOT);
  let inch = Math.round(totalIn - ft * INCHES_PER_FOOT);
  if (inch === INCHES_PER_FOOT) {
    ft += 1;
    inch = 0;
  }
  return { ft, inch };
};

export const ftInToCm = (ft: number, inch: number) =>
  (ft * INCHES_PER_FOOT + inch) * CM_PER_IN;

/** Sodium (mg) → salt (g); NaCl ≈ Na × 2.5 (D-026.3). */
export const sodiumMgToSaltG = (sodiumMg: number) => (sodiumMg * 2.5) / 1000;
export const saltGToSodiumMg = (saltG: number) => (saltG / 2.5) * 1000;

/** kcal → kJ (shown secondary in detail views, D-026.2). */
export const kcalToKJ = (kcal: number) => kcal * 4.184;
