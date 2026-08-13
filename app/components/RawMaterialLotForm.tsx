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
      className="space-y-3"
    >
      <input type="hidden" name="rawMaterialId" value={rawMaterialId} />

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

      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black disabled:opacity-50"
      >
        {pending ? "Creating..." : "Create Raw Material Lot"}
      </button>

      {message && <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>}
    </form>
  );
}