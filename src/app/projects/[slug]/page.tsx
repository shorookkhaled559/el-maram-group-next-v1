import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/site/page-layout";
import { ProjectDetailContent } from "./project-detail-content";
import projects from "@/data/projects.json";

export function generateStaticParams() {
  return projects.items.map((p) => ({ slug: p.slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(props: any) {
  const { slug } = await props.params;
  const project = projects.items.find((p: { slug: string }) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.id.replace(/-/g, " ")} | Maram Group` };
}

export type ProjectDetailProps = {
  project: (typeof projects.items)[number];
  locale: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectDetailPage(props: any) {
  const { slug } = await props.params;
  const project = projects.items.find((p: { slug: string }) => p.slug === slug);
  if (!project) notFound();

  return (
    <PageLayout>
      <Suspense>
        <ProjectDetailContent project={project} locale="en" />
      </Suspense>
    </PageLayout>
  );
}
