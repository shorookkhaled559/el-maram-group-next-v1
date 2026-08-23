"use client";

import projects from "@/data/projects.json";
import { useI18n } from "@/i18n";
import { ProjectCard } from "@/components/site/project-card";

export function Launches() {
  const { m } = useI18n();
  const copy = m.projects;

  return (
    <section id="launches" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-4 text-3xl lg:text-5xl">{copy.heading}</h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">{copy.subheading}</p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.items.map((project) => {
          const t = copy.items[project.id as keyof typeof copy.items];
          return (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              image={project.image}
              title={t.title}
              location={t.location}
              shortDescription={t.shortDescription}
              status={t.status}
              soldOut={project.soldOut}
              viewMoreLabel={copy.viewMore}
              soldOutLabel={copy.soldOut}
            />
          );
        })}
      </div>
    </section>
  );
}
