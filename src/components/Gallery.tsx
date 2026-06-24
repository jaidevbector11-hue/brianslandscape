"use client";

import { useEffect, useMemo, useState } from "react";
import { galleryCategories, type GalleryItem } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import BeforeAfterSlider from "./BeforeAfterSlider";

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function Tile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <figure className="card group relative overflow-hidden p-0">
      <div className="relative">
        {item.before ? (
          <>
            <BeforeAfterSlider before={item.before} after={item.after} className="rounded-none" />
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onOpen}
              className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-forest-700 shadow hover:bg-white"
              aria-label={`Enlarge ${item.title}`}
            >
              <ExpandIcon /> Enlarge
            </button>
          </>
        ) : (
          <button type="button" onClick={onOpen} className="block w-full" aria-label={`Enlarge ${item.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(item.after.src)}
              alt={item.after.alt}
              width={item.after.width}
              height={item.after.height}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        )}
      </div>
      <figcaption className="p-4">
        <h3 className="font-display text-lg font-bold text-forest-900">{item.title}</h3>
        <p className="mt-1 text-sm text-earth-700">{item.location}</p>
        <p className="mt-2 text-sm leading-relaxed text-earth-800/90">{item.description}</p>
      </figcaption>
    </figure>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNav: (dir: -1 | 1) => void;
}) {
  const item = items[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNav]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — enlarged view`}
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {item.before ? (
            <BeforeAfterSlider before={item.before} after={item.after} priority className="rounded-none" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={asset(item.after.src)}
              alt={item.after.alt}
              width={item.after.width}
              height={item.after.height}
              className="aspect-[3/2] w-full object-cover"
            />
          )}
          <div className="flex items-start justify-between gap-4 p-5">
            <div>
              <h3 className="font-display text-xl font-bold text-forest-900">{item.title}</h3>
              <p className="mt-1 text-sm text-earth-700">{item.location}</p>
              <p className="mt-2 text-sm text-earth-800/90">{item.description}</p>
            </div>
            <span className="shrink-0 text-sm text-earth-500">
              {index + 1} / {items.length}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute -right-2 -top-12 grid h-10 w-10 place-items-center rounded-full bg-white text-forest-800 shadow hover:bg-forest-50 sm:-right-12 sm:top-0"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onNav(-1)}
          className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest-800 shadow hover:bg-white"
          aria-label="Previous project"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onNav(1)}
          className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest-800 shadow hover:bg-white"
          aria-label="Next project"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Gallery({
  items,
  showFilters = true,
}: {
  items: GalleryItem[];
  showFilters?: boolean;
}) {
  const [active, setActive] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [active, items]
  );

  // Only show category tabs that actually have items.
  const tabs = useMemo(
    () =>
      galleryCategories.filter(
        (c) => c.slug === "all" || items.some((i) => i.category === c.slug)
      ),
    [items]
  );

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter projects by service">
          {tabs.map((c) => {
            const isActive = active === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(c.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-forest-600 text-white"
                    : "bg-white text-forest-700 ring-1 ring-earth-200 hover:bg-forest-50"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-earth-600">No projects in this category yet — check back soon.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <li key={item.id}>
              <Tile item={item} onOpen={() => setLightboxIndex(i)} />
            </li>
          ))}
        </ul>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={(dir) =>
            setLightboxIndex((cur) => {
              if (cur === null) return cur;
              return (cur + dir + filtered.length) % filtered.length;
            })
          }
        />
      )}
    </div>
  );
}
