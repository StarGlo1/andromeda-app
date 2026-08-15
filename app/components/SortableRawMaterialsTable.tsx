"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { MaterialRow } from "../MaterialRow";

type SortKey =
  | "name"
  | "category"
  | "totalQuantity"
  | "sizePerUnit"
  | "unit"
  | "availableStock"
  | "costPerUnit"
  | "supplier"
  | "reorderThreshold";

const COLUMNS: { key: SortKey; label: string; defaultWidth: number }[] = [
  { key: "name", label: "Material\nName", defaultWidth: 130 },
  { key: "category", label: "Category", defaultWidth: 90 },
  { key: "totalQuantity", label: "Containers", defaultWidth: 75 },
  { key: "sizePerUnit", label: "Size / Unit", defaultWidth: 75 },
  { key: "unit", label: "Unit", defaultWidth: 50 },
  { key: "availableStock", label: "Total\nStock", defaultWidth: 100 },
  { key: "costPerUnit", label: "Unit\nCost", defaultWidth: 75 },
  { key: "supplier", label: "Supplier", defaultWidth: 90 },
  { key: "reorderThreshold", label: "Reorder", defaultWidth: 65 },
];

const PAGE_SIZE = 15;

function loadSavedWidths(): Record<string, number> {
  try {
    const saved = localStorage.getItem("materialColWidths");
    if (saved) return JSON.parse(saved);
  } catch {}
  const defaults: Record<string, number> = {};
  COLUMNS.forEach((c) => (defaults[c.key] = c.defaultWidth));
  return defaults;
}

export function SortableRawMaterialsTable({
  materials,
  categories,
  suppliers,
  updateAction,
  deleteAction,
  addCategoryAction,
  addSupplierAction,
}: {
  materials: any[];
  categories: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  addCategoryAction: (formData: FormData) => Promise<void>;
  addSupplierAction: (formData: FormData) => Promise<void>;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [colWidths, setColWidths] = useState<Record<string, number>>(
    Object.fromEntries(COLUMNS.map((c) => [c.key, c.defaultWidth]))
  );
  const [mounted, setMounted] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSupplier, setFilterSupplier] = useState("");
  const [filterUnit, setFilterUnit] = useState("");
  const [filterLowStockOnly, setFilterLowStockOnly] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);

  const allUnits = useMemo(() => {
    const units = new Set<string>();
    materials.forEach((m) => {
      if (m.unit) units.add(m.unit);
    });
    return Array.from(units).sort();
  }, [materials]);

  useEffect(() => {
    setMounted(true);
    const saved = loadSavedWidths();
    setColWidths(saved);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("materialColWidths", JSON.stringify(colWidths));
    }
  }, [colWidths, mounted]);

  const resizingRef = useRef<{ key: string; startX: number; startWidth: number } | null>(null);

  const startResize = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    resizingRef.current = { key, startX: e.clientX, startWidth: colWidths[key] };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    const current = resizingRef.current;
    if (!current) return;
    const diff = e.clientX - current.startX;
    const newWidth = Math.max(40, current.startWidth + diff);
    const key = current.key;
    setColWidths((prev) => ({ ...prev, [key]: newWidth }));
  }, []);

  const onMouseUp = useCallback(() => {
    resizingRef.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let result = materials;
    if (filterCategory) result = result.filter((m) => m.categoryId === filterCategory);
    if (filterSupplier) result = result.filter((m) => m.supplierId === filterSupplier);
    if (filterUnit) result = result.filter((m) => m.unit === filterUnit);
    if (filterLowStockOnly)
      result = result.filter(
        (m) => m.reorderThreshold !== null && (m.totalQuantity ?? 0) <= m.reorderThreshold
      );
    return result;
  }, [materials, filterCategory, filterSupplier, filterUnit, filterLowStockOnly]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let va: any, vb: any;
      switch (sortKey) {
        case "name":
          va = a.name?.toLowerCase() ?? "";
          vb = b.name?.toLowerCase() ?? "";
          break;
        case "category":
          va = a.category?.name?.toLowerCase() ?? "";
          vb = b.category?.name?.toLowerCase() ?? "";
          break;
        case "totalQuantity":
          va = a.quantity ?? 0;
          vb = b.quantity ?? 0;
          break;
        case "sizePerUnit":
          va = a.sizePerUnit ?? 0;
          vb = b.sizePerUnit ?? 0;
          break;
        case "unit":
          va = (a.unit ?? "").toLowerCase();
          vb = (b.unit ?? "").toLowerCase();
          break;
        case "availableStock":
          va = (a.totalQuantity ?? 0) - (a.committedQuantity ?? 0) + (a.onOrderQuantity ?? 0);
          vb = (b.totalQuantity ?? 0) - (b.committedQuantity ?? 0) + (b.onOrderQuantity ?? 0);
          break;
        case "costPerUnit":
          va = a.costPerUnit ?? 0;
          vb = b.costPerUnit ?? 0;
          break;
        case "supplier":
          va = a.supplier?.name?.toLowerCase() ?? "";
          vb = b.supplier?.name?.toLowerCase() ?? "";
          break;
        case "reorderThreshold":
          va = a.reorderThreshold ?? 0;
          vb = b.reorderThreshold ?? 0;
          break;
        default:
          return 0;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = viewAll
    ? sorted
    : sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const SortHeader = ({ label, column }: { label: string; column: SortKey }) => {
    const lines = label.split("\n");
    const isSingleWord = lines.length === 1;

    return (
      <th
        className="relative p-3 cursor-pointer hover:text-text transition-colors text-text-muted text-[15px] uppercase tracking-wider text-center select-none whitespace-nowrap"
        style={{ width: `${colWidths[column]}px`, minWidth: `${colWidths[column]}px` }}
        onClick={() => handleSort(column)}
      >
        <span
          className={`flex ${isSingleWord ? "items-center" : "flex-col items-center justify-center gap-0.5 leading-tight"}`}
        >
          {lines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </span>
        {sortKey === column && <span className="text-[15px]">{sortDir === "asc" ? "▲" : "▼"}</span>}
        <div
          className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize bg-gray-400/10 dark:bg-gray-500/10 hover:bg-brand/30 dark:hover:bg-brand/30 transition-colors"
          onMouseDown={(e) => startResize(e, column)}
        />
      </th>
    );
  };

  return (
    <div className="w-full">
      {/* Filter bar */}
      <div className="p-3 border-b border-default flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            showFilters
              ? "bg-[#4f8792] text-white"
              : "bg-surface border border-default text-text-muted hover:bg-brand-muted"
          }`}
        >
          Filters {filtered.length < materials.length ? `(${filtered.length})` : ""}
        </button>
        {showFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2 py-1.5 bg-bg border border-default rounded text-text text-xs"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
              className="px-2 py-1.5 bg-bg border border-default rounded text-text text-xs"
            >
              <option value="">All Suppliers</option>
              {suppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
                </option>
              ))}
            </select>
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="px-2 py-1.5 bg-bg border border-default rounded text-text text-xs"
            >
              <option value="">All Units</option>
              {allUnits.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-1.5 text-xs text-text-muted">
              <input
                type="checkbox"
                checked={filterLowStockOnly}
                onChange={(e) => setFilterLowStockOnly(e.target.checked)}
                className="rounded border-default accent-brand"
              />
              Low Stock Only
            </label>
            <button
              onClick={() => {
                setFilterCategory("");
                setFilterSupplier("");
                setFilterUnit("");
                setFilterLowStockOnly(false);
              }}
              className="text-text-brand hover:underline text-xs"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" style={{ tableLayout: "auto" }}>
          <thead>
            <tr className="border-b border-default bg-[#d3dfe1]">
              {COLUMNS.map((col) => (
                <SortHeader key={col.key} label={col.label} column={col.key} />
              ))}
              <th className="p-3 text-text-muted text-[15px] uppercase tracking-wider text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default text-sm">
            {paginated.map((item, index) => (
              <MaterialRow
                key={item.id}
                item={item}
                categories={categories}
                suppliers={suppliers}
                updateAction={updateAction}
                deleteAction={deleteAction}
                addCategoryAction={addCategoryAction}
                addSupplierAction={addSupplierAction}
                rowIndex={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-3 border-t border-default flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="text-text-brand hover:underline"
          >
            {viewAll ? "Paginate" : "View All"}
          </button>
          <span className="text-text-muted">
            {viewAll
              ? `${sorted.length} items`
              : `${sorted.length} items · Page ${currentPage} of ${totalPages}`}
          </span>
        </div>
        {!viewAll && totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded bg-surface border border-default text-text-muted disabled:opacity-40 hover:bg-brand-muted"
            >
              «
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded bg-surface border border-default text-text-muted disabled:opacity-40 hover:bg-brand-muted"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-2 py-1 rounded-full border ${
                  page === currentPage
                    ? "bg-[#4f8792] text-white border-[#4f8792]"
                    : "bg-surface border-default text-text-muted hover:bg-brand-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded bg-surface border border-default text-text-muted disabled:opacity-40 hover:bg-brand-muted"
            >
              ›
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded bg-surface border border-default text-text-muted disabled:opacity-40 hover:bg-brand-muted"
            >
              »
            </button>
          </div>
        )}
      </div>
    </div>
  );
}