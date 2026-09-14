import RevealOnScroll from "@/components/RevealOnScroll";

const STEPS = [
  {
    n: "01",
    title: "Submit",
    body: "Share your book. We look at what it is, who it's for, and where it belongs.",
  },
  {
    n: "02",
    title: "Match",
    body: "Your book reaches readers already inside an active, engaged community — not cold outreach, not ads.",
  },
  {
    n: "03",
    title: "Hear back",
    body: "Real reads. Real reviews. Real reactions — visible, verifiable, yours to keep.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-bg px-6 py-20 font-sans text-text sm:px-11 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_12%_0%,rgba(59,130,246,0.07)_0%,rgba(11,14,26,0)_62%)]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 sm:gap-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
          {STEPS.map((step, i) => (
            <RevealOnScroll
              key={step.n}
              delayMs={i * 60}
              className="hairline flex flex-col gap-5 border-l pl-5 sm:pl-7"
            >
              {/* Numerals sit tighter than the body text they label — display-scale
                  Playfair reads loose at default tracking. */}
              <div className="font-serif text-[clamp(2.125rem,3.4vw,2.875rem)] leading-none tracking-[-0.01em] text-teal">
                {step.n}
              </div>
              <h3 className="m-0 text-base font-medium tracking-[0.01em]">{step.title}</h3>
              <p className="m-0 max-w-[34ch] text-pretty text-[0.9rem] leading-[1.75] text-muted">
                {step.body}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
