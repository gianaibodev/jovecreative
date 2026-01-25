"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-base/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Neural connection lines: center (50,50) to satellites — SVG path d does NOT support %, use viewBox coords */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="10%" stopColor="#a78b71" />
            <stop offset="90%" stopColor="#c9b8a0" />
          </linearGradient>
        </defs>
        {/* Solid: center to right satellite ~(78,36) */}
        <path d="M 50 50 Q 70 38 78 36" stroke="url(#gradient-line)" className="node-line animate-pulsing-branch" />
        {/* Solid: center to left satellite ~(22,66) */}
        <path d="M 50 50 Q 30 62 22 66" stroke="url(#gradient-line)" className="node-line animate-pulsing-branch" style={{ animationDelay: "0.5s" }} />
        {/* Solid: center to top ~(50,22) */}
        <path d="M 50 50 Q 50 32 50 22" stroke="url(#gradient-line)" className="node-line animate-pulsing-branch" style={{ animationDelay: "1s" }} />
        {/* Dashed flow lines */}
        <path d="M 50 50 Q 65 42 75 38" stroke="#c9b8a0" strokeWidth="1.5" strokeDasharray="5 15" fill="none" opacity={0.35} className="animate-pulsing-branch" style={{ animationDelay: "0.3s" }} />
        <path d="M 50 50 Q 32 58 22 66" stroke="#a78b71" strokeWidth="1.5" strokeDasharray="5 15" fill="none" opacity={0.35} className="animate-pulsing-branch" style={{ animationDelay: "0.8s" }} />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            <h1 className="font-playfair italic font-medium leading-[1.1] text-foreground mb-8" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
                The future of <br/>
                <span className="text-gold-base">your des(ai)gn</span>
            </h1>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
            <button className="px-8 py-4 bg-white text-black rounded-full font-inter font-medium text-sm hover:bg-gold-light transition-colors w-full sm:w-auto">
                Get Started
            </button>
            <button className="px-8 py-4 glass-card border-white/20 text-white rounded-full font-inter font-medium text-sm hover:bg-white/5 transition-colors w-full sm:w-auto">
                View Showreel
            </button>
        </motion.div>

        {/* Central Node Card — 16:9, central glow per spec; bg image per spec */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-video max-w-4xl mx-auto glass-card border border-white/10 overflow-hidden group shadow-[0_0_100px_rgba(167,139,113,0.2)]"
        >
             <Image src="/hero/node-bg.jpg" alt="" fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" priority />
             <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10" />
             <div className="absolute inset-0 flex items-center justify-center text-white/20 font-playfair text-4xl italic z-20">Interactive Node</div>
        </motion.div>
      </div>

      {/* Satellite cards: section-relative to align with SVG endpoints; 220–260px, rounded-20, grayscale→color hover, scale 1.05, gold shadow on hover */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute left-[76%] top-[36%] -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[260px] pointer-events-auto hidden md:block">
          <motion.div
            className="relative aspect-[4/5] glass-card border border-white/10 rounded-[20px] overflow-hidden grayscale hover:grayscale-0 hover:scale-105 hover:shadow-[0_0_60px_rgba(167,139,113,0.3)] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/satellites/01.jpg" alt="" fill className="object-cover" sizes="260px" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gold-base/10" />
          </motion.div>
        </div>
        <div className="absolute left-[24%] top-[64%] -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[260px] pointer-events-auto hidden md:block">
          <motion.div
            className="relative aspect-[4/5] glass-card border border-white/10 rounded-[20px] overflow-hidden grayscale hover:grayscale-0 hover:scale-105 hover:shadow-[0_0_60px_rgba(167,139,113,0.3)] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Image src="/satellites/02.jpg" alt="" fill className="object-cover" sizes="260px" />
            <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-gold-base/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
