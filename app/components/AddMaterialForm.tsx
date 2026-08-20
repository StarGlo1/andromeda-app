"use client";

import { useState, useRef, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

/**
 * HelpTip component
 * Shows a small bubble with helpful text when hovering over the comet icon.
 */
function HelpTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center ml-1"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="focus:outline-none"
        aria-label="Help"
      >
        <span className="text-sm">☄️</span>
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 px-3 py-2 rounded-lg shadow-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-xs text-gray-900 dark:text-gray-100 text-center font-medium"
        >
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white dark:border-t-gray-800" />
        </span>
      )}
    </span>
  );
}

export function AddMaterialForm({
  categories: initialCategories,
  suppliers: initialSuppliers,
  locations,
  addRawMaterialAction,
  addCategoryAction,
  addSupplierAction,
}: {
  categories: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
  addRawMaterialAction: (formData: FormData) => Promise<void>;
  addCategoryAction: (formData: FormData) => Promise<{ id: string; name: string }>;
  addSupplierAction: (formData: FormData) => Promise<{ id: string; name: string }>;
}) {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  // Local state for categories and suppliers so new ones show immediately
  const [categories, setCategories] = useState(initialCategories);
  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const [categoryId, setCategoryId] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  const [supplierId, setSupplierId] = useState("");
  const [showNewSupplier, setShowNewSupplier] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [newSupplierName, setNewSupplierName] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "__new__") {
      setShowNewCategory(true);
      setCategoryId("__new__");
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
      setSupplierId("__new__");
    } else {
      setSupplierId(value);
      setShowNewSupplier(false);
    }
  };

  const handleSaveNewCategory = async () => {
    console.log("handleSaveNewCategory called");
    if (!newCategoryName.trim()) {
      console.log("Category name is empty");
      return;
    }
    const fd = new FormData();
    fd.append("name", newCategoryName.trim());
    try {
      const newCategory = await addCategoryAction(fd);
      console.log("New category created:", newCategory);
      setCategories((prev) => [...prev, newCategory]);
      setCategoryId(newCategory.id);
      setNewCategoryName("");
      setShowNewCategory(false);
      setCategoryError(false);
      showToast("Category created successfully!", "success");
    } catch (error: any) {
      console.error("Failed to create category:", error);
      showToast(error.message || "Failed to create category.", "error");
    }
  };

  const handleSaveNewSupplier = async () => {
    console.log("handleSaveNewSupplier called");
    if (!newSupplierName.trim()) {
      console.log("Supplier name is empty");
      return;
    }
    const fd = new FormData();
    fd.append("name", newSupplierName.trim());
    try {
      const newSupplier = await addSupplierAction(fd);
      console.log("New supplier created:", newSupplier);
      setSuppliers((prev) => [...prev, newSupplier]);
      setSupplierId(newSupplier.id);
      setNewSupplierName("");
      setShowNewSupplier(false);
      showToast("Supplier created successfully!", "success");
    } catch (error: any) {
      console.error("Failed to create supplier:", error);
      showToast(error.message || "Failed to create supplier.", "error");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (categoryId && categoryId !== "__new__") {
      formData.set("categoryId", categoryId);
    } else {
      setCategoryError(true);
      return;
    }
    setCategoryError(false);

    if (supplierId && supplierId !== "__new__") {
      formData.set("supplierId", supplierId);
    } else {
      formData.delete("supplierId");
    }

    if (locationId) {
      formData.set("locationId", locationId);
    } else {
      formData.delete("locationId");
    }

    startTransition(async () => {
      try {
        await addRawMaterialAction(formData);
        showToast("Material added successfully!", "success");
        formRef.current?.reset();
        setCategoryId("");
        setSupplierId("");
      } catch (error: any) {
        showToast(error.message || "Failed to add material.", "error");
      }
    });
  };

  return (
    <div className="bg-surface-widget border border-default rounded-xl p-6">
      <h2 className="text-lg font-semibold text-text mb-4">Add New Raw Material</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Material Name, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          <div className="sm:col-span-2">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Material Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Ceda Serica Wax"
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Category
            </label>

            {!showNewCategory ? (
              <select
                value={categoryId}
                onChange={handleCategoryChange}
                className={`w-full px-3 py-2 bg-bg border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm ${
                  categoryError ? "border-error ring-1 ring-error" : "border-default"
                }`}
              >
                <option value="">Select...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
                <option value="__new__" className="text-text-brand">
                  + Add new category…
                </option>
              </select>
            ) : (
              <div className="w-full">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category name"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
                <div className="mt-2 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveNewCategory}
                    className="px-4 py-1.5 rounded-full bg-[#4f8792] hover:bg-[#426f79] text-white text-xs font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategory(false);
                      setCategoryId("");
                      setNewCategoryName("");
                    }}
                    className="px-4 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {categoryError && <p className="text-error text-xs mt-1">Please select a category.</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Supplier
            </label>

            {!showNewSupplier ? (
              <select
                value={supplierId}
                onChange={handleSupplierChange}
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              >
                <option value="">None</option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
                <option value="__new__" className="text-text-brand">
                  + Add new supplier…
                </option>
              </select>
            ) : (
              <div className="w-full">
                <input
                  type="text"
                  value={newSupplierName}
                  onChange={(e) => setNewSupplierName(e.target.value)}
                  placeholder="Supplier name"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
                <div className="mt-2 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveNewSupplier}
                    className="px-4 py-1.5 rounded-full bg-[#4f8792] hover:bg-[#426f79] text-white text-xs font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewSupplier(false);
                      setSupplierId("");
                      setNewSupplierName("");
                    }}
                    className="px-4 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Location
            </label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            >
              <option value="">None</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Supplier, Barcode, Cost */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Qty
              <HelpTip text="How many items or containers you purchased. Example: 1 bottle, 5 bricks." />
            </label>
            <input
              type="number"
              step="any"
              name="quantity"
              placeholder="1"
              className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Size
              <HelpTip text="How much is in one item. Example: 16 oz, 2 lbs, 100 grams." />
            </label>
            <input
              type="number"
              step="any"
              name="sizePerUnit"
              placeholder="0"
              className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Unit
              <HelpTip text="The unit shown on the label. For example: oz, lb, g." />
            </label>
            <input
              type="text"
              name="unit"
              required
              placeholder="e.g. oz"
              className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Barcode
              <HelpTip text="Scan or type the barcode from the product label. Useful for quick scanning later." />
            </label>
            <input
              type="text"
              name="barcode"
              placeholder="e.g. 0123456789012"
              className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Photo
              <HelpTip text="Take a photo or upload from your gallery. Helps you identify this material quickly." />
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              capture="environment"
              className="w-full px-2 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-brand file:text-white hover:file:bg-brand-hover"
            />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Cost ($)
              <HelpTip text="Total price you paid for this purchase." />
            </label>
            <input
              type="number"
              step="any"
              name="purchaseTotal"
              placeholder="0.00"
              className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
        </div>

        {/* Row 3: Min, On Order, Committed Qty (optional) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Min
              <HelpTip text="Low stock alert level. You'll be notified when stock drops below this." />
            </label>
            <input
              type="number"
              step="any"
              name="reorderThreshold"
              placeholder="0"
              className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
          <div>
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              On Ord.
              <HelpTip text="Quantity already ordered from a supplier but not yet received." />
            </label>
            <input
              type="number"
              step="any"
              name="onOrderQuantity"
              placeholder="0"
              className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
        </div>

        {/* Optional section: Committed Quantity */}
        <div className="pt-6">
          <div className="h-4 sm:h-8"></div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-2">
            Optional
          </p>
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <label className="flex items-center text-text-muted text-xs font-medium uppercase mb-1">
              Committed Quantity
              <HelpTip text="Quantity reserved for upcoming production." />
            </label>
            <input
              type="number"
              step="any"
              name="committedQuantity"
              placeholder="0"
              className="w-full px-2 py-1.5 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-6 py-2 rounded-full shadow-md transition-colors text-sm disabled:opacity-50"
          >
            {isPending ? "Adding..." : "+ Add Material"}
          </button>
        </div>
      </form>
      <p className="text-text-muted text-xs mt-2">
        Cost per unit = total purchase cost ÷ (quantity × size per unit).
      </p>
    </div>
  );
}