import { test, expect } from "@playwright/test";

test.describe("home CTAs", () => {
  test("hero shows a slide with a working internal CTA", async ({ page }) => {
    await page.goto("/");
    const heroCta = page.locator("section").first().getByRole("link").first();
    const href = await heroCta.getAttribute("href");
    expect(href).toMatch(/^\//);
  });

  test("'Explore all cricket gear' navigates to the cricket page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explore all cricket gear" }).click();
    await expect(page).toHaveURL(/\/cricket$/);
  });

  test("'View all cricket' navigates to the cricket page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "View all cricket" }).click();
    await expect(page).toHaveURL(/\/cricket/);
  });

  test("a category tile opens that category page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Kit Bags" }).first().click();
    await expect(page).toHaveURL(/\/cricket\/kit-bags$/);
  });

  test("featured product card opens a product page", async ({ page }) => {
    await page.goto("/");
    await page.locator('a[href^="/product/"]').first().click();
    await expect(page).toHaveURL(/\/product\//);
  });

  test("header phone CTA is a tel link", async ({ page }) => {
    await page.goto("/");
    const phone = page.locator('header a[href^="tel:"]');
    await expect(phone).toHaveCount(1);
  });
});
