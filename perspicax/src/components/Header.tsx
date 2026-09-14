"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/nav";

type HeaderProps = {
  /** Overlay = floats over the hero video (homepage). Default = reserves its own space. */
  variant?: "overlay" | "default";
  currentPath?: string;
};

export default function Header({ variant = "default", currentPath }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The material is earned, not permanent: it appears only once content is
  // actually passing underneath the bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const position =
    variant === "overlay" ? "fixed inset-x-0 top-0 z-50" : "sticky top-0 z-50";

  return (
    <header className={position}>
      {/* Translucent layer fades in behind the bar rather than transitioning the
          blur itself, which browsers animate poorly. */}
      <div
        aria-hidden
        className={`material absolute inset-0 transition-opacity duration-300 ease-[var(--ease-out)] ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Scroll edge: a fading rule where content meets the chrome, not a hard divider. */}
      <div
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,var(--hairline)_25%,var(--hairline)_75%,transparent_100%)] transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative flex items-center justify-between gap-6 px-6 py-7 sm:px-11">
        <Link
          href="/"
          className="pressable-text font-serif text-xl tracking-[0.06em] text-text"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
        </Link>

        <nav className="hidden flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={currentPath === link.href ? "page" : undefined}
              className={`pressable-text ${
                currentPath === link.href ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="pressable hairline flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border md:hidden"
          style={{ ["--press-scale" as string]: "0.94" }}
        >
          <span
            className={`block h-px w-4 bg-text transition-transform duration-[260ms] ease-[var(--ease-out)] ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-4 bg-text transition-transform duration-[260ms] ease-[var(--ease-out)] ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Stays mounted so it can leave along the path it arrived on, scaling from
          the hamburger that opened it rather than from its own centre. */}
      <nav
        id="mobile-nav"
        inert={!open}
        className={`relative grid origin-top-right overflow-hidden transition-[grid-template-rows,opacity,transform] duration-[260ms] ease-[var(--ease-out)] md:hidden ${
          open
            ? "grid-rows-[1fr] scale-100 opacity-100"
            : "pointer-events-none grid-rows-[0fr] scale-[0.97] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="material hairline mx-6 mb-4 flex flex-col rounded-2xl border px-5 py-2 sm:mx-11">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={currentPath === link.href ? "page" : undefined}
                className={`pressable-row hairline border-b py-2.5 text-sm last:border-b-0 ${
                  currentPath === link.href ? "text-text" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
