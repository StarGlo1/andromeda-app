"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

interface AddRecipeFormProps {
  finishedGoodId: string;
  materials: { id: string; name: string; unit?: string }[];
  subAssemblies: { id: string; name: string }[];
  addAction: (formData: FormData) => Promise<void>;
}

export function AddRecipeForm({
  finishedGoodId,
  materials,
  subAssemblies,
  addAction,
}: AddRecipeFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [ingredientType, setIngredientType] = useState<"raw" | "core">("raw");
  const [rawMaterialId, setRawMaterialId] = useState("");
  const [coreElementId, setCoreElementId] = useState("");
  const [requiredQuantity, setRequiredQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const selectedMaterial = materials.find((m) => m.id === rawMaterialId);

  const handleIngredientTypeChange = (type: "raw" | "core") => {
    setIngredientType(type);
    if (type === "raw") {
      setCoreElementId("");
      setUnit("");
    } else {
      setRawMaterialId("");
      setUnit("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!finishedGoodId) return;
    if (!requiredQuantity || parseFloat(requiredQuantity) <= 0) {
      showToast("Please enter a valid quantity.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("finishedGoodId", finishedGoodId);
    formData.append("requiredQuantity", requiredQuantity);
    formData.append("unit", unit || "unit");

    if (ingredientType === "raw") {
      if (!rawMaterialId) {
        showToast("Please select a raw material.", "error");
        return;
      }
      formData.append("ingredientType", "raw");
      formData.append("rawMaterialId", rawMaterialId);
      // Auto-fill unit from selected material if available
      if (selectedMaterial?.unit) {
        formData.set("unit", selectedMaterial.unit);
      }
    } else {
      if (!coreElementId) {
        showToast("Please select a Core Element.", "error");
        return;
      }
      formData.append("ingredientType", "core");
      formData.append("subAssemblyId", coreElementId);
    }

    startTransition(async () => {
      try {
        await addAction(formData);
        showToast("Ingredient added successfully!", "success");
        setRawMaterialId("");
        setCoreElementId("");
        setRequiredQuantity("");
        setUnit("");
      } catch (error: any) {
        showToast(error.message || "Failed to add ingredient.", "error");
      }
    });
  };

  return (
    <div className="bg-surface-widget border border-default rounded-xl p-6">
      <h2 className="text-lg font-semibold text-text mb-4">Add Ingredient to Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ingredient Type */}
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">
            Ingredient Type
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleIngredientTypeChange("raw")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                ingredientType === "raw"
                  ? "bg-[#4f8792] text-white"
                  : "bg-surface border border-default text-text-muted hover:bg-brand-muted"
              }`}
            >
              Raw Material
            </button>
            <button
              type="button"
              onClick={() => handleIngredientTypeChange("core")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                ingredientType === "core"
                  ? "bg-[#4f8792] text-white"
                  : "bg-surface border border-default text-text-muted hover:bg-brand-muted"
              }`}
            >
              Core Element
            </button>
          </div>
        </div>

        {/* Selector */}
        {ingredientType === "raw" ? (
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Raw Material
            </label>
            <select
              value={rawMaterialId}
              onChange={(e) => {
                setRawMaterialId(e.target.value);
                const mat = materials.find((m) => m.id === e.target.value);
                if (mat?.unit) setUnit(mat.unit);
              }}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            >
              <option value="">Select material...</option>
              {materials.map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Core Element
            </label>
            <select
              value={coreElementId}
              onChange={(e) => setCoreElementId(e.target.value)}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            >
              <option value="">Select Core Element...</option>
              {subAssemblies.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity and Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Quantity
            </label>
            <input
              type="number"
              step="any"
              value={requiredQuantity}
              onChange={(e) => setRequiredQuantity(e.target.value)}
              placeholder="e.g. 8"
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Unit
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Auto-filled"
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add to Recipe"}
        </button>
      </form>
    </div>
  );
}