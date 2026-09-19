"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import projectsData from "@/data/maram-projects-categorized.json";
import { useI18n } from "@/i18n";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  mainCategory: string;
  subcategories: string[];
  image: string;
  url: string;
};

// Pagination settings
const ITEMS_PER_PAGE = 12;

// Get all categories (main + subcategories)
const allCategories: string[] = [];
const categoryMap = new Map<string, number>();

projectsData.projects.forEach((p: Project) => {
  // Add main category
  if (!categoryMap.has(p.mainCategory)) {
    categoryMap.set(p.mainCategory, 0);
  }
  categoryMap.set(p.mainCategory, categoryMap.get(p.mainCategory)! + 1);
  
  // Add subcategories
  p.subcategories.forEach((sub: string) => {
    const key = `${p.mainCategory}/${sub}`;
    if (!categoryMap.has(key)) {
      categoryMap.set(key, 0);
    }
    categoryMap.set(key, categoryMap.get(key)! + 1);
  });
});

const categories = Array.from(categoryMap.keys());

export function ProjectsContent() {
  const { m, locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Translation helper for categories
  const translateCategory = (category: string): string => {
    const categories = m.projects?.categories as Record<string, string> | undefined;
    return categories?.[category] || category;
  };

  // Filter projects by category (supports hierarchy)
  const filteredProjects =
    activeCategory === null
      ? projectsData.projects
      : projectsData.projects.filter((p: Project) => {
          // Check if it's a main category or subcategory filter
          if (activeCategory.includes('/')) {
            // Subcategory filter (e.g., "Design/Interior")
            const [main, sub] = activeCategory.split('/');
            return p.mainCategory === main && p.subcategories.includes(sub);
          } else {
            // Main category filter
            return p.mainCategory === activeCategory;
          }
        });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  // Get selected category display name
  const getSelectedCategoryName = () => {
    if (activeCategory === null) {
      return `${m.projects?.allLocations || (locale === "ar" ? "الكل" : "All")} (${projectsData.projects.length})`;
    }
    const count = categoryMap.get(activeCategory) || 0;
    const isHierarchical = activeCategory.includes('/');
    const displayName = isHierarchical 
      ? translateCategory(activeCategory.split('/').pop() || activeCategory)
      : translateCategory(activeCategory);
    return `${displayName} (${count})`;
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near start: 1 2 3 4 ... last
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end: 1 ... last-3 last-2 last-1 last
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle: 1 ... current-1 current current+1 ... last
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <PageHeader
        eyebrow={m.projects?.eyebrow || "Portfolio"}
        heading={m.projects?.pageHeading || (locale === "ar" ? "مشاريعنا" : "Our Projects")}
        subheading={
          m.projects?.pageSubheading ||
          (locale === "ar"
            ? "تصفح مجموعة من أعمالنا في البناء والتصميم الداخلي"
            : "Browse our collection of construction and interior design works")
        }
      />

      {/* ── Category Filter ──────────────────────────── */}
      <div className="border-b border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground whitespace-nowrap">
              {locale === "ar" ? "التصنيف:" : "Category:"}
            </label>
            
            {/* Custom Dropdown */}
            <div ref={dropdownRef} className="relative flex-1 max-w-md">
              {/* Dropdown Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:border-gold hover:bg-gold/5 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              >
                <span>{getSelectedCategoryName()}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-gold transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-background shadow-elevated max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gold/50 scrollbar-track-border/30 hover:scrollbar-thumb-gold scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                  {/* All option */}
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      activeCategory === null
                        ? 'bg-gold text-primary-foreground'
                        : 'text-foreground hover:bg-gold/10 hover:text-gold'
                    }`}
                  >
                    {m.projects?.allLocations || (locale === "ar" ? "الكل" : "All")}
                    <span className="ml-2 text-xs opacity-70">
                      ({projectsData.projects.length})
                    </span>
                  </button>

                  {/* Categories */}
                  {categories.map((category, index) => {
                    const count = categoryMap.get(category) || 0;
                    const isHierarchical = category.includes('/');
                    const displayName = isHierarchical 
                      ? translateCategory(category.split('/').pop() || category)
                      : translateCategory(category);
                    
                    return (
                      <button
                        key={`category-${category}-${index}`}
                        onClick={() => handleCategoryChange(category)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 border-t border-border/50 ${
                          activeCategory === category
                            ? 'bg-gold text-primary-foreground'
                            : 'text-foreground hover:bg-gold/10 hover:text-gold'
                        } ${isHierarchical ? 'pl-8' : ''}`}
                      >
                        {isHierarchical && (
                          <span className="mr-2 text-gold">↳</span>
                        )}
                        {displayName}
                        <span className="ml-2 text-xs opacity-70">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Project Grid ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {currentProjects.length > 0 ? (
          <>
            {/* Projects Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {currentProjects.map((project: Project) => (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:shadow-elevated hover:border-gold/50"
                >
                  {/* Project Image */}
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[4/3] overflow-hidden bg-muted"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
                      <span className="inline-block rounded-full bg-gold/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                        {translateCategory(project.mainCategory)}
                      </span>
                      {project.subcategories.length > 0 && (
                        <span className="inline-block rounded-full bg-foreground/80 px-3 py-1 text-[9px] font-medium tracking-wide text-background backdrop-blur-sm">
                          {translateCategory(project.subcategories[0])}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Project Info */}
                  <div className="p-5">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/title"
                    >
                      <h3 className="text-lg font-medium text-foreground transition-colors duration-300 group-hover/title:text-gold">
                        {project.title}
                      </h3>
                    </Link>

                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm text-gold transition-all duration-300 hover:gap-3"
                    >
                      <span>{locale === "ar" ? "عرض التفاصيل" : "View Details"}</span>
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={locale === "ar" ? "M7 16l-4-4m0 0l4-4m-4 4h18" : "M17 8l4 4m0 0l-4 4m4-4H3"}
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* ── Pagination ─────────────────────────────── */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 ${
                    currentPage === 1
                      ? 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                      : 'border-border hover:border-gold hover:bg-gold/10 text-foreground'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="flex h-10 w-10 items-center justify-center text-muted-foreground"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${page}`}
                        onClick={() => goToPage(page as number)}
                        className={`flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border px-3 text-sm font-medium transition-all duration-300 ${
                          currentPage === page
                            ? 'border-gold bg-gold text-primary-foreground shadow-md'
                            : 'border-border hover:border-gold hover:bg-gold/10 text-foreground'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                      : 'border-border hover:border-gold hover:bg-gold/10 text-foreground'
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Results Info */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              {locale === "ar" 
                ? `عرض ${startIndex + 1}-${Math.min(endIndex, filteredProjects.length)} من ${filteredProjects.length} مشروع`
                : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProjects.length)} of ${filteredProjects.length} projects`
              }
            </div>
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              {locale === "ar"
                ? "لا توجد مشاريع في هذه الفئة"
                : "No projects found in this category"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
