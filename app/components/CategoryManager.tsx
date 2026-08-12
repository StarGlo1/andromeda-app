"use client";

import { useState } from "react";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleDeleteSelected = async () => {
    for (const id of Array.from(selectedIds)) {
      const formData = new FormData();
      formData.append("id", id);
      await deleteAction(formData);
    }
    setSelectedIds(new Set());
    setShowConfirm(false);
    setSelectMode(false);
  };

  return (
    <div className="bg-surface-widget border border-default rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <p className="text-text-muted text-sm font-semibold uppercase tracking-wider">
          Categories
        </p>
        <form
          action={async (formData: FormData) => {
            await addAction(formData);
          }}
          className="flex items-center gap-2 flex-1"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="New category name"
            className="px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm w-full max-w-xs"
          />
          <button
            type="submit"
            className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
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
            className="bg-surface border border-default text-text-muted hover:bg-surface-elevated hover:text-text text-sm font-medium px-4 py-2 rounded-lg transition-colors"
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
              className="text-text-muted hover:text-text text-sm font-medium"
            >
              Cancel
            </button>
            {selectedIds.size > 0 && (
              <button
                onClick={() => setShowConfirm(true)}
                className="bg-error hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Delete Selected ({selectedIds.size})
              </button>
            )}
          </div>
        )}
      </div>

      <ul className="space-y-1">
        {selectMode && categories.length > 0 && (
          <li className="flex items-center py-2 px-2 text-text-muted text-sm">
            <input
              type="checkbox"
              checked={selectedIds.size === categories.length}
              onChange={toggleAll}
              className="mr-3 h-4 w-4 rounded border-default bg-bg accent-brand"
            />
            <span className="flex-1">Select all</span>
          </li>
        )}

        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center py-2 px-2 rounded hover:bg-surface-elevated transition-colors"
          >
            {selectMode && (
              <input
                type="checkbox"
                checked={selectedIds.has(cat.id)}
                onChange={() => toggleSelect(cat.id)}
                className="mr-3 h-4 w-4 rounded border-default bg-bg accent-brand"
              />
            )}

            <div className="flex-1">
              {editingId === cat.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="px-2 py-1 bg-bg border border-default rounded text-text text-sm w-full"
                />
              ) : (
                <span className="text-text text-base font-medium">{cat.name}</span>
              )}
            </div>

            {!selectMode && (
              <div className="flex items-center gap-3 ml-3">
                {editingId === cat.id ? (
                  <>
                    <form
                      action={async () => {
                        const formData = new FormData();
                        formData.append("id", cat.id);
                        formData.append("name", editName);
                        await updateAction(formData);
                        setEditingId(null);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-success hover:underline text-sm font-medium"
                      >
                        Save
                      </button>
                    </form>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-text-muted hover:text-text text-sm font-medium"
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
                      className="text-text-brand hover:underline text-sm font-medium"
                    >
                      Edit
                    </button>
                    <form
                      action={async () => {
                        const formData = new FormData();
                        formData.append("id", cat.id);
                        await deleteAction(formData);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-error hover:underline text-sm font-medium"
                      >
                        Delete
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-surface-widget border border-default rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-text mb-2">Delete categories?</h3>
            <p className="text-text-muted text-sm mb-6">
              Are you sure you want to delete {selectedIds.size} selected categor{selectedIds.size === 1 ? "y" : "ies"}?
              This will fail if any category is currently used by raw materials.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-surface border border-default text-text hover:bg-surface-elevated text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                No, keep them
              </button>
              <button
                onClick={handleDeleteSelected}
                className="bg-error hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}