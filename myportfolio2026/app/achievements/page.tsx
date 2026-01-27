"use client";

import { useMemo } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { accolades } from "@/components/academic-modals";
import Link from "next/link";
import { ArrowLeft, Trophy, Star, Medal, Crown, Sparkles } from "lucide-react";

function EraSection({
    title,
    years,
    data,
    color,
    icon: Icon
}: {
    title: string;
    years: string;
    data: any;
    color: string;
    icon: any
}) {
    const colorClasses = {
        blue: "text-blue-600 dark:text-blue-500 from-blue-500/20 to-blue-500/5 border-blue-500/10 bg-blue-500/5",
        emerald: "text-emerald-600 dark:text-emerald-500 from-emerald-500/20 to-emerald-500/5 border-emerald-500/10 bg-emerald-500/5",
        amber: "text-amber-600 dark:text-amber-500 from-amber-500/20 to-amber-500/5 border-amber-500/10 bg-amber-500/5",
        rose: "text-rose-600 dark:text-rose-500 from-rose-500/20 to-rose-500/5 border-rose-500/10 bg-rose-500/5",
    }[color] || "text-zinc-600 dark:text-zinc-500 from-zinc-500/20 to-zinc-500/5 border-zinc-500/10 bg-zinc-500/5";

    // Flatten data for display
    const items = useMemo(() => {
        const list = [];
        if (data.honors) list.push({ category: "Academic Honors", items: data.honors, icon: Crown });
        if (data.awards) list.push({ category: "Awards & Recognition", items: data.awards, icon: Trophy });
        if (data.roles) list.push({ category: "Leadership & Roles", items: data.roles, icon: Medal });
        if (data.affiliations) list.push({ category: "Affiliations", items: data.affiliations, icon: Star });
        return list;
    }, [data]);

    return (
        <section className="relative py-20 pl-8 md:pl-16 border-l border-dashed border-zinc-300 dark:border-white/10 ml-4 md:ml-12 last:pb-32">
            {/* Timeline Node */}
            <div className="absolute -left-[9px] top-20 w-[18px] h-[18px] rounded-full bg-background border-2 border-zinc-300 dark:border-zinc-700 ring-4 ring-background dark:ring-zinc-950 group-hover:border-primary transition-colors">
                <div className={`w-full h-full rounded-full opacity-50 ${colorClasses.split(' ')[0].replace('text-', 'bg-')}`} />
            </div>

            <m.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-2">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${colorClasses}`}>
                        {years}
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3 flex items-center gap-4">
                    {title}
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 opacity-30 ${colorClasses.split(' ')[0]}`} />
                </h2>
                {data.school && <p className="text-lg text-muted-foreground font-medium">{data.school}</p>}
                {data.strand && <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-1">{data.strand}</p>}
            </m.div>

            <div className="grid grid-cols-1 gap-12">
                {items.map((section, idx) => (
                    <div key={idx}>
                        <h3 className="flex items-center gap-3 text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-6 pl-2">
                            <section.icon className="w-4 h-4" />
                            {section.category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.items.map((item: string, i: number) => (
                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 + 0.2 }}
                                    key={i}
                                    className="group relative p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                                >
                                    <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${color}-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${colorClasses.split(' ')[0].replace('text-', 'bg-')}`} />
                                        <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 group-hover:text-foreground leading-relaxed font-light">
                                            {item}
                                        </p>
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function AchievementsPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="w-full min-h-screen bg-background text-foreground selection:bg-blue-500/20">
            <MacOSMenuBar appName="Achievement Archive" />

            {/* Progress Bar */}
            <m.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50" />

            <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 pl-4 md:pl-12">
                    <div>
                        <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to About
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                            Achievement<br />Archive
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
                            A comprehensive verification ledger of academic honors, competitive awards, and leadership roles spanning over a decade of dedication.
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-[120px] font-black text-foreground/5 leading-none select-none tracking-tighter">
                            2009
                        </p>
                        <p className="text-[120px] font-black bg-gradient-to-b from-foreground/10 to-foreground/20 bg-clip-text text-transparent leading-[0.8] select-none tracking-tighter relative -top-4">
                            2025
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <EraSection
                        title="College"
                        years="2021 — 2025"
                        data={accolades.college}
                        color="blue"
                        icon={GraduationCapIcon}
                    />
                    <EraSection
                        title="Senior High"
                        years="2019 — 2021"
                        data={accolades.seniorHigh}
                        color="emerald"
                        icon={Sparkles}
                    />
                    <EraSection
                        title="Junior High"
                        years="2015 — 2019"
                        data={accolades.juniorHigh}
                        color="amber"
                        icon={Star}
                    />
                    <EraSection
                        title="Elementary"
                        years="2009 — 2015"
                        data={accolades.elementary}
                        color="rose"
                        icon={Medal}
                    />
                </div>

                <div className="mt-24 pt-24 border-t border-zinc-200 dark:border-white/5 text-center">
                    <p className="text-sm text-zinc-500 font-medium tracking-widest uppercase mb-8">End of Archive</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Verified & Authentic Record</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

function GraduationCapIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    );
}
