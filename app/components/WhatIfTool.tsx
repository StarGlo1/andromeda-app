"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface WhatIfToolProps {
  products: {
    id: string;
    name: string;
    calculatedCogs: number;
    retailPrice: number;
    recipeItems: {
      id: string;
      rawMaterialId?: string | null;
      requiredQuantity: number;
      unit: string;
      rawMaterial?: { id: string; name: string; costPerUnit: number; unit: string } | null;
    }[];
  }[];
}

export default function WhatIfTool({ products }: WhatIfToolProps) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [sliderChanges, setSliderChanges] = useState<Record<string, number>>({});
  const [directPrices, setDirectPrices] = useState<Record<string, string>>({});
  const [targetMargin, setTargetMargin] = useState<number>(60);

  const product = products.find((p) => p.id === selectedProduct);

  const calculateImpact = () => {
    if (!product) return null;

    let originalCost = 0;
    let newCost = 0;

    for (const item of product.recipeItems) {
      if (item.rawMaterial) {
        const currentUnitCost = item.rawMaterial.costPerUnit;
        const currentItemCost = item.requiredQuantity * currentUnitCost;
        originalCost += currentItemCost;

        // Base: typed price if present, otherwise current cost
        const directVal = directPrices[item.rawMaterial.id];
        const baseUnitCost = directVal && directVal !== ""
          ? parseFloat(directVal)
          : currentUnitCost;

        // Always apply slider on top of base
        const changePercent = sliderChanges[item.rawMaterial.id] || 0;
        const newUnitCost = baseUnitCost * (1 + changePercent / 100);
        newCost += item.requiredQuantity * newUnitCost;
      }
    }

    const originalMargin = product.retailPrice > 0
      ? ((product.retailPrice - originalCost) / product.retailPrice) * 100
      : 0;
    const newMargin = product.retailPrice > 0
      ? ((product.retailPrice - newCost) / product.retailPrice) * 100
      : 0;
    const marginChange = newMargin - originalMargin;

    // Suggested price to maintain target margin
    const suggestedPrice = targetMargin < 100
      ? (newCost / (1 - targetMargin / 100))
      : null;

    return { originalCost, newCost, originalMargin, newMargin, marginChange, suggestedPrice };
  };

  const [impact, setImpact] = useState(calculateImpact());

  useEffect(() => {
    setImpact(calculateImpact());
  }, [selectedProduct, sliderChanges, directPrices, targetMargin]);

  return (
    <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-text">What-if Cost Impact</h3>
      <p className="text-sm text-text-muted">
        See what happens to your profit when material prices go up or down.
      </p>

      <div className="bg-bg border border-default rounded-lg p-3 space-y-1.5">
        <p className="text-xs font-medium text-text uppercase tracking-wider">How to use</p>
        <ol className="text-xs text-text-muted space-y-1 list-decimal list-inside">
          <li>Pick a product below.</li>
          <li>Adjust each material using the slider (%) or type a new price ($).</li>
          <li>Set your target margin below.</li>
          <li>The tool shows your new COGS, margin, and the price needed to hit your target.</li>
        </ol>
      </div>


      {/* Product selector */}
      <select
        value={selectedProduct}
        onChange={(e) => {
          setSelectedProduct(e.target.value);
          setSliderChanges({});
          setDirectPrices({});
        }}
        className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
      >
        <option value="">Select a product...</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      {/* Target margin input */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-text-muted shrink-0">Target Margin:</label>
        <input
          type="number"
          min={0}
          max={95}
          value={targetMargin}
          onChange={(e) => setTargetMargin(Math.max(0, Math.min(95, parseFloat(e.target.value) || 0)))}
          className="w-20 px-2 py-1 bg-bg border border-default rounded-lg text-text text-sm text-center"
        />
        <span className="text-sm text-text-muted">%</span>
      </div>

      {/* Material adjustments */}
      {product && product.recipeItems.filter(item => item.rawMaterial).length > 0 && (
        <div className="space-y-4">
          {product.recipeItems
            .filter((item) => item.rawMaterial)
            .map((item) => {
              const sliderValue = sliderChanges[item.rawMaterial?.id || ""] || 0;
              const directValue = directPrices[item.rawMaterial?.id || ""] || "";
              const currentCost = item.rawMaterial?.costPerUnit ?? 0;

              return (
                <div key={item.id} className="space-y-2 border-b border-default pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text">
                      {item.rawMaterial?.name}
                    </span>
                    <span className="text-xs text-text-muted">
                      Current: ${currentCost.toFixed(2)}/{item.rawMaterial?.unit}
                    </span>
                  </div>

                  {/* Slider - percentage adjustment */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted shrink-0">%:</span>
                    <input
                      type="range"
                      min={-50}
                      max={100}
                      step={1}
                      value={sliderValue}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setSliderChanges({ ...sliderChanges, [item.rawMaterial?.id || ""]: val });
                      }}
                      className="w-full accent-brand"
                    />
                    <span className={`text-xs font-medium w-10 text-right ${
                      sliderValue > 0 ? "text-error" : sliderValue < 0 ? "text-success" : "text-text-muted"
                    }`}>
                      {sliderValue > 0 ? "+" : ""}{sliderValue}%
                    </span>
                  </div>

                  {/* Direct price input */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted shrink-0">$:</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={directValue}
                      onChange={(e) => {
                        setDirectPrices({ ...directPrices, [item.rawMaterial?.id || ""]: e.target.value });
                      }}
                      placeholder={`${currentCost.toFixed(2)}`}
                      className="w-24 px-2 py-1 bg-bg border border-default rounded-lg text-text text-sm"
                    />
                    <span className="text-xs text-text-muted">per {item.rawMaterial?.unit}</span>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Results */}
      {impact && (
        <div className="border-t border-default pt-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Current COGS</p>
              <p className="text-lg font-bold text-text">${impact.originalCost.toFixed(2)}</p>
              <p className="text-sm text-text-muted">{impact.originalMargin.toFixed(1)}% margin</p>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider">Adjusted COGS</p>
              <p className="text-lg font-bold text-text">${impact.newCost.toFixed(2)}</p>
              <p className={`text-sm font-medium flex items-center gap-1 ${
                impact.marginChange >= 0 ? "text-success" : "text-error"
              }`}>
                {impact.marginChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {impact.newMargin.toFixed(1)}% margin
              </p>
            </div>
          </div>

          {impact.suggestedPrice && (
            <div className="bg-brand-muted dark:bg-brand-muted-dark rounded-lg p-3">
              <p className="text-xs text-text-muted mb-1">To maintain {targetMargin}% margin, price at:</p>
              <p className="text-xl font-bold text-text-brand">${impact.suggestedPrice.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
