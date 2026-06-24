import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import RatingStars from "@/components/RatingStars";
import { business, serviceArea } from "@/lib/business";
import { getFeaturedItems } from "@/lib/gallery";
import { homepageFaqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Brian's Landscaping | Landscaper & Tree Service in Bethlehem, PA",
  description:
    "Family-run landscaper & tree service in Bethlehem, PA. Lawn care, mulching, tree removal & stump grinding across the Lehigh Valley. Free estimates — call (610) 867-7414.",
  alternates: { canonical: "/" },
};

const whyUs = [
  {
    title: "Fair, honest prices",
    body: "Quality work without the crazy prices of the big companies. We give straight, honest estimates — and stick to them.",
  },
  {
    title: "Careful, complete cleanup",
    body: "Our customers mention it again and again: we treat your property with care and leave it cleaner than we found it.",
  },
  {
    title: "Clear communication",
    body: "From the first estimate to the finished job, you'll always know what's happening and when we'll be there.",
  },
  {
    title: "Local & family-run",
    body: "We're your neighbors in the Lehigh Valley — dependable, reachable, and invested in doing right by our community.",
  },
];

export default function HomePage() {
  const featured = getFeaturedItems();

  return (
    <>
      <JsonLd data={faqSchema(homepageFaqs)} />
      <Hero />

      {/* Services */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Landscaping & Tree Services in Bethlehem, PA"
            intro="From lawn care and fresh mulch to tree removal and stump grinding, we handle the work that keeps Lehigh Valley properties looking their best."
          />
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section bg-sand-100">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our work"
            title="Real Projects, Real Transformations"
            intro="Drag the sliders to see the before-and-after on recent Bethlehem-area projects."
          />
          <div className="mt-10">
            <Gallery items={featured} showFilters={false} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn-outline">
              View the full gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Why Brian's Landscaping</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-forest-900 sm:text-4xl">
              The dependable, local alternative to the big guys
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-earth-800/90">
              Brian's Landscaping is a local hidden gem — a hardworking, family-run crew that takes pride in
              quality work at fair prices. We're the honest alternative to big businesses with crazy prices.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <RatingStars />
              <span className="font-semibold text-forest-900">{business.rating.value}</span>
              <span className="text-earth-600">/ 5 · {business.rating.count} Google reviews</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                More about us
              </Link>
              <Link href="/reviews" className="btn-ghost">
                Read reviews →
              </Link>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((w) => (
              <li key={w.title} className="card p-5">
                <h3 className="font-display text-lg font-bold text-forest-900">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-earth-800/90">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="section bg-forest-900 text-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-forest-200">Reviews</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              What Lehigh Valley homeowners say
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 text-forest-100">
              <RatingStars /> {business.rating.value} stars · {business.rating.count} Google reviews
            </p>
          </div>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Service area"
            title="Proudly serving Bethlehem & the Lehigh Valley"
            intro={`We serve ${serviceArea.primary} and nearby towns including ${serviceArea.towns
              .slice(0, 5)
              .join(", ")}.`}
          />
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {[serviceArea.primary.replace(", PA", ""), ...serviceArea.towns].map((t) => (
              <li key={t} className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-700">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/service-area" className="link-underline">
              See our full service area →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-sand-100">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading as="h2" align="left" eyebrow="FAQ" title="Common questions" />
            <p className="mt-4 text-earth-800/90">
              Still have questions? Call or text us at{" "}
              <a href={business.phone.href} className="link-underline">
                {business.phone.display}
              </a>{" "}
              or visit our{" "}
              <Link href="/faq" className="link-underline">
                full FAQ
              </Link>
              .
            </p>
          </div>
          <FaqAccordion items={homepageFaqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
