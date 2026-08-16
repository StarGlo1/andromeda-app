"use client";

import { useState, useEffect, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

export function CategoryManager({
  categories,
  addAction,
  updateAction,
  deleteAction,
}: {
  categories: { id: string; name: string }[];
  addAction: (formData: FormData) => Promise<void>;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBatchConfirm, setShowBatchConfirm] = useState(false);
  const [showSingleConfirm, setShowSingleConfirm] = useState<string | null>(null);
  const [skipSingleConfirm, setSkipSingleConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Load "don't ask again" preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("skipSingleDeleteConfirm");
      if (saved === "true") setSkipSingleConfirm(true);
    } catch {}
  }, []);

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === categories.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(categories.map((c) => c.id)));
    }
  };

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

  const handleDeleteSelected = async () => {
    for (const id of Array.from(selectedIds)) {
      const formData = new FormData();
      formData.append("id", id);
      try {
        await deleteAction(formData);
      } catch (error: any) {
        showToast(`Failed to delete category ${id}: ${error.message}`, "error");
        return;
      }
    }
    showToast(`${selectedIds.size} categor${selectedIds.size === 1 ? "y" : "ies"} deleted successfully!`, "success");
    setSelectedIds(new Set());
    setShowBatchConfirm(false);
    setSelectMode(false);
  };

  const handleSingleDeleteRequest = (id: string) => {
    if (skipSingleConfirm) {
      performSingleDelete(id);
    } else {
      setShowSingleConfirm(id);
    }
  };

  const performSingleDelete = async (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    try {
      await deleteAction(formData);
      showToast("Category deleted successfully!", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to delete category.", "error");
    }
  };

  const handleSingleDeleteConfirm = async (id: string) => {
    await performSingleDelete(id);
    setShowSingleConfirm(null);
  };

  const handleDontAskAgain = (checked: boolean) => {
    setSkipSingleConfirm(checked);
    try {
      localStorage.setItem("skipSingleDeleteConfirm", String(checked));
    } catch {}
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">
          Categories
        </p>
        <form action={handleAdd} className="flex items-center gap-2 flex-1">
          <input
            type="text"
            name="name"
            required
            placeholder="New category name"
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            Add
          </button>
        </form>

        {!selectMode ? (
          <button
            onClick={() => {
              setSelectMode(true);
              setSelectedIds(new Set());
            }}
            className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Select
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectMode(false);
                setSelectedIds(new Set());
              }}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium"
            >
              Cancel
            </button>
            {selectedIds.size > 0 && (
              <button
                onClick={() => setShowBatchConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Delete Selected ({selectedIds.size})
              </button>
            )}
          </div>
        )}
      </div>

      <ul className="space-y-1">
        {selectMode && categories.length > 0 && (
          <li className="flex items-center py-2 px-2 text-gray-500 dark:text-gray-400 text-sm">
            <input
              type="checkbox"
              checked={selectedIds.size === categories.length}
              onChange={toggleAll}
              className="mr-3 h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 accent-teal-600"
            />
            <span className="flex-1">Select all</span>
          </li>
        )}

        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {selectMode && (
              <input
                type="checkbox"
                checked={selectedIds.has(cat.id)}
                onChange={() => toggleSelect(cat.id)}
                className="mr-3 h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 accent-teal-600"
              />
            )}

            <div className="flex-1">
              {editingId === cat.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-gray-900 dark:text-gray-100 text-sm w-full"
                />
              ) : (
                <span className="text-gray-900 dark:text-gray-100 text-base font-medium">{cat.name}</span>
              )}
            </div>

            {!selectMode && (
              <div className="flex items-center gap-3 ml-3">
                {editingId === cat.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        const formData = new FormData();
                        formData.append("id", cat.id);
                        formData.append("name", editName);
                        handleUpdate(formData);
                      }}
                      className="text-teal-600 dark:text-teal-400 hover:underline text-sm font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditName(cat.name);
                      }}
                      className="text-teal-600 dark:text-teal-400 hover:underline text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSingleDeleteRequest(cat.id)}
                      className="text-red-600 dark:text-red-400 hover:underline text-sm font-medium"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Batch delete confirmation modal */}
      {showBatchConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Delete categories?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Are you sure you want to delete {selectedIds.size} selected categor{selectedIds.size === 1 ? "y" : "ies"}?
              This will fail if any category is currently used by raw materials.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowBatchConfirm(false)}
                className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single delete confirmation modal */}
      {showSingleConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Delete category?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            <label className="flex items-center gap-2 mb-6 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={skipSingleConfirm}
                onChange={(e) => handleDontAskAgain(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 accent-teal-600"
              />
              Don't ask me again
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSingleConfirm(null)}
                className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSingleDeleteConfirm(showSingleConfirm)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}