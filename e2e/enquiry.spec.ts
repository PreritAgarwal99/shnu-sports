import { test, expect } from "@playwright/test";

test.describe("enquiry form", () => {
  test("submits successfully and shows confirmation", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Test Player");
    await page.getByLabel("Phone or email").fill("test@example.com");
    await page.getByLabel("Message").fill("Do you have the pro bat in 1150g?");
    await page.getByRole("button", { name: /Send enquiry/i }).click();
    await expect(page.getByText("Enquiry sent")).toBeVisible();
  });

  test("required fields block an empty submit", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Send enquiry/i }).click();
    // Native validation prevents submission — no success state appears.
    await expect(page.getByText("Enquiry sent")).toHaveCount(0);
  });

  test("WhatsApp CTA on contact page is a valid deep link", async ({ page }) => {
    await page.goto("/contact");
    const wa = page.getByRole("link", { name: /Chat on WhatsApp/i });
    expect(await wa.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  });
});
