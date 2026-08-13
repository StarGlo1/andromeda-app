"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { Download, FileText, DollarSign, ShoppingCart, Wrench, Package } from "lucide-react";
import { 
  exportSalesCSV, 
  exportPurchasesCSV, 
  exportExpensesCSV, 
  exportBatchesCSV 
} from "@/app/actions/exportFinancials";

// Helper function to trigger browser file download
function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function FinancialExportPage() {
  const [loadingType, setLoadingType] = useState<string | null>(null);

  const handleDownload = async (type: string) => {
    setLoadingType(type);
    try {
      let csvData = "";
      let filename = "";

      if (type === "sales") {
        csvData = await exportSalesCSV();
        filename = `sales_revenue_${new Date().toISOString().split("T")[0]}.csv`;
      } else if (type === "purchases") {
        csvData = await exportPurchasesCSV();
        filename = `raw_material_purchases_${new Date().toISOString().split("T")[0]}.csv`;
      } else if (type === "expenses") {
        csvData = await exportExpensesCSV();
        filename = `operating_expenses_${new Date().toISOString().split("T")[0]}.csv`;
      } else if (type === "batches") {
        csvData = await exportBatchesCSV();
        filename = `production_batches_cogs_${new Date().toISOString().split("T")[0]}.csv`;
      }

      downloadCSV(csvData, filename);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to generate export file.");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        {/* Page Header */}
        <div className="bg-surface-widget border border-default rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-text">Financial & Tax Data Hub</h1>
          </div>
          <p className="text-sm text-text-muted">
            Export clean, standardized CSV files of your maker business data. Ready to drop directly into QuickBooks, Wave, or hand to your CPA for clean tax filing.
          </p>
        </div>

        {/* Export Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Sales & Revenue */}
          <div className="bg-surface-widget border border-default rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-brand mb-3">
                <DollarSign className="w-5 h-5" />
                <h3 className="text-lg font-bold text-text">Sales & Revenue Export</h3>
              </div>
              <p className="text-sm text-text-muted mb-6">
                Tracks incoming revenue across all channels with gross amounts, discounts, shipping fees, refunds, and final net totals.
              </p>
            </div>
            <button
              onClick={() => handleDownload("sales")}
              disabled={loadingType === "sales"}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm"
            >
              <Download className="w-4 h-4" />
              {loadingType === "sales" ? "Generating..." : "Download Sales CSV"}
            </button>
          </div>

          {/* 2. Raw Material Purchases */}
          <div className="bg-surface-widget border border-default rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-brand mb-3">
                <Package className="w-5 h-5" />
                <h3 className="text-lg font-bold text-text">Raw Material Purchases</h3>
              </div>
              <p className="text-sm text-text-muted mb-6">
                Logs every component purchase (wax, fragrance oils, wicks, vessels) with exact quantities, unit costs, and vendor info.
              </p>
            </div>
            <button
              onClick={() => handleDownload("purchases")}
              disabled={loadingType === "purchases"}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm"
            >
              <Download className="w-4 h-4" />
              {loadingType === "purchases" ? "Generating..." : "Download Purchases CSV"}
            </button>
          </div>

          {/* 3. Operating Expenses */}
          <div className="bg-surface-widget border border-default rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-brand mb-3">
                <ShoppingCart className="w-5 h-5" />
                <h3 className="text-lg font-bold text-text">Operating Expenses & Overhead</h3>
              </div>
              <p className="text-sm text-text-muted mb-6">
                Captures overhead costs not tied to raw stock—software subscriptions, shipping boxes, advertising, tools, and platform fees.
              </p>
            </div>
            <button
              onClick={() => handleDownload("expenses")}
              disabled={loadingType === "expenses"}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm"
            >
              <Download className="w-4 h-4" />
              {loadingType === "expenses" ? "Generating..." : "Download Expenses CSV"}
            </button>
          </div>

          {/* 4. Production Batches & COGS */}
          <div className="bg-surface-widget border border-default rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-brand mb-3">
                <Wrench className="w-5 h-5" />
                <h3 className="text-lg font-bold text-text">Production Batches & COGS</h3>
              </div>
              <p className="text-sm text-text-muted mb-6">
                Records how raw materials translate into finished product costs, giving you precise unit COGS across your product lines.
              </p>
            </div>
            <button
              onClick={() => handleDownload("batches")}
              disabled={loadingType === "batches"}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm shadow-sm"
            >
              <Download className="w-4 h-4" />
              {loadingType === "batches" ? "Generating..." : "Download Batches & COGS CSV"}
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}