"use client";

import { useState, type FormEvent } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useI18n } from "@/i18n";

// Stub: trigger the PDF download / mailing list signup later.
async function onSubscribe(email: string) {
  console.log("Brochure request", email);
  // Simulated delay — remove once wired to a real API
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

export function Brochure() {
  const { m } = useI18n();
  const brochure = m.brochure;
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(event.currentTarget);
      await onSubscribe(String(form.get("email") ?? ""));
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="grid items-center gap-8 border border-border bg-card px-6 py-12 lg:grid-cols-2 lg:px-14">
        <div>
          <p className="eyebrow">{brochure.eyebrow}</p>
          <h2 className="mt-4 text-3xl lg:text-4xl">{brochure.title}</h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">{brochure.body}</p>
        </div>
        {done ? (
          <p className="text-sm text-gold lg:text-end">{brochure.successBody}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              name="email"
              type="email"
              required
              disabled={loading}
              placeholder={brochure.emailPlaceholder}
              aria-label={brochure.emailLabel}
              className="h-12 rounded-none"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 shrink-0 rounded-none px-7 text-xs uppercase tracking-[0.2em]"
            >
              {loading ? <Spinner /> : <><Download className="size-4" />{brochure.ctaLabel}</>}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
