import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Quotation } from "@/components/site/quotation";
import { About } from "@/components/site/about";
import { Launches } from "@/components/site/launches";
import { HowWeWork } from "@/components/site/how-we-work";
import { Brochure } from "@/components/site/brochure";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Launches />
      <HowWeWork />
      <Quotation />
      <Brochure />
    </main>
  );
}
