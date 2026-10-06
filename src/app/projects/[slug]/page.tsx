import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/site/page-layout";
import { ProjectDetailContent } from "./project-detail-content";
import projectsData from "@/data/maram-projects-categorized.json";

type Project = {
  id: string;
  slug: string;
  title: string;
  image: string;
  hasDetails?: boolean;
  description?: {
    en: string;
    ar: string;
  };
  client?: string;
  location?: string;
  area?: string;
  year?: string;
  style?: string;
  highlights?: Array<{
    en: string;
    ar: string;
  }>;
  designDetails?: {
    en: string;
    ar: string;
  };
  gallery?: string[];
};

export function generateStaticParams() {
  // Only generate pages for projects with details
  return projectsData.projects
    .filter((p: Project) => p.hasDetails)
    .map((p: Project) => ({ slug: p.slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(props: any) {
  const { slug } = await props.params;
  const project = projectsData.projects.find((p: Project) => p.slug === slug);
  if (!project || !project.hasDetails) return {};
  return { 
    title: `${project.title} | Maram Group`,
    description: project.description?.en || `${project.title} project by Maram Group`
  };
}

export type ProjectDetailProps = {
  project: Project;
  locale: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectDetailPage(props: any) {
  const { slug } = await props.params;
  const project = projectsData.projects.find((p: Project) => p.slug === slug);
  
  // Show 404 if project doesn't exist or doesn't have details
  if (!project || !project.hasDetails) {
    notFound();
  }

  return (
    <PageLayout>
      <Suspense>
        <ProjectDetailContent project={project} locale="auto" />
      </Suspense>
    </PageLayout>
  );
}
