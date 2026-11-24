"use client";

import { useState } from "react";
import { Media } from "./Media";
import type { Img } from "@/sanity/image";

export function ProductGallery({ images }: { images: Img[] }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2">
        {main ? <Media image={main} priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i}
              className={`relative aspect-square overflow-hidden rounded-lg border bg-surface-2 transition-colors ${
                active === i ? "border-gold" : "border-line hover:border-line-strong"
              }`}
            >
              <Media image={img} sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
