"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/nav";

type HeaderProps = {
  /** Overlay = transparent header sitting on top of the hero video (homepage only). */
  variant?: "overlay" | "default";
  currentPath?: string;
};

export default function Header({ variant = "default", currentPath }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const wrapperClass =
    variant === "overlay"
      ? "relative z-10"
      : "relative";

  return (
    <header className={wrapperClass}>
      <div className="flex items-center justify-between gap-6 px-6 py-7 sm:px-11">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.06em] text-text"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
        </Link>

        <nav className="hidden md:flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={currentPath === link.href ? "page" : undefined}
              className={
                currentPath === link.href
                  ? "text-text"
                  : "text-muted hover:text-text transition-colors duration-300"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-text/20"
        >
          <span
            className={`block h-px w-4 bg-text transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-4 bg-text transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="md:hidden mx-6 mb-4 flex flex-col gap-1 rounded-2xl border border-muted/16 bg-surface/90 px-5 py-4 backdrop-blur-md sm:mx-11">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={currentPath === link.href ? "page" : undefined}
              className={
                (currentPath === link.href ? "text-text" : "text-muted") +
                " py-2.5 text-sm border-b border-muted/10 last:border-b-0"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
