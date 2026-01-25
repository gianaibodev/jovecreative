"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatedFolder } from "@/components/ui/3d-folder";

type CategoryColorKey =
  | "Branding"
  | "UI/UX"
  | "Web Development"
  | "Photography"
  | "Community & Events"
  | "Startups & Innovation"
  | "Games & Experiments"
  | "Internships";

const categoryColors: Record<CategoryColorKey, string> = {
  Branding: "hsl(217, 91%, 60%)",
  "UI/UX": "hsl(280, 85%, 65%)",
  "Web Development": "hsl(142, 76%, 45%)",
  Photography: "hsl(35, 90%, 60%)",
  "Community & Events": "hsl(162, 70%, 55%)",
  "Startups & Innovation": "hsl(4, 85%, 62%)",
  "Games & Experiments": "hsl(300, 65%, 58%)",
  Internships: "hsl(210, 25%, 70%)",
};

// Priority categories that should appear first (pinned/starred)
const PINNED_CATEGORIES = [
  "Web Development",
  "UI/UX",
  "Startups & Innovation",
  "Games & Experiments",
];

type ApiCategory = {
  name: string;
  slug: string;
  studies: { projectId: string; title: string; heroImage: string }[];
};

// Loading skeleton component
function FolderSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div
        className="relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 rounded-2xl border border-black/5 dark:border-white/[0.12] w-full max-w-sm animate-pulse"
        style={{ minWidth: "min(280px, 100%)", maxWidth: "100%", minHeight: "320px" }}
      >
        {/* Folder tab skeleton */}
        <div className="absolute -top-3 left-6 w-20 h-6 bg-muted/50 rounded-t-lg" />
        
        {/* Folder body skeleton */}
        <div className="w-full h-40 bg-muted/30 rounded-xl mb-4" />
        
        {/* Title skeleton */}
        <div className="w-32 h-5 bg-muted/40 rounded-md" />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [apiCategories, setApiCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        // Add timeout for mobile devices
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch("/api/case-studies/categories", {
          cache: "no-store",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = (await res.json()) as { categories?: ApiCategory[] };
        if (cancelled) return;
        setApiCategories(json.categories ?? []);
      } catch (e) {
        if (cancelled) return;
        if (e instanceof Error && e.name === "AbortError") {
          console.warn("Categories fetch timeout");
        } else {
          console.error("Error loading categories:", e);
        }
        setApiCategories([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const mapped = apiCategories
      .map((category) => ({
        title: category.name,
        slug: category.slug,
        color: categoryColors[category.name as CategoryColorKey] ?? "hsl(217, 91%, 60%)",
        isPinned: PINNED_CATEGORIES.includes(category.name),
        projects: category.studies.slice(0, 4).map((study) => ({
          id: study.projectId,
          image: study.heroImage,
          title: study.title,
        })),
      }))
      .filter((category) => category.projects.length > 0);

    // Sort: pinned categories first (in order of PINNED_CATEGORIES), then others
    return mapped.sort((a, b) => {
      const aIndex = PINNED_CATEGORIES.indexOf(a.title);
      const bIndex = PINNED_CATEGORIES.indexOf(b.title);
      
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
  }, [apiCategories]);

  return (
    <section id="all-projects" className="w-full pb-12 sm:pb-16 md:pb-20 bg-background overflow-visible relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {loading ? (
            // Show skeleton placeholders while loading
            <>
              <FolderSkeleton />
              <FolderSkeleton />
              <FolderSkeleton />
              <FolderSkeleton />
              <FolderSkeleton />
              <FolderSkeleton />
            </>
          ) : categories.length > 0 ? (
            categories.map((folder) => (
              <div key={folder.slug} className="w-full flex justify-center">
                <AnimatedFolder
                  title={folder.title}
                  projects={folder.projects}
                  color={folder.color}
                  href={`/projects/${folder.slug}`}
                  isPinned={folder.isPinned}
                />
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No projects found</p>
          )}
        </div>
      </div>
    </section>
  );
}
