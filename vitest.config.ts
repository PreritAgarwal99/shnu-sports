import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Unit tests only. End-to-end tests live in /e2e and run via Playwright.
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
