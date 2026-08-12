"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { RecipeRow } from "./RecipeRow";
import { convertToPricingUnit } from "@/app/lib/units";

type SortKey = "material" | "quantity" | "unit" | "unitCost" | "lineTotal";

const COLUMNS: { key: SortKey; label: string; defaultWidth: number }[] = [
  { key: "material", label: "Material", defaultWidth: 180 },
  { key: "quantity", label: "Quantity", defaultWidth: 90 },
  { key: "unit", label: "Unit", defaultWidth: 70 },
  { key: "unitCost", label: "Unit Cost", defaultWidth: 100 },
  { key: "lineTotal", label: "Line Total", defaultWidth: 100 },
];

function loadSavedWidths(): Record<string, number> {
  try {
    const saved = localStorage.getItem("recipeColWidths");
    if (saved) return JSON.parse(saved);
  } catch {}
  const defaults: Record<string, number> = {};
  COLUMNS.forEach((c) => (defaults[c.key] = c.defaultWidth));
  return defaults;
}

interface RecipeItem {
  id: string;
  requiredQuantity: number;
  unit: string;
  rawMaterial: {
    name: string;
    unit: string | null;
    costPerUnit: number | null;
  } | null;
  subAssembly: {
    name: string;
    calculatedCogs: number | null;
  } | null;
  subAssemblyId: string | null;
}

export function RecipeTableClient({
  items,
  finishedGoodId,
  updateAction,
  deleteAction,
}: {
  items: RecipeItem[];
  finishedGoodId: string;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("material");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [colWidths, setColWidths] = useState(loadSavedWidths);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted) localStorage.setItem("recipeColWidths", JSON.stringify(colWidths));
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

  const sortedItems = useMemo(() => {
    const sorted = [...items];
    sorted.sort((a, b) => {
      let va: any, vb: any;
      const nameA = a.rawMaterial?.name ?? a.subAssembly?.name ?? "";
      const nameB = b.rawMaterial?.name ?? b.subAssembly?.name ?? "";
      switch (sortKey) {
        case "material":
          va = nameA.toLowerCase();
          vb = nameB.toLowerCase();
          break;
        case "quantity":
          va = a.requiredQuantity;
          vb = b.requiredQuantity;
          break;
        case "unit":
          va = (a.unit === "1" ? "each" : a.unit).toLowerCase();
          vb = (b.unit === "1" ? "each" : b.unit).toLowerCase();
          break;
        case "unitCost": {
          const costA = a.subAssemblyId
            ? (a.subAssembly?.calculatedCogs ?? 0)
            : (a.rawMaterial?.costPerUnit ?? 0);
          const costB = b.subAssemblyId
            ? (b.subAssembly?.calculatedCogs ?? 0)
            : (b.rawMaterial?.costPerUnit ?? 0);
          va = costA;
          vb = costB;
          break;
        }
        case "lineTotal": {
          const qtyA = a.requiredQuantity;
          const unitA = a.unit;
          const matUnitA = a.subAssemblyId ? "unit" : (a.rawMaterial?.unit ?? null);
          const costA = a.subAssemblyId
            ? (a.subAssembly?.calculatedCogs ?? 0)
            : (a.rawMaterial?.costPerUnit ?? 0);
          const convertedA = convertToPricingUnit(qtyA, unitA, matUnitA);
          va = convertedA * costA;

          const qtyB = b.requiredQuantity;
          const unitB = b.unit;
          const matUnitB = b.subAssemblyId ? "unit" : (b.rawMaterial?.unit ?? null);
          const costB = b.subAssemblyId
            ? (b.subAssembly?.calculatedCogs ?? 0)
            : (b.rawMaterial?.costPerUnit ?? 0);
          const convertedB = convertToPricingUnit(qtyB, unitB, matUnitB);
          vb = convertedB * costB;
          break;
        }
        default:
          return 0;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [items, sortKey, sortDir]);

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
          {sortedItems.map((item) => (
            <RecipeRow
              key={item.id}
              item={item}
              finishedGoodId={finishedGoodId}
              updateAction={updateAction}
              deleteAction={deleteAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}