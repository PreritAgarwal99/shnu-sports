import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Tailwind v4 to process CSS through Turbopack (used by both `dev` and `build`).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Sanity's image CDN + our local sample SVG placeholders.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    // Our sample placeholders are trusted, first-party SVGs in /public.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
