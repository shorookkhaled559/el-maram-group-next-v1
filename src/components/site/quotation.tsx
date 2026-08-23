"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import projects from "@/data/projects.json";
import { useI18n } from "@/i18n";

export type QuotationLead = { name: string; phone: string; project: string };

// Stub: wire this to an API route or CRM later.
async function onSubmit(lead: QuotationLead) {
  console.log("Quotation request", lead);
  // Simulated delay — remove once wired to a real API
  await new Promise((resolve) => setTimeout(resolve, 1400));
}

export function Quotation() {
  const { m } = useI18n();
  const quotation = m.quotation;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(event.currentTarget);
      await onSubmit({
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        project: String(form.get("project") ?? ""),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quotation" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p className="eyebrow">{quotation.eyebrow}</p>
          <h2 className="mt-5 text-3xl lg:text-5xl">{quotation.title}</h2>
          <p className="mt-5 max-w-md text-sm leading-loose text-muted-foreground">
            {quotation.body}
          </p>
        </div>

        <div className="border border-border bg-card p-6 shadow-elevated lg:p-10">
          {submitted ? (
            <div className="flex h-full flex-col items-start justify-center gap-4 py-8">
              <span className="flex size-11 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground">
                <Check className="size-5" />
              </span>
              <h3 className="text-2xl">{quotation.successTitle}</h3>
              <p className="text-sm text-muted-foreground">{quotation.successBody}</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {quotation.nameLabel}
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  disabled={loading}
                  placeholder={quotation.namePlaceholder}
                  className="h-12 rounded-none"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {quotation.phoneLabel}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  dir="ltr"
                  disabled={loading}
                  placeholder={quotation.phonePlaceholder}
                  className="h-12 rounded-none text-start"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="project"
                  className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {quotation.projectLabel}
                </Label>
                <select
                  id="project"
                  name="project"
                  required
                  disabled={loading}
                  defaultValue=""
                  className="h-12 w-full border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50"
                >
                  <option value="" disabled>
                    {quotation.projectPlaceholder}
                  </option>
                  {projects.items.map((project) => {
                    const title =
                      m.projects.items[project.id as keyof typeof m.projects.items].title;
                    return (
                      <option key={project.id} value={title}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-none text-xs uppercase tracking-[0.2em]"
              >
                {loading ? <Spinner /> : quotation.submit}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
