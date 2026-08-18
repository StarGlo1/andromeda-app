"use client";

import { useState, useEffect } from "react";
import { getQueue, clearQueue, removeFromQueue } from "@/app/lib/offlineQueue";

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    setPendingCount(getQueue().length);

    const handleOnline = () => {
      setIsOnline(true);
      // Process queued actions when back online
      const queue = getQueue();
      if (queue.length > 0) {
        setPendingCount(queue.length);
        fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ actions: queue }),
        })
          .then(r => r.json())
          .then(data => {
            for (const result of data.results || []) {
              if (result.success) {
                removeFromQueue(result.id);
              }
            }
            setPendingCount(getQueue().length);
            if (getQueue().length === 0) {
              setTimeout(() => window.location.reload(), 800);
            }
          })
          .catch(() => {
            setPendingCount(queue.length);
          });
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setPendingCount(getQueue().length);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Poll for queue changes while online (Brave DevTools workaround)
    const pollInterval = setInterval(() => {
      if (navigator.onLine) {
        const queue = getQueue();
        if (queue.length > 0) {
          handleOnline();
        }
      }
    }, 3000);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && pendingCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-yellow-500 text-black text-sm font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? "bg-green-600" : "bg-red-600"}`}></span>
      {isOnline
        ? `Syncing ${pendingCount} pending change${pendingCount !== 1 ? "s" : ""}...`
        : "You're offline - changes will save locally"}
    </div>
  );
}
