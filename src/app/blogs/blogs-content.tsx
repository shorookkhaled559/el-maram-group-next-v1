"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Building2,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { BlogCard } from "@/components/site/blog-card";
import { PageHeader } from "@/components/site/page-header";
import blogs from "@/data/blogs.json";
import { useI18n } from "@/i18n";

const categories = Array.from(new Set(blogs.items.map((b) => b.category)));

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogsContent() {
  const { m, locale } = useI18n();
  const copy = m.blogsPage;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(blogs.items[0]?.id || null);

  // Get the selected blog post
  const currentPost = blogs.items.find((b) => b.id === selectedPost);
  
  // Get other posts for suggestions (exclude current)
  const otherPosts = blogs.items.filter((b) => {
    if (activeCategory === null) return true;
    const postCategory = getText(b.category);
    return postCategory === activeCategory;
  });

  if (!currentPost) return null;

  // Helper to get localized text
  const getText = (field: any) => {
    if (typeof field === 'string') return field;
    return field[locale as 'ar' | 'en'] || field.en;
  };

  const title = getText(currentPost.title);
  const excerpt = getText(currentPost.excerpt);
  const body = getText(currentPost.body);
  const category = getText(currentPost.category);

  return (
    <>
      <PageHeader
        eyebrow={copy.eyebrow}
        heading={copy.pageHeading}
        subheading={copy.pageSubheading}
      />

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {/* Main Blog Post */}
        <article className="mx-auto max-w-4xl">
          {/* Featured Image */}
          <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-lg">
            <Image
              src={currentPost.image}
              alt={currentPost.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>

          {/* Meta Info */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold">
              {category}
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={currentPost.date}>
                {formatDate(currentPost.date, locale)}
              </time>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-display text-4xl font-light text-foreground lg:text-5xl">
            {title}
          </h1>

          {/* Excerpt */}
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {excerpt}
          </p>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Body Content */}
          <div className="space-y-6">
            {body.split("\n\n").map((paragraph, index) => {
              // Check if it's a section header (ends with : or ؟)
              const isHeader = paragraph.endsWith(':') || paragraph.endsWith('؟') || paragraph.endsWith('?');
              
              // Check if it's a contact info line
              const hasLocationIcon = paragraph.includes('برج الجولف') || paragraph.includes('Golf Tower');
              const hasPhoneIcon = paragraph.includes('للاستفسار') || paragraph.includes('inquiries');
              
              if (isHeader) {
                return (
                  <h2 key={index} className="mt-10 mb-4 text-2xl font-medium text-foreground">
                    {paragraph}
                  </h2>
                );
              }
              
              if (hasLocationIcon) {
                return (
                  <div key={index} className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-gold" />
                    <p className="leading-relaxed text-foreground">
                      {paragraph}
                    </p>
                  </div>
                );
              }
              
              if (hasPhoneIcon) {
                return (
                  <div key={index} className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
                    <Phone className="h-5 w-5 flex-shrink-0 text-gold" />
                    <p className="leading-relaxed text-foreground">
                      {paragraph}
                    </p>
                  </div>
                );
              }
              
              // Check if it's a list item (starts with specific patterns)
              const isBulletPoint = 
                paragraph.startsWith('واجهات') || 
                paragraph.startsWith('مداخل') ||
                paragraph.startsWith('أمن') ||
                paragraph.startsWith('رخصة') ||
                paragraph.startsWith('صيانة') ||
                paragraph.startsWith('على شارع') ||
                paragraph.startsWith('قريب') ||
                paragraph.startsWith('5 دقائق') ||
                paragraph.startsWith('15 دقيقة') ||
                paragraph.startsWith('Distinguished') ||
                paragraph.startsWith('Luxurious') ||
                paragraph.startsWith('24/7') ||
                paragraph.startsWith('Full') ||
                paragraph.startsWith('Integrated') ||
                paragraph.startsWith('Directly') ||
                paragraph.startsWith('Close') ||
                paragraph.startsWith('5 minutes') ||
                paragraph.startsWith('15 minutes');
              
              if (isBulletPoint) {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-gold" />
                    <p className="leading-relaxed text-foreground/90">
                      {paragraph}
                    </p>
                  </div>
                );
              }
              
              // Regular paragraph
              return (
                <p key={index} className="leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
              );
            })}
            
            {/* Call to Action */}
            <div className="mt-12 rounded-xl border border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                <Building2 className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">
                {locale === "ar" ? "احجز وحدتك الآن" : "Book Your Unit Now"}
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                {locale === "ar" 
                  ? "للاستفسار والحجز، تواصل مع فريق المبيعات"
                  : "For inquiries and reservations, contact our sales team"}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-gold/90 hover:shadow-lg"
              >
                <span>{locale === "ar" ? "تواصل معنا" : "Contact Us"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </article>

        {/* Divider */}
        <div className="mx-auto my-16 h-px max-w-4xl bg-gradient-to-r from-transparent via-border to-transparent lg:my-24" />

        {/* Only show "More Articles" if there are other posts */}
        {otherPosts.length > 0 && (
          <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h2 className="mb-4 font-display text-3xl font-light text-foreground lg:text-4xl">
              {locale === "ar" ? "المزيد من المقالات" : "More Articles"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {locale === "ar" 
                ? "استكشف المزيد من رؤانا وأفكارنا حول العقارات والتصميم"
                : "Explore more of our insights on real estate and design"}
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => {
              const postTitle = getText(post.title);
              const postExcerpt = getText(post.excerpt);
              const postCategory = getText(post.category);
              
              return (
                <BlogCard
                  key={post.id}
                  slug={post.slug}
                  image={post.image}
                  category={postCategory}
                  date={post.date}
                  title={postTitle}
                  excerpt={postExcerpt}
                  readMoreLabel={copy.readMore}
                  locale={locale}
                  onClick={() => {
                    setSelectedPost(post.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              );
            })}
          </div>
        </div>
        )}
      </div>
    </>
  );
}
