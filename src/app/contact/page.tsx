import { Suspense } from "react";
import { PageLayout } from "@/components/site/page-layout";
import { PageHeaderClient } from "@/components/site/page-header-client";
import { ContactSection } from "@/components/site/contact-section";

export const metadata = { title: "Contact Us | Maram Group" };

export default function ContactPage() {
  return (
    <PageLayout>
      <Suspense>
        <PageHeaderClient pageKey="contact" />
        <ContactSection />
      </Suspense>
    </PageLayout>
  );
}
