"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";
import { Pencil, Check, X, Calculator } from "lucide-react";

interface Product {
  id: string;
  name: string;
  batchCode: string;
  retailPrice: number;
  calculatedCogs: number;
  quantityOnHand: number;
}

interface Props {
  products: Product[];
  updatePriceAction: (formData: FormData) => Promise<void>;
  bulkUpdatePricesAction: (formData: FormData) => Promise<void>;
}

export function PricingManager({ products, updatePriceAction, bulkUpdatePricesAction }: Props) {
  const { showToast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkMargin, setBulkMargin] = useState<string>("");
  const [showBulkPanel, setShowBulkPanel] = useState(false);

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setEditPrice(String(product.retailPrice));
  };

  const handleSaveEdit = (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("retailPrice", editPrice);

    startTransition(async () => {
      try {
        await updatePriceAction(formData);
        showToast("Price updated!", "success");
        setEditingId(null);
      } catch (error: any) {
        showToast(error.message || "Failed to update price.", "error");
      }
    });
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)));
    }
  };

  const handleBulkApply = () => {
    if (selectedIds.size === 0) {
      showToast("Select at least one product.", "error");
      return;
    }
    if (!bulkMargin || parseFloat(bulkMargin) <= 0 || parseFloat(bulkMargin) >= 100) {
      showToast("Enter a valid margin percentage (1-99).", "error");
      return;
    }

    const formData = new FormData();
    formData.append("productIds", JSON.stringify(Array.from(selectedIds)));
    formData.append("marginPercent", bulkMargin);

    startTransition(async () => {
      try {
        await bulkUpdatePricesAction(formData);
        showToast(`Prices updated to ${bulkMargin}% margin!`, "success");
        setSelectedIds(new Set());
        setBulkMargin("");
        setShowBulkPanel(false);
      } catch (error: any) {
        showToast(error.message || "Failed to update prices.", "error");
      }
    });
  };

  const calculateMargin = (price: number, cogs: number): number => {
    if (price <= 0) return 0;
    return ((price - cogs) / price) * 100;
  };

  const calculateSuggestedPrice = (cogs: number, targetMargin: number): number => {
    if (cogs <= 0 || targetMargin <= 0 || targetMargin >= 100) return 0;
    return cogs / (1 - targetMargin / 100);
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowBulkPanel(!showBulkPanel)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4f8792] text-white hover:bg-[#426f79] transition-colors text-sm font-medium"
            >
              <Calculator className="w-4 h-4" />
              Bulk Price Update
            </button>
            {selectedIds.size > 0 && (
              <span className="text-sm text-text-muted">
                {selectedIds.size} selected
              </span>
            )}
          </div>
          {products.length > 0 && (
            <button
              type="button"
              onClick={toggleSelectAll}
              className="text-sm text-[#4f8792] hover:underline"
            >
              {selectedIds.size === products.length ? "Deselect All" : "Select All"}
            </button>
          )}
        </div>

        {showBulkPanel && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Margin (%)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.5"
                min="1"
                max="99"
                value={bulkMargin}
                onChange={(e) => setBulkMargin(e.target.value)}
                placeholder="e.g. 60"
                className="w-32 px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
              />
              <button
                type="button"
                onClick={handleBulkApply}
                disabled={isPending}
                className="px-4 py-2 rounded-full bg-[#4f8792] text-white hover:bg-[#426f79] transition-colors text-sm font-medium disabled:opacity-50"
              >
                {isPending ? "Applying..." : "Apply to Selected"}
              </button>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Prices calculated as COGS ÷ (1 - Margin%). Example: $5 COGS at 60% margin = $12.50
            </p>
          </div>
        )}
      </div>

      {/* Pricing Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-default bg-[#d3dfe1] text-text-muted text-xs uppercase tracking-wider">
                <th className="p-4 text-center w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === products.length && products.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-default accent-[#4f8792]"
                  />
                </th>
                <th className="p-4 text-center">Product</th>
                <th className="p-4 text-center">COGS</th>
                <th className="p-4 text-center">Current Price</th>
                <th className="p-4 text-center">Margin</th>
                <th className="p-4 text-center">Suggested @ 60%</th>
                <th className="p-4 text-center">Wholesale</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default text-sm">
              {products.map((product, index) => {
                const margin = calculateMargin(product.retailPrice, product.calculatedCogs);
                const suggested = calculateSuggestedPrice(product.calculatedCogs, 60);
                const wholesale = product.retailPrice * 0.5;
                const rowBg = index % 2 === 0 ? "bg-[#ede6dc]" : "bg-[#e0d6c9]";
                const marginColor = margin >= 60 ? "text-green-600 dark:text-green-400" : margin >= 50 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400";

                return (
                  <tr key={product.id} className={`${rowBg} hover:bg-[#c5d9dd] transition-colors`}>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="rounded border-default accent-[#4f8792]"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <p className="font-medium text-text">{product.name}</p>
                      <p className="text-xs text-text-muted">{product.batchCode}</p>
                    </td>
                    <td className="p-4 text-center text-text-secondary">
                      ${product.calculatedCogs.toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      {editingId === product.id ? (
                        <div className="flex items-center gap-1.5 justify-center">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-20 px-2 py-1.5 bg-bg border border-default rounded-lg text-text text-sm text-center"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(product.id)}
                            disabled={isPending}
                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors disabled:opacity-50"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="font-semibold text-text">${product.retailPrice.toFixed(2)}</span>
                      )}
                    </td>
                    <td className={`p-4 text-center font-semibold ${marginColor}`}>
                      {margin.toFixed(1)}%
                    </td>
                    <td className="p-4 text-center text-text-secondary">
                      ${suggested.toFixed(2)}
                    </td>
                    <td className="p-4 text-center text-text-secondary">
                      ${wholesale.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        {editingId === product.id ? (
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">Editing...</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleStartEdit(product)}
                            className="p-2 text-black dark:text-white hover:bg-[#c5d9dd] rounded-full transition-colors"
                            title="Edit Price"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {products.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-text-muted">
                    No products yet. Create finished goods to see pricing data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs" style={{ color: '#ede6dc' }}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" /> ≥ 60% margin
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" /> 50-59% margin
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> &lt; 50% margin
        </span>
      </div>
    </div>
  );
}