// app/calculator/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import UnitConverter from "@/app/components/UnitConverter";
import { getFragranceOils } from "./actions";

interface FragranceBlend {
  name: string;
  percentage: number;
  materialId?: string;
}

interface FragranceOil {
  id: string;
  name: string;
  unit: string | null;
}

function FragranceOilAutocomplete({
  oils,
  value,
  onSelect,
}: {
  oils: FragranceOil[];
  value: string;
  onSelect: (oil: FragranceOil) => void;
}) {
  const [input, setInput] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = input.length > 0
    ? oils.filter((oil) => oil.name.toLowerCase().includes(input.toLowerCase()))
    : [];

  return (
    <div className="relative flex-1" ref={containerRef}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          const newValue = e.target.value;
          setInput(newValue);
          setShowDropdown(newValue.length > 0);
        }}
        onFocus={() => {
          if (input.length > 0) setShowDropdown(true);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        placeholder="Fragrance oil name"
        className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm"
      />
      {showDropdown && filtered.length > 0 && (
        <div className="absolute left-0 top-full mt-1 z-10 w-full bg-white dark:bg-gray-900 border border-default rounded-lg shadow-lg max-h-36 overflow-y-auto">
          {filtered.map((oil) => (
            <button
              key={oil.id}
              type="button"
              className="w-full text-left px-2 py-1 hover:bg-brand-muted dark:hover:bg-brand-muted-dark text-text text-sm"
              onMouseDown={(e) => {
                e.preventDefault();
                setInput(oil.name);
                setShowDropdown(false);
                onSelect(oil);
              }}
            >
              {oil.name} ({oil.unit ?? "oz"})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CalculatorPage() {
  // ----- Main Calculator State -----
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [containerCount, setContainerCount] = useState<number>(6);
  const [fillWeight, setFillWeight] = useState<number>(8.0);
  const [fragranceLoad, setFragranceLoad] = useState<number>(8);
  const [safetyBuffer, setSafetyBuffer] = useState<number>(5);

  // ----- Fragrance Oil State -----
  const [primaryFO, setPrimaryFO] = useState<FragranceOil | null>(null);
  const [primaryFOInput, setPrimaryFOInput] = useState("");

  // ----- Fragrance Oil Blend State -----
  const [foBlendEnabled, setFoBlendEnabled] = useState<boolean>(false);
  const [foBlends, setFoBlends] = useState<FragranceBlend[]>([
    { name: "", percentage: 100, materialId: undefined },
  ]);
  const [availableOils, setAvailableOils] = useState<FragranceOil[]>([]);

  // ----- Quick Calculator State -----
  const [quickWaxWeight, setQuickWaxWeight] = useState<number>(16);
  const [quickFragranceLoad, setQuickFragranceLoad] = useState<number>(8);

  // Fetch fragrance oils for autocomplete
  useEffect(() => {
    getFragranceOils().then(setAvailableOils);
  }, []);

  // ----- Derived Values -----
  const flDecimal = fragranceLoad / 100;
  const bufferDecimal = safetyBuffer / 100;

  const netWaxPerContainer = fillWeight / (1 + flDecimal);
  const netOilPerContainer = netWaxPerContainer * flDecimal;

  const totalContainers = containerCount || 0;
  const rawTotalWax = netWaxPerContainer * totalContainers;
  const rawTotalOil = netOilPerContainer * totalContainers;

  const totalWaxWithBuffer = rawTotalWax * (1 + bufferDecimal);
  const totalOilWithBuffer = rawTotalOil * (1 + bufferDecimal);
  const totalBatchWeight = totalWaxWithBuffer + totalOilWithBuffer;

  const unitLabel = unitSystem === "imperial" ? "oz" : "g";
  const conversionDivisor = unitSystem === "imperial" ? 16 : 1000;

  const totalWaxDisplayUnits = totalWaxWithBuffer / conversionDivisor;
  const totalOilDisplayUnits = totalOilWithBuffer / conversionDivisor;

  // ----- Fragrance Oil Blend Helpers -----
  const addFragranceBlend = () => {
    setFoBlends([...foBlends, { name: "", percentage: 0, materialId: undefined }]);
  };

  const removeFragranceBlend = (index: number) => {
    if (foBlends.length <= 1) return;
    setFoBlends(foBlends.filter((_, i) => i !== index));
  };

  const updateFragranceBlendName = (index: number, name: string, materialId?: string) => {
    setFoBlends(
      foBlends.map((blend, i) =>
        i === index ? { ...blend, name, materialId: materialId ?? blend.materialId } : blend
      )
    );
  };

  const updateFragranceBlendPercentage = (index: number, percentage: number) => {
    setFoBlends(foBlends.map((blend, i) => (i === index ? { ...blend, percentage } : blend)));
  };

  // Validation for blend total
  const blendTotal = foBlends.reduce((sum, blend) => sum + blend.percentage, 0);
  const blendError = foBlendEnabled && Math.abs(blendTotal - 100) > 0.01;

  // ----- Quick Calculator Results -----
  const quickFlDecimal = quickFragranceLoad / 100;
  const quickRequiredOil = quickWaxWeight * quickFlDecimal;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text">Batch & Unit Calculator</h1>
        <p className="text-sm text-text-muted mt-1">
          Calculate exact wax and fragrance oil ratios, utilize modular unit converters, and manage production batches.
        </p>
      </div>

      {/* Batch Setup Card */}
      <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-text border-b border-default pb-3">Batch Setup</h2>
          <p className="text-sm text-text-muted mt-3">
            Enter the core production numbers to calculate wax and fragrance oil requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Unit System</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUnitSystem("imperial")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  unitSystem === "imperial"
                    ? "bg-teal-600 text-white"
                    : "bg-bg border border-default text-text-muted hover:bg-teal-100 dark:hover:bg-teal-900"
                }`}
              >
                Imperial
              </button>
              <button
                onClick={() => setUnitSystem("metric")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  unitSystem === "metric"
                    ? "bg-teal-600 text-white"
                    : "bg-bg border border-default text-text-muted hover:bg-teal-100 dark:hover:bg-teal-900"
                }`}
              >
                Metric
              </button>
            </div>
            <p className="text-xs text-text-muted mt-1">
              Example: {unitSystem === "imperial" ? "8 oz per vessel" : "226 g per vessel"}
            </p>
          </div>

          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Number of Vessels</label>
            <input
              type="number"
              min="1"
              value={containerCount}
              onChange={(e) => setContainerCount(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Fill Weight per Vessel ({unitLabel})
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={fillWeight}
              onChange={(e) => setFillWeight(Math.max(0.1, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Fragrance Load (%)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="20"
              value={fragranceLoad}
              onChange={(e) => setFragranceLoad(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <p className="text-xs text-text-muted mt-1">Standard range: 6% – 10%</p>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Safety / Waste Buffer (%)
            </label>
            <input
              type="number"
              step="1"
              min="0"
              max="25"
              value={safetyBuffer}
              onChange={(e) => setSafetyBuffer(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <p className="text-xs text-text-muted mt-1">Accounts for pour residue, testing spillage, and pitcher clinging.</p>
          </div>
        </div>
      </div>

      {/* Fragrance Details Card */}
      <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-text border-b border-default pb-3">Fragrance Details</h2>
          <p className="text-sm text-text-muted mt-3">
            Optionally identify your fragrance oil and mix multiple oils.
          </p>
        </div>

        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">
            Fragrance Oil Name (Optional)
          </label>
          <FragranceOilAutocomplete
            oils={availableOils}
            value={primaryFOInput}
            onSelect={(oil) => {
              setPrimaryFO(oil);
              setPrimaryFOInput(oil.name);
            }}
          />
          <p className="text-xs text-text-muted mt-1">
            Enter your primary fragrance oil for reference.
          </p>
        </div>

        <div className="pt-4 border-t border-default">
          <label className="flex items-center gap-2 text-text-muted text-xs font-medium">
            <input
              type="checkbox"
              checked={foBlendEnabled}
              onChange={(e) => {
                setFoBlendEnabled(e.target.checked);
                if (e.target.checked && foBlends.length === 0) {
                  setFoBlends([{ name: "", percentage: 100, materialId: undefined }]);
                }
              }}
              className="rounded border-default accent-teal-600"
            />
            I mix my own fragrance oils
          </label>
          <p className="text-xs text-text-muted mt-1">
            When enabled, specify multiple fragrance oils and their percentages (must total 100%).
          </p>

          {foBlendEnabled && (
            <div className="mt-4 space-y-2">
              {foBlends.map((blend, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FragranceOilAutocomplete
                    oils={availableOils}
                    value={blend.name}
                    onSelect={(oil) => updateFragranceBlendName(index, oil.name, oil.id)}
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={blend.percentage}
                    onChange={(e) => updateFragranceBlendPercentage(index, parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm"
                    placeholder="%"
                  />
                  <span className="text-text-muted text-xs">%</span>
                  {foBlends.length > 1 && (
                    <button
                      onClick={() => removeFragranceBlend(index)}
                      className="text-error hover:underline text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {blendError && (
                <p className="text-error text-xs mt-1">
                  Fragrance oil blend must total 100% (currently {blendTotal}%).
                </p>
              )}
              <button
                onClick={addFragranceBlend}
                className="mt-2 inline-flex items-center px-3 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-700 hover:bg-teal-200 dark:hover:bg-teal-800 text-xs font-medium"
              >
                + Add FO
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Batch Requirements Card */}
      <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-text border-b border-default pb-3 mb-4">Batch Requirements</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-bg border border-default rounded-lg p-4">
            <span className="block text-text-muted text-xs font-medium uppercase">Required Wax</span>
            <div className="text-2xl font-bold text-text mt-1">
              {totalWaxWithBuffer.toFixed(1)} <span className="text-sm font-normal text-text-muted">{unitLabel}</span>
            </div>
            {unitSystem === "imperial" && (
              <div className="text-xs text-text-muted mt-0.5">
                ≈ {totalWaxDisplayUnits.toFixed(2)} lbs
              </div>
            )}
          </div>

          <div className="bg-bg border border-default rounded-lg p-4">
            <span className="block text-text-muted text-xs font-medium uppercase">Required Fragrance Oil</span>
            {!foBlendEnabled ? (
              <>
                <div className="text-2xl font-bold text-text mt-1">
                  {totalOilWithBuffer.toFixed(1)} <span className="text-sm font-normal text-text-muted">{unitLabel}</span>
                </div>
                {unitSystem === "imperial" && (
                  <div className="text-xs text-text-muted mt-0.5">
                    ≈ {totalOilDisplayUnits.toFixed(2)} lbs
                  </div>
                )}
              </>
            ) : (
              <div className="mt-2 space-y-1">
                {foBlends.map((blend, index) => {
                  const amount = (totalOilWithBuffer * blend.percentage) / 100;
                  return (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-text-secondary">{blend.name || `Oil ${index + 1}`}</span>
                      <span className="font-medium text-text">
                        {amount.toFixed(2)} {unitLabel}
                        {unitSystem === "imperial" && (
                          <span className="text-text-muted text-xs ml-1">
                            ({(amount / 16).toFixed(2)} lb)
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t border-default mt-2 pt-2 text-sm">
                  <span className="text-text-muted">Total: </span>
                  <span className="font-semibold text-text">
                    {totalOilWithBuffer.toFixed(1)} {unitLabel}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-bg border border-default rounded-lg p-4">
            <span className="block text-text-muted text-xs font-medium uppercase">Total Melt Weight</span>
            <div className="text-xl font-semibold text-text mt-1">
              {totalBatchWeight.toFixed(1)} <span className="text-sm font-normal text-text-muted">{unitLabel}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-default">
          <p className="text-xs text-text-muted text-center">
            Yields {containerCount} container{containerCount !== 1 ? "s" : ""} @ {fillWeight} {unitLabel} fill with {fragranceLoad}% FL (+{safetyBuffer}% buffer).
          </p>
        </div>
      </div>

      {/* Fragrance Load Quick Calculator */}
      <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold text-text border-b border-default pb-3">Fragrance Load Quick Calculator</h2>
        <p className="text-sm text-text-muted">
          Quickly determine the amount of fragrance oil needed for a given wax weight and fragrance load percentage.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Wax Weight ({unitLabel})
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={quickWaxWeight}
              onChange={(e) => setQuickWaxWeight(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Fragrance Load (%)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="20"
              value={quickFragranceLoad}
              onChange={(e) => setQuickFragranceLoad(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-bg border border-default">
          <div className="flex items-center justify-between">
            <span className="text-text-muted text-sm">Required Fragrance Oil:</span>
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
              {quickRequiredOil.toFixed(2)} {unitLabel}
            </span>
          </div>
          {unitSystem === "imperial" && (
            <div className="text-xs text-text-muted mt-1">
              ≈ {(quickRequiredOil / 16).toFixed(2)} lbs
            </div>
          )}
        </div>
      </div>

      {/* Quick Unit Converter */}
      <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold text-text border-b border-default pb-3">Quick Unit Converter</h2>
        <UnitConverter />
      </div>

      {/* Reference Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Equivalents Table */}
        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-default">
            <h3 className="text-base font-semibold text-text">Standard Weight Equivalents</h3>
            <p className="text-xs text-text-muted">Quick reference conversions for wax & fragrance measurement.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-bg text-text-muted text-xs uppercase font-medium border-b border-default">
                <tr>
                  <th className="px-4 py-3">Ounces (oz)</th>
                  <th className="px-4 py-3">Grams (g)</th>
                  <th className="px-4 py-3">Pounds (lb)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">1 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">28.35 g</td>
                  <td className="px-4 py-2.5 text-text-secondary">0.063 lb</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">4 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">113.40 g</td>
                  <td className="px-4 py-2.5 text-text-secondary">0.250 lb</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">8 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">226.80 g</td>
                  <td className="px-4 py-2.5 text-text-secondary">0.500 lb</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">12 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">340.19 g</td>
                  <td className="px-4 py-2.5 text-text-secondary">0.750 lb</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">16 oz (1 lb)</td>
                  <td className="px-4 py-2.5 text-text-secondary">453.59 g</td>
                  <td className="px-4 py-2.5 text-text-secondary">1.000 lb</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">35.27 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">1,000.00 g (1 kg)</td>
                  <td className="px-4 py-2.5 text-text-secondary">2.205 lb</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Fragrance Load Ratio Table */}
        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-default">
            <h3 className="text-base font-semibold text-text">Fragrance Load Reference Cheat Sheet</h3>
            <p className="text-xs text-text-muted">Fragrance required per 1 lb (16 oz) of wax base.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-bg text-text-muted text-xs uppercase font-medium border-b border-default">
                <tr>
                  <th className="px-4 py-3">Load (%)</th>
                  <th className="px-4 py-3">FO per 16 oz Wax (oz)</th>
                  <th className="px-4 py-3">FO per 1 lb Wax (g)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">6%</td>
                  <td className="px-4 py-2.5 text-text-secondary">0.96 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">27.2 g</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">7%</td>
                  <td className="px-4 py-2.5 text-text-secondary">1.12 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">31.8 g</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">8% (Standard)</td>
                  <td className="px-4 py-2.5 text-text-secondary">1.28 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">36.3 g</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">9%</td>
                  <td className="px-4 py-2.5 text-text-secondary">1.44 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">40.8 g</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">10% (Max Heavy)</td>
                  <td className="px-4 py-2.5 text-text-secondary">1.60 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">45.4 g</td>
                </tr>
                <tr className="hover:bg-bg/50">
                  <td className="px-4 py-2.5 font-medium text-text">12% (Melt Limit)</td>
                  <td className="px-4 py-2.5 text-text-secondary">1.92 oz</td>
                  <td className="px-4 py-2.5 text-text-secondary">54.4 g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}