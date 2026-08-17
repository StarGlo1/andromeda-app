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
    renderValue: (d: any) => `$${d.totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
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
    label: "Reorder Sugg",
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

const MOBILE_CARD_SIZES = {
  "small": { height: "140px", label: "Small" },
  "medium": { height: "180px", label: "Medium" },
  "large": { height: "220px", label: "Large" },
};

const WIDGET_ROUTES: Record<string, string> = {
  alerts: "/alerts",
  totalSales: "/sales",
  totalRevenue: "/sales",
  rawMaterialsCount: "/materials",
  lowStock: "/materials",
  totalProducts: "/finished-goods",
  totalInventoryValue: "/reports",
  activeRecipesCount: "/recipes",
  avgCogs: "/reports/cogs",
  potentialProfit: "/reports",
  profitMargin: "/reports",
  topSelling: "/sales",
  pendingSales: "/sales",
  reorderSuggestions: "/materials",
  expiringStock: "/materials",
};

export default function DashboardWidgets({ data }: { data: any }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const [widgetSizes, setWidgetSizes] = useState<Record<string, string>>({});
  const [editMode, setEditMode] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [carousel1Size, setCarousel1Size] = useState<string>("medium");
  const [carousel2Size, setCarousel2Size] = useState<string>("medium");
  const [customizingCarousel, setCustomizingCarousel] = useState<number | null>(null);
  const [dragItemIndex, setDragItemIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const carousel1Ref = useRef<HTMLDivElement>(null);
  const carousel2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const savedOrder = localStorage.getItem("widgetOrder");
      if (savedOrder) setOrder(JSON.parse(savedOrder));
      const savedSizes = localStorage.getItem("widgetSizes");
      if (savedSizes) setWidgetSizes(JSON.parse(savedSizes));
      const savedCarousel1Size = localStorage.getItem("carousel1Size");
      if (savedCarousel1Size) setCarousel1Size(savedCarousel1Size);
      const savedCarousel2Size = localStorage.getItem("carousel2Size");
      if (savedCarousel2Size) setCarousel2Size(savedCarousel2Size);
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

  const saveCarouselSize = (carousel: number, size: string) => {
    if (carousel === 1) {
      setCarousel1Size(size);
      try { localStorage.setItem("carousel1Size", size); } catch {}
    } else {
      setCarousel2Size(size);
      try { localStorage.setItem("carousel2Size", size); } catch {}
    }
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

  const getMenuPosition = (key: string) => {
    const btn = buttonRefs.current[key];
    if (!btn) return { top: 0, left: 0 };
    
    const rect = btn.getBoundingClientRect();
    const menuWidth = 144;
    const menuHeight = 240;
    
    let top = rect.bottom + 4;
    let left = rect.right - menuWidth;
    
    if (left < 8) left = 8;
    if (left + menuWidth > window.innerWidth - 8) {
      left = window.innerWidth - menuWidth - 8;
    }
    
    if (top + menuHeight > window.innerHeight - 8) {
      top = rect.top - menuHeight - 4;
    }
    
    return { top, left };
  };

  const handleMobileDragStart = (e: React.DragEvent, index: number) => {
    setDragItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleMobileDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragItemIndex === null || dragItemIndex === index) return;
    
    const newOrder = [...order];
    const [removed] = newOrder.splice(dragItemIndex, 1);
    newOrder.splice(index, 0, removed);
    setOrder(newOrder);
    setDragItemIndex(index);
  };

  const handleMobileDragEnd = () => {
    if (dragItemIndex !== null) saveOrder(order);
    setDragItemIndex(null);
  };

  const renderWidgetContent = (key: string, index: number, isMobile: boolean = false) => {
    const widget = WIDGETS[key];
    if (!widget) return null;
    const value = widget.renderValue(data);
    const textColor =
      typeof widget.color === "function" ? widget.color(data) : widget.color;
    const sizeKey = widgetSizes[key] || "1x1";
    const size = GRID_SIZES[sizeKey] || GRID_SIZES["1x1"];
    const isLarge = sizeKey === "2x2" || sizeKey === "3x2" || sizeKey === "3x3";
    const menuPos = menuOpen === key ? getMenuPosition(key) : null;

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
      <>
        <div className="flex items-center gap-2 mb-1">
          <span className={`${isMobile ? "text-xl" : "text-lg"} shrink-0 leading-none`}>{widget.icon}</span>
          <p className={`text-gray-500 dark:text-gray-400 ${isMobile ? "text-xl" : "text-lg"} font-semibold uppercase tracking-wider break-words leading-none`}>
            {widget.label}
          </p>
        </div>

        {editMode && !isMobile && (
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
                ref={(el) => {
                  buttonRefs.current[key] = el;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === key ? null : key);
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-xs px-1 py-0.5"
                title="Resize"
              >
                •••
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center">
          <p className={`${isMobile ? "text-[1.75rem]" : isLarge ? "text-[2rem]" : "text-[1.75rem]"} font-bold ${textColor} break-words whitespace-normal`}>{value}</p>

          {key === "topSelling" && isLarge && !isMobile && renderList(data.topSelling, (item) => (
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <span className="truncate">{item.name}</span>
              <span>{item.quantity} sold</span>
            </div>
          ), 5)}



          {key === "expiringStock" && isLarge && !isMobile && renderList(data.expiringStock, (item) => (
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <span className="truncate">{item.name}</span>
              <span>{item.totalQuantity} {item.unit}</span>
            </div>
          ), 5)}

          {key === "pendingSales" && isLarge && !isMobile && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">Awaiting payment or fulfillment</p>
          )}

          {key === "profitMargin" && isLarge && !isMobile && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Based on total revenue and COGS</p>
          )}
        </div>
      </>
    );

    return { widgetBody, menuPos };
  };

  const renderDesktopWidget = (key: string, index: number) => {
    const widget = WIDGETS[key];
    if (!widget) return null;
    const sizeKey = widgetSizes[key] || "1x1";
    const size = GRID_SIZES[sizeKey] || GRID_SIZES["1x1"];
    const { widgetBody, menuPos } = renderWidgetContent(key, index, false);

    return (
      <div
        key={key}
        draggable={editMode}
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragEnd={handleDragEnd}
        onClick={() => {
          if (editMode) return;
          const route = WIDGET_ROUTES[key];
          if (route) router.push(route);
        }}
        className={`relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors ${
          editMode
            ? "cursor-grab active:cursor-grabbing ring-2 ring-teal-500"
            : "hover:border-teal-600 dark:hover:border-teal-400 cursor-pointer"
        } ${dragIndex === index ? "opacity-50" : ""} ${size.col} ${size.row}`}
      >
        {widgetBody}
        
        {menuOpen === key && menuPos && (
          <div
            ref={menuRef}
            className="fixed z-[100] w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
            style={{
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
            }}
          >
            {Object.entries(GRID_SIZES).map(([sizeKey, size]) => (
              <button
                key={sizeKey}
                onClick={(e) => {
                  e.stopPropagation();
                  setWidgetSize(key, sizeKey);
                }}
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
    );
  };

  const renderMobileWidget = (key: string, index: number, carouselSize: string) => {
    const { widgetBody } = renderWidgetContent(key, index, true);
    const sizeConfig = MOBILE_CARD_SIZES[carouselSize] || MOBILE_CARD_SIZES["medium"];

    return (
      <div
        key={key}
        data-mobile-card
        onClick={() => {
          const route = WIDGET_ROUTES[key];
          if (route) router.push(route);
        }}
        className={`relative shrink-0 w-[calc(50%-6px)] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 ${
          key === "alerts"
            ? "border-red-500 dark:border-red-400 cursor-pointer"
            : ""
        }`}
        style={{ height: sizeConfig.height }}
      >
        {widgetBody}
      </div>
    );
  };

  const firstCarouselWidgets = order.slice(0, 8);
  const secondCarouselWidgets = order.slice(8);

  const chartData = (data.recentActivity || [])
    .filter((item: any) => item.type === "product")
    .map((item: any) => ({
      name: item.name,
      profit: data.potentialProfit || 0,
    }));

  return (
    <div className="space-y-8">
      {/* Desktop Grid */}
      <div className={`hidden sm:grid grid-cols-12 gap-4 ${editMode ? "auto-rows-[160px]" : "auto-rows-[135px]"}`}>
        {order.map((key, idx) => renderDesktopWidget(key, idx))}
      </div>

      {/* Mobile Carousels */}
      <div className="sm:hidden space-y-6">
        {/* Carousel 1 */}
        <div>
          <div className="mb-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">Swipe to browse</span>
          </div>
          
          <div 
            ref={carousel1Ref}
            className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {firstCarouselWidgets.map((key, idx) => renderMobileWidget(key, idx, carousel1Size))}
          </div>
        </div>

        {/* Carousel 2 */}
        <div>
          <div className="mb-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">Swipe to browse</span>
          </div>
          
          <div 
            ref={carousel2Ref}
            className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {secondCarouselWidgets.map((key, idx) => renderMobileWidget(key, idx, carousel2Size))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (editMode) {
              setEditMode(false);
              setCustomizingCarousel(null);
            } else {
              setEditMode(true);
            }
          }}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            editMode
              ? "bg-[#4f8792] text-white"
              : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }`}
        >
          {editMode ? "Done" : "Customize"}
        </button>
      </div>

      {/* Customize Modal - Mobile Only */}
      {editMode && (
        <div className="sm:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => {
          setEditMode(false);
          setCustomizingCarousel(null);
        }}>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            {customizingCarousel === null ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Select Carousel to Customize</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setCustomizingCarousel(1)}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-left hover:border-teal-500 dark:hover:border-teal-500 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Carousel 1</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">8 widgets</p>
                  </button>
                  <button
                    onClick={() => setCustomizingCarousel(2)}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-left hover:border-teal-500 dark:hover:border-teal-500 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Carousel 2</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">7 widgets</p>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Carousel {customizingCarousel} Settings
                  </h3>
                  <button
                    onClick={() => setCustomizingCarousel(null)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    ← Back
                  </button>
                </div>
                
                {/* Size Selection */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Size</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(MOBILE_CARD_SIZES).map(([sizeKey, size]) => (
                      <button
                        key={sizeKey}
                        onClick={() => saveCarouselSize(customizingCarousel, sizeKey)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          (customizingCarousel === 1 ? carousel1Size : carousel2Size) === sizeKey
                            ? "bg-[#4f8792] text-white border-teal-600"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-teal-500 dark:hover:border-teal-500"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reorder List */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reorder Widgets</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {(customizingCarousel === 1 ? firstCarouselWidgets : secondCarouselWidgets).map((key, idx) => {
                      const widget = WIDGETS[key];
                      const globalIndex = customizingCarousel === 1 ? idx : idx + 8;
                      return (
                        <div
                          key={key}
                          draggable
                          onDragStart={(e) => handleMobileDragStart(e, globalIndex)}
                          onDragOver={(e) => handleMobileDragOver(e, globalIndex)}
                          onDragEnd={handleMobileDragEnd}
                          className={`flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-move ${
                            dragItemIndex === globalIndex ? "opacity-50" : ""
                          }`}
                        >
                          <span className="text-lg">{widget.icon}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{widget.label}</span>
                          <span className="ml-auto text-gray-400 dark:text-gray-500">⋮⋮</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop Customize - Inline */}
      {editMode && (
        <div className="hidden sm:block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Drag widgets to reorder. Use the ••• menu on each widget to resize.
          </p>
        </div>
      )}

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
              <Bar dataKey="profit" fill="#4f8792" radius={[4, 4, 0, 0]} />
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
              <Bar dataKey="quantity" fill="#4f8792" radius={[4, 4, 0, 0]} />
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
              <Line type="monotone" dataKey="margin" stroke="#4f8792" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Low‑stock alert table */}
      {data.lowStockMaterials?.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-yellow-500 dark:border-yellow-400 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-yellow-500 dark:border-yellow-400 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">⚠️ Low Stock | Out of Stock Alerts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-yellow-500 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs uppercase tracking-wider">
                  <th className="p-4">Material</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Reorder At</th>
                  <th className="p-4 text-center">OOS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-200 dark:divide-yellow-800 text-sm">
                {data.lowStockMaterials.slice(0, 5).map((m: any) => {
                  const isOOS = (m.totalQuantity ?? 0) <= 0;
                  return (
                    <tr key={m.id} className={`${isOOS ? "bg-red-50 dark:bg-red-900/20" : "hover:bg-yellow-50 dark:hover:bg-yellow-900/20"} transition-colors`}>
                      <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{m.name}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{m.category.name}</td>
                      <td className={`p-4 font-medium ${isOOS ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}`}>{m.totalQuantity ?? 0} {m.unit ?? ""}</td>
                      <td className="p-4 text-gray-500 dark:text-gray-400">{m.reorderThreshold} {m.unit ?? ""}</td>
                      <td className="p-4 text-center">
                        {isOOS ? (
                          <span className="inline-block bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 font-bold text-lg leading-none px-2 py-1 rounded border border-red-400 dark:border-red-600">✕</span>
                        ) : (
                          <span className="text-green-500">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
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
            <a
              href="/materials"
              className="flex items-center justify-center gap-2 bg-[#4f8792] text-white hover:bg-[#426f79] px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <span className="text-base">+</span> Material
            </a>
            <a
              href="/finished-goods"
              className="flex items-center justify-center gap-2 bg-[#4f8792] text-white hover:bg-[#426f79] px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <span className="text-base">+</span> Product
            </a>
            <a
              href="/import"
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#4f8792] hover:text-white dark:hover:bg-[#4f8792] dark:hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              📥 Import
            </a>
            <a
              href="/categories"
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#4f8792] hover:text-white dark:hover:bg-[#4f8792] dark:hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              📋 Categories
            </a>
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