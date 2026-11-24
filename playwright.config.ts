import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

/**
 * E2E runs against a dedicated dev server forced onto the built-in SAMPLE data
 * (empty Sanity project id), so tests are deterministic and don't depend on
 * live Sanity content or the network.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  // Build + start an isolated production server (separate dist dir) so it never
  // collides with a running `next dev` in the same folder, and forced onto the
  // built-in sample data for deterministic tests.
  webServer: {
    command: `pnpm exec next build && pnpm exec next start --port ${PORT}`,
    url: baseURL,
    // Always rebuild so tests run against current code (never a stale server).
    reuseExistingServer: false,
    timeout: 300_000,
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: "",
      NEXT_PUBLIC_SITE_URL: baseURL,
      NEXT_DIST_DIR: ".next-test",
    },
  },
});
