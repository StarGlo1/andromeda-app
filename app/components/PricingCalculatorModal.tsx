"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

interface PricingCalculatorModalProps {
  product: {
    id: string;
    name: string;
    calculatedCogs: number | null;
    retailPrice: number;
  };
  onClose: () => void;
  onUpdate: (formData: FormData) => Promise<void>;
}

const WHOLESALE_MULTIPLIERS = [1.5, 2.0, 2.5];
const RETAIL_MULTIPLIERS = [2.0, 2.5, 3.0, 4.0, 5.0];

export function PricingCalculatorModal({
  product,
  onClose,
  onUpdate,
}: PricingCalculatorModalProps) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [targetMargin, setTargetMargin] = useState(60);
  const [selectedWholesaleMultiplier, setSelectedWholesaleMultiplier] = useState(2.0);
  const [selectedRetailMultiplier, setSelectedRetailMultiplier] = useState(4.0);
  const [mode, setMode] = useState<"margin" | "multiplier">("margin");

  const cogs = product.calculatedCogs ?? 0;

  // ── Calculations ──
  const suggestedRetailByMargin = cogs > 0 ? cogs / (1 - targetMargin / 100) : 0;
  const suggestedWholesaleByMargin = suggestedRetailByMargin * 0.5;

  const suggestedRetailByMultiplier = cogs * selectedRetailMultiplier;
  const suggestedWholesaleByMultiplier = cogs * selectedWholesaleMultiplier;

  const currentRetail = product.retailPrice || 0;
  const currentMargin =
    currentRetail > 0 && cogs > 0
      ? ((currentRetail - cogs) / currentRetail) * 100
      : 0;

  const displayRetail =
    mode === "margin" ? suggestedRetailByMargin : suggestedRetailByMultiplier;
  const displayWholesale =
    mode === "margin" ? suggestedWholesaleByMargin : suggestedWholesaleByMultiplier;
  const displayMargin =
    displayRetail > 0 ? ((displayRetail - cogs) / displayRetail) * 100 : 0;

  const applyPrice = (price: number) => {
    if (price <= 0) {
      showToast("Price must be greater than $0.00.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("retailPrice", String(price));

    // Do NOT overwrite other fields. The update action should only change retail price.
    // We will use a dedicated price update action in the parent if needed.
    // For now, call onUpdate but only with these fields.
    // The parent updateFinishedGood must be tolerant of missing fields.

    startTransition(async () => {
      try {
        await onUpdate(formData);
        showToast(`Retail price updated to $${price.toFixed(2)}`, "success");
        onClose();
      } catch (error: any) {
        showToast(error.message || "Failed to update price.", "error");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">💰 Pricing Guidance</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
          <br />
          Current COGS:{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            ${cogs.toFixed(2)}
          </span>
          {cogs === 0 && (
            <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
              (Add recipe ingredients to calculate COGS)
            </span>
          )}
          {currentRetail > 0 && (
            <span className="ml-2 text-gray-900 dark:text-white">
              · Current Retail: <span className="font-semibold">${currentRetail.toFixed(2)}</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                ({currentMargin.toFixed(1)}% margin)
              </span>
            </span>
          )}
        </p>

        {/* Warning when COGS is 0 */}
        {cogs === 0 && (
          <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs">
            You need a recipe with ingredient costs before pricing suggestions can be calculated.
            <a
              href={`/finished-goods/${product.id}/recipe`}
              className="ml-2 underline font-medium"
            >
              Go to Recipe →
            </a>
          </div>
        )}

        {/* Mode Toggle */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg p-1 mb-4">
          <button
            onClick={() => setMode("margin")}
            className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              mode === "margin"
                ? "bg-teal-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Target Margin
          </button>
          <button
            onClick={() => setMode("multiplier")}
            className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              mode === "multiplier"
                ? "bg-teal-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            COGS × Multiplier
          </button>
        </div>

        {mode === "margin" ? (
          // ── Target Margin Mode ──
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">Target Margin</span>
                <span className="font-semibold text-gray-900 dark:text-white">{targetMargin}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="1"
                value={targetMargin}
                onChange={(e) => setTargetMargin(Number(e.target.value))}
                className="w-full accent-teal-500"
                disabled={cogs === 0}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>10%</span>
                <span>50%</span>
                <span>90%</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Suggested Retail</span>
                <span className="font-bold text-teal-600 dark:text-teal-400 text-lg">
                  ${suggestedRetailByMargin.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Suggested Wholesale (50% off)</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${suggestedWholesaleByMargin.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 dark:border-slate-600 pt-2 mt-1">
                <span className="text-gray-500 dark:text-gray-400">Margin at suggested price</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {displayMargin.toFixed(1)}%
                </span>
              </div>
            </div>

            <button
              onClick={() => applyPrice(suggestedRetailByMargin)}
              disabled={isPending || suggestedRetailByMargin <= 0}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? "Updating..." : `Apply Retail: $${suggestedRetailByMargin.toFixed(2)}`}
            </button>
          </div>
        ) : (
          // ── Multiplier Mode ──
          <div className="space-y-4">
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">
                Wholesale Multiplier
              </label>
              <div className="flex gap-2 flex-wrap">
                {WHOLESALE_MULTIPLIERS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedWholesaleMultiplier(m)}
                    disabled={cogs === 0}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedWholesaleMultiplier === m
                        ? "bg-teal-600 text-white"
                        : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    } disabled:opacity-50`}
                  >
                    {m}x
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">
                Retail Multiplier
              </label>
              <div className="flex gap-2 flex-wrap">
                {RETAIL_MULTIPLIERS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedRetailMultiplier(m)}
                    disabled={cogs === 0}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedRetailMultiplier === m
                        ? "bg-teal-600 text-white"
                        : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    } disabled:opacity-50`}
                  >
                    {m}x
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Wholesale ({selectedWholesaleMultiplier}x COGS)
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${suggestedWholesaleByMultiplier.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Retail ({selectedRetailMultiplier}x COGS)
                </span>
                <span className="font-bold text-teal-600 dark:text-teal-400 text-lg">
                  ${suggestedRetailByMultiplier.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 dark:border-slate-600 pt-2 mt-1">
                <span className="text-gray-500 dark:text-gray-400">Margin at suggested retail</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {suggestedRetailByMultiplier > 0
                    ? (((suggestedRetailByMultiplier - cogs) / suggestedRetailByMultiplier) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>

            <button
              onClick={() => applyPrice(suggestedRetailByMultiplier)}
              disabled={isPending || suggestedRetailByMultiplier <= 0}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? "Updating..." : `Apply Retail: $${suggestedRetailByMultiplier.toFixed(2)}`}
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}