"use client";

import { useState } from "react";
import { useToast } from "@/app/context/ToastContext";
import { PricingCalculatorModal } from "@/app/components/PricingCalculatorModal";

export function FinishedGoodRow({
  item,
  updateAction,
  deleteAction,
  produceAction,
}: {
  item: any;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  produceAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}) {
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [showProduce, setShowProduce] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [isProducing, setIsProducing] = useState(false);

  const profit = item.retailPrice - (item.calculatedCogs ?? 0);
  const marginPercent =
    item.retailPrice > 0 ? ((profit / item.retailPrice) * 100).toFixed(1) : null;

  const showNoPriceTip = profit < 0 && item.retailPrice === 0;

  const handleProduce = async (formData: FormData) => {
    setIsProducing(true);
    try {
      const result = await produceAction(formData);
      if (result.success) {
        showToast("Batch produced successfully! Stock updated.", "success");
        setShowProduce(false);
      } else {
        showToast(result.error || "Production failed.", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Production failed.", "error");
    } finally {
      setIsProducing(false);
    }
  };

  const handleDelete = async (formData: FormData) => {
    if (!confirm("Delete this product permanently?")) return;
    try {
      await deleteAction(formData);
      showToast("Product deleted successfully.", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to delete product.", "error");
    }
  };

  if (!editing) {
    return (
      <>
        <tr className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
          <td className="p-4 font-medium text-text" style={{ width: "var(--col-name)" }}>{item.name}</td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-sku)" }}>{item.sku ?? "—"}</td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-batchCode)" }}>{item.batchCode}</td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-retailPrice)" }}>
            ${item.retailPrice.toFixed(2)}
          </td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-quantityOnHand)" }}>{item.quantityOnHand}</td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-calculatedCogs)" }}>
            {item.calculatedCogs != null ? `$${item.calculatedCogs.toFixed(2)}` : "—"}
          </td>
          <td className={`p-4 font-medium text-center ${profit >= 0 ? 'text-success' : 'text-error'}`} style={{ width: "var(--col-profit)" }}>
            ${profit.toFixed(2)}
            {showNoPriceTip && (
              <span className="relative ml-1 group">
                <span className="cursor-help text-text-muted hover:text-text text-xs font-bold border border-default rounded-full px-1.5 py-0.5 leading-none">?</span>
                <span className="fixed invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-50 w-52 px-3 py-2 bg-surface-elevated border border-default text-xs text-text rounded-lg shadow-lg pointer-events-none"
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
                  Profit is negative because no retail price has been set. Use the "Price" button to get pricing suggestions.
                </span>
              </span>
            )}
          </td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-margin)" }}>
            {marginPercent !== null ? `${marginPercent}%` : "—"}
          </td>
          <td className="p-4 flex gap-1 items-center justify-center flex-wrap">
            <a href={`/finished-goods/${item.id}/recipe`} className="text-text-brand hover:underline text-xs font-medium">Recipe</a>
            <button onClick={() => setEditing(true)} className="text-text-brand hover:underline text-xs font-medium">Edit</button>
            <button
              onClick={() => setShowPricing(true)}
              className="text-text-brand hover:underline text-xs font-medium"
              title="Pricing Guidance"
            >
              💰
            </button>
            <button onClick={() => setShowProduce(!showProduce)} className="text-text-brand hover:underline text-xs font-medium">Produce</button>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-error hover:underline text-xs font-medium">Delete</button>
            </form>
          </td>
        </tr>

        {/* Produce row */}
        {showProduce && (
          <tr className="bg-brand-muted dark:bg-brand-muted-dark">
            <td colSpan={9} className="p-4">
              <form action={handleProduce} className="flex items-center gap-3">
                <input type="hidden" name="finishedGoodId" value={item.id} />
                <label className="text-text-muted text-xs font-medium uppercase">
                  How many units?
                </label>
                <input type="number" name="batchSize" required min="1" placeholder="5" className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
                <button
                  type="submit"
                  disabled={isProducing}
                  className="bg-brand hover:bg-brand-hover text-white text-xs px-3 py-1 rounded disabled:opacity-50"
                >
                  {isProducing ? "..." : "Produce"}
                </button>
                <button type="button" onClick={() => setShowProduce(false)} className="text-text-muted hover:text-text text-xs">Cancel</button>
              </form>
            </td>
          </tr>
        )}

        {/* Pricing Modal */}
        {showPricing && (
          <tr className="bg-brand-muted/30 dark:bg-brand-muted-dark/30">
            <td colSpan={9} className="p-4">
              <PricingCalculatorModal
                product={{
                  id: item.id,
                  name: item.name,
                  calculatedCogs: item.calculatedCogs,
                  retailPrice: item.retailPrice,
                }}
                onClose={() => setShowPricing(false)}
                onUpdate={updateAction}
              />
            </td>
          </tr>
        )}
      </>
    );
  }

  // ── Edit mode ──
  return (
    <tr className="bg-brand-muted dark:bg-brand-muted-dark">
      <td className="p-2" style={{ width: "var(--col-name)" }}>
        <input type="text" name="name" defaultValue={item.name} required className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
      </td>
      <td className="p-2" style={{ width: "var(--col-sku)" }}>
        <input type="text" name="sku" defaultValue={item.sku ?? ""} className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
      </td>
      <td className="p-2" style={{ width: "var(--col-batchCode)" }}>
        <input type="text" name="batchCode" defaultValue={item.batchCode} required className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
      </td>
      <td className="p-2" style={{ width: "var(--col-retailPrice)" }}>
        <input type="number" name="retailPrice" defaultValue={item.retailPrice} step="any" className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
      </td>
      <td className="p-2" style={{ width: "var(--col-quantityOnHand)" }}>
        <input type="number" name="quantityOnHand" defaultValue={item.quantityOnHand} className="w-16 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
      </td>
      <td className="p-2 text-text-muted text-xs text-center" style={{ width: "var(--col-calculatedCogs)" }}>(auto)</td>
      <td className="p-2 text-text-muted text-xs text-center" style={{ width: "var(--col-profit)" }}>—</td>
      <td className="p-2 text-text-muted text-xs text-center" style={{ width: "var(--col-margin)" }}>—</td>
      <td className="p-2 flex gap-2 justify-center">
        <form action={async (formData: FormData) => {
          formData.append("id", item.id);
          await updateAction(formData);
          setEditing(false);
          showToast("Product updated successfully.", "success");
        }}>
          <button type="submit" className="bg-brand hover:bg-brand-hover text-white text-xs px-3 py-1 rounded">Save</button>
        </form>
        <button onClick={() => setEditing(false)} className="text-text-muted hover:text-text text-xs px-2 py-1">Cancel</button>
        <form action={handleDelete}>
          <input type="hidden" name="id" value={item.id} />
          <button type="submit" className="text-error hover:underline text-xs font-medium">Delete</button>
        </form>
      </td>
    </tr>
  );
}