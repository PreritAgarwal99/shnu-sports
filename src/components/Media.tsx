import Image from "next/image";
import type { Img } from "@/sanity/image";

/**
 * Single image primitive for the whole app. Works for Sanity CDN images
 * (optimized + blur placeholder from lqip) and local sample SVGs (served
 * as-is). Always used inside a positioned, aspect-ratio container.
 */
export function Media({
  image,
  sizes = "100vw",
  className,
  priority = false,
}: {
  image: Img;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const isSvg = image.url.endsWith(".svg");
  return (
    <Image
      src={image.url}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={isSvg}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip}
      className={className}
    />
  );
}
