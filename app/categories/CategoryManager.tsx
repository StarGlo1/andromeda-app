"use client";

import { useState, useTransition } from "react";
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
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

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
        // Reset form input (we'll use a ref later)
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
    showToast(`${selectedIds.size} categories deleted successfully!`, "success");
    setSelectedIds(new Set());
    setShowConfirm(false);
    setSelectMode(false);
  };

  // ... JSX remains the same, but the form action uses handleAdd, etc.
}