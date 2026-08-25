import type { MetadataRoute } from "next";
import { artistsData } from "@/lib/artists";

const SITE_URL = "https://vevit.art";

// app/sitemap.ts — generuje /sitemap.xml. Nový přírůstek oproti legacy webu.
// Statické trasy + jeden záznam na umělce (/artist?nick=<nick>).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/list`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const artistRoutes: MetadataRoute.Sitemap = artistsData.map((a) => ({
    url: `${SITE_URL}/artist?nick=${encodeURIComponent(a.nick)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...artistRoutes];
}