import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${business.name} — ${business.tagline}`,
    short_name: business.name,
    description: business.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f1f7f0",
    theme_color: "#285325",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
