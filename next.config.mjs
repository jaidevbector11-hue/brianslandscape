/** @type {import('next').NextConfig} */

// When STATIC_EXPORT=1 (used by the GitHub Pages workflow) we build a fully
// static site served from a subpath. Normal builds (local dev, Vercel) are
// unaffected and keep the API routes / image optimization / headers.
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  ...(isStatic
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          remotePatterns: [],
        },
        async headers() {
          return [
            {
              source: "/images/:path*",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
