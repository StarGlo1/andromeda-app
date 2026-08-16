"use client";

import { useDemoMode } from "@/app/context/DemoModeContext";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { exitDemoModeAction } from "@/app/actions/demoMode";
import { useToast } from "@/app/context/ToastContext";

export default function DemoModeBanner() {
  const { isDemoMode, exitDemoMode } = useDemoMode();
  const router = useRouter();
  const { showToast } = useToast();

  if (!isDemoMode) return null;

  const handleExitDemoMode = async () => {
    exitDemoMode();
    await exitDemoModeAction();
    showToast("Demo mode exited. Your real data is safe.", "success");
    window.location.href = "/";
  };

  return (
    <div className="fixed top-[110px] sm:top-[124px] lg:top-[136px] left-0 right-0 z-[60] bg-[#4f8792] text-white px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium shadow-md">
      <span className="flex items-center gap-2">
        <span className="text-base">⚡</span>
        <span className="font-semibold">DEMO MODE</span>
        <span className="hidden sm:inline text-teal-100">— data entered will not be saved</span>
      </span>
      <button
        onClick={handleExitDemoMode}
        className="ml-2 p-1 rounded-full hover:bg-[#426f79] transition-colors"
        aria-label="Exit demo mode"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}