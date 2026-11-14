import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:8787",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : undefined,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "off",
  },
  webServer: {
    command: "pnpm run dev:e2e",
    url: "http://127.0.0.1:8787/health",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
