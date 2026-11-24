import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { TAGS } from "@/sanity/data";

export const runtime = "nodejs";

/**
 * Sanity webhook target. Configure a webhook in sanity.io/manage that POSTs
 * here on publish, with a secret matching SANITY_REVALIDATE_SECRET.
 *
 * It revalidates the cache tag for the changed document type so the live site
 * updates within seconds — this is the "dynamic, no server cost" mechanism.
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const provided =
    req.headers.get("x-revalidate-secret") ||
    new URL(req.url).searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let type: string | undefined;
  try {
    const body = (await req.json()) as { _type?: string };
    type = body?._type;
  } catch {
    // No/invalid body — fall through to revalidating everything.
  }

  // Map the changed Sanity document type to the tags it affects. References are
  // embedded in product/nav projections, so related tags are refreshed too.
  const TYPE_TO_TAGS: Record<string, string[]> = {
    siteSettings: [TAGS.settings],
    banner: [TAGS.banner],
    sport: [TAGS.sport, TAGS.category, TAGS.product],
    category: [TAGS.category, TAGS.product],
    brand: [TAGS.product],
    product: [TAGS.product],
  };

  const tagsToRefresh = (type && TYPE_TO_TAGS[type]) || Object.values(TAGS);
  // Next 16: second arg expires the tagged cache entries immediately.
  for (const t of tagsToRefresh) revalidateTag(t, { expire: 0 });

  return NextResponse.json({ ok: true, revalidated: tagsToRefresh, now: Date.now() });
}
