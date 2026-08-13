"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type DemoModeContextType = {
  isDemoMode: boolean;
  enterDemoMode: () => void;
  exitDemoMode: () => void;
};

const DemoModeContext = createContext<DemoModeContextType>({
  isDemoMode: false,
  enterDemoMode: () => {},
  exitDemoMode: () => {},
});

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("demoMode");
      if (saved === "true") setIsDemoMode(true);
    } catch {}
  }, []);

  const enterDemoMode = () => {
    setIsDemoMode(true);
    try {
      localStorage.setItem("demoMode", "true");
    } catch {}
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    try {
      localStorage.removeItem("demoMode");
    } catch {}
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, enterDemoMode, exitDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  return useContext(DemoModeContext);
}