import { reviews } from "@/lib/reviews";
import RatingStars from "./RatingStars";

/** Customer testimonial cards. */
export default function Testimonials({ limit }: { limit?: number }) {
  const items = limit ? reviews.slice(0, limit) : reviews;
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((r) => (
        <li key={r.author} className="card flex h-full flex-col p-6">
          <RatingStars value={r.rating} />
          <blockquote className="mt-4 flex-1 text-earth-900/90">
            <p className="leading-relaxed">&ldquo;{r.text}&rdquo;</p>
          </blockquote>
          <footer className="mt-4 border-t border-earth-100 pt-4">
            <p className="font-semibold text-forest-800">— {r.author}</p>
            <p className="mt-1 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-medium text-forest-700"
                >
                  {t}
                </span>
              ))}
            </p>
          </footer>
        </li>
      ))}
    </ul>
  );
}
