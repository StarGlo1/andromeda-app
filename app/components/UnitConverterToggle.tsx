// app/components/UnitConvertorToggle.tsx
"use client";

interface UnitConvertorToggleProps {
  unitSystem: "imperial" | "metric";
  onChange: (system: "imperial" | "metric") => void;
}

export default function UnitConvertorToggle({ unitSystem, onChange }: UnitConvertorToggleProps) {
  return (
    <div className="flex rounded-lg bg-bg border border-default p-0.5">
      <button
        type="button"
        onClick={() => onChange("imperial")}
        className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          unitSystem === "imperial"
            ? "bg-brand text-white shadow-sm"
            : "text-text-muted hover:text-text"
        }`}
      >
        Imperial (oz / lb)
      </button>
      <button
        type="button"
        onClick={() => onChange("metric")}
        className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          unitSystem === "metric"
            ? "bg-brand text-white shadow-sm"
            : "text-text-muted hover:text-text"
        }`}
      >
        Metric (g / kg)
      </button>
    </div>
  );
}