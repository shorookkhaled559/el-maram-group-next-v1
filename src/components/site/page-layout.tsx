import { Brochure } from "@/components/site/brochure";

interface PageLayoutProps {
  children?: React.ReactNode;
}

// Navbar, Footer and FloatingActions are persistent in the root layout (app/layout.tsx).
// PageLayout only provides the main content wrapper + the Brochure section that appears
// on every inner page.
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="pt-24 lg:pt-28">
      {children}
      <Brochure />
    </main>
  );
}
