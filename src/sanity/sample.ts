/**
 * Built-in sample content. Used automatically whenever Sanity isn't configured
 * (no NEXT_PUBLIC_SANITY_PROJECT_ID), so the whole site is explorable instantly.
 * Shapes match exactly what the Sanity GROQ queries return.
 */
import type {
  Banner,
  Category,
  Product,
  ProductCard,
  SiteSettings,
  Sport,
} from "./types";

const img = (file: string, alt: string) => ({
  url: `/samples/${file}`,
  alt,
  aspect: 4 / 3,
});

export const sampleSettings: SiteSettings = {
  storeName: "SHNU Sports",
  tagline: "Professional cricket gear at honest prices",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@shnusports.com",
  address: "12 Stadium Road, Sports Market, Bengaluru 560001, India",
  shippingNote:
    "Free shipping on orders above ₹2,000 across India. Easy 7-day returns on unused gear.",
  social: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
};

export const sampleBanners: Banner[] = [
  {
    _id: "b1",
    heading: "Pro-Grade Bats. Honest Prices.",
    subheading: "Hand-picked English & Kashmir willow, knocked-in and ready to score.",
    ctaLabel: "Shop Cricket Bats",
    ctaHref: "/cricket/bats",
    image: { url: "/banners/hero-1.svg", alt: "Professional cricket bats", aspect: 16 / 9 },
  },
  {
    _id: "b2",
    heading: "Gear That Performs.",
    subheading: "From gloves to guards — kit trusted by club and academy players.",
    ctaLabel: "Explore Cricket",
    ctaHref: "/cricket",
    image: { url: "/banners/hero-2.svg", alt: "Cricket protective gear", aspect: 16 / 9 },
  },
  {
    _id: "b3",
    heading: "Cricket Specialists.",
    subheading: "A store built by players, for players.",
    ctaLabel: "About SHNU",
    ctaHref: "/about",
    image: { url: "/banners/hero-3.svg", alt: "SHNU Sports store", aspect: 16 / 9 },
  },
];

// ---- Sports & categories ---------------------------------------------------

export const sampleSports: Sport[] = [
  {
    _id: "s-cricket",
    name: "Cricket",
    slug: "cricket",
    featured: true,
    description: "Our specialty — bats, balls, protection and full kits.",
    image: img("bats.svg", "Cricket"),
  },
  {
    _id: "s-football",
    name: "Football",
    slug: "football",
    featured: true,
    description: "Match balls and boots for every surface.",
    image: img("football.svg", "Football"),
  },
  {
    _id: "s-badminton",
    name: "Badminton",
    slug: "badminton",
    featured: true,
    description: "Rackets and shuttles for club players.",
    image: img("racket.svg", "Badminton"),
  },
];

export const sampleCategories: Category[] = [
  { _id: "c-bats", name: "Cricket Bats", slug: "bats", sportSlug: "cricket", image: img("bats.svg", "Cricket Bats") },
  { _id: "c-balls", name: "Cricket Balls", slug: "balls", sportSlug: "cricket", image: img("balls.svg", "Cricket Balls") },
  { _id: "c-protect", name: "Protective Gear", slug: "protective-gear", sportSlug: "cricket", image: img("protective.svg", "Protective Gear") },
  { _id: "c-gloves", name: "Batting Gloves", slug: "batting-gloves", sportSlug: "cricket", image: img("gloves.svg", "Batting Gloves") },
  { _id: "c-apparel", name: "Apparel", slug: "apparel", sportSlug: "cricket", image: img("apparel.svg", "Apparel") },
  { _id: "c-bags", name: "Kit Bags", slug: "kit-bags", sportSlug: "cricket", image: img("bags.svg", "Kit Bags") },
  { _id: "c-footballs", name: "Footballs", slug: "footballs", sportSlug: "football", image: img("football.svg", "Footballs") },
  { _id: "c-boots", name: "Boots", slug: "boots", sportSlug: "football", image: img("boots.svg", "Boots") },
  { _id: "c-rackets", name: "Rackets", slug: "rackets", sportSlug: "badminton", image: img("racket.svg", "Rackets") },
  { _id: "c-shuttles", name: "Shuttlecocks", slug: "shuttlecocks", sportSlug: "badminton", image: img("shuttle.svg", "Shuttlecocks") },
];

// ---- Products --------------------------------------------------------------

type Seed = Omit<Product, "image" | "images"> & { imageFile: string };

const seed: Seed[] = [
  {
    _id: "p1",
    name: "Grade 1 English Willow Pro Bat",
    slug: "grade-1-english-willow-pro-bat",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "bats", categoryName: "Cricket Bats",
    brand: "SHNU Elite", price: 12499, mrp: 18999, inStock: true, featured: true,
    imageFile: "bats.svg",
    shortDescription:
      "Match-ready Grade 1 English willow with a big profile and powerful middle. Knocked-in and ready to play.",
    highlights: [
      "Premium Grade 1 English willow",
      "6–8 straight grains, pressed for performance",
      "Full profile with a mid-to-low sweet spot",
      "Hand-knocked & oiled — ready to use",
    ],
    specs: [
      { label: "Willow", value: "Grade 1 English" },
      { label: "Weight", value: "1180–1220 g" },
      { label: "Handle", value: "Singapore cane, oval" },
      { label: "Size", value: "Short Handle (SH)" },
    ],
    tags: ["pro", "english willow", "bestseller"],
  },
  {
    _id: "p2",
    name: "Players Edition English Willow Bat",
    slug: "players-edition-english-willow-bat",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "bats", categoryName: "Cricket Bats",
    brand: "SHNU Elite", price: 9999, mrp: 14999, inStock: true, featured: true,
    imageFile: "bats.svg",
    shortDescription: "Grade 2 English willow balanced for stroke-play and quick pick-up.",
    highlights: ["Grade 2 English willow", "Balanced pick-up", "Thick edges", "Ready to play"],
    specs: [
      { label: "Willow", value: "Grade 2 English" },
      { label: "Weight", value: "1150–1190 g" },
      { label: "Size", value: "Short Handle (SH)" },
    ],
    tags: ["english willow"],
  },
  {
    _id: "p3",
    name: "Academy Kashmir Willow Bat",
    slug: "academy-kashmir-willow-bat",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "bats", categoryName: "Cricket Bats",
    brand: "SHNU Pro", price: 2499, mrp: 3499, inStock: true, featured: true,
    imageFile: "bats.svg",
    shortDescription: "Durable Kashmir willow — ideal for practice and tennis-ball cricket.",
    highlights: ["Seasoned Kashmir willow", "Great value", "All-round profile"],
    specs: [
      { label: "Willow", value: "Kashmir" },
      { label: "Weight", value: "1200–1250 g" },
    ],
    tags: ["kashmir willow", "value"],
  },
  {
    _id: "p4",
    name: "Pro Leather Match Ball (Red)",
    slug: "pro-leather-match-ball-red",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "balls", categoryName: "Cricket Balls",
    brand: "SHNU Pro", price: 899, mrp: 1299, inStock: true, featured: false,
    imageFile: "balls.svg",
    shortDescription: "4-piece alum-tanned leather ball with a pronounced seam for swing.",
    highlights: ["4-piece construction", "Alum-tanned leather", "Hand-stitched seam"],
    specs: [{ label: "Weight", value: "156 g" }, { label: "Colour", value: "Red" }],
    tags: ["leather"],
  },
  {
    _id: "p5",
    name: "Tournament Batting Pads",
    slug: "tournament-batting-pads",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "protective-gear", categoryName: "Protective Gear",
    brand: "SHNU Pro", price: 2999, mrp: 3999, inStock: true, featured: true,
    imageFile: "protective.svg",
    shortDescription: "Lightweight, high-density foam pads with sturdy bolster protection.",
    highlights: ["Light & high coverage", "Breathable mesh back", "Secure strap system"],
    specs: [{ label: "Fit", value: "Adult (RH/LH)" }, { label: "Weight", value: "Light" }],
    tags: ["protection"],
  },
  {
    _id: "p6",
    name: "Pro Batting Gloves",
    slug: "pro-batting-gloves",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "batting-gloves", categoryName: "Batting Gloves",
    brand: "SHNU Pro", price: 1499, mrp: 1999, inStock: true, featured: false,
    imageFile: "gloves.svg",
    shortDescription: "Sheep-leather palm with high-density finger protection and airflow.",
    highlights: ["Soft sheep-leather palm", "Sweat-wicking", "Flexible finger rolls"],
    specs: [{ label: "Fit", value: "Adult" }],
    tags: ["protection"],
  },
  {
    _id: "p7",
    name: "Lightweight Cricket Helmet",
    slug: "lightweight-cricket-helmet",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "protective-gear", categoryName: "Protective Gear",
    brand: "SHNU Pro", price: 2499, inStock: true, featured: false,
    imageFile: "protective.svg",
    shortDescription: "Steel grille helmet with adjustable fit and ventilation.",
    highlights: ["Adjustable fit dial", "Steel grille", "Ventilated shell"],
    specs: [{ label: "Grille", value: "Steel" }],
    tags: ["protection"],
  },
  {
    _id: "p8",
    name: "Wheelie Kit Bag",
    slug: "wheelie-kit-bag",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "kit-bags", categoryName: "Kit Bags",
    brand: "SHNU Pro", price: 3499, mrp: 4499, inStock: true, featured: true,
    imageFile: "bags.svg",
    shortDescription: "Spacious wheeled bag that fits two full kits with a bat sleeve.",
    highlights: ["Fits 2 full kits", "Smooth wheels", "Reinforced base"],
    specs: [{ label: "Capacity", value: "~90 L" }],
    tags: ["bag"],
  },
  {
    _id: "p9",
    name: "Team Cricket Jersey",
    slug: "team-cricket-jersey",
    sportSlug: "cricket", sportName: "Cricket",
    categorySlug: "apparel", categoryName: "Apparel",
    brand: "SHNU", price: 1299, inStock: true, featured: false,
    imageFile: "apparel.svg",
    shortDescription: "Moisture-wicking polyester jersey — customisable for teams.",
    highlights: ["Dry-fit fabric", "Team customisation available"],
    specs: [{ label: "Fabric", value: "Polyester" }],
    tags: ["apparel"],
  },
  {
    _id: "p10",
    name: "Match Football",
    slug: "match-football",
    sportSlug: "football", sportName: "Football",
    categorySlug: "footballs", categoryName: "Footballs",
    brand: "SHNU", price: 1499, mrp: 1899, inStock: true, featured: false,
    imageFile: "football.svg",
    shortDescription: "Hand-stitched size 5 match ball with a durable PU cover.",
    highlights: ["Size 5", "PU cover", "Retains shape"],
    specs: [{ label: "Size", value: "5" }],
    tags: ["football"],
  },
  {
    _id: "p11",
    name: "Carbon Badminton Racket",
    slug: "carbon-badminton-racket",
    sportSlug: "badminton", sportName: "Badminton",
    categorySlug: "rackets", categoryName: "Rackets",
    brand: "SHNU", price: 2499, mrp: 2999, inStock: true, featured: false,
    imageFile: "racket.svg",
    shortDescription: "Lightweight full-carbon frame for fast, controlled play.",
    highlights: ["Full carbon", "Even balance", "Includes cover"],
    specs: [{ label: "Weight", value: "85 g" }],
    tags: ["badminton"],
  },
  {
    _id: "p12",
    name: "Feather Shuttlecocks (Pack of 6)",
    slug: "feather-shuttlecocks-pack-of-6",
    sportSlug: "badminton", sportName: "Badminton",
    categorySlug: "shuttlecocks", categoryName: "Shuttlecocks",
    brand: "SHNU", price: 699, inStock: false, featured: false,
    imageFile: "shuttle.svg",
    shortDescription: "Tournament-grade goose-feather shuttles with stable flight.",
    highlights: ["Goose feather", "Stable flight", "Pack of 6"],
    specs: [{ label: "Speed", value: "Medium (77)" }],
    tags: ["badminton"],
  },
];

export const sampleProducts: Product[] = seed.map(({ imageFile, ...p }) => ({
  ...p,
  image: img(imageFile, p.name),
  images: [img(imageFile, p.name)],
}));

export function sampleProductCards(): ProductCard[] {
  return sampleProducts.map((p) => ({
    _id: p._id,
    name: p.name,
    slug: p.slug,
    sportSlug: p.sportSlug,
    categorySlug: p.categorySlug,
    categoryName: p.categoryName,
    brand: p.brand,
    price: p.price,
    mrp: p.mrp,
    inStock: p.inStock,
    featured: p.featured,
    image: p.image,
  }));
}
