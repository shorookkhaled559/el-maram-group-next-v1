"use client";

import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, X, MessageSquare, Twitter } from "lucide-react";
import site from "@/data/site-config.json";
import { useI18n } from "@/i18n";

const links = [
  { key: "hotline", href: site.hotlineHref, Icon: Phone },
  { key: "whatsapp", href: site.whatsappHref, Icon: MessageCircle },
  { key: "email", href: site.emailHref, Icon: Mail },
  { key: "instagram", href: site.social.instagram, Icon: Instagram },
  { key: "facebook", href: site.social.facebook, Icon: Facebook },
  { key: "twitter", href: site.social.twitter, Icon: Twitter },
] as const;

export function FloatingActions() {
  const { m } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 end-3 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:end-5">
      {/* Social Icons - Slide in from bottom */}
      <div className={`flex flex-col gap-2 transition-all duration-500 ${
        isOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {links.map(({ key, href, Icon }, index) => {
          const label = m.contact[key];
          return (
            <a
              key={key}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              title={label}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card/95 text-muted-foreground backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-gold hover:text-primary-foreground hover:shadow-gold/20 sm:size-12"
            >
              <Icon className="size-5" />
            </a>
          );
        })}
      </div>

      {/* Main Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
        className="group relative flex size-14 cursor-pointer items-center justify-center rounded-full bg-gold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gold/30 sm:size-16"
      >
        {/* Animated Ring */}
        <span className="absolute inset-0 rounded-full bg-gold opacity-75 animate-ping" 
              style={{ animationDuration: '2s' }} />
        
        {/* Rotating Glow */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold via-gold-soft to-gold opacity-50 blur-sm animate-spin" 
              style={{ animationDuration: '3s' }} />
        
        {/* Button Content */}
        <span className="relative z-10 transition-transform duration-300">
          {isOpen ? (
            <X className="size-6 sm:size-7" />
          ) : (
            <MessageSquare className="size-6 animate-pulse sm:size-7" />
          )}
        </span>
      </button>
    </div>
  );
}
