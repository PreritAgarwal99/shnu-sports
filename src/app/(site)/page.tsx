import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Headphones, BadgeIndianRupee } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Media } from "@/components/Media";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getBanners, getFeaturedProducts, getNavSports } from "@/sanity/data";

export default async function HomePage() {
  const [banners, featured, sports] = await Promise.all([
    getBanners(),
    getFeaturedProducts(4),
    getNavSports(),
  ]);

  const cricket = sports.find((s) => s.slug === "cricket");

  return (
    <>
      <Hero banners={banners} />

      {/* Trust strip */}
      <section className="border-b border-line bg-surface/40">
        <div className="container-page grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
          <Benefit icon={<BadgeIndianRupee className="h-5 w-5" />} title="Pro gear, fair prices" />
          <Benefit icon={<Truck className="h-5 w-5" />} title="Fast pan-India shipping" />
          <Benefit icon={<ShieldCheck className="h-5 w-5" />} title="Quality-checked kit" />
          <Benefit icon={<Headphones className="h-5 w-5" />} title="Expert player advice" />
        </div>
      </section>

      {/* Pro bats highlight */}
      <section className="container-page py-16 md:py-24">
        <div className="card relative overflow-hidden">
          <div className="absolute inset-0">
            <Media
              image={{ url: "/banners/hero-1.svg", alt: "Professional cricket bats", aspect: 16 / 9 }}
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          </div>
          <div className="relative grid gap-6 p-8 md:p-14 lg:max-w-2xl">
            <p className="eyebrow">The SHNU promise</p>
            <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
              Professional-grade bats at <span className="gold-text">affordable prices</span>.
            </h2>
            <p className="max-w-xl text-muted">
              We cut out the markup, not the quality. Every bat is hand-picked willow,
              pressed and knocked-in by people who actually play — so you get middle,
              not marketing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/cricket/bats" className="btn-gold">
                Shop cricket bats <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/cricket" className="btn-outline">Explore all cricket gear</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featured.length ? (
        <section className="container-page py-4 md:py-8">
          <SectionHeading
            eyebrow="Hand-picked"
            title="Featured gear"
            linkHref="/cricket"
            linkLabel="View all cricket"
          />
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Shop cricket by category */}
      {cricket?.categories?.length ? (
        <section className="container-page py-16 md:py-24">
          <SectionHeading eyebrow="Cricket" title="Shop by category" linkHref="/cricket" linkLabel="All categories" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-5">
            {cricket.categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/cricket/${cat.slug}`}
                className="group card overflow-hidden text-center transition-colors hover:border-gold/50"
              >
                <div className="relative aspect-square overflow-hidden bg-surface-2">
                  {cat.image ? (
                    <Media
                      image={cat.image}
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <p className="px-2 py-3 text-sm font-medium group-hover:text-gold">{cat.name}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Shop by sport */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeading eyebrow="More to play" title="Shop by sport" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map((sport) => (
            <Link
              key={sport._id}
              href={`/${sport.slug}`}
              className="group relative overflow-hidden rounded-[var(--radius-card)] border border-line"
            >
              <div className="relative aspect-[16/10] bg-surface-2">
                {sport.image ? (
                  <Media
                    image={sport.image}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                <div>
                  <h3 className="font-serif text-2xl font-bold">{sport.name}</h3>
                  {sport.description ? (
                    <p className="mt-1 max-w-xs text-sm text-muted">{sport.description}</p>
                  ) : null}
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Benefit({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-gold">
        {icon}
      </span>
      <span className="text-sm font-medium leading-tight">{title}</span>
    </div>
  );
}
