"use client";

import { useState, useCallback, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

const REASONS = ["Testing", "Gifted", "Loss", "Damage", "Restock", "Correction"];

interface CategoryWithMaterials {
  id: string;
  name: string;
  rawMaterials: { id: string; name: string; unit: string | null }[];
}

export function AdjustmentForm({
  categories,
  addAdjustmentAction,
}: {
  categories: CategoryWithMaterials[];
  addAdjustmentAction: (formData: FormData) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPending, startTransition] = useTransition();

  const materials = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.rawMaterials ?? []
    : [];

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(e.target.value);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    startTransition(async () => {
      try {
        await addAdjustmentAction(formData);
        showToast("Adjustment recorded successfully!", "success");
        form.reset();
        setSelectedCategory("");
      } catch (error: any) {
        showToast(error.message || "Failed to record adjustment.", "error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Fields Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-start">
        {/* Category */}
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">Category</label>
          <select
            name="categoryId"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">Material</label>
          <select
            name="materialId"
            required
            disabled={materials.length === 0}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm disabled:opacity-50"
          >
            <option value="">Select material...</option>
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.unit})
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">Quantity (+/−)</label>
          <input
            type="number"
            name="quantity"
            step="any"
            required
            placeholder="e.g. -2 or +5"
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">Reason</label>
          <select name="reason" required className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm">
            <option value="">Select...</option>
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* No Materials Message - Separate Row Below */}
      {selectedCategory && materials.length === 0 && (
        <p className="text-text-muted text-xs -mt-3">
          No materials in this category.
        </p>
      )}

      {/* Save Button - Centered with Extra Spacing */}
      <div className="pt-2 flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm disabled:opacity-50 shadow-md"
        >
          {isPending ? "Saving..." : "Save Adjustment"}
        </button>
      </div>
    </form>
  );
}