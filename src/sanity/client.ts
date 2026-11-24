import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanity, projectId, readToken } from "./env";

/**
 * Shared read client. We use the CDN endpoint for fast, cached published
 * content and rely on tag-based revalidation (see `sanityFetch`) to refresh.
 *
 * When Sanity isn't configured yet, `client` is null and callers use sample
 * data instead.
 */
export const client = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Public datasets use the fast CDN; a token (for private datasets)
      // switches to authenticated API reads.
      useCdn: !readToken,
      perspective: "published",
      token: readToken || undefined,
    })
  : null;
