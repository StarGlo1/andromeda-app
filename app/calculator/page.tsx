"use client";

import { useState, useEffect, useRef } from "react";
import UnitConverter from "@/app/components/UnitConverter";
import { getFragranceOils, getFinishedGoodsForBatchSave, saveBatchNoteToProduct } from "./actions";
import { ChevronDown, ChevronUp, Save } from "lucide-react";
import { useToast } from "@/app/context/ToastContext";

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

interface FinishedGoodOption {
  id: string;
  name: string;
  batchCode: string;
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
        placeholder="Oil name"
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

function CollapsibleSection({
  title,
  subtitle,
  defaultOpen = true,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-surface-widget border border-default rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-bg/50 transition-colors"
      >
        <div>
          <h2 className="text-lg font-semibold text-text">{title}</h2>
          {subtitle && <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-text-muted shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-muted shrink-0" />
        )}
      </button>
      {isOpen && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

export default function CalculatorPage() {
  const { showToast } = useToast();
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [containerCount, setContainerCount] = useState<number>(6);
  const [fillWeight, setFillWeight] = useState<number>(8.0);
  const [fragranceLoad, setFragranceLoad] = useState<number>(8);
  const [safetyBuffer, setSafetyBuffer] = useState<number>(5);

  const [foBlends, setFoBlends] = useState<FragranceBlend[]>([
    { name: "", percentage: 100, materialId: undefined },
  ]);
  const [availableOils, setAvailableOils] = useState<FragranceOil[]>([]);

  // Save to Recipe state
  const [finishedGoods, setFinishedGoods] = useState<FinishedGoodOption[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [showSaveSection, setShowSaveSection] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Results display unit
  const [displayUnit, setDisplayUnit] = useState<"oz" | "lb" | "g" | "kg">("oz");

  useEffect(() => {
    getFragranceOils().then(setAvailableOils);
    getFinishedGoodsForBatchSave().then(setFinishedGoods);
  }, []);

  // Auto-adjust display unit when system changes
  useEffect(() => {
    if (unitSystem === "imperial") {
      setDisplayUnit("oz");
    } else {
      setDisplayUnit("g");
    }
  }, [unitSystem]);

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

  // Conversion function for display
  const convertDisplay = (valueOz: number, targetUnit: string): string => {
    switch (targetUnit) {
      case "oz":
        return valueOz.toFixed(1);
      case "lb":
        return (valueOz / 16).toFixed(2);
      case "g":
        return (valueOz * 28.3495).toFixed(1);
      case "kg":
        return (valueOz / 35.274).toFixed(3);
      default:
        return valueOz.toFixed(1);
    }
  };

  const displayUnitLabel = displayUnit === "oz" ? "oz" : displayUnit === "lb" ? "lb" : displayUnit === "g" ? "g" : "kg";

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

  const blendTotal = foBlends.reduce((sum, blend) => sum + blend.percentage, 0);
  const blendError = Math.abs(blendTotal - 100) > 0.01;

  const generateBatchNote = () => {
    const lines: string[] = [];
    lines.push(`Vessels: ${containerCount}`);
    lines.push(`Fill Weight: ${fillWeight} ${unitLabel} per vessel`);
    lines.push(`Fragrance Load: ${fragranceLoad}%`);
    lines.push(`Safety Buffer: ${safetyBuffer}%`);
    lines.push(`Wax Needed: ${convertDisplay(totalWaxWithBuffer, "oz")} oz`);
    lines.push(`Wax Needed: ${convertDisplay(totalWaxWithBuffer, "lb")} lb`);
    lines.push(`Wax Needed: ${convertDisplay(totalWaxWithBuffer, "g")} g`);
    lines.push(`Oil Needed: ${convertDisplay(totalOilWithBuffer, "oz")} oz`);
    lines.push(`Oil Needed: ${convertDisplay(totalOilWithBuffer, "lb")} lb`);
    lines.push(`Oil Needed: ${convertDisplay(totalOilWithBuffer, "g")} g`);
    lines.push(`Total Batch: ${convertDisplay(totalBatchWeight, "oz")} oz`);
    lines.push(`Total Batch: ${convertDisplay(totalBatchWeight, "g")} g`);
    
    if (foBlends.length > 1 || foBlends[0].name) {
      lines.push("");
      lines.push("Oil Breakdown:");
      foBlends.forEach((blend, i) => {
        const amount = (totalOilWithBuffer * blend.percentage) / 100;
        lines.push(`  ${blend.name || `Oil ${i + 1}`}: ${convertDisplay(amount, "oz")} oz (${blend.percentage}%)`);
      });
    }
    
    return lines.join("\n");
  };

  const handleSaveToRecipe = async () => {
    if (!selectedProductId) {
      showToast("Please select a product to save to.", "error");
      return;
    }

    setIsSaving(true);
    try {
      const note = generateBatchNote();
      await saveBatchNoteToProduct(selectedProductId, note);
      showToast("Batch calculation saved to recipe!", "success");
      setShowSaveSection(false);
      setSelectedProductId("");
    } catch (error: any) {
      showToast(error.message || "Failed to save.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const availableDisplayUnits = unitSystem === "imperial" 
    ? ["oz", "lb"] 
    : ["g", "kg"];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text mt-3">Batch Calculator</h1>
        <p className="text-sm text-text-muted mt-1">
          Enter your batch details — wax, fragrance oils, and results update together.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-surface-widget border border-default rounded-xl shadow-sm overflow-hidden">
        {/* Inputs */}
        <div className="p-6 border-b border-default">
          <h2 className="text-base font-semibold text-text mb-4">Batch Inputs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Unit System</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUnitSystem("imperial")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    unitSystem === "imperial"
                      ? "bg-[#4f8792] text-white"
                      : "bg-bg border border-default text-text-muted hover:bg-[#c5d9dd]"
                  }`}
                >
                  Imperial
                </button>
                <button
                  onClick={() => setUnitSystem("metric")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    unitSystem === "metric"
                      ? "bg-[#4f8792] text-white"
                      : "bg-bg border border-default text-text-muted hover:bg-[#c5d9dd]"
                  }`}
                >
                  Metric
                </button>
              </div>
            </div>

            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Vessels</label>
              <input
                type="number"
                min="1"
                value={containerCount}
                onChange={(e) => setContainerCount(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
              />
            </div>

            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                Fill Weight ({unitLabel})
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={fillWeight}
                onChange={(e) => setFillWeight(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
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
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                Safety Buffer (%)
              </label>
              <input
                type="number"
                step="1"
                min="0"
                max="25"
                value={safetyBuffer}
                onChange={(e) => setSafetyBuffer(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
              />
            </div>
          </div>
        </div>

        {/* Fragrance Oils */}
        <div className="p-6 border-b border-default">
          <h2 className="text-base font-semibold text-text mb-4">Fragrance Oils</h2>
          <div className="space-y-2">
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
                  className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm text-center"
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
                Blend must total 100% (currently {blendTotal}%).
              </p>
            )}
            <button
              onClick={addFragranceBlend}
              className="mt-2 inline-flex items-center px-3 py-1.5 rounded-full bg-[#c5d9dd] text-[#3d5a60] border border-[#b0c9ce] hover:bg-[#b0c9ce] text-xs font-medium"
            >
              + Add Oil
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-bg/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text">Results</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Display in:</span>
              <select
                value={displayUnit}
                onChange={(e) => setDisplayUnit(e.target.value as "oz" | "lb" | "g" | "kg")}
                className="px-2 py-1 bg-surface-widget border border-default rounded-lg text-text text-xs"
              >
                {availableDisplayUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit === "oz" ? "Ounces (oz)" : unit === "lb" ? "Pounds (lb)" : unit === "g" ? "Grams (g)" : "Kilograms (kg)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-surface-widget border border-default rounded-lg p-4">
              <span className="block text-text-muted text-xs font-medium uppercase">Wax Needed</span>
              <div className="text-2xl font-bold text-text mt-1">
                {convertDisplay(totalWaxWithBuffer, displayUnit)}
                <span className="text-sm font-normal text-text-muted ml-1">{displayUnitLabel}</span>
              </div>
            </div>
            <div className="bg-surface-widget border border-default rounded-lg p-4">
              <span className="block text-text-muted text-xs font-medium uppercase">Oil Needed</span>
              <div className="text-2xl font-bold text-text mt-1">
                {convertDisplay(totalOilWithBuffer, displayUnit)}
                <span className="text-sm font-normal text-text-muted ml-1">{displayUnitLabel}</span>
              </div>
            </div>
            <div className="bg-surface-widget border border-default rounded-lg p-4">
              <span className="block text-text-muted text-xs font-medium uppercase">Total Batch</span>
              <div className="text-2xl font-bold text-text mt-1">
                {convertDisplay(totalBatchWeight, displayUnit)}
                <span className="text-sm font-normal text-text-muted ml-1">{displayUnitLabel}</span>
              </div>
            </div>
          </div>

          {/* Oil Breakdown */}
          <div className="mt-4 pt-4 border-t border-default space-y-2">
            <h3 className="text-sm font-medium text-text">Oil Breakdown</h3>
            {foBlends.map((blend, index) => {
              const amount = (totalOilWithBuffer * blend.percentage) / 100;
              return (
                <div key={index} className="flex justify-between text-sm bg-surface-widget border border-default rounded-lg px-3 py-2">
                  <span className="text-text-secondary">
                    {blend.name || `Oil ${index + 1}`} ({blend.percentage}%)
                  </span>
                  <span className="font-medium text-text">
                    {convertDisplay(amount, displayUnit)} {displayUnitLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Save to Recipe */}
          <div className="mt-6 pt-4 border-t border-default">
            {!showSaveSection ? (
              <button
                onClick={() => setShowSaveSection(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4f8792] text-white hover:bg-[#426f79] transition-colors text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Save to Recipe
              </button>
            ) : (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-text">Save This Calculation to a Recipe</h3>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
                >
                  <option value="">Select product...</option>
                  {finishedGoods.map((fg) => (
                    <option key={fg.id} value={fg.id}>
                      {fg.name} ({fg.batchCode})
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveToRecipe}
                    disabled={isSaving || !selectedProductId}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4f8792] text-white hover:bg-[#426f79] transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setShowSaveSection(false)}
                    className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Line */}
          <p className="text-xs text-text-muted text-center mt-4 pt-4 border-t border-default">
            {containerCount} vessels × {fillWeight} {unitLabel} @ {fragranceLoad}% FL (+{safetyBuffer}% buffer)
            {blendError && " | ⚠️ Blend % must equal 100%"}
          </p>
        </div>
      </div>

      {/* Unit Converter */}
      <CollapsibleSection
        title="Unit Converter"
        subtitle="Modular conversion tools"
        defaultOpen={false}
      >
        <UnitConverter />
      </CollapsibleSection>

      {/* Reference Tables */}
      <CollapsibleSection
        title="Reference Tables"
        subtitle="Weight equivalents and fragrance load cheat sheet"
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-bg border border-default rounded-lg overflow-hidden">
            <div className="p-3 border-b border-default">
              <h3 className="text-sm font-semibold text-text">Weight Equivalents</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-bg text-text-muted text-xs uppercase font-medium border-b border-default">
                  <tr>
                    <th className="px-3 py-2">Ounces</th>
                    <th className="px-3 py-2">Grams</th>
                    <th className="px-3 py-2">Pounds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default text-xs">
                  <tr><td className="px-3 py-2 font-medium">1 oz</td><td className="px-3 py-2">28.35 g</td><td className="px-3 py-2">0.063 lb</td></tr>
                  <tr><td className="px-3 py-2 font-medium">4 oz</td><td className="px-3 py-2">113.40 g</td><td className="px-3 py-2">0.250 lb</td></tr>
                  <tr><td className="px-3 py-2 font-medium">8 oz</td><td className="px-3 py-2">226.80 g</td><td className="px-3 py-2">0.500 lb</td></tr>
                  <tr><td className="px-3 py-2 font-medium">16 oz (1 lb)</td><td className="px-3 py-2">453.59 g</td><td className="px-3 py-2">1.000 lb</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-bg border border-default rounded-lg overflow-hidden">
            <div className="p-3 border-b border-default">
              <h3 className="text-sm font-semibold text-text">FO per 1 lb Wax</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-bg text-text-muted text-xs uppercase font-medium border-b border-default">
                  <tr>
                    <th className="px-3 py-2">Load %</th>
                    <th className="px-3 py-2">FO (oz)</th>
                    <th className="px-3 py-2">FO (g)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default text-xs">
                  <tr><td className="px-3 py-2 font-medium">6%</td><td className="px-3 py-2">0.96 oz</td><td className="px-3 py-2">27.2 g</td></tr>
                  <tr><td className="px-3 py-2 font-medium">8% (Std)</td><td className="px-3 py-2">1.28 oz</td><td className="px-3 py-2">36.3 g</td></tr>
                  <tr><td className="px-3 py-2 font-medium">10% (Max)</td><td className="px-3 py-2">1.60 oz</td><td className="px-3 py-2">45.4 g</td></tr>
                  <tr><td className="px-3 py-2 font-medium">12% (Melt)</td><td className="px-3 py-2">1.92 oz</td><td className="px-3 py-2">54.4 g</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}