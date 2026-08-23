"use client";

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import content from "@/data/homepage-content.json";
import { useI18n } from "@/i18n";
import { HeroCanvas } from "./hero-canvas";

const { hero } = content;

function Marquee() {
  const { m, isRtl } = useI18n();
  const line = [...m.hero.marquee, ...m.hero.marquee];
  return (
    <div className="relative overflow-hidden border-y border-border bg-background/80 py-3">
      <div
        className={`flex w-max gap-8 whitespace-nowrap ${isRtl ? "animate-marquee-rtl" : "animate-marquee"}`}
        dir="ltr"
      >
        {line.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-8 text-[10px] uppercase tracking-[0.36em] text-muted-foreground"
          >
            {word}
            <span className="text-gold">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { m } = useI18n();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <Image
        src="/assets/hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      {/* Ambient 3D layer sits above the background image but below the readability gradient. */}
      <HeroCanvas className="pointer-events-none absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/70 to-black/75" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-10 lg:px-8">
        <p className="animate-rise text-[0.6875rem] uppercase tracking-[0.32em] text-gold-soft">
          {m.hero.eyebrow}
        </p>
        <h1 className="animate-rise mt-5 max-w-4xl text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          {m.hero.title}
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
          {m.hero.subtitle}
        </p>
        <div className="animate-rise mt-9 flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-none px-8 text-xs uppercase tracking-[0.2em]"
          >
            <a href={hero.ctaHref}>
              {m.hero.ctaLabel}
              <ArrowDownRight className="size-4 rtl:-scale-x-100" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-none border-white/40 bg-white/5 px-8 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/15 hover:text-white"
          >
            <a href={hero.secondaryCtaHref}>{m.hero.secondaryCtaLabel}</a>
          </Button>
        </div>
      </div>

      <div className="relative mt-8">
        <Marquee />
      </div>
    </section>
  );
}