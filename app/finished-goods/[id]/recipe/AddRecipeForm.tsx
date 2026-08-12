"use client";

import { useState } from "react";

function FieldTooltip({ text }: { text: string }) {
  return (
    <span className="relative ml-1 group">
      <span className="cursor-help text-text-muted hover:text-text text-xs font-bold border border-default rounded-full px-1.5 py-0.5 leading-none">?</span>
      <span
        className="fixed invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-50 w-52 px-3 py-2 bg-surface-elevated border border-default text-xs text-text rounded-lg shadow-lg pointer-events-none"
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

export function AddRecipeForm({
  finishedGoodId,
  materials,
  subAssemblies,
  addAction,
}: {
  finishedGoodId: string;
  materials: { id: string; name: string; unit: string | null }[];
  subAssemblies: { id: string; name: string }[];
  addAction: (formData: FormData) => Promise<void>;
}) {
  const [ingredientType, setIngredientType] = useState<"raw" | "sub">("raw");
  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [selectedSubAssemblyId, setSelectedSubAssemblyId] = useState("");
  const [unit, setUnit] = useState("");
  const [pending, setPending] = useState(false);

  const handleMaterialChange = (id: string) => {
    setSelectedMaterialId(id);
    const material = materials.find((m) => m.id === id);
    if (material && material.unit) {
      setUnit(material.unit);
    } else {
      setUnit("");
    }
  };

  const handleSubAssemblyChange = (id: string) => {
    setSelectedSubAssemblyId(id);
    setUnit("unit"); // Sub‑assemblies are counted in units
  };

  const handleTypeChange = (type: "raw" | "sub") => {
    setIngredientType(type);
    setSelectedMaterialId("");
    setSelectedSubAssemblyId("");
    setUnit("");
  };

  return (
    <div className="bg-surface-widget border border-default rounded-xl p-6">
      <h2 className="text-lg font-semibold text-text mb-4">Add Ingredient to Recipe</h2>
      <form
        action={async (formData) => {
          setPending(true);
          try {
            await addAction(formData);
          } finally {
            setPending(false);
          }
        }}
        className="flex flex-wrap gap-3 items-end"
      >
        <input type="hidden" name="finishedGoodId" value={finishedGoodId} />
        <input type="hidden" name="ingredientType" value={ingredientType} />

        {/* Ingredient Type Toggle */}
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">
            Ingredient Type
          </label>
          <div className="flex gap-1 bg-bg border border-default rounded-lg p-1">
            <button
              type="button"
              onClick={() => handleTypeChange("raw")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                ingredientType === "raw"
                  ? "bg-brand text-white"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Raw Material
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("sub")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                ingredientType === "sub"
                  ? "bg-brand text-white"
                  : "text-text-muted hover:text-text"
              }`}
            >
              Sub‑Assembly
            </button>
          </div>
        </div>

        {/* Raw Material Selector */}
        {ingredientType === "raw" && (
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Raw Material
              <FieldTooltip text="Pick a material from your inventory to add to this recipe." />
            </label>
            <select
              name="rawMaterialId"
              required
              value={selectedMaterialId}
              onChange={(e) => handleMaterialChange(e.target.value)}
              className="w-64 px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            >
              <option value="">Select material...</option>
              {materials.map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name} ({mat.unit ?? "unit"})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sub‑Assembly Selector */}
        {ingredientType === "sub" && (
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Sub‑Assembly
              <FieldTooltip text="Pick a sub‑assembly product to use as an ingredient." />
            </label>
            <select
              name="subAssemblyId"
              required
              value={selectedSubAssemblyId}
              onChange={(e) => handleSubAssemblyChange(e.target.value)}
              className="w-64 px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            >
              <option value="">Select sub‑assembly...</option>
              {subAssemblies.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
            Quantity
            <FieldTooltip text="How much of this ingredient goes into ONE finished product." />
          </label>
          <input
            type="number"
            name="requiredQuantity"
            step="any"
            required
            placeholder="e.g. 8"
            className="w-24 px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
          />
        </div>

        {/* Unit */}
        <div>
          <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
            Unit
            <FieldTooltip text="The unit of measurement. Auto‑filled from the material or set to 'unit' for sub‑assemblies." />
          </label>
          <input
            type="text"
            name="unit"
            required
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder={ingredientType === "raw" ? "Auto‑filled" : "unit"}
            className="w-20 px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm h-[40px] disabled:opacity-50"
        >
          {pending ? "Adding…" : "Add to Recipe"}
        </button>
      </form>
    </div>
  );
}