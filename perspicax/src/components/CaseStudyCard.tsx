import StatCard from "./StatCard";

type CaseStudyCardProps = {
  tag: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
};

export default function CaseStudyCard({ tag, title, body, stats }: CaseStudyCardProps) {
  return (
    <article className="hairline flex flex-col gap-5 rounded-2xl border card-surface p-7 transition-colors duration-[var(--hover-duration)] ease-[var(--ease-out)] hover:border-muted/30 sm:p-11">
      <span className="w-fit rounded-full border border-teal-ink/40 px-3.5 py-1.5 text-[0.6875rem] uppercase tracking-[0.1em] text-teal-ink">
        {tag}
      </span>
      <h2 className="type-h3 m-0 max-w-[24ch]">{title}</h2>
      <p className="m-0 max-w-[62ch] text-pretty text-[0.9rem] leading-[1.8] text-muted">{body}</p>
      <div className="mt-1 grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} size="sm" />
        ))}
      </div>
    </article>
  );
}
