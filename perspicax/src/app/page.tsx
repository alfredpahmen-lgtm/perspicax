import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";

/**
 * Home is the hero and nothing else — one dark screen that sets the tone and
 * hands off. Everything that used to scroll underneath it is now a page of its
 * own.
 *
 * `.theme-dark` is scoped here rather than set globally: this is the only route
 * that keeps the near-black ground, and the header inside it picks up the dark
 * tokens for free.
 */
export default function HomePage() {
  return (
    <div className="theme-dark bg-bg text-text">
      {/* Overlay header sits at page level, not inside the hero — a fixed element
          nested in an overflow-hidden section breaks the moment that section
          gains a transform. */}
      <Header variant="overlay" currentPath="/" />
      <main>
        <Hero />
      </main>
    </div>
  );
}
