"use client";

import { useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

interface AddProductFormProps {
  locations: { id: string; name: string }[];
  addAction: (formData: FormData) => Promise<void>;
}

export function AddProductForm({ locations, addAction }: AddProductFormProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await addAction(formData);
        showToast("Product added successfully!", "success");
        const form = document.getElementById("add-product-form") as HTMLFormElement;
        form?.reset();
      } catch (error: any) {
        showToast(error.message || "Failed to add product.", "error");
      }
    });
  };

  return (
    <form id="add-product-form" action={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Product Name</label>
        <input type="text" name="name" required placeholder="e.g. 8oz Spiced Vanilla Candle" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">SKU</label>
        <input type="text" name="sku" placeholder="e.g. CAN-SV-8" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Batch Code</label>
        <input type="text" name="batchCode" required placeholder="e.g. B001-2026" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Retail Price</label>
        <input type="number" step="any" name="retailPrice" placeholder="0.00" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Qty on Hand</label>
        <input type="number" name="quantityOnHand" placeholder="0" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Labor $/unit</label>
        <input type="number" step="any" name="laborCostPerUnit" placeholder="0.00" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Overhead Flat $</label>
        <input type="number" step="any" name="overheadFlat" placeholder="0.00" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Overhead %</label>
        <input type="number" step="any" name="overheadPercent" placeholder="0" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Location</label>
        <select name="locationId" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm">
          <option value="">None</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending}
          className="w-fit px-6 mx-auto bg-[#4f8792] hover:bg-[#426f79] text-white font-medium py-2 rounded-full shadow-md transition-colors text-sm h-[40px] disabled:opacity-50"
        >
          {isPending ? "Adding..." : "+ Add Product"}
        </button>
      </div>
    </form>
  );
}