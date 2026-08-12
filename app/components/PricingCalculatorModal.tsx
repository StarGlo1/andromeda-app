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
    formData.append("name", product.name);
    formData.append("batchCode", "");
    formData.append("retailPrice", String(price));
    formData.append("quantityOnHand", String(0));

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
      <div className="bg-surface-widget border border-default rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text">💰 Pricing Guidance</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <p className="text-text-muted text-sm mb-4">
          <span className="font-medium text-text">{product.name}</span>
          <br />
          Current COGS: <span className="font-semibold text-warning">${cogs.toFixed(2)}</span>
          {currentRetail > 0 && (
            <span className="ml-2 text-text">
              · Current Retail: <span className="font-semibold">${currentRetail.toFixed(2)}</span>
              <span className="text-text-muted text-xs ml-1">
                ({currentMargin.toFixed(1)}% margin)
              </span>
            </span>
          )}
        </p>

        {/* Mode Toggle */}
        <div className="flex gap-1 bg-surface border border-default rounded-lg p-1 mb-4">
          <button
            onClick={() => setMode("margin")}
            className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              mode === "margin"
                ? "bg-brand text-white"
                : "text-text-muted hover:text-text hover:bg-surface-elevated"
            }`}
          >
            Target Margin
          </button>
          <button
            onClick={() => setMode("multiplier")}
            className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              mode === "multiplier"
                ? "bg-brand text-white"
                : "text-text-muted hover:text-text hover:bg-surface-elevated"
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
                <span className="text-text-muted">Target Margin</span>
                <span className="font-semibold text-text">{targetMargin}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="1"
                value={targetMargin}
                onChange={(e) => setTargetMargin(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <div className="flex justify-between text-xs text-text-muted">
                <span>10%</span>
                <span>50%</span>
                <span>90%</span>
              </div>
            </div>

            <div className="bg-surface border border-default rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Suggested Retail</span>
                <span className="font-bold text-text-brand text-lg">
                  ${suggestedRetailByMargin.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Suggested Wholesale (50% off)</span>
                <span className="font-semibold text-text">
                  ${suggestedWholesaleByMargin.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-default pt-2 mt-1">
                <span className="text-text-muted">Margin at suggested price</span>
                <span className="font-medium text-success">{displayMargin.toFixed(1)}%</span>
              </div>
            </div>

            <button
              onClick={() => applyPrice(suggestedRetailByMargin)}
              disabled={isPending || suggestedRetailByMargin <= 0}
              className="w-full bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? "Updating..." : `Apply Retail: $${suggestedRetailByMargin.toFixed(2)}`}
            </button>
          </div>
        ) : (
          // ── Multiplier Mode ──
          <div className="space-y-4">
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                Wholesale Multiplier
              </label>
              <div className="flex gap-2 flex-wrap">
                {WHOLESALE_MULTIPLIERS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedWholesaleMultiplier(m)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedWholesaleMultiplier === m
                        ? "bg-brand text-white"
                        : "bg-surface border border-default text-text-muted hover:bg-surface-elevated"
                    }`}
                  >
                    {m}x
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                Retail Multiplier
              </label>
              <div className="flex gap-2 flex-wrap">
                {RETAIL_MULTIPLIERS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedRetailMultiplier(m)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedRetailMultiplier === m
                        ? "bg-brand text-white"
                        : "bg-surface border border-default text-text-muted hover:bg-surface-elevated"
                    }`}
                  >
                    {m}x
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface border border-default rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">
                  Wholesale ({selectedWholesaleMultiplier}x COGS)
                </span>
                <span className="font-semibold text-text">
                  ${suggestedWholesaleByMultiplier.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">
                  Retail ({selectedRetailMultiplier}x COGS)
                </span>
                <span className="font-bold text-text-brand text-lg">
                  ${suggestedRetailByMultiplier.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-default pt-2 mt-1">
                <span className="text-text-muted">Margin at suggested retail</span>
                <span className="font-medium text-success">
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
              className="w-full bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? "Updating..." : `Apply Retail: $${suggestedRetailByMultiplier.toFixed(2)}`}
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-3 bg-surface border border-default text-text-secondary hover:bg-surface-elevated text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}