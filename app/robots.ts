import type { MetadataRoute } from "next";

const SITE_URL = "https://vevit.art";

// app/robots.ts — generuje /robots.txt. Nový přírůstek oproti legacy webu.
// API endpoint (/api/contact) se neindexuje; zbytek webu ano.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}