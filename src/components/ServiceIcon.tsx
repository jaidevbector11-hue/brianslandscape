/** Inline outline icons for each service (no icon-font dependency). */

type Props = { name: string; className?: string };

const paths: Record<string, React.ReactNode> = {
  // Landscape design — drafting/compass feel
  design: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M12 3v4" />
    </>
  ),
  // Lawn care — leaf/grass
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </>
  ),
  // Mulching — layered beds
  mulch: (
    <>
      <path d="M3 14c3-1.5 5-1.5 9 0s6 1.5 9 0" />
      <path d="M3 18c3-1.5 5-1.5 9 0s6 1.5 9 0" />
      <path d="M12 10V4" />
      <path d="M9 6l3-3 3 3" />
    </>
  ),
  // Tree
  tree: (
    <>
      <path d="M12 22v-7" />
      <path d="M9 15a5 5 0 1 1 6 0" />
      <path d="M12 2a6 6 0 0 0-3 11.2" />
      <path d="M12 2a6 6 0 0 1 3 11.2" />
    </>
  ),
  // Tree trimming — shears
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88" />
      <path d="M14.47 14.48 20 20" />
      <path d="M8.12 8.12 12 12" />
    </>
  ),
  // Stump grinding — stump rings
  stump: (
    <>
      <ellipse cx="12" cy="8" rx="8" ry="3.5" />
      <ellipse cx="12" cy="8" rx="3.5" ry="1.4" />
      <path d="M4 8v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5V8" />
      <path d="M9 19l-2 3M15 19l2 3M12 20v2" />
    </>
  ),
  // Debris removal — truck/haul
  debris: (
    <>
      <path d="M3 17V7h12v10" />
      <path d="M15 10h4l2 3v4h-6" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  // Storm cleanup — cloud + bolt
  storm: (
    <>
      <path d="M16 13a5 5 0 1 0-9.5-2.5A4 4 0 0 0 7 18h7" />
      <path d="m13 14-2 4h3l-2 4" />
    </>
  ),
};

export default function ServiceIcon({ name, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.leaf}
    </svg>
  );
}
