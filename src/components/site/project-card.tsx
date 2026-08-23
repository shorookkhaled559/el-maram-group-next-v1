"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectImages } from "@/lib/project-images";

export interface ProjectCardProps {
  slug: string;
  image: string;
  title: string;
  location: string;
  shortDescription: string;
  status: string;
  soldOut: boolean;
  viewMoreLabel: string;
  soldOutLabel: string;
}

export function ProjectCard({
  slug,
  image,
  title,
  location,
  shortDescription,
  status,
  soldOut,
  viewMoreLabel,
  soldOutLabel,
}: ProjectCardProps) {
  return (
    <article className="group flex flex-col">
      {/* Image */}
      <Link
        href={`/projects/${slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <Image
          src={projectImages[image]}
          alt={title}
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Status badge — always present */}
        <span className="absolute start-4 top-4 border border-white/25 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
          {status}
        </span>

        {/* Sold Out badge — only when soldOut is true */}
        {soldOut && (
          <span className="absolute end-4 top-4 bg-gold-gradient px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary-foreground">
            {soldOutLabel}
          </span>
        )}
      </Link>

      {/* Meta */}
      <p className="mt-5 text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
        {location}
      </p>
      <h3 className="mt-2 text-2xl">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {shortDescription}
      </p>

      {/* CTA */}
      <Link
        href={`/projects/${slug}`}
        className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold"
      >
        {viewMoreLabel}
        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
      </Link>
    </article>
  );
}
