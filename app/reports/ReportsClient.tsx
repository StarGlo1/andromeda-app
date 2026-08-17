"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";

interface ReportsClientProps {
  data: {
    totalRevenue: number;
    totalCogs: number;
    grossProfit: number;
    grossMargin: number;
    inventoryValue: number;
    materialValue: number;
    subAssemblyValue: number;
    finishedGoodValue: number;
    productProfitability: { name: string; revenue: number; cogs: number; profit: number; margin: number }[];
  };
  cogsScheduleC: number;
  startDate?: string;
  endDate?: string;
}

export default function ReportsClient({ data, cogsScheduleC, startDate, endDate }: ReportsClientProps) {
  const { showToast } = useToast();
  const router = useRouter();
  const [start, setStart] = useState(startDate || "");
  const [end, setEnd] = useState(endDate || "");
  const [exporting, setExporting] = useState(false);

  const applyDateFilter = () => {
    const params = new URLSearchParams();
    if (start) params.set("start", start);
    if (end) params.set("end", end);
    router.push(`/reports?${params.toString()}`);
  };

  const clearDateFilter = () => {
    setStart("");
    setEnd("");
    router.push("/reports");
  };

  const exportCSV = () => {
    setExporting(true);
    try {
      // Build CSV rows
      const rows = [
        ["Metric", "Value"],
        ["Total Revenue", `$${data.totalRevenue.toFixed(2)}`],
        ["Total COGS (sales)", `$${data.totalCogs.toFixed(2)}`],
        ["Gross Profit", `$${data.grossProfit.toFixed(2)}`],
        ["Gross Margin", `${data.grossMargin.toFixed(2)}%`],
        ["Inventory Value", `$${data.inventoryValue.toFixed(2)}`],
        ["Raw Materials", `$${data.materialValue.toFixed(2)}`],
        ["Sub-Assemblies", `$${data.subAssemblyValue.toFixed(2)}`],
        ["Finished Goods", `$${data.finishedGoodValue.toFixed(2)}`],
        ["Schedule C COGS", `$${cogsScheduleC.toFixed(2)}`],
        [],
        ["Product", "Revenue", "COGS", "Profit", "Margin %"],
      ];
      for (const p of data.productProfitability) {
        rows.push([p.name, p.revenue.toFixed(2), p.cogs.toFixed(2), p.profit.toFixed(2), p.margin.toFixed(2)]);
      }
      const csv = rows.map(row => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Report exported successfully!", "success");
    } catch (error) {
      showToast("Failed to export report.", "error");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Date filter */}
      <div className="bg-surface-widget border border-default rounded-xl p-4 flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">Start Date</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
          />
        </div>
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">End Date</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
          />
        </div>
        <button
          onClick={applyDateFilter}
          className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Apply Filter
        </button>
        <button
          onClick={clearDateFilter}
          className="bg-surface border border-default text-text-secondary hover:bg-surface-elevated text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Clear
        </button>
        <button
          onClick={exportCSV}
          disabled={exporting}
          className="bg-success hover:bg-success-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ml-auto"
        >
          {exporting ? "Exporting..." : "📥 Export CSV"}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total Revenue</p>
          <p className="text-3xl font-bold mt-2 text-text-brand">${data.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total COGS</p>
          <p className="text-3xl font-bold mt-2 text-warning">${data.totalCogs.toFixed(2)}</p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Gross Profit</p>
          <p className={`text-3xl font-bold mt-2 ${data.grossProfit >= 0 ? "text-success" : "text-error"}`}>
            ${data.grossProfit.toFixed(2)}
          </p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Gross Margin</p>
          <p className="text-3xl font-bold mt-2 text-text-brand">{data.grossMargin.toFixed(2)}%</p>
        </div>
      </div>

      {/* Inventory Valuation */}
      <div className="bg-surface-widget border border-default rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Inventory Valuation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider">Total Inventory</p>
            <p className="text-xl font-bold text-text">${data.inventoryValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider">Raw Materials</p>
            <p className="text-xl font-bold text-text-brand">${data.materialValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider">Sub‑Assemblies</p>
            <p className="text-xl font-bold text-text-brand">${data.subAssemblyValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider">Finished Goods</p>
            <p className="text-xl font-bold text-text-brand">${data.finishedGoodValue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Schedule C COGS */}
      <div className="bg-surface-widget border border-default rounded-xl p-6">
        {/* Desktop: original layout - title + button in flex row */}
        <div className="hidden sm:flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-text">📋 IRS Schedule C COGS</h2>
          <a href="/reports/cogs" className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-md whitespace-nowrap">
            📋 Detailed COGS Calculator
          </a>
        </div>
        {/* Mobile: title only at top */}
        <div className="sm:hidden mb-2">
          <h2 className="text-lg font-semibold text-text">📋 IRS Schedule C COGS</h2>
        </div>
        <p className="text-text-muted text-sm mb-4">
          Formula: Beginning Inventory + Purchases – Ending Inventory
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider">Beginning Inventory</p>
            <p className="text-xl font-bold text-text">${data.inventoryValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider">Purchases (est.)</p>
            <p className="text-xl font-bold text-text">${(cogsScheduleC - data.inventoryValue + data.inventoryValue).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider">Ending Inventory</p>
            <p className="text-xl font-bold text-text">${data.inventoryValue.toFixed(2)}</p>
          </div>
          <div className="sm:col-span-3 border-t border-default pt-4">
            <p className="text-text-muted text-xs uppercase tracking-wider">Total COGS (Schedule C)</p>
            <p className="text-3xl font-bold text-warning">${cogsScheduleC.toFixed(2)}</p>
          </div>
        </div>
        {/* Mobile only: button at bottom */}
        <div className="sm:hidden mt-4">
          <a href="/reports/cogs" className="block text-center bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-md whitespace-nowrap">
            📋 Detailed COGS Calculator
          </a>
        </div>
      </div>

      {/* Product profitability table */}
      <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
        <div className="p-5 border-b border-default">
          <h2 className="text-lg font-semibold text-text">Product Profitability</h2>
        </div>
        {data.productProfitability.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No sales data available for the selected period.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4">Product</th>
                  <th className="p-4 text-right">Revenue</th>
                  <th className="p-4 text-right">COGS</th>
                  <th className="p-4 text-right">Profit</th>
                  <th className="p-4 text-right">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default text-sm">
                {data.productProfitability.map((p) => (
                  <tr key={p.name} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                    <td className="p-4 font-medium text-text">{p.name}</td>
                    <td className="p-4 text-right text-text-secondary">${p.revenue.toFixed(2)}</td>
                    <td className="p-4 text-right text-text-secondary">${p.cogs.toFixed(2)}</td>
                    <td className={`p-4 text-right font-medium ${p.profit >= 0 ? "text-success" : "text-error"}`}>
                      ${p.profit.toFixed(2)}
                    </td>
                    <td className="p-4 text-right text-text-secondary">{p.margin.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}