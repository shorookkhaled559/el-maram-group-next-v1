"use client";

import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import site from "@/data/site-config.json";
import { useI18n } from "@/i18n";

const links = [
  { key: "hotline", href: site.hotlineHref, Icon: Phone },
  { key: "whatsapp", href: site.whatsappHref, Icon: MessageCircle },
  { key: "instagram", href: site.social.instagram, Icon: Instagram },
  { key: "facebook", href: site.social.facebook, Icon: Facebook },
  { key: "linkedin", href: site.social.linkedin, Icon: Linkedin },
  { key: "email", href: site.emailHref, Icon: Mail },
] as const;

export function FloatingActions() {
  const { m } = useI18n();

  return (
    <div className="fixed bottom-4 end-3 z-40 flex flex-col gap-2 sm:bottom-6 sm:end-5">
      {links.map(({ key, href, Icon }) => {
        const label = m.contact[key];
        return (
          <a
            key={key}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="flex size-9 items-center justify-center border border-border bg-card/90 text-muted-foreground backdrop-blur transition-colors hover:border-gold hover:text-gold sm:size-11"
          >
            <Icon className="size-4" />
          </a>
        );
      })}
    </div>
  );
}
