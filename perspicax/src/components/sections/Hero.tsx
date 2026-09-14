import Header from "@/components/Header";
import PillLink from "@/components/PillLink";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-bg font-sans text-text">
      <video
        autoPlay
        muted
        loop
        playsInline
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

      <Header variant="overlay" />

      <div className="relative z-[2] grid content-start gap-y-8 px-6 pb-16 pt-4 sm:gap-y-12 sm:px-11 sm:pb-24">
        <div className="relative max-w-[680px]">
          <div
            aria-hidden
            className="glow-breathe pointer-events-none absolute -left-6 top-4 h-[300px] w-[520px] rounded-full blur-[28px] bg-[radial-gradient(60%_62%_at_34%_46%,rgba(18,20,28,0.72)_0%,rgba(59,130,246,0.1)_44%,rgba(139,92,246,0.07)_66%,rgba(18,20,28,0)_100%)]"
          />

          <div className="hero-fade relative flex flex-col items-start gap-7 text-left sm:gap-11">
            <div className="flex items-center gap-3.5">
              <span className="block h-px w-10 bg-[linear-gradient(90deg,rgba(59,130,246,0)_0%,#3B82F6_60%,#8B5CF6_100%)]" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
                Author visibility, quietly done
              </span>
            </div>

            <h1
              className="[text-shadow:0_2px_28px_rgba(11,14,26,0.85)] m-0 max-w-[13ch] text-pretty font-serif text-[clamp(40px,8.4vw,116px)] font-normal leading-[1.12] tracking-[-0.02em]"
            >
              A book unread is still a whisper.
            </h1>

            {/* Subheadline slot — intentionally minimal/empty, holds its space for future copy. */}
            <p className="m-0 min-h-[2.8em] max-w-[46ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-muted" />

            <div className="flex flex-wrap items-center gap-3.5">
              <PillLink href="/contact">Find your readers</PillLink>
              <PillLink href="/#how-it-works" variant="ghost">
                See how it works
              </PillLink>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-muted/20 bg-surface/45 px-4 py-[7px] text-[11.5px] tracking-[0.04em] text-muted">
                <span className="font-medium text-teal">2,400+</span> authors placed
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-muted/20 bg-surface/45 px-4 py-[7px] text-[11.5px] tracking-[0.04em] text-muted">
                <span className="font-medium text-teal">91%</span> reader match rate
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-muted/20 bg-surface/45 px-4 py-[7px] text-[11.5px] tracking-[0.04em] text-muted">
                No bots. No bought reviews.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
