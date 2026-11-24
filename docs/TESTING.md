# Testing plan & automation

This covers how SHNU Sports is tested, how to run the suites, and how to extend them
as the site grows. The goal is to catch regressions in the **functional CTAs and flows**
(the things that make the store usable) automatically on every change.

## Tooling

| Layer | Tool | What it checks |
|---|---|---|
| Unit | **Vitest** | Pure helper logic (`src/lib/site.ts`: pricing, discount %, WhatsApp/tel links) |
| End-to-end | **Playwright** (Chromium) | Real browser: navigation, CTAs, filtering, forms, SEO endpoints |
| Accessibility | **@axe-core/playwright** | WCAG 2 A/AA — fails on serious/critical issues |
| CI | **GitHub Actions** (`.github/workflows/ci.yml`) | Runs lint + unit + e2e on every push/PR |

### Deterministic by design
E2E runs against a **dedicated production server on port 3100**, built into an isolated
`.next-test` directory and **forced onto the built-in sample data** (empty Sanity project
id). So the tests:
- never collide with your running `pnpm dev`,
- don't depend on live Sanity content or the network,
- give the same result every time.

## Running the tests

```bash
pnpm test          # unit tests (fast)
pnpm test:e2e      # end-to-end (builds + starts an isolated server automatically)
pnpm test:e2e:ui   # Playwright UI mode — watch/debug tests interactively
pnpm test:all      # unit + e2e
pnpm lint          # eslint
```

> First time only: `pnpm exec playwright install chromium` to download the browser.
> If a crashed run leaves port 3100 busy: `lsof -ti tcp:3100 | xargs kill -9`.

## What's covered today

| Spec | Focus |
|---|---|
| `e2e/smoke.spec.ts` | All key routes return 200; `robots.txt` blocks `/studio`; `sitemap.xml` lists products; OG image is a PNG; 404 works; Product JSON-LD present |
| `e2e/navigation.spec.ts` | Sports dropdown → sport page (desktop + mobile menu); logo scrolls to top; footer links |
| `e2e/catalog.spec.ts` | Category chip filters in place + updates URL; sort control; in-stock filter; category page renders |
| `e2e/cta.spec.ts` | Hero CTA; "Explore all cricket gear"; "View all cricket"; category tile; featured card; header phone (tel:) |
| `e2e/product.spec.ts` | **WhatsApp deep link** (prefilled, correct number), **Call** (tel:), **Enquire** (→ prefilled contact form), price, breadcrumbs |
| `e2e/enquiry.spec.ts` | Contact form submit → confirmation; required-field validation; contact WhatsApp link |
| `e2e/a11y.spec.ts` | Axe scan of home, sport, product, contact — no serious/critical violations |
| `src/lib/site.test.ts` | `formatPrice`, `discountPercent`, `whatsappLink`, `telLink` |

### Functional CTAs verified
WhatsApp enquiry (product + contact), Call, Enquire → contact form, hero CTA, "shop/explore/view all"
links, category tiles, sport tiles, nav dropdown, logo-to-top, footer links, filter chips, sort,
in-stock toggle, and the contact form submit.

## Manual QA (not automated — check before a release)

- **WhatsApp/phone actually open** the right app with the prefilled message on a real device.
- **Email delivery** via Resend (the automated test only confirms the form's success state).
- **Visual / responsive** polish across real breakpoints and both orientations.
- **Live Sanity flow:** edit a product in `/studio` → **Publish** → it appears on the live site
  within seconds (the revalidation webhook — only meaningful on the deployed site).
- **Cross-browser** (Safari/Firefox) spot check — CI runs Chromium only.

## Extending the suite as the code changes

- **New CTA or page?** Add/extend the matching spec in `e2e/`. Prefer role/label/text selectors
  (`getByRole`, `getByLabel`) or `href`-based locators over CSS classes — they survive restyling.
- **Changed the sample data** (`src/sanity/sample.ts`)? Update any spec that asserts specific
  counts/slugs. Keeping tests tied to the sample fixtures is intentional and fine.
- **New helper in `src/lib`?** Add a `*.test.ts` beside it (Vitest picks up `src/**/*.test.ts`).
- **Flaky element?** Add a `data-testid` and select on that instead of brittle text.

### Future automation worth adding
- **Visual regression** — Playwright `toHaveScreenshot()` on home + product.
- **Performance budgets** — Lighthouse CI (LCP/CLS thresholds) on key pages.
- **More projects** — enable Firefox/WebKit and a mobile viewport in `playwright.config.ts`.
- **Broken-link crawl** of the sitemap.
- **Contract test** against a Sanity *staging* dataset to catch schema/content drift.
