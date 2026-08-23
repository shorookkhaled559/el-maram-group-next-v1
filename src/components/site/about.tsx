"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import content from "@/data/homepage-content.json";
import { useI18n } from "@/i18n";

export function About() {
  const { m } = useI18n();
  const about = m.about;

  return (
    <section id="about" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-28">
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="mt-5 text-3xl lg:text-5xl">{about.title}</h2>
        </div>
        <div>
          <p className="text-sm leading-loose text-muted-foreground lg:text-base">{about.body}</p>
          <Button
            asChild
            variant="outline"
            className="mt-8 rounded-none px-7 text-xs uppercase tracking-[0.2em]"
          >
            <Link href={content.about.ctaHref}>
              {about.ctaLabel}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
