import { Suspense } from "react";
import { PageLayout } from "@/components/site/page-layout";
import { BlogsContent } from "./blogs-content";

export const metadata = { title: "Blogs | Maram Group" };

export default function BlogsPage() {
  return (
    <PageLayout>
      <Suspense>
        <BlogsContent />
      </Suspense>
    </PageLayout>
  );
}
