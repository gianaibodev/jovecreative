"use client";

import { createContext, useContext, useState, useEffect } from "react";

type FullPageLoadingContextType = {
  isActive: boolean;
  setActive: (v: boolean) => void;
};

const FullPageLoadingContext = createContext<FullPageLoadingContextType | null>(null);

export function FullPageLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isActive]);

  return (
    <FullPageLoadingContext.Provider value={{ isActive, setActive: setIsActive }}>
      {children}
    </FullPageLoadingContext.Provider>
  );
}

export function useFullPageLoading() {
  const ctx = useContext(FullPageLoadingContext);
  if (!ctx) return { isActive: false, setActive: () => {} };
  return ctx;
}
