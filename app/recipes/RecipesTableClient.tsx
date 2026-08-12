"use client";

import { useState, useMemo } from "react";

type SortKey = "name" | "ingredients" | "cogs" | "createdAt" | "updatedAt";

export function RecipesTableClient({ goods }: { goods: any[] }) {
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
    const arr = [...goods];
    arr.sort((a, b) => {
      let va: any, vb: any;
      switch (sortKey) {
        case "name":
          va = a.name.toLowerCase();
          vb = b.name.toLowerCase();
          break;
        case "ingredients":
          va = a.recipeItems.length;
          vb = b.recipeItems.length;
          break;
        case "cogs":
          va = a.calculatedCogs ?? 0;
          vb = b.calculatedCogs ?? 0;
          break;
        case "createdAt":
          va = new Date(a.createdAt).getTime();
          vb = new Date(b.createdAt).getTime();
          break;
        case "updatedAt":
          va = new Date(a.updatedAt).getTime();
          vb = new Date(b.updatedAt).getTime();
          break;
        default:
          return 0;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [goods, sortKey, sortDir]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };

  const SortHeader = ({ label, column }: { label: string; column: SortKey }) => (
    <th
      className="p-4 cursor-pointer hover:text-text transition-colors text-text-muted text-xs uppercase tracking-wider"
      onClick={() => handleSort(column)}
    >
      <span className="flex items-center gap-1">
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
        <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
          <SortHeader label="Product" column="name" />
          <SortHeader label="Ingredients" column="ingredients" />
          <SortHeader label="COGS" column="cogs" />
          <SortHeader label="Created" column="createdAt" />
          <SortHeader label="Last Edited" column="updatedAt" />
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-default text-sm">
        {sorted.map((good) => (
          <tr key={good.id} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
            <td className="p-4 font-medium text-text">{good.name}</td>
            <td className="p-4 text-text-secondary">
              {good.recipeItems.length} ingredient{good.recipeItems.length !== 1 && "s"}
            </td>
            <td className="p-4 text-text-secondary">
              {good.calculatedCogs ? `$${good.calculatedCogs.toFixed(2)}` : "—"}
            </td>
            <td className="p-4 text-text-secondary">{formatDate(good.createdAt)}</td>
            <td className="p-4 text-text-secondary">{formatDate(good.updatedAt)}</td>
            <td className="p-4">
              <a
                href={`/finished-goods/${good.id}/recipe`}
                className="text-text-brand hover:underline text-xs font-medium"
              >
                View Recipe
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}