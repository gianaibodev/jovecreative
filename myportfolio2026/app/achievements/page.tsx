"use client";

import { useMemo, useEffect, useState } from "react";
import { m, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { accolades } from "@/components/academic-modals";
import Link from "next/link";
import { ArrowLeft, Trophy, Star, Medal, Crown, Sparkles, ChevronDown, Award, Users, Briefcase } from "lucide-react";

// Category icons mapping
const categoryIcons: Record<string, any> = {
    "Academic Honors": Crown,
    "Awards & Recognition": Trophy,
    "Leadership & Roles": Briefcase,
    "Affiliations": Users,
    "Dean's List": Award,
};

// Color configurations for each era
const eraColors = {
    blue: {
        gradient: "from-blue-500 to-indigo-600",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-600 dark:text-blue-400",
        dot: "bg-blue-500",
        glow: "shadow-blue-500/20",
    },
    emerald: {
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-600 dark:text-emerald-400",
        dot: "bg-emerald-500",
        glow: "shadow-emerald-500/20",
    },
    amber: {
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-600 dark:text-amber-400",
        dot: "bg-amber-500",
        glow: "shadow-amber-500/20",
    },
    rose: {
        gradient: "from-rose-500 to-pink-600",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        text: "text-rose-600 dark:text-rose-400",
        dot: "bg-rose-500",
        glow: "shadow-rose-500/20",
    },
};

function AchievementCard({
    item,
    index,
    colorKey,
    categoryIcon: CategoryIcon,
}: {
    item: string;
    index: number;
    colorKey: keyof typeof eraColors;
    categoryIcon: any;
}) {
    const colors = eraColors[colorKey];

    return (
        <m.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                delay: Math.min(index * 0.03, 0.3),
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`group relative p-5 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.06] hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 shadow-sm hover:shadow-lg ${colors.glow}`}
        >
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

            {/* Top accent line */}
            <div className={`absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />

            <div className="relative flex items-start gap-4">
                <div className={`mt-1 w-8 h-8 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <CategoryIcon className={`w-4 h-4 ${colors.text}`} />
                </div>
                <p className="text-sm md:text-[15px] text-zinc-700 dark:text-zinc-300 group-hover:text-foreground leading-relaxed font-medium">
                    {item}
                </p>
            </div>
        </m.div>
    );
}

function CategorySection({
    category,
    items,
    colorKey,
    isLast,
}: {
    category: string;
    items: string[];
    colorKey: keyof typeof eraColors;
    isLast: boolean;
}) {
    const colors = eraColors[colorKey];
    const CategoryIcon = categoryIcons[category] || Star;
    const [expanded, setExpanded] = useState(items.length <= 6);
    const displayItems = expanded ? items : items.slice(0, 6);
    const hasMore = items.length > 6;

    return (
        <div className={`${!isLast ? 'mb-12' : ''}`}>
            <m.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
            >
                <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                    <CategoryIcon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div>
                    <h3 className={`text-lg font-bold ${colors.text}`}>{category}</h3>
                    <p className="text-xs text-muted-foreground">{items.length} items</p>
                </div>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                    {displayItems.map((item, i) => (
                        <AchievementCard
                            key={item}
                            item={item}
                            index={i}
                            colorKey={colorKey}
                            categoryIcon={CategoryIcon}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {hasMore && (
                <m.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setExpanded(!expanded)}
                    className={`mt-4 w-full py-3 rounded-xl border ${colors.border} ${colors.bg} ${colors.text} font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-80 transition-all active:scale-[0.98]`}
                >
                    {expanded ? 'Show Less' : `Show ${items.length - 6} More`}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </m.button>
            )}
        </div>
    );
}

function EraSection({
    title,
    years,
    data,
    colorKey,
    icon: Icon,
    index,
}: {
    title: string;
    years: string;
    data: any;
    colorKey: keyof typeof eraColors;
    icon: any;
    index: number;
}) {
    const colors = eraColors[colorKey];

    const sections = useMemo(() => {
        const list: { category: string; items: string[] }[] = [];
        if (data.honors) list.push({ category: "Academic Honors", items: data.honors });
        if (data.deansList) list.push({ category: "Dean's List", items: data.deansList });
        if (data.awards) list.push({ category: "Awards & Recognition", items: data.awards });
        if (data.roles) list.push({ category: "Leadership & Roles", items: data.roles });
        if (data.affiliations) list.push({ category: "Affiliations", items: data.affiliations });
        return list;
    }, [data]);

    const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);

    return (
        <m.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mb-24 last:mb-0"
        >
            {/* Era Header Card */}
            <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-[2rem] p-8 md:p-12 mb-10 border ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-xl`}
            >
                {/* Background decoration */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br ${colors.gradient} opacity-10 blur-3xl`} />
                <div className={`absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br ${colors.gradient} opacity-5 blur-2xl`} />

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg ${colors.glow}`}>
                                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                    {title}
                                </h2>
                                {data.school && (
                                    <p className="text-base text-muted-foreground font-medium mt-1">{data.school}</p>
                                )}
                                {data.strand && (
                                    <p className={`text-sm font-semibold ${colors.text} mt-0.5`}>{data.strand}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className={`px-5 py-2 rounded-full text-sm font-bold border backdrop-blur-md ${colors.border} ${colors.bg} ${colors.text}`}>
                                {years}
                            </span>
                            <div className={`px-4 py-2 rounded-full border ${colors.border} ${colors.bg}`}>
                                <span className={`text-2xl font-bold ${colors.text}`}>{totalItems}</span>
                                <span className="text-xs text-muted-foreground ml-1.5">achievements</span>
                            </div>
                        </div>
                    </div>
                </div>
            </m.div>

            {/* Achievement Categories */}
            <div className="pl-2 md:pl-4">
                {sections.map((section, idx) => (
                    <CategorySection
                        key={section.category}
                        category={section.category}
                        items={section.items}
                        colorKey={colorKey}
                        isLast={idx === sections.length - 1}
                    />
                ))}
            </div>
        </m.section>
    );
}

function StatsOverview() {
    const stats = useMemo(() => {
        const college = accolades.college;
        const sh = accolades.seniorHigh;
        const jh = accolades.juniorHigh;
        const elem = accolades.elementary;

        return [
            {
                label: "Academic Honors",
                value: (college.honors?.length || 0) + (sh.honors?.length || 0) + (jh.honors?.length || 0) + (elem.honors?.length || 0),
                icon: Crown,
                color: "text-amber-500",
            },
            {
                label: "Awards Won",
                value: (college.awards?.length || 0) + (sh.awards?.length || 0) + (jh.awards?.length || 0) + (elem.awards?.length || 0),
                icon: Trophy,
                color: "text-blue-500",
            },
            {
                label: "Leadership Roles",
                value: (college.affiliations?.length || 0) + (sh.roles?.length || 0) + (jh.roles?.length || 0) + (elem.roles?.length || 0),
                icon: Briefcase,
                color: "text-emerald-500",
            },
            {
                label: "Academic Journey",
                value: 16,
                icon: Sparkles,
                color: "text-rose-500",
            },
        ];
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => (
                <m.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="relative overflow-hidden rounded-2xl p-6 border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl"
                >
                    <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-zinc-200/50 to-transparent dark:from-white/5 blur-xl" />
                    <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                    <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</p>
                </m.div>
            ))}
        </div>
    );
}

export default function AchievementsPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
        if (typeof window !== 'undefined' && (window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
        }
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full min-h-screen bg-background text-foreground selection:bg-blue-500/20">
            <MacOSMenuBar appName="Achievement Archive" />

            {/* Progress Bar removed to reduce flickering/distraction */}

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32">
                {/* Header */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to About
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <m.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4"
                            >
                                Achievement
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    Archive
                                </span>
                            </m.h1>
                            <m.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-muted-foreground max-w-xl font-light leading-relaxed"
                            >
                                A comprehensive verification ledger of academic honors, competitive awards, and leadership roles spanning over a decade.
                            </m.p>
                        </div>

                        <m.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="hidden md:flex flex-col items-end"
                        >
                            <span className="text-7xl font-black text-foreground/5 leading-none tracking-tighter">2009</span>
                            <span className="text-7xl font-black bg-gradient-to-b from-foreground/20 to-foreground/5 bg-clip-text text-transparent leading-none tracking-tighter -mt-4">2025</span>
                        </m.div>
                    </div>
                </m.div>

                {/* Stats Overview */}
                <StatsOverview />

                {/* Era Sections */}
                <div className="space-y-8">
                    <EraSection
                        title="College"
                        years="2021 — 2025"
                        data={accolades.college}
                        colorKey="blue"
                        icon={GraduationCapIcon}
                        index={0}
                    />
                    <EraSection
                        title="Senior High"
                        years="2019 — 2021"
                        data={accolades.seniorHigh}
                        colorKey="emerald"
                        icon={Sparkles}
                        index={1}
                    />
                    <EraSection
                        title="Junior High"
                        years="2015 — 2019"
                        data={accolades.juniorHigh}
                        colorKey="amber"
                        icon={Star}
                        index={2}
                    />
                    <EraSection
                        title="Elementary"
                        years="2009 — 2015"
                        data={accolades.elementary}
                        colorKey="rose"
                        icon={Medal}
                        index={3}
                    />
                </div>

                {/* Footer */}
                <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-16 border-t border-zinc-200 dark:border-white/5"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">
                                End of Archive
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Last updated: January 2025
                            </p>
                        </div>
                        <Link
                            href="/about"
                            className="px-6 py-3 rounded-full border border-zinc-300 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-all text-sm font-semibold flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to About
                        </Link>
                    </div>
                </m.div>
            </main>
        </div>
    );
}

function GraduationCapIcon(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    );
}
