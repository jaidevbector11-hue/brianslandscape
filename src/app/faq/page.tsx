import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { business } from "@/lib/business";
import { faqs } from "@/lib/faqs";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ | Brian's Landscaping, Bethlehem PA",
  description:
    "Answers to common questions about tree removal cost, free estimates, service area, hours & booking with Brian's Landscaping in Bethlehem, PA & the Lehigh Valley.",
  alternates: { canonical: "/faq" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        intro="Everything you need to know about working with Brian's Landscaping. Don't see your question? Just give us a call."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container-page max-w-3xl">
          <FaqAccordion items={faqs} />

          <div className="mt-10 rounded-2xl border border-earth-200 bg-sand-100 p-6 text-center">
            <h2 className="font-display text-xl font-bold text-forest-900">Still have questions?</h2>
            <p className="mt-2 text-earth-800/90">
              We're happy to help. Call or text us, request a free quote, or book an on-site estimate.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={business.phone.href} className="btn-primary">
                Call {business.phone.display}
              </a>
              <Link href="/quote" className="btn-outline">
                Get a Free Quote
              </Link>
              <Link href="/book" className="btn-outline">
                Book an Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
