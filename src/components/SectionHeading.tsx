/** Centered or left-aligned section heading with optional eyebrow + intro. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  as?: "h2" | "h3";
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <As className="mt-2 font-display text-3xl font-bold text-forest-900 sm:text-4xl">{title}</As>
      {intro && <p className="mt-4 text-lg leading-relaxed text-earth-800/90">{intro}</p>}
    </div>
  );
}
