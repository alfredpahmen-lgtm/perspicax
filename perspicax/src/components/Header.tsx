"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HOME_LINK, NAV_LINKS, SITE } from "@/lib/nav";

type HeaderProps = {
  /** Overlay = floats over the hero video (Home). Default = reserves its own space. */
  variant?: "overlay" | "default";
  currentPath?: string;
};

const MENU_LINKS = [HOME_LINK, ...NAV_LINKS];

/**
 * Wordmark plus a single hamburger. The horizontal pill bar of links is gone:
 * seven top-level destinations never fit a bar honestly, and the old one only
 * survived by hiding itself below `md`, which left two different navigation
 * models to keep in sync.
 *
 * The menu is one full-screen panel at every width. Because it covers the page,
 * it behaves like a dialog: Escape closes it, focus is trapped inside while it
 * is open and returned to the hamburger on close, and the page behind it can't
 * scroll.
 *
 * Nothing here gates anything. Every route is a plain `<Link>`, rendered into
 * the markup on every page, so the whole site is crawlable from any entry point.
 */
export default function Header({ variant = "default", currentPath }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // The material is earned, not permanent: it appears only once content is
  // actually passing underneath the bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Dialog behaviour, all of it scoped to the open state so nothing is bound
  // while the menu is shut.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      // Wrap at both ends so Tab can never land on the inert page behind.
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Compensate for the vanishing scrollbar so the page doesn't shift sideways
    // the moment the menu opens.
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    document.addEventListener("keydown", onKeyDown);

    // Move focus into the panel so a keyboard user is actually inside the menu.
    //
    // Deferred by two frames, not one. On the commit that opens the menu the
    // panel is still `visibility: hidden` and still `inert`, and `focus()` on
    // either is silently a no-op — the click leaves focus on the hamburger and
    // Tab then walks the page behind. One frame schedules the style change;
    // the second runs after it has been applied, when the links are really
    // focusable.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
      });
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open, close]);

  const position =
    variant === "overlay" ? "fixed inset-x-0 top-0 z-50" : "sticky top-0 z-50";

  return (
    <header className={position}>
      {/* Translucent layer fades in behind the bar rather than transitioning the
          blur itself, which browsers animate poorly. Hidden while the menu is
          open, because the panel brings its own ground. */}
      <div
        aria-hidden
        className={`material absolute inset-0 transition-opacity duration-300 ease-[var(--ease-out)] ${
          scrolled && !open ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Scroll edge: a fading rule where content meets the chrome, not a hard divider. */}
      <div
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--hairline)_25%,var(--hairline)_75%,transparent_100%)] transition-opacity duration-300 ${
          scrolled && !open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative flex h-[var(--header-h)] items-center justify-between gap-6 px-6 sm:px-11">
        <Link
          href="/"
          className="pressable-text relative z-10 font-serif text-xl tracking-[0.06em] text-text"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
        </Link>

        <button
          ref={triggerRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => (open ? close() : setOpen(true))}
          className="pressable hairline relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full border"
          style={{ ["--press-scale" as string]: "0.94" }}
        >
          {/* Two rules that cross into an X. The bars translate to meet in the
              middle before rotating, so open and close run the same path. */}
          <span
            className={`block h-px w-[18px] bg-text transition-transform duration-[280ms] ease-[var(--ease-out)] ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-[18px] bg-text transition-transform duration-[280ms] ease-[var(--ease-out)] ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Full-screen panel. Stays mounted so it can leave along the path it
          arrived on; `inert` keeps its links out of the tab order and out of
          the accessibility tree while closed. */}
      <div
        id="site-menu"
        ref={panelRef}
        inert={!open}
        aria-label="Site menu"
        className={`fixed inset-0 z-0 transition-[opacity,visibility] duration-[320ms] ease-[var(--ease-out)] ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div aria-hidden className="material absolute inset-0" />

        {/* Centred with `auto` margins on the list rather than `justify-center`
            on the scroller: a centred flex child that overgrows its container
            spills past the top edge into space the scrollbar can't reach, which
            would strand the first menu item on a short viewport. */}
        <nav className="relative h-full overflow-y-auto px-6 pb-16 pt-[calc(var(--header-h)+24px)] sm:px-11">
          <ul className="mx-auto my-auto flex min-h-full w-full max-w-4xl flex-col justify-center">
            {MENU_LINKS.map((link, i) => {
              const isCurrent = currentPath === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
                    // Each row slides in a touch later than the one above it.
                    // Transform/opacity only, and the whole stack is done in
                    // under half a second.
                    style={{
                      transitionDelay: open ? `${80 + i * 34}ms` : "0ms",
                    }}
                    className={`pressable-row hairline group flex items-baseline justify-between gap-6 border-b py-5 transition-[opacity,transform] duration-[420ms] ease-[var(--ease-out)] sm:py-6 ${
                      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    <span className="flex items-baseline gap-4 sm:gap-6">
                      <span className="w-[2ch] shrink-0 font-serif text-xs text-teal-ink">
                        {String(i).padStart(2, "0")}
                      </span>
                      <span
                        className={`type-h3 ${isCurrent ? "text-text" : "text-text/85 group-hover:text-text"}`}
                      >
                        {link.label}
                      </span>
                    </span>
                    <span className="hidden max-w-[28ch] text-right text-[0.8125rem] leading-relaxed text-muted sm:block">
                      {link.blurb}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
