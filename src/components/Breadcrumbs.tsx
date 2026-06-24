import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** Visual breadcrumb trail. Pair with breadcrumbSchema() for JSON-LD. */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-forest-100/80">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-white">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-white hover:underline">
                  {c.name}
                </Link>
              )}
              {!last && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
