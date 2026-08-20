"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

interface Location {
  id: string;
  name: string;
  address: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function LocationsPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchLocations = useCallback(async () => {
    const res = await fetch("/api/locations");
    if (res.ok) {
      const data = await res.json();
      setLocations(data);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const openCreate = () => {
    setEditingLocation(null);
    setName("");
    setAddress("");
    setNotes("");
    setShowForm(true);
  };

  const openEdit = (loc: Location) => {
    setEditingLocation(loc);
    setName(loc.name);
    setAddress(loc.address || "");
    setNotes(loc.notes || "");
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Location name is required.");
      return;
    }

    setSaving(true);
    try {
      const url = editingLocation
        ? `/api/locations/${editingLocation.id}`
        : "/api/locations";
      const method = editingLocation ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          address: address.trim() || null,
          notes: notes.trim() || null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save location");
      }

      setShowForm(false);
      fetchLocations();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this location?")) return;
    try {
      const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete location");
      }
      fetchLocations();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text">Locations</h1>
          <button
            onClick={openCreate}
            className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            + New Location
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowForm(false)}>
            <div className="bg-surface-widget border border-default rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-bold text-text mb-4">
                {editingLocation ? "Edit Location" : "New Location"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Home Studio, Market Booth"
                    className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, City, State"
                    className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional details..."
                    rows={3}
                    className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-y"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    style={{ backgroundColor: "#4f8792", color: "white", border: "1px solid #3d6d77" }}
                    className="flex-1 font-medium px-4 py-2 rounded-lg transition-colors text-sm disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingLocation ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-surface border border-default text-text hover:bg-surface-elevated font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
          {locations.length === 0 ? (
            <div className="p-8 text-center text-text-muted text-sm">
              No locations yet. Add your first one!
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-default text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-3">Name</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Notes</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {locations.map((loc) => (
                  <tr key={loc.id} className="hover:bg-surface">
                    <td className="p-3 font-medium text-text">{loc.name}</td>
                    <td className="p-3 text-text-muted text-sm">{loc.address || "—"}</td>
                    <td className="p-3 text-text-muted text-sm">{loc.notes || "—"}</td>
                    <td className="p-3 text-center">
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => openEdit(loc)}
                          className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(loc.id)}
                          className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/40 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
    </div>
  );
}
