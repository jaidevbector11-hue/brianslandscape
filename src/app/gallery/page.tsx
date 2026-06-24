import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { galleryItems } from "@/lib/gallery";
import { breadcrumbSchema, gallerySchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Project Gallery | Brian's Landscaping, Bethlehem PA",
  description:
    "Before & after photos of landscaping and tree service projects in Bethlehem, PA — tree removal, stump grinding, mulching, landscape design & cleanups. See our work.",
  alternates: { canonical: "/gallery" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={gallerySchema()} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Our work"
        title="Project Gallery: Before & After"
        intro="See the difference careful, quality work makes. Filter by service and drag the sliders to compare before and after."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container-page">
          <Gallery items={galleryItems} />
          <p className="mt-12 text-center text-sm text-earth-600">
            These are sample projects with placeholder photos.{" "}
            <Link href="/quote" className="link-underline">
              Request a free quote
            </Link>{" "}
            to add yours to the list.
          </p>
        </div>
      </section>

      <CtaBanner heading="Like what you see? Let's transform your yard." />
    </>
  );
}
