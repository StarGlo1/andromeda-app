"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { Boxes, Package, ShoppingCart, FileText, ArrowUpRight, Plus, AlertTriangle, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const [currency, setCurrency] = useState("$");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <Navbar />

        {/* Header section with responsive stacking */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text">Dashboard</h1>
            <p className="text-sm text-text-muted mt-1">
              Overview of your inventory, production metrics, and sales performance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/calculator"
              className="flex-1 sm:flex-none justify-center bg-surface border border-default text-text hover:bg-surface-elevated font-medium px-4 py-2.5 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm"
            >
              <TrendingUp className="w-4 h-4 text-brand shrink-0" />
              <span>Batch Calculator</span>
            </Link>
            <Link
              href="/materials"
              className="flex-1 sm:flex-none justify-center bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm shadow-brand/20"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Add Material</span>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-surface-widget border border-default rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase text-text-muted tracking-wider">Raw Materials</span>
              <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center text-brand">
                <Boxes className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text">24</span>
              <span className="text-xs text-success font-medium">Active items</span>
            </div>
          </div>

          <div className="bg-surface-widget border border-default rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase text-text-muted tracking-wider">Finished Goods</span>
              <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center text-brand">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text">12</span>
              <span className="text-xs text-text-muted font-medium">SKUs cataloged</span>
            </div>
          </div>

          <div className="bg-surface-widget border border-default rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase text-text-muted tracking-wider">Active Recipes</span>
              <div className="w-8 h-8 rounded-lg bg-brand-muted flex items-center justify-center text-brand">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text">8</span>
              <span className="text-xs text-text-muted font-medium">Ready for batching</span>
            </div>
          </div>

          <div className="bg-surface-widget border border-default rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase text-text-muted tracking-wider">Monthly Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-success">
                <ShoppingCart className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text">{currency}1,480.00</span>
              <span className="text-xs text-success font-medium">+12% this mo</span>
            </div>
          </div>
        </div>

        {/* Two-column layout for Quick Navigation & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Navigation Cards */}
          <div className="lg:col-span-2 bg-surface-widget border border-default rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-text">Quick Navigation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/materials"
                className="p-4 rounded-xl bg-surface border border-default hover:border-brand transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-brand-muted flex items-center justify-center text-brand shrink-0">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text group-hover:text-brand transition-colors truncate">Manage Materials</p>
                    <p className="text-xs text-text-muted truncate">Waxes, oils, wicks, vessels</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors shrink-0 ml-2" />
              </Link>

              <Link
                href="/finished-goods"
                className="p-4 rounded-xl bg-surface border border-default hover:border-brand transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-brand-muted flex items-center justify-center text-brand shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text group-hover:text-brand transition-colors truncate">Finished Goods</p>
                    <p className="text-xs text-text-muted truncate">Stock levels & pricing</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors shrink-0 ml-2" />
              </Link>

              <Link
                href="/recipes"
                className="p-4 rounded-xl bg-surface border border-default hover:border-brand transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-brand-muted flex items-center justify-center text-brand shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text group-hover:text-brand transition-colors truncate">Formulations & Recipes</p>
                    <p className="text-xs text-text-muted truncate">BOMs & batch ratios</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors shrink-0 ml-2" />
              </Link>

              <Link
                href="/sales"
                className="p-4 rounded-xl bg-surface border border-default hover:border-brand transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-brand-muted flex items-center justify-center text-brand shrink-0">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text group-hover:text-brand transition-colors truncate">Sales & Orders</p>
                    <p className="text-xs text-text-muted truncate">Invoices & customer status</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors shrink-0 ml-2" />
              </Link>
            </div>
          </div>

          {/* Low Stock / Inventory Alerts Widget */}
          <div className="bg-surface-widget border border-default rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text">Inventory Alerts</h2>
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                  <p className="font-semibold text-amber-600 dark:text-amber-400">Low Stock Warning</p>
                  <p className="text-text-muted mt-0.5">Primary wax inventory is approaching the reorder threshold.</p>
                </div>
                <div className="p-3 rounded-lg bg-surface border border-default text-xs">
                  <p className="font-semibold text-text">Fragrance Oils Stock</p>
                  <p className="text-text-muted mt-0.5">All active preblended stock levels normal.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-default">
              <Link
                href="/materials"
                className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
              >
                View all inventory items &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}