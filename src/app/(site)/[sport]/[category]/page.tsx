import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CatalogView } from "@/components/CatalogView";
import {
  getAllCategoryParams,
  getCategory,
  getProductsByCategory,
  getSportBySlug,
} from "@/sanity/data";

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllCategoryParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sport: string; category: string }>;
}): Promise<Metadata> {
  const { sport, category } = await params;
  const cat = await getCategory(sport, category);
  if (!cat) return { title: "Not found" };
  const title = cat.name;
  const description = `Shop ${cat.name.toLowerCase()} at SHNU Sports — professional gear at affordable prices.`;
  return {
    title,
    description,
    alternates: { canonical: `/${sport}/${category}` },
    openGraph: { title, description, url: `/${sport}/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ sport: string; category: string }>;
}) {
  const { sport: sportSlug, category: categorySlug } = await params;
  const [sport, category, products] = await Promise.all([
    getSportBySlug(sportSlug),
    getCategory(sportSlug, categorySlug),
    getProductsByCategory(sportSlug, categorySlug),
  ]);

  if (!sport || !category) notFound();

  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: sport.name, href: `/${sport.slug}` },
          { label: category.name },
        ]}
      />

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow mb-2">{sport.name}</p>
          <h1 className="text-4xl font-bold md:text-5xl">{category.name}</h1>
        </div>
        <Link
          href={`/${sport.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-bright"
        >
          <ArrowLeft className="h-4 w-4" />
          All {sport.name.toLowerCase()} gear
        </Link>
      </header>

      <Suspense fallback={<div className="py-20 text-center text-muted">Loading gear…</div>}>
        <CatalogView products={products} basePath={`/${sport.slug}/${category.slug}`} />
      </Suspense>
    </div>
  );
}
