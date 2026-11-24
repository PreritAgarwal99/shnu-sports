import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getNavSports, getSiteSettings } from "@/sanity/data";
import { SITE } from "@/lib/site";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sports, settings] = await Promise.all([getNavSports(), getSiteSettings()]);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportingGoodsStore",
    name: settings.storeName,
    url: SITE.url,
    description: SITE.description,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.address ? { address: settings.address } : {}),
    ...(settings.social
      ? { sameAs: Object.values(settings.social).filter(Boolean) }
      : {}),
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <JsonLd data={orgJsonLd} />
      <Header sports={sports} settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer sports={sports} settings={settings} />
    </div>
  );
}
