import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import ForAuthors from "@/components/sections/ForAuthors";
import Readers from "@/components/sections/Readers";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* Overlay header sits at page level, not inside the hero — a fixed element
          nested in an overflow-hidden section breaks the moment that section
          gains a transform. */}
      <Header variant="overlay" />
      <Hero />
      <HowItWorks />
      <ForAuthors />
      <Readers />
      <Footer />
    </>
  );
}
