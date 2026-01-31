"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { PixelHeader } from "@/components/ui/pixel-header";
import {
    Mail,
    Linkedin,
    Github,
    Instagram,
    Facebook,
    Twitter,
    Globe,
    MessageCircle,
    Send,
    ArrowUpRight,
    Copy,
    CheckCircle2,
    Calendar,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
    {
        name: "LinkedIn",
        label: "aiboboyero",
        href: "https://linkedin.com/in/aiboboyero",
        icon: Linkedin,
        color: "bg-blue-600",
        description: "Professional network & experience"
    },
    {
        name: "GitHub",
        label: "@gianaibodev",
        href: "https://github.com/gianaibodev",
        icon: Github,
        color: "bg-zinc-800",
        description: "Code repositories & contributions"
    },
    {
        name: "Instagram",
        label: "@gianheybo",
        href: "https://instagram.com/gianheybo",
        icon: Instagram,
        color: "bg-pink-600",
        description: "Photography & life snippets"
    },
    {
        name: "Facebook",
        label: "aiboboyero",
        href: "https://facebook.com/aiboboyero",
        icon: Facebook,
        color: "bg-blue-700",
        description: "Personal updates & community"
    },
    {
        name: "Telegram",
        label: "@gibandtake",
        href: "https://t.me/gibandtake",
        icon: Send,
        color: "bg-sky-500",
        description: "Fast direct messaging"
    },
    {
        name: "WhatsApp",
        label: "+63 962 644 2911",
        href: "https://wa.me/639626442911",
        icon: MessageCircle,
        color: "bg-emerald-500",
        description: "Business & project chat"
    }
];

const ContactMethod = ({
    icon: Icon,
    title,
    value,
    href,
    className
}: {
    icon: any,
    title: string,
    value: string,
    href?: string,
    className?: string
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        if (!href) {
            e.preventDefault();
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const Content = (
        <div
            className={cn(
                "group relative overflow-hidden rounded-3xl p-6 border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                className
            )}
            onClick={handleCopy}
        >
            <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Icon size={24} />
                </div>
                {!href && (
                    <div className="text-muted-foreground/40 group-hover:text-blue-500 transition-colors">
                        {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </div>
                )}
                {href && (
                    <div className="text-muted-foreground/40 group-hover:text-blue-500 transition-colors">
                        <ArrowUpRight size={18} />
                    </div>
                )}
            </div>
            <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">{title}</p>
                <p className="text-lg font-semibold tracking-tight text-foreground">{value}</p>
            </div>
        </div>
    );

    if (href) {
        return <a href={href} target="_blank" rel="noopener noreferrer">{Content}</a>;
    }

    return Content;
};

export default function ContactPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full min-h-screen bg-background selection:bg-blue-500/30">
            <MacOSMenuBar appName="Connect with Gian" />

            <PixelHeader
                title="Let's build something extraordinary"
                subtitle="I'm currently open to new opportunities, high-end freelance projects, and collaborations in AI, design engineering, and full-stack development."
                colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]}
                categoryIcon={<Sparkles className="size-4" />}
                categoryText="Contact 2026"
                maxWidth="max-w-7xl"
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Top Row: Direct Contact */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContactMethod
                            icon={Mail}
                            title="Primary Email"
                            value="gianaibo.dev@gmail.com"
                            href="mailto:gianaibo.dev@gmail.com"
                            className="md:col-span-1"
                        />
                        <ContactMethod
                            icon={MessageCircle}
                            title="Secondary Email"
                            value="gianaiboboyero@gmail.com"
                            href="mailto:gianaiboboyero@gmail.com"
                            className="md:col-span-1"
                        />

                        {/* Booking / Calendar Section */}
                        <a
                            href="https://calendar.google.com/calendar/render?action=TEMPLATE&add=gianaibo.dev@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="md:col-span-2 group relative overflow-hidden rounded-[32px] p-8 border border-blue-500/30 bg-blue-500/5 backdrop-blur-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            <div className="absolute top-0 right-0 p-8 text-blue-500/20 group-hover:scale-110 transition-transform">
                                <Calendar size={120} strokeWidth={1} />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-blue-500/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    Available for Calls
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 text-foreground">Book a 30-min discovery call</h2>
                                <p className="text-muted-foreground text-lg max-w-xl mb-8 leading-relaxed">
                                    Fastest way to get a project started. We'll discuss your goals, timeline, and how my technical-design hybrid approach can add value.
                                </p>
                                <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-xl shadow-blue-500/20">
                                    Schedule Meeting
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Sidebar: Location & Availability */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="rounded-3xl p-8 border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-6">Current Location</h3>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <p className="text-lg font-bold tracking-tight">Manila / Bacolod</p>
                                    <p className="text-sm text-muted-foreground">Philippines (GMT+8)</p>
                                </div>
                            </div>
                            <hr className="border-zinc-200 dark:border-white/5 mb-8" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-4">Availability</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground lowercase opacity-70">Freelance projects</span>
                                    <span className="font-bold text-emerald-500">Available</span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground lowercase opacity-70">Full-time roles</span>
                                    <span className="font-bold text-blue-500 uppercase">Open to work</span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground lowercase opacity-70">Response time</span>
                                    <span className="font-bold text-foreground font-mono">&lt; 12 hours</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Grid: Social Ecosystem */}
                    <div className="lg:col-span-12">
                        <h3 className="text-xl font-bold tracking-tight mb-8 px-2 flex items-center gap-3">
                            Connect Digital Ecosystem
                            <div className="h-px flex-1 bg-zinc-200 dark:bg-white/5" />
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden rounded-[24px] p-6 border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl transition-all hover:border-blue-500/30 hover:shadow-xl hover:shadow-black/5 active:scale-[0.98]"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={cn(
                                            "size-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6",
                                            social.color,
                                            "text-white shadow-lg"
                                        )}>
                                            <social.icon size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg tracking-tight group-hover:text-blue-500 transition-colors">{social.name}</h4>
                                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-60">{social.label}</p>
                                        </div>
                                        <div className="ml-auto p-2 rounded-full border border-zinc-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                    <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                                        {social.description}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground/30">
                    DESIGNED & ENGINEERED BY GIAN AIBO · MMXVI - MMXXVI
                </p>
            </footer>
        </div>
    );
}
