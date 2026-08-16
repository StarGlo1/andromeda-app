// app/components/ConstellationManager.tsx

"use client";

import React, { useState } from "react";
import {
  Store,
  Plus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Package,
  Calendar,
  X,
  Network,
} from "lucide-react";

interface Location {
  id: string;
  name: string;
  type: string;
  address?: string | null;
  contactName?: string | null;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
  batches: Batch[];
}

interface Batch {
  id: string;
  locationId: string;
  datePlaced: Date;
  expectedReturnDate?: Date | null;
  returnedDate?: Date | null;
  status: string;
  notes?: string | null;
  location: Location;
  items: BatchItem[];
}

interface BatchItem {
  id: string;
  finishedGoodId: string;
  quantity: number;
  unitPrice: number;
  finishedGood: {
    id: string;
    name: string;
    retailPrice: number;
    quantityOnHand: number;
  };
}

interface FinishedGood {
  id: string;
  name: string;
  retailPrice: number;
  quantityOnHand: number;
}

interface Props {
  locations: Location[];
  batches: Batch[];
  finishedGoods: FinishedGood[];
  addLocationAction: (formData: FormData) => Promise<void>;
  deleteLocationAction: (formData: FormData) => Promise<void>;
  createBatchAction: (formData: FormData) => Promise<void>;
  markBatchReturnedAction: (formData: FormData) => Promise<void>;
}

const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[#faf8f5] dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent";

export function ConstellationManager({
  locations,
  batches,
  finishedGoods,
  addLocationAction,
  deleteLocationAction,
  createBatchAction,
  markBatchReturnedAction,
}: Props) {
  const [activeTab, setActiveTab] = useState<"locations" | "batches">("locations");
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showNewBatch, setShowNewBatch] = useState(false);
  const [batchItems, setBatchItems] = useState<
    Array<{ finishedGoodId: string; quantity: number; unitPrice: number }>
  >([]);

  const activeBatches = batches.filter((batch) => batch.status === "active");

  const handleAddLocation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addLocationAction(formData);
    setShowAddLocation(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    const formData = new FormData();
    formData.append("id", id);
    await deleteLocationAction(formData);
  };

  const handleCreateBatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("items", JSON.stringify(batchItems));
    await createBatchAction(formData);
    setShowNewBatch(false);
    setBatchItems([]);
    (e.target as HTMLFormElement).reset();
  };

  const handleMarkReturned = async (batchId: string) => {
    if (!confirm("Mark this batch as returned? Items will be added back to inventory.")) return;
    const formData = new FormData();
    formData.append("batchId", batchId);
    await markBatchReturnedAction(formData);
  };

  const addProductToBatch = (finishedGoodId: string) => {
    const product = finishedGoods.find((fg) => fg.id === finishedGoodId);
    if (!product) return;
    
    setBatchItems((prev) => {
      const existing = prev.find((item) => item.finishedGoodId === finishedGoodId);
      if (existing) {
        return prev.map((item) =>
          item.finishedGoodId === finishedGoodId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { finishedGoodId, quantity: 1, unitPrice: product.retailPrice }];
    });
  };

  const updateBatchItemQuantity = (finishedGoodId: string, quantity: number) => {
    if (quantity <= 0) {
      setBatchItems((prev) => prev.filter((item) => item.finishedGoodId !== finishedGoodId));
    } else {
      setBatchItems((prev) =>
        prev.map((item) =>
          item.finishedGoodId === finishedGoodId ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
        <button
          onClick={() => setActiveTab("locations")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "locations"
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-[#ede6dc] text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-[#e5dcd0] dark:hover:bg-gray-700"
          }`}
        >
          Outposts ({locations.length})
        </button>
        <button
          onClick={() => setActiveTab("batches")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "batches"
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-[#ede6dc] text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-[#e5dcd0] dark:hover:bg-gray-700"
          }`}
        >
          Active Batches ({activeBatches.length})
        </button>
      </div>

      {/* Locations Tab */}
      {activeTab === "locations" && (
        <div className="space-y-4">
          <button
            onClick={() => setShowAddLocation(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Outpost
          </button>

          {/* Add Location Form */}
          {showAddLocation && (
            <form onSubmit={handleAddLocation} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add New Outpost</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Outpost Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={inputClass}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    className={inputClass}
                  >
                    <option value="storefront">Storefront</option>
                    <option value="farmers_market">Farmers Market</option>
                    <option value="mobile">Mobile</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    className={inputClass}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className={inputClass}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={inputClass}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className={inputClass}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    className={inputClass}
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Save Outpost
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddLocation(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#c5d9dd] dark:bg-teal-900/30 flex items-center justify-center">
                      <Network className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {location.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {location.type.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteLocation(location.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {(location.contactName || location.phone || location.email) && (
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {location.contactName && (
                      <p className="flex items-center gap-2">
                        <Store className="w-3 h-3" />
                        {location.contactName}
                      </p>
                    )}
                    {location.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {location.phone}
                      </p>
                    )}
                    {location.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {location.email}
                      </p>
                    )}
                  </div>
                )}

                {location.address && (
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-3 h-3" />
                    {location.address}
                  </p>
                )}

                {location.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    {location.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Batches Tab */}
      {activeTab === "batches" && (
        <div className="space-y-4">
          <button
            onClick={() => setShowNewBatch(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Batch
          </button>

          {/* New Batch Form */}
          {showNewBatch && (
            <form onSubmit={handleCreateBatch} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create New Batch</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Outpost *
                  </label>
                  <select
                    name="locationId"
                    required
                    className={inputClass}
                  >
                    <option value="">Select outpost...</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Placed
                  </label>
                  <input
                    type="date"
                    name="datePlaced"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className={inputClass}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expected Return Date
                  </label>
                  <input
                    type="date"
                    name="expectedReturnDate"
                    className={inputClass}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <input
                    type="text"
                    name="notes"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add Products
                </h4>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addProductToBatch(e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className={inputClass}
                >
                  <option value="">Select product to add...</option>
                  {finishedGoods.map((fg) => (
                    <option key={fg.id} value={fg.id}>
                      {fg.name} (Stock: {fg.quantityOnHand})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Items */}
              {batchItems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Selected Items
                  </h4>
                  {batchItems.map((item) => {
                    const product = finishedGoods.find((fg) => fg.id === item.finishedGoodId);
                    return (
                      <div
                        key={item.finishedGoodId}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {product?.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateBatchItemQuantity(item.finishedGoodId, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateBatchItemQuantity(item.finishedGoodId, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => updateBatchItemQuantity(item.finishedGoodId, 0)}
                            className="ml-2 p-1 text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={batchItems.length === 0}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Batch
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewBatch(false);
                    setBatchItems([]);
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Active Batches List */}
          <div className="space-y-4">
            {activeBatches.map((batch) => (
              <div
                key={batch.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d6d1e0] dark:bg-purple-900/30 flex items-center justify-center">
                      <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {batch.location.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Placed: {new Date(batch.datePlaced).toLocaleDateString()}
                        {batch.expectedReturnDate && (
                          <> | Expected: {new Date(batch.expectedReturnDate).toLocaleDateString()}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMarkReturned(batch.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Mark Returned
                  </button>
                </div>

                {/* Batch Items */}
                <div className="space-y-2">
                  {batch.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.finishedGood.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity} | Unit Price: ${item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {batch.notes && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    Notes: {batch.notes}
                  </p>
                )}
              </div>
            ))}

            {activeBatches.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No active batches</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}