import Link from "next/link";
import { MessageCircle, Phone, Mail } from "lucide-react";
import type { Product, SiteSettings } from "@/sanity/types";
import { SITE, telLink, whatsappLink } from "@/lib/site";

export function EnquiryButtons({
  product,
  settings,
}: {
  product: Product;
  settings: SiteSettings;
}) {
  const url = `${SITE.url}/product/${product.slug}`;
  const message = `Hi SHNU Sports, I'm interested in the "${product.name}" (${url}). Could you share availability and details?`;
  const wa = whatsappLink(settings.whatsapp, message);

  return (
    <div className="flex flex-col gap-3">
      <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold w-full">
        <MessageCircle className="h-5 w-5" />
        Enquire on WhatsApp
      </a>
      <div className="grid grid-cols-2 gap-3">
        {settings.phone ? (
          <a href={telLink(settings.phone)} className="btn-outline">
            <Phone className="h-4 w-4" />
            Call
          </a>
        ) : null}
        <Link href={`/contact?product=${product.slug}`} className="btn-outline">
          <Mail className="h-4 w-4" />
          Enquire
        </Link>
      </div>
      <p className="text-xs text-muted-2">
        No online checkout — we confirm stock, size and the best price with you directly.
      </p>
    </div>
  );
}
