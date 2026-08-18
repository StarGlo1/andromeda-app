"use client";

import { useRef, useState, useTransition } from "react";
import { createRawMaterialLot } from "@/app/actions/lotActions";

export default function RawMaterialLotForm({
  rawMaterialId,
}: {
  rawMaterialId: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  return (
    <form
      ref={formRef}
      action={(formData) => {
        startTransition(async () => {
          try {
            await createRawMaterialLot(formData);
            formRef.current?.reset();
            setMessage("Raw material lot created.");
          } catch (error: any) {
            setMessage(error.message);
          }
        });
      }}
      className="space-y-4"
    >
      <input type="hidden" name="rawMaterialId" value={rawMaterialId} />

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Create a new lot every time you receive a delivery. It tracks exactly what arrived so you can trace it later.
      </p>

      {/* Quantity input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Lot Quantity
        </label>
        <input
          type="number"
          name="quantity"
          step="any"
          min="0"
          required
          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white"
          placeholder="e.g. 10"
        />
      </div>

      {/* Centered button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2 rounded-full bg-[#4f8792] hover:bg-[#426f79] text-white disabled:opacity-50 transition-colors shadow-md font-medium text-sm"
        >
          {pending ? "Creating..." : "Create Raw Material Lot"}
        </button>
      </div>

      {message && <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{message}</p>}
    </form>
  );
}
