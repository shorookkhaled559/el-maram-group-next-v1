"use client";

import { useI18n } from "@/i18n";

export function HowWeWork() {
  const { m } = useI18n();
  const howWeWork = m.howWeWork;

  const steps = [
    {
      number: "01",
      title: howWeWork.steps.consultation.title,
      description: howWeWork.steps.consultation.description,
    },
    {
      number: "02",
      title: howWeWork.steps.siteInspection.title,
      description: howWeWork.steps.siteInspection.description,
    },
    {
      number: "03",
      title: howWeWork.steps.conceptDesign.title,
      description: howWeWork.steps.conceptDesign.description,
    },
    {
      number: "04",
      title: howWeWork.steps.detailedDesign.title,
      description: howWeWork.steps.detailedDesign.description,
    },
    {
      number: "05",
      title: howWeWork.steps.executionSupervision.title,
      description: howWeWork.steps.executionSupervision.description,
    },
    {
      number: "06",
      title: howWeWork.steps.deliveryFollowup.title,
      description: howWeWork.steps.deliveryFollowup.description,
    },
  ];

  return (
    <section id="how-we-work" className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="text-center">
          <p className="eyebrow">{howWeWork.eyebrow}</p>
          <h2 className="mt-5 text-3xl lg:text-5xl">{howWeWork.title}</h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative overflow-hidden border border-border bg-surface p-8 transition-all duration-300 hover:border-gold lg:p-10"
            >
              {/* Step Number */}
              <div className="mb-6 flex items-start justify-between">
                <span className="text-6xl font-bold text-gold/20 transition-colors duration-300 group-hover:text-gold/40 lg:text-7xl">
                  {step.number}
                </span>
                <div className="h-px flex-1 self-center bg-border transition-colors duration-300 group-hover:bg-gold ltr:ml-6 rtl:mr-6" />
              </div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-semibold lg:text-2xl [word-break:keep-all]">{step.title}</h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base [word-break:keep-all] [overflow-wrap:break-word]">
                {step.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gold/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-gold/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
