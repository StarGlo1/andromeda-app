"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/app/components/Navbar";
import { getAverageCosts, createRecipeFromBatch } from "./actions";

function FieldTooltip({ text }: { text: string }) {
  return (
    <span className="relative ml-1 group">
      <span className="cursor-help text-text-muted hover:text-text text-xs font-bold border border-default rounded-full px-1.5 py-0.5 leading-none">
        ?
      </span>
      <span
        className="fixed invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-50 w-56 px-3 py-2 bg-surface-elevated border border-default text-xs text-text rounded-lg shadow-lg pointer-events-none"
        style={{ transform: "translate(-50%, -100%)", marginTop: "-0.5rem" }}
        ref={(el) => {
          if (el) {
            const icon = el.previousElementSibling as HTMLElement;
            if (icon) {
              const rect = icon.getBoundingClientRect();
              el.style.left = `${rect.left + rect.width / 2}px`;
              el.style.top = `${rect.top}px`;
            }
          }
        }}
      >
        {text}
      </span>
    </span>
  );
}

const toOz = (value: number, unit: "g" | "oz" | "lb") => {
  if (unit === "g") return value / 28.3495;
  if (unit === "lb") return value * 16;
  return value;
};

const fromOz = (oz: number, unit: "g" | "oz" | "lb") => {
  if (unit === "g") return oz * 28.3495;
  if (unit === "lb") return oz / 16;
  return oz;
};

interface CalcHistoryEntry {
  timestamp: number;
  unit: string;
  vesselFillOz: number;
  vesselCount: number;
  fragranceLoad: number;
  foMode: string;
  mixWaxes: boolean;
  mixFragrances: boolean;
  waxBlends: { name: string; percentage: number }[];
  fragranceBlends: { name: string; percentage: number; materialId?: string }[];
  totalWaxOz: number;
  totalFragranceOz: number;
}

function BlendAutocomplete({
  allMaterials,
  initialName,
  initialMaterialId,
  onCommit,
}: {
  allMaterials: { id: string; name: string; unit: string | null }[];
  initialName: string;
  initialMaterialId?: string;
  onCommit: (name: string, materialId?: string) => void;
}) {
  const [input, setInput] = useState(initialName);
  const [selectedId, setSelectedId] = useState<string | undefined>(initialMaterialId);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInput(initialName);
    setSelectedId(initialMaterialId);
  }, [initialName, initialMaterialId]);

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
    ? allMaterials.filter((m) => m.name.toLowerCase().includes(input.toLowerCase()))
    : allMaterials;

  const selectMaterial = (mat: { id: string; name: string; unit: string | null }) => {
    setInput(mat.name);
    setSelectedId(mat.id);
    setShowDropdown(false);
    onCommit(mat.name, mat.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setShowDropdown(true);
    if (selectedId) {
      const current = allMaterials.find(m => m.id === selectedId);
      if (!current || current.name.toLowerCase() !== val.toLowerCase()) {
        setSelectedId(undefined);
        onCommit(val, undefined);
      }
    } else {
      onCommit(val, undefined);
    }
  };

  const handleBlur = () => {
    setShowDropdown(false);
    onCommit(input, selectedId);
  };

  const selectedMaterial = selectedId ? allMaterials.find(m => m.id === selectedId) : null;
  const hasSelection = !!selectedMaterial;

  return (
    <div className="relative flex-1" ref={containerRef}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={handleBlur}
        placeholder="Search oil…"
        className={`w-full px-2 py-1 bg-bg border rounded text-text text-sm ${
          input.length > 0 && !hasSelection ? "border-warning ring-1 ring-warning" : "border-default"
        }`}
      />
      {showDropdown && (
        <div className="absolute left-0 top-full mt-1 z-10 w-full bg-surface-widget border border-default rounded-lg shadow-lg max-h-36 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-2 py-1 text-text-muted text-xs">No match found</div>
          ) : (
            filtered.map((mat) => (
              <button
                key={mat.id}
                type="button"
                className="w-full text-left px-2 py-1 hover:bg-brand-muted dark:hover:bg-brand-muted-dark text-text text-sm"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectMaterial(mat);
                }}
              >
                {mat.name} ({mat.unit ?? "oz"})
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function CalculatorClient({
  initialMaterials,
}: {
  initialMaterials: { id: string; name: string; unit: string | null }[];
}) {
  const [unit, setUnit] = useState<"oz" | "g" | "lb">("oz");
  const [vesselFillOz, setVesselFillOz] = useState(8);
  const [vesselCount, setVesselCount] = useState(1);
  const [fragranceLoad, setFragranceLoad] = useState(8);
  const [foMode, setFoMode] = useState<"wax" | "total">("wax");
  const [mixWaxes, setMixWaxes] = useState(false);
  const [mixFragrances, setMixFragrances] = useState(false);
  const [waxBlends, setWaxBlends] = useState([{ name: "Wax 1", percentage: 100 }]);
  const [fragranceBlends, setFragranceBlends] = useState([
    { name: "Oil 1", percentage: 100, materialId: undefined as string | undefined },
  ]);

  const [allMaterials] = useState(initialMaterials);

  const [primaryFragranceInput, setPrimaryFragranceInput] = useState("");
  const [showPrimaryDropdown, setShowPrimaryDropdown] = useState(false);
  const [primaryMaterial, setPrimaryMaterial] = useState<{ id: string; name: string; unit: string | null } | null>(null);

  const [avgWaxCost, setAvgWaxCost] = useState(0);
  const [avgFragranceCost, setAvgFragranceCost] = useState(0);
  const [waxCostUnit, setWaxCostUnit] = useState("lb");
  const [fragranceCostUnit, setFragranceCostUnit] = useState("oz");

  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<CalcHistoryEntry[]>([]);

  useEffect(() => {
    getAverageCosts().then((data) => {
      setAvgWaxCost(data.avgWaxCost);
      setAvgFragranceCost(data.avgFragranceCost);
      setWaxCostUnit(data.waxUnit);
      setFragranceCostUnit(data.fragranceUnit);
    });
    try {
      const saved = localStorage.getItem("calcHistory");
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  const addToHistory = (entry: CalcHistoryEntry) => {
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("calcHistory", JSON.stringify(updated));
  };

  const waxTotal = waxBlends.reduce((s, b) => s + b.percentage, 0);
  const waxError = mixWaxes && Math.abs(waxTotal - 100) > 0.01;
  const fragTotal = fragranceBlends.reduce((s, b) => s + b.percentage, 0);
  const fragError = mixFragrances && Math.abs(fragTotal - 100) > 0.01;

  const updateWaxPercent = (i: number, v: number) =>
    setWaxBlends((prev) => prev.map((b, idx) => (idx === i ? { ...b, percentage: v } : b)));
  const updateFragrancePercent = (i: number, v: number) =>
    setFragranceBlends((prev) => prev.map((b, idx) => (idx === i ? { ...b, percentage: v } : b)));

  const addWaxBlend = () =>
    setWaxBlends([...waxBlends, { name: `Wax ${waxBlends.length + 1}`, percentage: 0 }]);
  const removeWaxBlend = (i: number) => {
    if (waxBlends.length <= 1) return;
    setWaxBlends(waxBlends.filter((_, idx) => idx !== i));
  };

  const addFragranceBlend = () =>
    setFragranceBlends([
      ...fragranceBlends,
      { name: `Oil ${fragranceBlends.length + 1}`, percentage: 0, materialId: undefined },
    ]);
  const removeFragranceBlend = (i: number) => {
    if (fragranceBlends.length <= 1) return;
    setFragranceBlends(fragranceBlends.filter((_, idx) => idx !== i));
  };

  const filteredPrimaryMaterials = primaryFragranceInput.length > 0
    ? allMaterials.filter((m) => m.name.toLowerCase().includes(primaryFragranceInput.toLowerCase()))
    : allMaterials.slice(0, 10);

  const fillOz = vesselFillOz;
  const totalFillOz = fillOz * vesselCount;
  const load = fragranceLoad / 100;
  let totalWaxOz: number, totalFragranceOz: number;
  if (foMode === "wax") {
    totalWaxOz = totalFillOz / (1 + load);
    totalFragranceOz = totalWaxOz * load;
  } else {
    totalWaxOz = totalFillOz / (1 + load);
    totalFragranceOz = totalWaxOz * load;
  }

  const waxBreakdown = waxBlends.map((b) => ({ name: b.name, oz: (totalWaxOz * b.percentage) / 100 }));
  const fragranceBreakdown = fragranceBlends.map((b) => ({
    name: b.name,
    oz: (totalFragranceOz * b.percentage) / 100,
  }));

  const waxCostTotal = (totalWaxOz / 16) * avgWaxCost;
  const fragranceCostTotal = totalFragranceOz * avgFragranceCost;
  const batchCost = waxCostTotal + fragranceCostTotal;
  const costPerCandle = vesselCount > 0 ? batchCost / vesselCount : 0;
  const hasResult = vesselCount > 0 && fillOz > 0;

  const unassignedBlends = fragranceBlends.some((b) => b.percentage > 0 && !b.materialId);

  const handleCreateRecipe = async () => {
    if (unassignedBlends) {
      alert("Each fragrance blend must have a material selected from the dropdown.");
      return;
    }
    setSaving(true);
    const materialIds = fragranceBlends.map((b) => b.materialId);
    await createRecipeFromBatch(
      totalWaxOz,
      totalFragranceOz,
      waxBreakdown,
      fragranceBreakdown,
      vesselFillOz,
      fragranceLoad,
      primaryMaterial?.id,
      materialIds
    );
    addToHistory({
      timestamp: Date.now(),
      unit,
      vesselFillOz,
      vesselCount,
      fragranceLoad,
      foMode,
      mixWaxes,
      mixFragrances,
      waxBlends,
      fragranceBlends,
      totalWaxOz,
      totalFragranceOz,
    });
  };

  const resetForm = () => {
    setVesselFillOz(8);
    setVesselCount(1);
    setFragranceLoad(8);
    setFoMode("wax");
    setMixWaxes(false);
    setMixFragrances(false);
    setWaxBlends([{ name: "Wax 1", percentage: 100 }]);
    setFragranceBlends([{ name: "Oil 1", percentage: 100, materialId: undefined }]);
    setPrimaryMaterial(null);
    setPrimaryFragranceInput("");
  };

  return (
    <main className="min-h-screen bg-bg text-text p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />
        <div className="bg-surface-widget border border-default rounded-xl p-6" suppressHydrationWarning>
          <h2 className="text-lg font-semibold text-text mb-4">Pour & Batch Calculator</h2>
          <p className="text-text-muted text-sm mb-6">
            Calculate exact wax and fragrance oil for any batch. Costs are based on your live inventory averages.
          </p>

          {/* Unit toggle */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-text-muted text-xs font-medium uppercase">Unit</span>
            {(["oz", "g", "lb"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  unit === u ? "bg-brand text-white" : "bg-bg border border-default text-text-muted hover:bg-brand-muted"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          {/* Vessel & Batch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                Fill Weight per Vessel ({unit})
              </label>
              <input
                type="number"
                step="any"
                value={fromOz(fillOz, unit)}
                onChange={(e) => setVesselFillOz(toOz(parseFloat(e.target.value) || 0, unit))}
                placeholder="8"
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                Number of Vessels
              </label>
              <input
                type="number"
                value={vesselCount}
                onChange={(e) => setVesselCount(parseInt(e.target.value) || 0)}
                placeholder="1"
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>
          </div>

          {/* Fragrance Load & Math */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                Fragrance Load (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.01"
                  value={fragranceLoad}
                  onChange={(e) => setFragranceLoad(parseFloat(e.target.value))}
                  className="flex-1 accent-brand"
                />
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max="15"
                  value={fragranceLoad}
                  onChange={(e) => setFragranceLoad(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm text-right"
                />
                <span className="text-text text-sm">%</span>
              </div>
            </div>
            <div>
              <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
                Fragrance Math
                <FieldTooltip text="'Based on Wax Weight' means fragrance oil is a percentage of the wax weight (e.g., 1 oz FO per 10 oz wax). 'Based on Total Weight' means FO is a percentage of the total fill weight (wax + FO). Most candle makers use 'Based on Wax Weight'." />
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFoMode("wax")}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    foMode === "wax" ? "bg-brand text-white" : "bg-bg border border-default text-text-muted hover:bg-brand-muted"
                  }`}
                >
                  Based on Wax Weight
                </button>
                <button
                  onClick={() => setFoMode("total")}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    foMode === "total" ? "bg-brand text-white" : "bg-bg border border-default text-text-muted hover:bg-brand-muted"
                  }`}
                >
                  Based on Total Weight
                </button>
              </div>
            </div>
          </div>

          {/* Primary Fragrance Oil (fallback) */}
          <div className="mb-4">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Primary Fragrance Oil (fallback)
            </label>
            <div className="relative">
              <input
                type="text"
                value={primaryMaterial ? primaryMaterial.name : primaryFragranceInput}
                onChange={(e) => {
                  setPrimaryMaterial(null);
                  setPrimaryFragranceInput(e.target.value);
                  setShowPrimaryDropdown(true);
                }}
                onFocus={() => setShowPrimaryDropdown(true)}
                onBlur={() => setTimeout(() => setShowPrimaryDropdown(false), 150)}
                placeholder="Start typing to find a fragrance oil…"
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
              {showPrimaryDropdown && filteredPrimaryMaterials.length > 0 && (
                <div className="absolute left-0 top-full mt-1 z-10 w-full bg-surface-widget border border-default rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredPrimaryMaterials.map((mat) => (
                    <button
                      key={mat.id}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-brand-muted dark:hover:bg-brand-muted-dark text-text text-sm"
                      onMouseDown={() => {
                        setPrimaryMaterial(mat);
                        setPrimaryFragranceInput(mat.name);
                        setShowPrimaryDropdown(false);
                      }}
                    >
                      {mat.name} ({mat.unit ?? "oz"})
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-text-muted text-xs mt-1">
              Used for any blend that doesn't have its own oil selected.
            </p>
          </div>

          {/* Blending toggles */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 text-text-muted text-xs font-medium">
              <input type="checkbox" checked={mixWaxes} onChange={(e) => setMixWaxes(e.target.checked)} className="rounded border-default accent-brand" />
              Mix Waxes
            </label>
            <label className="flex items-center gap-2 text-text-muted text-xs font-medium">
              <input type="checkbox" checked={mixFragrances} onChange={(e) => setMixFragrances(e.target.checked)} className="rounded border-default accent-brand" />
              Mix Fragrances
            </label>
          </div>

          {/* Wax Blend Editor */}
          {mixWaxes && (
            <div className="mb-4 p-4 bg-surface border border-default rounded-lg">
              <p className="text-xs font-semibold text-text-muted uppercase mb-2">Wax Blends (must total 100%)</p>
              {waxBlends.map((b, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <input type="text" value={b.name} onChange={(e) => {
                    const nl = [...waxBlends]; nl[i].name = e.target.value; setWaxBlends(nl);
                  }} className="flex-1 px-2 py-1 bg-bg border border-default rounded text-text text-sm" placeholder="Name" />
                  <input type="number" value={b.percentage} onChange={(e) => updateWaxPercent(i, parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 bg-bg border border-default rounded text-text text-sm" placeholder="%" min="0" max="100" step="0.1" />
                  <span className="text-text-muted text-xs">%</span>
                  {waxBlends.length > 1 && <button onClick={() => removeWaxBlend(i)} className="text-error hover:underline text-xs">✕</button>}
                </div>
              ))}
              {waxError && <p className="text-error text-xs mt-1">Blends must total 100% (currently {waxTotal}%).</p>}
              <button onClick={addWaxBlend} className="mt-2 text-text-brand hover:underline text-xs font-medium">+ Add Wax</button>
            </div>
          )}

          {/* Fragrance Blend Editor – dropdowns populate instantly */}
          {mixFragrances && (
            <div className="mb-4 p-4 bg-surface border border-default rounded-lg">
              <p className="text-xs font-semibold text-text-muted uppercase mb-2">Fragrance Blends (must total 100%)</p>
              {fragranceBlends.map((b, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <BlendAutocomplete
                    allMaterials={allMaterials}
                    initialName={b.name}
                    initialMaterialId={b.materialId}
                    onCommit={(name, materialId) => {
                      setFragranceBlends((prev) =>
                        prev.map((bl, idx) =>
                          idx === i ? { ...bl, name, materialId } : bl
                        )
                      );
                    }}
                  />
                  <input type="number" value={b.percentage} onChange={(e) => updateFragrancePercent(i, parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 bg-bg border border-default rounded text-text text-sm" placeholder="%" min="0" max="100" step="0.1" />
                  <span className="text-text-muted text-xs">%</span>
                  {fragranceBlends.length > 1 && <button onClick={() => removeFragranceBlend(i)} className="text-error hover:underline text-xs">✕</button>}
                </div>
              ))}
              {fragError && <p className="text-error text-xs mt-1">Blends must total 100% (currently {fragTotal}%).</p>}
              <button onClick={addFragranceBlend} className="mt-2 text-text-brand hover:underline text-xs font-medium">+ Add Fragrance</button>
            </div>
          )}

          {/* Reset */}
          <div className="flex gap-3 mb-4">
            <button onClick={resetForm} className="bg-border-strong hover:bg-border text-slate-900 dark:text-slate-900 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Reset
            </button>
          </div>

          {/* Results */}
          {hasResult && (
            <div className="bg-surface border border-default rounded-lg p-4 space-y-3 text-center">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Batch Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm justify-items-center">
                <div>
                  <p className="text-text-muted">Total Wax</p>
                  <p className="text-text font-bold text-lg">{fromOz(totalWaxOz, unit).toFixed(2)} {unit}</p>
                  {mixWaxes && waxBreakdown.map((w, i) => (
                    <p key={i} className="text-text-muted text-xs">{w.name}: {fromOz(w.oz, unit).toFixed(2)} {unit}</p>
                  ))}
                </div>
                <div>
                  <p className="text-text-muted">Total Fragrance Oil</p>
                  <p className="text-text-brand font-bold text-lg">{fromOz(totalFragranceOz, unit).toFixed(2)} {unit}</p>
                  {mixFragrances && fragranceBreakdown.map((f, i) => (
                    <p key={i} className="text-text-muted text-xs">{f.name}: {fromOz(f.oz, unit).toFixed(2)} {unit}</p>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-default">
                <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-2">Estimated Cost</h4>
                <div className="grid grid-cols-2 gap-4 text-sm justify-items-center">
                  <div><p className="text-text-muted">Wax Cost</p><p className="text-text font-medium">${waxCostTotal.toFixed(2)}</p><p className="text-text-muted text-xs">{avgWaxCost > 0 ? `$${avgWaxCost.toFixed(2)}/${waxCostUnit}` : "no data"}</p></div>
                  <div><p className="text-text-muted">Fragrance Oil Cost</p><p className="text-text font-medium">${fragranceCostTotal.toFixed(2)}</p><p className="text-text-muted text-xs">{avgFragranceCost > 0 ? `$${avgFragranceCost.toFixed(2)}/${fragranceCostUnit}` : "no data"}</p></div>
                  <div><p className="text-text-muted">Total Batch Cost</p><p className="text-text-brand font-bold text-lg">${batchCost.toFixed(2)}</p></div>
                  <div><p className="text-text-muted">Per Candle (wax + FO)</p><p className="text-text font-bold text-lg">${costPerCandle.toFixed(4)}</p></div>
                </div>
              </div>
            </div>
          )}

          {hasResult && (
            <div className="mt-4 text-center">
              <button
                onClick={handleCreateRecipe}
                disabled={saving || unassignedBlends}
                className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "Creating Recipe…" : unassignedBlends ? "Select oils for all blends" : "Create Recipe from Batch"}
              </button>
              {unassignedBlends && (
                <p className="text-warning text-xs mt-1">
                  Each blend must have a material selected from the dropdown.
                </p>
              )}
              <p className="text-text-muted text-xs mt-2">
                This will create a new Finished Good and automatically add the calculated wax and fragrance oil as recipe items. You can then add jars, wicks, and other materials.
              </p>
            </div>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-surface-widget border border-default rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">Calculation History</h3>
              <button onClick={() => { setHistory([]); localStorage.removeItem("calcHistory"); }} className="text-text-muted hover:text-text text-xs font-medium">
                Clear History
              </button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {history.map((entry, idx) => (
                <div key={idx} className="bg-surface border border-default rounded-lg p-3 text-sm flex items-center justify-between">
                  <div>
                    <span className="text-text font-medium">{entry.vesselCount} × {fromOz(entry.vesselFillOz, entry.unit as any).toFixed(2)} {entry.unit}</span>
                    <span className="text-text-muted ml-2">| {entry.fragranceLoad}% FO | Wax: {fromOz(entry.totalWaxOz, entry.unit as any).toFixed(2)} {entry.unit} | FO: {fromOz(entry.totalFragranceOz, entry.unit as any).toFixed(2)} {entry.unit}</span>
                  </div>
                  <span className="text-text-muted text-xs">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}