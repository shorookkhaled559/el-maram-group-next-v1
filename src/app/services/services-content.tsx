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

  return (
    <div className="min-h-screen bg-background">
      {/* Design Services Section */}
      <section className="relative overflow-hidden bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.5fr_1fr] lg:gap-12 lg:px-8">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center">
            {/* Section Number & Title */}
            <div className="mb-6">
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                01 —
              </p>
              <h2 className="mb-4 font-display text-4xl font-light text-foreground lg:text-5xl">
                {m.pages?.services?.designServicesTitle || "Design Services"}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {locale === "ar" 
                  ? "نحول الأفكار إلى مساحات. فريق التصميم لدينا يبتكر حلولاً وظيفية وأنيقة ومخصصة تعكس رؤيتك وأسلوب حياتك."
                  : "We turn ideas into spaces. Our design team creates functional, elegant, and personalized solutions that reflect your vision and lifestyle."}
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {servicesData.designServices.map((service) => {
                const Icon = iconMap[service.icon];
                const serviceData = m.pages?.services?.items?.[service.id];
                if (!serviceData) return null;

                return (
                  <div
                    key={service.id}
                    className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-card"
                  >
                    {/* Icon */}
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-base font-medium text-foreground">
                      {serviceData.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {serviceData.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:bg-gold/90"
              >
                <span>{locale === "ar" ? "استكشف خدمات التصميم" : "Explore Design Services"}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Signature */}
            <div className="mt-8">
              <p className="font-display text-2xl text-gold/60">
                {locale === "ar" ? "صمم حلمك" : "Design Your Dream"}
              </p>
            </div>
          </div>

          {/* Right Side - Images Grid */}
          <div className="flex flex-col justify-center mt-8 lg:mt-12">
            <div className="grid auto-rows-fr grid-cols-2 gap-4">
              {servicesData.designServices.slice(0, 4).map((service, index) => {
                const project = service.exampleProjects?.[0];
                if (!project) return null;

                return (
                  <Link
                    key={service.id}
                    href={`/projects/${project.slug}`}
                    className={`group relative overflow-hidden rounded-lg ${
                      index === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
                    }`}
                  >
                    {/* Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes={index === 0 ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 50vw, 20vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Label */}
                    <div className="absolute bottom-4 start-4 end-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 transition-all duration-300 group-hover:text-white">
                        {m.pages?.services?.items?.[service.id]?.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Construction Services Section */}
      <section className="relative overflow-hidden bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_1.5fr] lg:gap-12 lg:px-8">
          {/* Left Side - Large Image */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg lg:aspect-auto lg:max-h-[500px]">
            {servicesData.constructionServices[0]?.exampleProjects?.[0] && (
              <>
                <Image
                  src={servicesData.constructionServices[0].exampleProjects[0].image}
                  alt="Construction Services"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />

                {/* Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-8 start-8 end-8">
                  <p className="mb-2 font-display text-xs uppercase tracking-[0.3em] text-white/60">
                    {locale === "ar" ? "أساسات قوية" : "Strong Foundations"}
                  </p>
                  <p className="font-display text-2xl text-white lg:text-3xl">
                    {locale === "ar" ? "غد أكثر إشراقاً" : "Brighter Tomorrows"}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col justify-center">
            {/* Section Number & Title */}
            <div className="mb-6">
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                02 —
              </p>
              <h2 className="mb-4 font-display text-4xl font-light text-foreground lg:text-5xl">
                {m.pages?.services?.constructionServicesTitle || "Construction Services"}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {locale === "ar"
                  ? "نقدم حلول بناء عالية الجودة بدقة وموثوقية واهتمام بالتفاصيل. من الأعمال الخرسانية إلى التشطيبات النهائية، فريقنا يضمن بناء مشروعك بأعلى المعايير."
                  : "We deliver high-quality construction solutions with precision, reliability, and attention to detail. From groundwork to final finishes, our team ensures your project is built to the highest standards."}
              </p>
            </div>

            {/* Service Cards */}
            <div className="space-y-4">
              {servicesData.constructionServices.map((service) => {
                const Icon = iconMap[service.icon];
                const serviceData = m.pages?.services?.items?.[service.id];
                if (!serviceData) return null;

                return (
                  <div
                    key={service.id}
                    className="group flex items-start gap-4 rounded-lg border border-border bg-background/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-background"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="mb-1 text-base font-medium text-foreground">
                        {serviceData.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {serviceData.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:bg-gold/90"
              >
                <span>{locale === "ar" ? "استكشف خدمات البناء" : "Explore Construction Services"}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Signature */}
            <div className="mt-8">
              <p className="font-display text-2xl text-gold/60">
                {locale === "ar" ? "بناء للمستقبل" : "Built to Last"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/assets/CTA_bg.png"
                alt="Background"
                fill
                sizes="100vw"
                className="object-cover"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-8 py-20 text-center lg:px-16 lg:py-24">
              <h3 className="mb-4 font-display text-3xl font-light text-white lg:text-4xl">
                {locale === "ar" 
                  ? "جاهزون لبدء مشروعك؟" 
                  : "Ready to Start Your Project?"}
              </h3>
              <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/80">
                {locale === "ar"
                  ? "تواصل معنا اليوم للحصول على استشارة مجانية ومناقشة احتياجات مشروعك."
                  : "Contact us today for a free consultation and discuss your project needs."}
              </p>
              <div>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-md bg-gold px-8 py-4 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/20"
                >
                  <span>{locale === "ar" ? "تواصل معنا" : "Contact Us"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
