import { test, expect } from "@playwright/test";

test.describe("product detail CTAs", () => {
  test("opening a product from the catalog shows price, WhatsApp, Call and Enquire CTAs", async ({ page }) => {
    await page.goto("/cricket");
    await page.locator('a[href^="/product/"]').first().click();
    await expect(page).toHaveURL(/\/product\//);

    // Price
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/₹[\d,]+/).first()).toBeVisible();

    // WhatsApp CTA — prefilled deep link to the store number
    const wa = page.getByRole("link", { name: /Enquire on WhatsApp/i });
    await expect(wa).toBeVisible();
    const waHref = await wa.getAttribute("href");
    expect(waHref).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(waHref).toContain("919876543210");

    // Call CTA
    const call = page.getByRole("link", { name: "Call" });
    const telHref = await call.getAttribute("href");
    expect(telHref).toMatch(/^tel:/);

    // Enquire CTA -> contact form prefilled with this product
    const enquire = page.getByRole("link", { name: "Enquire", exact: true });
    expect(await enquire.getAttribute("href")).toMatch(/\/contact\?product=/);
  });

  test("breadcrumbs link back to sport and category", async ({ page }) => {
    await page.goto("/product/grade-1-english-willow-pro-bat");
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(crumbs.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(crumbs.getByRole("link", { name: "Cricket", exact: true })).toBeVisible();
  });

  test("Enquire deep link prefills the contact form", async ({ page }) => {
    await page.goto("/product/grade-1-english-willow-pro-bat");
    await page.getByRole("link", { name: "Enquire", exact: true }).click();
    await expect(page).toHaveURL(/\/contact\?product=grade-1-english-willow-pro-bat/);
    await expect(page.getByText(/Enquiry about:/)).toBeVisible();
  });
});
