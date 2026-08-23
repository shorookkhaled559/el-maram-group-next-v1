import { Suspense } from "react";
import { PageLayout } from "@/components/site/page-layout";
import { PageHeaderClient } from "@/components/site/page-header-client";

export const metadata = { title: "Services | Maram Group" };

export default function ServicesPage() {
  return (
    <PageLayout>
      <Suspense>
        <PageHeaderClient pageKey="services" />
      </Suspense>
    </PageLayout>
  );
}
