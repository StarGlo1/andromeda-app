"use client";

import { useState, useId } from "react";

export function MaterialRow({
  item,
  categories,
  suppliers,
  updateAction,
  deleteAction,
  addCategoryAction,
  addSupplierAction,
}: {
  item: any;
  categories: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  addCategoryAction: (formData: FormData) => Promise<void>;
  addSupplierAction: (formData: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const formId = useId();

  const isLowStock =
    item.reorderThreshold !== null &&
    (item.totalQuantity ?? 0) <= item.reorderThreshold;

  if (!editing) {
    return (
      <tr className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
        <td className="p-4 font-medium">
          <a href={`/materials/${item.id}`} className="text-text hover:underline">
            {item.name}
          </a>
        </td>
        <td className="p-4 text-center">
          <span className="inline-block bg-brand-muted dark:bg-brand-muted-dark text-text-brand dark:text-text-brand-dark text-xs px-2.5 py-1 rounded-full border border-default">
            {item.category.name}
          </span>
        </td>
        <td className="p-4 text-text-secondary text-center">{item.supplier?.name || "—"}</td>
        <td className={`p-4 text-center ${isLowStock ? 'text-warning font-medium' : 'text-text-secondary'}`}>
          {item.totalQuantity ?? 0}
          <a href={`/materials/${item.id}`} className="ml-1 text-text-muted hover:text-text text-xs" title="View details">ⓘ</a>
        </td>
        <td className="p-4 text-text-secondary text-center">{item.unit ?? "—"}</td>
        <td className="p-4 text-text-secondary text-center">
          {item.costPerUnit != null
            ? `$${item.costPerUnit.toFixed(2)} / ${item.unit ?? "unit"}`
            : "—"}
        </td>
        <td className={`p-4 text-center ${isLowStock ? 'text-warning' : 'text-text-secondary'}`}>
          {item.reorderThreshold ?? "—"}
        </td>
        <td className="p-4 flex gap-2 justify-center">
          <button onClick={() => setEditing(true)} className="text-text-brand hover:underline text-xs font-medium">Edit</button>
          <form action={async (formData: FormData) => {
            if (!confirm("Delete this material permanently?")) return;
            formData.append("id", item.id);
            await deleteAction(formData);
          }}>
            <button type="submit" className="text-error hover:underline text-xs font-medium ml-3">Delete</button>
          </form>
        </td>
      </tr>
    );
  }

  // Edit mode unchanged – you can add committed/onOrder inputs later if needed, but the detail page covers deep edits
  return (
    <tr className="bg-brand-muted dark:bg-brand-muted-dark">
      <td className="p-2"><input type="text" name="name" defaultValue={item.name} required form={formId} className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm" /></td>
      <td className="p-2">
        <select name="categoryId" defaultValue={item.categoryId} form={formId} className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm">
          {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </td>
      <td className="p-2">
        <select name="supplierId" defaultValue={item.supplierId ?? ""} form={formId} className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm">
          <option value="">None</option>
          {suppliers.map((sup) => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
        </select>
      </td>
      <td className="p-2"><input type="number" name="totalQuantity" defaultValue={item.totalQuantity ?? 0} form={formId} className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" /></td>
      <td className="p-2"><input type="text" name="unit" defaultValue={item.unit ?? ""} placeholder="unit" form={formId} className="w-16 px-2 py-1 bg-bg border border-default rounded text-text text-sm" /></td>
      <td className="p-2"><input type="number" name="costPerUnit" defaultValue={item.costPerUnit ?? 0} step="any" form={formId} className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" /></td>
      <td className="p-2"><input type="number" name="reorderThreshold" defaultValue={item.reorderThreshold ?? ""} form={formId} className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" /></td>
      <td className="p-2 flex gap-2 justify-center">
        <form id={formId} action={async (formData: FormData) => { formData.append("id", item.id); await updateAction(formData); setEditing(false); }}>
          <button type="submit" className="bg-brand hover:bg-brand-hover text-white text-xs px-3 py-1 rounded">Save</button>
        </form>
        <button onClick={() => setEditing(false)} className="text-text-muted hover:text-text text-xs px-2 py-1">Cancel</button>
        <form action={async (formData: FormData) => { if (!confirm("Delete this material permanently?")) return; formData.append("id", item.id); await deleteAction(formData); }}>
          <button type="submit" className="text-error hover:underline text-xs font-medium ml-2">Delete</button>
        </form>
      </td>
    </tr>
  );
}