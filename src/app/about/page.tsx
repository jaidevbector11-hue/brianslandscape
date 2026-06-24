import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import RatingStars from "@/components/RatingStars";
import { business, serviceArea } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Brian's Landscaping | Bethlehem, PA",
  description:
    "Brian's Landscaping is a family-run landscaper & tree service in Bethlehem, PA — a local hidden gem known for quality work, fair prices, and careful cleanup.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Quality work", body: "We take pride in doing the job right — and our customers notice the difference." },
  { title: "Fair prices", body: "Honest, reasonable estimates without the markups of the big companies." },
  { title: "Careful cleanup", body: "We protect your property and leave it spotless when we're done." },
  { title: "Dependability", body: "We show up when we say we will and communicate every step of the way." },
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="About us"
        title="A Local Hidden Gem in Bethlehem, PA"
        intro="Brian's Landscaping is a hardworking, family-run crew that treats your property like our own."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="prose-body">
            <h2 className="font-display text-2xl font-bold text-forest-900">Our story</h2>
            <p>
              Brian's Landscaping started with a simple idea: give homeowners in Bethlehem and the
              Lehigh Valley quality landscaping and tree service at a fair, honest price. We're a
              local, family-run business — the dependable alternative to big companies with crazy
              prices.
            </p>
            <p>
              From landscape design and lawn care to mulching, tree removal, tree trimming, and stump
              grinding, we handle the work that keeps your property healthy and looking its best. We're
              proud to be a bit of a local hidden gem — the kind of crew neighbors recommend to
              neighbors.
            </p>
            <p>
              What sets us apart is how we work: careful, thorough, and communicative. We listen, give
              you a straight estimate, show up when we say we will, and clean up completely before we
              go. As our reviews show, that care is exactly what keeps customers calling us back.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-forest-900">What we stand for</h2>
            <ul className="not-prose mt-5 grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v.title} className="card p-5">
                  <h3 className="font-display text-lg font-bold text-forest-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-earth-800/90">{v.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <RatingStars />
                <span className="font-semibold text-forest-900">{business.rating.value} / 5</span>
              </div>
              <p className="mt-2 text-sm text-earth-700">
                Rated {business.rating.value} stars across {business.rating.count} Google reviews.
              </p>
              <Link href="/reviews" className="mt-3 inline-block link-underline">
                Read our reviews →
              </Link>
            </div>
            <div className="card p-6">
              <h3 className="font-display text-lg font-bold text-forest-900">Serving the Lehigh Valley</h3>
              <p className="mt-2 text-sm text-earth-800/90">
                Based in {business.address.city}, {business.address.state}, we serve {serviceArea.primary} and
                nearby towns like {serviceArea.towns.slice(0, 4).join(", ")}.
              </p>
              <Link href="/service-area" className="mt-3 inline-block link-underline">
                See our service area →
              </Link>
            </div>
            <div className="card bg-forest-700 p-6 text-white">
              <h3 className="font-display text-lg font-bold">Ready to get started?</h3>
              <p className="mt-2 text-sm text-forest-50/90">Free, honest estimates — no pressure.</p>
              <div className="mt-4 grid gap-2">
                <Link href="/quote" className="btn bg-white text-forest-800 hover:bg-forest-50">
                  Get a Free Quote
                </Link>
                <a href={business.phone.href} className="btn border-2 border-white/70 text-white hover:bg-white/10">
                  Call {business.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-forest-900 text-white">
        <div className="container-page">
          <h2 className="text-center font-display text-3xl font-bold text-white">In our customers' words</h2>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
