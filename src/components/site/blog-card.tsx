"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface BlogCardProps {
  slug: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readMoreLabel: string;
  locale: string;
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-KW" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({
  slug,
  image,
  category,
  date,
  title,
  excerpt,
  readMoreLabel,
  locale,
}: BlogCardProps) {
  return (
    <article className="group flex flex-col">
      {/* Image */}
      <Link
        href={`/blogs/${slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <Image
          src={image}
          alt={title}
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Category badge */}
        <span className="absolute start-4 top-4 border border-white/25 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
          {category}
        </span>
      </Link>

      {/* Date */}
      <p className="mt-5 text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
        {formatDate(date, locale)}
      </p>

      {/* Title */}
      <h3 className="mt-2 text-2xl">{title}</h3>

      {/* Excerpt */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {excerpt}
      </p>

      {/* CTA */}
      <Link
        href={`/blogs/${slug}`}
        className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold"
      >
        {readMoreLabel}
        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
      </Link>
    </article>
  );
}
