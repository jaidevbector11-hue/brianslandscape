import { business } from "@/lib/business";

/** Visual star rating. `value` defaults to the business's Google rating. */
export default function RatingStars({
  value = business.rating.value,
  className = "",
  size = 18,
}: {
  value?: number;
  className?: string;
  size?: number;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span
      className={`inline-flex items-center ${className}`}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      <span className="relative inline-block leading-none" style={{ fontSize: size }}>
        <span className="text-earth-300">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden text-amber-400"
          style={{ width: `${pct}%` }}
          aria-hidden
        >
          ★★★★★
        </span>
      </span>
    </span>
  );
}
