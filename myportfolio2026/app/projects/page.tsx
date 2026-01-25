"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { ProjectsSection } from "@/components/projects-section";
import { GitPullRequest } from "lucide-react";
import { PixelHeader } from "@/components/ui/pixel-header";
import ParticleText from "@/components/ui/particle-text-canvas";

import { useCopyMode } from "@/components/copy-mode-provider";
import { useFullPageLoading } from "@/components/full-page-loading-context";

export default function ProjectsPage() {
  const { copyMode } = useCopyMode();
  const { setActive } = useFullPageLoading();
  const [showLoader, setShowLoader] = useState(true);

  useLayoutEffect(() => {
    setActive(showLoader);
    return () => setActive(false);
  }, [showLoader, setActive]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const PROJECTS_INTRO_KEY = "projectsIntroShown_v1";
    const hasSeen = sessionStorage.getItem(PROJECTS_INTRO_KEY);

    if (hasSeen) {
      setShowLoader(false);
      return;
    }

    // Show loader for 5-6 seconds for the first time
    const minDelay = 5000; // 5 seconds
    const maxDelay = 6000; // 6 seconds
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;

    const timer = setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem(PROJECTS_INTRO_KEY, "true");
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    const overlay = (
      <div
        className="fixed inset-0 z-[99999] min-h-[100dvh] overflow-hidden cursor-pointer bg-[#0a0f18]"
        style={{ height: "100dvh" }}
        onClick={() => setShowLoader(false)}
      >
        <ParticleText hideInteractionHint />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowLoader(false);
          }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100000] px-8 py-3 rounded-full backdrop-blur-3xl bg-white/80 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.12] text-foreground dark:text-white text-sm font-bold shadow-2xl transition-all hover:bg-white/90 dark:hover:bg-white/[0.05] active:scale-95"
        >
          SKIP INTRO
        </button>
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100000] text-white/50 text-[10px] uppercase tracking-widest font-medium pointer-events-none">
          Tap or click to enter
        </div>
      </div>
    );
    if (typeof document !== "undefined" && document.body) {
      return createPortal(overlay, document.body);
    }
    return overlay;
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName="Projects" />
      
      <PixelHeader
        title={copyMode === "plain" ? "Browse my work by category" : "All projects by discipline"}
        subtitle={copyMode === "plain"
          ? "Click a category to see my projects. Each one includes a summary, screenshots, and details."
          : "Each folder pulls from the same case study canon—tap a card to skim highlights, then deep-dive the matching blog entry for cinematic details."}
        colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]}
        categoryIcon={<GitPullRequest className="size-4" />}
        categoryText="Project Archive"
        maxWidth="max-w-7xl"
      />

      <div className="py-12 pb-24">
        <ProjectsSection />
      </div>
    </div>
  );
}


