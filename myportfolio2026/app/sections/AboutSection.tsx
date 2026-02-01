"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCopyMode } from "@/components/copy-mode-provider";
import { GradesModal } from "@/components/academic-modals";

export function AboutSection({ variants, itemVariants }: { variants: any, itemVariants: any }) {
    const { copyMode } = useCopyMode();
    const [showGrades, setShowGrades] = useState(false);

    return (
        <section id="about" className="w-full py-16 relative z-10 overflow-visible">
            <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={variants}
                className="max-w-7xl mx-auto px-4"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="text-left">
                        <m.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                            About Me
                        </m.h2>
                        <m.div variants={itemVariants} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            {copyMode === "plain" ? (
                                <>
                                    <p>
                                        I&apos;m <span className="font-bold text-foreground">Gian Aibo C. Boyero</span>, a designer and developer who builds websites that work. I recently graduated with honors, but my focus is 100% on delivering real results for clients.
                                    </p>
                                    <p>
                                        Whether you need a simple landing page or a full online store, I handle the technical details so you can focus on your business. I value clear communication, hitting deadlines, and making things look professional.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        I&apos;m <span className="font-bold text-foreground">Gian Aibo C. Boyero</span>, a Computer Science graduate (Class 2025) from the University of St. La Salle, where I achieved <span className="text-foreground font-semibold">Cum Laude</span> honors with a 1.3 (97%) GPA.
                                    </p>
                                    <p>
                                        My academic journey is marked by excellence—I ranked <span className="text-foreground font-semibold">#1 of 7,042</span> across all colleges in my first year. I blend technical rigor with a deep passion for visual storytelling and community leadership.
                                    </p>
                                </>
                            )}
                            <div className="pt-8 grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
                                        {copyMode === "plain" ? "My Focus" : "Leadership"}
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        {copyMode === "plain" ? (
                                            <>
                                                <li>• Web Design & Dev</li>
                                                <li>• E-commerce (Shopify)</li>
                                                <li>• Brand Strategy</li>
                                            </>
                                        ) : (
                                            <>
                                                <li>• President, DEVCON Bacolod</li>
                                                <li>• CEO, GDG on Campus USLS</li>
                                                <li>• Creatives Co-head, GDG Bacolod</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
                                        {copyMode === "plain" ? "Values" : "Key Wins"}
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        {copyMode === "plain" ? (
                                            <>
                                                <li>• Reliability</li>
                                                <li>• Fast Delivery</li>
                                                <li>• Clear Communication</li>
                                            </>
                                        ) : (
                                            <>
                                                <li>• Most Outstanding Student (Visual Arts & Service)</li>
                                                <li>• National Creative Awards (Best Art Direction)</li>
                                                <li>• Google Role Model of the Year</li>
                                                <li>• Outstanding Intern & Legacy Builder</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </m.div>
                    </div>

                    <div className="space-y-8">
                        <m.div
                            variants={itemVariants}
                            className="p-8 rounded-[32px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                        >
                            <h3 className="text-xl font-bold mb-6">Education</h3>
                            <div className="space-y-6">
                                <div className="relative pl-6 border-l-2 border-blue-500/30">
                                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5" />
                                    <h4 className="font-bold">College — University of St. La Salle</h4>
                                    <p className="text-sm text-muted-foreground">Bachelor of Science in Computer Science (2021-2025)</p>
                                    <p className="text-xs font-medium text-blue-600 mt-1">Cum Laude • GWA 1.3 / 97%</p>
                                    <button
                                        onClick={() => setShowGrades(true)}
                                        suppressHydrationWarning={true}
                                        className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest transition-all"
                                    >
                                        <ArrowUpRight size={12} />
                                        View Full Transcript
                                    </button>
                                </div>
                                <div className="relative pl-6 border-l-2 border-green-500/30">
                                    <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-1.5" />
                                    <h4 className="font-bold">Senior High School</h4>
                                    <p className="text-sm text-muted-foreground">STEM • Liceo De La Salle</p>
                                    <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-1">With Highest Honors • 98%</p>
                                </div>
                                <div className="relative pl-6 border-l-2 border-orange-500/30">
                                    <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-1.5" />
                                    <h4 className="font-bold">Junior High School</h4>
                                    <p className="text-sm text-muted-foreground">Holy Infant Academy</p>
                                    <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mt-1">Highest Honors • Rank 1 • 98.2%</p>
                                </div>
                                <div className="relative pl-6 border-l-2 border-pink-500/30">
                                    <div className="absolute w-3 h-3 bg-pink-500 rounded-full -left-[7px] top-1.5" />
                                    <h4 className="font-bold">Primary School</h4>
                                    <p className="text-sm text-muted-foreground">Holy Infant Academy</p>
                                    <p className="text-xs font-medium text-pink-600 dark:text-pink-400 mt-1">Valedictorian • 97.4%</p>
                                </div>
                            </div>
                        </m.div>

                        <m.div variants={itemVariants} className="flex flex-wrap gap-3">
                            {["11x Google Certified", "3x Canva Designer", "IBM Certified", "7x Microsoft Trophies"].map((cert) => (
                                <span key={cert} className="px-4 py-2 rounded-full bg-background border text-xs font-medium">
                                    {cert}
                                </span>
                            ))}
                        </m.div>

                        <m.div variants={itemVariants} className="pt-8 text-center lg:text-left flex flex-wrap gap-4">
                            <a
                                href="/about"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                                suppressHydrationWarning
                            >
                                <span>Know More About Me</span>
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium"
                            >
                                <span>View Resume</span>
                            </a>
                        </m.div>
                    </div>
                </div>
            </m.div>
            <GradesModal isOpen={showGrades} onClose={() => setShowGrades(false)} />
        </section>
    );
}
