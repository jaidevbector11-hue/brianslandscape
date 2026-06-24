import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYouContent from "@/components/ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You | Brian's Landscaping",
  description: "Thanks for reaching out to Brian's Landscaping. We'll be in touch shortly.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="section">
      <Suspense fallback={<div className="container-page max-w-2xl text-center">Loading…</div>}>
        <ThankYouContent />
      </Suspense>
    </section>
  );
}
