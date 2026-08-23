import { Suspense } from "react";
import { PageLayout } from "@/components/site/page-layout";
import { ProjectsContent } from "./projects-content";

export const metadata = { title: "Projects | Maram Group" };

export default function ProjectsPage() {
  return (
    <PageLayout>
      <Suspense>
        <ProjectsContent />
      </Suspense>
    </PageLayout>
  );
}
