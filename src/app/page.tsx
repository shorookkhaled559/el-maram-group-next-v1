import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Quotation } from "@/components/site/quotation";
import { About } from "@/components/site/about";
import { Launches } from "@/components/site/launches";
import { ExploreCategories } from "@/components/site/explore-categories";
import { SuccessPartners } from "@/components/site/success-partners";
import { HowWeWork } from "@/components/site/how-we-work";
import { Brochure } from "@/components/site/brochure";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <ExploreCategories />
      <Launches />
      <SuccessPartners />
      <HowWeWork />
      <Quotation />
      <Brochure />
    </main>
  );
}
