"use client";

import { m } from "framer-motion";
import { Quote } from "lucide-react";

import { useCopyMode } from "@/components/copy-mode-provider";

export function QuoteSection() {
  const { copyMode } = useCopyMode();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full flex items-center justify-center bg-gradient-to-b from-background via-blue-600/5 dark:via-blue-400/5 to-background overflow-x-hidden py-8 sm:py-12 md:py-16">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <m.div variants={itemVariants} className="text-center mb-8">
          <Quote className="h-12 w-12 text-blue-600 dark:text-blue-300 mx-auto mb-6 opacity-80" />
        </m.div>

        <m.blockquote
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-foreground mb-8 px-2"
        >
          {copyMode === "plain" ? (
            <>
              <span className="text-blue-600 dark:text-blue-300 font-semibold">Reliability</span> is my main currency. I turn{" "}
              <span className="text-blue-600 dark:text-blue-300 font-semibold">messy ideas</span> into{" "}
              <span className="text-blue-600 dark:text-blue-300 font-semibold">clean, profitable websites</span> that you&apos;ll be proud to show off.
            </>
          ) : (
            <>
              <span className="text-blue-600 dark:text-blue-300 font-semibold">Great software</span> isn&apos;t just code—it&apos;s{" "}
              <span className="text-blue-600 dark:text-blue-300 font-semibold">communication</span>. I bridge the gap between{" "}
              <span className="text-blue-600 dark:text-blue-300 font-semibold">complex engineering</span> and{" "}
              <span className="text-blue-600 dark:text-blue-300 font-semibold">human experience</span>.
            </>
          )}
        </m.blockquote>

        <m.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 mt-12"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-600 dark:via-blue-400 to-transparent"></div>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            — Gian Aibo C. Boyero
          </p>
          <p className="text-sm text-muted-foreground/85">
            {copyMode === "plain" ? "Designer & Developer" : "Former CEO & GDG Organizer & GDSC Lead of USLS"}
          </p>
          <p className="text-xs text-muted-foreground/75">
            {copyMode === "plain" ? "Helping Businesses Worldwide" : "Google Developer Programs"}
          </p>
        </m.div>

        {/* Achievement badges */}
        <m.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mt-12 scale-90"
        >
          {copyMode === "plain" ? (
            <>
              <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[13px] font-semibold text-blue-600 dark:text-blue-300">
                  Easy to work with
                </p>
              </div>
              <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[13px] font-semibold text-blue-600 dark:text-blue-300">
                  Fast turnaround
                </p>
              </div>
              <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[13px] font-semibold text-blue-600 dark:text-blue-300">
                  Modern design
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[13px] font-semibold text-blue-600 dark:text-blue-300">
                  Next.js App Router
                </p>
              </div>
              <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[13px] font-semibold text-blue-600 dark:text-blue-300">
                  TypeScript & Tailwind
                </p>
              </div>
              <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[13px] font-semibold text-blue-600 dark:text-blue-300">
                  Performance-first
                </p>
              </div>
            </>
          )}
        </m.div>
      </m.div>
    </section>
  );
}

