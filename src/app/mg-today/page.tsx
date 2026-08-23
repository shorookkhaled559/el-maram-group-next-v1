import { Suspense } from "react";
import { PageLayout } from "@/components/site/page-layout";
import { PageHeaderClient } from "@/components/site/page-header-client";
import { NewsSection } from "@/components/site/news-section";
import { TeamSection } from "@/components/site/team-section";

export const metadata = { title: "MG Today | Maram Group" };

export default function MgTodayPage() {
  return (
    <PageLayout>
      <Suspense>
        <PageHeaderClient pageKey="mgToday" />
        <NewsSection />
        <TeamSection />
      </Suspense>
    </PageLayout>
  );
}
