import { Suspense } from "react";
import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/sanity/data";
import { telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SHNU Sports — WhatsApp, call, or send an enquiry about any product.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const wa = whatsappLink(settings.whatsapp, "Hi SHNU Sports, I have a question.");

  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <header className="mb-10 max-w-2xl">
        <p className="eyebrow mb-2">Get in touch</p>
        <h1 className="text-4xl font-bold md:text-5xl">We&apos;re here to help</h1>
        <p className="mt-3 text-muted">
          Questions on sizing, stock or the best price? Reach us on WhatsApp for the quickest
          reply, or send an enquiry below.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto">
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>

          <ul className="space-y-4">
            {settings.phone ? (
              <ContactRow icon={<Phone className="h-5 w-5" />} label="Phone">
                <a href={telLink(settings.phone)} className="hover:text-gold">{settings.phone}</a>
              </ContactRow>
            ) : null}
            {settings.email ? (
              <ContactRow icon={<Mail className="h-5 w-5" />} label="Email">
                <a href={`mailto:${settings.email}`} className="hover:text-gold">{settings.email}</a>
              </ContactRow>
            ) : null}
            {settings.address ? (
              <ContactRow icon={<MapPin className="h-5 w-5" />} label="Visit us">
                <span className="whitespace-pre-line">{settings.address}</span>
              </ContactRow>
            ) : null}
          </ul>

          {settings.shippingNote ? (
            <p className="rounded-[var(--radius-card)] border border-line bg-surface/50 p-4 text-sm text-muted">
              {settings.shippingNote}
            </p>
          ) : null}
        </div>

        <Suspense fallback={<div className="card p-6 text-muted">Loading form…</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-gold">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-2">{label}</p>
        <p className="mt-0.5 text-foreground">{children}</p>
      </div>
    </li>
  );
}
