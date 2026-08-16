"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";

interface Material {
  id: string;
  name: string;
}

const REASONS = ["Testing", "Gifted", "Loss", "Damage", "Restock", "Correction"];

interface Filters {
  materialId: string;
  reason: string;
  startDate: string;
  endDate: string;
}

export function AdjustmentHistoryFilters({
  materials,
  onFilterChange,
}: {
  materials: Material[];
  onFilterChange: (filters: Filters) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [materialId, setMaterialId] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applyFilters = () => {
    onFilterChange({ materialId, reason, startDate, endDate });
  };

  const clearFilters = () => {
    setMaterialId("");
    setReason("");
    setStartDate("");
    setEndDate("");
    onFilterChange({ materialId: "", reason: "", startDate: "", endDate: "" });
  };

  const hasActiveFilters = materialId || reason || startDate || endDate;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            showFilters || hasActiveFilters
              ? "bg-[#4f8792] text-white"
              : "bg-bg border border-default text-text-muted hover:bg-[#c5d9dd]"
          }`}
        >
          <Filter className="w-3 h-3" />
          {hasActiveFilters ? "Filters Active" : "Filter"}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-bg border border-default rounded-lg">
          {/* Material Filter */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Material</label>
            <select
              value={materialId}
              onChange={(e) => setMaterialId(e.target.value)}
              className="w-full px-2 py-1.5 bg-surface-widget border border-default rounded-lg text-text text-sm"
            >
              <option value="">All Materials</option>
              {materials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reason Filter */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-2 py-1.5 bg-surface-widget border border-default rounded-lg text-text text-sm"
            >
              <option value="">All Reasons</option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">From Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-2 py-1.5 bg-surface-widget border border-default rounded-lg text-text text-sm"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">To Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-2 py-1.5 bg-surface-widget border border-default rounded-lg text-text text-sm"
            />
          </div>

          {/* Apply Button */}
          <div className="sm:col-span-4 flex justify-end">
            <button
              onClick={applyFilters}
              className="bg-[#4f8792] hover:bg-[#426f79] text-white text-xs font-medium px-4 py-2 rounded-full transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}