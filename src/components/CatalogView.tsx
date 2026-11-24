"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, PackageOpen } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Category, ProductCard as ProductCardType } from "@/sanity/types";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export function CatalogView({
  products,
  categories,
  basePath,
}: {
  products: ProductCardType[];
  categories?: Category[];
  basePath: string;
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCat = sp.get("cat") || "all";
  const sort = (sp.get("sort") as Sort) || "featured";
  const inStockOnly = sp.get("stock") === "1";
  const activeBrand = sp.get("brand") || "all";

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))) as string[],
    [products],
  );

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(sp.toString());
    if (!value || value === "all" || value === "0") params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = products.slice();
    if (categories && activeCat !== "all") list = list.filter((p) => p.categorySlug === activeCat);
    if (activeBrand !== "all") list = list.filter((p) => p.brand === activeBrand);
    if (inStockOnly) list = list.filter((p) => p.inStock);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.price - b.price);
    }
    return list;
  }, [products, categories, activeCat, activeBrand, inStockOnly, sort]);

  return (
    <div>
      {/* Category chips (sport page only) */}
      {categories?.length ? (
        <div className="mb-6 flex flex-wrap gap-2">
          <Chip active={activeCat === "all"} onClick={() => setParam("cat", null)}>
            All gear
          </Chip>
          {categories.map((c) => (
            <Chip key={c._id} active={activeCat === c.slug} onClick={() => setParam("cat", c.slug)}>
              {c.name}
            </Chip>
          ))}
        </div>
      ) : null}

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 border-y border-line py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted">
          <SlidersHorizontal className="h-4 w-4 text-gold" />
          <span>
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {brands.length > 1 ? (
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">Brand</span>
              <select
                value={activeBrand}
                onChange={(e) => setParam("brand", e.target.value)}
                className="rounded-lg border border-line-strong bg-surface px-3 py-1.5 text-sm text-foreground outline-none focus:border-gold"
              >
                <option value="all">All</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </label>
          ) : null}

          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setParam("stock", e.target.checked ? "1" : null)}
              className="h-4 w-4 accent-[var(--color-gold)]"
            />
            In stock only
          </label>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort</span>
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}
              className="rounded-lg border border-line-strong bg-surface px-3 py-1.5 text-sm text-foreground outline-none focus:border-gold"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>
      </div>

      {/* Grid */}
      {filtered.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line-strong py-20 text-center">
          <PackageOpen className="h-8 w-8 text-muted-2" />
          <p className="text-muted">No products match these filters.</p>
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="text-sm font-medium text-gold hover:text-gold-bright"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-gold bg-gold/10 text-gold"
          : "border-line-strong text-muted hover:border-gold/50 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
