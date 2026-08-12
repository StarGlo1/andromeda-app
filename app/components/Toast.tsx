"use client";

import { useEffect } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: "bg-success text-white dark:bg-success-dark",
    error: "bg-error text-white dark:bg-error-dark",
    warning: "bg-warning text-white dark:bg-warning-dark",
    info: "bg-info text-white dark:bg-info-dark",
  }[type];

  const icon = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  }[type];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm w-full px-4 py-3 rounded-lg shadow-lg flex items-start gap-3 animate-slide-up ${bgColor}`}
      role="alert"
    >
      <span className="text-xl">{icon}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-white/70 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}