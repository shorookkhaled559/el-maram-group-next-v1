"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "./messages/en.json";
import ar from "./messages/ar.json";

export type Locale = "en" | "ar";
export type Messages = typeof en;

const messages: Record<Locale, Messages> = { en, ar: ar as Messages };

export const STORAGE_KEY = "maram-locale";

type I18nValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  m: Messages;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

// Synchronous initialiser — runs once per session, eliminates the
// useEffect double-render that was causing all consumers to re-render on mount.
function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Lazy initialiser reads localStorage synchronously — no useEffect needed
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // Keep document attributes in sync when locale changes (toggle only, not on mount)
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setLocaleState(next);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      isRtl: locale === "ar",
      m: messages[locale],
      setLocale,
      toggleLocale: () => setLocale(locale === "ar" ? "en" : "ar"),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
