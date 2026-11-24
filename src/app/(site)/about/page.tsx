import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, HandCoins, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PortableBody } from "@/components/PortableBody";
import { getSiteSettings } from "@/sanity/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "SHNU Sports is a specialist cricket store offering professional-grade gear at affordable prices — built by players, for players.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <header className="mb-12 max-w-3xl">
        <p className="eyebrow mb-3">Our story</p>
        <h1 className="text-4xl font-bold md:text-5xl">
          Built by players, <span className="gold-text">for players</span>.
        </h1>
      </header>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {settings.about?.length ? (
            <PortableBody value={settings.about} />
          ) : (
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                SHNU Sports started with a simple frustration: professional-grade cricket gear
                cost far more than it should. Between the brand name and the shop counter sat
                layers of markup — and the player paid for all of them.
              </p>
              <p>
                So we built a store that cuts those layers out. We hand-pick our willow, press
                and knock-in our bats ourselves, and price them honestly. The result is
                tournament-ready kit that serious club and academy players can actually afford.
              </p>
              <p>
                Today we specialise in cricket — bats, balls, protection, gloves, apparel and
                full kits — and we stock a growing range across other sports too. Whatever you
                play, we&apos;d rather earn your trust than your markup.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <Value icon={<HandCoins className="h-5 w-5" />} title="Honest pricing" text="Pro quality without the inflated price tag." />
          <Value icon={<Target className="h-5 w-5" />} title="Player-picked" text="Every bat chosen and prepped by people who play." />
          <Value icon={<ShieldCheck className="h-5 w-5" />} title="Quality-checked" text="Each piece inspected before it reaches you." />
        </aside>
      </div>

      <div className="mt-16 card flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Looking for something specific?</h2>
          <p className="mt-1 text-muted">Tell us what you need and we&apos;ll sort you out.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/contact" className="btn-gold">Contact us <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/cricket" className="btn-outline">Shop cricket</Link>
        </div>
      </div>
    </div>
  );
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="card p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-gold">
        {icon}
      </span>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </div>
  );
}
