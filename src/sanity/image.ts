import imageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;

// Derive the accepted image-source type from the builder itself (avoids a
// version-specific type import path).
type ImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

/** Build a sized Sanity CDN URL. Returns "" if Sanity isn't configured. */
export function urlForImage(source: ImageSource, width = 1200) {
  if (!builder) return "";
  return builder.image(source).width(width).auto("format").fit("max").url();
}

/**
 * Our normalised image shape (what every data getter returns), so components
 * never care whether the image came from Sanity or from sample content.
 */
export type Img = {
  url: string;
  alt: string;
  lqip?: string;
  aspect?: number;
};
