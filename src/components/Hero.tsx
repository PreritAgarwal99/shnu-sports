"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Media } from "./Media";
import type { Banner } from "@/sanity/types";

export function Hero({ banners }: { banners: Banner[] }) {
  const autoplay = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
    [],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sync via embla's own events (avoids a synchronous setState in the effect body).
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!banners.length) return null;

  return (
    <section className="relative" aria-roledescription="carousel" aria-label="Featured">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, i) => (
            <div
              key={banner._id}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${banners.length}`}
            >
              <div className="relative h-[calc(100svh-4rem)] min-h-[460px] w-full overflow-hidden md:h-[calc(100svh-4.5rem)]">
                <div className="absolute inset-0 animate-kenburns">
                  <Media
                    image={banner.image}
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                {/* Legibility overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

                <div className="container-page relative flex h-full flex-col justify-center">
                  <div className="max-w-2xl">
                    <p className="eyebrow mb-4">Specialist Cricket Store</p>
                    <h1 className="font-serif text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                      {banner.heading}
                    </h1>
                    {banner.subheading ? (
                      <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
                        {banner.subheading}
                      </p>
                    ) : null}
                    {banner.ctaHref && banner.ctaLabel ? (
                      <Link href={banner.ctaHref} className="btn-gold mt-8">
                        {banner.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ink/40 backdrop-blur transition-colors hover:border-gold hover:text-gold md:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ink/40 backdrop-blur transition-colors hover:border-gold hover:text-gold md:inline-flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2.5">
        {banners.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={selected === i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              selected === i ? "w-8 bg-gold" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
