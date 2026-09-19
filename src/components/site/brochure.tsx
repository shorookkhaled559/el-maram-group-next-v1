"use client";

import { useState, type FormEvent } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useI18n } from "@/i18n";

// Send brochure request to API
async function onSubscribe(email: string) {
  const response = await fetch("/api/send-brochure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send brochure");
  }

  return data;
}

export function Brochure() {
  const { m } = useI18n();
  const brochure = m.brochure;
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const form = new FormData(event.currentTarget);
      await onSubscribe(String(form.get("email") ?? ""));
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حصل خطأ، من فضلك حاولي تاني");
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
          <div className="flex flex-col gap-3">
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
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
