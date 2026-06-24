import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";
import JsonLd from "@/components/JsonLd";
import { business, SITE_URL } from "@/lib/business";
import { homepageGraph } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // No title template — every page supplies its own complete, unique <title>.
  // This plain string is the default used by any page that doesn't set one.
  title: "Brian's Landscaping | Landscaper & Tree Service in Bethlehem, PA",
  description: business.description,
  applicationName: business.name,
  authors: [{ name: business.name }],
  generator: "Next.js",
  keywords: [
    "landscaper Bethlehem PA",
    "landscaping Bethlehem PA",
    "tree removal Bethlehem PA",
    "stump grinding Lehigh Valley",
    "lawn care Bethlehem PA",
    "mulching Bethlehem PA",
    "tree service Lehigh Valley",
  ],
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: business.name,
    title: "Brian's Landscaping | Landscaper & Tree Service in Bethlehem, PA",
    description: business.description,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Brian's Landscaping — Landscaper & Tree Service in Bethlehem, PA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian's Landscaping | Landscaper & Tree Service in Bethlehem, PA",
    description: business.description,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Landscaping",
};

export const viewport: Viewport = {
  themeColor: "#285325",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Site-wide structured data: LocalBusiness + WebSite */}
        <JsonLd data={homepageGraph()} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-forest-800 focus:shadow"
        >
          Skip to content
        </a>

        <Header />
        <main id="main" className="pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
