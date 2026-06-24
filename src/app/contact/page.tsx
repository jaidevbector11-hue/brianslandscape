import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import JsonLd from "@/components/JsonLd";
import { business, businessHours, fullAddress } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Brian's Landscaping | Bethlehem, PA",
  description:
    "Contact Brian's Landscaping in Bethlehem, PA. Call (610) 867-7414, email us, or send a message. Address, hours & map. Serving Bethlehem & the Lehigh Valley.",
  alternates: { canonical: "/contact" },
};

const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.name}, ${fullAddress}`
)}`;

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Contact"
        title="Get in Touch with Brian's Landscaping"
        intro="Call, text, email, or send us a message — we'd love to help with your project."
        crumbs={crumbs}
        showCtas={false}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          {/* Details */}
          <div>
            <h2 className="font-display text-2xl font-bold text-forest-900">Contact details</h2>
            <dl className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.95.7 2.87a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.92.34 1.88.57 2.87.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                </span>
                <div>
                  <dt className="text-sm font-semibold text-earth-600">Phone</dt>
                  <dd>
                    <a href={business.phone.href} className="font-display text-xl font-bold text-forest-800 hover:underline">
                      {business.phone.display}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path d="M4 4h16v16H4z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </span>
                <div>
                  <dt className="text-sm font-semibold text-earth-600">Email</dt>
                  <dd>
                    <a href={`mailto:${business.email}`} className="text-forest-800 hover:underline">
                      {business.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <dt className="text-sm font-semibold text-earth-600">Address</dt>
                  <dd className="not-italic text-earth-900">
                    <address className="not-italic">
                      {business.address.street}
                      <br />
                      {business.address.city}, {business.address.state} {business.address.zip}
                    </address>
                    <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm link-underline">
                      Get directions →
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div className="w-full">
                  <dt className="text-sm font-semibold text-earth-600">Hours</dt>
                  <dd>
                    <table className="mt-1 w-full max-w-xs text-sm">
                      <tbody>
                        {businessHours.map((h) => (
                          <tr key={h.label}>
                            <th scope="row" className="py-0.5 pr-4 text-left font-medium text-earth-900">
                              {h.label}
                            </th>
                            <td className="py-0.5 text-right text-earth-700">{h.display}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-2 text-xs font-semibold text-forest-700">⚡ {business.emergency}</p>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-earth-200 shadow-sm">
              <MapEmbed />
            </div>
          </div>

          {/* Form */}
          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-forest-900">Send us a message</h2>
            <p className="mt-2 text-earth-800/90">
              Fill out the form and we'll get back to you as soon as we can.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
