import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { logFood, onboard } from "./helpers";

/**
 * Accessibility gate: WCAG 2 A/AA on the screens users actually live in,
 * in both themes (docs/DESIGN.md §6).
 */
async function scan(page: Parameters<typeof AxeBuilder>[0]["page"]) {
  return new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
}

test.describe("accessibility", () => {
  test("onboarding has no violations", async ({ page }) => {
    await page.goto("/");
    const results = await scan(page);
    expect(results.violations).toEqual([]);
  });

  test("main screens have no violations (light)", async ({ page }) => {
    await onboard(page);
    await logFood(page, "banane", /Banane/i);

    for (const [label, action] of [
      ["heute", async () => {}],
      ["insights", async () => page.locator("nav").getByRole("button", { name: "Insights", exact: true }).click()],
      ["bibliothek", async () => page.locator("nav").getByRole("button", { name: "Bibliothek", exact: true }).click()],
      ["du", async () => page.locator("nav").getByRole("button", { name: "Du", exact: true }).click()],
    ] as const) {
      await action();
      await page.waitForTimeout(600);
      const results = await scan(page);
      expect(results.violations, `${label}: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
    }
  });

  test("main screen has no violations (dark)", async ({ page }) => {
    await onboard(page);
    await page.evaluate(() => localStorage.setItem("glynt.theme", "dark"));
    await page.reload();
    await page.waitForTimeout(600);
    const results = await scan(page);
    expect(results.violations).toEqual([]);
  });

  test("the log sheet is accessible", async ({ page }) => {
    await onboard(page);
    await page.locator('button[aria-label="Loggen"]').click();
    await page.waitForTimeout(500);
    const results = await scan(page);
    expect(results.violations).toEqual([]);
  });
});
