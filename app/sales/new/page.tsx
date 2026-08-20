"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";
import { createSaleAction, createCustomerAction } from "./actions";
import { getCustomersAction, getProductsAction } from "./loadData";
import { Plus, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  retailPrice: number;
  quantityOnHand: number;
}

interface Customer {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
}

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const SALE_CHANNELS = [
  { value: "", label: "Walk-in Customer", example: "In-person purchase at studio or market" },
  { value: "online", label: "🛒 Online Order", example: "Website, Etsy, Shopify" },
  { value: "mobile", label: "📱 Mobile Order", example: "Phone call or text order" },
  { value: "gift", label: "🎁 Gift (No Payment)", example: "Complimentary or promo item" },
  { value: "wholesale", label: "🏪 Wholesale", example: "Sold to a retailer or store" },
  { value: "event", label: "🎪 Event Sale", example: "Craft fair, pop-up, market" },
];

export default function NewSalePage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [saleChannel, setSaleChannel] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [status, setStatus] = useState("Paid");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newCustomerNotes, setNewCustomerNotes] = useState("");
  const [creatingCustomer, setCreatingCustomer] = useState(false);

  const [showChannelLegend, setShowChannelLegend] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [customersData, productsData] = await Promise.all([
          getCustomersAction(),
          getProductsAction(),
        ]);
        setCustomers(customersData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to load data:", error);
        showToast("Failed to load data. Please refresh.", "error");
      }
    };
    loadData();
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  const addProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    if (product.quantityOnHand <= 0) {
      showToast(`"${product.name}" is out of stock.`, "error");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        if (existing.quantity >= product.quantityOnHand) {
          showToast(`Only ${product.quantityOnHand} units available.`, "error");
          return prev;
        }
        return prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.unitPrice,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.retailPrice,
          totalPrice: product.retailPrice,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }
    if (newQuantity > product.quantityOnHand) {
      showToast(`Only ${product.quantityOnHand} units available.`, "error");
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.unitPrice,
            }
          : item
      )
    );
  };

  const updateUnitPrice = (productId: string, newPrice: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              unitPrice: newPrice,
              totalPrice: item.quantity * newPrice,
            }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleCreateCustomer = async () => {
    if (!newCustomerName.trim()) {
      showToast("Customer name is required.", "error");
      return;
    }

    setCreatingCustomer(true);
    try {
      const result = await createCustomerAction(
        newCustomerName.trim(),
        newCustomerEmail.trim() || null,
        newCustomerPhone.trim() || null,
        newCustomerNotes.trim() || null
      );

      const customersData = await getCustomersAction();
      setCustomers(customersData);
      setSelectedCustomer(result.id);
      setSaleChannel("");

      setShowNewCustomer(false);
      setNewCustomerName("");
      setNewCustomerEmail("");
      setNewCustomerPhone("");
      setNewCustomerNotes("");
      showToast("Customer created!", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to create customer.", "error");
    } finally {
      setCreatingCustomer(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Add at least one product to the sale.", "error");
      return;
    }

    setSaving(true);
    try {
      let saleNotes = notes || "";
      if (saleChannel && saleChannel !== "") {
        const channelLabel = SALE_CHANNELS.find((c) => c.value === saleChannel)?.label || saleChannel;
        saleNotes = saleNotes ? `${channelLabel} | ${saleNotes}` : channelLabel;
      }

      const result = await createSaleAction({
        customerId: selectedCustomer || null,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        discount,
        tax,
        status: saleChannel === "gift" ? "Paid" : status,
        notes: saleNotes || null,
        totalAmount: saleChannel === "gift" ? 0 : total,
      });

      showToast("Sale created successfully!", "success");
      router.push(`/sales/${result.id}`);
    } catch (error: any) {
      showToast(error.message || "Failed to create sale.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">New Sale</h1>
        <button
          type="button"
          onClick={() => router.push("/sales")}
          className="text-text-muted hover:text-text text-sm"
        >
          ← Back to Sales
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Customer & Products */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer / Sale Channel */}
          <div className="bg-surface-widget border border-default rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text">Customer / Sale Channel</h2>
              <button
                type="button"
                onClick={() => setShowChannelLegend(!showChannelLegend)}
                className="text-lg leading-none hover:scale-110 transition-transform"
                title="What are sale channels?"
                aria-label="What are sale channels?"
              >
                ☄️
              </button>
            </div>

            {/* Channel Legend */}
            {showChannelLegend && (
              <div className="mb-4 p-4 bg-bg border border-default rounded-lg space-y-1.5">
                <p className="text-xs font-semibold text-text mb-2">Sale Channel Examples</p>
                {SALE_CHANNELS.filter((c) => c.value !== "").map((channel) => (
                  <div key={channel.value} className="flex items-start gap-2 text-xs">
                    <span className="shrink-0 font-medium text-text">{channel.label}:</span>
                    <span className="text-text-muted">{channel.example}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <select
                value={saleChannel || selectedCustomer}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || val === "online" || val === "mobile" || val === "gift" || val === "wholesale" || val === "event") {
                    setSaleChannel(val);
                    setSelectedCustomer("");
                  } else {
                    setSelectedCustomer(val);
                    setSaleChannel("");
                  }
                }}
                className="flex-1 px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <optgroup label="Sale Channels">
                  {SALE_CHANNELS.map((channel) => (
                    <option key={channel.value} value={channel.value}>
                      {channel.label}
                    </option>
                  ))}
                </optgroup>
                {customers.length > 0 && (
                  <optgroup label="Existing Customers">
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.email ? `(${c.email})` : ""}
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
              <button
                type="button"
                onClick={() => setShowNewCustomer(true)}
                className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                New
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">Add Products</h2>
            <div className="mb-4">
              <select
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                style={{ width: '100%', maxWidth: '100%' }}
                onChange={(e) => {
                  if (e.target.value) {
                    addProduct(e.target.value);
                    e.target.value = "";
                  }
                }}
              >
                <option value="">Select a product...</option>
                {products
                  .filter((p) => p.quantityOnHand > 0)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (${p.retailPrice.toFixed(2)} - {p.quantityOnHand} in stock)
                    </option>
                  ))}
              </select>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-text-muted text-sm">
                No items added yet. Select a product above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-default text-text-muted text-xs uppercase tracking-wider">
                      <th className="p-2">Product</th>
                      <th className="p-2 text-center">Qty</th>
                      <th className="p-2 text-center">Price</th>
                      <th className="p-2 text-right">Total</th>
                      <th className="p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-default text-sm">
                    {cart.map((item) => (
                      <tr key={item.productId}>
                        <td className="p-2 font-medium text-text">{item.productName}</td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.productId, parseInt(e.target.value) || 1)
                            }
                            className="w-16 px-2 py-1 bg-bg border border-default rounded text-text text-sm text-center"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateUnitPrice(item.productId, parseFloat(e.target.value) || 0)
                            }
                            className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm text-center"
                          />
                        </td>
                        <td className="p-2 font-medium text-text-brand text-right">
                          ${item.totalPrice.toFixed(2)}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-error hover:underline text-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-widget border border-default rounded-xl p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-text mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-text font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
                />
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Tax (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
                />
              </div>

              <div className="border-t border-default pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Discount</span>
                  <span className="text-error">-${discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Tax</span>
                  <span className="text-text">${taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-default pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-text">Total</span>
                  <span className="text-text-brand">${total.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
                >
                  <option value="Draft">Draft</option>
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Optional notes..."
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={saving || cart.length === 0}
                className="w-full bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-4 py-2 rounded-full transition-colors text-sm disabled:opacity-50"
              >
                {saving ? "Creating Sale..." : "Create Sale"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* New Customer Modal */}
      {showNewCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowNewCustomer(false)}>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">New Customer</h2>
              <button
                type="button"
                onClick={() => setShowNewCustomer(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="Customer name"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newCustomerEmail}
                  onChange={(e) => setNewCustomerEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={newCustomerNotes}
                  onChange={(e) => setNewCustomerNotes(e.target.value)}
                  placeholder="Optional notes (preferences, allergies, etc.)"
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm resize-y"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCreateCustomer}
                  disabled={creatingCustomer || !newCustomerName.trim()}
                  style={{ backgroundColor: "#4f8792", color: "white", border: "1px solid #3d6d77" }} className="flex-1 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-colors disabled:opacity-50"
                >
                  {creatingCustomer ? "Creating..." : "Create Customer"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCustomer(false)}
                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-500 shadow-sm transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
