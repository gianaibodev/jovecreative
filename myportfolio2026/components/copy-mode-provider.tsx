"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type CopyMode = "plain" | "nerdy";

interface CopyModeContextType {
  copyMode: CopyMode;
  toggleCopyMode: () => void;
  setCopyMode: (mode: CopyMode) => void;
}

const CopyModeContext = createContext<CopyModeContextType | undefined>(undefined);

export function CopyModeProvider({ children }: { children: React.ReactNode }) {
  const [copyMode, setCopyModeState] = useState<CopyMode>("plain");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("copyMode") as CopyMode;
    if (savedMode === "plain" || savedMode === "nerdy") {
      setCopyModeState(savedMode);
    }
  }, []);

  const setCopyMode = (mode: CopyMode) => {
    setCopyModeState(mode);
    localStorage.setItem("copyMode", mode);
  };

  const toggleCopyMode = () => {
    const newMode = copyMode === "plain" ? "nerdy" : "plain";
    setCopyMode(newMode);
  };

  // Avoid hydration mismatch by rendering plain text initially or matching server logic
  // For client-side only preference, it's safer to just render children
  // and let the components using the hook handle the mounting check if needed.
  
  return (
    <CopyModeContext.Provider value={{ copyMode, toggleCopyMode, setCopyMode }}>
      {children}
    </CopyModeContext.Provider>
  );
}

export function useCopyMode() {
  const context = useContext(CopyModeContext);
  if (context === undefined) {
    throw new Error("useCopyMode must be used within a CopyModeProvider");
  }
  return context;
}
