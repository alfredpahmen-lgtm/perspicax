type StatCardProps = {
  value: string;
  label: string;
  size?: "lg" | "sm";
};

export default function StatCard({ value, label, size = "lg" }: StatCardProps) {
  const isLg = size === "lg";
  return (
    <div
      className={
        isLg
          ? "flex flex-col gap-3.5 rounded-2xl border border-muted/16 bg-gradient-to-b from-surface/70 to-bg/40 px-6 py-8 transition-colors duration-300 hover:border-muted/30 sm:px-8 sm:py-10"
          : "flex flex-col gap-2 rounded-xl border border-muted/16 px-5 py-5"
      }
    >
      <div
        className={
          isLg
            ? "font-serif text-[clamp(38px,3.8vw,52px)] leading-none text-teal"
            : "font-serif text-[28px] leading-none text-teal"
        }
      >
        {value}
      </div>
      <p className={isLg ? "text-sm text-muted leading-relaxed text-pretty" : "text-[12.5px] text-muted"}>
        {label}
      </p>
    </div>
  );
}
