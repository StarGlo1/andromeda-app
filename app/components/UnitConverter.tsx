// app/components/UnitConvertor.tsx
"use client";

import { useState } from "react";

export default function UnitConvertor() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<"oz" | "g" | "lb">("oz");
  const [toUnit, setToUnit] = useState<"oz" | "g" | "lb">("g");

  const convert = (val: number, from: "oz" | "g" | "lb", to: "oz" | "g" | "lb") => {
    let inOz = val;
    if (from === "g") inOz = val / 28.3495;
    if (from === "lb") inOz = val * 16;

    if (to === "g") return inOz * 28.3495;
    if (to === "lb") return inOz / 16;
    return inOz;
  };

  const result = convert(value, fromUnit, toUnit);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">Value</label>
          <input
            type="number"
            step="any"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as any)}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="oz">Ounces (oz)</option>
            <option value="g">Grams (g)</option>
            <option value="lb">Pounds (lb)</option>
          </select>
        </div>
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as any)}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="oz">Ounces (oz)</option>
            <option value="g">Grams (g)</option>
            <option value="lb">Pounds (lb)</option>
          </select>
        </div>
      </div>
      <div className="pt-4 border-t border-default text-center">
        <p className="text-text-muted text-xs uppercase font-medium">Converted Result</p>
        <p className="text-2xl font-bold text-text-brand mt-1">
          {result.toFixed(4)} {toUnit}
        </p>
      </div>
    </div>
  );
}