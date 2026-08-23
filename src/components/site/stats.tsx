"use client";

import { useCountUp } from "@/hooks/use-count-up";
import stats from "@/data/stats.json";
import { useI18n } from "@/i18n";

function Stat({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="border-t border-border pt-6">
      <span ref={ref} className="font-display text-5xl text-gold lg:text-6xl">
        {current.toLocaleString()}
        {suffix}
      </span>
      <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
    </div>
  );
}

export function Stats() {
  const { m } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <h2 className="max-w-lg text-3xl lg:text-4xl">{m.stats.heading}</h2>
      <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
        {stats.items.map((item) => (
          <Stat
            key={item.key}
            label={m.stats.items[item.key as keyof typeof m.stats.items]}
            value={item.value}
            suffix={item.suffix}
          />
        ))}
      </div>
    </section>
  );
}
