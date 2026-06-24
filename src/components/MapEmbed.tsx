import { business, fullAddress } from "@/lib/business";

/**
 * Google Maps embed. Uses the keyless `output=embed` URL by default (no API key
 * required). If NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY is set, the official Embed API
 * is used instead for a higher-quality map.
 */
export default function MapEmbed({
  query = `${business.name}, ${fullAddress}`,
  title = `Map to ${business.name} in ${business.address.city}, ${business.address.state}`,
  className = "",
}: {
  query?: string;
  title?: string;
  className?: string;
}) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const src = key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(query)}`
    : `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <iframe
      title={title}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`h-full w-full border-0 ${className}`}
      allowFullScreen
    />
  );
}
