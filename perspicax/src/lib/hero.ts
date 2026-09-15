/**
 * Mobile layout for the split hero.
 *
 *   "stacked" — dark panel with the rotating book on top, light panel with the
 *               headline and CTAs below.
 *   "simple"  — no split below `lg`: one light screen, book above the copy.
 *
 * Lives here rather than inside the hero because the header needs it too: it
 * floats over the hero and has to know whether there is a dark panel behind it
 * at mobile widths, or it renders light-on-light and disappears.
 *
 * Desktop is the side-by-side split either way; this only affects `< lg`.
 */
export type HeroMobileLayout = "stacked" | "simple";

export const MOBILE_LAYOUT: HeroMobileLayout = "stacked";

/** True when a dark panel sits behind the header below `lg`. */
export const HERO_DARK_ON_MOBILE = MOBILE_LAYOUT === "stacked";
