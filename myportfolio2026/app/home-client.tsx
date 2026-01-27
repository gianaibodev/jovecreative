"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { m } from "framer-motion";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { ErrorBoundary } from "@/components/error-boundary";
import { useCopyMode } from "@/components/copy-mode-provider";
import { GradesModal, collegeGrades } from "@/components/academic-modals";

// --- DYNAMIC IMPORTS ---
interface SyntheticHeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href?: string; primary?: boolean; onClick?: () => void }>;
  microDetails?: Array<string>;
}

const SyntheticHero = dynamic<SyntheticHeroProps>(
  () => import("@/components/ui/synthetic-hero").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-background" />,
  }
);

const QuoteSection = dynamic(
  () => import("@/components/quote-section").then((mod) => ({ default: mod.QuoteSection })),
  { ssr: false, loading: () => <div className="h-[180px]" /> }
);

const PortfolioGallery = dynamic(
  () => import("@/components/ui/portfolio-gallery").then((mod) => ({ default: mod.PortfolioGallery })),
  { ssr: false, loading: () => <div className="h-[320px]" /> }
);

const LogoCloud = dynamic(
  () => import("@/components/ui/logo-cloud-4").then((mod) => ({ default: mod.LogoCloud })),
  { ssr: false, loading: () => <div className="h-[120px]" /> }
);

const SplineSceneBasic = dynamic(
  () => import("@/components/demos/spline-scene-demo").then((mod) => ({ default: mod.SplineSceneBasic })),
  {
    ssr: false,
    loading: () => <div className="w-full h-[500px] bg-muted/10 rounded-lg" />,
  }
);

const CircularGalleryDemo = dynamic(() => import("@/components/demos/circular-gallery-demo"), {
  ssr: false,
  loading: () => <div className="relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full rounded-lg overflow-hidden bg-muted/50" />,
});

// Simplified Deferred for performance
function Deferred({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return shouldRender ? <>{children}</> : null;
}

type GalleryImage = {
  src: string;
  alt: string;
};

export default function HomeClient({ galleryImages }: { galleryImages: GalleryImage[] }) {
  const { copyMode, toggleCopyMode } = useCopyMode();
  const [showGrades, setShowGrades] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <ErrorBoundary>
      <div className="w-full overflow-x-hidden flex flex-col gap-0 selection:bg-blue-500/30">
        <MacOSMenuBar />

        {/* HERO SECTION */}
        <div id="home" className="w-full min-h-screen relative overflow-visible">
          <ErrorBoundary fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <Deferred delay={0}>
              <SyntheticHero
                title={copyMode === "plain" ? "Websites that build trust and drive growth." : "Building high-end digital experiences."}
                description={copyMode === "plain"
                  ? "I help businesses worldwide launch modern, fast, and mobile-friendly websites without the headache."
                  : "Crafting products where design meets performance. From strategy to key visuals, I build scalable digital solutions that convert."}
                badgeText={copyMode === "plain" ? "2026 Portfolio" : "Portfolio 2026"}
                badgeLabel="Available for hire"
                ctaButtons={[
                  { text: copyMode === "plain" ? "See My Work" : "View My Work", href: "#projects", primary: true },
                  { text: copyMode === "plain" ? "Read Technical Version" : "Read Simple Version", onClick: toggleCopyMode },
                ]}
                microDetails={copyMode === "plain"
                  ? ["Modern Design", "Mobile-First", "Fast Loading"]
                  : ["Design-driven Engineering", "1,500+ Global Members Led", "#1 of 7,042 · 1st Year"]}
              />
            </Deferred>
          </ErrorBoundary>
        </div>

        {/* QUOTE SECTION */}
        <section className="w-full relative z-10 py-12 overflow-visible">
          <QuoteSection />
        </section>

        {/* PORTFOLIO GALLERY */}
        <div id="projects" className="scroll-mt-24">
          <PortfolioGallery
            title="Featured Projects"
            archiveButton={{ text: "View All Projects", href: "/projects" }}
            images={galleryImages}
          />
        </div>

        {/* INTERACTIVE 3D SECTION */}
        <section id="interactive-3d" className="w-full py-16 px-4 sm:px-6 lg:px-16 relative z-10 overflow-visible">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="max-w-7xl mx-auto backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 md:p-12 shadow-sm will-change-transform"
          >
            <div className="max-w-3xl mb-12">
              <m.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                {copyMode === "plain" ? "Interactive & 3D Design" : "Mastering Motion & 3D"}
              </m.h2>
              <m.p variants={itemVariants} className="text-lg text-muted-foreground font-light leading-relaxed">
                {copyMode === "plain" ? (
                  "I create websites that feel alive. Using modern 3D tools and animation, I make sure your brand stands out and keeps visitors engaged longer."
                ) : (
                  <>
                    Blending technical code with creative artistry. I leverage{" "}
                    <span className="text-foreground font-semibold">Blender</span> for 3D modeling,{" "}
                    <span className="text-foreground font-semibold">After Effects</span> for motion design, and{" "}
                    <span className="text-foreground font-semibold">Three.js / React Three Fiber</span> to bring interactive experiences to the browser.
                  </>
                )}
              </m.p>
            </div>

            <m.div variants={itemVariants} className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-muted/5">
              <ErrorBoundary fallback={<div className="h-[400px] bg-muted" />}>
                <Deferred delay={200}>
                  <SplineSceneBasic />
                </Deferred>
              </ErrorBoundary>
            </m.div>
          </m.div>
        </section>

        {/* CIRCULAR GALLERY SECTION */}
        <section className="w-full py-24 relative z-10 overflow-visible">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="max-w-7xl mx-auto px-4"
          >
            <m.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-4 text-center">
              6 Months on the Road
            </m.h2>
            <m.p variants={itemVariants} className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
              {copyMode === "plain"
                ? "After finishing school, I spent 6 months backpacking across different countries, funding my travels through freelance work—SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to transition into a full-time professional role and bring those fresh perspectives into my work."
                : "After graduating, I spent 6 months backpacking across different countries, funding my travels through freelance work—SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to embark on my next professional chapter and bring those global perspectives into my work."}
            </m.p>
            <m.p variants={itemVariants} className="text-center text-gray-500 mb-12 max-w-2xl mx-auto text-sm italic">
              "Traveling and experiencing different cultures has been a huge boost to my creativity—learning design styles, color palettes, and visual languages from around the world."
            </m.p>

            <m.div variants={itemVariants}>
              <Deferred delay={200}>
                <CircularGalleryDemo />
              </Deferred>
            </m.div>
          </m.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="w-full py-16 relative z-10 overflow-visible">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="max-w-6xl mx-auto px-4"
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
                            <li>• Outstanding Intern Award &apos;25</li>
                            <li>• Legacy Builder Award &apos;25</li>
                            <li>• PH Creative Awards Top 10</li>
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

                <m.div variants={itemVariants} className="pt-8 text-center lg:text-left">
                  <a
                    href="/about"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                    suppressHydrationWarning
                  >
                    <span>Know More About Me</span>
                  </a>
                </m.div>
              </div>
            </div>
          </m.div>
        </section>

        {/* VENDORS SECTION */}
        <section className="w-full py-12 relative z-10 overflow-visible">
          <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <LogoCloud
              logos={[
                { src: "/framer/framer-18.png", alt: "Google" },
                { src: "/framer/framer-19.png", alt: "GDSC" },
                { src: "/framer/framer-13.png", alt: "Armada Brands" },
                { src: "/framer/framer-12.png", alt: "Tigris Publication" },
                { src: "/framer/framer-22.png", alt: "DEVCON Ph" },
                { src: "/framer/framer-04.png", alt: "Devcon" },
              ]}
            />
          </m.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact-redirect" className="w-full py-16 relative z-10 overflow-visible">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto px-4 text-center backdrop-blur-md bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-12 shadow-lg"
          >
            <m.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-8">
              {copyMode === "plain" ? "Ready to start?" : "Get In Touch"}
            </m.h2>
            <m.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
              {copyMode === "plain"
                ? "Let's discuss your project. I'm currently accepting new clients."
                : "I'm always open to new opportunities, collaborations, and conversations."}
            </m.p>
            <m.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@gianaibo.com"
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95"
                suppressHydrationWarning
              >
                Email Me
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 text-foreground dark:text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                suppressHydrationWarning
              >
                Connect Socially
                <ArrowUpRight size={18} />
              </Link>
            </m.div>
          </m.div>
        </section>

        <GradesModal isOpen={showGrades} onClose={() => setShowGrades(false)} />
      </div>
    </ErrorBoundary>
  );
}
