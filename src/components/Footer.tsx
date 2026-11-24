import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Sport, SiteSettings } from "@/sanity/types";
import { telLink } from "@/lib/site";

export function Footer({ sports, settings }: { sports: Sport[]; settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-serif text-2xl font-bold">
            <span className="gold-text">SHNU</span> Sports
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {settings.tagline ||
              "Professional cricket gear at honest prices. Built by players, for players."}
          </p>
          <div className="mt-5 flex gap-3">
            {settings.social?.instagram ? (
              <SocialLink href={settings.social.instagram} label="Instagram"><InstagramIcon /></SocialLink>
            ) : null}
            {settings.social?.facebook ? (
              <SocialLink href={settings.social.facebook} label="Facebook"><FacebookIcon /></SocialLink>
            ) : null}
            {settings.social?.youtube ? (
              <SocialLink href={settings.social.youtube} label="YouTube"><YoutubeIcon /></SocialLink>
            ) : null}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sports.map((s) => (
              <li key={s._id}>
                <Link href={`/${s.slug}`} className="text-muted transition-colors hover:text-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about" className="text-muted transition-colors hover:text-foreground">About us</Link></li>
            <li><Link href="/contact" className="text-muted transition-colors hover:text-foreground">Contact</Link></li>
            {settings.shippingNote ? (
              <li className="max-w-xs pt-1 text-xs leading-relaxed text-muted-2">{settings.shippingNote}</li>
            ) : null}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {settings.phone ? (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <a href={telLink(settings.phone)} className="hover:text-foreground">{settings.phone}</a>
              </li>
            ) : null}
            {settings.email ? (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <a href={`mailto:${settings.email}`} className="hover:text-foreground">{settings.email}</a>
              </li>
            ) : null}
            {settings.address ? (
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="hairline">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-2 sm:flex-row">
          <p>© {year} {settings.storeName}. All rights reserved.</p>
          <p>Crafted for cricket.</p>
        </div>
      </div>
    </footer>
  );
}

// Inline brand glyphs (lucide dropped brand icons in this version).
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M14 9h2.5V5.5H14c-2 0-3.5 1.5-3.5 3.6V11H8v3.5h2.5V22H14v-7.5h2.5L17 11h-3V9.3c0-.5.3-.8.9-.8H14V9z" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.7 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.3 12 31 31 0 0 0 22 8.2zM10 15V9l5 3-5 3z" />
    </svg>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
