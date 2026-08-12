"use client";

import { useState, useRef, useEffect } from "react";

export default function HeaderActions() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Position the dropdown so it never goes off‑screen
  useEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownWidth = 180; // approximate width
    let left = rect.left + rect.width / 2 - dropdownWidth / 2;

    // Keep within viewport
    if (left < 12) left = 12;
    if (left + dropdownWidth > window.innerWidth - 12) {
      left = window.innerWidth - dropdownWidth - 12;
    }

    setDropdownStyle({
      position: "fixed",
      top: `${rect.bottom + 8}px`,
      left: `${left}px`,
      zIndex: 100,
    });
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="px-3 py-2 rounded-lg text-text-muted hover:text-text hover:bg-surface-elevated transition-colors text-sm font-medium flex items-center gap-1"
      >
        Export
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className="w-44 bg-surface-widget border border-default rounded-lg shadow-lg py-1"
        >
          <a href="/api/export" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-text hover:bg-brand-muted dark:hover:bg-brand-muted-dark">
            ⬇ Export CSV
          </a>
          <a href="/import" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-text hover:bg-brand-muted dark:hover:bg-brand-muted-dark">
            📥 Import CSV
          </a>
        </div>
      )}
    </div>
  );
}