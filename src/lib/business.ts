/**
 * Single source of truth for Brian's Landscaping business information.
 * Keep Name / Address / Phone (NAP) identical everywhere it is rendered to
 * stay consistent with the Google Business Profile (critical for local SEO).
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.brianslandscapingbethlehem.com";

export const business = {
  name: "Brian's Landscaping",
  legalName: "Brian's Landscaping",
  tagline: "Landscaper & Tree Service in Bethlehem, PA",
  description:
    "Family-run landscaper and tree service in Bethlehem, PA. Landscape design, lawn care, mulching, tree removal, tree trimming, and stump grinding across the Lehigh Valley — quality work at fair, honest prices.",
  // --- NAP (Name, Address, Phone) -----------------------------------------
  address: {
    street: "1463 Kelchner Rd",
    city: "Bethlehem",
    state: "PA",
    stateName: "Pennsylvania",
    zip: "18018",
    country: "US",
  },
  // Approximate coordinates for 1463 Kelchner Rd, Bethlehem, PA 18018.
  // Verify/replace with the exact pin from the Google Business Profile.
  geo: {
    latitude: 40.6584,
    longitude: -75.4413,
  },
  phone: {
    display: "(610) 867-7414",
    // E.164 for tel: links and schema
    e164: "+16108677414",
    href: "tel:+16108677414",
  },
  email: "brian@brianslandscapingbethlehem.com",
  priceRange: "$$",
  founded: "Locally owned & operated",
  rating: {
    value: 4.4,
    count: 19,
    source: "Google",
  },
  emergency: "Emergency storm cleanup available",
  social: {
    google:
      "https://www.google.com/maps/search/?api=1&query=Brian%27s+Landscaping+Bethlehem+PA",
    facebook: "",
    instagram: "",
  },
} as const;

/** Structured hours — drives the footer/contact display AND the JSON-LD. */
export type DayHours = {
  /** Schema.org day abbreviations used in openingHoursSpecification. */
  days: string[];
  /** Human-friendly label. */
  label: string;
  /** 24h open time "HH:MM" or null when closed. */
  opens: string | null;
  /** 24h close time "HH:MM" or null when closed. */
  closes: string | null;
  /** Display string e.g. "7:00 AM – 6:00 PM" or "Closed". */
  display: string;
};

// NOTE: Placeholder hours — replace with Brian's actual hours when confirmed.
export const businessHours: DayHours[] = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    label: "Monday – Friday",
    opens: "07:00",
    closes: "18:00",
    display: "7:00 AM – 6:00 PM",
  },
  {
    days: ["Saturday"],
    label: "Saturday",
    opens: "08:00",
    closes: "16:00",
    display: "8:00 AM – 4:00 PM",
  },
  {
    days: ["Sunday"],
    label: "Sunday",
    opens: null,
    closes: null,
    display: "Closed",
  },
];

/** Schema.org day → 2-letter code for openingHoursSpecification. */
const dayCode: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

/** Build openingHoursSpecification entries for LocalBusiness JSON-LD. */
export function openingHoursSpecification() {
  return businessHours
    .filter((h) => h.opens && h.closes)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => dayCode[d]),
      opens: h.opens,
      closes: h.closes,
    }));
}

/** Cities / towns served — used for the service-area page and areaServed schema. */
export const serviceArea = {
  primary: "Bethlehem, PA",
  neighborhoods: [
    "West Bethlehem",
    "Center City Bethlehem",
    "South Side Bethlehem",
    "North Bethlehem",
    "Historic Bethlehem",
    "Hanover Township",
  ],
  towns: [
    "Allentown",
    "Easton",
    "Nazareth",
    "Whitehall",
    "Emmaus",
    "Bath",
    "Northampton",
    "Catasauqua",
    "Hellertown",
    "Coopersburg",
  ],
  region: "Lehigh Valley",
};

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`;
