import Link from "next/link";
import { nextPage } from "@/lib/nav";

/**
 * The suggested next page, offered at the foot of each one.
 *
 * This is the whole navigation guidance mechanism: nothing is locked, so the
 * reading order is carried by a visible prompt rather than by withholding
 * routes. A visitor who ignores it loses nothing — the menu still reaches
 * every page, and so does a crawler.
 *
 * Renders nothing at the end of the order.
 */
export default function NextPageLink({ currentPath }: { currentPath: string }) {
  const next = nextPage(currentPath);
  if (!next) return null;

  return (
    <nav aria-label="Suggested next page" className="px-6 pb-4 sm:px-11">
      <div className="mx-auto max-w-6xl">
        <Link
          href={next.href}
          className="pressable-row hairline group flex flex-col gap-2 border-t py-9 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:py-12"
        >
          <span className="flex flex-col gap-2.5">
            <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-muted">
              Next
            </span>
            <span className="type-h3 text-text">{next.label}</span>
          </span>
          <span className="flex items-center gap-3 text-[0.875rem] text-muted sm:pb-1.5">
            {next.blurb}
            {/* Travels a few pixels on hover — the direction the link goes. */}
            <span
              aria-hidden
              className="inline-block transition-transform duration-[var(--hover-duration)] ease-[var(--ease-out)] group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </Link>
      </div>
    </nav>
  );
}
