import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import RatingStars from "@/components/RatingStars";
import { business } from "@/lib/business";
import { breadcrumbSchema, reviewsSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Reviews | Brian's Landscaping, Bethlehem PA — 4.4★",
  description:
    "Read reviews for Brian's Landscaping in Bethlehem, PA. Rated 4.4 stars across 19 Google reviews for careful tree work, mulching, stump grinding & great communication.",
  alternates: { canonical: "/reviews" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Reviews", path: "/reviews" },
];

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={reviewsSchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Reviews"
        title="What Our Customers Say"
        intro="We're proud of the relationships we've built with homeowners across Bethlehem and the Lehigh Valley."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-md rounded-2xl border border-earth-200 bg-white p-8 text-center shadow-sm">
            <p className="font-display text-5xl font-bold text-forest-900">{business.rating.value}</p>
            <div className="mt-2 flex justify-center">
              <RatingStars size={24} />
            </div>
            <p className="mt-2 text-earth-700">
              Based on {business.rating.count} {business.rating.source} reviews
            </p>
            <a
              href={business.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block btn-outline"
            >
              Read & leave a review on Google
            </a>
          </div>

          <Testimonials />

          <p className="mt-12 text-center text-earth-700">
            Worked with us before? We'd love your feedback — and if you're new,{" "}
            <a href={business.phone.href} className="link-underline">
              call {business.phone.display}
            </a>{" "}
            to get started.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
