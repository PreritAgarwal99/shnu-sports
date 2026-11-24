import { sanityFetch } from "./fetch";
import { hasSanity } from "./env";
import {
  sampleBanners,
  sampleCategories,
  sampleProductCards,
  sampleProducts,
  sampleSettings,
  sampleSports,
} from "./sample";
import type {
  Banner,
  Category,
  Product,
  ProductCard,
  SiteSettings,
  Sport,
} from "./types";

// Revalidation tags — the webhook refreshes by document type.
export const TAGS = {
  settings: "settings",
  banner: "banner",
  sport: "sport",
  category: "category",
  product: "product",
};

// --- Reusable GROQ projections ---------------------------------------------

const IMG = `{
  "url": asset->url,
  "alt": coalesce(alt, ^.name, ^.heading, "SHNU Sports"),
  "lqip": asset->metadata.lqip,
  "aspect": asset->metadata.dimensions.aspectRatio
}`;

const CARD = `{
  _id, name, "slug": slug.current,
  "sportSlug": sport->slug.current,
  "categorySlug": category->slug.current,
  "categoryName": category->name,
  "brand": brand->name,
  price, mrp, inStock, featured,
  "image": images[0]${IMG}
}`;

const FULL = `{
  _id, name, "slug": slug.current,
  "sportSlug": sport->slug.current, "sportName": sport->name,
  "categorySlug": category->slug.current, "categoryName": category->name,
  "brand": brand->name,
  price, mrp, inStock, featured,
  shortDescription, highlights, specs, richDescription, tags,
  "image": images[0]${IMG},
  "images": images[]${IMG}
}`;

// --- Getters ---------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSanity) return sampleSettings;
  const data = await sanityFetch<SiteSettings>({
    query: `*[_type == "siteSettings"][0]{
      storeName, tagline, phone, whatsapp, email, address, about, shippingNote, social,
      "logo": logo${IMG}
    }`,
    tags: [TAGS.settings],
  });
  return data ?? sampleSettings;
}

/** Sports with their categories — powers the header nav and home grid. */
export async function getNavSports(): Promise<Sport[]> {
  if (!hasSanity) {
    return sampleSports.map((s) => ({
      ...s,
      categories: sampleCategories.filter((c) => c.sportSlug === s.slug),
    }));
  }
  const data = await sanityFetch<Sport[]>({
    query: `*[_type == "sport"] | order(order asc){
      _id, name, "slug": slug.current, description, featured,
      "image": image${IMG},
      "categories": *[_type == "category" && sport._ref == ^._id] | order(order asc){
        _id, name, "slug": slug.current, "sportSlug": ^.slug.current,
        "image": image${IMG}
      }
    }`,
    tags: [TAGS.sport, TAGS.category],
  });
  return data ?? [];
}

export async function getBanners(): Promise<Banner[]> {
  if (!hasSanity) return sampleBanners;
  const data = await sanityFetch<Banner[]>({
    query: `*[_type == "banner" && active == true] | order(order asc){
      _id, heading, subheading, ctaLabel, ctaHref, "image": image${IMG}
    }`,
    tags: [TAGS.banner],
  });
  return data && data.length ? data : sampleBanners;
}

export async function getFeaturedProducts(limit = 8): Promise<ProductCard[]> {
  if (!hasSanity) return sampleProductCards().filter((p) => p.featured).slice(0, limit);
  const data = await sanityFetch<ProductCard[]>({
    query: `*[_type == "product" && featured == true] | order(_createdAt desc)[0...$limit]${CARD}`,
    params: { limit },
    tags: [TAGS.product],
  });
  return data ?? [];
}

export async function getSportBySlug(slug: string): Promise<Sport | null> {
  if (!hasSanity) {
    const s = sampleSports.find((x) => x.slug === slug);
    if (!s) return null;
    const cards = sampleProductCards();
    return {
      ...s,
      categories: sampleCategories
        .filter((c) => c.sportSlug === slug)
        .map((c) => ({ ...c, productCount: cards.filter((p) => p.categorySlug === c.slug).length })),
    };
  }
  const data = await sanityFetch<Sport | null>({
    query: `*[_type == "sport" && slug.current == $slug][0]{
      _id, name, "slug": slug.current, description,
      "image": image${IMG},
      "categories": *[_type == "category" && sport._ref == ^._id] | order(order asc){
        _id, name, "slug": slug.current, "sportSlug": ^.slug.current,
        "image": image${IMG},
        "productCount": count(*[_type == "product" && category._ref == ^._id])
      }
    }`,
    params: { slug },
    tags: [TAGS.sport, TAGS.category, TAGS.product],
  });
  return data ?? null;
}

export async function getProductsBySport(slug: string): Promise<ProductCard[]> {
  if (!hasSanity) return sampleProductCards().filter((p) => p.sportSlug === slug);
  const data = await sanityFetch<ProductCard[]>({
    query: `*[_type == "product" && sport->slug.current == $slug] | order(featured desc, price asc)${CARD}`,
    params: { slug },
    tags: [TAGS.product],
  });
  return data ?? [];
}

export async function getCategory(
  sportSlug: string,
  categorySlug: string,
): Promise<Category | null> {
  if (!hasSanity) {
    return (
      sampleCategories.find((c) => c.sportSlug === sportSlug && c.slug === categorySlug) ?? null
    );
  }
  const data = await sanityFetch<Category | null>({
    query: `*[_type == "category" && slug.current == $categorySlug && sport->slug.current == $sportSlug][0]{
      _id, name, "slug": slug.current, "sportSlug": sport->slug.current, "image": image${IMG}
    }`,
    params: { sportSlug, categorySlug },
    tags: [TAGS.category],
  });
  return data ?? null;
}

export async function getProductsByCategory(
  sportSlug: string,
  categorySlug: string,
): Promise<ProductCard[]> {
  if (!hasSanity) {
    return sampleProductCards().filter(
      (p) => p.sportSlug === sportSlug && p.categorySlug === categorySlug,
    );
  }
  const data = await sanityFetch<ProductCard[]>({
    query: `*[_type == "product" && sport->slug.current == $sportSlug && category->slug.current == $categorySlug] | order(featured desc, price asc)${CARD}`,
    params: { sportSlug, categorySlug },
    tags: [TAGS.product],
  });
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSanity) return sampleProducts.find((p) => p.slug === slug) ?? null;
  const data = await sanityFetch<Product | null>({
    query: `*[_type == "product" && slug.current == $slug][0]${FULL}`,
    params: { slug },
    tags: [TAGS.product],
  });
  return data ?? null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<ProductCard[]> {
  if (!hasSanity) {
    return sampleProductCards()
      .filter((p) => p.categorySlug === product.categorySlug && p._id !== product._id)
      .slice(0, limit);
  }
  const data = await sanityFetch<ProductCard[]>({
    query: `*[_type == "product" && category->slug.current == $categorySlug && _id != $id] | order(featured desc)[0...$limit]${CARD}`,
    params: { categorySlug: product.categorySlug, id: product._id, limit },
    tags: [TAGS.product],
  });
  return data ?? [];
}

// --- Static params (for generateStaticParams) ------------------------------

export async function getAllSportSlugs(): Promise<string[]> {
  if (!hasSanity) return sampleSports.map((s) => s.slug);
  const data = await sanityFetch<string[]>({
    query: `*[_type == "sport" && defined(slug.current)].slug.current`,
    tags: [TAGS.sport],
  });
  return data ?? [];
}

export async function getAllCategoryParams(): Promise<{ sport: string; category: string }[]> {
  if (!hasSanity) {
    return sampleCategories.map((c) => ({ sport: c.sportSlug, category: c.slug }));
  }
  const data = await sanityFetch<{ sport: string; category: string }[]>({
    query: `*[_type == "category" && defined(slug.current)]{
      "sport": sport->slug.current, "category": slug.current
    }`,
    tags: [TAGS.category],
  });
  return data ?? [];
}

export async function getAllProductSlugs(): Promise<string[]> {
  if (!hasSanity) return sampleProducts.map((p) => p.slug);
  const data = await sanityFetch<string[]>({
    query: `*[_type == "product" && defined(slug.current)].slug.current`,
    tags: [TAGS.product],
  });
  return data ?? [];
}
