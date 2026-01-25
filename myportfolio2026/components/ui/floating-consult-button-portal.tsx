"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FloatingConsultButton } from "./floating-consult-button";

export function FloatingConsultButtonPortal({ imageSrc }: { imageSrc?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(
    <FloatingConsultButton imageSrc={imageSrc} />,
    document.body
  );
}
