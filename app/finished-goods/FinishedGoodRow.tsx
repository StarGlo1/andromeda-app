"use client";

import { useState } from "react";
import { useToast } from "@/app/context/ToastContext";
import { PricingCalculatorModal } from "@/app/components/PricingCalculatorModal";

export function FinishedGoodRow({
  item,
  updateAction,
  deleteAction,
  produceAction,
  rowIndex = 0,
}: {
  item: any;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  produceAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  rowIndex?: number;
}) {
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [showProduce, setShowProduce] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [isProducing, setIsProducing] = useState(false);
  const [optimisticStock, setOptimisticStock] = useState<number | null>(null);
  const [rawMaterialLots, setRawMaterialLots] = useState<any[]>([]);
  const [selectedLots, setSelectedLots] = useState<Record<string, number>>({});

  const profit = item.retailPrice - (item.calculatedCogs ?? 0);
  const marginPercent =
    item.retailPrice > 0 ? ((profit / item.retailPrice) * 100).toFixed(1) : null;

  const isOutOfStock = (item.quantityOnHand ?? 0) <= 0;

  const showNoPriceTip = profit < 0 && item.retailPrice === 0;

  const handleProduce = async (formData: FormData) => {
    const batchSize = parseInt(formData.get("batchSize") as string) || 0;
    
    // OPTIMISTIC UPDATE - must happen synchronously before await
    const newStock = item.quantityOnHand + batchSize;
    setOptimisticStock(newStock);
    setIsProducing(true);
    
    // Fire and forget the server call
    produceAction(formData)
      .then((result) => {
        if (result.success) {
          showToast("Batch produced successfully! Stock updated.", "success");
          setShowProduce(false);
        } else {
          setOptimisticStock(null);
          showToast(result.error || "Production failed.", "error");
        }
      })
      .catch((error: any) => {
        setOptimisticStock(null);
        showToast(error.message || "Production failed.", "error");
      })
      .finally(() => {
        setIsProducing(false);
      });
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
        <tr
          className={`${
            isOutOfStock
              ? "bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border-l-4 border-l-red-500"
              : rowIndex % 2 === 0
              ? "bg-[#ede6dc] hover:bg-[#c5d9dd]"
              : "bg-[#e0d6c9] hover:bg-[#c5d9dd]"
          } transition-colors`}
        >
          <td className="p-4 font-medium text-text" style={{ width: "var(--col-name)" }}>
            {item.name}
            {isOutOfStock && (
              <span className="ml-2 inline-block bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-400 dark:border-red-600">
                Out of Stock
              </span>
            )}
          </td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-sku)" }}>{item.sku ?? "—"}</td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-batchCode)" }}>{item.batchCode}</td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-retailPrice)" }}>
            ${item.retailPrice.toFixed(2)}
          </td>
          <td className="p-4 text-text-secondary text-center" style={{ width: "var(--col-quantityOnHand)" }}>
            {optimisticStock !== null ? optimisticStock : item.quantityOnHand}
          </td>
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
          <td className="p-4">
            <div className="flex flex-col items-center gap-2">
              <a href={`/finished-goods/${item.id}/recipe`} className="text-text-brand hover:underline text-xs font-medium text-center">Recipe</a>
              <button onClick={() => setEditing(true)} className="text-text-brand hover:underline text-xs font-medium text-center">Edit</button>
              <button
                onClick={() => setShowPricing(true)}
                className="text-text-brand hover:underline text-xs font-medium text-center"
                title="Pricing Guidance"
              >
                💰
              </button>
              <button onClick={() => {
                setShowProduce(!showProduce);
                if (!showProduce) {
                  fetch('/api/lots/raw-material-lots')
                    .then(r => {
                      if (!r.ok) throw new Error('Failed to fetch lots');
                      return r.json();
                    })
                    .then(data => setRawMaterialLots(data.lots || []))
                    .catch(() => setRawMaterialLots([]));
                }
              }} className="text-text-brand hover:underline text-xs font-medium text-center">Produce</button>
              <form action={handleDelete} className="flex justify-center">
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-error hover:underline text-xs font-medium text-center">Delete</button>
              </form>
            </div>
          </td>
        </tr>

        {/* Produce row */}
        {showProduce && (
          <tr className="bg-brand-muted dark:bg-brand-muted-dark">
            <td colSpan={9} className="p-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleProduce(formData);
              }} className="flex flex-col gap-3">
                <input type="hidden" name="finishedGoodId" value={item.id} />
                <div className="flex items-center gap-3">
                  <label className="text-text-muted text-xs font-medium uppercase">
                    How many units?
                  </label>
                  <input type="number" name="batchSize" required min="1" placeholder="5" className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
                  <button
                    type="submit"
                    disabled={isProducing}
                    className="bg-[#4f8792] hover:bg-[#426f79] text-white text-xs px-3 py-1 rounded disabled:opacity-50"
                  >
                    {isProducing ? "..." : "Produce"}
                  </button>
                  <button type="button" onClick={() => setShowProduce(false)} className="text-text-muted hover:text-text text-xs">Cancel</button>
                </div>
                {rawMaterialLots.length > 0 && (
                  <div className="text-left">
                    <p className="text-xs font-medium text-text-muted mb-1">Raw Material Lots Used (optional):</p>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {rawMaterialLots.map((lot: any) => (
                        <label key={lot.id} className="flex items-center gap-2 text-xs text-text">
                          <input
                            type="checkbox"
                            name={`lot_${lot.id}`}
                            onChange={(e) => {
                              const next = { ...selectedLots };
                              if (e.target.checked) {
                                next[lot.id] = 0;
                              } else {
                                delete next[lot.id];
                              }
                              setSelectedLots(next);
                            }}
                            className="rounded border-default accent-brand"
                          />
                          {lot.lotNumber} - Qty: {lot.quantity}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
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
      <td className="p-2">
        <div className="flex flex-col items-center gap-2">
          <form action={async (formData: FormData) => {
            formData.append("id", item.id);
            await updateAction(formData);
            setEditing(false);
            showToast("Product updated successfully.", "success");
          }} className="flex justify-center">
            <button type="submit" className="bg-[#4f8792] hover:bg-[#426f79] text-white text-xs px-3 py-1 rounded">Save</button>
          </form>
          <button onClick={() => setEditing(false)} className="text-text-muted hover:text-text text-xs px-2 py-1">Cancel</button>
          <form action={handleDelete} className="flex justify-center">
            <input type="hidden" name="id" value={item.id} />
            <button type="submit" className="text-error hover:underline text-xs font-medium">Delete</button>
          </form>
        </div>
      </td>
    </tr>
  );
}