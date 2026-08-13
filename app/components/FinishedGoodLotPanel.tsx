"use client";

import { useEffect, useState, useTransition } from "react";
import { createFinishedGoodLot } from "@/app/actions/lotActions";

type RawMaterialLot = {
  id: string;
  lotNumber: string;
  quantity: number | null;
  rawMaterial?: { name: string } | null;
};

type ExistingLot = {
  id: string;
  lotNumber: string;
  createdAt: string;
  rawMaterialLinks: {
    id: string;
    quantityUsed: number;
    rawMaterialLot: {
      lotNumber: string;
      rawMaterial?: { name: string } | null;
    };
  }[];
};

export default function FinishedGoodLotPanel({
  finishedGoodId,
}: {
  finishedGoodId: string;
}) {
  const [rawMaterialLots, setRawMaterialLots] = useState<RawMaterialLot[]>([]);
  const [existingLots, setExistingLots] = useState<ExistingLot[]>([]);
  const [selected, setSelected] = useState<
    { rawMaterialLotId: string; quantityUsed: number }[]
  >([]);
  const [quantity, setQuantity] = useState(0);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [rawRes, lotRes] = await Promise.all([
        fetch("/api/lots/raw-material-lots"),
        fetch(`/api/finished-goods/${finishedGoodId}/lots`),
      ]);

      const rawData = await rawRes.json();
      const lotData = await lotRes.json();

      setRawMaterialLots(rawData.lots || []);
      setExistingLots(lotData.lots || []);
      setLoading(false);
    }

    load();
  }, [finishedGoodId]);

  function addRow() {
    if (!rawMaterialLots.length) return;
    const first = rawMaterialLots[0];
    setSelected((prev) => [
      ...prev,
      { rawMaterialLotId: first.id, quantityUsed: 0 },
    ]);
  }

  function updateRow(index: number, field: string, value: string) {
    setSelected((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]:
                field === "quantityUsed" ? parseFloat(value) || 0 : value,
            }
          : row
      )
    );
  }

  function removeRow(index: number) {
    setSelected((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(formData: FormData) {
    formData.set("finishedGoodId", finishedGoodId);
    formData.set("quantity", String(quantity));
    formData.set("entries", JSON.stringify(selected));

    startTransition(async () => {
      try {
        await createFinishedGoodLot(formData);
        setSelected([]);
        setQuantity(0);
        setMessage("Finished good lot created.");

        const lotRes = await fetch(`/api/finished-goods/${finishedGoodId}/lots`);
        const lotData = await lotRes.json();
        setExistingLots(lotData.lots || []);
      } catch (error: any) {
        setMessage(error.message);
      }
    });
  }

  if (loading) {
    return <div className="text-sm text-gray-600 dark:text-gray-300">Loading lots...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Create Production Lot
        </h3>

        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="finishedGoodId" value={finishedGoodId} />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Quantity Produced
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-black border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white"
              placeholder="e.g. 20"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Raw Material Lots Used
            </p>

            {selected.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No raw material lots added yet.
              </p>
            )}

            <div className="space-y-2">
              {selected.map((row, index) => (
                <div key={index} className="flex flex-wrap gap-2 items-center">
                  <select
                    value={row.rawMaterialLotId}
                    onChange={(e) =>
                      updateRow(index, "rawMaterialLotId", e.target.value)
                    }
                    className="flex-1 min-w-[180px] px-3 py-2 rounded-xl bg-white dark:bg-black border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white"
                  >
                    {rawMaterialLots.map((lot) => (
                      <option key={lot.id} value={lot.id}>
                        {lot.lotNumber} — {lot.rawMaterial?.name || "Unknown"} (qty{" "}
                        {lot.quantity ?? 0})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={row.quantityUsed}
                    onChange={(e) =>
                      updateRow(index, "quantityUsed", e.target.value)
                    }
                    className="w-28 px-3 py-2 rounded-xl bg-white dark:bg-black border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white"
                    placeholder="Qty used"
                  />

                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="px-2 py-1 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addRow}
              className="mt-3 px-3 py-1.5 rounded-lg text-sm border border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              Add Raw Material Lot
            </button>
          </div>

          <button
            type="submit"
            disabled={pending || selected.length === 0}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black disabled:opacity-50"
          >
            {pending ? "Creating..." : "Create Finished Good Lot"}
          </button>
        </form>

        {message && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{message}</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Existing Finished Good Lots
        </h3>

        {existingLots.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No lots yet.</p>
        ) : (
          <ul className="space-y-3">
            {existingLots.map((lot) => (
              <li
                key={lot.id}
                className="p-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {lot.lotNumber}
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  {lot.rawMaterialLinks.map((link) => (
                    <li key={link.id}>
                      {link.rawMaterialLot.lotNumber} —{" "}
                      {link.rawMaterialLot.rawMaterial?.name || "Unknown"} — qty{" "}
                      {link.quantityUsed}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}