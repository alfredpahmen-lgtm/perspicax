import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";

/**
 * Home is the hero and nothing else — one screen that sets the tone and hands
 * off. Everything that used to scroll underneath it is now a page of its own.
 *
 * It runs on the same light ground as every other route. There is no dark scope
 * on this site any more.
 */
export default function HomePage() {
  return (
    <div className="bg-bg text-text">
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
