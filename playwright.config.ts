import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  globalTimeout: 120_000,
  reporter: [["line"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3107",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", testIgnore: "**/browser-zoom.spec.ts", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", testIgnore: "**/browser-zoom.spec.ts", use: { ...devices["Pixel 7"] } },
    { name: "browser-zoom", testMatch: "**/browser-zoom.spec.ts" },
  ],
  webServer: {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3107",
    url: "http://127.0.0.1:3107",
    // Always test this build; never attach to a developer's existing server.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
