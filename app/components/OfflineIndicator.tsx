"use client";

import { useState, useEffect } from "react";

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-yellow-500 text-black text-sm font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
      <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
      You&apos;re offline - changes will save locally
    </div>
  );
}
