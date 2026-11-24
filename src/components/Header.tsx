"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import type { Sport, SiteSettings } from "@/sanity/types";
import { telLink } from "@/lib/site";

export function Header({
  sports,
  settings,
}: {
  sports: Sport[];
  settings: SiteSettings;
}) {
  const [open, setOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // On the home page, the logo smoothly returns to the hero; elsewhere it
  // navigates home.
  const onLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  };

  const onSportsPicked = () => {
    setSportsOpen(false);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-18">
        {/* Logo */}
        <Link href="/" onClick={onLogoClick} className="flex items-center gap-2" aria-label={`${settings.storeName} — home`}>
          <span className="font-serif text-2xl font-bold tracking-tight">
            <span className="gold-text">SHNU</span>{" "}
            <span className="text-foreground">Sports</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLink href="/" label="Home" active={pathname === "/"} onClick={onLogoClick} />

          {/* Single Sports dropdown */}
          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-gold group-focus-within:text-gold ${
                sports.some((s) => pathname.startsWith(`/${s.slug}`)) ? "text-gold" : "text-foreground"
              }`}
            >
              Sports
              <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-1 pt-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="card overflow-hidden p-1.5 shadow-xl shadow-black/40">
                {sports.map((sport) => (
                  <Link
                    key={sport._id}
                    href={`/${sport.slug}`}
                    onClick={onSportsPicked}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    <span>{sport.name}</span>
                    {sport.categories?.length ? (
                      <span className="text-xs text-muted-2">{sport.categories.length}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink href="/about" label="About" active={pathname === "/about"} />
          <NavLink href="/contact" label="Contact" active={pathname === "/contact"} />
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {settings.phone ? (
            <a
              href={telLink(settings.phone)}
              className="hidden items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold md:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {settings.phone}
            </a>
          ) : null}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="border-t border-line bg-ink lg:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile">
            <Link href="/" onClick={onLogoClick} className="py-3 text-base font-medium">
              Home
            </Link>

            <div className="border-t border-line/60 py-1">
              <button
                type="button"
                onClick={() => setSportsOpen((v) => !v)}
                className="flex w-full items-center justify-between py-2 text-base font-medium"
                aria-expanded={sportsOpen}
              >
                Sports
                <ChevronDown className={`h-4 w-4 transition-transform ${sportsOpen ? "rotate-180" : ""}`} />
              </button>
              {sportsOpen ? (
                <div className="flex flex-col pb-2 pl-3">
                  {sports.map((sport) => (
                    <Link
                      key={sport._id}
                      href={`/${sport.slug}`}
                      onClick={onSportsPicked}
                      className="flex items-center justify-between py-2 text-sm text-muted"
                    >
                      <span>{sport.name}</span>
                      {sport.categories?.length ? (
                        <span className="text-xs text-muted-2">{sport.categories.length} categories</span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link href="/about" onClick={() => setOpen(false)} className="border-t border-line/60 py-3 text-base font-medium">
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="border-t border-line/60 py-3 text-base font-medium">
              Contact
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-gold ${
        active ? "text-gold" : "text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}
