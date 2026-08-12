"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext";
import Navbar from "@/app/components/Navbar";

interface Product {
  id: string;
  name: string;
  retailPrice: number;
  quantityOnHand: number;
}

interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export default function NewSalePage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [status, setStatus] = useState("Paid");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      const [customersRes, productsRes] = await Promise.all([
        fetch("/api/customers"),
        fetch("/api/products"),
      ]);
      const customersData = await customersRes.json();
      const productsData = await productsRes.json();
      setCustomers(customersData);
      setProducts(productsData);
    };
    fetchData();
  }, []);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  // Add product to cart
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Add at least one product to the sale.", "error");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: selectedCustomer || null,
          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          discount,
          tax,
          status,
          notes,
          totalAmount: total,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create sale");
      }

      const result = await response.json();
      showToast("Sale created successfully!", "success");
      router.push(`/sales/${result.id}`);
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text">New Sale</h1>
          <button
            onClick={() => router.push("/sales")}
            className="text-text-muted hover:text-text text-sm"
          >
            ← Back to Sales
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Customer & Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer */}
            <div className="bg-surface-widget border border-default rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Customer</h2>
              <div className="flex gap-3">
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="flex-1 px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="">Walk-in Customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.email ? `(${c.email})` : ""}
                    </option>
                  ))}
                </select>
                <a
                  href="/customers/new?return=/sales/new"
                  className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center"
                >
                  + New
                </a>
              </div>
            </div>

            {/* Products */}
            <div className="bg-surface-widget border border-default rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Add Products</h2>
              <div className="flex gap-2 mb-4">
                <select
                  id="product-select"
                  className="flex-1 px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  onChange={(e) => {
                    if (e.target.value) {
                      addProduct(e.target.value);
                      e.target.value = "";
                    }
                  }}
                >
                  <option value="">Search products...</option>
                  {products
                    .filter((p) => p.quantityOnHand > 0)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.retailPrice.toFixed(2)} - {p.quantityOnHand} in stock)
                      </option>
                    ))}
                </select>
              </div>

              {/* Cart */}
              {cart.length === 0 ? (
                <div className="text-center py-8 text-text-muted text-sm">
                  No items added yet. Select a product above to start building the sale.
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
                  className="w-full bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm disabled:opacity-50"
                >
                  {saving ? "Creating Sale..." : "Create Sale"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}