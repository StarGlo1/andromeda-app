"use client";

import { useState, useCallback, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

export function OrderForm({
  suppliers,
  materials,
  createOrderAction,
  addItemAction,
}: {
  suppliers: { id: string; name: string }[];
  materials: { id: string; name: string; unit: string | null }[];
  createOrderAction: (formData: FormData) => Promise<void>;
  addItemAction: (formData: FormData) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCreateOrder = useCallback(
    (formData: FormData) => {
      formData.append("supplierId", selectedSupplier);
      startTransition(async () => {
        try {
          await createOrderAction(formData);
          showToast("Purchase order created successfully!", "success");
          // Reset form (optional)
        } catch (error: any) {
          showToast(error.message || "Failed to create order.", "error");
        }
      });
    },
    [selectedSupplier, createOrderAction, showToast]
  );

  return (
    <form action={handleCreateOrder} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Supplier</label>
        <select
          name="supplierId"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          required
          className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
        >
          <option value="">Select supplier...</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Expected Date</label>
        <input type="date" name="expectedDate" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm" />
      </div>
      <div>
        <label className="block text-text-muted text-xs font-medium uppercase mb-1">Notes</label>
        <input type="text" name="notes" placeholder="Optional" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm" />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm h-[40px] disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Order"}
      </button>
    </form>
  );
}