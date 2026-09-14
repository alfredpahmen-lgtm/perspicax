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
          <h2 className="m-0 text-pretty font-serif text-[clamp(30px,4.1vw,56px)] font-normal leading-[1.14] tracking-[-0.01em]">
            A community that was already reading.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delayMs={60}>
          <p className="m-0 max-w-[58ch] text-pretty text-[clamp(15px,1.2vw,16.5px)] leading-[1.85] text-muted">
            Perspicax works with an active, established community of readers — people who read,
            discuss, and review because they want to, not because they&apos;re paid to. Your book
            reaches them the way any book reaches a reader who was already looking for something
            new.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delayMs={120}>
          <span className="inline-flex items-center rounded-full border border-muted/16 bg-gradient-to-b from-surface/70 to-bg/40 px-4 py-[7px] text-[11.5px] tracking-[0.04em] text-muted">
            Real readers. No bots. No bought engagement.
          </span>
        </RevealOnScroll>
      </div>
    </section>
  );
}
