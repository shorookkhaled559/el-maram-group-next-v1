"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";
import { useI18n } from "@/i18n";
import type { BlogPostProps } from "./page";

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-KW" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogPostContent({ post }: BlogPostProps) {
  const { m, locale } = useI18n();
  const copy = m.blogsPage;
  const BackArrow = locale === "ar" ? ArrowUpRight : ArrowUpLeft;

  return (
    <>
      {/* ── Hero image ──────────────────────────────── */}
      <div className="relative aspect-[21/9] max-h-[60vh] w-full overflow-hidden bg-muted">
        <Image
          src={post.image}
          alt={post.title}
          width={2100}
          height={900}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute bottom-6 start-6 border border-white/25 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
          {post.category}
        </span>
      </div>

      {/* ── Article body ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        {/* Back link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-gold"
        >
          <BackArrow className="size-3.5 rtl:-scale-x-100" />
          {copy.backToBlogs}
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_280px]">
          {/* Left — article */}
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl lg:text-6xl">{post.title}</h1>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            {/* Divider */}
            <div className="my-8 h-px bg-border" />

            {/* Body paragraphs */}
            <div className="space-y-6">
              {post.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm leading-[1.95] text-muted-foreground">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Right — meta card */}
          <aside className="h-fit border border-border bg-card p-8 shadow-elevated">
            <h2 className="text-base">{copy.aboutPost}</h2>
            <div className="mt-6 space-y-5">
              {/* Date */}
              <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <Calendar className="size-4 text-gold" />
                  {copy.published}
                </div>
                <span className="text-right text-sm">{formatDate(post.date, locale)}</span>
              </div>

              {/* Category */}
              <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <Tag className="size-4 text-gold" />
                  {copy.category}
                </div>
                <span className="text-right text-sm">{post.category}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
