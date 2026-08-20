/**
 * Portion & unit handling for logging (docs/DATA.md §2). Units:
 *  - "g" / "ml"           → direct mass (liquids: 1 ml ≈ 1 g)
 *  - "portion:<label>"    → one of the food's household portions
 */

import type { Food } from "@/lib/db/models";

export interface UnitOption {
  unit: string;
  label: string;
  /** Grams for ONE of this unit. */
  gramsPerUnit: number;
  /** Sensible stepper increment in this unit. */
  step: number;
  defaultAmount: number;
}

export function unitOptionsFor(food: Food): UnitOption[] {
  const options: UnitOption[] = food.portions.map((p) => ({
    unit: `portion:${p.label}`,
    label: p.label,
    gramsPerUnit: p.grams,
    step: food.kind === "supplement" ? 1 : 0.5,
    defaultAmount: 1,
  }));
  options.push(
    food.isLiquid
      ? { unit: "ml", label: "ml", gramsPerUnit: 1, step: 10, defaultAmount: 200 }
      : { unit: "g", label: "g", gramsPerUnit: 1, step: 5, defaultAmount: 100 }
  );
  return options;
}

export function defaultUnitFor(food: Food): UnitOption {
  return unitOptionsFor(food)[0];
}

export function resolveGrams(food: Food, amount: number, unit: string): number {
  if (unit === "g" || unit === "ml") return amount;
  const label = unit.startsWith("portion:") ? unit.slice("portion:".length) : unit;
  const portion = food.portions.find((p) => p.label === label);
  return portion ? amount * portion.grams : amount;
}

/** "2 × 1 Scheibe (90 g)" · "150 g" — diary subtitle. */
export function formatPortion(amount: number, unit: string, grams: number): string {
  const nf = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });
  if (unit === "g" || unit === "ml") return `${nf.format(grams)}\u202f${unit}`;
  const label = unit.startsWith("portion:") ? unit.slice("portion:".length) : unit;
  const prefix = amount === 1 ? label : `${nf.format(amount)} × ${label}`;
  return `${prefix} (${nf.format(grams)}\u202fg)`;
}
