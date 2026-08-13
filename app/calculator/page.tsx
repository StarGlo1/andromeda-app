// app/calculator/page.tsx
"use client";

import { useState } from "react";
import UnitConverter from "@/app/components/UnitConverter";
import UnitConverterToggle from "@/app/components/UnitConverterToggle";

export default function CalculatorPage() {
  // ----- Calculator State -----
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [containerCount, setContainerCount] = useState<number>(6);
  const [fillWeight, setFillWeight] = useState<number>(8.0);
  const [fragranceLoad, setFragranceLoad] = useState<number>(8);
  const [safetyBuffer, setSafetyBuffer] = useState<number>(5);

  // Batch Calculations
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

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">Batch & Unit Calculator</h1>
          <p className="text-sm text-text-muted mt-1">
            Calculate exact wax and fragrance oil ratios, utilize modular unit converters, and manage production batches.
          </p>
        </div>

        {/* Section 1: Main Batch Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-widget border border-default rounded-xl p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold text-text border-b border-default pb-3">Batch Parameters</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Unit System</label>
                <UnitConverterToggle 
                  unitSystem={unitSystem} 
                  onChange={(system) => setUnitSystem(system)} 
                />
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

          <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text border-b border-default pb-3 mb-4">Batch Requirements</h2>
              
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
                  <div className="text-2xl font-bold text-text mt-1">
                    {totalOilWithBuffer.toFixed(1)} <span className="text-sm font-normal text-text-muted">{unitLabel}</span>
                  </div>
                  {unitSystem === "imperial" && (
                    <div className="text-xs text-text-muted mt-0.5">
                      ≈ {totalOilDisplayUnits.toFixed(2)} lbs
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
            </div>

            <div className="pt-4 border-t border-default">
              <p className="text-xs text-text-muted text-center">
                Yields {containerCount} container{containerCount !== 1 ? "s" : ""} @ {fillWeight} {unitLabel} fill with {fragranceLoad}% FL (+{safetyBuffer}% buffer).
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Modular Unit Converter Component */}
        <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-semibold text-text border-b border-default pb-3">Quick Unit Converter</h2>
          <UnitConverter />
        </div>

        {/* Section 3: Reference Tables */}
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
    </main>
  );
}