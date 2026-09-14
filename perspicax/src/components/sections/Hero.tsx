import Link from "next/link";
import PillLink from "@/components/PillLink";
import HeroMotion from "./HeroMotion";

const trustPills = [
  { value: "2,400+", label: "authors placed" },
  { value: "91%", label: "reader match rate" },
  { value: null, label: "No bots. No bought reviews." },
];

/**
 * Hand-placed rather than random: a `Math.random()` here would produce different
 * markup on the server and the client and mismatch on hydration. Fixed values
 * also let the field be composed — motes cluster loosely around the book glow
 * on the left and thin out to the right, instead of scattering evenly.
 *
 * Durations are deliberately long and mutually prime-ish, so the field never
 * settles into a visible collective pulse.
 */
const MOTES = [
  { left: "12%", top: "34%", size: 3, duration: "19s", delay: "0s" },
  { left: "21%", top: "58%", size: 2, duration: "23s", delay: "-4s" },
  { left: "29%", top: "22%", size: 2, duration: "17s", delay: "-9s" },
  { left: "35%", top: "71%", size: 3, duration: "26s", delay: "-2s" },
  { left: "44%", top: "41%", size: 2, duration: "21s", delay: "-13s" },
  { left: "52%", top: "66%", size: 2, duration: "29s", delay: "-6s" },
  { left: "61%", top: "29%", size: 3, duration: "18s", delay: "-11s" },
  { left: "69%", top: "52%", size: 2, duration: "24s", delay: "-3s" },
  { left: "78%", top: "37%", size: 2, duration: "27s", delay: "-16s" },
  { left: "86%", top: "63%", size: 2, duration: "22s", delay: "-8s" },
];

export default function Hero() {
  return (
    <HeroMotion className="relative flex h-[100svh] min-h-[760px] w-full flex-col overflow-hidden bg-bg font-sans text-text">
      {/* Composed still behind the video — the hero never falls back to black. */}
      <div
        aria-hidden
        data-hero-still
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_38%_52%,rgba(59,130,246,0.16)_0%,rgba(139,92,246,0.1)_38%,rgba(13,23,38,0)_72%),radial-gradient(28%_24%_at_86%_30%,rgba(236,72,153,0.07)_0%,rgba(13,23,38,0)_70%),radial-gradient(40%_34%_at_44%_62%,rgba(20,184,166,0.06)_0%,rgba(13,23,38,0)_74%)]"
      />

      <video
        data-hero-layer="video"
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.92] mix-blend-lighten"
      >
        <source src="/video/hero-book-glow.mp4" type="video/mp4" />
      </video>

      {/* Particle field — the middle plane between the video and the book glow.
          Tracks the pointer at roughly twice the video's rate, which is what
          reads as depth. */}
      <div
        aria-hidden
        data-hero-layer="particles"
        className="pointer-events-none absolute inset-0"
      >
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

      {/* Bottom fade — deepens gradually into the page background below, no hard cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[42%] bg-[linear-gradient(to_bottom,rgba(13,23,38,0)_0%,rgba(13,23,38,0.18)_34%,rgba(13,23,38,0.55)_62%,rgba(13,23,38,0.85)_84%,#0D1726_100%)]"
      />

      {/* Damping over the upper-right so the background's magenta point stays faint and distant. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-[1] h-[70%] w-[40%] bg-[radial-gradient(52%_44%_at_88%_48%,rgba(13,23,38,0.78)_0%,rgba(13,23,38,0.5)_46%,rgba(13,23,38,0)_80%)]"
      />

      {/* Content is distributed across the full frame rather than stacked at the
          top, so the hero uses its height instead of leaving a dead lower third.
          Top padding clears the fixed header, which lives at page level. */}
      <div className="relative z-[2] flex flex-1 flex-col justify-between gap-10 px-6 pb-14 pt-[calc(var(--header-h)+2.5rem)] sm:px-11 sm:pb-20">
        <div
          data-hero-layer="copy"
          className="relative max-w-[min(92vw,1080px)] lg:max-w-[min(66vw,1080px)]"
        >
          <div
            aria-hidden
            data-hero-layer="glow"
            className="pointer-events-none absolute -left-6 top-4 h-[300px] w-[520px]"
          >
            <div className="glow-breathe h-full w-full rounded-full blur-[28px] bg-[radial-gradient(60%_62%_at_34%_46%,rgba(22,33,58,0.72)_0%,rgba(59,130,246,0.1)_44%,rgba(139,92,246,0.07)_66%,rgba(22,33,58,0)_100%)]" />
          </div>

          <div className="hero-enter relative flex flex-col items-start gap-6 text-left sm:gap-9">
            <div className="flex items-center gap-3.5">
              <span className="block h-px w-10 bg-[linear-gradient(90deg,rgba(59,130,246,0)_0%,#3B82F6_60%,#8B5CF6_100%)]" />
              <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-muted">
                Author visibility, quietly done
              </span>
            </div>

            {/* Split by line, not by character: each line rises out of its own
                clipped band, which reads as the sentence being set.

                The line spans are block-level, so their text nodes butt together
                with no whitespace between them and `textContent` reads
                "unreadis". The explicit label restores the sentence for assistive
                tech, rather than relying on whitespace the layout would collapse. */}
            <h1
              aria-label="A book unread is still a whisper."
              className="type-display m-0 max-w-[13ch] [text-shadow:0_2px_28px_rgba(13,23,38,0.85)]"
            >
              <span className="hero-line">
                <span>A book unread</span>
              </span>
              <span className="hero-line">
                <span>is still a whisper.</span>
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-3.5">
              <PillLink href="/contact">Find your readers</PillLink>
              <PillLink href="/how-it-works" variant="ghost">
                See how it works
              </PillLink>
            </div>
          </div>
        </div>

        <div className="hero-enter-late flex flex-col gap-7">
          <div className="flex flex-wrap gap-2.5">
            {trustPills.map((pill) => (
              <span
                key={pill.label}
                className="material-chip hairline inline-flex items-center gap-2 rounded-full border px-4 py-[0.4375rem] text-[0.72rem] tracking-[0.04em] text-muted"
              >
                {pill.value && <span className="font-medium text-teal">{pill.value}</span>}
                {pill.label}
              </span>
            ))}
          </div>

          {/* The orientation cue. Home is a single screen with no scroll of its
              own, so this is the one thing telling a visitor where the site
              begins — it names the destination rather than just pointing. */}
          <Link
            href="/how-it-works"
            className="pressable-text group inline-flex w-fit items-center gap-3 text-[0.8125rem] text-muted hover:text-text"
          >
            <span className="uppercase tracking-[0.22em]">Start here</span>
            <span
              aria-hidden
              className="cue-nudge hairline flex h-7 w-7 items-center justify-center rounded-full border text-[0.7rem]"
            >
              ↓
            </span>
          </Link>
        </div>
      </div>
    </HeroMotion>
  );
}
