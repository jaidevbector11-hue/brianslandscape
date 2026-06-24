import Link from "next/link";
import { business } from "@/lib/business";
import { services } from "@/lib/services";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-forest-900">This page took a detour</h1>
        <p className="mt-4 text-lg text-earth-800/90">
          We couldn't find that page — but we can still help with your yard. Try one of these:
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/services" className="btn-outline">
            Services
          </Link>
          <Link href="/quote" className="btn-outline">
            Get a Free Quote
          </Link>
          <a href={business.phone.href} className="btn-ghost">
            Call {business.phone.display}
          </a>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-forest-900">Popular services</h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="rounded-full bg-forest-50 px-3.5 py-1.5 text-sm font-medium text-forest-700 hover:bg-forest-100"
                >
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
