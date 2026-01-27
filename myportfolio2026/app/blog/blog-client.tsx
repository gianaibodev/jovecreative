"use client";

import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { ArrowUpRight, Sparkle, Star, Hash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PixelHeader } from "@/components/ui/pixel-header";
import { useCopyMode } from "@/components/copy-mode-provider";
import type { CaseStudy } from "@/content/case-studies";

// Priority categories that should appear first (pinned/starred)
const PINNED_CATEGORIES = [
  "Web Development",
  "Internships",
  "Community & Events",
  "Startups & Innovation",
];

// Priority case studies that should appear first in "Highlighted work"
const PRIORITY_CASE_STUDIES = [
  "saucykps-bot-v1",
  "gdg-bacolod-community-platform",
  "capture-pixels-photography-portfolio",
];

// Case studies to exclude from "Highlighted work" section
const EXCLUDED_FROM_HIGHLIGHTED = [
  "slick-store-ecommerce-platform",
];

type BlogClientProps = {
  categories: {
    name: string;
    slug: string;
    studies: CaseStudy[];
  }[];
};

export default function BlogClient({ categories }: BlogClientProps) {
  const { copyMode } = useCopyMode();

  // Sort categories: pinned first, then others
  const sortedCategories = [...categories].sort((a, b) => {
    const aIndex = PINNED_CATEGORIES.indexOf(a.name);
    const bIndex = PINNED_CATEGORIES.indexOf(b.name);

    // Both pinned: sort by their order in PINNED_CATEGORIES
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    // Only a is pinned: a comes first
    if (aIndex !== -1) return -1;
    // Only b is pinned: b comes first
    if (bIndex !== -1) return 1;
    // Neither pinned: keep original order
    return 0;
  });

  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName="Case Studies" />

      <PixelHeader
        title={copyMode === "plain" ? "Stories behind the work" : "Detailed Project Documentation"}
        subtitle={copyMode === "plain"
          ? "Read how I approach problems, design solutions, and deliver results."
          : "Editorial-grade breakdowns of branding, product, and experience design—strategy, craft, and impact."}
        colors={["#f59e0b", "#ec4899", "#8b5cf6", "#3b82f6"]}
        categoryIcon={<Sparkle className="size-4" />}
        categoryText="Case Studies"
      />

      {/* What's Here - Table of Contents */}
      <section className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] p-6 sm:p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Hash className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold">What&apos;s here</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Browse all case studies by category. Click any category to jump directly to that section.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {sortedCategories.map((category) => {
                const isPinned = PINNED_CATEGORIES.includes(category.name);
                return (
                  <a
                    key={category.slug}
                    href={`#${category.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-white/10 hover:border-white/30 bg-white/5 dark:bg-white/[0.02] hover:bg-white/10 dark:hover:bg-white/[0.05] transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isPinned && (
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base break-words group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {category.studies.length} {category.studies.length === 1 ? 'case study' : 'case studies'}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          {sortedCategories.map((category) => {
            const isPinned = PINNED_CATEGORIES.includes(category.name);
            return (
              <div key={category.slug} id={category.slug} className="space-y-6 sm:space-y-8 scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    {isPinned && (
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground/80">{category.name}</p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-1 sm:mt-2">Highlighted work</h2>
                    </div>
                  </div>
                  <Link
                    href={`/projects/${category.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 sm:px-5 py-2 text-xs sm:text-sm text-muted-foreground hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    View folder
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </div>
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {category.studies
                    .filter((study) => !EXCLUDED_FROM_HIGHLIGHTED.includes(study.slug))
                    .sort((a, b) => {
                      const aPriority = PRIORITY_CASE_STUDIES.indexOf(a.slug);
                      const bPriority = PRIORITY_CASE_STUDIES.indexOf(b.slug);

                      // Both prioritized: sort by priority order
                      if (aPriority !== -1 && bPriority !== -1) {
                        return aPriority - bPriority;
                      }
                      // Only a is prioritized: a comes first
                      if (aPriority !== -1) return -1;
                      // Only b is prioritized: b comes first
                      if (bPriority !== -1) return 1;
                      // Neither prioritized: keep original order
                      return 0;
                    })
                    .slice(0, 3)
                    .map((study) => (
                      <Link
                        key={study.slug}
                        href={`/blog/${study.slug}`}
                        className="group border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-2xl bg-white/10 dark:bg-white/[0.02] hover:border-white/30 transition-all flex flex-col gap-4 sm:gap-6"
                      >
                        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl h-40 sm:h-48 bg-muted/10">
                          <Image
                            src={study.heroImage}
                            alt={`${study.title} - ${study.category} project thumbnail`}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105 rounded-xl sm:rounded-2xl"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          <span>{study.category}</span>
                          <span>•</span>
                          <span>{study.year}</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg sm:text-xl font-semibold break-words">{study.title}</p>
                          <div className="text-xs sm:text-sm text-muted-foreground line-clamp-4 break-words space-y-1">
                            {study.summary.split('\n\n').map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {study.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 sm:px-3 py-1 rounded-full bg-white/5 text-xs text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border-2 border-blue-500/50 dark:border-blue-400/50 bg-blue-500/10 dark:bg-blue-400/10 text-sm sm:text-base font-bold text-blue-600 dark:text-blue-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                          Dive deeper <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
