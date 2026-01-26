'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, Globe, Phone, ArrowUpRight, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';
import { useFullPageLoading } from '@/components/full-page-loading-context';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	external?: boolean;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Navigation',
		links: [
			{ title: 'Home', href: '/#home' },
			{ title: 'Projects', href: '/projects' },
			{ title: 'About', href: '/about' },
			{ title: 'Contact', href: '/contact' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'All Projects', href: '/projects' },
			{ title: 'About Me', href: '/about' },
			{ title: 'Credits', href: '/credits' },
		],
	},
	{
		label: 'Contact',
		links: [
			{ title: 'gianaibo.dev@gmail.com', href: 'mailto:gianaibo.dev@gmail.com', icon: Mail },
			{ title: '+63 962 644 2911', href: 'tel:+639626442911', icon: Phone },
			{ title: 'WhatsApp', href: 'https://wa.me/639626442911', icon: MessageCircle, external: true },
			{ title: 'Telegram @gibandtake', href: 'https://t.me/gibandtake', icon: Send, external: true },
			{ title: 'gianaibo.tech', href: 'https://gianaibo.tech', icon: Globe, external: true },
		],
	},
	{
		label: 'Social',
		links: [
			{ title: 'LinkedIn', href: 'https://linkedin.com/in/aiboboyero', icon: Linkedin, external: true },
			{ title: 'Facebook', href: 'https://facebook.com/gianheybo', icon: Facebook, external: true },
			{ title: 'Instagram', href: 'https://instagram.com/gianheybo', icon: Instagram, external: true },
			{ title: 'Threads', href: 'https://threads.net/@gianheybo', external: true },
		],
	},
];

export function Footer() {
	const { isActive } = useFullPageLoading();
	if (isActive) return null;

	return (
		<footer className="relative w-full border-t border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-xl">
			<div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
				{/* Gradient line at top */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

				<div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-12">
					{/* Brand */}
					<AnimatedContainer className="space-y-4">
						<Link href="/" className="inline-flex items-center gap-3 group" suppressHydrationWarning>
							<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
								G
							</div>
							<div>
								<div className="font-bold text-lg tracking-tight">Gian Aibo</div>
								<div className="text-xs text-muted-foreground">Portfolio 2026</div>
							</div>
						</Link>
						<p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
							Design Engineer with full-stack capabilities — UI/UX Designer, Graphic Designer & AI Engineer based in the Philippines.
						</p>
						<p className="text-muted-foreground text-xs">
							© {new Date().getFullYear()} Gian Aibo Boyero. All rights reserved.
						</p>
					</AnimatedContainer>

					{/* Links Grid */}
					<div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
						{footerLinks.map((section, index) => (
							<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
								<div className="mb-10 md:mb-0">
									<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
										{section.label}
									</h3>
									<ul className="space-y-3">
										{section.links.map((link) => (
											<li key={link.title}>
												{link.external ? (
													<a
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors duration-200 group"
														suppressHydrationWarning
													>
														{link.icon && <link.icon className="w-3.5 h-3.5" />}
														<span>{link.title}</span>
														<ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
													</a>
												) : (
													<Link
														href={link.href}
														className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors duration-200"
														suppressHydrationWarning
													>
														{link.icon && <link.icon className="w-3.5 h-3.5" />}
														<span>{link.title}</span>
													</Link>
												)}
											</li>
										))}
									</ul>
								</div>
							</AnimatedContainer>
						))}
					</div>
				</div>

				{/* Bottom bar */}
				<AnimatedContainer delay={0.5} className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/5">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
						<span>Built with Next.js & Tailwind CSS</span>
						<div className="flex items-center gap-4">
							<Link href="/about" className="hover:text-foreground transition-colors" suppressHydrationWarning>About</Link>
							<Link href="/credits" className="hover:text-foreground transition-colors" suppressHydrationWarning>Credits</Link>
							<Link href="/contact" className="hover:text-foreground transition-colors" suppressHydrationWarning>Contact</Link>
						</div>
					</div>
				</AnimatedContainer>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: string;
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<m.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</m.div>
	);
}

export default Footer;
