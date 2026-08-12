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
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await addAdjustmentAction(formData);
        showToast("Adjustment recorded successfully!", "success");
        e.currentTarget.reset();
        setSelectedCategory("");
      } catch (error: any) {
        showToast(error.message || "Failed to record adjustment.", "error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
      {/* ... existing fields ... */}
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
        {selectedCategory && materials.length === 0 && (
          <p className="text-text-muted text-xs mt-1">No materials in this category.</p>
        )}
      </div>

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

      <div className="sm:col-span-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm h-[40px] w-full disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Adjustment"}
        </button>
      </div>
    </form>
  );
}