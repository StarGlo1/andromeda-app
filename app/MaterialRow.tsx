"use client";

import { useState, useId, useTransition } from "react";

export function MaterialRow({
  item,
  categories,
  suppliers,
  updateAction,
  deleteAction,
  addCategoryAction,
  addSupplierAction,
  rowIndex = 0,
}: {
  item: any;
  categories: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  addCategoryAction: (formData: FormData) => Promise<void>;
  addSupplierAction: (formData: FormData) => Promise<void>;
  rowIndex?: number;
}) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formId = useId();

  const isLowStock =
    item.reorderThreshold !== null &&
    (item.totalQuantity ?? 0) <= item.reorderThreshold;

  const availableStock =
    (item.totalQuantity ?? 0) -
    (item.committedQuantity ?? 0) +
    (item.onOrderQuantity ?? 0);

  const handleUpdate = async (formData: FormData) => {
    formData.append("id", item.id);
    startTransition(async () => {
      try {
        await updateAction(formData);
        setEditing(false);
      } catch (error: any) {
        console.error("Failed to update material:", error);
      }
    });
  };

  const handleDelete = async (formData: FormData) => {
    if (!confirm("Delete this material permanently?")) return;
    formData.append("id", item.id);
    startTransition(async () => {
      try {
        await deleteAction(formData);
      } catch (error: any) {
        console.error("Failed to delete material:", error);
      }
    });
  };

  if (!editing) {
    return (
      <tr
        className={`${
          rowIndex % 2 === 0
            ? "bg-[#ede6dc] hover:bg-[#c5d9dd]"
            : "bg-[#e0d6c9] hover:bg-[#c5d9dd]"
        } transition-colors`}
      >
        {/* Name */}
        <td className="p-4 font-medium text-text">
          <a href={`/materials/${item.id}`} className="hover:underline">
            {item.name}
          </a>
        </td>

        {/* Category */}
        <td className="p-4 text-center">
          <span className="inline-block bg-brand-muted dark:bg-brand-muted-dark text-text-brand dark:text-text-brand-dark text-xs px-2.5 py-1 rounded-full border border-default">
            {item.category.name}
          </span>
        </td>

        {/* Containers */}
        <td className={`p-4 text-center ${isLowStock ? 'text-warning font-medium' : 'text-text-secondary'}`}>
          {item.quantity ?? 0}
          <a href={`/materials/${item.id}`} className="ml-1 text-text-muted hover:text-text text-xs" title="View details">ⓘ</a>
        </td>

        {/* Size per container */}
        <td className="p-4 text-text-secondary text-center">
          {item.sizePerUnit ?? "—"}
        </td>

        {/* Unit */}
        <td className="p-4 text-text-secondary text-center">
          {item.unit ?? "—"}
        </td>

        {/* Total Stock */}
        <td className="p-4 text-center">
          <div className="flex flex-col items-center">
            <span className={`font-medium ${availableStock < 0 ? 'text-error' : 'text-text'}`}>
              {item.totalQuantity ?? 0} {item.unit}
            </span>
            <span className="text-xs text-text-muted">
              = {item.quantity ?? 0} × {item.sizePerUnit ?? 0} {item.unit}
            </span>
            {item.onOrderQuantity > 0 && (
              <span className="text-blue-500 text-xs">
                +{item.onOrderQuantity} incoming
              </span>
            )}
            {item.committedQuantity > 0 && (
              <span className="text-red-500 text-xs">
                -{item.committedQuantity} committed
              </span>
            )}
          </div>
        </td>

        {/* Unit Cost */}
        <td className="p-4 text-text-secondary text-center">
          {item.costPerUnit != null
            ? `$${item.costPerUnit.toFixed(2)} / ${item.unit ?? "unit"}`
            : "—"}
        </td>

        {/* Supplier */}
        <td className="p-4 text-text-secondary text-center">
          {item.supplier?.name || "—"}
        </td>

        {/* Reorder Threshold */}
        <td className={`p-4 text-center ${isLowStock ? 'text-warning' : 'text-text-secondary'}`}>
          {item.reorderThreshold ?? "—"}
        </td>

        {/* Actions — STACKED: Edit on top of Delete */}
        <td className="p-3">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-text-brand hover:underline text-xs font-medium"
            >
              Edit
            </button>
            <form action={handleDelete}>
              <button type="submit" disabled={isPending} className="text-error hover:underline text-xs font-medium disabled:opacity-50">
                Delete
              </button>
            </form>
          </div>
        </td>
      </tr>
    );
  }

  // Edit mode — Actions STACKED: Save, Cancel, Delete
  return (
    <tr className="bg-brand-muted dark:bg-brand-muted-dark">
      {/* Name */}
      <td className="p-2">
        <input
          type="text"
          name="name"
          defaultValue={item.name}
          required
          form={formId}
          className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        />
      </td>

      {/* Category */}
      <td className="p-2">
        <select
          name="categoryId"
          defaultValue={item.categoryId}
          form={formId}
          className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </td>

      {/* Containers */}
      <td className="p-2">
        <input
          type="number"
          name="quantity"
          defaultValue={item.quantity ?? ""}
          placeholder="0"
          step="any"
          form={formId}
          className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        />
      </td>

      {/* Size per container */}
      <td className="p-2">
        <input
          type="number"
          name="sizePerUnit"
          defaultValue={item.sizePerUnit ?? ""}
          placeholder="0"
          step="any"
          form={formId}
          className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        />
      </td>

      {/* Unit */}
      <td className="p-2">
        <input
          type="text"
          name="unit"
          defaultValue={item.unit ?? ""}
          placeholder="unit"
          form={formId}
          className="w-16 px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        />
      </td>

      {/* Stock — read-only */}
      <td className="p-2 text-center text-xs text-text-muted">
        {availableStock} {item.unit}
      </td>

      {/* Unit Cost */}
      <td className="p-2">
        <input
          type="number"
          name="purchaseTotal"
          defaultValue={(item.costPerUnit && item.totalQuantity) ? (item.costPerUnit * item.totalQuantity).toFixed(2) : ""}
          step="any"
          form={formId}
          className="w-24 px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        />
      </td>

      {/* Supplier */}
      <td className="p-2">
        <select
          name="supplierId"
          defaultValue={item.supplierId ?? ""}
          form={formId}
          className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        >
          <option value="">None</option>
          {suppliers.map((sup) => (
            <option key={sup.id} value={sup.id}>{sup.name}</option>
          ))}
        </select>
      </td>

      {/* Reorder Threshold */}
      <td className="p-2">
        <input
          type="number"
          name="reorderThreshold"
          defaultValue={item.reorderThreshold ?? ""}
          placeholder="0"
          step="any"
          form={formId}
          className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm"
        />
      </td>

      {/* Actions — STACKED: Save, Cancel, Delete */}
      <td className="p-2">
        <div className="flex flex-col items-center gap-2">
          <form id={formId} action={handleUpdate}>
            <input type="hidden" name="committedQuantity" value={item.committedQuantity ?? 0} />
            <input type="hidden" name="onOrderQuantity" value={item.onOrderQuantity ?? 0} />
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#4f8792] hover:bg-[#426f79] text-white text-xs px-3 py-1 rounded-full disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
          >
            Cancel
          </button>
          <form action={handleDelete}>
            <button
              type="submit"
              disabled={isPending}
              className="text-error hover:underline text-xs font-medium disabled:opacity-50"
            >
              Delete
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}