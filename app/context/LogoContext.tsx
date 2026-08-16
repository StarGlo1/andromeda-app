// app/context/LogoContext.tsx

"use client";

import React, { createContext, useContext, useState } from "react";

interface LogoContextType {
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
  resetLogo: () => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export function LogoProvider({ 
  children, 
  initialLogoUrl 
}: { 
  children: React.ReactNode;
  initialLogoUrl: string | null;
}) {
  const [logoUrl, setLogoUrl] = useState<string | null>(initialLogoUrl);

  const handleSetLogoUrl = (url: string | null) => {
    setLogoUrl(url);
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