"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight, MapPin, Layers, Home, Calendar, CheckCircle2 } from "lucide-react";
import { projectImages } from "@/lib/project-images";
import { useI18n } from "@/i18n";
import type { ProjectDetailProps } from "./page";

export function ProjectDetailContent({ project, locale }: ProjectDetailProps) {
  const { m } = useI18n();
  const copy = m.projects;
  const t = copy.items[project.id as keyof typeof copy.items];
  const d = copy.detail;

  const BackArrow = locale === "ar" ? ArrowUpRight : ArrowUpLeft;

  return (
    <>
      {/* ── Hero image ──────────────────────────────── */}
      <div className="relative aspect-[21/9] max-h-[60vh] w-full overflow-hidden bg-muted">
        <Image
          src={projectImages[project.image]}
          alt={t.title}
          width={2100}
          height={900}
          priority
          className="h-full w-full object-cover"
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Status badge */}
        <span className="absolute start-6 bottom-6 border border-white/25 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
          {t.status}
        </span>

        {/* Sold Out badge */}
        {project.soldOut && (
          <span className="absolute end-6 bottom-6 bg-gold-gradient px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-primary-foreground">
            {copy.soldOut}
          </span>
        )}
      </div>

      {/* ── Main content ────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-gold"
        >
          <BackArrow className="size-3.5 rtl:-scale-x-100" />
          {d.backToProjects}
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_320px]">
          {/* Left — title + description */}
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl lg:text-6xl">{t.title}</h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              {t.location}
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-[1.95] text-muted-foreground">
              {t.longDescription}
            </p>

            {/* Gallery strip */}
            {project.details.gallery.length > 1 && (
              <div className="mt-12 grid grid-cols-3 gap-3">
                {project.details.gallery.map((imgKey, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={projectImages[imgKey]}
                    alt={`${t.title} ${i + 1}`}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — spec card */}
          <aside className="h-fit border border-border bg-card p-8 shadow-elevated">
            <h2 className="text-lg">{t.title}</h2>
            <div className="mt-6 space-y-5">
              <SpecRow icon={<Layers className="size-4" />} label={d.type} value={project.details.type} />
              <SpecRow icon={<Home className="size-4" />} label={d.units} value={String(project.details.units)} />
              <SpecRow icon={<Layers className="size-4" />} label={d.floors} value={String(project.details.floors)} />
              <SpecRow icon={<Calendar className="size-4" />} label={d.delivery} value={project.details.delivery} />
            </div>

            {/* Amenities */}
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                {d.amenities}
              </p>
              <ul className="mt-4 space-y-2.5">
                {project.details.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="size-3.5 shrink-0 text-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function SpecRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="text-gold">{icon}</span>
        {label}
      </div>
      <span className="text-right text-sm">{value}</span>
    </div>
  );
}
