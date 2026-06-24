import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Thank You | Brian's Landscaping",
  description: "Thanks for reaching out to Brian's Landscaping. We'll be in touch shortly.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

const messages: Record<string, { heading: string; body: string }> = {
  quote: {
    heading: "Your free quote request is in!",
    body: "Thanks for the details. We'll review your project and get back to you shortly with a fair, honest estimate.",
  },
  booking: {
    heading: "Your estimate request is in!",
    body: "Thanks for requesting an on-site estimate. We'll call or text to confirm your appointment date and time.",
  },
  contact: {
    heading: "Thanks for reaching out!",
    body: "We've received your message and will get back to you as soon as we can.",
  },
  default: {
    heading: "Thank you!",
    body: "We've received your request and will be in touch shortly.",
  },
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const msg = messages[searchParams.type ?? "default"] ?? messages.default;

  return (
    <section className="section">
      <div className="container-page max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-forest-900 sm:text-4xl">{msg.heading}</h1>
        <p className="mt-4 text-lg text-earth-800/90">{msg.body}</p>

        <div className="mt-6 rounded-2xl border border-earth-200 bg-white p-6 text-left">
          <h2 className="font-display text-lg font-bold text-forest-900">What happens next?</h2>
          <ol className="mt-3 space-y-2 text-earth-800/90">
            <li>1. We review your request (and any photos or details you shared).</li>
            <li>2. We reach out to confirm details and schedule a time that works for you.</li>
            <li>3. You get a free, honest estimate — with no pressure.</li>
          </ol>
          <p className="mt-4 text-sm text-earth-600">
            Need us sooner? Call or text{" "}
            <a href={business.phone.href} className="link-underline">
              {business.phone.display}
            </a>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/gallery" className="btn-outline">
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
