# Going live — deploy to production & give your team access

This is the runbook for taking SHNU Sports from local to a live domain on **Vercel's
free tier**, and for letting other people manage content in **Sanity Studio** after it's
hosted.

You've already: created a Sanity project, connected it locally, and run `pnpm seed`.

---

## Part A — Deploy the site to production

### 1. Push the code to GitHub
Create a repo (private is fine) and push:

```bash
git add -A
git commit -m "SHNU Sports storefront"
git branch -M main
git remote add origin https://github.com/<you>/shnu-sports.git
git push -u origin main
```

> `.env.local` is git-ignored, so your tokens are **not** pushed — you'll set env vars in Vercel instead.

### 2. Import into Vercel
1. Go to **https://vercel.com** → sign in with GitHub → **Add New… → Project**.
2. Import the `shnu-sports` repo. Vercel auto-detects Next.js — leave build settings default.
3. **Before the first deploy**, add the environment variables below (Settings → Environment Variables), then deploy.

### 3. Production environment variables (set in Vercel)

| Variable | Required? | Value |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | ✅ | `2024-10-01` |
| `NEXT_PUBLIC_SITE_URL` | ✅ | `https://yourdomain.com` (used for canonical URLs, sitemap, OG tags) |
| `SANITY_REVALIDATE_SECRET` | ✅ | A long random string (must match the webhook in Part C) |
| `SANITY_API_READ_TOKEN` | Only if your dataset is **private** | A **Viewer** token from Sanity |
| `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` | Optional | To receive contact-form emails (else enquiries just log) |

> **Do NOT set `SANITY_API_WRITE_TOKEN` in Vercel.** It's only for running `pnpm seed`
> locally; the live site never needs write access.

Set each variable for the **Production** (and Preview, if you want) environment, then
**Deploy**. You'll get a `https://<project>.vercel.app` URL — check the site loads there.

### 4. Connect your purchased domain
1. In Vercel → your project → **Settings → Domains → Add** → enter `yourdomain.com`
   (add `www.yourdomain.com` too and let Vercel redirect one to the other).
2. Vercel shows the exact **DNS records** to create. At your domain registrar, add them:
   - Apex (`yourdomain.com`): an **A record** to Vercel's IP (shown), or an ALIAS/ANAME if your registrar supports it.
   - `www`: a **CNAME** to `cname.vercel-dns.com`.
3. Wait for DNS to propagate (minutes to a few hours). **HTTPS/SSL is automatic and free.**
4. Once the domain is live, confirm `NEXT_PUBLIC_SITE_URL` equals it, and redeploy if you changed it.

---

## Part B — Point Sanity at the production domain

Two things must know about the new domain:

1. **CORS** — so the hosted Studio can talk to Sanity.
   Sanity → your project → **API → CORS origins → Add**:
   `https://yourdomain.com` (and `https://www.yourdomain.com`), tick **Allow credentials**.

2. **`NEXT_PUBLIC_SITE_URL`** — already set in Part A step 3 to the real domain.

---

## Part C — Keep the live site fresh (publish → live in seconds)

The site serves fast static pages; this webhook refreshes them on publish, so admins never
need a redeploy.

Sanity → your project → **API → Webhooks → Create webhook**:

| Field | Value |
|---|---|
| Name | `Revalidate production` |
| URL | `https://yourdomain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| HTTP method | `POST` |
| API version | `v2024-10-01` |
| Projection | `{ "_type": _type }` |

Use the **same** secret you put in `SANITY_REVALIDATE_SECRET` on Vercel. Test it by
editing a product in Studio and hitting **Publish** — the change should appear on the live
site within a few seconds.

---

## Part D — Give other people admin access to manage content

The Studio is hosted at **`https://yourdomain.com/studio`** (no separate deployment). Anyone
you invite as a project member can sign in there and manage content.

### Invite a teammate
1. Sanity → your project → **Members → Invite members**.
2. Enter their email and pick a **role**:
   - **Editor** — create, edit and **publish** content. ✅ *Recommended for content managers / store staff.*
   - **Administrator** — full control incl. project settings, members, tokens, billing. *Give sparingly.*
   - **Viewer** — read-only.
3. They get an email invite → they create/sign in to a free Sanity account → they can then
   open `https://yourdomain.com/studio` and start editing.

> **Plan limits:** Sanity's free plan includes a limited number of users and roles. If you
> need more seats or custom roles, check current limits at https://www.sanity.io/pricing.
> Adding members does **not** require any code or redeploy.

### What admins do day-to-day
- Go to `https://yourdomain.com/studio`, sign in.
- Add/edit **Products, Gear Categories, Sports, Hero Banners, Brands**, and **Site Settings**.
- Click **Publish** on each change → the live site updates within seconds (via the webhook).
- Upload real product photos directly on each product — they replace the placeholder art
  automatically, served optimized from Sanity's CDN.

### Access & safety notes
- Only invited members can view or change content — the Studio requires a Sanity login, and
  the site itself only ever **reads published** content.
- Keep **Administrator** for 1–2 trusted people; use **Editor** for everyone managing the catalog.
- If someone leaves, remove them under **Members**.
- Never share API tokens with content editors — they don't need them; they just log in.

---

## Quick go-live checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created with all required env vars (no write token)
- [ ] First deploy succeeds on the `*.vercel.app` URL
- [ ] Domain added in Vercel + DNS records set at registrar; HTTPS active
- [ ] `NEXT_PUBLIC_SITE_URL` = the real domain
- [ ] Production domain added to Sanity **CORS origins**
- [ ] Revalidate **webhook** created with the matching secret; publish test passes
- [ ] `robots.txt`, `sitemap.xml` and a product page load on the live domain
- [ ] (Optional) Resend configured for contact-form emails
- [ ] Teammates invited as **Editor** in Sanity → can log in at `/studio`
