"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  quantityOnHand: number;
  retailPrice: number;
  calculatedCogs: number;
}

interface MarketPlan {
  productId: string;
  plannedQuantity: number;
  soldQuantity: number;
  damagedQuantity: number;
  returnedQuantity: number;
  exchangedQuantity: number;
}

export default function MarketPrepPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<MarketPlan[]>([]);
  const [marketName, setMarketName] = useState("");
  const [marketDate, setMarketDate] = useState("");
  const [mode, setMode] = useState<"plan" | "reconcile">("plan");

  useEffect(() => {
    fetch('/api/finished-goods')
      .then(r => r.json())
      .then(data => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  const addPlan = (productId: string) => {
    if (!productId) return;
    if (plans.some(p => p.productId === productId)) return;
    setPlans([...plans, {
      productId,
      plannedQuantity: 0,
      soldQuantity: 0,
      damagedQuantity: 0,
      returnedQuantity: 0,
      exchangedQuantity: 0,
    }]);
  };

  const updatePlan = (productId: string, field: keyof MarketPlan, value: number) => {
    setPlans(plans.map(p =>
      p.productId === productId ? { ...p, [field]: value } : p
    ));
  };

  const removePlan = (productId: string) => {
    setPlans(plans.filter(p => p.productId !== productId));
  };

  const getProduct = (id: string) => products.find(p => p.id === id);

  const getShortage = (plan: MarketPlan) => {
    const product = getProduct(plan.productId);
    if (!product) return 0;
    return Math.max(0, plan.plannedQuantity - product.quantityOnHand);
  };

  const totalShortages = plans.reduce((sum, p) => sum + getShortage(p), 0);

  const totalRevenue = plans.reduce((sum, p) => {
    const product = getProduct(p.productId);
    return sum + (p.soldQuantity * (product?.retailPrice ?? 0));
  }, 0);

  const totalLoss = plans.reduce((sum, p) => {
    const product = getProduct(p.productId);
    return sum + (p.damagedQuantity * (product?.calculatedCogs ?? 0));
  }, 0);

  const totalNet = totalRevenue - totalLoss;

  return (
    <main className="min-h-screen bg-transparent text-text p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-text mt-3">Market Prep Planner</h1>
        <p className="text-text-muted text-sm">
          Plan what to bring, see shortages before you pack, and reconcile after the market.
        </p>

        {/* Mode toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode("plan")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "plan"
                ? "bg-[#4f8792] text-white"
                : "bg-surface border border-default text-text-muted hover:bg-brand-muted"
            }`}
          >
            Plan
          </button>
          <button
            onClick={() => setMode("reconcile")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "reconcile"
                ? "bg-[#4f8792] text-white"
                : "bg-surface border border-default text-text-muted hover:bg-brand-muted"
            }`}
          >
            Reconcile
          </button>
        </div>

        {/* Market details */}
        <div className="bg-surface-widget border border-default rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-muted uppercase mb-1">Market Name</label>
              <input
                type="text"
                value={marketName}
                onChange={(e) => setMarketName(e.target.value)}
                placeholder="e.g. Saturday Farmers Market"
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted uppercase mb-1">Date</label>
              <input
                type="date"
                value={marketDate}
                onChange={(e) => setMarketDate(e.target.value)}
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Add products */}
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <h3 className="text-sm font-semibold text-text mb-3">Add Products to Bring</h3>
          <select
            onChange={(e) => {
              addPlan(e.target.value);
              e.target.value = "";
            }}
            className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-sm"
          >
            <option value="">Select a product...</option>
            {products
              .filter(p => !plans.some(plan => plan.productId === p.id))
              .map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.quantityOnHand} in stock)</option>
              ))}
          </select>
        </div>

        {/* Plan table */}
        {plans.length > 0 && (
          <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-default bg-[#d3dfe1] dark:bg-[#4f8792]">
                  <th className="p-3 text-text-muted uppercase text-xs">Product</th>
                  <th className="p-3 text-text-muted uppercase text-xs text-center">In Stock</th>
                  <th className="p-3 text-text-muted uppercase text-xs text-center">Bringing</th>
                  <th className="p-3 text-text-muted uppercase text-xs text-center">Shortage</th>
                  <th className="p-3 text-text-muted uppercase text-xs text-center">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {plans.map(plan => {
                  const product = getProduct(plan.productId);
                  const shortage = getShortage(plan);
                  return (
                    <tr key={plan.productId}>
                      <td className="p-3 font-medium">{product?.name}</td>
                      <td className="p-3 text-center">{product?.quantityOnHand}</td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          min={0}
                          value={plan.plannedQuantity}
                          onChange={(e) => updatePlan(plan.productId, "plannedQuantity", parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 bg-bg border border-default rounded text-center text-sm"
                        />
                      </td>
                      <td className={`p-3 text-center font-bold ${shortage > 0 ? "text-red-500" : "text-green-700"}`}>
                        {shortage > 0 ? `Short by ${shortage}` : "OK"}
                      </td>
                      <td className="p-3 text-center">
                        <button onClick={() => removePlan(plan.productId)} className="text-red-500 hover:text-red-700">✕</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Total warning */}
            <div className={`p-4 border-t ${
              totalShortages > 0
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                : "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
            }`}>
              <p className={`text-sm font-medium ${
                totalShortages > 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-800 dark:text-green-300 font-bold"
              }`}>
                {totalShortages > 0
                  ? `⚠️ You're short ${totalShortages} units total. Make more before the market!`
                  : "✅ You have enough stock for everything you plan to bring!"}
              </p>
            </div>
          </div>
        )}

        {/* Reconciliation section */}
        {mode === "reconcile" && plans.length > 0 && (
          <div className="bg-surface-widget border border-default rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text mb-3">Post-Market Reconciliation</h3>
            <div className="space-y-3">
              {plans.map(plan => {
                const product = getProduct(plan.productId);
                const expectedRevenue = plan.soldQuantity * (product?.retailPrice ?? 0);
                const damagedLoss = plan.damagedQuantity * (product?.calculatedCogs ?? 0);
                const netProfit = expectedRevenue - damagedLoss;
                return (
                  <div key={plan.productId} className="bg-bg border border-default rounded-lg p-3">
                    <p className="font-medium text-sm mb-2">{product?.name}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="block text-xs text-text-muted mb-1">Sold</label>
                        <input
                          type="number"
                          min={0}
                          value={plan.soldQuantity}
                          onChange={(e) => updatePlan(plan.productId, "soldQuantity", parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 bg-bg border border-default rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted mb-1">Exchanged</label>
                        <input
                          type="number"
                          min={0}
                          value={plan.exchangedQuantity}
                          onChange={(e) => updatePlan(plan.productId, "exchangedQuantity", parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 bg-bg border border-default rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted mb-1">Damaged</label>
                        <input
                          type="number"
                          min={0}
                          value={plan.damagedQuantity}
                          onChange={(e) => updatePlan(plan.productId, "damagedQuantity", parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 bg-bg border border-default rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted mb-1">Returned</label>
                        <input
                          type="number"
                          min={0}
                          value={plan.returnedQuantity}
                          onChange={(e) => updatePlan(plan.productId, "returnedQuantity", parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 bg-bg border border-default rounded text-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-right">
                      <div>
                        <label className="block text-xs text-text-muted mb-1">Revenue</label>
                        <p className="text-sm font-bold text-text-brand">${expectedRevenue.toFixed(2)}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted mb-1">Loss (Damaged)</label>
                        <p className="text-sm font-bold text-red-500">-${damagedLoss.toFixed(2)}</p>
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted mb-1">Net</label>
                        <p className={`text-sm font-bold ${netProfit >= 0 ? "text-green-700" : "text-red-500"}`}>
                          ${netProfit.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary Cards */}
        {mode === "reconcile" && plans.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface-widget border border-default rounded-xl p-5 text-center">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Gross Revenue</p>
              <p className="text-2xl font-bold text-text-brand">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-surface-widget border border-default rounded-xl p-5 text-center">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Total Loss (Damaged)</p>
              <p className="text-2xl font-bold text-red-500">-${totalLoss.toFixed(2)}</p>
            </div>
            <div className="bg-surface-widget border border-default rounded-xl p-5 text-center">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Net Profit</p>
              <p className={`text-2xl font-bold ${totalNet >= 0 ? "text-green-700" : "text-red-500"}`}>
                ${totalNet.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
