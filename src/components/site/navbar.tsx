"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import nav from "@/data/nav.json";
import { useI18n } from "@/i18n";

const LOGO_URL = "/assets/maram-logo.png";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { m, locale, toggleLocale } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // True when the navbar should show its solid frosted background
  const solidBg = scrolled || open || pathname !== "/";
  // When transparent (dark mode, not scrolled, menu closed) use pure white for text
  const ghostText = !solidBg ? "text-white" : "text-muted-foreground";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solidBg
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-5 lg:h-28 lg:px-8">
        <Link href="/" className="flex items-center gap-4">
          <Image
              src={LOGO_URL}
              alt={`${m.site.companyName} logo`}
              width={96}
              height={96}
              sizes="80px"
              className="h-16 w-16 object-contain lg:h-30 lg:w-30"
            />
          <span className="flex flex-col leading-none">
            <span className={`font-display text-sm tracking-[0.5em] uppercase lg:text-[22px] transition-colors duration-500 ${!solidBg ? "text-white" : "text-foreground"}`}>
              {m.site.companyName}
            </span>
            <span className={`mt-1.4 text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 ${!solidBg ? "text-white/70" : "text-muted-foreground"}`}>
              {m.site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs uppercase tracking-[0.16em] transition-colors hover:text-gold whitespace-nowrap ${
                pathname === item.href ? "text-gold" : ghostText
              }`}
            >
              {m.nav.items[item.href as keyof typeof m.nav.items]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label={m.nav.language}
            onClick={toggleLocale}
            className={`gap-1.5 rounded-none px-2 text-[11px] uppercase tracking-[0.18em] hover:text-gold transition-colors duration-500 ${ghostText}`}
          >
            <Globe className="size-4" />
            {locale === "en" ? "AR" : "EN"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={m.nav.toggleTheme}
            onClick={toggle}
            className={`hover:text-gold transition-colors duration-500 ${ghostText}`}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button
            asChild
            className="hidden sm:inline-flex rounded-none px-6 text-xs uppercase tracking-[0.18em]"
          >
            <Link href={nav.cta.href}>{m.nav.cta}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={m.nav.toggleMenu}
            className="xl:hidden text-zinc-100 hover:text-gold"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {nav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-border/60 py-3 text-sm uppercase tracking-[0.16em] last:border-0 hover:text-gold ${
                  pathname === item.href ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {m.nav.items[item.href as keyof typeof m.nav.items]}
              </Link>
            ))}
            <Button asChild className="mt-4 rounded-none text-xs uppercase tracking-[0.18em]">
              <Link href={nav.cta.href} onClick={() => setOpen(false)}>
                {m.nav.cta}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
