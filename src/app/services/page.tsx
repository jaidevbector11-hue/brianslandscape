import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServicesGrid from "@/components/ServicesGrid";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Landscaping & Tree Services in Bethlehem, PA | Brian's",
  description:
    "Explore Brian's Landscaping services in Bethlehem, PA & the Lehigh Valley: landscape design, lawn care, mulching, tree removal, trimming & stump grinding. Free estimates.",
  alternates: { canonical: "/services" },
};

const steps = [
  { n: "1", title: "Get in touch", body: "Call, text, or request a free quote online. Tell us what you need." },
  { n: "2", title: "Free estimate", body: "We visit your property, talk it through, and give you a fair, honest price." },
  { n: "3", title: "We get to work", body: "Our crew shows up on time and does quality work, start to finish." },
  { n: "4", title: "Careful cleanup", body: "We haul away debris and leave your property cleaner than we found it." },
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Our services"
        title="Landscaping & Tree Services in Bethlehem, PA"
        intro="One dependable, family-run crew for all your landscaping and tree care — across Bethlehem and the Lehigh Valley."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container-page">
          <ServicesGrid />
        </div>
      </section>

      <section className="section bg-sand-100">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="Simple, honest, and hassle-free"
            intro="From your first call to the final cleanup, we keep it straightforward."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-600 font-display text-lg font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-forest-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-earth-800/90">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link href="/quote" className="btn-primary">
              Get your free quote
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
