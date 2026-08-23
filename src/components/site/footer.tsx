"use client";

import Image from "next/image";
import Link from "next/link";
import nav from "@/data/nav.json";
import site from "@/data/site-config.json";
import { useI18n } from "@/i18n";

const LOGO_URL = "/assets/maram-logo.png";

export function Footer() {
  const { m } = useI18n();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
                src={LOGO_URL}
                alt={`${m.site.companyName} logo`}
                width={56}
                height={56}
                sizes="56px"
                className="h-14 w-14 object-contain"
              />
            <span className="font-display text-lg uppercase tracking-[0.18em]">
              {m.site.companyName}
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">{site.address}</p>
        </div>

        <nav className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {nav.items.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gold">
              {m.nav.items[item.href as keyof typeof m.nav.items]}
            </Link>
          ))}
        </nav>

        <div className="space-y-2 text-sm text-muted-foreground">
          <a href={site.hotlineHref} dir="ltr" className="block text-start hover:text-gold">
            {site.hotline}
          </a>
          <a href={site.emailHref} dir="ltr" className="block text-start hover:text-gold">
            {site.email}
          </a>
          <a href={site.whatsappHref} dir="ltr" className="block text-start hover:text-gold">
            {m.contact.whatsapp} {site.whatsapp}
          </a>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        &copy; {new Date().getFullYear()} {m.site.companyName}. {m.site.rights}
      </div>
    </footer>
  );
}
