import { Suspense } from "react";
import { PageLayout } from "@/components/site/page-layout";
import { PageHeaderClient } from "@/components/site/page-header-client";
import { AboutSections } from "@/components/site/about-sections";

export const metadata = { title: "About Us | Maram Group" };

export default function AboutPage() {
  return (
    <PageLayout>
      <Suspense>
        <PageHeaderClient pageKey="about" />
        <AboutSections />
      </Suspense>
    </PageLayout>
  );
}
