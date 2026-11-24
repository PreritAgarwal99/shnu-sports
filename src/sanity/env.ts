export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * When no Sanity project is configured the whole app transparently falls back
 * to built-in sample content. This flag is how every data getter decides.
 */
export const hasSanity = Boolean(projectId);

export const readToken = process.env.SANITY_API_READ_TOKEN || "";
