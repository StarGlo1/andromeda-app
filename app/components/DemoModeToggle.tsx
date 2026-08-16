"use client";

import { useDemoMode } from "@/app/context/DemoModeContext";
import { enterDemoModeAction, exitDemoModeAction } from "@/app/actions/demoMode";
import { useRouter } from "next/navigation";

export default function DemoModeToggle() {
  const { isDemoMode, enterDemoMode, exitDemoMode } = useDemoMode();
  const router = useRouter();

  const handleToggle = async () => {
    if (isDemoMode) {
      exitDemoMode();
      await exitDemoModeAction();
    } else {
      enterDemoMode();
      await enterDemoModeAction();
    }
    router.refresh();
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        isDemoMode
          ? "bg-amber-500 text-white hover:bg-amber-600"
          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
      }`}
    >
      {isDemoMode ? "⚡ Demo Mode: ON" : "Demo Mode: OFF"}
    </button>
  );
}