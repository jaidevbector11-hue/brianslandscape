import Link from "next/link";
import { business } from "@/lib/business";
import type { Crumb } from "@/lib/schema";
import Breadcrumbs from "./Breadcrumbs";
import HillsBackdrop from "./HillsBackdrop";

/** Compact hero/header for inner pages. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  showCtas = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  showCtas?: boolean;
}) {
  return (
    <section className="relative isolate text-white">
      <HillsBackdrop />
      <div className="container-page relative py-12 sm:py-16">
        {crumbs && crumbs.length > 0 && (
          <div className="mb-5">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        )}
        {eyebrow && <p className="eyebrow text-forest-100">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-forest-50/95">{intro}</p>}
        {showCtas && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/quote" className="btn bg-white text-forest-800 hover:bg-forest-50">
              Get a Free Quote
            </Link>
            <Link href="/book" className="btn-accent">
              Book an Estimate
            </Link>
            <a href={business.phone.href} className="btn border-2 border-white/70 text-white hover:bg-white/10">
              {business.phone.display}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
