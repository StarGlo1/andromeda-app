"use client";

import { useDemoMode } from "@/app/context/DemoModeContext";
import { X } from "lucide-react";

export default function DemoModeBanner() {
  const { isDemoMode, exitDemoMode } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium">
      <span>⚡ Demo Mode – data entered will not be saved</span>
      <button
        onClick={exitDemoMode}
        className="ml-2 p-1 rounded-full hover:bg-amber-600 transition-colors"
        aria-label="Exit demo mode"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}