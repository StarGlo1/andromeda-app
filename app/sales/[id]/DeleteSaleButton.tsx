"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";
import { deleteSaleAction } from "./actions";

export function DeleteSaleButton({ saleId }: { saleId: string }) {
  const { showToast } = useToast();
  const router = useRouter();
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Delete this sale? This will restore inventory.")) return;
    startDeleteTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("id", saleId);
        await deleteSaleAction(formData);
        showToast("Sale deleted successfully! Inventory restored.", "success");
        router.push("/sales");
      } catch (error: any) {
        showToast(error.message || "Failed to delete sale.", "error");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-full transition-colors text-sm disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete Sale"}
    </button>
  );
}
