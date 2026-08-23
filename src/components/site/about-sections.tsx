"use client";

import Image from "next/image";
import { useI18n } from "@/i18n";
import about from "@/data/about.json";

export function AboutSections() {
  const { m } = useI18n();
  const sections = m.aboutPage.sections;

  return (
    <div>
      {about.sections.map((section, index) => {
        const copy = sections[section.id as keyof typeof sections];
        const imageRight = section.imagePosition === "right";

        return (
          <section
            key={section.id}
            className={`border-b border-border ${index % 2 !== 0 ? "bg-surface" : "bg-background"}`}
          >
            <div
              className={`mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24 ${
                imageRight ? "" : "lg:[direction:rtl] [&>*]:[direction:ltr]"
              }`}
            >
              {/* Text */}
              <div>
                <p className="eyebrow">{copy.eyebrow}</p>
                <h2 className="mt-4 text-3xl lg:text-5xl">{copy.title}</h2>
                <div className="mt-5 h-px w-10 bg-gold" />
                <p className="mt-6 text-sm leading-[1.95] text-muted-foreground">
                  {copy.body}
                </p>
              </div>

              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <Image
                src={section.image}
                alt={section.imageAlt}
                width={1200}
                height={900}
                priority={index === 0}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
