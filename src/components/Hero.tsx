import Link from "next/link";
import { business } from "@/lib/business";
import HillsBackdrop from "./HillsBackdrop";
import RatingStars from "./RatingStars";

const trustPoints = [
  "Free, honest estimates",
  "Careful, complete cleanup",
  "Fair, reasonable prices",
  "Clear communication",
];

/** Homepage hero with primary keyword H1, dual CTAs, click-to-call, rating. */
export default function Hero() {
  return (
    <section className="relative isolate text-white">
      <HillsBackdrop />
      <div className="container-page relative py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-forest-100">Bethlehem, PA · Lehigh Valley</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Landscaper &amp; Tree Service in Bethlehem, PA
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-forest-50/95">
            Quality landscaping, lawn care, mulching, tree removal, and stump grinding across the
            Lehigh Valley — at fair, honest prices. We're the dependable, family-run alternative to
            big companies with crazy prices.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/quote" className="btn bg-white text-forest-800 hover:bg-forest-50">
              Get a Free Quote
            </Link>
            <Link href="/book" className="btn-accent">
              Book an Estimate
            </Link>
            <a href={business.phone.href} className="btn border-2 border-white/70 text-white hover:bg-white/10">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.95.7 2.87a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.92.34 1.88.57 2.87.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              {business.phone.display}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-forest-50">
            <span className="inline-flex items-center gap-2">
              <RatingStars />
              <span className="font-semibold">{business.rating.value}</span>
              <span className="text-forest-100">· {business.rating.count} Google reviews</span>
            </span>
          </div>

          <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
            {trustPoints.map((t) => (
              <li key={t} className="flex items-center gap-2 text-forest-50">
                <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-forest-200" fill="currentColor" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
