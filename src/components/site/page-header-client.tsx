"use client";

import { useI18n } from "@/i18n";
import { PageHeader } from "@/components/site/page-header";

type PageKey = keyof ReturnType<typeof useI18n>["m"]["pages"];

interface PageHeaderClientProps {
  pageKey: PageKey;
}

export function PageHeaderClient({ pageKey }: PageHeaderClientProps) {
  const { m } = useI18n();
  const p = m.pages[pageKey];
  return <PageHeader eyebrow={p.eyebrow} heading={p.heading} subheading={p.subheading} />;
}
