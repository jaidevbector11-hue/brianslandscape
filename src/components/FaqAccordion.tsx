import type { Faq } from "@/lib/faqs";

/**
 * Accessible FAQ accordion using native <details>/<summary> (no JS needed).
 * Pair with faqSchema() for FAQPage structured data.
 */
export default function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-earth-200 overflow-hidden rounded-2xl border border-earth-200 bg-white">
      {items.map((f) => (
        <details key={f.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-forest-900 marker:hidden hover:bg-forest-50">
            <span>{f.question}</span>
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5 shrink-0 text-forest-600 transition-transform group-open:rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path d="M10 4v12M4 10h12" />
            </svg>
          </summary>
          <div className="px-5 pb-5 text-earth-800/90">
            <p className="leading-relaxed">{f.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
