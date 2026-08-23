"use client";

import Image from "next/image";
import { useI18n } from "@/i18n";
import news from "@/data/news.json";

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-KW" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string, locale: string) {
  return new Date(iso).toLocaleTimeString(locale === "ar" ? "ar-KW" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NewsSection() {
  const { m, locale } = useI18n();
  const copy = m.mgToday.news;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {/* Section header */}
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-4 text-3xl lg:text-5xl">{copy.heading}</h2>

        {/* Articles */}
        <div className="mt-14 space-y-20">
          {news.items.map((article, index) => (
            <article
              key={article.id}
              className={`grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 ${
                index % 2 !== 0 ? "lg:[direction:rtl] [&>*]:[direction:ltr]" : ""
              }`}
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={1600}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center">
                {/* Date & time */}
                <p className="text-[10px] uppercase tracking-[0.26em] text-gold">
                  {formatDate(article.date, locale)}
                  <span className="mx-2 text-border">·</span>
                  {formatTime(article.date, locale)}
                </p>

                <h3 className="mt-4 text-2xl lg:text-3xl">{article.title}</h3>

                {/* Body — split on \n\n into separate paragraphs */}
                <div className="mt-5 space-y-4">
                  {article.body.split("\n\n").map((para, i) => (
                    <p key={i} className="text-sm leading-[1.95] text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
