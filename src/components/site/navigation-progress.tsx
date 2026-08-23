"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Two visible states — the bar is either running or it isn't.
// The CSS animation handles the crawl entirely on the compositor thread,
// so zero JS runs on the main thread during navigation.
type State = "idle" | "running" | "finishing";

function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState<State>("idle");
  const prevUrl = useRef(`${pathname}?${searchParams}`);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const nextUrl = `${pathname}?${searchParams}`;
    if (nextUrl === prevUrl.current) return;
    prevUrl.current = nextUrl;

    if (doneTimer.current) clearTimeout(doneTimer.current);

    setState("running");

    // After route settles, snap to full and fade out
    doneTimer.current = setTimeout(() => {
      setState("finishing");
      doneTimer.current = setTimeout(() => setState("idle"), 400);
    }, 350);

    return () => {
      if (doneTimer.current) clearTimeout(doneTimer.current);
    };
  }, [pathname, searchParams]);

  if (state === "idle") return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[2px]">
      <div
        className="h-full bg-gold-gradient"
        style={
          state === "running"
            ? {
                // CSS-driven crawl to 85% over 8s — runs on compositor, zero JS ticks
                animation: "progress-crawl 8s cubic-bezier(0.1, 0.05, 0, 1) forwards",
              }
            : {
                // Snap to 100% then fade out
                width: "100%",
                opacity: 0,
                transition: "opacity 350ms ease",
              }
        }
      />
    </div>
  );
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <ProgressBar />
    </Suspense>
  );
}
