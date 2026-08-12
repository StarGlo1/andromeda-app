"use client";

import { useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------- Default widget order ----------
const DEFAULT_ORDER = [
  "totalRevenue",
  "totalSales",
  "lowStock",
  "potentialProfit",
  "totalProducts",
  "totalInventoryValue",
  "rawMaterialsCount",
  "activeRecipesCount",
  "avgCogs",
];

// ---------- Widget definitions ----------
const WIDGETS: Record<
  string,
  {
    label: string;
    icon: string;
    color: string;
    renderValue: (data: any) => React.ReactNode;
  }
> = {
  totalSales: {
    label: "Total Sales",
    icon: "📊",
    color: "text-text-brand",
    renderValue: (d) => d.totalSales ?? 0,
  },
  totalRevenue: {
    label: "Revenue",
    icon: "💰",
    color: "text-text-brand",
    renderValue: (d) => `$${(d.totalRevenue ?? 0).toFixed(2)}`,
  },
  rawMaterialsCount: {
    label: "Raw Materials",
    icon: "🧱",
    color: "text-text-brand",
    renderValue: (d) => d.rawMaterialsCount,
  },
  lowStock: {
    label: "Low Stock",
    icon: "⚠️",
    color: (d: any) =>
      d.lowStockCount > 0 ? "text-warning" : "text-text",
    renderValue: (d) => d.lowStockCount,
  },
  totalProducts: {
    label: "Products",
    icon: "📦",
    color: "text-text-brand",
    renderValue: (d) => d.totalProducts,
  },
  totalInventoryValue: {
    label: "Inventory Value",
    icon: "💰",
    color: "text-text",
    renderValue: (d) => `$${d.totalInventoryValue.toFixed(2)}`,
  },
  activeRecipesCount: {
    label: "Active Recipes",
    icon: "📝",
    color: "text-text-brand",
    renderValue: (d) => d.activeRecipesCount,
  },
  avgCogs: {
    label: "Avg COGS",
    icon: "📊",
    color: "text-text",
    renderValue: (d) => `$${d.avgCogs.toFixed(2)}`,
  },
  potentialProfit: {
    label: "Potential Profit",
    icon: "💸",
    color: "text-text-brand",
    renderValue: (d) => `$${d.potentialProfit.toFixed(2)}`,
  },
};

export default function DashboardWidgets({ data }: { data: any }) {
  const [order, setOrder] = useState<string[]>(() => {
    if (typeof window === "undefined") return DEFAULT_ORDER;
    try {
      const saved = localStorage.getItem("widgetOrder");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_ORDER;
  });

  const [editMode, setEditMode] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const saveOrder = useCallback((newOrder: string[]) => {
    setOrder(newOrder);
    try {
      localStorage.setItem("widgetOrder", JSON.stringify(newOrder));
    } catch {}
  }, []);

  const handleDragStart = (index: number) => setDragIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newOrder = [...order];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(index, 0, removed);
    setOrder(newOrder);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    if (dragIndex !== null) saveOrder(order);
    setDragIndex(null);
  };

  const moveWidget = (index: number, direction: "up" | "down") => {
    const newOrder = [...order];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= order.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    saveOrder(newOrder);
  };

  const topRow = order.slice(0, 3);
  const bottomRow = order.slice(3);

  const renderWidget = (key: string, index: number, large: boolean) => {
    const widget = WIDGETS[key];
    if (!widget) return null;
    const value = widget.renderValue(data);
    const textColor =
      typeof widget.color === "function" ? widget.color(data) : widget.color;

    return (
      <div
        key={key}
        draggable={editMode}
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragEnd={handleDragEnd}
        className={`bg-surface-widget border border-default rounded-xl p-5 transition-colors ${
          editMode
            ? "cursor-grab active:cursor-grabbing ring-2 ring-outline-focus"
            : "hover:border-brand"
        } ${dragIndex === index ? "opacity-50" : ""}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{widget.icon}</span>
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">
            {widget.label}
          </p>
          {editMode && (
            <div className="ml-auto flex gap-1">
              <button
                onClick={() => moveWidget(index, "up")}
                className="text-text-muted hover:text-text text-xs px-1"
                title="Move up"
              >
                ▲
              </button>
              <button
                onClick={() => moveWidget(index, "down")}
                className="text-text-muted hover:text-text text-xs px-1"
                title="Move down"
              >
                ▼
              </button>
            </div>
          )}
        </div>
        <p className={`${large ? "text-3xl" : "text-2xl"} font-bold mt-2 ${textColor}`}>
          {value}
        </p>
        {key === "potentialProfit" && (
          <>
            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
              <div
                className="bg-brand h-1.5 rounded-full"
                style={{
                  width: `${Math.min(
                    data.potentialProfit > 0 && data.totalInventoryValue > 0
                      ? (data.potentialProfit / data.totalInventoryValue) * 100
                      : 0,
                    100
                  )}%`,
                }}
              />
            </div>
            <p className="text-xs text-text-muted mt-1">
              Profit vs. Inventory Value
            </p>
          </>
        )}
      </div>
    );
  };

  // Prepare chart data from recent activity
  const chartData = (data.recentActivity || [])
    .filter((item: any) => item.type === "product")
    .map((item: any) => ({
      name: item.name,
      profit: data.potentialProfit || 0,
    }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRow.map((key, idx) => renderWidget(key, idx, true))}
        </div>
        {bottomRow.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {bottomRow.map((key, idx) => renderWidget(key, idx + 3, false))}
          </div>
        )}
      </div>

      {/* Customize button */}
      <div className="flex justify-end">
        <button
          onClick={() => setEditMode(!editMode)}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            editMode
              ? "bg-brand text-text-inverse"
              : "bg-surface-widget border border-default text-text-muted hover:text-text"
          }`}
        >
          {editMode ? "Done" : "Customize"}
        </button>
      </div>

      {/* Profit per Product Chart */}
      <div className="bg-surface-widget border border-default rounded-xl p-5">
        <h2 className="text-lg font-semibold text-text mb-4">
          Profit per Product
        </h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fill: "var(--color-text-muted)" }} />
              <YAxis tick={{ fill: "var(--color-text-muted)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="profit" fill="var(--color-brand)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-text-muted text-sm">
            Add finished goods and recipes to see profit data.
          </div>
        )}
      </div>

      {/* Low‑stock alert table */}
      {data.lowStockMaterials?.length > 0 && (
        <div className="bg-surface-widget border border-warning rounded-xl overflow-hidden">
          <div className="p-5 border-b border-warning flex items-center justify-between">
            <h2 className="text-lg font-semibold text-warning">
              ⚠️ Low Stock Alerts
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-warning bg-warning-muted dark:bg-warning-muted-dark text-warning text-xs uppercase tracking-wider">
                  <th className="p-4">Material</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Reorder At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warning text-sm">
                {data.lowStockMaterials.slice(0, 5).map((m: any) => (
                  <tr
                    key={m.id}
                    className="hover:bg-warning-muted dark:hover:bg-warning-muted-dark transition-colors"
                  >
                    <td className="p-4 font-medium text-text">{m.name}</td>
                    <td className="p-4 text-text-secondary">{m.category.name}</td>
                    <td className="p-4 text-warning font-medium">
                      {m.totalQuantity ?? 0} {m.unit ?? ""}
                    </td>
                    <td className="p-4 text-text-muted">
                      {m.reorderThreshold} {m.unit ?? ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.lowStockMaterials.length > 5 && (
            <div className="p-3 text-center">
              <a
                href="/materials"
                className="text-text-brand text-xs font-medium hover:underline"
              >
                View all →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <h2 className="text-lg font-semibold text-text mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="/materials"
              className="flex items-center justify-center gap-2 bg-brand-muted dark:bg-brand-muted-dark text-text-brand dark:text-text-brand-dark hover:bg-brand hover:text-text-inverse px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <span className="text-base">+</span> Material
            </a>
            <a
              href="/finished-goods"
              className="flex items-center justify-center gap-2 bg-brand-muted dark:bg-brand-muted-dark text-text-brand dark:text-text-brand-dark hover:bg-brand hover:text-text-inverse px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <span className="text-base">+</span> Product
            </a>
            <a
              href="/import"
              className="flex items-center justify-center gap-2 bg-surface border border-default text-text-secondary hover:bg-brand hover:text-text-inverse px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              📥 Import
            </a>
            <a
              href="/categories"
              className="flex items-center justify-center gap-2 bg-surface border border-default text-text-secondary hover:bg-brand hover:text-text-inverse px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              📋 Categories
            </a>
          </div>
        </div>

        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
          <div className="p-5 border-b border-default">
            <h2 className="text-lg font-semibold text-text">
              Recent Activity
            </h2>
          </div>
          <div className="p-6 text-center text-text-muted text-sm">
            Activity feed coming soon.
          </div>
        </div>
      </div>
    </div>
  );
}