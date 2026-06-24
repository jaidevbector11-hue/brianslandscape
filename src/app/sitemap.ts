import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { serviceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/quote", priority: 0.9, freq: "monthly" },
    { path: "/book", priority: 0.9, freq: "monthly" },
    { path: "/gallery", priority: 0.8, freq: "weekly" },
    { path: "/service-area", priority: 0.8, freq: "monthly" },
    { path: "/reviews", priority: 0.7, freq: "monthly" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "yearly" },
    // One entry per dedicated, location-keyworded service page.
    ...serviceSlugs.map((slug) => ({ path: `/${slug}`, priority: 0.8, freq: "monthly" as const })),
  ];

  return entries.map((e) => ({
    url: `${SITE_URL}${e.path}`,
    lastModified: now,
    changeFrequency: e.freq,
    priority: e.priority,
  }));
}
