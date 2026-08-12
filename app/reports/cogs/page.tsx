"use client";

import { useState, useEffect, useTransition } from "react";
import Navbar from "@/app/components/Navbar";
import { useToast } from "@/app/context/ToastContext";

interface CogsData {
  beginningInventory: number;
  purchases: number;
  directLabor: number;
  productionSupplies: number;
  endingInventory: number;
  totalCogs: number;
  grossProfit: number;
  revenue: number;
  valuationMethod: "cost" | "lower_of_cost_or_market";
  isFirstYear: boolean;
}

export default function CogsCalculatorPage() {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  // ── Form state ──
  const [revenue, setRevenue] = useState<number>(0);
  const [beginningInventory, setBeginningInventory] = useState<number>(0);
  const [isFirstYear, setIsFirstYear] = useState(false);
  const [valuationMethod, setValuationMethod] = useState<"cost" | "lower_of_cost_or_market">("cost");
  const [purchases, setPurchases] = useState<number>(0);
  const [directLabor, setDirectLabor] = useState<number>(0);
  const [productionSupplies, setProductionSupplies] = useState<number>(0);
  const [endingInventory, setEndingInventory] = useState<number>(0);

  // ── Purchase breakdown ──
  const [purchaseBreakdown, setPurchaseBreakdown] = useState({
    rawIngredients: 0,
    containers: 0,
    hardware: 0,
    wholesaleGoods: 0,
  });

  // ── Computed values ──
  const subtotal = beginningInventory + purchases + directLabor + productionSupplies;
  const totalCogs = subtotal - endingInventory;
  const grossProfit = revenue - totalCogs;
  const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;

  // ── First‑year toggle ──
  useEffect(() => {
    if (isFirstYear) {
      setBeginningInventory(0);
    }
  }, [isFirstYear]);

  // ── Auto‑calculate purchases from breakdown ──
  useEffect(() => {
    const total =
      purchaseBreakdown.rawIngredients +
      purchaseBreakdown.containers +
      purchaseBreakdown.hardware +
      purchaseBreakdown.wholesaleGoods;
    setPurchases(total);
  }, [purchaseBreakdown]);

  const updatePurchaseBreakdown = (field: keyof typeof purchaseBreakdown, value: number) => {
    setPurchaseBreakdown((prev) => ({ ...prev, [field]: value }));
  };

  // ── Validation messages ──
  const getValidationMessages = () => {
    const messages: string[] = [];

    if (revenue <= 0 && totalCogs > 0) {
      messages.push("⚠️ You have COGS but no revenue. Did you forget to enter your total sales?");
    }
    if (totalCogs > revenue && revenue > 0) {
      messages.push("⚠️ Your COGS exceeds your revenue. This means you sold items below cost or have leftover inventory that hasn't been realized as profit yet.");
    }
    if (endingInventory > subtotal && subtotal > 0) {
      messages.push("❌ Ending inventory cannot be greater than total goods available for sale.");
    }
    if (totalCogs < 0) {
      messages.push("❌ Ending inventory is greater than total available inventory. Please check your numbers.");
    }

    return messages;
  };

  const validationMessages = getValidationMessages();
  const hasError = validationMessages.some((m) => m.startsWith("❌"));

  // ── Save to localStorage ──
  const handleSave = () => {
    if (hasError) {
      showToast("Please fix the validation errors before saving.", "error");
      return;
    }

    startTransition(() => {
      try {
        const data: CogsData = {
          beginningInventory,
          purchases,
          directLabor,
          productionSupplies,
          endingInventory,
          totalCogs,
          grossProfit,
          revenue,
          valuationMethod,
          isFirstYear,
        };
        localStorage.setItem("cogsData", JSON.stringify(data));
        showToast("COGS data saved successfully!", "success");
      } catch {
        showToast("Failed to save COGS data.", "error");
      }
    });
  };

  // ── Load from localStorage ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cogsData");
      if (saved) {
        const data = JSON.parse(saved) as CogsData;
        setRevenue(data.revenue || 0);
        setBeginningInventory(data.beginningInventory || 0);
        setPurchases(data.purchases || 0);
        setDirectLabor(data.directLabor || 0);
        setProductionSupplies(data.productionSupplies || 0);
        setEndingInventory(data.endingInventory || 0);
        setValuationMethod(data.valuationMethod || "cost");
        setIsFirstYear(data.isFirstYear || false);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Navbar />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text">📋 Schedule C COGS Calculator</h1>
            <p className="text-text-muted text-sm">
              IRS Form 1040 Schedule C Part III – Cost of Goods Sold
            </p>
          </div>
          <a href="/reports" className="text-text-brand hover:underline text-sm">
            ← Back to Reports
          </a>
        </div>

        <div className="bg-surface-widget border border-default rounded-xl p-6 space-y-6" suppressHydrationWarning>
          {/* First Year Toggle */}
          <div className="flex items-center gap-3 p-4 bg-brand-muted/20 dark:bg-brand-muted-dark/20 rounded-lg border border-default">
            <input
              type="checkbox"
              id="firstYear"
              checked={isFirstYear}
              onChange={(e) => setIsFirstYear(e.target.checked)}
              className="rounded border-default accent-brand w-4 h-4"
            />
            <label htmlFor="firstYear" className="text-sm font-medium text-text">
              This is my first year in business
            </label>
            {isFirstYear && (
              <span className="text-xs text-text-muted ml-auto flex items-center gap-1">
                🔒 Beginning Inventory set to $0.00
              </span>
            )}
          </div>

          {/* Valuation Method (Line 33) */}
          <div className="border-b border-default pb-4">
            <label className="block text-text-muted text-xs font-medium uppercase mb-2">
              Line 33: Inventory Valuation Method
            </label>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm text-text">
                <input
                  type="radio"
                  name="valuationMethod"
                  value="cost"
                  checked={valuationMethod === "cost"}
                  onChange={() => setValuationMethod("cost")}
                  className="accent-brand"
                />
                Cost Method
              </label>
              <label className="flex items-center gap-2 text-sm text-text">
                <input
                  type="radio"
                  name="valuationMethod"
                  value="lower_of_cost_or_market"
                  checked={valuationMethod === "lower_of_cost_or_market"}
                  onChange={() => setValuationMethod("lower_of_cost_or_market")}
                  className="accent-brand"
                />
                Lower of Cost or Market
              </label>
            </div>
          </div>

          {/* Revenue */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Gross Revenue / Sales
              <span className="text-text-muted ml-1 font-normal">(for profit preview)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                step="any"
                min="0"
                value={revenue}
                onChange={(e) => setRevenue(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>
          </div>

          {/* Line 35: Beginning Inventory */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                Line 35: Beginning Inventory (Jan 1)
              </label>
              {isFirstYear && (
                <span className="text-xs text-text-muted bg-surface px-2 py-0.5 rounded border border-default flex items-center gap-1">
                  🔒 Locked – First year
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                step="any"
                min="0"
                value={beginningInventory}
                onChange={(e) => setBeginningInventory(parseFloat(e.target.value) || 0)}
                disabled={isFirstYear}
                className={`w-full pl-7 pr-3 py-2 bg-bg border rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm ${
                  isFirstYear ? "opacity-50 cursor-not-allowed border-default" : "border-default"
                }`}
                placeholder="0.00"
              />
            </div>
            {isFirstYear && (
              <p className="text-text-muted text-xs mt-1">
                First year in business always starts with $0 Beginning Inventory.
              </p>
            )}
          </div>

          {/* Line 36: Purchases */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Line 36: Purchases (Raw Materials & Products for Resale)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                step="any"
                min="0"
                value={purchases}
                onChange={(e) => setPurchases(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                placeholder="0.00"
              />
            </div>

            {/* Purchase Breakdown Helper */}
            <details className="mt-3">
              <summary className="text-text-brand hover:underline text-sm font-medium cursor-pointer">
                📦 Expand Purchase Breakdown Helper
              </summary>
              <div className="mt-3 p-4 bg-surface border border-default rounded-lg space-y-3">
                <p className="text-text-muted text-xs mb-2">
                  Enter your purchases by category – the total will auto-calculate above.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Raw Ingredients (Wax, Oils, Dyes)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-text-muted text-xs">$</span>
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={purchaseBreakdown.rawIngredients}
                        onChange={(e) =>
                          updatePurchaseBreakdown("rawIngredients", parseFloat(e.target.value) || 0)
                        }
                        className="w-full pl-5 pr-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Containers & Vessels (Jars, Tins, Lids)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-text-muted text-xs">$</span>
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={purchaseBreakdown.containers}
                        onChange={(e) =>
                          updatePurchaseBreakdown("containers", parseFloat(e.target.value) || 0)
                        }
                        className="w-full pl-5 pr-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Core Hardware (Wicks, Clips, Molds)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-text-muted text-xs">$</span>
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={purchaseBreakdown.hardware}
                        onChange={(e) =>
                          updatePurchaseBreakdown("hardware", parseFloat(e.target.value) || 0)
                        }
                        className="w-full pl-5 pr-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Wholesale Goods Purchased for Resale
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-text-muted text-xs">$</span>
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={purchaseBreakdown.wholesaleGoods}
                        onChange={(e) =>
                          updatePurchaseBreakdown("wholesaleGoods", parseFloat(e.target.value) || 0)
                        }
                        className="w-full pl-5 pr-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm font-medium text-text border-t border-default pt-2 mt-2">
                  Total Purchases: ${purchases.toFixed(2)}
                </div>
              </div>
            </details>
          </div>

          {/* Line 37: Direct Labor */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Line 37: Direct Labor (1099/Contractors Only)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                step="any"
                min="0"
                value={directLabor}
                onChange={(e) => setDirectLabor(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                placeholder="0.00"
              />
            </div>
            <p className="text-text-muted text-xs mt-1">
              If you paid others for production work, include it here.
              <strong className="text-text"> Do NOT include payments to yourself or owner draws.</strong>
            </p>
          </div>

          {/* Line 38: Production Supplies & Primary Packaging */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Line 38: Production Supplies & Primary Packaging
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                step="any"
                min="0"
                value={productionSupplies}
                onChange={(e) => setProductionSupplies(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                placeholder="0.00"
              />
            </div>
            <p className="text-text-muted text-xs mt-1">
              Safety labels, dust covers, production consumables (gloves, pipettes, stir sticks).
              <span className="text-text">
                {" "}
                Outer shipping boxes to customers go under Operating Expenses → Office/Shipping.
              </span>
            </p>
          </div>

          {/* Subtotal */}
          <div className="bg-surface border border-default rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Subtotal (Cost of Goods Available for Sale):</span>
              <span className="font-semibold text-text">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Line 41: Ending Inventory */}
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">
              Line 41: Ending Inventory (Unsold Goods on Dec 31)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                step="any"
                min="0"
                value={endingInventory}
                onChange={(e) => setEndingInventory(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                placeholder="0.00"
              />
            </div>
            <p className="text-text-muted text-xs mt-1">
              Unused raw materials + unsold finished product cost on Dec 31.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-surface-widget border border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Results</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface border border-default rounded-lg p-4 text-center">
              <p className="text-text-muted text-xs uppercase tracking-wider">Line 42: Total COGS</p>
              <p className="text-2xl font-bold text-warning">${totalCogs.toFixed(2)}</p>
              <p className="text-text-muted text-xs mt-1">Goes on Schedule C</p>
            </div>
            <div className="bg-surface border border-default rounded-lg p-4 text-center">
              <p className="text-text-muted text-xs uppercase tracking-wider">Gross Profit</p>
              <p
                className={`text-2xl font-bold ${
                  grossProfit >= 0 ? "text-success" : "text-error"
                }`}
              >
                ${grossProfit.toFixed(2)}
              </p>
            </div>
            <div className="bg-surface border border-default rounded-lg p-4 text-center">
              <p className="text-text-muted text-xs uppercase tracking-wider">Gross Margin</p>
              <p className="text-2xl font-bold text-text-brand">{grossMargin.toFixed(2)}%</p>
            </div>
          </div>

          {/* Validation Messages */}
          {validationMessages.length > 0 && (
            <div className="mt-4 space-y-2">
              {validationMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    msg.startsWith("❌")
                      ? "bg-error-muted dark:bg-error-muted-dark text-error"
                      : "bg-warning-muted dark:bg-warning-muted-dark text-warning"
                  }`}
                >
                  {msg}
                </div>
              ))}
            </div>
          )}

          {/* Save & Export */}
          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-default">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? "Saving..." : "💾 Save Data"}
            </button>
            <button
              onClick={() => {
                const data = {
                  revenue,
                  beginningInventory,
                  purchases,
                  directLabor,
                  productionSupplies,
                  endingInventory,
                  totalCogs,
                  grossProfit,
                  grossMargin,
                  valuationMethod,
                  isFirstYear,
                  date: new Date().toISOString(),
                };
                const csv =
                  "Metric,Value\n" +
                  Object.entries(data)
                    .map(([key, value]) => `${key},${typeof value === "number" ? value.toFixed(2) : value}`)
                    .join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `cogs-report-${new Date().toISOString().slice(0, 10)}.csv`;
                a.click();
                URL.revokeObjectURL(url);
                showToast("COGS report exported successfully!", "success");
              }}
              className="bg-surface border border-default text-text-secondary hover:bg-surface-elevated text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              📥 Export CSV
            </button>
            <button
              onClick={() => {
                const html = `
                  <h2>Schedule C COGS Report</h2>
                  <p>Date: ${new Date().toLocaleDateString()}</p>
                  <table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
                    <tr><td>Revenue</td><td>$${revenue.toFixed(2)}</td></tr>
                    <tr><td>Beginning Inventory</td><td>$${beginningInventory.toFixed(2)}</td></tr>
                    <tr><td>Purchases</td><td>$${purchases.toFixed(2)}</td></tr>
                    <tr><td>Direct Labor</td><td>$${directLabor.toFixed(2)}</td></tr>
                    <tr><td>Production Supplies</td><td>$${productionSupplies.toFixed(2)}</td></tr>
                    <tr><td>Ending Inventory</td><td>-$${endingInventory.toFixed(2)}</td></tr>
                    <tr><td><strong>Total COGS</strong></td><td><strong>$${totalCogs.toFixed(2)}</strong></td></tr>
                    <tr><td><strong>Gross Profit</strong></td><td><strong>$${grossProfit.toFixed(2)}</strong></td></tr>
                    <tr><td><strong>Gross Margin</strong></td><td><strong>${grossMargin.toFixed(2)}%</strong></td></tr>
                    <tr><td>Valuation Method</td><td>${valuationMethod === "cost" ? "Cost" : "Lower of Cost or Market"}</td></tr>
                    <tr><td>First Year</td><td>${isFirstYear ? "Yes" : "No"}</td></tr>
                  </table>
                `;
                const win = window.open("", "_blank");
                if (win) {
                  win.document.write(html);
                  win.document.close();
                  win.print();
                }
              }}
              className="bg-surface border border-default text-text-secondary hover:bg-surface-elevated text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              🖨️ Print Report
            </button>
          </div>
        </div>

        {/* COGS vs Expense Reference (updated) */}
        <div className="bg-surface-widget border border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">📖 What Counts as COGS vs. Expense?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-text-brand mb-2">✅ Belongs in COGS (Direct Costs)</p>
              <ul className="space-y-1 text-text-muted">
                <li>• Raw ingredients (Wax, oils, vessels, wicks)</li>
                <li>• Safety labels, dust covers (primary packaging)</li>
                <li>• Wholesale items bought for resale</li>
                <li>• Production supplies (gloves, stir sticks)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-warning mb-2">❌ Belongs in General Expenses</p>
              <ul className="space-y-1 text-text-muted">
                <li>• Shipping boxes & tape to customers</li>
                <li>• Office supplies, website hosting</li>
                <li>• Marketing, ads, photography props</li>
                <li>• Equipment (pour pots, scales, thermometers)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href="/reports" className="text-text-muted hover:text-text text-sm">
            ← Back to Reports Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}