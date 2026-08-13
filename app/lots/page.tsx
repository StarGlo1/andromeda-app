"use client";

import { useState } from "react";
import Link from "next/link";

export default function LotsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    const res = await fetch(`/api/lots/search?q=${encodeURIComponent(trimmed)}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Lot Traceability
      </h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-2xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by lot number, e.g. LOT-20260113-01"
          className="flex-1 px-4 py-2 rounded-xl bg-white dark:bg-black border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black"
        >
          Search
        </button>
      </form>

      {loading && (
        <p className="text-sm text-gray-600 dark:text-gray-300">Searching...</p>
      )}

      <div className="space-y-4">
        {results.map((lot) => (
          <div
            key={lot.id}
            className="p-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
          >
            <div className="flex justify-between items-start">
              <span className="font-semibold text-gray-900 dark:text-white">
                {lot.lotNumber}
              </span>
              <span className="text-xs uppercase text-gray-500 dark:text-gray-400">
                {lot.kind}
              </span>
            </div>

            {lot.rawMaterial && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Raw Material:{" "}
                <Link
                  href={`/raw-materials/${lot.rawMaterial.id}`}
                  className="underline"
                >
                  {lot.rawMaterial.name}
                </Link>
              </p>
            )}

            {lot.finishedGood && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Finished Good:{" "}
                <Link
                  href={`/finished-goods/${lot.finishedGood.id}`}
                  className="underline"
                >
                  {lot.finishedGood.name}
                </Link>
              </p>
            )}

            {lot.rawMaterialLinks?.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Uses raw material lots:
                </p>
                <ul className="ml-5 mt-1 list-disc text-sm text-gray-600 dark:text-gray-300">
                  {lot.rawMaterialLinks.map((link: any) => (
                    <li key={link.id}>
                      {link.rawMaterialLot.lotNumber} —{" "}
                      {link.rawMaterialLot.rawMaterial?.name || "Unknown"} — qty{" "}
                      {link.quantityUsed}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {lot.finishedGoodLinks?.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Used in finished lots:
                </p>
                <ul className="ml-5 mt-1 list-disc text-sm text-gray-600 dark:text-gray-300">
                  {lot.finishedGoodLinks.map((link: any) => (
                    <li key={link.id}>{link.finishedGoodLot.lotNumber}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {!loading && query && results.length === 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No lots found.
          </p>
        )}
      </div>
    </div>
  );
}