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

/** Hand-placed so the field is composed rather than scattered, and so server
 *  and client render identical markup (a `Math.random()` here would mismatch
 *  on hydration). */
const MOTES = [
  { left: "16%", top: "22%", size: 3, duration: "19s", delay: "0s" },
  { left: "28%", top: "63%", size: 2, duration: "23s", delay: "-4s" },
  { left: "39%", top: "14%", size: 2, duration: "17s", delay: "-9s" },
  { left: "47%", top: "78%", size: 3, duration: "26s", delay: "-2s" },
  { left: "58%", top: "31%", size: 2, duration: "21s", delay: "-13s" },
  { left: "66%", top: "69%", size: 2, duration: "29s", delay: "-6s" },
  { left: "74%", top: "24%", size: 3, duration: "18s", delay: "-11s" },
  { left: "83%", top: "56%", size: 2, duration: "22s", delay: "-8s" },
];

/**
 * The cumulative build, rendered wherever the layout needs it.
 *
 * Deliberately NOT an `<h1>`. Two layouts need a visual headline — one on the
 * dark panel at `lg`, one in the light panel below it — and which is on screen
 * is a CSS decision the server cannot make. Emitting an `<h1>` from both put
 * two of them in the document at once. So both visual copies are decorative and
 * the page carries one real, visually-hidden `<h1>` instead (see Hero below).
 */
function BuildHeadline({
  built,
  className,
}: {
  built: number;
  className: string;
}) {
  return (
    <div aria-hidden className={className}>
      {PHRASES.map((phrase, i) => (
        <span key={phrase} className="hero-line">
          {/* `aria-hidden` on the pieces: the accessible name comes from the
              aria-label above, so a screen reader is never handed a half-built
              sentence mid-animation. */}
          <span
            aria-hidden
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
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-bg font-sans text-text lg:flex-row">
      {/* The page's one real heading. The visible builds are decorative copies,
          so this is what a screen reader and the document outline get — always
          the complete sentence, never a half-built one. */}
      <h1 className="sr-only">{HEADLINE}</h1>
      {/* ================= Dark panel =================
          The seam is a single elliptical arc, not a straight edge: the two
          right-hand corner radii are percentages whose vertical halves sum to
          100%, so they meet in the middle and the whole edge becomes one
          continuous curve that scales with the box. No SVG, no fixed
          coordinates, nothing to re-tune per breakpoint.

          Stacked on mobile the curve moves to the bottom edge, so the arc still
          points at the content that follows it. */}
      <div
        className={`book-panel relative isolate w-full shrink-0 overflow-hidden bg-[#0D1726] lg:h-auto lg:w-[53%] ${
          split ? "h-[46svh] min-h-[320px]" : "hidden"
        } lg:block`}
      >
        {/* Glow behind the book — the same treatment as before, quieter. */}
        <div
          aria-hidden
          className="glow-breathe pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(90,130,210,0.30)_0%,rgba(124,58,237,0.16)_46%,rgba(13,23,38,0)_78%)]"
        />

        <div aria-hidden className="pointer-events-none absolute inset-0">
          {MOTES.map((m) => (
            <span
              key={`${m.left}-${m.top}`}
              className="mote absolute rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.9)_0%,rgba(148,163,184,0.35)_55%,rgba(148,163,184,0)_100%)]"
              style={{
                left: m.left,
                top: m.top,
                width: m.size,
                height: m.size,
                ["--mote-duration" as string]: m.duration,
                ["--mote-delay" as string]: m.delay,
              }}
            />
          ))}
        </div>

        <div className="relative flex h-full flex-col items-center justify-start px-6 pb-8 pt-[calc(var(--header-h)+1rem)] sm:px-11 lg:pb-14 lg:pl-14 lg:pr-20 lg:pt-[calc(var(--header-h)+2.5rem)]">
          {/* Headline, overlaid on the panel — desktop only. Stacked on mobile
              the panel carries the book alone and the headline moves down to
              the light panel with the rest of the copy, so the book gets the
              full height of a short panel instead of sharing it. */}
          <BuildHeadline
            built={built}
            className="type-panel relative z-10 m-0 hidden w-full max-w-[13ch] shrink-0 self-start text-[#F5F5F7] lg:block"
          />

          {/* Book stage. All four stay mounted and cross-dissolve; only opacity
              and transform change, so the whole rotation stays on the
              compositor. */}
          <div className="relative z-0 mt-5 min-h-0 w-full flex-1 lg:mt-7">
            {BOOKS.map((book, i) => {
              const active = i === index;
              return (
                <Image
                  key={book.src}
                  src={book.src}
                  alt={active ? `${book.title}${book.author ? ` by ${book.author}` : ""}` : ""}
                  aria-hidden={!active}
                  fill
                  // The panel is 53vw at lg and full width below it; the book
                  // then occupies ~78% of that. Without this the browser would
                  // fetch a full-viewport-width candidate for a half-width slot.
                  sizes="(min-width: 1024px) 42vw, 80vw"
                  priority={i === 0}
                  className={`object-contain transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] ${
                    active
                      ? "translate-x-0 scale-100 opacity-100"
                      : "pointer-events-none translate-x-[6%] scale-[0.97] opacity-0"
                  }`}
                />
              );
            })}
          </div>

          {/* Which book is showing. Not a control — the rotation is decorative —
              so these are presentational marks, not buttons. */}
          {!reduced && (
            <div aria-hidden className="relative z-10 mt-4 flex items-center gap-2">
              {BOOKS.map((b, i) => (
                <span
                  key={b.src}
                  className={`h-[3px] rounded-full transition-all duration-500 ease-[var(--ease-out)] ${
                    i === index ? "w-6 bg-[#F5F5F7]/80" : "w-2 bg-[#F5F5F7]/25"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= Light panel ================= */}
      <div className="relative flex w-full flex-1 flex-col justify-center gap-9 px-6 pb-14 pt-10 sm:px-11 lg:gap-12 lg:pb-20 lg:pl-16 lg:pt-[calc(var(--header-h)+3rem)]">
        {/* The simplified mobile layout has no panel, so the book lives here
            instead. The headline below is shared by both mobile layouts. */}
        {!split && (
          <div className="flex flex-col items-start gap-8 lg:hidden">
            <div className="relative h-[38svh] min-h-[240px] w-full">
              <div
                aria-hidden
                className="glow-breathe pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(37,99,235,0.16)_0%,rgba(124,58,237,0.10)_50%,rgba(253,252,250,0)_78%)]"
              />
              {BOOKS.map((book, i) => (
                <Image
                  key={book.src}
                  src={book.src}
                  alt={i === index ? book.title : ""}
                  aria-hidden={i !== index}
                  fill
                  sizes="80vw"
                  priority={i === 0}
                  className={`object-contain transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] ${
                    i === index
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-[6%] opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile headline — both layouts. Hidden once the split goes
            side-by-side, where the panel carries it instead. */}
        <BuildHeadline built={built} className="type-h1 m-0 max-w-[14ch] lg:hidden" />

        <div className="flex items-center gap-3.5">
          <span className="block h-px w-10 bg-[linear-gradient(90deg,rgba(37,99,235,0)_0%,#2563EB_60%,#7C3AED_100%)]" />
          <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-muted">
            Author visibility, quietly done
          </span>
        </div>

        <p className="m-0 max-w-[34ch] text-pretty text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.7] text-muted">
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
              className="card-surface hairline inline-flex items-center gap-2 rounded-full border px-4 py-[0.4375rem] text-[0.72rem] tracking-[0.04em] text-muted"
            >
              {pill.value && <span className="font-medium text-teal-ink">{pill.value}</span>}
              {pill.label}
            </span>
          ))}
        </div>

        <Link
          href="/how-it-works"
          className="pressable-text group inline-flex w-fit items-center gap-3 text-[0.8125rem] text-muted hover:text-text"
        >
          <span className="uppercase tracking-[0.22em]">Start here</span>
          <span
            aria-hidden
            className="cue-nudge hairline flex h-7 w-7 items-center justify-center rounded-full border text-[0.7rem]"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
