# SHNU Sports

A premium, black-and-gold storefront for a specialist cricket-gear store. Browse by
sport, filter by gear category, and enquire via WhatsApp / call / form — no cart, no
online payments. Content is managed by a non-technical admin in **Sanity Studio**, and
the site runs for **$0/month** on Vercel's free tier.

- **Framework:** Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- **Content + media:** Sanity (free tier) — admin studio embedded at `/studio`, images via Sanity's CDN
- **Hosting:** Vercel Hobby (free) + your domain
- **Rendering:** catalog pages are prerendered static/SSG and refreshed on publish via on-demand revalidation (fast *and* fresh, no server to pay for)

---

## Quick start (local)

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. **It runs immediately on built-in sample content** — no Sanity
account needed yet. Connect Sanity when you're ready (below); the site switches over
automatically once a project ID is set.

Other scripts:

```bash
pnpm build   # production build
pnpm start   # run the production build
pnpm lint    # eslint
```

---

## Project structure

```
src/
  app/
    (site)/            # storefront (shares header/footer)
      page.tsx         # home (hero, featured, categories, sports)
      [sport]/         # sport landing + subcategory filtering
      [sport]/[category]/   # category pages
      product/[slug]/  # product detail (gallery, specs, enquiry, JSON-LD)
      about, contact/
    studio/            # embedded Sanity admin at /studio
    api/
      enquiry/         # contact-form handler (email via Resend, optional)
      revalidate/      # Sanity webhook -> refreshes the live site
    sitemap.ts, robots.ts, opengraph-image.tsx   # SEO
  components/          # Header, Hero, ProductCard, CatalogView, etc.
  sanity/
    schemaTypes/       # content model (sport, category, product, banner, brand, settings)
    data.ts            # all data getters (Sanity OR sample fallback) + GROQ
    sample.ts          # built-in sample content
  lib/site.ts          # store constants + helpers (price, whatsapp link)
public/                # logo + placeholder SVGs (swapped for real photos via Sanity)
```

Environment variables are documented in **`.env.local.example`** — copy it to `.env.local`.

---

## Connect Sanity (content + media)

1. Create a free project at **https://www.sanity.io/manage** → note the **Project ID** and
   create a dataset named `production`.
2. In the project's **API** settings:
   - Add `http://localhost:3000` and your production domain under **CORS origins** (with credentials).
   - (Optional) create a **Viewer** token if you later need draft/preview content.
3. Fill in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_REVALIDATE_SECRET=some-long-random-string
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```
4. Restart `pnpm dev`, open **http://localhost:3000/studio**, and sign in. The site now reads
   from Sanity instead of the sample data.

### Adding content (the admin's job)

In **/studio**:
1. **Site Settings** — store name, phone, **WhatsApp number** (digits + country code, e.g. `9198…`), email, address, socials.
2. **Sports** — e.g. Cricket (set it featured, order it first).
3. **Gear Categories** — e.g. Bats, Balls, Protective Gear… each linked to a sport.
4. **Brands** (optional).
5. **Products** — name, sport, category, images, price, MRP (for a discount badge), highlights, specs, description.
6. **Hero Banners** — the auto-scrolling home slides.

Hit **Publish**. With the webhook configured (below), the live site updates within seconds.

---

## Deploy to Vercel (free) + your domain

1. Push this repo to GitHub.
2. At **https://vercel.com** → **New Project** → import the repo (framework auto-detected).
3. Add the **Environment Variables** from `.env.local` (Project ID, dataset, revalidate
   secret, `NEXT_PUBLIC_SITE_URL` = your domain, and the enquiry/email vars if used).
4. Deploy. You'll get a `*.vercel.app` URL.
5. **Domains** → add your purchased domain and follow Vercel's DNS instructions at your
   registrar (A / CNAME records). HTTPS is automatic and free.

### Keep the live site fresh (on-demand revalidation)

In **sanity.io/manage → API → Webhooks**, add a webhook:
- **URL:** `https://yourdomain.com/api/revalidate?secret=THE_SAME_SECRET`
- **Trigger on:** Create, Update, Delete
- **Filter / projection:** send at least `{ "_type": _type }` in the payload
- **HTTP method:** POST

Now every **Publish** in the Studio refreshes only the affected pages — no rebuild, no
server cost.

---

## Enquiries (no checkout)

Every product has **Enquire on WhatsApp** (opens a prefilled chat), **Call**, and an
**Enquire** form. The contact form posts to `/api/enquiry`:

- With no email provider configured, enquiries are logged server-side (so nothing breaks in dev).
- To receive emails, set `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` (free at https://resend.com).
  WhatsApp remains the primary, zero-config channel.

---

## What's already handled

- **SEO** — per-page metadata, dynamic `sitemap.xml` + `robots.txt`, `Product` and
  `SportingGoodsStore` JSON-LD, Open Graph image, canonical URLs.
- **Performance** — Server Components, static/SSG catalog pages, `next/image` with the
  Sanity CDN (responsive AVIF/WebP + blur placeholders), minimal client JS.
- **UX** — full-screen auto-scrolling hero, sticky nav with a Sports dropdown, in-place
  subcategory filtering (shareable URLs), accessible focus states, reduced-motion support,
  mobile-first responsive layout.
- **Theme** — pitch-black + copper-gold + white design tokens in `src/app/globals.css`
  (change the gold in one place and it updates everywhere).

---

## Swapping the placeholder art

The `public/samples/*.svg` and `public/banners/*.svg` are intentional placeholders used by
the sample content. Once products have real images in Sanity, those images are served
automatically — no code change needed.
