"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ParticleText from "@/components/ui/particle-text-canvas";
import { useFullPageLoading } from "@/components/full-page-loading-context";

export default function Loading() {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const minDelay = 5000; // 5 seconds
  const maxDelay = 6000; // 6 seconds
  const delay = useRef(Math.random() * (maxDelay - minDelay) + minDelay);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { setActive } = useFullPageLoading();

  useLayoutEffect(() => {
    setActive(true);
    return () => setActive(false);
  }, [setActive]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const PROJECTS_INTRO_KEY = "projectsIntroShown_v1";
    const hasSeen = sessionStorage.getItem(PROJECTS_INTRO_KEY);

    if (hasSeen) {
      setShowLoader(false);
      return;
    }

    // Detect mobile
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Handle skip (Escape, Enter, or click)
    const handleSkip = () => {
      setShowLoader(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip on Escape or Enter
      if (e.code === "Escape" || e.code === "Enter") {
        e.preventDefault();
        handleSkip();
        return;
      }
      // Hold on Space (desktop)
      if (e.code === "Space" && !isHeld && !isMobile) {
        e.preventDefault();
        setIsHeld(true);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && isHeld && !isMobile) {
        e.preventDefault();
        setIsHeld(false);
        startTimeRef.current = Date.now() - (progress / 100) * delay.current;
        updateProgress();
      }
    };

    // Click to skip
    const handleClick = () => {
      handleSkip();
    };

    // Handle touch (mobile)
    const handleTouchStart = (e: TouchEvent) => {
      if (isMobile) {
        e.preventDefault();
        touchStartTimeRef.current = Date.now();
        longPressTimerRef.current = setTimeout(() => {
          setIsHeld(true);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
        }, 300); // 300ms long press
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isMobile && isHeld) {
        e.preventDefault();
        setIsHeld(false);
        startTimeRef.current = Date.now() - (progress / 100) * delay.current;
        updateProgress();
      }
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile && longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Update progress bar
    const updateProgress = () => {
      if (!isHeld) {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / delay.current) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          setShowLoader(false);
        }
      }
    };

    // Start progress updates immediately
    updateProgress(); // Initial update
    progressIntervalRef.current = setInterval(updateProgress, 50);

    // Auto-hide after delay (only if not held)
    const timer = setTimeout(() => {
      if (!isHeld) {
        setShowLoader(false);
      }
    }, delay.current);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(timer);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, [isHeld, progress, isMobile]);

  if (!showLoader) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const overlay = (
    <div
      className="fixed inset-0 z-[99999] min-h-[100dvh] overflow-hidden cursor-pointer bg-[#0a0f18]"
      style={{ height: "100dvh" }}
      onClick={() => setShowLoader(false)}
      aria-hidden="false"
    >
      <ParticleText hideInteractionHint />
      {/* Progress Bar - Always visible with higher z-index */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[99999] h-2 bg-black/40 dark:bg-white/20"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-75 ease-linear shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          style={{ width: `${Math.max(progress, 0.5)}%`, minWidth: "0.5%" }}
        />
      </div>
      {/* Progress percentage text */}
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] text-white/80 text-xs font-medium"
        style={{ pointerEvents: "none" }}
      >
        {Math.round(progress)}%
      </div>
      {/* Skip Button - Glass effect matching header */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          setShowLoader(false);
        }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100000] px-8 py-3 rounded-full backdrop-blur-3xl bg-white/80 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/[0.12] text-foreground dark:text-white text-sm font-bold shadow-2xl transition-all hover:bg-white/90 dark:hover:bg-white/[0.05] active:scale-95"
      >
        SKIP INTRO
      </button>

      {/* Skip hint */}
      <div
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100000] text-white/50 text-[10px] uppercase tracking-widest font-medium"
        style={{ pointerEvents: "none" }}
      >
        Tap or click to enter
      </div>
      {/* Desktop Space hint */}
      {!isMobile && !isHeld && (
        <div
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[99999] px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-zinc-300 dark:border-white/10 text-white/70 text-xs font-medium"
          style={{ pointerEvents: "auto" }}
        >
          Hold Space to keep playing
        </div>
      )}
      {/* Hold indicator */}
      {isHeld && (
        <div
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[99999] px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-zinc-400 dark:border-white/20 text-white text-sm font-medium animate-pulse"
          style={{ pointerEvents: "auto" }}
        >
          {isMobile ? "Keep holding to play longer" : "Hold Space to keep playing"}
        </div>
      )}
      {/* Mobile hint */}
      {isMobile && !isHeld && (
        <div
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[99999] px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-zinc-300 dark:border-white/10 text-white/70 text-xs font-medium"
          style={{ pointerEvents: "auto" }}
        >
          Long press anywhere to keep playing
        </div>
      )}
    </div>
  );

  if (typeof document !== "undefined" && document.body) {
    return createPortal(overlay, document.body);
  }
  return overlay;
}

