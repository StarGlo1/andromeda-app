"use client";

import { useState, useRef, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

function FieldTooltip({ text }: { text: string }) {
  // ... same as before ...
}

export function AddMaterialForm({
  categories,
  suppliers,
  addRawMaterialAction,
  addCategoryAction,
  addSupplierAction,
}: {
  categories: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
  addRawMaterialAction: (formData: FormData) => Promise<void>;
  addCategoryAction: (formData: FormData) => Promise<void>;
  addSupplierAction: (formData: FormData) => Promise<void>;
}) {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isPending, startTransition] = useTransition();

  const [categoryId, setCategoryId] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  const [supplierId, setSupplierId] = useState("");
  const [showNewSupplier, setShowNewSupplier] = useState(false);
  const [newSupplierName, setNewSupplierName] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "__new__") {
      setShowNewCategory(true);
      setCategoryId("");
      setCategoryError(false);
    } else {
      setCategoryId(value);
      setCategoryError(false);
      setShowNewCategory(false);
    }
  };

  const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "__new__") {
      setShowNewSupplier(true);
      setSupplierId("");
    } else {
      setSupplierId(value);
      setShowNewSupplier(false);
    }
  };

  const handleSaveNewCategory = async () => {
    if (!newCategoryName.trim()) return;
    const fd = new FormData();
    fd.append("name", newCategoryName.trim());
    try {
      await addCategoryAction(fd);
      showToast("Category created successfully!", "success");
      setShowNewCategory(false);
      setNewCategoryName("");
    } catch (error) {
      showToast("Failed to create category.", "error");
    }
  };

  const handleSaveNewSupplier = async () => {
    if (!newSupplierName.trim()) return;
    const fd = new FormData();
    fd.append("name", newSupplierName.trim());
    try {
      await addSupplierAction(fd);
      showToast("Supplier created successfully!", "success");
      setShowNewSupplier(false);
      setNewSupplierName("");
    } catch (error) {
      showToast("Failed to create supplier.", "error");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (categoryId) {
      formData.set("categoryId", categoryId);
    } else {
      setCategoryError(true);
      return;
    }
    setCategoryError(false);

    if (supplierId) {
      formData.set("supplierId", supplierId);
    } else {
      formData.delete("supplierId");
    }

    startTransition(async () => {
      try {
        await addRawMaterialAction(formData);
        showToast("Material added successfully!", "success");
        formRef.current?.reset();
        setRefreshKey((k) => k + 1);
        setCategoryId("");
        setSupplierId("");
      } catch (error: any) {
        showToast(error.message || "Failed to add material.", "error");
      }
    });
  };

  return (
    <div className="bg-surface-widget border border-default rounded-xl p-6" key={refreshKey}>
      <h2 className="text-lg font-semibold text-text mb-4">Add New Raw Material</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end">
          <div className="sm:col-span-2">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Material Name</label>
            <input type="text" name="name" required placeholder="e.g. Ceda Serica Wax" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Category</label>
            {!showNewCategory ? (
              <select value={categoryId} onChange={handleCategoryChange} className={`w-full px-3 py-2 bg-bg border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm ${categoryError ? "border-error ring-1 ring-error" : "border-default"}`}>
                <option value="">Select...</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                <option value="__new__" className="text-text-brand">+ Add new category…</option>
              </select>
            ) : (
              <div className="flex items-center gap-1">
                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Category name" className="flex-1 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
                <button type="button" onClick={handleSaveNewCategory} className="text-text-brand hover:underline text-xs font-medium">Save</button>
                <button type="button" onClick={() => setShowNewCategory(false)} className="text-text-muted hover:text-text text-xs font-medium">Cancel</button>
              </div>
            )}
            {categoryError && <p className="text-error text-xs mt-1">Please select a category.</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Supplier</label>
            {!showNewSupplier ? (
              <select value={supplierId} onChange={handleSupplierChange} className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm">
                <option value="">None</option>
                {suppliers.map((sup) => <option key={sup.id} value={sup.id}>{sup.name}</option>)}
                <option value="__new__" className="text-text-brand">+ Add new supplier…</option>
              </select>
            ) : (
              <div className="flex items-center gap-1">
                <input type="text" value={newSupplierName} onChange={(e) => setNewSupplierName(e.target.value)} placeholder="Supplier name" className="flex-1 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
                <button type="button" onClick={handleSaveNewSupplier} className="text-text-brand hover:underline text-xs font-medium">Save</button>
                <button type="button" onClick={() => setShowNewSupplier(false)} className="text-text-muted hover:text-text text-xs font-medium">Cancel</button>
              </div>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-4 items-end">
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Qty
              <FieldTooltip text="How many bottles, bags, or containers you bought." />
            </label>
            <input type="number" step="any" name="quantity" placeholder="1" className="w-full px-2 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Size
              <FieldTooltip text="The size or weight of each bottle, bag, or container." />
            </label>
            <input type="number" step="any" name="sizePerUnit" placeholder="0" className="w-full px-2 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Unit
              <FieldTooltip text="Unit of measurement (e.g. oz, lb, each)." />
            </label>
            <input type="text" name="unit" required placeholder="e.g. oz" className="w-full px-2 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Cost ($)
              <FieldTooltip text="The total price you paid." />
            </label>
            <input type="number" step="any" name="purchaseTotal" placeholder="0.00" className="w-full px-2 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Min
              <FieldTooltip text="Alert when stock drops below this number." />
            </label>
            <input type="number" step="any" name="reorderThreshold" placeholder="0" className="w-full px-2 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Comm.
              <FieldTooltip text="Reserved for production." />
            </label>
            <input type="number" step="any" name="committedQuantity" placeholder="0" className="w-full px-2 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              On Ord.
              <FieldTooltip text="Ordered but not yet received." />
            </label>
            <input type="number" step="any" name="onOrderQuantity" placeholder="0" className="w-full px-2 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm h-[40px] disabled:opacity-50"
        >
          {isPending ? "Adding..." : "+ Add Material"}
        </button>
      </form>
      <p className="text-text-muted text-xs mt-2">Cost per unit = total purchase cost ÷ (quantity × size per unit).</p>
    </div>
  );
}