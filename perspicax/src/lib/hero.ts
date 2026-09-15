/**
 * Mobile layout for the split hero.
 *
 *   "stacked" — glass panel with the rotating book on top, copy panel with the
 *               headline and CTAs below.
 *   "simple"  — no split below `lg`: one light screen, book above the copy.
 *
 * Desktop is the side-by-side split either way; this only affects `< lg`.
 */
export type HeroMobileLayout = "stacked" | "simple";

export const MOBILE_LAYOUT: HeroMobileLayout = "stacked";

