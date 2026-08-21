import { expect, test } from "@playwright/test";
import { logFood, onboard } from "./helpers";

test.describe("Glynt core journeys", () => {
  test("onboarding computes personal targets and persists them", async ({ page }) => {
    await onboard(page);
    await expect(page).toHaveURL(/\/heute/);

    // Targets survive a reload — no re-onboarding.
    await page.reload();
    await expect(page).toHaveURL(/\/heute/);
    await expect(page.getByText("kcal übrig")).toBeVisible();
  });

  test("logging a food updates the day totals and the diary", async ({ page }) => {
    await onboard(page);
    await logFood(page, "banane", /Banane/i);

    await expect(page.getByText("Hinzugefügt")).toBeVisible();
    // The entry shows up in a meal section with its portion.
    await expect(page.getByText(/1 mittlere Banane/)).toBeVisible();
    // Energy ring reflects the intake.
    const ring = page.getByRole("img", { name: /von .* kcal/ });
    await expect(ring).toBeVisible();
  });

  test("micronutrient coverage and nutrient detail work end to end", async ({ page }) => {
    await onboard(page);
    await logFood(page, "lachs", /Lachs/i);

    await page.getByRole("button", { name: "Alle Nährwerte ansehen" }).click();
    await expect(page.getByRole("heading", { name: "Vitamine" })).toBeVisible();

    await page.locator("button", { hasText: /^Vitamin D/ }).first().click();
    await expect(page.getByRole("heading", { name: "Verlauf" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Top-Quellen heute/ })).toBeVisible();
    // The gap-closing loop: database sources are offered for logging.
    await expect(page.getByRole("heading", { name: /Gute Quellen/ })).toBeVisible();
  });

  test("water tracking increments and persists", async ({ page }) => {
    await onboard(page);
    await page.getByRole("button", { name: "Ein Glas hinzufügen" }).click();
    await page.getByRole("button", { name: "Ein Glas hinzufügen" }).click();
    await expect(page.getByText(/0,5 \/ /)).toBeVisible();
    await page.reload();
    await expect(page.getByText(/0,5 \/ /)).toBeVisible();
  });

  test("undo removes a just-logged entry", async ({ page }) => {
    await onboard(page);
    await logFood(page, "apfel", /Apfel/i);
    await expect(page.getByText(/1 mittlerer Apfel/)).toBeVisible();
    await page.getByRole("button", { name: "Rückgängig" }).click();
    await expect(page.getByText(/1 mittlerer Apfel/)).toHaveCount(0);
  });

  test("German umlaut spellings are searchable both ways", async ({ page }) => {
    await onboard(page);
    await page.locator('button[aria-label="Loggen"]').click();
    await page.getByPlaceholder("Lebensmittel suchen …").fill("gruenkohl");
    await expect(page.locator("button", { hasText: /Grünkohl/ }).first()).toBeVisible();
  });

  test("backup exports and re-imports the diary", async ({ page }) => {
    await onboard(page);
    await logFood(page, "haferflocken", /Haferflocken/i);

    await page.locator("nav").getByRole("button", { name: "Du", exact: true }).click();
    await page.getByText("Daten & Backup").first().click();
    const download = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: /Backup exportieren/ }).click(),
    ]).then(([d]) => d);
    expect(download.suggestedFilename()).toMatch(/^glynt-backup-\d{4}-\d{2}-\d{2}\.json$/);

    const file = await download.path();
    await page.setInputFiles('input[type="file"]', file!);
    await expect(page.getByText(/1 Einträge/)).toBeVisible();
    await page.getByRole("button", { name: /^Zusammenführen$/ }).click();
    await expect(page).toHaveURL(/\/heute/);
    await expect(page.getByText(/Haferflocken/).first()).toBeVisible();
  });

  test("settings changes flow through to targets", async ({ page }) => {
    await onboard(page);
    await page.locator("nav").getByRole("button", { name: "Du", exact: true }).click();
    await page.getByText("Ziele & Referenzwerte").first().click();

    await page.getByLabel("Energieziel (kcal)").fill("1800");
    await page.getByRole("button", { name: "Speichern" }).click();

    await page.locator("nav").getByRole("button", { name: "Heute", exact: true }).click();
    await expect(page.getByRole("img", { name: /von 1\.800 kcal/ })).toBeVisible();
  });

  test("the app works offline after the first load", async ({ page, context }) => {
    await onboard(page);
    await logFood(page, "banane", /Banane/i);
    await page.waitForTimeout(1500); // let the service worker settle

    await context.setOffline(true);
    await page.reload();
    await expect(page.getByText("kcal übrig")).toBeVisible();
    await expect(page.getByText(/1 mittlere Banane/)).toBeVisible();
    await context.setOffline(false);
  });
});
