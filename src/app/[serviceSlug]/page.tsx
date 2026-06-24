import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ServiceIcon from "@/components/ServiceIcon";
import Gallery from "@/components/Gallery";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { business, serviceArea } from "@/lib/business";
import { getService, serviceSlugs, services } from "@/lib/services";
import { itemsByCategory } from "@/lib/gallery";
import { faqs } from "@/lib/faqs";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((serviceSlug) => ({ serviceSlug }));
}

export function generateMetadata({ params }: { params: { serviceSlug: string } }): Metadata {
  const service = getService(params.serviceSlug);
  if (!service) return {};
  const url = `/${service.slug}`;
  return {
    title: service.seoTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: service.seoTitle,
      description: service.metaDescription,
    },
  };
}

export default function ServicePage({ params }: { params: { serviceSlug: string } }) {
  const service = getService(params.serviceSlug);
  if (!service) notFound();

  const galleryItems = itemsByCategory(service.galleryCategory);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  // Pull the two most relevant FAQs (free estimates + service area) for this page.
  const pageFaqs = faqs.filter((f) =>
    /free estimate|areas do you serve|clean up|hours/i.test(f.question)
  );

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(pageFaqs)} />

      <PageHero eyebrow="Service" title={service.h1} intro={service.heroBlurb} crumbs={crumbs} />

      {/* Overview + sidebar */}
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>
              <p className="eyebrow">{service.primaryKeyword}</p>
            </div>
            <div className="prose-body mt-5">
              {service.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold text-forest-900">What's included</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f.title} className="card p-5">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-forest-900">
                    <svg viewBox="0 0 20 20" className="h-5 w-5 text-forest-600" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.1 3.1 6.8-6.8a1 1 0 0 1 1.4 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-earth-800/90">{f.description}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-earth-200 bg-sand-100 p-6">
              <h2 className="font-display text-xl font-bold text-forest-900">Pricing & estimates</h2>
              <p className="mt-2 text-earth-800/90">{service.priceNote}</p>
            </div>
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-forest-900">
                Get a free {service.shortName.toLowerCase()} estimate
              </h2>
              <p className="mt-2 text-sm text-earth-800/90">
                Fast, friendly, and no pressure. Serving {serviceArea.primary} & the {serviceArea.region}.
              </p>
              <div className="mt-5 grid gap-3">
                <Link href="/quote" className="btn-primary w-full">
                  Get a Free Quote
                </Link>
                <Link href="/book" className="btn-accent w-full">
                  Book an Estimate
                </Link>
                <a href={business.phone.href} className="btn-outline w-full">
                  Call {business.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related project photos */}
      {galleryItems.length > 0 && (
        <section className="section bg-sand-100">
          <div className="container-page">
            <h2 className="text-center font-display text-3xl font-bold text-forest-900">
              Recent {service.shortName} Projects
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-earth-800/90">
              A look at our work around Bethlehem and the Lehigh Valley.
            </p>
            <div className="mt-10">
              <Gallery items={galleryItems} showFilters={false} />
            </div>
            <div className="mt-8 text-center">
              <Link href="/gallery" className="link-underline">
                View the full gallery →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="section">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-forest-900">Related services</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="card group flex h-full flex-col p-5 hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-forest-900">{s.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-earth-800/90">{s.teaser}</p>
                  <span className="mt-3 text-sm font-semibold text-forest-700">Learn more →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      {pageFaqs.length > 0 && (
        <section className="section bg-sand-100">
          <div className="container-page max-w-3xl">
            <h2 className="text-center font-display text-3xl font-bold text-forest-900">
              {service.shortName} FAQs
            </h2>
            <div className="mt-8">
              <FaqAccordion items={pageFaqs} />
            </div>
            <p className="mt-6 text-center text-earth-700">
              See all{" "}
              <Link href="/faq" className="link-underline">
                frequently asked questions
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <CtaBanner heading={`Ready for your free ${service.shortName.toLowerCase()} estimate?`} />
    </>
  );
}
