// Seed a Sanity dataset with the SHNU Sports demo content so you can test the
// Studio + live site immediately after connecting.
//
// Prereqs:
//   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID (+ dataset) in .env.local
//   2. Create an "Editor" token at sanity.io/manage -> API -> Tokens
//      and set it as SANITY_API_WRITE_TOKEN in .env.local
//
// Run:  pnpm seed
//
// It's idempotent (uses fixed document ids), so you can re-run it safely.

import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "\nMissing config. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local.\n" +
      "Create an Editor token at https://www.sanity.io/manage -> API -> Tokens.\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  useCdn: false,
});

// ---- Demo content (compact mirror of the built-in sample data) -------------

const sports = [
  { _id: "sport-cricket", name: "Cricket", slug: "cricket", order: 0, featured: true, img: "samples/bats.svg", description: "Our specialty — bats, balls, protection and full kits." },
  { _id: "sport-football", name: "Football", slug: "football", order: 1, featured: true, img: "samples/football.svg", description: "Match balls and boots for every surface." },
  { _id: "sport-badminton", name: "Badminton", slug: "badminton", order: 2, featured: true, img: "samples/racket.svg", description: "Rackets and shuttles for club players." },
];

const categories = [
  { _id: "cat-bats", name: "Cricket Bats", slug: "bats", sport: "sport-cricket", order: 0, img: "samples/bats.svg" },
  { _id: "cat-balls", name: "Cricket Balls", slug: "balls", sport: "sport-cricket", order: 1, img: "samples/balls.svg" },
  { _id: "cat-protective", name: "Protective Gear", slug: "protective-gear", sport: "sport-cricket", order: 2, img: "samples/protective.svg" },
  { _id: "cat-gloves", name: "Batting Gloves", slug: "batting-gloves", sport: "sport-cricket", order: 3, img: "samples/gloves.svg" },
  { _id: "cat-apparel", name: "Apparel", slug: "apparel", sport: "sport-cricket", order: 4, img: "samples/apparel.svg" },
  { _id: "cat-bags", name: "Kit Bags", slug: "kit-bags", sport: "sport-cricket", order: 5, img: "samples/bags.svg" },
  { _id: "cat-footballs", name: "Footballs", slug: "footballs", sport: "sport-football", order: 0, img: "samples/football.svg" },
  { _id: "cat-rackets", name: "Rackets", slug: "rackets", sport: "sport-badminton", order: 0, img: "samples/racket.svg" },
];

const brands = [
  { _id: "brand-elite", name: "SHNU Elite", slug: "shnu-elite" },
  { _id: "brand-pro", name: "SHNU Pro", slug: "shnu-pro" },
  { _id: "brand-shnu", name: "SHNU", slug: "shnu" },
];

const products = [
  { _id: "prod-pro-bat", name: "Grade 1 English Willow Pro Bat", slug: "grade-1-english-willow-pro-bat", sport: "sport-cricket", category: "cat-bats", brand: "brand-elite", price: 12499, mrp: 18999, inStock: true, featured: true, img: "samples/bats.svg", short: "Match-ready Grade 1 English willow with a big profile and powerful middle.", highlights: ["Premium Grade 1 English willow", "6–8 straight grains", "Hand-knocked & oiled — ready to use"], specs: [["Willow", "Grade 1 English"], ["Weight", "1180–1220 g"], ["Size", "Short Handle (SH)"]] },
  { _id: "prod-players-bat", name: "Players Edition English Willow Bat", slug: "players-edition-english-willow-bat", sport: "sport-cricket", category: "cat-bats", brand: "brand-elite", price: 9999, mrp: 14999, inStock: true, featured: true, img: "samples/bats.svg", short: "Grade 2 English willow balanced for stroke-play and quick pick-up.", highlights: ["Grade 2 English willow", "Balanced pick-up", "Thick edges"], specs: [["Willow", "Grade 2 English"], ["Weight", "1150–1190 g"]] },
  { _id: "prod-academy-bat", name: "Academy Kashmir Willow Bat", slug: "academy-kashmir-willow-bat", sport: "sport-cricket", category: "cat-bats", brand: "brand-pro", price: 2499, mrp: 3499, inStock: true, featured: true, img: "samples/bats.svg", short: "Durable Kashmir willow — ideal for practice and tennis-ball cricket.", highlights: ["Seasoned Kashmir willow", "Great value"], specs: [["Willow", "Kashmir"]] },
  { _id: "prod-match-ball", name: "Pro Leather Match Ball (Red)", slug: "pro-leather-match-ball-red", sport: "sport-cricket", category: "cat-balls", brand: "brand-pro", price: 899, mrp: 1299, inStock: true, featured: false, img: "samples/balls.svg", short: "4-piece alum-tanned leather ball with a pronounced seam for swing.", highlights: ["4-piece construction", "Hand-stitched seam"], specs: [["Weight", "156 g"]] },
  { _id: "prod-pads", name: "Tournament Batting Pads", slug: "tournament-batting-pads", sport: "sport-cricket", category: "cat-protective", brand: "brand-pro", price: 2999, mrp: 3999, inStock: true, featured: true, img: "samples/protective.svg", short: "Lightweight, high-density foam pads with sturdy bolster protection.", highlights: ["Light & high coverage", "Breathable mesh back"], specs: [["Fit", "Adult (RH/LH)"]] },
  { _id: "prod-gloves", name: "Pro Batting Gloves", slug: "pro-batting-gloves", sport: "sport-cricket", category: "cat-gloves", brand: "brand-pro", price: 1499, mrp: 1999, inStock: true, featured: false, img: "samples/gloves.svg", short: "Sheep-leather palm with high-density finger protection and airflow.", highlights: ["Soft sheep-leather palm", "Sweat-wicking"], specs: [["Fit", "Adult"]] },
  { _id: "prod-bag", name: "Wheelie Kit Bag", slug: "wheelie-kit-bag", sport: "sport-cricket", category: "cat-bags", brand: "brand-pro", price: 3499, mrp: 4499, inStock: true, featured: true, img: "samples/bags.svg", short: "Spacious wheeled bag that fits two full kits with a bat sleeve.", highlights: ["Fits 2 full kits", "Smooth wheels"], specs: [["Capacity", "~90 L"]] },
  { _id: "prod-football", name: "Match Football", slug: "match-football", sport: "sport-football", category: "cat-footballs", brand: "brand-shnu", price: 1499, mrp: 1899, inStock: true, featured: false, img: "samples/football.svg", short: "Hand-stitched size 5 match ball with a durable PU cover.", highlights: ["Size 5", "PU cover"], specs: [["Size", "5"]] },
  { _id: "prod-racket", name: "Carbon Badminton Racket", slug: "carbon-badminton-racket", sport: "sport-badminton", category: "cat-rackets", brand: "brand-shnu", price: 2499, mrp: 2999, inStock: true, featured: false, img: "samples/racket.svg", short: "Lightweight full-carbon frame for fast, controlled play.", highlights: ["Full carbon", "Even balance"], specs: [["Weight", "85 g"]] },
];

const banners = [
  { _id: "banner-1", heading: "Pro-Grade Bats. Honest Prices.", subheading: "Hand-picked English & Kashmir willow, knocked-in and ready to score.", ctaLabel: "Shop Cricket Bats", ctaHref: "/cricket/bats", img: "banners/hero-1.svg", order: 0 },
  { _id: "banner-2", heading: "Gear That Performs.", subheading: "From gloves to guards — kit trusted by club and academy players.", ctaLabel: "Explore Cricket", ctaHref: "/cricket", img: "banners/hero-2.svg", order: 1 },
  { _id: "banner-3", heading: "Cricket Specialists.", subheading: "A store built by players, for players.", ctaLabel: "About SHNU", ctaHref: "/about", img: "banners/hero-3.svg", order: 2 },
];

// ---- Helpers ---------------------------------------------------------------

const assetCache = new Map();
async function uploadImage(relPath) {
  if (assetCache.has(relPath)) return assetCache.get(relPath);
  const buf = readFileSync(join(root, "public", relPath));
  const filename = relPath.split("/").pop();
  const asset = await client.assets.upload("image", buf, { filename, contentType: "image/svg+xml" });
  assetCache.set(relPath, asset._id);
  return asset._id;
}

const imageField = (assetId, alt) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
  alt,
});
const ref = (id) => ({ _type: "reference", _ref: id });
const slug = (current) => ({ _type: "slug", current });

// ---- Run -------------------------------------------------------------------

async function run() {
  console.log(`Seeding project ${projectId} / ${dataset} …`);
  const tx = client.transaction();

  // Site settings (singleton)
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    storeName: "SHNU Sports",
    tagline: "Professional cricket gear at honest prices",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "hello@shnusports.com",
    address: "12 Stadium Road, Sports Market, Bengaluru 560001, India",
    shippingNote: "Free shipping on orders above ₹2,000 across India. Easy 7-day returns on unused gear.",
    social: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
  });

  for (const b of brands) {
    tx.createOrReplace({ _id: b._id, _type: "brand", name: b.name, slug: slug(b.slug) });
  }

  for (const s of sports) {
    const assetId = await uploadImage(s.img);
    tx.createOrReplace({
      _id: s._id, _type: "sport", name: s.name, slug: slug(s.slug),
      order: s.order, featured: s.featured, description: s.description,
      image: imageField(assetId, s.name),
    });
  }

  for (const c of categories) {
    const assetId = await uploadImage(c.img);
    tx.createOrReplace({
      _id: c._id, _type: "category", name: c.name, slug: slug(c.slug),
      order: c.order, sport: ref(c.sport), image: imageField(assetId, c.name),
    });
  }

  for (const p of products) {
    const assetId = await uploadImage(p.img);
    tx.createOrReplace({
      _id: p._id, _type: "product", name: p.name, slug: slug(p.slug),
      sport: ref(p.sport), category: ref(p.category), brand: ref(p.brand),
      price: p.price, mrp: p.mrp, inStock: p.inStock, featured: p.featured,
      shortDescription: p.short, highlights: p.highlights,
      specs: p.specs.map(([label, value]) => ({ _type: "object", _key: label, label, value })),
      images: [{ ...imageField(assetId, p.name), _key: "img0" }],
    });
  }

  for (const b of banners) {
    const assetId = await uploadImage(b.img);
    tx.createOrReplace({
      _id: b._id, _type: "banner", heading: b.heading, subheading: b.subheading,
      ctaLabel: b.ctaLabel, ctaHref: b.ctaHref, order: b.order, active: true,
      image: imageField(assetId, b.heading),
    });
  }

  await tx.commit();
  console.log(`✓ Seeded ${sports.length} sports, ${categories.length} categories, ${products.length} products, ${banners.length} banners.`);
  console.log("Open http://localhost:3000/studio to edit, or http://localhost:3000 to view.");
}

run().catch((err) => {
  console.error("Seed failed:", err.message || err);
  process.exit(1);
});
