"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

export function CategoryManager({
  categories,
  addAction,
  updateAction,
  deleteAction,
}: {
  categories: { id: string; name: string; rawMaterials?: { id: string }[] }[];
  addAction: (formData: FormData) => Promise<void>;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAdd = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await addAction(formData);
        showToast("Category added successfully!", "success");
        const input = document.querySelector('input[name="name"]') as HTMLInputElement;
        if (input) input.value = "";
      } catch (error: any) {
        showToast(error.message || "Failed to add category.", "error");
      }
    });
  };

  const handleUpdate = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await updateAction(formData);
        showToast("Category updated successfully!", "success");
        setEditingId(null);
      } catch (error: any) {
        showToast(error.message || "Failed to update category.", "error");
      }
    });
  };

  const handleDelete = async (formData: FormData) => {
    if (!confirm("Delete this category? Materials in this category will NOT be deleted.")) return;
    startTransition(async () => {
      try {
        await deleteAction(formData);
        showToast("Category deleted successfully!", "success");
      } catch (error: any) {
        showToast(error.message || "Failed to delete category.", "error");
      }
    });
  };

  const materialCount = (cat: any) => cat.rawMaterials?.length ?? cat._count?.rawMaterials ?? 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">Categories</h1>
          <p className="text-sm text-text-muted mt-1">
            Organize your raw materials into logical groups.
          </p>
        </div>
      </div>

      {/* Add Category Form */}
      <div className="bg-surface-widget border border-default rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Add New Category</h2>
        <form action={handleAdd} className="flex gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Wax, Fragrance Oils, Wicks..."
            className="flex-1 px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isPending ? "Adding..." : "+ Add"}
          </button>
        </form>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-surface-widget border border-default rounded-xl p-12 text-center text-text-muted">
          No categories yet. Add your first category above.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              className="bg-surface-widget border border-default rounded-xl p-5 hover:border-[#4f8792] transition-colors group"
            >
              {editingId === cat.id ? (
                <form action={handleUpdate} className="space-y-3">
                  <input type="hidden" name="id" value={cat.id} />
                  <input
                    type="text"
                    name="name"
                    defaultValue={cat.name}
                    required
                    className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="bg-[#4f8792] hover:bg-[#426f79] text-white text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-surface border border-default text-text-muted hover:bg-surface-elevated text-xs px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#c5d9dd] flex items-center justify-center text-[#3d5a60] font-bold">
                        {cat.name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="text-base font-semibold text-text group-hover:text-[#4f8792] transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                    <span className="text-xs text-text-muted bg-surface border border-default px-2.5 py-1 rounded-full">
                      {materialCount(cat)} material{materialCount(cat) !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-default">
                    <button
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditName(cat.name);
                      }}
                      className="text-text-brand hover:underline text-xs font-medium"
                    >
                      Edit
                    </button>
                    <form action={handleDelete} className="inline">
                      <input type="hidden" name="id" value={cat.id} />
                      <button
                        type="submit"
                        disabled={isPending}
                        className="text-error hover:underline text-xs font-medium disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}