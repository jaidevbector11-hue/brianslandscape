/**
 * Prefix a public asset path with the configured base path.
 *
 * `next/link` and `next/image` apply `basePath` automatically, but plain
 * <img src="/..."> tags do not — so gallery images use this helper to stay
 * correct when the site is served from a subpath (e.g. GitHub Pages).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
