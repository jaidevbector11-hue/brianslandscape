import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep API routes and the post-submit thank-you page out of the index.
        disallow: ["/api/", "/thank-you"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
