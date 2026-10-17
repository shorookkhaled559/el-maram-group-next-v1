"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n";
import { 
  ArrowUpRight, 
  Pencil, 
  Home, 
  Building2, 
  Building,
  MapPin
} from "lucide-react";

const categories = [
  {
    key: "Design",
    icon: Pencil,
    image: "/assets/categories/design.jpg",
    subcategories: [
      { key: "Interior", icon: Home, image: "/assets/categories/interior.jpg" },
      { key: "Exterior", icon: Building, image: "/assets/categories/exterior.jpg" },
    ],
  },
  {
    key: "Construction",
    icon: Building2,
    image: "/assets/categories/construction.jpg",
    subcategories: [],
  },
  {
    key: "Real Estate",
    icon: MapPin,
    image: "/assets/categories/real-estate.jpg",
    subcategories: [],
  },
];

export function ExploreCategories() {
  const { m } = useI18n();
  const exploreCategories = m.exploreCategories;

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="text-center">
          <p className="eyebrow">{exploreCategories.eyebrow}</p>
          <h2 className="mt-5 text-3xl lg:text-5xl">{exploreCategories.title}</h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <Link
                key={index}
                href={`/projects?category=${category.key}`}
                className="group relative block h-80 overflow-hidden border border-border bg-card transition-all duration-300 hover:border-gold hover:shadow-elevated lg:h-96"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={m.projects?.categories?.[category.key] || category.key}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-6 lg:p-8">
                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-gold/50 bg-gold/10 text-gold backdrop-blur-sm transition-all duration-300 group-hover:border-gold group-hover:bg-gold/20 lg:h-16 lg:w-16">
                    <IconComponent className="h-7 w-7 lg:h-8 lg:w-8" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white lg:text-3xl">
                    {m.projects?.categories?.[category.key] || category.key}
                  </h3>
                  
                  {/* View Projects Link */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gold transition-all duration-300 group-hover:gap-3">
                    <span>{exploreCategories.viewProjects}</span>
                    <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Subcategories Section - Interior & Exterior */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {categories[0].subcategories.map((sub, subIndex) => {
            const SubIconComponent = sub.icon;
            return (
              <Link
                key={subIndex}
                href={`/projects?category=Design/${sub.key}`}
                className="group relative block h-64 overflow-hidden border border-border bg-card transition-all duration-300 hover:border-gold hover:shadow-lg lg:h-80"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={sub.image}
                    alt={m.projects?.categories?.[sub.key] || sub.key}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-6 lg:p-8">
                  {/* Icon */}
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-gold/50 bg-gold/10 text-gold backdrop-blur-sm transition-all duration-300 group-hover:border-gold group-hover:bg-gold/20 lg:h-14 lg:w-14">
                    <SubIconComponent className="h-6 w-6 lg:h-7 lg:w-7" />
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-xl font-semibold text-white lg:text-2xl">
                    {m.projects?.categories?.[sub.key] || sub.key}
                  </h4>

                  {/* Arrow */}
                  <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-gold opacity-0 transition-all duration-300 group-hover:opacity-100 rtl:-scale-x-100" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:text-gold/80"
          >
            {exploreCategories.viewAll}
            <ArrowUpRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
