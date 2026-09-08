"use client";

import { useI18n } from "@/i18n";
import servicesData from "@/data/services.json";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Home, 
  Layers, 
  Trees, 
  Hammer, 
  Paintbrush,
  ArrowRight
} from "lucide-react";

const iconMap = {
  Building: Building2,
  Home: Home,
  Layers: Layers,
  Trees: Trees,
  Hammer: Hammer,
  Paintbrush: Paintbrush,
};

type ExampleProject = {
  slug: string;
  title: string;
  image: string;
};

type ServiceItem = {
  id: string;
  icon: keyof typeof iconMap;
  number: string;
  exampleProjects: ExampleProject[];
};

export function ServicesContent() {
  const { m, locale } = useI18n();

  const renderServiceCard = (service: ServiceItem, index: number) => {
    const Icon = iconMap[service.icon];
    const serviceData = m.pages?.services?.items?.[service.id];

    if (!serviceData) return null;

    const hasExamples = service.exampleProjects && service.exampleProjects.length > 0;

    return (
      <article
        key={service.id}
        className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:shadow-elevated hover:border-gold/50"
      >
        {/* Number Badge */}
        <div className="absolute top-6 end-6 z-10 text-6xl font-light text-muted-foreground/10 transition-all duration-500 group-hover:text-gold/20">
          {service.number}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Icon */}
          <div className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-primary-foreground">
            <Icon className="h-8 w-8" />
          </div>

          {/* Title & Description */}
          <h3 className="mb-4 text-2xl font-medium text-foreground transition-colors duration-300 group-hover:text-gold">
            {serviceData.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {serviceData.description}
          </p>
        </div>

        {/* Example Projects */}
        {hasExamples && (
          <div className="mt-auto border-t border-border bg-muted/30 p-6">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <span>{locale === "ar" ? "أمثلة من أعمالنا" : "Featured Work"}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2">
              {service.exampleProjects.slice(0, 2).map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group/img relative overflow-hidden rounded-md border border-border bg-muted transition-all duration-300 hover:shadow-md hover:border-gold/50"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 200px"
                      className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                      <div className="absolute bottom-3 start-3 flex items-center gap-1 text-xs text-white">
                        <span>{locale === "ar" ? "عرض المشروع" : "View Project"}</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>

                  {/* Project Title */}
                  <div className="p-3 bg-card">
                    <p className="text-xs font-medium text-foreground transition-colors duration-300 group-hover/img:text-gold line-clamp-1">
                      {project.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Hover Border Effect */}
        <div className="absolute bottom-0 start-0 h-1 w-0 bg-gold-gradient transition-all duration-500 group-hover:w-full" />
      </article>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      {/* Design Services Section */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-medium text-foreground lg:text-4xl">
            {m.pages?.services?.designServicesTitle || "Design Services"}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-gold-gradient" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {servicesData.designServices.map((service, index) => 
            renderServiceCard(service, index)
          )}
        </div>
      </section>

      {/* Construction Services Section */}
      <section>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-medium text-foreground lg:text-4xl">
            {m.pages?.services?.constructionServicesTitle || "Construction Services"}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-gold-gradient" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {servicesData.constructionServices.map((service, index) => 
            renderServiceCard(service, index)
          )}
        </div>
      </section>

      {/* Call to Action */}
      <div className="mt-20 rounded-lg border border-border bg-muted/50 p-12 text-center">
        <h3 className="mb-4 text-2xl font-medium text-foreground">
          {locale === "ar" 
            ? "جاهزون لبدء مشروعك؟" 
            : "Ready to Start Your Project?"}
        </h3>
        <p className="mb-8 text-muted-foreground">
          {locale === "ar"
            ? "تواصل معنا اليوم للحصول على استشارة مجانية ومناقشة احتياجات مشروعك."
            : "Contact us today for a free consultation and discuss your project needs."}
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:bg-gold/90 hover:shadow-lg"
        >
          {locale === "ar" ? "اتصل بنا" : "Contact Us"}
        </a>
      </div>
    </div>
  );
}
