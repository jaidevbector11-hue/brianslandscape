/**
 * Renders a JSON-LD <script> tag for structured data.
 * Server component — the JSON is serialized at render time.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; we escape "<" to avoid breaking out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
