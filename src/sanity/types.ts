import type { Img } from "./image";

export type { Img };

export type Spec = { label: string; value: string };

export type ProductCard = {
  _id: string;
  name: string;
  slug: string;
  sportSlug: string;
  categorySlug: string;
  categoryName?: string;
  brand?: string;
  price: number;
  mrp?: number;
  inStock: boolean;
  featured?: boolean;
  image: Img;
};

export type Product = ProductCard & {
  images: Img[];
  sportName: string;
  shortDescription?: string;
  highlights?: string[];
  specs?: Spec[];
  // Portable Text — only present when content comes from Sanity.
  richDescription?: unknown[];
  tags?: string[];
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  sportSlug: string;
  image?: Img;
  productCount?: number;
};

export type Sport = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: Img;
  featured?: boolean;
  categories?: Category[];
};

export type Banner = {
  _id: string;
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image: Img;
};

export type SiteSettings = {
  storeName: string;
  tagline?: string;
  logo?: Img;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  about?: unknown[];
  shippingNote?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    x?: string;
  };
};
