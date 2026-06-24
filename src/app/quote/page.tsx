import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/forms/QuoteForm";
import JsonLd from "@/components/JsonLd";
import RatingStars from "@/components/RatingStars";
import { business } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Get a Free Quote | Brian's Landscaping, Bethlehem PA",
  description:
    "Request a free, no-obligation landscaping or tree service quote in Bethlehem, PA. Tell us about your project and we'll get back to you with an honest estimate.",
  alternates: { canonical: "/quote" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Get a Free Quote", path: "/quote" },
];

const perks = [
  "100% free, no-obligation estimate",
  "Fair, honest pricing — no surprises",
  "Fast response from a local crew",
  "Serving Bethlehem & the Lehigh Valley",
];

export default function QuotePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Free quote"
        title="Request Your Free Quote"
        intro="Tell us a little about your project and we'll get back to you with a fair, honest estimate."
        crumbs={crumbs}
        showCtas={false}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="card p-6 sm:p-8">
            <QuoteForm />
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest-900">Why request a quote?</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-earth-800/90">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3">
                <RatingStars />
                <span className="font-semibold text-forest-900">
                  {business.rating.value} · {business.rating.count} reviews
                </span>
              </div>
              <p className="mt-3 text-sm text-earth-800/90">
                "Brian promptly gave me a very fair estimate and arrived to do the job when he said he
                would." — Andy A.
              </p>
            </div>

            <div className="card bg-forest-700 p-6 text-center text-white">
              <p className="text-sm text-forest-50/90">Prefer to talk it through?</p>
              <a href={business.phone.href} className="mt-2 block font-display text-2xl font-bold text-white hover:underline">
                {business.phone.display}
              </a>
              <p className="mt-1 text-xs text-forest-100">Mon–Fri 7–6 · Sat 8–4</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
