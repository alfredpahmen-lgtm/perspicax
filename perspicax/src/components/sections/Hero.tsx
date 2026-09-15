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
    <HeroMotion className="relative flex h-[100svh] min-h-[680px] w-full flex-col overflow-hidden bg-bg font-sans text-text">
      {/* Composed still behind the video. On the light ground this is no longer a
          fallback that merely avoids a black rectangle — it is the hero's actual
          colour, and the video sits on top of it as texture. */}
      <div
        aria-hidden
        data-hero-still
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_38%_52%,rgba(59,130,246,0.10)_0%,rgba(139,92,246,0.07)_38%,rgba(253,252,250,0)_72%),radial-gradient(28%_24%_at_86%_30%,rgba(236,72,153,0.05)_0%,rgba(253,252,250,0)_70%),radial-gradient(40%_34%_at_44%_62%,rgba(20,184,166,0.05)_0%,rgba(253,252,250,0)_74%)]"
      />

      {/* The clip is a bright subject on a dark backdrop — authored for the old
          near-black ground, where `lighten` let the glow through. On paper that
          is exactly inverted: `invert` turns the dark backdrop to light and the
          glow to ink, and `multiply` then lets the paper show through it. The
          result reads as a watermark rather than a video playing behind text.

          Opacity is deliberately low. The hero's colour comes from the still
          above; the video only adds movement and grain. */}
      <video
        data-hero-layer="video"
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.16] mix-blend-multiply [filter:invert(1)_saturate(0.35)]"
      >
        <source src="/video/hero-book-glow.mp4" type="video/mp4" />
      </video>

      {/* Particle field — the middle plane between the video and the book glow.
          Tracks the pointer at roughly twice the video's rate, which is what
          reads as depth. Motes are ink on paper now, not light in the dark. */}
      <div
        aria-hidden
        data-hero-layer="particles"
        className="pointer-events-none absolute inset-0"
      >
        {MOTES.map((m) => (
          <span
            key={`${m.left}-${m.top}`}
            className="mote absolute rounded-full bg-[radial-gradient(circle,rgba(13,23,38,0.55)_0%,rgba(91,98,112,0.22)_55%,rgba(91,98,112,0)_100%)]"
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

      {/* Bottom fade — settles into the page background below, no hard cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38%] bg-[linear-gradient(to_bottom,rgba(253,252,250,0)_0%,rgba(253,252,250,0.45)_46%,rgba(253,252,250,0.82)_76%,#FDFCFA_100%)]"
      />

      {/* Legibility scrim.

          The headline must clear AA whatever frame the video happens to be on,
          and a video's pixels are not something the stylesheet can promise. So
          the text never sits on the video: this wash pins the left of the frame
          — where all the copy lives — back to near-paper, and fades out to the
          right where there is nothing to read. Contrast then depends only on
          tokens, not on the clip. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-[linear-gradient(100deg,#FDFCFA_0%,rgba(253,252,250,0.94)_38%,rgba(253,252,250,0.72)_58%,rgba(253,252,250,0)_88%)] lg:w-[78%]"
      />

      {/* Content is distributed across the frame rather than stacked at the top,
          so the hero uses its height instead of leaving a dead lower third.

          The distribution is *capped*, though. With a plain `justify-between` on
          a tall portrait tablet the two groups are flung to opposite ends and
          leave a void between them — 44% of the hero at 768x1024, 55% on iPad
          Pro portrait. So the outer track centres, and the inner track carries
          the `justify-between` with a ceiling on how far it may spread. Short
          and wide viewports never reach the ceiling and are unchanged; tall ones
          stop stretching and read as one composition. Driven by available
          height, so there is no breakpoint to jump at. */}
      <div className="relative z-[2] flex flex-1 flex-col justify-center px-6 pb-14 pt-[calc(var(--header-h)+2.5rem)] sm:px-11 sm:pb-20">
        <div className="flex w-full flex-1 flex-col justify-between gap-10 [max-height:36rem]">
          <div
            data-hero-layer="copy"
            className="relative max-w-[min(92vw,1080px)] lg:max-w-[min(66vw,1080px)]"
          >
            <div
              aria-hidden
              data-hero-layer="glow"
              className="pointer-events-none absolute -left-6 top-4 h-[300px] w-[520px]"
            >
              <div className="glow-breathe h-full w-full rounded-full blur-[30px] bg-[radial-gradient(60%_62%_at_34%_46%,rgba(59,130,246,0.10)_0%,rgba(139,92,246,0.07)_44%,rgba(20,184,166,0.04)_66%,rgba(253,252,250,0)_100%)]" />
            </div>

            <div className="hero-enter relative flex flex-col items-start gap-6 text-left sm:gap-9">
              <div className="flex items-center gap-3.5">
                <span className="block h-px w-10 bg-[linear-gradient(90deg,rgba(37,99,235,0)_0%,#2563EB_60%,#7C3AED_100%)]" />
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
                className="type-display m-0 max-w-[13ch]"
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
                  {pill.value && (
                    <span className="font-medium text-teal-ink">{pill.value}</span>
                  )}
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
      </div>
    </HeroMotion>
  );
}
