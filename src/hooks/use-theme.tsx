"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "maram-theme";

export type Theme = "dark" | "light";

type ThemeValue = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy initialiser — runs once per session, not once per mount
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Sync DOM class on first mount only (aligns with the inline anti-flash script)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  const value = { theme, toggle };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
