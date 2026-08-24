"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// ssr:false ensures Three.js never runs on the server
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/**
 * Client-only, lazy-loaded wrapper for the ambient 3D hero canvas.
 * Renders nothing during SSR and pauses the render loop when off-screen.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // PERF FIX: requestIdleCallback isn't available in every browser
    // (e.g. Safari), so fall back to a short timeout there.
    const scheduleIdle: (cb: () => void) => number =
      "requestIdleCallback" in window
        ? (cb) => window.requestIdleCallback(cb, { timeout: 1500 })
        : (cb) => window.setTimeout(cb, 300);
    const cancelIdle: (id: number) => void =
      "cancelIdleCallback" in window
        ? (id) => window.cancelIdleCallback(id)
        : (id) => window.clearTimeout(id);

    let idleId: number | null = null;
    const mountWhenIdle = () => {
      idleId = scheduleIdle(() => setMounted(true));
    };

    // PERF FIX: only mount the 3D layer once the rest of the page has
    // finished loading (window "load" event), so it never competes with
    // the hero text for main-thread time during first paint. This used
    // to be a flat 300ms setTimeout, which sometimes overlapped with the
    // page still rendering — that overlap was delaying LCP by 4+ seconds.
    if (document.readyState === "complete") {
      mountWhenIdle();
      return;
    }
    window.addEventListener("load", mountWhenIdle, { once: true });
    return () => {
      window.removeEventListener("load", mountWhenIdle);
      if (idleId !== null) cancelIdle(idleId);
    };
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {mounted ? (
        <Suspense fallback={null}>
          <HeroScene active={visible} />
        </Suspense>
      ) : null}
    </div>
  );
}