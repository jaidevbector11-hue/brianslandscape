import Link from "next/link";
import { business } from "@/lib/business";

/** Fixed bottom action bar on mobile — always-visible call + quote CTAs. */
export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-earth-200 bg-white/95 p-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href={business.phone.href} className="btn-outline py-2.5" aria-label={`Call ${business.phone.display}`}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .36 1.95.7 2.87a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.92.34 1.88.57 2.87.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          Call Now
        </a>
        <Link href="/quote" className="btn-primary py-2.5">
          Free Quote
        </Link>
      </div>
    </div>
  );
}
