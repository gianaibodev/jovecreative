"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { ErrorBoundary } from "@/components/error-boundary";

import { useCopyMode } from "@/components/copy-mode-provider";

// Lazy load heavy Three.js-based Hero (GSAP + shader animation)
const SyntheticHero = dynamic(
  () => import("@/components/ui/synthetic-hero").then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted" />
    ),
  },
);

// Lazy load below-the-fold sections
const QuoteSection = dynamic(
  () => import("@/components/quote-section").then((mod) => ({ default: mod.QuoteSection })),
  { ssr: false, loading: () => <div className="min-h-[180px]" /> },
);

const PortfolioGallery = dynamic(
  () => import("@/components/ui/portfolio-gallery").then((mod) => ({ default: mod.PortfolioGallery })),
  { ssr: false, loading: () => <div className="min-h-[320px]" /> },
);

const LogoCloud = dynamic(
  () => import("@/components/ui/logo-cloud-4").then((mod) => ({ default: mod.LogoCloud })),
  { ssr: false, loading: () => <div className="min-h-[120px]" /> },
);

type GalleryImage = {
  src: string;
  alt: string;
};

// Lazy load heavy components that are below the fold
const SplineSceneBasic = dynamic(
  () => import("@/components/demos/spline-scene-demo").then((mod) => ({ default: mod.SplineSceneBasic })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] bg-slate-100 dark:bg-black/[0.96] rounded-lg" />
    ),
  },
);

const CircularGalleryDemo = dynamic(() => import("@/components/demos/circular-gallery-demo"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full rounded-lg overflow-hidden bg-muted/50" />
  ),
});

export default function HomeClient({ galleryImages }: { galleryImages: GalleryImage[] }) {
  const { copyMode, toggleCopyMode } = useCopyMode();

  useEffect(() => {
    // Add scroll reveal animations (defensive for iOS)
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    try {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      const elements = document.querySelectorAll(".fade-in-on-scroll");
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    } catch (error) {
      console.warn("IntersectionObserver setup failed:", error);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <ErrorBoundary>
      <div className="w-full overflow-x-hidden">
        <MacOSMenuBar />




        <div id="home" className="w-full min-h-screen flex flex-col relative overflow-visible">
          <ErrorBoundary
            fallback={
              <div className="flex items-center justify-center min-h-screen px-4">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">
                    {copyMode === "plain" 
                      ? "Websites that build trust and drive growth."
                      : "Building high-end digital experiences."}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    {copyMode === "plain"
                      ? "I help businesses worldwide launch modern, fast, and mobile-friendly websites without the headache."
                      : "Crafting products where design meets performance. From strategy to key visuals, I build scalable digital solutions that convert."}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <a href="#projects" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      {copyMode === "plain" ? "See My Work" : "View My Work"}
                    </a>
                    <button onClick={toggleCopyMode} className="px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg">
                      {copyMode === "plain" ? "Read Technical Version" : "Read Simple Version"}
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            <SyntheticHero
              title={copyMode === "plain" ? "Websites that build trust and drive growth." : "Building high-end digital experiences."}
              description={copyMode === "plain" 
                ? "I help businesses worldwide launch modern, fast, and mobile-friendly websites without the headache."
                : "Crafting products where design meets performance. From strategy to key visuals, I build scalable digital solutions that convert."}
              badgeText={copyMode === "plain" ? "2026 Portfolio" : "Portfolio 2026"}
              badgeLabel="Available for hire"
              ctaButtons={[
                { text: copyMode === "plain" ? "See My Work" : "View My Work", href: "#projects", primary: true },
                { 
                  text: copyMode === "plain" ? "Read Technical Version" : "Read Simple Version", 
                  onClick: toggleCopyMode 
                },
              ]}
              microDetails={copyMode === "plain"
                ? ["Modern Design", "Mobile-First", "Fast Loading"]
                : ["Design-driven Engineering", "1,500+ Global Members Led", "#1 of 7,042 · 1st Year"]}
            />
          </ErrorBoundary>
        </div>

        {/* Quote Section - Appears after scroll */}
        <section className="w-full fade-in-on-scroll relative z-10">
          <QuoteSection />
        </section>

        {/* Portfolio Gallery Section */}
        <div id="projects" className="scroll-mt-24">
          <PortfolioGallery
            title="Featured Projects"
            archiveButton={{
              text: "View All Projects",
              href: "/projects",
            }}
            images={galleryImages}
          />
        </div>

        {/* Interactive 3D Section */}
        <section
          id="interactive-3d"
          className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 relative z-10 fade-in-on-scroll overflow-x-hidden"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-7xl mx-auto backdrop-blur-xl bg-white/40 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/[0.12] rounded-[32px] p-8 md:p-12 shadow-2xl"
          >
            <div className="max-w-3xl mb-12">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                {copyMode === "plain" ? "Interactive & 3D Design" : "Mastering Motion & 3D"}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground font-light leading-relaxed">
                {copyMode === "plain" ? (
                  "I create websites that feel alive. Using modern 3D tools and animation, I make sure your brand stands out and keeps visitors engaged longer."
                ) : (
                  <>
                    Blending technical code with creative artistry. I leverage{" "}
                    <span className="text-foreground font-semibold">Blender</span> for 3D modeling,{" "}
                    <span className="text-foreground font-semibold">After Effects</span> for motion design, and{" "}
                    <span className="text-foreground font-semibold">Three.js / React Three Fiber</span> to bring interactive
                    experiences to the browser.
                  </>
                )}
              </motion.p>
            </div>
            <motion.div
              variants={itemVariants}
              className="rounded-2xl overflow-hidden border border-zinc-300 dark:border-white/[0.05] shadow-inner"
            >
              <ErrorBoundary
                fallback={
                  <div className="w-full h-[500px] bg-slate-100 dark:bg-black/[0.96] flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/20">
                    <h3 className="text-xl font-bold mb-2">3D Scene Unavailable</h3>
                    <p className="text-muted-foreground text-center max-w-md px-4">
                      The interactive 3D scene couldn't be loaded on your browser.
                      Try using a different browser or device for the full experience.
                    </p>
                  </div>
                }
              >
                <SplineSceneBasic />
              </ErrorBoundary>
            </motion.div>
          </motion.div>
        </section>

        {/* Circular Gallery Section */}
        <section className="w-full py-8 sm:py-12 relative z-10 fade-in-on-scroll">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-7xl mx-auto px-4"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-4 text-center text-gray-900 dark:text-white"
            >
              {copyMode === "plain" ? "6 Months on the Road" : "6 Months on the Road"}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto text-lg leading-relaxed"
            >
              {copyMode === "plain" 
                ? "After finishing school, I spent 6 months backpacking across different countries, funding my travels through freelance work—SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to find a real job and bring those fresh perspectives into my work."
                : "After graduating, I spent 6 months backpacking across different countries, funding my travels through freelance work—SEO, design, video, photography, web design, AI tasks, and more. Now, with this portfolio launched, I'm ready to find a real job and bring those fresh perspectives into my work."}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-500 dark:text-gray-500 mb-8 max-w-2xl mx-auto text-sm italic"
            >
              {copyMode === "plain" 
                ? "Traveling and experiencing different cultures has been a huge boost to my creativity—learning design styles, color palettes, and visual languages from around the world."
                : "Traveling and experiencing different cultures has been a huge boost to my creativity—learning design styles, color palettes, and visual languages from around the world."}
            </motion.p>
            <motion.div variants={itemVariants}>
              <CircularGalleryDemo />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-8 sm:py-12 md:py-16 relative z-10 fade-in-on-scroll overflow-x-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-6xl mx-auto px-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="text-left">
                <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                  About Me
                </motion.h2>
                <motion.div variants={itemVariants} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  {copyMode === "plain" ? (
                    <>
                      <p>
                        I&apos;m <span className="font-bold text-foreground">Gian Aibo C. Boyero</span>, a designer and developer who builds websites that work.
                        I recently graduated with honors, but my focus is 100% on delivering real results for clients.
                      </p>
                      <p>
                        Whether you need a simple landing page or a full online store, I handle the technical details so you can focus on your business.
                        I value clear communication, hitting deadlines, and making things look professional.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        I&apos;m <span className="font-bold text-foreground">Gian Aibo C. Boyero</span>, a Computer Science
                        graduate (Class 2025) from the University of St. La Salle, where I achieved{" "}
                        <span className="text-foreground font-semibold">Cum Laude</span> honors with a 1.3 (97%) GPA.
                      </p>
                      <p>
                        My academic journey is marked by excellence—I ranked{" "}
                        <span className="text-foreground font-semibold">#1 of 7,042</span> across all colleges in my first year.
                        I blend technical rigor with a deep passion for visual storytelling and community leadership.
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
                </motion.div>
              </div>

              <div className="space-y-8">
                <motion.div
                  variants={itemVariants}
                  className="p-8 rounded-[32px] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-300 dark:border-white/5"
                >
              <h3 className="text-xl font-bold mb-6">
                {copyMode === "plain" ? "Education & Training" : "Formal Education"}
              </h3>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-blue-500/30">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5" />
                  <h4 className="font-bold">College — University of St. La Salle</h4>
                  <p className="text-sm text-muted-foreground">Bachelor of Science in Computer Science (2021-2025)</p>
                  <p className="text-xs font-medium text-blue-600 mt-1 uppercase tracking-wider">
                    Cum Laude • GWA 1.3 / 97%
                  </p>
                </div>
                <div className="relative pl-6 border-l-2 border-green-500/30">
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-1.5" />
                  <h4 className="font-bold">Senior High School</h4>
                  <p className="text-sm text-muted-foreground">STEM • Liceo De La Salle</p>
                  <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-1 uppercase tracking-wider">
                    With Highest Honors • 98%
                  </p>
                </div>
                <div className="relative pl-6 border-l-2 border-orange-500/30">
                  <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-1.5" />
                  <h4 className="font-bold">Junior High School</h4>
                  <p className="text-sm text-muted-foreground">Holy Infant Academy</p>
                  <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mt-1 uppercase tracking-wider">
                    Highest Honors • Rank 1 • 98.2%
                  </p>
                </div>
                <div className="relative pl-6 border-l-2 border-pink-500/30">
                  <div className="absolute w-3 h-3 bg-pink-500 rounded-full -left-[7px] top-1.5" />
                  <h4 className="font-bold">Primary School</h4>
                  <p className="text-sm text-muted-foreground">Holy Infant Academy</p>
                  <p className="text-xs font-medium text-pink-600 dark:text-pink-400 mt-1 uppercase tracking-wider">
                    Valedictorian • 97.4%
                  </p>
                </div>
              </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                  {["11x Google Certified", "3x Canva Designer", "IBM Certified", "7x Microsoft Trophies"].map((cert) => (
                    <span
                      key={cert}
                      className="px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </motion.div>
                <motion.div variants={itemVariants} className="pt-8">
                  <motion.a
                    href="/about"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold shadow-xl shadow-blue-500/30 hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/40 transition-all"
                    suppressHydrationWarning
                  >
                    <span>Know More About Me</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Vendors/Partners Section */}
        <section className="w-full py-6 sm:py-8 relative z-10 fade-in-on-scroll">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="w-full"
          >
            <motion.h2 variants={itemVariants} className="mb-12 text-center">
              <span className="block font-medium text-lg text-muted-foreground uppercase tracking-[0.2em] mb-2">
                {copyMode === "plain" ? "Experience" : "Companies & Organizations"}
              </span>
              <span className="font-bold text-2xl md:text-4xl text-foreground tracking-tight">
                {copyMode === "plain" ? "Trusted Partners" : "Trusted by Global Communities"}
              </span>
            </motion.h2>

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
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-8 sm:py-12 md:py-16 relative z-10 fade-in-on-scroll overflow-x-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto px-4 text-center backdrop-blur-xl bg-white/40 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/[0.12] rounded-[32px] p-12 shadow-2xl"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-8">
              {copyMode === "plain" ? "Ready to start?" : "Get In Touch"}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
              {copyMode === "plain" 
                ? "Let's discuss your project. I'm currently accepting new clients."
                : "I'm always open to new opportunities, collaborations, and conversations."}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4" suppressHydrationWarning>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:hello@gianaibo.com"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 dark:bg-white px-8 py-4 text-white dark:text-black font-bold shadow-xl shadow-blue-500/20 dark:shadow-none transition-all active:scale-95"
                suppressHydrationWarning
              >
                {copyMode === "plain" ? "Get a Quote" : "Send Email"}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/gianaibo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-white/[0.12] bg-white/40 dark:bg-white/[0.03] px-8 py-4 text-foreground dark:text-white font-bold backdrop-blur-xl shadow-xl transition-all active:scale-95"
                suppressHydrationWarning
              >
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </ErrorBoundary>
  );
}


