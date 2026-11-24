import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("Sports dropdown navigates to a sport page (desktop)", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    const cricketLink = header.locator('a[href="/cricket"]');
    await header.getByRole("button", { name: "Sports" }).hover();
    await expect(cricketLink).toBeVisible();
    await cricketLink.click();
    await expect(page).toHaveURL(/\/cricket$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Cricket");
  });

  test("logo returns to top of home page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 2000));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
    await page.getByLabel(/home/i).first().click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
  });

  test("footer links reach About and a sport", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "About us" }).click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test("mobile menu opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Toggle menu" }).click();
    const drawer = page.getByRole("navigation", { name: "Mobile" });
    await drawer.getByRole("button", { name: "Sports" }).click();
    await drawer.locator('a[href="/cricket"]').click();
    await expect(page).toHaveURL(/\/cricket$/);
  });
});
