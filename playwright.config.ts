import { defineConfig, devices } from "@playwright/test";

/**
 * E2E against the production build — the artifact users actually get.
 * Chromium is preinstalled in this environment; PW_CHROMIUM lets CI or a
 * local machine point at its own binary.
 */
const executablePath = process.env.PW_CHROMIUM || "/opt/pw-browsers/chromium";

export default defineConfig({
  testDir: "./e2e",
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
    launchOptions: { executablePath },
  },
  projects: [
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], launchOptions: { executablePath } },
    },
  ],
  webServer: {
    command: "npm run build && npx vite preview --port 4173",
    port: 4173,
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
