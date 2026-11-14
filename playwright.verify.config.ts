import { defineConfig, devices } from "@playwright/test";

const PROD = process.env.PROD_URL || "https://ghost.claims";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "verification.spec.ts",
  fullyParallel: true,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [["list"]],
  use: {
    baseURL: PROD,
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
