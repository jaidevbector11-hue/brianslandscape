import Link from "next/link";
import { services } from "@/lib/services";
import ServiceIcon from "./ServiceIcon";

/** Grid of service cards, each linking to its dedicated SEO page. */
export default function ServicesGrid({ limit }: { limit?: number }) {
  const items = limit ? services.slice(0, limit) : services;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/${s.slug}`}
            className="card group flex h-full flex-col p-6 transition-shadow hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-100 text-forest-700 transition-colors group-hover:bg-forest-600 group-hover:text-white">
              <ServiceIcon name={s.icon} className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold text-forest-900">{s.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-earth-800/90">{s.teaser}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-700">
              Learn more
              <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="currentColor" aria-hidden>
                <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
