import Link from "next/link";
import { business, businessHours, fullAddress, serviceArea } from "@/lib/business";
import { services } from "@/lib/services";

const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.name}, ${fullAddress}`
)}`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 bg-forest-900 text-forest-50">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* NAP */}
        <div>
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
              <rect width="64" height="64" rx="14" fill="#42833a" />
              <path
                d="M46 14C28 14 18 26 18 42c0 4 1 7 1 7s2-12 13-19c0 0-8 8-9 22 0 0 16 3 23-13 5-12 0-25 0-25z"
                fill="#bcd9b6"
              />
            </svg>
            <span className="font-display text-xl font-bold text-white">{business.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-forest-100">{business.description}</p>
          <address className="mt-4 space-y-1 text-sm not-italic text-forest-100">
            <p className="font-semibold text-white">{business.name}</p>
            <p>{business.address.street}</p>
            <p>
              {business.address.city}, {business.address.state} {business.address.zip}
            </p>
            <p>
              <a className="hover:text-white hover:underline" href={business.phone.href}>
                {business.phone.display}
              </a>
            </p>
            <p>
              <a className="hover:text-white hover:underline" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </p>
          </address>
          <a
            href={mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-forest-200 underline underline-offset-4 hover:text-white"
          >
            Get directions →
          </a>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-forest-200">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-forest-100 hover:text-white hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links + hours */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-forest-200">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/about", "About Us"],
              ["/gallery", "Our Work"],
              ["/reviews", "Reviews"],
              ["/service-area", "Service Area"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
              ["/quote", "Get a Free Quote"],
              ["/book", "Book an Estimate"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-forest-100 hover:text-white hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours + service area */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-forest-200">Hours</h2>
          <table className="mt-4 w-full text-sm text-forest-100">
            <tbody>
              {businessHours.map((h) => (
                <tr key={h.label}>
                  <th scope="row" className="py-0.5 pr-3 text-left font-medium text-forest-50">
                    {h.label}
                  </th>
                  <td className="py-0.5 text-right tabular-nums">{h.display}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 rounded-lg bg-forest-800 px-3 py-2 text-xs font-semibold text-forest-100">
            ⚡ {business.emergency}
          </p>

          <h2 className="mt-6 text-sm font-semibold uppercase tracking-widest text-forest-200">
            Service Area
          </h2>
          <p className="mt-3 text-sm text-forest-100">
            {serviceArea.primary} &amp; the {serviceArea.region}: {serviceArea.towns.slice(0, 5).join(", ")} and more.
          </p>
        </div>
      </div>

      <div className="border-t border-forest-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-forest-200 sm:flex-row">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>Licensed &amp; insured · Family owned</span>
            <span aria-hidden>·</span>
            <span>{fullAddress}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
