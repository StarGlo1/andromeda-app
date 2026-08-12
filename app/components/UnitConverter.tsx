"use client";

import { useState } from "react";

export const conversions: Record<string, Record<string, number>> = {
  g: { oz: 0.035274, lb: 0.00220462, kg: 0.001 },
  oz: { g: 28.3495, lb: 0.0625, kg: 0.0283495 },
  lb: { g: 453.592, oz: 16, kg: 0.453592 },
  kg: { g: 1000, oz: 35.274, lb: 2.20462 },
  ml: { "fl oz": 0.033814 },
  "fl oz": { ml: 29.5735 },
};

export default function UnitConverter() {
  const [fromUnit, setFromUnit] = useState("g");
  const [toUnit, setToUnit] = useState("oz");
  const [value, setValue] = useState("");

  const numericValue = parseFloat(value);
  const result =
    !isNaN(numericValue) && conversions[fromUnit]?.[toUnit] !== undefined
      ? (numericValue * conversions[fromUnit][toUnit]).toFixed(4)
      : null;

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const units = Object.keys(conversions);

  return (
    <div className="flex justify-center">
      <div className="bg-surface-widget border border-default rounded-xl p-4 w-full max-w-xl">
        <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
          Unit Converter
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm" suppressHydrationWarning>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            className="w-24 px-2 py-1 bg-bg border border-default rounded text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="px-2 py-1 bg-bg border border-default rounded text-text text-sm"
          >
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={swapUnits}
            title="Swap units"
            className="px-2 py-1 bg-brand hover:bg-brand-hover text-white border border-transparent rounded transition-colors text-lg leading-none"
          >
            ⇄
          </button>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="px-2 py-1 bg-bg border border-default rounded text-text text-sm"
          >
            {units
              .filter((u) => conversions[fromUnit]?.[u] !== undefined)
              .map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
          </select>
        </div>
        <div className="mt-3 text-center">
          {result !== null ? (
            <div className="bg-brand-muted dark:bg-brand-muted-dark border border-default rounded-lg px-4 py-2 inline-block">
              <span className="text-text font-medium">{numericValue} {fromUnit}</span>
              <span className="text-text-muted mx-2">=</span>
              <span className="text-text-brand font-bold text-lg">{result} {toUnit}</span>
            </div>
          ) : (
            <p className="text-text-muted text-xs italic">Enter a value to see the conversion</p>
          )}
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-text-muted">
          <span>1 lb = 16 oz = 453.59 g</span>
          <span className="text-border-strong">|</span>
          <span>1 oz = 28.35 g</span>
          <span className="text-border-strong">|</span>
          <span>1 fl oz = 29.57 mL</span>
          <span className="text-border-strong">|</span>
          <span>1 kg = 1000 g</span>
        </div>
        <p className="text-text-muted text-sm mt-3 text-center">
          💡 Tip: Bought in <strong>lbs</strong>? Select <strong>lbs</strong> here so your cost stays spot on!
        </p>
      </div>
    </div>
  );
}