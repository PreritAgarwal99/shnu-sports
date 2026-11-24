import { client } from "./client";

/**
 * Tagged, cached fetch. Pages render as static HTML served from the CDN; the
 * `tags` let the Sanity webhook (/api/revalidate) refresh exactly the affected
 * content the moment an admin hits "Publish" — ISR / on-demand revalidation.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, {
    next: { revalidate, tags },
  });
}
