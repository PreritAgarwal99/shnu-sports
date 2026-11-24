import { test, expect } from "@playwright/test";

const routes = ["/", "/cricket", "/cricket/bats", "/cricket/kit-bags", "/about", "/contact"];

test.describe("smoke: pages & SEO endpoints", () => {
  for (const route of routes) {
    test(`responds 200: ${route}`, async ({ request }) => {
      const res = await request.get(route);
      expect(res.status()).toBe(200);
    });
  }

  test("robots.txt blocks /studio and links the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("Disallow: /studio");
    expect(body).toContain("Sitemap:");
  });

  test("sitemap.xml lists sport, category and product URLs", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/cricket");
    expect(body).toContain("/product/");
  });

  test("opengraph image renders as PNG", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("unknown route returns 404", async ({ request }) => {
    const res = await request.get("/this-page-does-not-exist");
    expect(res.status()).toBe(404);
  });

  test("product page exposes Product JSON-LD", async ({ page }) => {
    await page.goto("/product/grade-1-english-willow-pro-bat");
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const product = blocks.map((b) => JSON.parse(b)).find((d) => d["@type"] === "Product");
    expect(product).toBeTruthy();
    expect(product.offers?.priceCurrency).toBe("INR");
  });
});
