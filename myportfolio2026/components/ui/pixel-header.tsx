"use client";

import { MeshGradient, Dithering } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

interface PixelHeaderProps {
  colors?: string[];
  title: string;
  subtitle?: string;
  categoryIcon?: React.ReactNode;
  categoryText?: string;
  backLink?: React.ReactNode;
  maxWidth?: string;
}

export function PixelHeader({
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
  title,
  subtitle,
  categoryIcon,
  categoryText,
  backLink,
  maxWidth = "max-w-6xl",
}: PixelHeaderProps) {
  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden">
      <MeshGradient
        colors={colors}
        swirl={0.75}
        distortion={0.5}
        speed={0.05}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      <Dithering
        colorBack="#000000"
        colorFront="#ffffff"
        scale={0.8}
        shape="dots"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.4,
          mixBlendMode: "overlay",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      <div className={`relative container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 text-left h-full flex flex-col justify-end ${maxWidth}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 sm:gap-3"
        >
          {backLink && <div className="mb-1 sm:mb-2">{backLink}</div>}
          {(categoryIcon || categoryText) && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80">
              {categoryIcon}
              {categoryText && <p className="break-words">{categoryText}</p>}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight break-words">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl font-medium leading-relaxed break-words">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

