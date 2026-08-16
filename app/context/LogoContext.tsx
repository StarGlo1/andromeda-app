// app/context/LogoContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LogoContextType {
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
  resetLogo: () => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export function LogoProvider({ children }: { children: React.ReactNode }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load logo from localStorage on mount
    try {
      const savedLogo = localStorage.getItem("andromedaLogo");
      if (savedLogo) {
        setLogoUrl(savedLogo);
      }
    } catch (error) {
      console.error("Failed to load logo:", error);
    }
  }, []);

  const handleSetLogoUrl = (url: string | null) => {
    setLogoUrl(url);
    try {
      if (url) {
        localStorage.setItem("andromedaLogo", url);
      } else {
        localStorage.removeItem("andromedaLogo");
      }
    } catch (error) {
      console.error("Failed to save logo:", error);
    }
  };

  const resetLogo = () => {
    handleSetLogoUrl(null);
  };

  return (
    <LogoContext.Provider value={{ logoUrl, setLogoUrl: handleSetLogoUrl, resetLogo }}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogo() {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error("useLogo must be used within a LogoProvider");
  }
  return context;
}