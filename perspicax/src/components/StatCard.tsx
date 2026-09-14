type StatCardProps = {
  value: string;
  label: string;
  size?: "lg" | "sm";
};

/**
 * Not interactive — so it gets a hover lift on its border but no press state.
 * A press response on something that can't be pressed advertises an affordance
 * that isn't there.
 */
export default function StatCard({ value, label, size = "lg" }: StatCardProps) {
  const isLg = size === "lg";
  return (
    <div
      className={
        isLg
          ? "hairline flex flex-col gap-3.5 rounded-2xl border bg-gradient-to-b from-surface/70 to-bg/40 px-6 py-8 transition-colors duration-[var(--hover-duration)] ease-[var(--ease-out)] hover:border-muted/30 sm:px-8 sm:py-10"
          : "hairline flex flex-col gap-2 rounded-xl border px-5 py-5"
      }
    >
      <div className={`${isLg ? "type-numeral" : "type-numeral-sm"} text-teal`}>{value}</div>
      <p
        className={
          isLg
            ? "text-pretty text-sm leading-relaxed text-muted"
            : "text-[0.78rem] text-muted"
        }
      >
        {label}
      </p>
    </div>
  );
}
