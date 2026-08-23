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
    // Defer mounting until after first paint so it never blocks the hero.
    const id = window.setTimeout(() => setMounted(true), 300);
    return () => window.clearTimeout(id);
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
