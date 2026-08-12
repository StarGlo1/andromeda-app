"use client";

import { useState, useMemo } from "react";
import { SupplierRow } from "./SupplierRow";

type SortKey = "name" | "contact" | "website" | "notes";

export function SupplierTable({
  suppliers,
  updateAction,
  deleteAction,
}: {
  suppliers: any[];
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    const arr = [...suppliers];
    arr.sort((a, b) => {
      let va: any, vb: any;
      switch (sortKey) {
        case "name": va = a.name?.toLowerCase() ?? ""; vb = b.name?.toLowerCase() ?? ""; break;
        case "contact": va = a.contact?.toLowerCase() ?? ""; vb = b.contact?.toLowerCase() ?? ""; break;
        case "website": va = a.website?.toLowerCase() ?? ""; vb = b.website?.toLowerCase() ?? ""; break;
        case "notes": va = a.notes?.toLowerCase() ?? ""; vb = b.notes?.toLowerCase() ?? ""; break;
        default: return 0;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [suppliers, sortKey, sortDir]);

  const SortHeader = ({ label, column }: { label: string; column: SortKey }) => (
    <th
      className="p-4 cursor-pointer hover:text-text transition-colors text-text-muted text-xs uppercase tracking-wider text-center"
      onClick={() => handleSort(column)}
    >
      <span className="flex items-center justify-center gap-1">
        {label}
        {sortKey === column && (
          <span className="text-xs">{sortDir === "asc" ? "▲" : "▼"}</span>
        )}
      </span>
    </th>
  );

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-default bg-surface-widget">
          <SortHeader label="Name" column="name" />
          <SortHeader label="Contact" column="contact" />
          <SortHeader label="Website" column="website" />
          <SortHeader label="Notes" column="notes" />
          <th className="p-4 text-text-muted text-xs uppercase tracking-wider text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-default text-sm">
        {sorted.map((supplier) => (
          <SupplierRow
            key={supplier.id}
            supplier={supplier}
            updateAction={updateAction}
            deleteAction={deleteAction}
          />
        ))}
      </tbody>
    </table>
  );
}