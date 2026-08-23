"use client";

import Image from "next/image";
import { useI18n } from "@/i18n";
import team from "@/data/team.json";

export function TeamSection() {
  const { m } = useI18n();
  const copy = m.mgToday.team;

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {/* Section header */}
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-4 text-3xl lg:text-5xl">{copy.heading}</h2>

        {/* Team grid */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.items.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center border border-border bg-card px-6 pb-8 pt-10 text-center"
            >
              {/* Circular avatar */}
              <div className="relative size-38 shrink-0 overflow-hidden rounded-full ring-2 ring-border ring-offset-2 ring-offset-card">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={224}
                  height={224}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Name */}
              <h3 className="mt-5 text-xl">{member.name}</h3>

              {/* Role */}
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.26em] text-gold">
                {member.role}
              </p>

              {/* Divider */}
              <div className="my-5 h-px w-8 bg-border" />

              {/* Bio */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
