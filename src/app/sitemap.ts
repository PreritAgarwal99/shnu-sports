import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import {
  getAllCategoryParams,
  getAllProductSlugs,
  getAllSportSlugs,
} from "@/sanity/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sports, categories, products] = await Promise.all([
    getAllSportSlugs(),
    getAllCategoryParams(),
    getAllProductSlugs(),
  ]);

  const now = new Date();
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const sportRoutes: MetadataRoute.Sitemap = sports.map((s) => ({
    url: `${base}/${s}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/${c.sport}/${c.category}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((slug) => ({
    url: `${base}/product/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...sportRoutes, ...categoryRoutes, ...productRoutes];
}
