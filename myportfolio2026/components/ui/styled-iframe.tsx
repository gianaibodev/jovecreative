"use client";

interface StyledIframeProps {
  src: string;
  title?: string;
  className?: string;
  allowFullScreen?: boolean;
}

export function StyledIframe({ src, title, className = "", allowFullScreen = true }: StyledIframeProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] shadow-2xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10" />
      <div className="relative aspect-video w-full">
        <iframe
          src={src}
          title={title || "Embedded content"}
          className="absolute inset-0 w-full h-full border-0 rounded-3xl"
          allowFullScreen={allowFullScreen}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50" />
    </div>
  );
}



