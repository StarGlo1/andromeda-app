"use client";

import { useState, useId } from "react";
import { convertToPricingUnit } from "@/app/lib/units";

export function RecipeRow({
  item,
  finishedGoodId,
  updateAction,
  deleteAction,
}: {
  item: any;
  finishedGoodId: string;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const formId = useId();

  const isSubAssembly = !!item.subAssemblyId;
  const ingredientName = isSubAssembly
    ? item.subAssembly?.name || "Unknown Sub‑Assembly"
    : item.rawMaterial?.name || "Unknown Material";

  const convertedQty = convertToPricingUnit(
    item.requiredQuantity,
    item.unit,
    isSubAssembly ? "unit" : item.rawMaterial?.unit
  );
  const unitCost = isSubAssembly
    ? item.subAssembly?.calculatedCogs ?? 0
    : item.rawMaterial?.costPerUnit ?? 0;
  const lineTotal = convertedQty * unitCost;

  const displayUnit = item.unit === "1" ? "each" : item.unit;

  if (!editing) {
    return (
      <tr className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
        <td className="p-4 font-medium text-text">
          {ingredientName}
          {isSubAssembly && (
            <span className="ml-2 text-xs bg-brand-muted dark:bg-brand-muted-dark text-text-brand px-1.5 py-0.5 rounded-full">
              Sub
            </span>
          )}
        </td>
        <td className="p-4 text-text-secondary text-center">{item.requiredQuantity}</td>
        <td className="p-4 text-text-secondary text-center">{displayUnit}</td>
        <td className="p-4 text-text-secondary text-center">
          {unitCost != null ? `$${unitCost.toFixed(2)} / ${isSubAssembly ? "unit" : item.rawMaterial?.unit || displayUnit}` : "—"}
        </td>
        <td className="p-4 text-warning font-medium text-center">
          ${lineTotal.toFixed(2)}
        </td>
        <td className="p-4 flex gap-2 justify-center">
          <button onClick={() => setEditing(true)} className="text-text-brand hover:underline text-xs font-medium">
            Edit
          </button>
          <form
            action={async (formData: FormData) => {
              if (!confirm("Delete this ingredient?")) return;
              formData.append("id", item.id);
              formData.append("finishedGoodId", finishedGoodId);
              await deleteAction(formData);
            }}
          >
            <button type="submit" className="text-error hover:underline text-xs font-medium ml-2">
              Delete
            </button>
          </form>
        </td>
      </tr>
    );
  }

  // Edit mode
  return (
    <tr className="bg-brand-muted dark:bg-brand-muted-dark">
      <td className="p-2 font-medium text-text">
        {ingredientName}
        {isSubAssembly && (
          <span className="ml-2 text-xs bg-brand-muted dark:bg-brand-muted-dark text-text-brand px-1.5 py-0.5 rounded-full">
            Sub
          </span>
        )}
      </td>
      <td className="p-2">
        <input
          type="number"
          name="requiredQuantity"
          defaultValue={item.requiredQuantity}
          step="any"
          form={formId}
          className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        />
      </td>
      <td className="p-2">
        <input
          type="text"
          name="unit"
          defaultValue={item.unit}
          form={formId}
          className="w-16 px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        />
      </td>
      <td className="p-2 text-text-muted text-xs text-center">(auto)</td>
      <td className="p-2 text-warning text-xs text-center">(auto)</td>
      <td className="p-2 flex gap-2 justify-center">
        <form
          id={formId}
          action={async (formData: FormData) => {
            formData.append("id", item.id);
            formData.append("finishedGoodId", finishedGoodId);
            await updateAction(formData);
            setEditing(false);
          }}
        >
          <button type="submit" className="bg-brand hover:bg-brand-hover text-white text-xs px-3 py-1 rounded">
            Save
          </button>
        </form>
        <button onClick={() => setEditing(false)} className="text-text-muted hover:text-text text-xs px-2 py-1">
          Cancel
        </button>
        <form
          action={async (formData: FormData) => {
            if (!confirm("Delete this ingredient?")) return;
            formData.append("id", item.id);
            formData.append("finishedGoodId", finishedGoodId);
            await deleteAction(formData);
          }}
        >
          <button type="submit" className="text-error hover:underline text-xs font-medium ml-2">
            Delete
          </button>
        </form>
      </td>
    </tr>
  );
}