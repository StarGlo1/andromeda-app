"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";
import { Pencil, Check, X } from "lucide-react";

const REASONS = ["Testing", "Gifted", "Loss", "Damage", "Restock", "Correction"];

interface AdjustmentRowProps {
  adjustment: {
    id: string;
    quantity: number;
    reason: string;
    createdAt: Date;
    material: {
      id: string;
      name: string;
      unit: string | null;
    };
  };
  materials: { id: string; name: string; unit: string | null }[];
  updateAdjustmentAction: (formData: FormData) => Promise<void>;
  index: number;
}

export function AdjustmentRow({
  adjustment,
  materials,
  updateAdjustmentAction,
  index,
}: AdjustmentRowProps) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [editMaterialId, setEditMaterialId] = useState(adjustment.material.id);
  const [editQuantity, setEditQuantity] = useState(String(adjustment.quantity));
  const [editReason, setEditReason] = useState(adjustment.reason);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("id", adjustment.id);
    formData.append("materialId", editMaterialId);
    formData.append("quantity", editQuantity);
    formData.append("reason", editReason);

    startTransition(async () => {
      try {
        await updateAdjustmentAction(formData);
        showToast("Adjustment updated!", "success");
        setIsEditing(false);
      } catch (error: any) {
        showToast(error.message || "Failed to update.", "error");
      }
    });
  };

  const rowBg = index % 2 === 0 ? "bg-[#ede6dc]" : "bg-[#e0d6c9]";

  if (isEditing) {
    return (
      <tr className={`${rowBg} transition-colors`}>
        <td className="p-4 text-center">
          <select
            value={editMaterialId}
            onChange={(e) => setEditMaterialId(e.target.value)}
            className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text text-sm text-center"
          >
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </td>
        <td className="p-4 text-center">
          <input
            type="number"
            step="any"
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text text-sm text-center"
          />
        </td>
        <td className="p-4 text-center">
          <select
            value={editReason}
            onChange={(e) => setEditReason(e.target.value)}
            className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text text-sm text-center"
          >
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </td>
        <td className="p-4 text-text-muted text-xs text-center">
          {new Date(adjustment.createdAt).toLocaleDateString()}
        </td>
        <td className="p-4 text-text-muted text-xs text-center">
          {new Date(adjustment.createdAt).toLocaleTimeString()}
        </td>
        <td className="p-4">
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="p-2 bg-[#4f8792] hover:bg-[#426f79] text-white rounded-full transition-colors disabled:opacity-50"
              title="Save"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className={`${rowBg} hover:bg-[#c5d9dd] transition-colors group`}>
      <td className="p-4 font-medium text-text text-center">{adjustment.material.name}</td>
      <td className={`p-4 text-center ${adjustment.quantity >= 0 ? "text-success" : "text-error"}`}>
        {adjustment.quantity > 0 ? "+" : ""}
        {adjustment.quantity} {adjustment.material.unit}
      </td>
      <td className="p-4 text-text-secondary text-center">{adjustment.reason}</td>
      <td className="p-4 text-text-muted text-xs text-center">
        {new Date(adjustment.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 text-text-muted text-xs text-center">
        {new Date(adjustment.createdAt).toLocaleTimeString()}
      </td>
      <td className="p-4">
        <div className="flex justify-center">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-black dark:text-white hover:bg-[#c5d9dd] rounded-full transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}