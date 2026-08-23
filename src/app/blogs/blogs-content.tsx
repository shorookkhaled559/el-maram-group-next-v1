"use client";

import { useState } from "react";
import { BlogCard } from "@/components/site/blog-card";
import { PageHeader } from "@/components/site/page-header";
import blogs from "@/data/blogs.json";
import { useI18n } from "@/i18n";

const categories = Array.from(new Set(blogs.items.map((b) => b.category)));

export function BlogsContent() {
  const { m, locale } = useI18n();
  const copy = m.blogsPage;
  const [active, setActive] = useState<string | null>(null);

  const filtered =
    active === null
      ? blogs.items
      : blogs.items.filter((b) => b.category === active);

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        heading={copy.pageHeading}
        subheading={copy.pageSubheading}
      />

      {/* ── Category filter ──────────────────────────── */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-5 lg:px-8">
          <button
            onClick={() => setActive(null)}
            className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
              active === null
                ? "bg-gold-gradient text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
            }`}
          >
            {copy.allCategories}
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                active === cat
                  ? "bg-gold-gradient text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Blog grid ────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard
              key={post.id}
              slug={post.slug}
              image={post.image}
              category={post.category}
              date={post.date}
              title={post.title}
              excerpt={post.excerpt}
              readMoreLabel={copy.readMore}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </>
  );
}
