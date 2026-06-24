import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import MapEmbed from "@/components/MapEmbed";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { business, serviceArea } from "@/lib/business";
import { services } from "@/lib/services";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Area | Landscaper in Bethlehem & the Lehigh Valley",
  description:
    "Brian's Landscaping serves Bethlehem, PA and the Lehigh Valley — Allentown, Easton, Nazareth, Whitehall, Emmaus & nearby towns. Landscaping & tree service near you.",
  alternates: { canonical: "/service-area" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Service Area", path: "/service-area" },
];

export default function ServiceAreaPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Service area"
        title="Landscaping & Tree Service Across the Lehigh Valley"
        intro="Proudly based in Bethlehem, PA and serving homeowners throughout the surrounding Lehigh Valley communities."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-forest-900">
              Bethlehem neighborhoods we serve
            </h2>
            <p className="mt-3 text-earth-800/90">
              From {business.address.street.includes("Kelchner") ? "West Bethlehem" : "across town"} to the
              South Side, we help homeowners all over Bethlehem keep their properties looking great.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {serviceArea.neighborhoods.map((n) => (
                <li key={n} className="rounded-full bg-forest-50 px-3.5 py-1.5 text-sm font-medium text-forest-700">
                  {n}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-bold text-forest-900">
              Lehigh Valley towns we cover
            </h2>
            <p className="mt-3 text-earth-800/90">
              Looking for landscaping or tree service near you? We serve {serviceArea.primary} and these nearby
              communities:
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {serviceArea.towns.map((t) => (
                <li key={t} className="flex items-center gap-2 text-earth-900">
                  <span className="text-forest-600" aria-hidden>
                    ✓
                  </span>
                  {t}, PA
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-earth-600">
              Not sure if you're in our area?{" "}
              <a href={business.phone.href} className="link-underline">
                Call {business.phone.display}
              </a>{" "}
              and we'll let you know.
            </p>
          </div>

          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-earth-200 shadow-sm">
              <MapEmbed />
            </div>
            <div className="card mt-6 p-6">
              <h3 className="font-display text-lg font-bold text-forest-900">Services in your area</h3>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="link-underline">
                      {s.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner heading="Landscaping or tree service near you?" />
    </>
  );
}
