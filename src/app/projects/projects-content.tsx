"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/site/project-card";
import { PageHeader } from "@/components/site/page-header";
import projects from "@/data/projects.json";
import { useI18n } from "@/i18n";

// Derive unique location values directly from JSON
const locations = Array.from(new Set(projects.items.map((p) => p.location)));

export function ProjectsContent() {
  const { m } = useI18n();
  const copy = m.projects;
  const [active, setActive] = useState<string | null>(null);

  const filtered =
    active === null
      ? projects.items
      : projects.items.filter((p) => p.location === active);

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        heading={copy.pageHeading}
        subheading={copy.pageSubheading}
      />

      {/* ── Location filter ──────────────────────────── */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-5 lg:px-8">
          {/* "All" pill */}
          <button
            onClick={() => setActive(null)}
            className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
              active === null
                ? "bg-gold-gradient text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
            }`}
          >
            {copy.allLocations}
          </button>

          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setActive(loc)}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                active === loc
                  ? "bg-gold-gradient text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* ── Project grid ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {filtered.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => {
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
        ) : (
          <p className="text-sm text-muted-foreground">{copy.pageSubheading}</p>
        )}
      </div>
    </>
  );
}
