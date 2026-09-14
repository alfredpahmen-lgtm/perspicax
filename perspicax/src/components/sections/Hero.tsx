import PillLink from "@/components/PillLink";
import HeroMotion from "./HeroMotion";

const trustPills = [
  { value: "2,400+", label: "authors placed" },
  { value: "91%", label: "reader match rate" },
  { value: null, label: "No bots. No bought reviews." },
];

export default function Hero() {
  return (
    <HeroMotion className="relative flex h-[100svh] min-h-[760px] w-full flex-col overflow-hidden bg-bg font-sans text-text">
      {/* Composed still behind the video — the hero never falls back to black. */}
      <div
        aria-hidden
        data-hero-still
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_38%_52%,rgba(59,130,246,0.16)_0%,rgba(139,92,246,0.1)_38%,rgba(11,14,26,0)_72%),radial-gradient(28%_24%_at_86%_30%,rgba(236,72,153,0.07)_0%,rgba(11,14,26,0)_70%),radial-gradient(40%_34%_at_44%_62%,rgba(20,184,166,0.06)_0%,rgba(11,14,26,0)_74%)]"
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

      {/* Bottom fade — deepens gradually into the section background below, no hard cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[42%] bg-[linear-gradient(to_bottom,rgba(11,14,26,0)_0%,rgba(11,14,26,0.18)_34%,rgba(11,14,26,0.55)_62%,rgba(11,14,26,0.85)_84%,#0B0E1A_100%)]"
      />

      {/* Damping over the upper-right so the background's magenta point stays faint and distant. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-[1] h-[70%] w-[40%] bg-[radial-gradient(52%_44%_at_88%_48%,rgba(11,14,26,0.78)_0%,rgba(11,14,26,0.5)_46%,rgba(11,14,26,0)_80%)]"
      />

      {/* Content is distributed across the full frame rather than stacked at the
          top, so the hero uses its height instead of leaving a dead lower third.
          Top padding clears the fixed header, which lives at page level. */}
      <div className="relative z-[2] flex flex-1 flex-col justify-between gap-10 px-6 pb-14 pt-28 sm:px-11 sm:pb-20 sm:pt-32">
        <div
          data-hero-layer="copy"
          className="relative max-w-[min(92vw,1080px)] lg:max-w-[min(66vw,1080px)]"
        >
          <div
            aria-hidden
            data-hero-layer="glow"
            className="pointer-events-none absolute -left-6 top-4 h-[300px] w-[520px]"
          >
            <div className="glow-breathe h-full w-full rounded-full blur-[28px] bg-[radial-gradient(60%_62%_at_34%_46%,rgba(18,20,28,0.72)_0%,rgba(59,130,246,0.1)_44%,rgba(139,92,246,0.07)_66%,rgba(18,20,28,0)_100%)]" />
          </div>

          <div className="hero-enter relative flex flex-col items-start gap-6 text-left sm:gap-9">
            <div className="flex items-center gap-3.5">
              <span className="block h-px w-10 bg-[linear-gradient(90deg,rgba(59,130,246,0)_0%,#3B82F6_60%,#8B5CF6_100%)]" />
              <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-muted">
                Author visibility, quietly done
              </span>
            </div>

            <h1 className="type-display m-0 max-w-[13ch] [text-shadow:0_2px_28px_rgba(11,14,26,0.85)]">
              A book unread is still a whisper.
            </h1>

            <div className="flex flex-wrap items-center gap-3.5">
              <PillLink href="/contact">Find your readers</PillLink>
              <PillLink href="/#how-it-works" variant="ghost">
                See how it works
              </PillLink>
            </div>
          </div>
        </div>

        <div className="hero-enter-late flex flex-wrap gap-2.5">
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
      </div>
    </HeroMotion>
  );
}
