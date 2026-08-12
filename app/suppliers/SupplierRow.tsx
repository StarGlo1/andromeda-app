"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

export function SupplierRow({
  supplier,
  updateAction,
  deleteAction,
}: {
  supplier: any;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();

  const handleDelete = (formData: FormData) => {
    if (!confirm("Delete this supplier?")) return;
    startDeleteTransition(async () => {
      try {
        await deleteAction(formData);
        showToast("Supplier deleted successfully!", "success");
      } catch (error: any) {
        showToast(error.message || "Failed to delete supplier.", "error");
      }
    });
  };

  const handleUpdate = (formData: FormData) => {
    startUpdateTransition(async () => {
      try {
        await updateAction(formData);
        showToast("Supplier updated successfully!", "success");
        setEditing(false);
      } catch (error: any) {
        showToast(error.message || "Failed to update supplier.", "error");
      }
    });
  };

  if (!editing) {
    return (
      <tr className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
        <td className="p-4 font-medium text-text text-center">{supplier.name}</td>
        <td className="p-4 text-text-secondary text-center">{supplier.contact || "—"}</td>
        <td className="p-4 text-text-secondary text-center">
          {supplier.website ? (
            <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-text-brand hover:underline">
              {supplier.website.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            "—"
          )}
        </td>
        <td className="p-4 text-text-secondary text-center">{supplier.notes || "—"}</td>
        <td className="p-4 flex gap-2 justify-center">
          <button onClick={() => setEditing(true)} className="text-text-brand hover:underline text-xs font-medium">Edit</button>
          <form action={handleDelete}>
            <input type="hidden" name="id" value={supplier.id} />
            <button type="submit" disabled={isDeleting} className="text-error hover:underline text-xs font-medium ml-3 disabled:opacity-50">
              {isDeleting ? "..." : "Delete"}
            </button>
          </form>
        </td>
      </tr>
    );
  }

  // Edit mode
  return (
    <tr className="bg-brand-muted dark:bg-brand-muted-dark">
      <td className="p-2">
        <input type="text" name="name" defaultValue={supplier.name} required form={`edit-${supplier.id}`} className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm text-center" />
      </td>
      <td className="p-2">
        <input type="text" name="contact" defaultValue={supplier.contact || ""} form={`edit-${supplier.id}`} className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm text-center" />
      </td>
      <td className="p-2">
        <input type="url" name="website" defaultValue={supplier.website || ""} form={`edit-${supplier.id}`} className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm text-center" />
      </td>
      <td className="p-2">
        <input type="text" name="notes" defaultValue={supplier.notes || ""} form={`edit-${supplier.id}`} className="w-full px-2 py-1 bg-bg border border-default rounded text-text text-sm text-center" />
      </td>
      <td className="p-2 flex gap-2 justify-center">
        <form id={`edit-${supplier.id}`} action={handleUpdate}>
          <input type="hidden" name="id" value={supplier.id} />
          <button type="submit" disabled={isUpdating} className="bg-brand hover:bg-brand-hover text-white text-xs px-3 py-1 rounded disabled:opacity-50">
            {isUpdating ? "..." : "Save"}
          </button>
        </form>
        <button onClick={() => setEditing(false)} className="text-text-muted hover:text-text text-xs px-2 py-1">Cancel</button>
        <form action={handleDelete}>
          <input type="hidden" name="id" value={supplier.id} />
          <button type="submit" disabled={isDeleting} className="text-error hover:underline text-xs font-medium ml-2 disabled:opacity-50">
            {isDeleting ? "..." : "Delete"}
          </button>
        </form>
      </td>
    </tr>
  );
}