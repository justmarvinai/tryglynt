import { describe, expect, it } from "vitest";
import { fmt, formatAmount, formatNumber } from "@/lib/i18n";
import { normalizeName } from "@/lib/db/db";

describe("fmt", () => {
  it("replaces placeholders", () => {
    expect(fmt("Noch {n} g bis {goal}", { n: 12, goal: "Protein" })).toBe(
      "Noch 12 g bis Protein"
    );
  });
  it("leaves unknown placeholders untouched", () => {
    expect(fmt("{a} {b}", { a: 1 })).toBe("1 {b}");
  });
});

describe("de-DE formatting", () => {
  it("formats numbers with German separators", () => {
    expect(formatNumber(1234.5)).toBe("1.234,5");
  });
  it("joins value and unit with a narrow no-break space", () => {
    expect(formatAmount(340, "kcal", 0)).toBe("340\u202fkcal");
  });
});

describe("normalizeName", () => {
  it("folds case, diacritics and ß", () => {
    expect(normalizeName("Grünkohl")).toBe("grunkohl");
    expect(normalizeName("Weißbrot")).toBe("weissbrot");
    expect(normalizeName("  Café au Lait ")).toBe("cafe au lait");
  });
});
