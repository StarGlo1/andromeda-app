"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const DEFAULT_ORDER = [
  "alerts",
  "totalRevenue",
  "profitMargin",
  "topSelling",
  "pendingSales",
  "reorderSuggestions",
  "expiringStock",
  "totalSales",
  "lowStock",
  "totalProducts",
  "totalInventoryValue",
  "rawMaterialsCount",
  "activeRecipesCount",
  "avgCogs",
  "potentialProfit",
];

const WIDGETS: Record<string, any> = {
  alerts: {
    label: "Alerts",
    icon: "🔔",
    color: "text-red-600 dark:text-red-400",
    renderValue: (d: any) => d.alertsCount ?? 0,
  },
  totalSales: {
    label: "Total Sales",
    icon: "📊",
    color: "text-teal-600 dark:text-teal-400",
    renderValue: (d: any) => d.totalSales ?? 0,
  },
  totalRevenue: {
    label: "Revenue",
    icon: "💰",
    color: "text-teal-600 dark:text-teal-400",
    renderValue: (d: any) => `$${(d.totalRevenue ?? 0).toFixed(2)}`,
  },
  rawMaterialsCount: {
    label: "Raw Materials",
    icon: "🧱",
    color: "text-teal-600 dark:text-teal-400",
    renderValue: (d: any) => d.rawMaterialsCount,
  },
  lowStock: {
    label: "Low Stock",
    icon: "⚠️",
    color: (d: any) =>
      d.lowStockCount > 0
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-gray-900 dark:text-gray-100",
    renderValue: (d: any) => d.lowStockCount,
  },
  totalProducts: {
    label: "Products",
    icon: "📦",
    color: "text-teal-600 dark:text-teal-400",
    renderValue: (d: any) => d.totalProducts,
  },
  totalInventoryValue: {
    label: "Inventory Value",
    icon: "💰",
    color: "text-gray-900 dark:text-gray-100",
    renderValue: (d: any) => `$${d.totalInventoryValue.toFixed(2)}`,
  },
  activeRecipesCount: {
    label: "Active Recipes",
    icon: "📝",
    color: "text-teal-600 dark:text-teal-400",
    renderValue: (d: any) => d.activeRecipesCount,
  },
  avgCogs: {
    label: "Avg COGS",
    icon: "📊",
    color: "text-gray-900 dark:text-gray-100",
    renderValue: (d: any) => `$${d.avgCogs.toFixed(2)}`,
  },
  potentialProfit: {
    label: "Potential Profit",
    icon: "💸",
    color: "text-teal-600 dark:text-teal-400",
    renderValue: (d: any) => `$${d.potentialProfit.toFixed(2)}`,
  },
  profitMargin: {
    label: "Profit Margin",
    icon: "📈",
    color: (d: any) =>
      d.profitMargin >= 0
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400",
    renderValue: (d: any) => `${d.profitMargin.toFixed(1)}%`,
  },
  topSelling: {
    label: "Top Selling",
    icon: "🏆",
    color: "text-teal-600 dark:text-teal-400",
    renderValue: (d: any) => d.topSelling?.[0]?.name ?? "—",
  },
  pendingSales: {
    label: "Pending Sales",
    icon: "⏳",
    color: "text-yellow-600 dark:text-yellow-400",
    renderValue: (d: any) => d.pendingSalesCount ?? 0,
  },
  reorderSuggestions: {
    label: "Reorder Suggestions",
    icon: "🛒",
    color: "text-blue-600 dark:text-blue-400",
    renderValue: (d: any) => d.reorderSuggestions?.length ?? 0,
  },
  expiringStock: {
    label: "Oldest Stock",
    icon: "⏰",
    color: "text-orange-600 dark:text-orange-400",
    renderValue: (d: any) => d.expiringStock?.[0]?.name ?? "—",
  },
};

const GRID_SIZES = {
  "1x1": { col: "col-span-3", row: "row-span-1", label: "1×1" },
  "2x1": { col: "col-span-6", row: "row-span-1", label: "2×1" },
  "1x2": { col: "col-span-3", row: "row-span-2", label: "1×2" },
  "2x2": { col: "col-span-6", row: "row-span-2", label: "2×2" },
  "3x2": { col: "col-span-9", row: "row-span-2", label: "3×2" },
  "3x3": { col: "col-span-12", row: "row-span-3", label: "3×3" },
};

export default function DashboardWidgets({ data }: { data: any }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const [widgetSizes, setWidgetSizes] = useState<Record<string, string>>({});
  const [editMode, setEditMode] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const savedOrder = localStorage.getItem("widgetOrder");
      if (savedOrder) setOrder(JSON.parse(savedOrder));
      const savedSizes = localStorage.getItem("widgetSizes");
      if (savedSizes) setWidgetSizes(JSON.parse(savedSizes));
    } catch {}
  }, []);

  const saveOrder = useCallback((newOrder: string[]) => {
    setOrder(newOrder);
    try {
      localStorage.setItem("widgetOrder", JSON.stringify(newOrder));
    } catch {}
  }, []);

  const saveSizes = (sizes: Record<string, string>) => {
    setWidgetSizes(sizes);
    try {
      localStorage.setItem("widgetSizes", JSON.stringify(sizes));
    } catch {}
  };

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

  const setWidgetSize = (key: string, sizeKey: string) => {
    const newSizes = { ...widgetSizes, [key]: sizeKey };
    saveSizes(newSizes);
    setMenuOpen(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderWidget = (key: string, index: number) => {
    const widget = WIDGETS[key];
    if (!widget) return null;
    const value = widget.renderValue(data);
    const textColor =
      typeof widget.color === "function" ? widget.color(data) : widget.color;
    const sizeKey = widgetSizes[key] || "1x1";
    const size = GRID_SIZES[sizeKey] || GRID_SIZES["1x1"];
    const isLarge = sizeKey === "2x2" || sizeKey === "3x2" || sizeKey === "3x3";

    const renderList = (items: any[], renderItem: (item: any) => React.ReactNode, limit: number) => {
      if (!items || items.length === 0) return null;
      return (
        <div className="mt-2 space-y-1 overflow-hidden">
          {items.slice(0, limit).map((item, idx) => (
            <div key={idx}>{renderItem(item)}</div>
          ))}
        </div>
      );
    };

    const widgetBody = (
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-2 mb-1">
          <span className="text-lg shrink-0 leading-none mt-0.5">{widget.icon}</span>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider break-words leading-tight">
            {widget.label}
          </p>
        </div>

        {editMode && (
          <div className="flex items-center justify-between mb-1">
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveWidget(index, "up");
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-xs px-1 py-0.5"
                title="Move up"
              >
                ▲
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveWidget(index, "down");
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-xs px-1 py-0.5"
                title="Move down"
              >
                ▼
              </button>
            </div>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === key ? null : key);
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-xs px-1 py-0.5"
                title="Resize"
              >
                •••
              </button>
              {menuOpen === key && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1"
                >
                  {Object.entries(GRID_SIZES).map(([sizeKey, size]) => (
                    <button
                      key={sizeKey}
                      onClick={() => setWidgetSize(key, sizeKey)}
                      className={`block w-full text-left px-3 py-2 text-sm ${
                        widgetSizes[key] === sizeKey
                          ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center">
          <p className={`${isLarge ? "text-2xl" : "text-xl"} font-bold ${textColor}`}>{value}</p>

          {key === "topSelling" && isLarge && renderList(data.topSelling, (item) => (
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <span className="truncate">{item.name}</span>
              <span>{item.quantity} sold</span>
            </div>
          ), 5)}

          {key === "reorderSuggestions" && renderList(data.reorderSuggestions, (item) => (
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <span className="truncate">{item.name}</span>
              <span>Order {item.suggestedOrder} {item.unit}</span>
            </div>
          ), isLarge ? 5 : 2)}

          {key === "expiringStock" && isLarge && renderList(data.expiringStock, (item) => (
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <span className="truncate">{item.name}</span>
              <span>{item.totalQuantity} {item.unit}</span>
            </div>
          ), 5)}

          {key === "pendingSales" && isLarge && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">Awaiting payment or fulfillment</p>
          )}

          {key === "profitMargin" && isLarge && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Based on total revenue and COGS</p>
          )}
        </div>
      </div>
    );

    return (
      <div
        key={key}
        draggable={editMode}
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragEnd={handleDragEnd}
        onClick={() => {
          if (editMode) return;
          if (key === "alerts") router.push("/alerts");
        }}
        className={`relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors overflow-hidden ${
          editMode
            ? "cursor-grab active:cursor-grabbing ring-2 ring-teal-500"
            : key === "alerts"
            ? "hover:border-red-500 dark:hover:border-red-400 cursor-pointer"
            : "hover:border-teal-600 dark:hover:border-teal-400"
        } ${dragIndex === index ? "opacity-50" : ""} ${size.col} ${size.row}`}
      >
        {widgetBody}
      </div>
    );
  };

  const chartData = (data.recentActivity || [])
    .filter((item: any) => item.type === "product")
    .map((item: any) => ({
      name: item.name,
      profit: data.potentialProfit || 0,
    }));

  return (
    <div className="space-y-8">
      <div className={`grid grid-cols-12 gap-4 ${editMode ? "auto-rows-[160px]" : "auto-rows-[135px]"}`}>
        {order.map((key, idx) => renderWidget(key, idx))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            editMode
              ? "bg-teal-600 text-white"
              : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }`}
        >
          {editMode ? "Done" : "Customize"}
        </button>
      </div>

      {/* Profit per Product Chart */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profit per Product</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px" }} />
              <Bar dataKey="profit" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm">Add finished goods and recipes to see profit data.</div>
        )}
      </div>

      {/* Top Selling Products Chart */}
      {data.topSelling?.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topSelling}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px" }} />
              <Bar dataKey="quantity" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Profit Margin Trend Chart */}
      {data.profitTrend?.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profit Margin Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.profitTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="margin" stroke="#0d9488" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Low‑stock alert table */}
      {data.lowStockMaterials?.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-yellow-500 dark:border-yellow-400 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-yellow-500 dark:border-yellow-400 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">⚠️ Low Stock Alerts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-yellow-500 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs uppercase tracking-wider">
                  <th className="p-4">Material</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Reorder At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-200 dark:divide-yellow-800 text-sm">
                {data.lowStockMaterials.slice(0, 5).map((m: any) => (
                  <tr key={m.id} className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{m.name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">{m.category.name}</td>
                    <td className="p-4 text-yellow-600 dark:text-yellow-400 font-medium">{m.totalQuantity ?? 0} {m.unit ?? ""}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{m.reorderThreshold} {m.unit ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.lowStockMaterials.length > 5 && (
            <div className="p-3 text-center">
              <a href="/materials" className="text-teal-600 dark:text-teal-400 text-xs font-medium hover:underline">View all →</a>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            <a href="/materials" className="flex items-center justify-center gap-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 dark:hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"><span className="text-base">+</span> Material</a>
            <a href="/finished-goods" className="flex items-center justify-center gap-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 dark:hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"><span className="text-base">+</span> Product</a>
            <a href="/import" className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 dark:hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">📥 Import</a>
            <a href="/categories" className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 dark:hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">📋 Categories</a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
          </div>
          <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">Activity feed coming soon.</div>
        </div>
      </div>
    </div>
  );
}