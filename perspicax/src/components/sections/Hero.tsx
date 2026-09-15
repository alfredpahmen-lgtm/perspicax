"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PillLink from "@/components/PillLink";
import { MOBILE_LAYOUT } from "@/lib/hero";

const BOOKS = [
  { src: "/books/let-me-tell-you.webp", title: "Let Me Tell You", author: "Alvin J Beck" },
  { src: "/books/dark-psychology.webp", title: "Dark Psychology", author: "" },
  { src: "/books/blind-justice.webp", title: "The Blind Justice", author: "Seyyidali" },
  { src: "/books/guilty.webp", title: "Guilty", author: "Ivor Dunnet" },
];

/** Cumulative — each phrase stays once it lands. */
const PHRASES = ["A book", "unread is", "a whisper"];
const HEADLINE = "A book unread is a whisper.";

const ROTATE_MS = 4500;

const trustPills = [
  { value: "2,400+", label: "authors placed" },
  { value: "91%", label: "reader match rate" },
  { value: null, label: "No bots. No bought reviews." },
];

/**
 * The cumulative build, rendered wherever the layout needs it.
 *
 * Deliberately NOT an `<h1>`. Two layouts need a visual headline — one on the
 * glass panel at `lg`, one below it on mobile — and which is on screen is a CSS
 * decision the server cannot make. Emitting an `<h1>` from both put two of them
 * in the document, so both visual copies are decorative and the page carries
 * one real, visually-hidden `<h1>`.
 */
function BuildHeadline({ built, className }: { built: number; className: string }) {
  return (
    <div aria-hidden className={className}>
      {PHRASES.map((phrase, i) => (
        <span key={phrase} className="hero-line">
          <span
            className={`block transition-[opacity,transform] duration-[620ms] ease-[var(--ease-out)] ${
              i < built ? "translate-y-0 opacity-100" : "translate-y-[0.9em] opacity-0"
            }`}
          >
            {phrase}
          </span>
        </span>
      ))}
    </div>
  );
}

/** The rotating stack. All four stay mounted and cross-dissolve. */
function BookStack({ index, className }: { index: number; className: string }) {
  return (
    <div className={className}>
      {BOOKS.map((book, i) => {
        const active = i === index;
        return (
          <Image
            key={book.src}
            src={book.src}
            alt={active ? `${book.title}${book.author ? ` by ${book.author}` : ""}` : ""}
            aria-hidden={!active}
            fill
            sizes="(min-width: 1024px) 40vw, 72vw"
            priority={i === 0}
            className={`object-contain transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] ${
              active
                ? "translate-x-0 scale-100 opacity-100"
                : "pointer-events-none translate-x-[5%] scale-[0.97] opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  // Monotonic, so the headline build never restarts when the books loop round.
  const [built, setBuilt] = useState(1);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (timer.current) clearInterval(timer.current);
      if (q.matches) {
        // Skip to the finished state: whole headline, first book, no cycling.
        setReduced(true);
        setBuilt(PHRASES.length);
        setIndex(0);
        return;
      }
      setReduced(false);
      timer.current = setInterval(() => {
        setIndex((i) => (i + 1) % BOOKS.length);
        setBuilt((b) => Math.min(b + 1, PHRASES.length));
      }, ROTATE_MS);
    };

    apply();
    q.addEventListener("change", apply);
    return () => {
      q.removeEventListener("change", apply);
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const split = MOBILE_LAYOUT === "stacked";

  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col bg-bg font-sans text-text">
      {/* The page's one real heading. The visible builds are decorative copies,
          so this is what a screen reader and the document outline get — always
          the complete sentence, never a half-built one. */}
      <h1 className="sr-only">{HEADLINE}</h1>

      {/* Colour field for the whole page. The card floats above it, and it is
          what the card's blur actually refracts — glass over a flat ground is
          just a lighter rectangle, which is the usual way this style fails. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#EEEDEA]">
        {/* Held well back. The card has to sit ON something — if the page is as
            vivid as the card, the two merge and nothing floats. */}
        <div className="aurora aurora-drift absolute -inset-[12%] opacity-[0.22]" />
      </div>

      {/* Floating shell, inset from the viewport so it reads as an object on a
          surface rather than a full-bleed background. */}
      <div className="flex min-h-[100svh] w-full items-stretch p-3 pt-[calc(var(--header-h)+0.5rem)] sm:p-5 sm:pt-[calc(var(--header-h)+0.75rem)] lg:p-7 lg:pt-[calc(var(--header-h)+1rem)]">
        <div className="glass-card relative flex w-full flex-col overflow-hidden rounded-[28px] sm:rounded-[36px] lg:flex-row">
          {/* ---------------- Book panel ---------------- */}
          <div
            className={`book-panel relative isolate w-full shrink-0 overflow-hidden lg:h-auto lg:w-[52%] ${
              split ? "h-[42svh] min-h-[280px]" : "hidden"
            } lg:block`}
          >
            {/* Denser colour inside the panel, so the stage has something
                saturated to refract. */}
            <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
              <div className="aurora aurora-drift absolute -inset-[18%] opacity-90" />
            </div>

            <div className="relative flex h-full flex-col items-center justify-center gap-5 px-5 py-6 sm:px-9 lg:gap-7 lg:px-12 lg:py-12">
              <BuildHeadline
                built={built}
                className="type-panel relative z-10 m-0 hidden w-full max-w-[13ch] shrink-0 self-start text-[#0D1726] lg:block"
              />

              {/* The stage. Every cover gets the same frame, which is the point:
                  these four run from luma 46 to 170, and no single ground
                  separates all of them. Separating them with a surface instead
                  of with each cover's own halo is what makes the set read as a
                  set. */}
              <div className="glass-stage relative z-0 flex min-h-0 w-full flex-1 items-center justify-center rounded-[20px] p-3 sm:rounded-[26px] sm:p-5">
                <BookStack index={index} className="relative h-full w-full" />
              </div>

              {!reduced && (
                <div aria-hidden className="relative z-10 flex shrink-0 items-center gap-2">
                  {BOOKS.map((b, i) => (
                    <span
                      key={b.src}
                      className={`h-[3px] rounded-full transition-all duration-500 ease-[var(--ease-out)] ${
                        i === index ? "w-6 bg-[#0D1726]/70" : "w-2 bg-[#0D1726]/25"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------------- Copy panel ---------------- */}
          <div className="relative flex w-full flex-1 flex-col justify-center gap-6 px-6 py-9 sm:px-10 lg:gap-8 lg:py-14 lg:pl-14 lg:pr-16">
            {/* The simplified mobile layout has no panel, so the book lives here
                on its own stage instead. */}
            {!split && (
              <div className="glass-stage relative h-[32svh] min-h-[210px] w-full rounded-[22px] p-3 lg:hidden">
                <BookStack index={index} className="relative h-full w-full" />
              </div>
            )}

            <BuildHeadline built={built} className="type-h1 m-0 max-w-[14ch] lg:hidden" />

            <div className="flex items-center gap-3.5">
              <span className="block h-px w-10 bg-[linear-gradient(90deg,rgba(37,99,235,0)_0%,#2563EB_60%,#7C3AED_100%)]" />
              <span className="on-glass text-[0.6875rem] uppercase tracking-[0.22em] text-[#4A5263]">
                Author visibility, quietly done
              </span>
            </div>

            <p className="on-glass m-0 max-w-[34ch] text-pretty text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.7] text-[#2B3344]">
              We place books with readers who were already looking for them — and
              nothing about that is bought.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <PillLink href="/contact">Find your readers</PillLink>
              <PillLink href="/how-it-works" variant="ghost">
                See how it works
              </PillLink>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {trustPills.map((pill) => (
                <span
                  key={pill.label}
                  className="glass-chip on-glass inline-flex items-center gap-2 rounded-full px-4 py-[0.4375rem] text-[0.72rem] tracking-[0.05em] text-[#2B3344]"
                >
                  {pill.value && (
                    <span className="font-semibold text-teal-ink">{pill.value}</span>
                  )}
                  {pill.label}
                </span>
              ))}
            </div>

            <Link
              href="/how-it-works"
              className="pressable-text group inline-flex w-fit items-center gap-3 text-[0.8125rem] text-[#2B3344] hover:text-text"
            >
              <span className="on-glass uppercase tracking-[0.22em]">Start here</span>
              <span
                aria-hidden
                className="cue-nudge glass-chip flex h-8 w-8 items-center justify-center rounded-full text-[0.75rem]"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
