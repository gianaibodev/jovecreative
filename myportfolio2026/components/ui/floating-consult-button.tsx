'use client';

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useFullPageLoading } from "@/components/full-page-loading-context";

interface FloatingConsultButtonProps {
  buttonSize?: number;
  imageSize?: number;
  imageSrc?: string;
  imageAlt?: string;
  revolvingText?: string;
  revolvingSpeed?: number;
  popupHeading?: string;
  popupDescription?: string;
  popupBadgeText?: string;
  ctaButtonText?: string;
  ctaButtonAction?: () => void;
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
  };
}

export const FloatingConsultButton = ({
  buttonSize,
  imageSize,
  imageSrc = "/lib/image.jpeg",
  imageAlt = "Gian Aibo - Portfolio consultant profile photo",
  revolvingText = "LET'S TALK • FREE CONSULTATION • ",
  revolvingSpeed = 10,
  popupHeading = "30-minutes call",
  popupDescription = "This will be a brief, free call with one of Bricks Studio's design and development producers to discuss your project and determine if we're a good fit.",
  popupBadgeText = "Free",
  ctaButtonText = "Book a call",
  ctaButtonAction = () => console.log("CTA clicked"),
  position = { bottom: "2rem", right: "2rem" },
}: FloatingConsultButtonProps) => {
  const { isActive } = useFullPageLoading();
  const [isOpen, setIsOpen] = useState(false);

  if (isActive) return null;

  const lgButtonSize = buttonSize || 100;
  const smButtonSize = buttonSize ? buttonSize * 0.8 : 80;
  const lgImageSize = imageSize || 60;
  const smImageSize = imageSize ? imageSize * 0.833 : 48;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[105]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-32 right-6 z-[110] backdrop-blur-3xl bg-white/80 dark:bg-black/60 border border-zinc-300 dark:border-white/[0.12] rounded-[28px] shadow-2xl p-6 lg:p-8 max-w-[340px] w-[calc(100vw-3rem)]"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-foreground/40 hover:text-foreground transition-colors p-1.5"
            >
              <X size={20} />
            </button>

            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight tracking-tight">
                  {popupHeading}
                </h3>
                <span className="shrink-0 text-blue-600 dark:text-blue-300 px-3 py-1 bg-blue-500/10 dark:bg-white/[0.05] border border-blue-500/20 dark:border-white/[0.12] rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-xl">
                  {popupBadgeText}
                </span>
              </div>

              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed font-normal opacity-90">
                {popupDescription}
              </p>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black px-6 py-5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 dark:shadow-none transition-all active:scale-95"
                onClick={ctaButtonAction}
              >
                {ctaButtonText}
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <div
        className="fixed z-[100]"
        style={position}
      >
        <m.div
          className="relative cursor-pointer group"
          style={{
            width: `${smButtonSize}px`,
            height: `${smButtonSize}px`,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <m.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: revolvingSpeed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text className="text-[14px] fill-black dark:fill-white/80 font-medium uppercase tracking-[0.2em]">
                <textPath href="#circlePath" startOffset="0%">
                  {revolvingText}
                </textPath>
              </text>
            </svg>
          </m.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full overflow-hidden bg-gray-900 shadow-lg group-hover:shadow-xl transition-shadow"
              style={{
                width: `${smImageSize}px`,
                height: `${smImageSize}px`,
              }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-red-500 to-orange-500"></div>';
                  }
                }}
              />
            </div>
          </div>
        </m.div>

        <style>{`
          @media (min-width: 1024px) {
            .relative.cursor-pointer.group {
              width: ${lgButtonSize}px !important;
              height: ${lgButtonSize}px !important;
            }
            .relative.cursor-pointer.group .rounded-full.overflow-hidden {
              width: ${lgImageSize}px !important;
              height: ${lgImageSize}px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};


