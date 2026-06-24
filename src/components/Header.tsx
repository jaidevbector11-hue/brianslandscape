"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import ServiceIcon from "./ServiceIcon";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-area", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Close menus on route change.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-earth-200/70 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Utility bar */}
      <div className="hidden bg-forest-800 text-white md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2">
            <span aria-hidden>★</span>
            <span>
              {business.rating.value} stars · {business.rating.count} Google reviews
            </span>
          </p>
          <p className="text-forest-100">
            Serving Bethlehem &amp; the Lehigh Valley · {business.emergency}
          </p>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${business.name} home`}>
          <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#285325" />
            <path
              d="M46 14C28 14 18 26 18 42c0 4 1 7 1 7s2-12 13-19c0 0-8 8-9 22 0 0 16 3 23-13 5-12 0-25 0-25z"
              fill="#69b35c"
            />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold text-forest-800 sm:text-xl">
              {business.name}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-earth-500">
              Bethlehem, PA · Tree Service
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-earth-900 hover:bg-forest-50 hover:text-forest-700"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onFocus={() => setServicesOpen(true)}
            >
              Services
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </Link>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-80 pt-2">
                <ul className="grid gap-1 rounded-2xl border border-earth-200 bg-white p-2 shadow-xl">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${s.slug}`}
                        className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-forest-50"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                          <ServiceIcon name={s.icon} className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-forest-800">
                            {s.name}
                          </span>
                          <span className="block text-xs text-earth-600">{s.primaryKeyword}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-semibold hover:bg-forest-50 hover:text-forest-700 ${
                pathname === l.href ? "text-forest-700" : "text-earth-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href={business.phone.href} className="btn-ghost text-sm" aria-label={`Call ${business.phone.display}`}>
            <PhoneGlyph />
            {business.phone.display}
          </a>
          <Link href="/quote" className="btn-primary">
            Get a Free Quote
          </Link>
          <Link href="/book" className="btn-accent">
            Book an Estimate
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a href={business.phone.href} className="btn-primary px-3 py-2" aria-label={`Call ${business.phone.display}`}>
            <PhoneGlyph />
            <span className="sr-only sm:not-sr-only">Call</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-earth-300 text-forest-800"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? <CloseGlyph /> : <MenuGlyph />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-earth-200 bg-white lg:hidden">
          <nav className="container-page grid gap-1 py-4" aria-label="Mobile">
            <Link href="/services" className="rounded-lg px-3 py-2.5 font-semibold text-forest-800 hover:bg-forest-50">
              All Services
            </Link>
            <div className="grid grid-cols-2 gap-1 pl-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="rounded-lg px-3 py-2 text-sm text-earth-800 hover:bg-forest-50"
                >
                  {s.shortName}
                </Link>
              ))}
            </div>
            {navLinks.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 font-semibold text-earth-900 hover:bg-forest-50"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link href="/quote" className="btn-primary">
                Get a Free Quote
              </Link>
              <Link href="/book" className="btn-accent">
                Book an Estimate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.95.7 2.87a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.92.34 1.88.57 2.87.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function MenuGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
