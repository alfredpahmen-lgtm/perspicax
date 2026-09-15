import Link from "next/link";

type PillLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * Pill-shaped CTA. Primary = gradient fill (blue → violet). Ghost = outline, for
 * secondary actions.
 *
 * The primary carries no text colour here: `.gradient-primary` pins its own
 * label to white, because a filled button is its own surface and its label must
 * not follow the page theme. The ghost variant does use `text-text` — it is
 * transparent, so its label belongs to whichever ground it sits on.
 *
 * The primary's glow lives on a pseudo-layer whose opacity animates, rather than
 * transitioning box-shadow and filter directly — opacity stays on the compositor
 * where box-shadow and brightness would repaint the gradient every frame.
 */
export default function PillLink({
  href,
  children,
  variant = "primary",
  className = "",
}: PillLinkProps) {
  const base =
    "pressable group relative inline-flex items-center justify-center rounded-full px-7 py-[0.9375rem] text-sm font-medium isolate";

  const styles =
    variant === "primary"
      ? "gradient-primary"
      : "material-chip hairline border text-text hover:border-violet/60";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 shadow-[0_10px_40px_-12px_rgba(124,58,237,0.85)] transition-opacity duration-[var(--hover-duration)] ease-[var(--ease-out)] group-hover:opacity-100"
        />
      )}
      {children}
    </Link>
  );
}
