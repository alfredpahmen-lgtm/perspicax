import Link from "next/link";

type PillLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * Pill-shaped CTA. Primary = gradient fill (blue → violet). Ghost = outline, for secondary actions.
 */
export default function PillLink({
  href,
  children,
  variant = "primary",
  className = "",
}: PillLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-[15px] text-sm font-medium transition-[box-shadow,filter,background-color,border-color] duration-300 ease-out";

  const styles =
    variant === "primary"
      ? "gradient-primary text-text hover:shadow-[0_10px_40px_-12px_rgba(139,92,246,0.7)] hover:brightness-[1.06]"
      : "border border-text/20 bg-surface/35 text-text hover:border-violet/60 hover:bg-surface/60";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
