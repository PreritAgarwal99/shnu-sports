import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGallery } from "@/components/ProductGallery";
import { EnquiryButtons } from "@/components/EnquiryButtons";
import { PortableBody } from "@/components/PortableBody";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
  getSiteSettings,
} from "@/sanity/data";
import { SITE, discountPercent, formatPrice } from "@/lib/site";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

function absoluteUrl(url: string) {
  return url.startsWith("http") ? url : `${SITE.url}${url}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  const description =
    product.shortDescription || `${product.name} — available at SHNU Sports.`;
  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description,
      url: `/product/${product.slug}`,
      images: product.image ? [{ url: absoluteUrl(product.image.url) }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [settings, related] = await Promise.all([
    getSiteSettings(),
    getRelatedProducts(product),
  ]);

  const off = discountPercent(product.mrp, product.price);
  const images = product.images?.length ? product.images : [product.image];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images.map((i) => absoluteUrl(i.url)),
    description: product.shortDescription,
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE.url}/product/${product.slug}`,
    },
  };

  return (
    <div className="container-page py-8 md:py-12">
      <JsonLd data={jsonLd} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: product.sportName, href: `/${product.sportSlug}` },
          ...(product.categoryName
            ? [{ label: product.categoryName, href: `/${product.sportSlug}/${product.categorySlug}` }]
            : []),
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={images} />

        <div>
          {product.brand ? (
            <p className="text-sm font-medium uppercase tracking-wider text-muted-2">{product.brand}</p>
          ) : null}
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-gold">{formatPrice(product.price)}</span>
            {product.mrp && product.mrp > product.price ? (
              <>
                <span className="text-lg text-muted-2 line-through">{formatPrice(product.mrp)}</span>
                <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-black">-{off}%</span>
              </>
            ) : null}
          </div>

          <div className="mt-3">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
                <Check className="h-4 w-4" /> In stock
              </span>
            ) : (
              <span className="text-sm text-muted">Currently out of stock — enquire for restock</span>
            )}
          </div>

          {product.shortDescription ? (
            <p className="mt-5 leading-relaxed text-muted">{product.shortDescription}</p>
          ) : null}

          {product.highlights?.length ? (
            <ul className="mt-6 space-y-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8">
            <EnquiryButtons product={product} settings={settings} />
          </div>

          {product.specs?.length ? (
            <div className="mt-10">
              <h2 className="mb-3 text-lg font-semibold">Specifications</h2>
              <dl className="overflow-hidden rounded-[var(--radius-card)] border border-line">
                {product.specs.map((s, i) => (
                  <div
                    key={i}
                    className={`flex justify-between gap-4 px-4 py-3 text-sm ${i % 2 ? "bg-surface/40" : ""}`}
                  >
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="text-right font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      </div>

      {product.richDescription?.length ? (
        <div className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold">Details</h2>
          <PortableBody value={product.richDescription} />
        </div>
      ) : null}

      {related.length ? (
        <section className="mt-20">
          <SectionHeading eyebrow="You may also like" title="Related gear" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
