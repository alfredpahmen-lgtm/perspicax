import StatCard from "./StatCard";

type CaseStudyCardProps = {
  tag: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
};

export default function CaseStudyCard({ tag, title, body, stats }: CaseStudyCardProps) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-muted/16 bg-gradient-to-b from-surface/70 to-bg/40 p-7 transition-colors duration-300 hover:border-muted/30 sm:p-11">
      <span className="w-fit rounded-full border border-teal/35 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.1em] text-teal">
        {tag}
      </span>
      <h2 className="m-0 max-w-[24ch] text-pretty font-serif text-[clamp(24px,2.8vw,38px)] font-normal leading-[1.18]">
        {title}
      </h2>
      <p className="m-0 max-w-[62ch] text-pretty text-[14.5px] leading-[1.8] text-muted">{body}</p>
      <div className="mt-1 grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} size="sm" />
        ))}
      </div>
    </article>
  );
}
