"use client";

import { useEffect, useState } from "react";
import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery-2";

const galleryItems: GalleryItem[] = [
  { image: "/lib/499458398_18491336026066674_3734749427221539201_n.jpg", text: "Starting the Journey" },
  { image: "/lib/515053696_18493324564066674_7373910866898609369_n.jpg", text: "Historic Architecture" },
  { image: "/lib/515481891_18493606585066674_5450462328203126750_n.jpg", text: "Open Roads" },
  { image: "/lib/518677547_18494662081066674_6557855392234019180_n.jpg", text: "City Streets" },
  { image: "/lib/519925433_18494816725066674_3432829790587874415_n.jpg", text: "Serene Landscapes" },
  { image: "/lib/559279488_18509919136066674_7312528774659541423_n.jpg", text: "Ancient Ruins" },
  { image: "/lib/573263789_18516679186066674_1156368707441802730_n.jpg", text: "Urban Nights" },
  { image: "/lib/587335108_18520857517066674_1725795571643449994_n.jpg", text: "Cultural Markets" },
  { image: "/lib/589032856_18520740019066674_1870553577133758713_n.jpg", text: "Mountain Views" },
  { image: "/lib/610750825_18527314114066674_6468585640916762342_n.jpg", text: "Neon Cities" },
];

const MOBILE_BREAKPOINT = 768;

export default function CircularGalleryDemo() {
  const [imageScale, setImageScale] = useState(0.85);

  useEffect(() => {
    const updateScale = () => {
      setImageScale(typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT ? 0.5 : 0.85);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full rounded-lg overflow-hidden">
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
        imageScale={imageScale}
      />
    </div>
  );
}


