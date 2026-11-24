import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CatalogView } from "@/components/CatalogView";
import {
  getAllSportSlugs,
  getProductsBySport,
  getSportBySlug,
} from "@/sanity/data";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSportSlugs();
  return slugs.map((sport) => ({ sport }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sport: string }>;
}): Promise<Metadata> {
  const { sport: slug } = await params;
  const sport = await getSportBySlug(slug);
  if (!sport) return { title: "Not found" };
  const title = `${sport.name} Gear`;
  const description =
    sport.description || `Shop ${sport.name.toLowerCase()} gear at SHNU Sports.`;
  return {
    title,
    description,
    alternates: { canonical: `/${sport.slug}` },
    openGraph: { title, description, url: `/${sport.slug}` },
  };
}

export default async function SportPage({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const { sport: slug } = await params;
  const [sport, products] = await Promise.all([
    getSportBySlug(slug),
    getProductsBySport(slug),
  ]);

  if (!sport) notFound();

  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: sport.name }]} />

      <header className="mb-8 max-w-2xl">
        <p className="eyebrow mb-2">Shop {sport.name}</p>
        <h1 className="text-4xl font-bold md:text-5xl">{sport.name} Gear</h1>
        {sport.description ? (
          <p className="mt-3 text-muted">{sport.description}</p>
        ) : null}
      </header>

      <Suspense fallback={<div className="py-20 text-center text-muted">Loading gear…</div>}>
        <CatalogView
          products={products}
          categories={sport.categories}
          basePath={`/${sport.slug}`}
        />
      </Suspense>
    </div>
  );
}
