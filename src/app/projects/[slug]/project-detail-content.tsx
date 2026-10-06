"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight, MapPin, Building2, Ruler, Calendar, Palette, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface ProjectData {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  subtitle?: {
    en: string;
    ar: string;
  };
  image: string;
  hasDetails?: boolean;
  description?: {
    en: string;
    ar: string;
  };
  client?: string;
  clientAr?: string;
  location?: string;
  locationAr?: string;
  area?: string;
  year?: string;
  style?: string;
  styleAr?: string;
  projectType?: {
    en: string;
    ar: string;
  };
  mainMaterials?: {
    en: string;
    ar: string;
  };
  highlights?: Array<{
    en: string;
    ar: string;
    description?: {
      en: string;
      ar: string;
    };
  }>;
  designDetails?: Array<{
    en: string;
    ar: string;
  }>;
  gallery?: string[];
}

export interface ProjectDetailProps {
  project: ProjectData;
  locale: string;
}

export function ProjectDetailContent({ project, locale: localeProp }: ProjectDetailProps) {
  const { m, locale: contextLocale } = useI18n();
  const locale = localeProp === 'auto' ? contextLocale : localeProp;
  const isArabic = locale === "ar";
  const BackArrow = isArabic ? ArrowUpRight : ArrowUpLeft;

  // Embla Carousel for justified gallery with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // If project doesn't have details, show 404
  if (!project.hasDetails) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-20 text-center">
        <h1 className="text-4xl font-bold">
          {isArabic ? "المشروع غير متاح" : "Project Not Available"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {isArabic ? "هذا المشروع ليس له صفحة تفاصيل" : "This project doesn't have a details page"}
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 text-gold hover:underline"
        >
          <BackArrow className="size-4" />
          {isArabic ? "العودة للمشاريع" : "Back to Projects"}
        </Link>
      </div>
    );
  }

  const description = project.description?.[locale as 'en' | 'ar'] || project.description?.en || '';
  const projectTitle = isArabic ? (project.titleAr || project.title) : project.title;
  const projectSubtitle = project.subtitle?.[locale as 'en' | 'ar'] || project.subtitle?.en || project.style || '';
  const clientName = isArabic ? (project.clientAr || project.client) : project.client;
  const locationName = isArabic ? (project.locationAr || project.location) : project.location;
  const styleName = isArabic ? (project.styleAr || project.style) : project.style;

  return (
    <>
      {/* ── Hero Image ──────────────────────────────── */}
      <div className="relative aspect-[21/9] max-h-[70vh] w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-white lg:text-6xl drop-shadow-lg">
              {projectTitle}
            </h1>
            {projectSubtitle && (
              <p className="mt-3 text-xl text-white/90 drop-shadow">
                {projectSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-gold"
        >
          <BackArrow className="size-4" />
          {isArabic ? "العودة للمشاريع" : "Back to Projects"}
        </Link>

        {/* ── Project Overview Section ─────────────── */}
        <section className="mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">
              {isArabic ? "نظرة عامة على المشروع" : "Project Overview"}
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-gold-gradient" />
          </div>

          {/* ── Description & Project Info Grid ─────── */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gold">
                {isArabic ? "الوصف" : "Description"}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            {/* Project Information Card */}
            <div className="border border-border bg-card p-6 shadow-lg">
              <h3 className="text-lg font-semibold">
                {isArabic ? "معلومات المشروع" : "Project Information"}
              </h3>
              <div className="mt-6 space-y-4">
                {clientName && (
                  <InfoRow 
                    icon={<Building2 className="size-5" />} 
                    label={isArabic ? "العميل" : "Client"} 
                    value={clientName} 
                  />
                )}
                {locationName && (
                  <InfoRow 
                    icon={<MapPin className="size-5" />} 
                    label={isArabic ? "الموقع" : "Location"} 
                    value={locationName} 
                  />
                )}
                {project.area && (
                  <InfoRow 
                    icon={<Ruler className="size-5" />} 
                    label={isArabic ? "المساحة" : "Area"} 
                    value={project.area} 
                  />
                )}
                {project.year && (
                  <InfoRow 
                    icon={<Calendar className="size-5" />} 
                    label={isArabic ? "السنة" : "Year"} 
                    value={project.year} 
                  />
                )}
                {styleName && (
                  <InfoRow 
                    icon={<Palette className="size-5" />} 
                    label={isArabic ? "الطراز المعماري" : "Architectural Style"} 
                    value={styleName} 
                  />
                )}
                {project.projectType && (
                  <InfoRow 
                    icon={<Building2 className="size-5" />} 
                    label={isArabic ? "نوع المشروع" : "Project Type"} 
                    value={project.projectType[locale as 'en' | 'ar'] || project.projectType.en} 
                  />
                )}
                {project.mainMaterials && (
                  <InfoRow 
                    icon={<Layers className="size-5" />} 
                    label={isArabic ? "الخامات الرئيسية" : "Main Materials"} 
                    value={project.mainMaterials[locale as 'en' | 'ar'] || project.mainMaterials.en} 
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Architectural Highlights Section ─────── */}
        {project.highlights && project.highlights.length > 0 && (
          <section className="mt-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold lg:text-4xl">
                {isArabic ? "ابرز العناصر المعمارية" : "Architectural Highlights"}
              </h2>
              <div className="mx-auto mt-4 h-1 w-24 bg-gold-gradient" />
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {project.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden border border-border bg-card p-6 shadow-md transition-all duration-300 hover:border-gold hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gold-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                  <h3 className="relative text-xl font-semibold text-gold mb-3">
                    {highlight[locale as 'en' | 'ar'] || highlight.en}
                  </h3>
                  {highlight.description && (
                    <p className="relative text-sm leading-relaxed text-muted-foreground">
                      {highlight.description[locale as 'en' | 'ar'] || highlight.description.en}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Design Details Section ──────────────── */}
        {project.designDetails && project.designDetails.length > 0 && (
          <section className="mt-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold lg:text-4xl">
                {isArabic ? "تفاصيل التصميم" : "Design Details"}
              </h2>
              <div className="mx-auto mt-4 h-1 w-24 bg-gold-gradient" />
            </div>

            <div className="mx-auto mt-12 max-w-4xl">
              <ul className="grid gap-4 sm:grid-cols-2">
                {project.designDetails.map((detail, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md"
                  >
                    <span className="mt-1 text-gold">•</span>
                    <span className="text-sm leading-relaxed">
                      {detail[locale as 'en' | 'ar'] || detail.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Project Gallery Section (Infinite Scroll Strip) ─────────────── */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-20 overflow-hidden">
            <div className="text-center">
              <h2 className="text-3xl font-bold lg:text-4xl">
                {isArabic ? "معرض المشروع" : "Project Gallery"}
              </h2>
              <div className="mx-auto mt-4 h-1 w-24 bg-gold-gradient" />
            </div>

            {/* Infinite Scrolling Film Strip */}
            <div className="relative mt-12">
              <div className="film-strip-container">
                <div className="film-strip">
                  {/* First set of images */}
                  {project.gallery.map((image, index) => {
                    const widthClass = index % 3 === 0 ? 'w-80' : index % 3 === 1 ? 'w-96' : 'w-72';
                    return (
                      <div
                        key={`first-${index}`}
                        className={`flex-shrink-0 ${widthClass}`}
                        style={{ marginRight: '12px' }}
                      >
                        <div className="relative h-80 overflow-hidden bg-muted shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                          <Image
                            src={image}
                            alt={`${projectTitle} - ${index + 1}`}
                            fill
                            sizes="400px"
                            className="object-cover"
                            priority={index < 3}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    );
                  })}
                  {/* Duplicate set for seamless loop */}
                  {project.gallery.map((image, index) => {
                    const widthClass = index % 3 === 0 ? 'w-80' : index % 3 === 1 ? 'w-96' : 'w-72';
                    return (
                      <div
                        key={`second-${index}`}
                        className={`flex-shrink-0 ${widthClass}`}
                        style={{ marginRight: '12px' }}
                      >
                        <div className="relative h-80 overflow-hidden bg-muted shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                          <Image
                            src={image}
                            alt={`${projectTitle} - ${index + 1}`}
                            fill
                            sizes="400px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <style jsx>{`
              .film-strip-container {
                width: 100%;
                overflow: hidden;
                position: relative;
                padding: 10px 0;
                direction: ltr;
              }
              
              .film-strip {
                display: flex;
                width: fit-content;
                animation: scroll-left 30s linear infinite;
              }
              
              .film-strip:hover {
                animation-play-state: paused;
              }
              
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}</style>
          </section>
        )}

        {/* ── Contact CTA Section ─────────────────── */}
        <section className="mt-20 border-t border-border pt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold lg:text-3xl">
              {isArabic ? "مهتم بمشروع مماثل؟" : "Interested in a similar project?"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {isArabic 
                ? "تواصل معنا اليوم لمناقشة كيف يمكننا تحويل رؤيتك إلى واقع"
                : "Contact us today to discuss how we can bring your vision to life"
              }
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-gold-gradient px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-110"
            >
              {isArabic ? "تواصل معنا" : "Contact Us"}
              <ArrowUpRight className={`size-4 ${isArabic ? '-scale-x-100' : ''}`} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 border-b border-border pb-3">
      <span className="text-gold">{icon}</span>
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
