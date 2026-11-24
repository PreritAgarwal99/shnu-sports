export const SITE = {
  name: "SHNU Sports",
  description:
    "Professional-grade cricket gear at affordable prices. Shop bats, balls, protective gear, gloves, apparel and kit bags — curated for serious players.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

/** Indian rupee formatting, e.g. 12499 -> ₹12,499 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(mrp?: number, price?: number): number | null {
  if (!mrp || !price || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

/** Builds a wa.me deep link with a prefilled message. */
export function whatsappLink(number: string | undefined, message: string): string {
  const digits = (number || "").replace(/\D/g, "");
  const text = encodeURIComponent(message);
  if (!digits) return `https://wa.me/?text=${text}`;
  return `https://wa.me/${digits}?text=${text}`;
}

export function telLink(phone: string | undefined): string {
  return `tel:${(phone || "").replace(/\s/g, "")}`;
}
