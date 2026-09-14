import RevealOnScroll from "@/components/RevealOnScroll";

export default function Readers() {
  return (
    <section id="readers" className="relative bg-bg px-6 py-20 font-sans text-text sm:px-11 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_78%_50%,rgba(139,92,246,0.08)_0%,rgba(11,14,26,0)_64%)]"
      />
      <div className="relative mx-auto flex max-w-[760px] flex-col gap-7 sm:gap-10">
        <RevealOnScroll>
          <h2 className="type-h2 m-0">A community that was already reading.</h2>
        </RevealOnScroll>
        <RevealOnScroll delayMs={60}>
          <p className="m-0 max-w-[58ch] text-pretty text-[clamp(0.9375rem,1.2vw,1.03rem)] leading-[1.85] text-muted">
            Perspicax works with an active, established community of readers — people who read,
            discuss, and review because they want to, not because they&apos;re paid to. Your book
            reaches them the way any book reaches a reader who was already looking for something
            new.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delayMs={120}>
          <span className="hairline inline-flex items-center rounded-full border bg-gradient-to-b from-surface/70 to-bg/40 px-4 py-[0.4375rem] text-[0.72rem] tracking-[0.04em] text-muted">
            Real readers. No bots. No bought engagement.
          </span>
        </RevealOnScroll>
      </div>
    </section>
  );
}
