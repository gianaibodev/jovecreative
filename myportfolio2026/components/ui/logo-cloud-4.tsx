"use client";

import Image from "next/image";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative mx-auto max-w-4xl py-14 px-12 bg-white dark:bg-white border-2 border-zinc-200 dark:border-zinc-100 rounded-[48px] shadow-2xl overflow-hidden">
      <div className="flex animate-marquee gap-12" style={{ "--duration": "30s" } as React.CSSProperties}>
        {duplicatedLogos.map((logo, index) => (
          <div 
            key={`logo-${logo.src}-${index}`} 
            className="relative h-12 w-32 md:h-16 md:w-40 flex-shrink-0 flex items-center justify-center hover:scale-110 transition-all duration-300"
          >
            <Image
              alt={logo.alt}
              className="object-contain pointer-events-none select-none"
              src={logo.src}
              fill
              sizes="(max-width: 768px) 128px, 160px"
            />
          </div>
        ))}
      </div>

      {/* Left blur overlay */}
      <div 
        className="pointer-events-none absolute top-0 left-0 h-full w-[160px] z-10"
        style={{
          background: "linear-gradient(to right, white 0%, white 20%, transparent 100%)",
        }}
      />
      {/* Right blur overlay */}
      <div 
        className="pointer-events-none absolute top-0 right-0 h-full w-[160px] z-10"
        style={{
          background: "linear-gradient(to left, white 0%, white 20%, transparent 100%)",
        }}
      />
    </div>
  );
}
