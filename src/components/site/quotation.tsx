"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useI18n } from "@/i18n";

export type QuotationLead = { name: string; phone: string; project: string; message?: string };

const PROJECTS = [
  { id: "hadaba-plaza", titleEn: "Al-Hadaba Plaza", titleAr: "الهضبة بلازا" },
];

async function onSubmit(lead: QuotationLead) {
  const response = await fetch("/api/send-quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send quote request");
  }

  return data;
}

export function Quotation() {
  const { m, locale } = useI18n();
  const quotation = m.quotation;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        setCanScrollUp(scrollTop > 0);
        setCanScrollDown(scrollTop + clientHeight < scrollHeight);
      }
    };

    if (isDropdownOpen) {
      checkScroll();
      scrollContainerRef.current?.addEventListener('scroll', checkScroll);
    }

    return () => {
      scrollContainerRef.current?.removeEventListener('scroll', checkScroll);
    };
  }, [isDropdownOpen]);

  const scrollUp = () => {
    scrollContainerRef.current?.scrollBy({ top: -60, behavior: 'smooth' });
  };

  const scrollDown = () => {
    scrollContainerRef.current?.scrollBy({ top: 60, behavior: 'smooth' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(event.currentTarget);
      await onSubmit({
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        project: selectedProject,
        message: String(form.get("message") ?? ""),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Quote submission error:", error);
      alert(error instanceof Error ? error.message : "حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = (projectTitle: string) => {
    setSelectedProject(projectTitle);
    setIsDropdownOpen(false);
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

              {/* Custom Dropdown */}
              <div className="space-y-2" ref={dropdownRef}>
                <Label className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {quotation.projectLabel}
                </Label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => !loading && setIsDropdownOpen(!isDropdownOpen)}
                    disabled={loading}
                    className={`flex h-12 w-full items-center justify-between border bg-card px-4 text-sm transition-all duration-300 outline-none ${
                      isDropdownOpen
                        ? "border-gold ring-2 ring-gold/20"
                        : "border-input hover:border-gold"
                    } ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${
                      selectedProject ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span>
                      {selectedProject || quotation.projectPlaceholder}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gold transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full border border-gold/30 bg-card shadow-2xl backdrop-blur-sm">
                      {/* Scroll Up Button */}
                      {canScrollUp && (
                        <button
                          type="button"
                          onClick={scrollUp}
                          className="flex w-full items-center justify-center border-b border-border bg-card py-2 text-gold transition-colors hover:bg-gold/10"
                        >
                          <ChevronUp className="h-5 w-5" />
                        </button>
                      )}

                      {/* Options Container */}
                      <div 
                        ref={scrollContainerRef}
                        className="custom-scrollbar max-h-60 overflow-y-auto"
                      >
                        {PROJECTS.map((project) => {
                          const title = locale === "ar" ? project.titleAr : project.titleEn;
                          const isSelected = selectedProject === title;
                          return (
                            <button
                              key={project.id}
                              type="button"
                              onClick={() => handleProjectSelect(title)}
                              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-all duration-200 ${
                                isSelected
                                  ? "bg-gold text-primary-foreground font-medium"
                                  : "text-foreground hover:bg-gold/10 hover:text-gold hover:translate-x-1"
                              }`}
                            >
                              <span>{title}</span>
                              {isSelected && <Check className="h-4 w-4" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Scroll Down Button */}
                      {canScrollDown && (
                        <button
                          type="button"
                          onClick={scrollDown}
                          className="flex w-full items-center justify-center border-t border-border bg-card py-2 text-gold transition-colors hover:bg-gold/10"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {!selectedProject && (
                  <p className="text-xs text-muted-foreground">
                    * {locale === "ar" ? "اختر مشروع" : "Select a project"}
                  </p>
                )}
              </div>

              {/* Message/Note Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {locale === "ar" ? "ملاحظات (اختياري)" : "Notes (Optional)"}
                </Label>
                <textarea
                  id="message"
                  name="message"
                  disabled={loading}
                  placeholder={locale === "ar" ? "أضف أي ملاحظات إضافية..." : "Add any additional notes..."}
                  rows={4}
                  className="w-full border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground hover:border-gold focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading || !selectedProject}
                className="w-full rounded-none text-xs uppercase tracking-[0.2em]"
              >
                {loading ? <Spinner /> : quotation.submit}
              </Button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
