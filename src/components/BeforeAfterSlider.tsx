"use client";

import { useCallback, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

/**
 * Draggable before/after comparison slider. Accessible via keyboard
 * (focus the handle, use arrow keys) and pointer (drag anywhere).
 */
export default function BeforeAfterSlider({
  before,
  after,
  priority = false,
  className = "",
}: {
  before: GalleryImage;
  after: GalleryImage;
  priority?: boolean;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      className={`relative aspect-[3/2] w-full select-none overflow-hidden rounded-xl bg-earth-100 ${className}`}
      onPointerDown={(e) => {
        setDragging(true);
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      {/* After image (base layer) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(after.src)}
        alt={after.alt}
        width={after.width}
        height={after.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Before image, clipped to the left of the divider */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(before.src)}
        alt={before.alt}
        width={before.width}
        height={before.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Corner labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-forest-700/85 px-2.5 py-1 text-xs font-semibold text-white">
        After
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 w-1 -translate-x-1/2 bg-white/90 shadow"
        style={{ left: `${pos}%` }}
        aria-hidden
      />
      <button
        type="button"
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-forest-600 bg-white text-forest-700 shadow-lg"
        style={{ left: `${pos}%` }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          if (e.key === "Home") setPos(0);
          if (e.key === "End") setPos(100);
        }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
        </svg>
      </button>
    </div>
  );
}
