"use client";

import Image from "next/image";
import { useI18n } from "@/i18n";
import partnersData from "@/data/partners.json";

export function SuccessPartners() {
  const { m } = useI18n();
  const successPartners = m.successPartners;

  // Get partners from JSON
  const partners = partnersData.partners;
  const stats = partnersData.stats;

  // Duplicate the array for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="relative overflow-hidden border-y border-border bg-gradient-to-b from-background via-surface to-background py-20 lg:py-28">
      {/* Decorative Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="eyebrow">{successPartners.eyebrow}</p>
          <h2 className="mt-5 text-3xl lg:text-5xl">{successPartners.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground lg:text-base">
            {successPartners.subtitle}
          </p>
        </div>

        {/* Animated Partners Grid */}
        <div className="relative mt-16">
          {/* Scrolling Container */}
          <div className="flex animate-marquee gap-8 py-8 lg:gap-12">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="group relative flex h-24 w-48 shrink-0 items-center justify-center rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-gold hover:shadow-lg lg:h-28 lg:w-56 lg:p-8"
              >
                {/* Logo Placeholder - replace with actual Image when you have logos */}
                <div className="relative h-full w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-gold/0 transition-all duration-300 group-hover:bg-gold/5" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats or CTA */}
        <div className="mt-12 flex items-center justify-center gap-8 text-center lg:gap-12">
          <div>
            <div className="text-3xl font-bold text-gold lg:text-4xl">{stats.partnersCount}+</div>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {successPartners.partnersCount}
            </p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div>
            <div className="text-3xl font-bold text-gold lg:text-4xl">{stats.projectsCount}+</div>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {successPartners.projectsCount}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
