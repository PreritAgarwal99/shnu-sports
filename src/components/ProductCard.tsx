import Link from "next/link";
import { Media } from "./Media";
import type { ProductCard as ProductCardType } from "@/sanity/types";
import { discountPercent, formatPrice } from "@/lib/site";

export function ProductCard({ product }: { product: ProductCardType }) {
  const off = discountPercent(product.mrp, product.price);
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group card overflow-hidden transition-all hover:border-gold/50 hover:shadow-lg hover:shadow-black/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <Media
          image={product.image}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {off ? (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-black">
            -{off}%
          </span>
        ) : null}
        {!product.inStock ? (
          <span className="absolute right-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium text-muted">
            Out of stock
          </span>
        ) : null}
      </div>
      <div className="p-4">
        {product.brand ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-2">{product.brand}</p>
        ) : null}
        <h3 className="mt-1 line-clamp-2 font-serif text-lg font-semibold leading-snug text-foreground group-hover:text-gold">
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gold">{formatPrice(product.price)}</span>
          {product.mrp && product.mrp > product.price ? (
            <span className="text-sm text-muted-2 line-through">{formatPrice(product.mrp)}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
