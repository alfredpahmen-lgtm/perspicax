import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextPageLink from "@/components/NextPageLink";

/**
 * Every page except Home. Fixes the one structural bug the old single-scroll
 * homepage had: the header floated over content with nothing reserving its
 * height, so anything the visitor jumped to landed underneath it.
 *
 * Here the header is `sticky`, so it occupies real space in the flow and can't
 * cover the page — and `<main>` carries no compensating padding hack, because
 * there is nothing to compensate for.
 */
export default function PageShell({
  currentPath,
  children,
}: {
  currentPath: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-bg font-sans text-text">
      <Header currentPath={currentPath} />
      <main className="flex-1">{children}</main>
      <NextPageLink currentPath={currentPath} />
      <Footer />
    </div>
  );
}
