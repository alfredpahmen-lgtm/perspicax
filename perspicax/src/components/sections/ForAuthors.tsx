import RevealOnScroll from "@/components/RevealOnScroll";
import StatCard from "@/components/StatCard";

const STATS = [
  { value: "2,400+", label: "Authors placed with real readers" },
  { value: "91%", label: "Reader match rate" },
  { value: "340+", label: "Verified reviews generated this month" },
];

export default function ForAuthors() {
  return (
    <section id="authors" className="relative bg-bg px-6 py-20 font-sans text-text sm:px-11 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:gap-20">
        <RevealOnScroll>
          <h2 className="m-0 max-w-[20ch] text-pretty font-serif text-[clamp(30px,4.1vw,56px)] font-normal leading-[1.14] tracking-[-0.01em]">
            Numbers you can check. Not numbers you have to trust.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat, i) => (
            <RevealOnScroll key={stat.label} delayMs={i * 60}>
              <StatCard value={stat.value} label={stat.label} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <p className="m-0 max-w-[62ch] text-pretty text-[14.5px] leading-[1.8] text-muted">
            Every number here is something an author can trace back to a real reader, a real
            review, a real reaction — not a dashboard metric.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
