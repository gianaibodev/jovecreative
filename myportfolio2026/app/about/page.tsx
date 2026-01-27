"use client";

import { useState, useEffect, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { PixelHeader } from "@/components/ui/pixel-header";
import { GraduationCap, Award, Trophy, Users, Sparkles, X, Search, FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  collegeGrades,
  accolades,
  getSpotlightGrades,
  GradesModal,
  AchievementArchiveModal
} from "@/components/academic-modals";
import { certificationsByProvider, certificationCounts, certificationUrls } from "@/content/certifications";
import { useCopyMode } from "@/components/copy-mode-provider";

const TICKER_PHRASE = "AWARDS • ACHIEVEMENTS • WINS • AFFILIATIONS";

export default function AboutPage() {
  const { copyMode } = useCopyMode();
  const [mounted, setMounted] = useState(false);
  const [showGrades, setShowGrades] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName="About Gian Aibo" />

      <PixelHeader
        title="Digital Craft & Academic Excellence"
        subtitle={copyMode === "plain"
          ? "I'm Gian Aibo C. Boyero — a Computer Science graduate blending technical precision with high-end creative direction. Currently exploring the intersection of AI, design systems, and luxury interfaces."
          : "GIAN AIBO CHUA BOYERO — Blending technical precision with high-end creative direction. Specializing in AI-driven interfaces and luxury digital experiences."}
        colors={["#3b82f6", "#10b981", "#f59e0b", "#ec4899"]}
        categoryIcon={<GraduationCap className="size-4" />}
        categoryText="Portfolio 2025"
        maxWidth="max-w-7xl"
      />

      {/* Quick Stats — same visual language as Formal Education: colored cards, dot, badges */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl p-6 border border-blue-500/30 dark:border-blue-500/20 bg-blue-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">GWA</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1.3</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium">97%</span>
              </div>
            </m.div>
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl p-6 border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Rank</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">#1</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">of 7,042 · 1st Year</span>
              </div>
            </m.div>
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-6 border border-amber-500/30 dark:border-amber-500/20 bg-amber-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Honors</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">Cum Laude</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium">2025</span>
              </div>
            </m.div>
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl p-6 border border-violet-500/30 dark:border-violet-500/20 bg-violet-500/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-violet-500 rounded-full" />
                <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">Certifications</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">32</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-medium">Google, Microsoft, IBM, Canva, DataCamp, GitHub, YouTube</span>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Education - 4 Columns */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            Formal Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 bg-blue-500/10 rounded-2xl p-6 border border-blue-500/30 dark:border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <h3 className="text-lg font-bold">College</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Bachelor of Science in Computer Science • University of St. La Salle • GWA 1.3 (97%)</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">With Latin Honors (Cum Laude)</span>
              </div>
              {/* Grades at a glance — highest grades in hardest subjects */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 mb-4">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-0.5">Transcript at a glance</p>
                <p className="text-[10px] text-muted-foreground mb-2">Highest grades in hardest subjects</p>
                <div className="space-y-1.5 text-xs">
                  {getSpotlightGrades().slice(0, 6).map((g, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                      <span className="text-foreground/90 truncate min-w-0">{g.subject}</span>
                      <span className="flex-shrink-0 font-semibold text-blue-600 dark:text-blue-400">{g.grade} ({g.equivalent})</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowGrades(true)}
                  className="mt-3 w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-medium touch-manipulation"
                >
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>View full transcript ({collegeGrades.length} subjects)</span>
                </button>
              </div>
            </div>
            <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/30 dark:border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <h3 className="text-lg font-bold">Senior High School</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">STEM • Liceo De La Salle Bacolod</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">With Highest Honors</span>
              </div>
            </div>
            <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/30 dark:border-orange-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <h3 className="text-lg font-bold">Junior High School</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Holy Infant Academy</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold">With Highest Honors</span>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold">Rank 1 of Batch</span>
              </div>
            </div>
            <div className="bg-pink-500/10 rounded-2xl p-6 border border-pink-500/30 dark:border-pink-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full" />
                <h3 className="text-lg font-bold">Elementary</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Holy Infant Academy</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-semibold">Batch Valedictorian</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee: AWARDS • ACHIEVEMENTS • WINS • AFFILIATIONS */}
      <div className="marquee-fade-edges overflow-hidden border-y border-zinc-300 dark:border-white/10 bg-white/[0.02] py-4">
        <div className="animate-marquee flex w-max whitespace-nowrap text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] font-medium text-muted-foreground" style={{ "--duration": "45s" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" {...(copy === 1 ? { "aria-hidden": true } : {})}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-8">{TICKER_PHRASE}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Awards - 3 Columns */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 flex items-center gap-3 tracking-tighter">
                <Trophy className="w-10 h-10 text-yellow-500" />
                Awards & Achievements
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">A condensed view of major creative and academic wins. Explore the full history below.</p>
            </div>
            <Link
              href="/achievements"
              className="px-8 py-4 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20 transition-all flex items-center gap-2"
            >
              Open Full Archive
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="p-8 rounded-[32px] border border-blue-500/20 bg-blue-500/5">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                College
              </h3>
              <div className="space-y-4">
                {accolades.college.honors.map((h, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium leading-relaxed">{h}</div>
                ))}
                {accolades.college.awards.slice(0, 3).map((a, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-sm italic opacity-80">{a}</div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[32px] border border-emerald-500/20 bg-emerald-500/5">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                Affiliations
              </h3>
              <div className="space-y-4">
                {accolades.college.affiliations.slice(0, 5).map((a, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium text-emerald-600 dark:text-emerald-400">{a}</div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[32px] border border-orange-500/20 bg-orange-500/5">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                Prior Honors
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Senior High School</p>
                  <p className="text-sm font-bold">With Highest Honors</p>
                  <p className="text-xs text-muted-foreground mt-1">Principal&apos;s Distinction Award</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Junior High School</p>
                  <p className="text-sm font-bold">First Honors (Rank 1)</p>
                  <p className="text-xs text-muted-foreground mt-1">10+ Academic Awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <AchievementArchiveModal isOpen={showArchive} onClose={() => setShowArchive(false)} /> */}

      {/* Marquee: AWARDS • ACHIEVEMENTS • WINS • AFFILIATIONS */}
      <div className="marquee-fade-edges overflow-hidden border-y border-zinc-300 dark:border-white/10 bg-white/[0.02] py-4">
        <div className="animate-marquee flex w-max whitespace-nowrap text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] font-medium text-muted-foreground" style={{ "--duration": "45s" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" {...(copy === 1 ? { "aria-hidden": true } : {})}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="mx-8">{TICKER_PHRASE}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-blue-500" />
            Certifications / Trainings
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Verify credentials and badges: <a href="https://linkedin.com/in/aiboboyero" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">linkedin.com/in/aiboboyero</a>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(certificationsByProvider)
              .filter(([provider]) => ["Google", "Microsoft", "IBM"].includes(provider))
              .map(([provider, names]) => {
                const card = {
                  Google: "border-blue-500/30 dark:border-blue-500/20 bg-blue-500/10",
                  Microsoft: "border-sky-500/30 dark:border-sky-500/20 bg-sky-500/10",
                  IBM: "border-violet-500/30 dark:border-violet-500/20 bg-violet-500/10",
                }[provider] || "border-zinc-300 dark:border-white/10 bg-white/5";
                const dot = {
                  Google: "bg-blue-500",
                  Microsoft: "bg-sky-500",
                  IBM: "bg-violet-500",
                }[provider] || "bg-zinc-500";
                return (
                  <div key={provider} className={`rounded-2xl p-5 border ${card}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${dot}`} />
                      <h3 className="text-base font-bold">{provider}</h3>
                      <span className="text-xs text-muted-foreground">({certificationCounts[provider] ?? names.length})</span>
                    </div>
                    <ul className="space-y-1.5 text-sm">
                      {names.map((name, i) => {
                        const url = certificationUrls[name];
                        return (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-muted-foreground mt-0.5">·</span>
                            {url ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                              >
                                {name}
                              </a>
                            ) : (
                              <span>{name}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-400 dark:border-white/20 bg-white/5 hover:bg-white/10 transition-all">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Grades Modal */}
      <GradesModal isOpen={showGrades} onClose={() => setShowGrades(false)} />
    </div>
  );
}
