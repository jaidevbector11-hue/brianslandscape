import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/forms/BookingForm";
import JsonLd from "@/components/JsonLd";
import { business, businessHours } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Book an Estimate | Brian's Landscaping, Bethlehem PA",
  description:
    "Schedule a free on-site estimate with Brian's Landscaping in Bethlehem, PA. Pick a day and time that works for you and we'll confirm your appointment.",
  alternates: { canonical: "/book" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Book an Estimate", path: "/book" },
];

export default function BookPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Book an estimate"
        title="Schedule Your Free On-Site Estimate"
        intro="Pick a day and time window that works for you. We'll confirm your appointment by phone or text."
        crumbs={crumbs}
        showCtas={false}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="card p-6 sm:p-8">
            <BookingForm />
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest-900">Our hours</h2>
              <table className="mt-4 w-full text-sm">
                <tbody>
                  {businessHours.map((h) => (
                    <tr key={h.label} className="border-b border-earth-100 last:border-0">
                      <th scope="row" className="py-2 text-left font-medium text-earth-900">
                        {h.label}
                      </th>
                      <td className="py-2 text-right text-earth-700">{h.display}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 rounded-lg bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700">
                ⚡ {business.emergency}
              </p>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest-900">How booking works</h2>
              <ol className="mt-3 space-y-2 text-sm text-earth-800/90">
                <li>1. Request a date &amp; time window above.</li>
                <li>2. We call or text to confirm (or suggest a close alternative).</li>
                <li>3. We arrive on time and provide your free estimate.</li>
              </ol>
            </div>

            <div className="card bg-forest-700 p-6 text-center text-white">
              <p className="text-sm text-forest-50/90">Need a faster response?</p>
              <a href={business.phone.href} className="mt-2 block font-display text-2xl font-bold text-white hover:underline">
                {business.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
