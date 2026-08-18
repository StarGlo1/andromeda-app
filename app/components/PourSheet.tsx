"use client";

import { useState } from "react";
import { Printer } from "lucide-react";

interface PourSheetProps {
  productName: string;
  batchCode: string;
  recipeItems: {
    id: string;
    name: string;
    requiredQuantity: number;
    unit: string;
    isSubAssembly?: boolean;
  }[];
  batchNotes?: string | null;
  calculatedCogs?: number;
  onClose: () => void;
}

export default function PourSheet({
  productName,
  batchCode,
  recipeItems,
  batchNotes,
  calculatedCogs = 0,
  onClose,
}: PourSheetProps) {
  const [batchSize, setBatchSize] = useState(12);
  const scaleFactor = batchSize / 12; // Base recipe assumed for 12 units

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-slate-700 text-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 no-print">
          <h2 className="text-lg font-semibold">Pour Sheet</h2>

        </div>

        {/* Printable Area */}
        <div className="flex-1 overflow-y-auto p-6 print:overflow-visible">
          <div className="print-area">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold uppercase tracking-widest">{productName}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Batch: {batchCode} | Date: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Batch Size Selector */}
            <div className="mb-6 flex items-center justify-center gap-3 no-print">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Batch Size:</label>
              <input
                type="number"
                min={1}
                value={batchSize}
                onChange={(e) => setBatchSize(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-center text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">units</span>
            </div>

            {/* Materials Table */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3 border-b border-gray-300 dark:border-gray-600 pb-2">
                Materials Required
              </h3>
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <th className="py-3 px-4 font-semibold text-gray-200 text-center">Material</th>
                    <th className="py-3 px-4 font-semibold text-gray-200 text-center">Per Unit</th>
                    <th className="py-3 px-4 font-semibold text-gray-200 text-center">Total Needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {recipeItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-4 font-medium text-gray-100 text-center">
                        {item.name}
                        {item.isSubAssembly && (
                          <span className="ml-2 text-xs bg-gray-600 px-1.5 py-0.5 rounded-full text-gray-300">Sub</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-300">
                        {item.requiredQuantity} {item.unit}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-white">
                        {(item.requiredQuantity * scaleFactor).toFixed(2)} {item.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes Section */}
            {batchNotes && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-300 dark:border-gray-600 pb-2">
                  Instructions / Notes
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{batchNotes}</p>
              </div>
            )}

            {/* Cost Summary */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-300 dark:border-gray-600 pb-2">
                Cost Summary
              </h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Cost per Unit:</span>
                <span className="font-bold">${calculatedCogs.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-400">Total Batch Cost:</span>
                <span className="font-bold">${(calculatedCogs * batchSize).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Print Button */}
        <div className="p-4 border-t border-gray-200 flex gap-3 no-print">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-4 py-2 rounded-full bg-[#4f8792] text-white font-medium hover:bg-[#426f79] transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
