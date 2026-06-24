import Link from "next/link";
import { business } from "@/lib/business";

/**
 * Repeated conversion band: free-quote + book-estimate + click-to-call.
 * Dropped at the bottom of most pages for consistent CTAs everywhere.
 */
export default function CtaBanner({
  heading = "Ready for a free, honest estimate?",
  subheading = "Tell us about your project — we'll give you a fair price with no pressure. Serving Bethlehem & the Lehigh Valley.",
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="bg-forest-700">
      <div className="container-page py-12 text-center sm:py-16">
        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-forest-50/90">{subheading}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/quote" className="btn bg-white text-forest-800 hover:bg-forest-50">
            Get a Free Quote
          </Link>
          <Link href="/book" className="btn-accent">
            Book an Estimate
          </Link>
          <a
            href={business.phone.href}
            className="btn border-2 border-white/70 text-white hover:bg-white/10"
          >
            Call {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
