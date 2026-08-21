import type { Page } from "@playwright/test";

/** Runs the onboarding wizard with sensible defaults. */
export async function onboard(page: Page, name = "Marvin"): Promise<void> {
  await page.goto("/");
  await page.getByRole("button", { name: "Los geht's" }).click();
  await page.getByPlaceholder("Dein Name").fill(name);
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("option", { name: "Männlich" }).click();
  // gender → birthday → height → weight → body fat
  for (let i = 0; i < 5; i++) {
    await page.getByRole("button", { name: "Weiter" }).click();
  }
  await page.getByRole("button", { name: "Weiß ich nicht" }).click();
  await page.getByRole("option", { name: "Moderat aktiv" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("button", { name: "Auf geht's" }).click();
  await page.waitForURL("**/heute");
  // wait for the seed database to finish loading
  await page.getByRole("button", { name: "Loggen", exact: true }).waitFor();
}

/** Logs a seed food at its default portion via the FAB search flow. */
export async function logFood(page: Page, query: string, label: RegExp): Promise<void> {
  await page.locator('button[aria-label="Loggen"]').click();
  await page.getByPlaceholder("Lebensmittel suchen …").fill(query);
  await page.locator("button", { hasText: label }).first().click();
  await page.locator("button.w-full", { hasText: "Hinzufügen" }).last().click();
  await page.keyboard.press("Escape");
}
