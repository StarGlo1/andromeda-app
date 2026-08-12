"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { FinishedGoodRow } from "@/app/finished-goods/FinishedGoodRow";

type SortKey = "name" | "sku" | "batchCode" | "retailPrice" | "quantityOnHand" | "calculatedCogs" | "profit" | "margin";

const COLUMNS: { key: SortKey; label: string; defaultWidth: number }[] = [
  { key: "name", label: "Product Name", defaultWidth: 200 },
  { key: "sku", label: "SKU", defaultWidth: 100 },
  { key: "batchCode", label: "Batch Code", defaultWidth: 100 },
  { key: "retailPrice", label: "Retail Price", defaultWidth: 100 },
  { key: "quantityOnHand", label: "Qty on Hand", defaultWidth: 90 },
  { key: "calculatedCogs", label: "COGS", defaultWidth: 80 },
  { key: "profit", label: "Profit", defaultWidth: 90 },
  { key: "margin", label: "Margin %", defaultWidth: 80 },
];

function loadSavedWidths(): Record<string, number> {
  try {
    const saved = localStorage.getItem("finishedGoodColWidths");
    if (saved) return JSON.parse(saved);
  } catch {}
  const defaults: Record<string, number> = {};
  COLUMNS.forEach((c) => (defaults[c.key] = c.defaultWidth));
  return defaults;
}

export function SortableFinishedGoodsTable({
  goods,
  updateAction,
  deleteAction,
  produceAction,
}: {
  goods: any[];
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  produceAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [colWidths, setColWidths] = useState(loadSavedWidths);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted) localStorage.setItem("finishedGoodColWidths", JSON.stringify(colWidths));
  }, [colWidths, mounted]);

  const resizing = useRef<{ key: string; startX: number; startWidth: number } | null>(null);
  const handleMouseDown = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    resizing.current = { key, startX: e.clientX, startWidth: colWidths[key] };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!resizing.current) return;
    const diff = e.clientX - resizing.current.startX;
    const newWidth = Math.max(50, resizing.current.startWidth + diff);
    setColWidths((prev) => ({ ...prev, [resizing.current!.key]: newWidth }));
  }, []);
  const handleMouseUp = useCallback(() => {
    resizing.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const activeWidths = mounted ? colWidths : Object.fromEntries(COLUMNS.map(c => [c.key, c.defaultWidth]));
  const cssVars = Object.fromEntries(COLUMNS.map((c) => [`--col-${c.key}`, `${activeWidths[c.key]}px`])) as React.CSSProperties;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sorted = useMemo(() => {
    const arr = [...goods];
    arr.sort((a, b) => {
      let va: any, vb: any;
      const profitA = a.retailPrice - (a.calculatedCogs ?? 0);
      const profitB = b.retailPrice - (b.calculatedCogs ?? 0);
      const marginA = a.retailPrice > 0 ? (profitA / a.retailPrice) * 100 : 0;
      const marginB = b.retailPrice > 0 ? (profitB / b.retailPrice) * 100 : 0;

      switch (sortKey) {
        case "name": va = a.name?.toLowerCase() ?? ""; vb = b.name?.toLowerCase() ?? ""; break;
        case "sku": va = a.sku?.toLowerCase() ?? ""; vb = b.sku?.toLowerCase() ?? ""; break;
        case "batchCode": va = a.batchCode?.toLowerCase() ?? ""; vb = b.batchCode?.toLowerCase() ?? ""; break;
        case "retailPrice": va = a.retailPrice ?? 0; vb = b.retailPrice ?? 0; break;
        case "quantityOnHand": va = a.quantityOnHand ?? 0; vb = b.quantityOnHand ?? 0; break;
        case "calculatedCogs": va = a.calculatedCogs ?? 0; vb = b.calculatedCogs ?? 0; break;
        case "profit": va = profitA; vb = profitB; break;
        case "margin": va = marginA; vb = marginB; break;
        default: return 0;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [goods, sortKey, sortDir]);

  const SortHeader = ({ label, column }: { label: string; column: SortKey }) => (
    <th
      className="relative p-4 cursor-pointer hover:text-text transition-colors text-text-muted text-xs uppercase tracking-wider text-center select-none"
      style={{ width: `var(--col-${column})` }}
      onClick={() => handleSort(column)}
    >
      <span className="flex items-center justify-center gap-1">
        {label}
        {sortKey === column && <span className="text-xs">{sortDir === "asc" ? "▲" : "▼"}</span>}
      </span>
      <div
        className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize bg-gray-400/15 dark:bg-gray-500/15 hover:bg-brand/40 dark:hover:bg-brand/30 transition-colors"
        onMouseDown={(e) => handleMouseDown(e, column)}
      />
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse" style={cssVars}>
        <thead>
          <tr className="border-b border-default bg-surface-widget">
            {COLUMNS.map((col) => <SortHeader key={col.key} label={col.label} column={col.key} />)}
            <th className="p-4 text-text-muted text-xs uppercase tracking-wider text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-default text-sm">
          {sorted.map((item) => (
            <FinishedGoodRow key={item.id} item={item} updateAction={updateAction} deleteAction={deleteAction} produceAction={produceAction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}