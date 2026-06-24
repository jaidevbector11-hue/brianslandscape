/**
 * JSON-LD structured data generators. Output is rendered via <JsonLd /> in the
 * relevant pages so Google can read NAP, hours, ratings, services, breadcrumbs,
 * FAQs, and gallery images.
 */

import {
  business,
  fullAddress,
  openingHoursSpecification,
  serviceArea,
  SITE_URL,
} from "./business";
import { services, type Service } from "./services";
import { faqs, type Faq } from "./faqs";
import { galleryItems } from "./gallery";
import { reviews } from "./reviews";

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: business.address.street,
  addressLocality: business.address.city,
  addressRegion: business.address.state,
  postalCode: business.address.zip,
  addressCountry: business.address.country,
};

const areaServed = [
  serviceArea.primary,
  ...serviceArea.towns.map((t) => `${t}, PA`),
  `${serviceArea.region}, PA`,
].map((name) => ({ "@type": "Place", name }));

/**
 * LandscapingBusiness (a LocalBusiness subtype) — the central entity.
 * Includes NAP, geo, opening hours, service area, rating, and a service catalog.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LandscapingBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: SITE_URL,
    telephone: business.phone.e164,
    email: business.email,
    image: `${SITE_URL}/og-image.svg`,
    logo: `${SITE_URL}/icon.svg`,
    priceRange: business.priceRange,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: business.social.google,
    openingHoursSpecification: openingHoursSpecification(),
    areaServed,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [business.social.google, business.social.facebook, business.social.instagram].filter(
      Boolean
    ),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        url: `${SITE_URL}/${s.slug}`,
      },
    })),
  };
}

/** WebSite entity, linked to the business. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: business.name,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

/** Service schema for an individual service page. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: `${SITE_URL}/${service.slug}`,
    provider: {
      "@type": "LandscapingBusiness",
      "@id": BUSINESS_ID,
      name: business.name,
      telephone: business.phone.e164,
      address: postalAddress,
    },
    areaServed,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/quote`,
    },
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList for nested pages. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** FAQPage schema. Pass a subset or all FAQs. */
export function faqSchema(items: Faq[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** ImageObject collection for the gallery page (image SEO). */
export function gallerySchema() {
  const images = galleryItems.flatMap((item) => {
    const imgs = [item.after, item.before].filter(Boolean) as {
      src: string;
      alt: string;
      width: number;
      height: number;
    }[];
    return imgs.map((img) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${img.src}`,
      url: `${SITE_URL}${img.src}`,
      caption: img.alt,
      name: item.title,
      width: img.width,
      height: img.height,
      creator: { "@id": BUSINESS_ID },
      contentLocation: { "@type": "Place", name: item.location },
    }));
  });

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Brian's Landscaping — Project Gallery",
    url: `${SITE_URL}/gallery`,
    about: { "@id": BUSINESS_ID },
    image: images,
  };
}

/** Individual customer reviews tied to the business (Reviews page). */
export function reviewsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": BUSINESS_ID,
    name: business.name,
    image: `${SITE_URL}/og-image.svg`,
    telephone: business.phone.e164,
    address: postalAddress,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: { "@type": "Person", name: r.author },
      reviewBody: r.text,
    })),
  };
}

/** Convenience: combined graph for the homepage. */
export function homepageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [localBusinessSchema(), websiteSchema()],
  };
}
