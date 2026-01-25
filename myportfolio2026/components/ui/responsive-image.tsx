"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  cover?: boolean; // Whether to fill container (object-cover) or fit (object-contain)
}

export function ResponsiveImage({ src, alt, className = "", priority = false, sizes, cover = false }: ResponsiveImageProps) {
  const [aspectRatio, setAspectRatio] = useState<"landscape" | "portrait" | "square">("landscape");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      if (ratio > 1.2) {
        setAspectRatio("landscape");
      } else if (ratio < 0.8) {
        setAspectRatio("portrait");
      } else {
        setAspectRatio("square");
      }
      setImageLoaded(true);
    };
    img.onerror = () => {
      setImageLoaded(true); // Still show container even if image fails
    };
    img.src = src;
  }, [src]);

  const getHeightClass = () => {
    // If className already has height, use it, otherwise use aspect-based heights
    if (className.includes("h-")) {
      return "";
    }
    if (aspectRatio === "portrait") {
      return "h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]";
    } else if (aspectRatio === "square") {
      return "h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]";
    } else {
      return "h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]";
    }
  };

  const getObjectFit = () => {
    // Use object-cover to fill container if cover prop is true, otherwise use object-contain
    return cover ? "object-cover" : "object-contain";
  };

  const hasHeightClass = className.includes("h-");
  
  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] ${hasHeightClass ? "" : getHeightClass()} ${className}`}
      style={{
        ...(hasHeightClass ? {} : {
          minHeight: aspectRatio === "portrait" ? "400px" : aspectRatio === "square" ? "350px" : "300px",
        }),
      }}
    >
      {imageLoaded ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`${getObjectFit()} transition-opacity duration-300`}
          priority={priority}
          sizes={sizes || "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"}
          style={{
            objectPosition: "center center",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
}

