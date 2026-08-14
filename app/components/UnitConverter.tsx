"use client";

import { useState } from "react";

export default function UnitConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("oz");
  const [toUnit, setToUnit] = useState("g");

  const conversions: Record<string, Record<string, number>> = {
    oz: { g: 28.3495, lb: 0.0625, kg: 0.0283495 },
    g: { oz: 0.035274, lb: 0.00220462, kg: 0.001 },
    lb: { oz: 16, g: 453.592, kg: 0.453592 },
    kg: { oz: 35.274, g: 1000, lb: 2.20462 },
  };

  const result = conversions[fromUnit]?.[toUnit]
    ? value * conversions[fromUnit][toUnit]
    : null;

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="bg-surface-widget border border-default rounded-xl p-6">
      <h2 className="text-lg font-semibold text-text mb-2">Unit Converter</h2>
      <p className="text-text-muted text-sm mb-4">
        Convert between common measurement units. Useful for recipe scaling.
      </p>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[120px]">
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">
            Value
          </label>
          <input
            type="number"
            step="any"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
          />
        </div>

        <div className="flex-1 min-w-[120px]">
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">
            From
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
          >
            <option value="oz">Ounces (oz)</option>
            <option value="g">Grams (g)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
        </div>

        {/* Swap button aligned with selects */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleSwap}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-2 shadow-md transition-colors"
            title="Swap units"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16m0 0l-4-4m4 4l-4 4M20 17H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 min-w-[120px]">
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">
            To
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
          >
            <option value="oz">Ounces (oz)</option>
            <option value="g">Grams (g)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 text-sm text-gray-700 dark:text-gray-200">
          {value} {fromUnit} ={" "}
          <span className="font-semibold text-teal-600 dark:text-teal-400">
            {result.toFixed(4)}
          </span>{" "}
          {toUnit}
        </div>
      )}
    </div>
  );
}