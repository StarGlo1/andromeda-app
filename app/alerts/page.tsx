"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { syncAlerts } from "@/app/actions/alertSync";

type Alert = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  severity: string;
  status: string;
  referenceId: string | null;
  referenceType: string | null;
  location: string | null;
  createdAt: string;
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("active");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const loadAlerts = async () => {
    try {
      await syncAlerts();
      const params = new URLSearchParams();
      if (filterType !== "all") params.append("type", filterType);
      if (filterStatus !== "all") params.append("status", filterStatus);
      if (startDate) params.append("start", startDate);
      if (endDate) params.append("end", endDate);
      const res = await fetch(`/api/alerts?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setAlerts(data);
      } else {
        console.error("Failed to fetch alerts");
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  };

  useEffect(() => {
    startTransition(() => {
      loadAlerts();
    });
  }, [filterType, filterStatus, startDate, endDate]);

  const handleResolve = async (id: string) => {
    try {
      const res = await fetch(`/api/alerts/${id}/resolve`, { method: "POST" });
      if (res.ok) {
        loadAlerts();
      } else {
        console.error("Failed to resolve alert");
      }
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text mt-3">Alerts & Warnings</h1>
          <p className="text-sm text-text-muted mt-1">
            Monitor low stock, pending orders, and sales issues.
          </p>
        </div>
        <button
          onClick={() => loadAlerts()}
          className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-surface-widget border border-default rounded-xl p-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="all">All Types</option>
            <option value="LOW_STOCK">Low Stock</option>
            <option value="NEGATIVE_STOCK">Negative Stock</option>
            <option value="PENDING_PO">Pending PO</option>
            <option value="OVERDUE_PO">Overdue PO</option>
            <option value="REFUNDED_SALE">Refunded Sale</option>
            <option value="UNPAID_SALE">Unpaid Sale</option>
          </select>
        </div>
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
            <option value="all">All</option>
          </select>
        </div>
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-text-muted text-xs font-medium uppercase mb-1">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* Alerts table */}
      <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-default text-xs uppercase tracking-wider text-text-muted">
                <th className="p-4">Date</th>
                <th className="p-4">Type</th>
                <th className="p-4">Title</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default text-sm">
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-text-muted">
                    No alerts found.
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                    <td className="p-4 text-text-secondary">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#c5d9dd] text-[#3d5a60]">
                        {alert.type}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-text">{alert.title}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === "critical"
                          ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                          : alert.severity === "warning"
                          ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                          : "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                      }`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === "active"
                          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {alert.status === "active" && (
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="text-[#4f8792] dark:text-teal-400 hover:underline text-sm font-medium"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}