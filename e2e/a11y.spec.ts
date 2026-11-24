import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Automated accessibility scan. We fail on serious/critical issues (the ones
// that actually block users); tune the ruleset as the design evolves.
const pages = ["/", "/cricket", "/product/grade-1-english-willow-pro-bat", "/contact"];

for (const path of pages) {
  test(`no serious/critical a11y violations: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    const summary = blocking.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}`);
    expect(summary, summary.join("\n")).toEqual([]);
  });
}
