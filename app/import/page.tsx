// app/import/page.tsx

"use client";

import { useState } from "react";
import Papa from "papaparse";
import {
  importRawMaterials,
  importFinishedGoods,
  importRecipeItems,
} from "./actions";

type ImportType = "rawMaterials" | "finishedGoods" | "recipeItems";
const importActions: Record<ImportType, (data: any[]) => Promise<{ created: number; skipped: number }>> = {
  rawMaterials: importRawMaterials,
  finishedGoods: importFinishedGoods,
  recipeItems: importRecipeItems,
};

export default function ImportPage() {
  const [importType, setImportType] = useState<ImportType>("rawMaterials");
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setMessage(`CSV parse error: ${results.errors[0].message}`);
          setCsvData(null);
        } else {
          setHeaders(results.meta.fields || []);
          setCsvData(results.data);
          setMessage(null);
        }
      },
      error: (err) => {
        setMessage(`CSV parse error: ${err.message}`);
        setCsvData(null);
      },
    });
  };

  const handleImport = async () => {
    if (!csvData || csvData.length === 0) {
      setMessage("No data to import.");
      return;
    }
    setIsLoading(true);
    setMessage(null);
    try {
      const result = await importActions[importType](csvData);
      setMessage(
        `Import complete: ${result.created} created, ${result.skipped} skipped (duplicates or missing data).`
      );
      setCsvData(null);
      setHeaders([]);
      setFileName(null);
    } catch (error: any) {
      setMessage(`Import failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold tracking-tight text-text mt-3">Import / Export</h1>
      <div className="bg-surface-widget border border-default rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Upload CSV
          </h2>
          <div className="flex items-center gap-3">
            <label htmlFor="import-type" className="text-xs text-text-muted">
              Import as
            </label>
            <select
              id="import-type"
              value={importType}
              onChange={(e) => {
                setImportType(e.target.value as ImportType);
                setCsvData(null);
                setHeaders([]);
                setFileName(null);
                setMessage(null);
              }}
              className="px-3 py-1.5 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="rawMaterials">Raw Materials</option>
              <option value="finishedGoods">Finished Goods</option>
              <option value="recipeItems">Recipe Items</option>
            </select>
          </div>
        </div>
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-default rounded-xl cursor-pointer hover:border-text-muted transition-colors">
          <span className="text-3xl">📂</span>
          <span className="text-sm text-text font-medium">
            {fileName ? fileName : "Click to choose a CSV file"}
          </span>
          <span className="text-xs text-text-muted">
            {fileName ? "File loaded – choose another" : "CSV files only"}
          </span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFile}
            className="hidden"
          />
        </label>
        {csvData && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-text-muted text-sm font-medium">
                Preview ({csvData.length} rows)
              </p>
              <button
                onClick={handleImport}
                disabled={isLoading}
                className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? "Importing…" : "Import Now"}
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-default">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-muted dark:bg-brand-muted-dark text-text-muted text-xs uppercase tracking-wider">
                    {headers.map((h) => (
                      <th key={h} className="p-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-default text-sm">
                  {csvData.slice(0, 10).map((row, idx) => (
                    <tr key={idx} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                      {headers.map((h) => (
                        <td key={h} className="p-3 text-text whitespace-nowrap">
                          {row[h] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {csvData.length > 10 && (
              <p className="text-text-muted text-xs mt-2">
                Showing first 10 rows of {csvData.length} total.
              </p>
            )}
          </div>
        )}
      </div>
      {message && (
        <div className="bg-brand-muted dark:bg-brand-muted-dark border border-default rounded-xl p-4">
          <p className="text-sm text-text">{message}</p>
        </div>
      )}
      <section className="bg-surface-widget border border-default rounded-xl p-5 text-xs text-text-muted">
        <p className="font-semibold mb-2 text-text">Supported columns</p>
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Raw Materials:</strong> Name, Category, Quantity, Unit, Cost, Reorder Threshold</li>
          <li><strong>Finished Goods:</strong> Name, SKU, Batch Code, Retail Price, Qty on Hand</li>
          <li><strong>Recipe Items:</strong> Finished Good, Raw Material, Quantity, Unit</li>
        </ul>
        <p className="mt-3 italic">Columns are case‑insensitive. Extra columns are ignored.</p>
      </section>
    </div>
  );
}