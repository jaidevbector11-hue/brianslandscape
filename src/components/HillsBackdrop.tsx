/** Decorative layered hills + sky used behind hero sections (no image weight). */
export default function HillsBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-forest-800 via-forest-700 to-forest-600" />
      {/* sun glow */}
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      <svg
        className="absolute bottom-0 left-0 h-48 w-full sm:h-64"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#234221"
          fillOpacity="0.6"
          d="M0,224 C240,160 480,256 720,224 C960,192 1200,128 1440,192 L1440,320 L0,320 Z"
        />
        <path
          fill="#1e371d"
          fillOpacity="0.8"
          d="M0,272 C240,224 480,304 720,272 C960,240 1200,288 1440,256 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  );
}
