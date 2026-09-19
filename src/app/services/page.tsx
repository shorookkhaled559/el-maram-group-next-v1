import { Suspense } from "react";
import { PageLayout } from "@/components/site/page-layout";
import { PageHeaderClient } from "@/components/site/page-header-client";
import { ServicesContent } from "./services-content";

export const metadata = { 
  title: "Services | Maram Group",
  description: "Comprehensive real estate development services including architectural design, interior design, exterior design, landscape design, concrete works and finishing works in Egypt and Kuwait."
};

export default function ServicesPage() {
  return (
    <PageLayout>
      <Suspense>
        <PageHeaderClient pageKey="services" />
      </Suspense>
      <Suspense>
        <ServicesContent />
      </Suspense>
    </PageLayout>
  );
}
