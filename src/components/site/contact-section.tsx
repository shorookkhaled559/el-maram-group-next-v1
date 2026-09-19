"use client";

import { useState, type FormEvent } from "react";
import { Check, MapPin, Phone, Mail, Clock, MessageCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useI18n } from "@/i18n";
import site from "@/data/site-config.json";

async function sendMessage(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const response = await fetch("/api/send-contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send message");
  }

  return result;
}

export function ContactSection() {
  const { m, locale } = useI18n();
  const copy = m.contactPage;
  const f = copy.form;
  const info = copy.info;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get localized address and locations
  const address = typeof site.address === 'string' 
    ? site.address 
    : site.address[locale as 'ar' | 'en'] || site.address.en;
    
  const locations = typeof site.locations === 'string'
    ? site.locations
    : site.locations[locale as 'ar' | 'en'] || site.locations.en;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData(e.currentTarget);
      await sendMessage({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        message: String(fd.get("message") ?? ""),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Contact form error:", error);
      alert(error instanceof Error ? error.message : "حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Form + info ──────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_380px] lg:px-8 lg:py-24">

          {/* Form card */}
          <div className="border border-border bg-card p-6 shadow-elevated lg:p-10">
            <p className="eyebrow">{f.eyebrow}</p>
            <h2 className="mt-4 text-3xl lg:text-4xl">{f.heading}</h2>
            <p className="mt-4 text-sm leading-loose text-muted-foreground">{f.body}</p>

            <div className="mt-8">
              {submitted ? (
                <div className="flex flex-col items-start gap-4 py-6">
                  <span className="flex size-11 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground">
                    <Check className="size-5" />
                  </span>
                  <h3 className="text-2xl">{f.successTitle}</h3>
                  <p className="text-sm text-muted-foreground">{f.successBody}</p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Name + Email side by side on wide screens */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="c-name" className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {f.nameLabel}
                      </Label>
                      <Input id="c-name" name="name" required disabled={loading}
                        placeholder={f.namePlaceholder} className="h-12 rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-email" className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {f.emailLabel}
                      </Label>
                      <Input id="c-email" name="email" type="email" required disabled={loading}
                        placeholder={f.emailPlaceholder} className="h-12 rounded-none" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="c-phone" className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {f.phoneLabel}
                    </Label>
                    <Input id="c-phone" name="phone" type="tel" dir="ltr" disabled={loading}
                      placeholder={f.phonePlaceholder} className="h-12 rounded-none text-start" />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="c-message" className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {f.messageLabel}
                    </Label>
                    <textarea
                      id="c-message"
                      name="message"
                      required
                      disabled={loading}
                      rows={5}
                      placeholder={f.messagePlaceholder}
                      className="w-full resize-none border border-input bg-transparent px-3 py-3 text-sm outline-none transition-all duration-300 hover:border-gold focus:border-gold focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={loading}
                    className="w-full rounded-none text-xs uppercase tracking-[0.2em]">
                    {loading ? <Spinner /> : f.submit}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Info sidebar */}
          <aside className="flex flex-col gap-6">
            <p className="eyebrow">{info.eyebrow}</p>

            <InfoRow 
              icon={<MapPin className="size-4 shrink-0 text-gold" />} 
              label={locale === 'ar' ? 'العنوان' : 'Address'} 
              value={address} 
            />
            <InfoRow 
              icon={<MapPin className="size-4 shrink-0 text-gold" />} 
              label={locale === 'ar' ? 'المواقع' : 'Locations'} 
              value={locations} 
            />
            <InfoRow icon={<Phone className="size-4 shrink-0 text-gold" />} label={info.phone}
              value={<a href={site.hotlineHref} dir="ltr" className="hover:text-gold transition-colors">{site.hotline}</a>} />
            <InfoRow 
              icon={<Mail className="size-4 shrink-0 text-gold" />} 
              label={info.email}
              value={
                <div className="flex flex-col gap-1">
                  <a href={site.emailHref} className="hover:text-gold transition-colors lowercase">
                    {site.email}
                  </a>
                  <a href={site.email2Href} className="hover:text-gold transition-colors lowercase">
                    {site.email2}
                  </a>
                </div>
              } 
            />
            <InfoRow 
              icon={<MessageCircle className="size-4 shrink-0 text-gold" />} 
              label={locale === 'ar' ? 'واتساب' : 'WhatsApp'}
              value={<a href={site.whatsappHref} dir="ltr" className="hover:text-gold transition-colors">{site.whatsapp}</a>} 
            />
            <InfoRow 
              icon={<Globe className="size-4 shrink-0 text-gold" />} 
              label={locale === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
              value={<a href={site.websiteHref} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-gold transition-colors lowercase">{site.website}</a>} 
            />
            <InfoRow icon={<Clock className="size-4 shrink-0 text-gold" />} label={info.hours} value={info.hoursValue} />
          </aside>
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <p className="eyebrow">{copy.map.eyebrow}</p>
          <h2 className="mt-4 text-3xl lg:text-4xl">{copy.map.heading}</h2>

          {/* Google Maps Embed */}
          <div className="relative mt-10 aspect-[16/7] w-full overflow-hidden border border-border bg-muted rounded-lg">
            <iframe
              src={site.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={locale === 'ar' ? 'موقعنا على الخريطة' : 'Our Location on Map'}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-6">
      <p className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">{label}</p>
      <div className="mt-2.5 flex items-start gap-2.5 text-sm">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
