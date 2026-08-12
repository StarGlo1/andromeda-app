"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/app/context/ToastContext";
import Navbar from "@/app/components/Navbar";
import { seedDemoData } from "@/app/actions/seedDemo";

const currencies = ["$", "€", "£", "¥", "₹", "A$", "C$", "R$", "₿"];
const dateFormats = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY (US)" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY (World)" },
];
const saleStatuses = ["Draft", "Paid", "Shipped", "Refunded"];
const taxRates = [0, 5, 8, 10, 12, 15, 20, 25];
const discountDefaults = [0, 5, 10, 15, 20, 25, 50];
const unitSystems = ["imperial", "metric"];
const valuationMethods = ["weighted-average", "fifo"];
const lowStockTriggers = ["on-hand", "available"];

export default function SettingsPage() {
  const { showToast } = useToast();
  const [seeding, setSeeding] = useState(false);

  // ── Existing preferences ──
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [currency, setCurrency] = useState("$");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [showConverter, setShowConverter] = useState(true);
  const [defaultReorder, setDefaultReorder] = useState("");

  // ── Company profile ──
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  // ── Sales defaults ──
  const [defaultTaxRate, setDefaultTaxRate] = useState(0);
  const [defaultDiscount, setDefaultDiscount] = useState(0);
  const [defaultSaleStatus, setDefaultSaleStatus] = useState("Paid");

  // ── NEW: Production & Labor defaults ──
  const [hourlyLaborRate, setHourlyLaborRate] = useState(25);
  const [defaultRecipeUnit, setDefaultRecipeUnit] = useState("oz");
  const [batchWasteBuffer, setBatchWasteBuffer] = useState(3);
  const [lotNumberFormat, setLotNumberFormat] = useState("LOT-{YYYY}{MM}{DD}-{SEQ}");

  // ── NEW: Costing & Inventory preferences ──
  const [valuationMethod, setValuationMethod] = useState<"weighted-average" | "fifo">("weighted-average");
  const [includeLaborInCogs, setIncludeLaborInCogs] = useState(true);
  const [lowStockTrigger, setLowStockTrigger] = useState<"on-hand" | "available">("on-hand");

  // ── NEW: Batch execution defaults ──
  const [autoDeductRawMaterials, setAutoDeductRawMaterials] = useState(true);

  const [saved, setSaved] = useState(false);

  // ── Load all settings ──
  useEffect(() => {
    try {
      // Preferences
      const savedUnit = localStorage.getItem("unitSystem");
      if (savedUnit === "metric" || savedUnit === "imperial") setUnitSystem(savedUnit);
      const savedCurrency = localStorage.getItem("currency");
      if (savedCurrency) setCurrency(savedCurrency);
      const savedDateFormat = localStorage.getItem("dateFormat");
      if (savedDateFormat) setDateFormat(savedDateFormat);
      const savedConverter = localStorage.getItem("showConverter");
      if (savedConverter !== null) setShowConverter(savedConverter === "true");
      const savedReorder = localStorage.getItem("defaultReorder");
      if (savedReorder) setDefaultReorder(savedReorder);

      // Company
      const savedCompany = localStorage.getItem("companyProfile");
      if (savedCompany) {
        const parsed = JSON.parse(savedCompany);
        setCompanyName(parsed.name || "");
        setCompanyAddress(parsed.address || "");
        setCompanyPhone(parsed.phone || "");
        setCompanyEmail(parsed.email || "");
        setCompanyTaxId(parsed.taxId || "");
        setCompanyWebsite(parsed.website || "");
      }

      // Sales
      const savedSales = localStorage.getItem("salesDefaults");
      if (savedSales) {
        const parsed = JSON.parse(savedSales);
        setDefaultTaxRate(parsed.taxRate ?? 0);
        setDefaultDiscount(parsed.discount ?? 0);
        setDefaultSaleStatus(parsed.status || "Paid");
      }

      // ── New settings ──
      const savedProduction = localStorage.getItem("productionDefaults");
      if (savedProduction) {
        const parsed = JSON.parse(savedProduction);
        setHourlyLaborRate(parsed.hourlyLaborRate ?? 25);
        setDefaultRecipeUnit(parsed.defaultRecipeUnit ?? "oz");
        setBatchWasteBuffer(parsed.batchWasteBuffer ?? 3);
        setLotNumberFormat(parsed.lotNumberFormat ?? "LOT-{YYYY}{MM}{DD}-{SEQ}");
      }

      const savedCosting = localStorage.getItem("costingPreferences");
      if (savedCosting) {
        const parsed = JSON.parse(savedCosting);
        setValuationMethod(parsed.valuationMethod ?? "weighted-average");
        setIncludeLaborInCogs(parsed.includeLaborInCogs ?? true);
        setLowStockTrigger(parsed.lowStockTrigger ?? "on-hand");
      }

      const savedBatch = localStorage.getItem("batchDefaults");
      if (savedBatch) {
        const parsed = JSON.parse(savedBatch);
        setAutoDeductRawMaterials(parsed.autoDeductRawMaterials ?? true);
      }
    } catch {}
  }, []);

  const handleSave = () => {
    try {
      // Preferences
      localStorage.setItem("unitSystem", unitSystem);
      localStorage.setItem("currency", currency);
      localStorage.setItem("dateFormat", dateFormat);
      localStorage.setItem("showConverter", String(showConverter));
      if (defaultReorder) {
        localStorage.setItem("defaultReorder", defaultReorder);
      } else {
        localStorage.removeItem("defaultReorder");
      }

      // Company
      localStorage.setItem(
        "companyProfile",
        JSON.stringify({
          name: companyName,
          address: companyAddress,
          phone: companyPhone,
          email: companyEmail,
          taxId: companyTaxId,
          website: companyWebsite,
        })
      );

      // Sales
      localStorage.setItem(
        "salesDefaults",
        JSON.stringify({
          taxRate: defaultTaxRate,
          discount: defaultDiscount,
          status: defaultSaleStatus,
        })
      );

      // ── New settings ──
      localStorage.setItem(
        "productionDefaults",
        JSON.stringify({
          hourlyLaborRate,
          defaultRecipeUnit,
          batchWasteBuffer,
          lotNumberFormat,
        })
      );

      localStorage.setItem(
        "costingPreferences",
        JSON.stringify({
          valuationMethod,
          includeLaborInCogs,
          lowStockTrigger,
        })
      );

      localStorage.setItem(
        "batchDefaults",
        JSON.stringify({
          autoDeductRawMaterials,
        })
      );

      setSaved(true);
      showToast("All settings saved successfully!", "success");
      setTimeout(() => setSaved(false), 2500);
    } catch {
      showToast("Failed to save settings.", "error");
    }
  };

  const handleSeedDemo = async () => {
    setSeeding(true);
    const result = await seedDemoData();
    if (result.success) {
      showToast(result.message, "success");
    } else {
      showToast(result.message, "error");
    }
    setSeeding(false);
  };

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        <div className="space-y-10">
          {/* ─── Company Profile ─── */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">Company Profile</h2>
            <p className="text-text-muted text-sm mb-6">
              This information appears on invoices, receipts, and reports.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Business Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your candle studio name"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Tax ID / EIN</label>
                <input
                  type="text"
                  value={companyTaxId}
                  onChange={(e) => setCompanyTaxId(e.target.value)}
                  placeholder="e.g. 12-3456789"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Address</label>
                <textarea
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  placeholder="Street address, city, state, zip"
                  rows={2}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm resize-y"
                />
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Phone</label>
                <input
                  type="tel"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder="studio@candles.com"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Website</label>
                <input
                  type="url"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="https://yourcandleshop.com"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>
            </div>
          </section>

          {/* ─── Sales Defaults ─── */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">Sales Defaults</h2>
            <p className="text-text-muted text-sm mb-6">
              Default values applied when creating new sales.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Default Tax Rate (%)</label>
                <select
                  value={defaultTaxRate}
                  onChange={(e) => setDefaultTaxRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {taxRates.map((rate) => (
                    <option key={rate} value={rate}>{rate}%</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Default Discount (%)</label>
                <select
                  value={defaultDiscount}
                  onChange={(e) => setDefaultDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {discountDefaults.map((d) => (
                    <option key={d} value={d}>{d}%</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Default Sale Status</label>
                <select
                  value={defaultSaleStatus}
                  onChange={(e) => setDefaultSaleStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {saleStatuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* ─── Production & Labor Defaults (NEW) ─── */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">🧪 Production & Labor Defaults</h2>
            <p className="text-text-muted text-sm mb-6">
              These defaults pre‑fill the batch calculator and production forms.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                  Hourly Labor Rate ($/hr)
                </label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={hourlyLaborRate}
                  onChange={(e) => setHourlyLaborRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
                />
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                  Default Recipe Unit
                </label>
                <select
                  value={defaultRecipeUnit}
                  onChange={(e) => setDefaultRecipeUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
                >
                  <option value="oz">Ounces (oz)</option>
                  <option value="g">Grams (g)</option>
                  <option value="lb">Pounds (lb)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="ml">Milliliters (ml)</option>
                  <option value="fl oz">Fluid Ounces (fl oz)</option>
                </select>
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                  Batch Waste Buffer (%)
                </label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  max="20"
                  value={batchWasteBuffer}
                  onChange={(e) => setBatchWasteBuffer(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
                />
                <p className="text-text-muted text-xs mt-1">
                  Extra materials to account for spillage / residue.
                </p>
              </div>
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                  Lot Number Pattern
                </label>
                <input
                  type="text"
                  value={lotNumberFormat}
                  onChange={(e) => setLotNumberFormat(e.target.value)}
                  placeholder="LOT-{YYYY}{MM}{DD}-{SEQ}"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm"
                />
                <p className="text-text-muted text-xs mt-1">
                  Use <code className="bg-surface px-1 py-0.5 rounded border border-default">YYYY</code>, <code>MM</code>, <code>DD</code>, <code>SEQ</code>
                </p>
              </div>
            </div>
          </section>

          {/* ─── Costing & Inventory Preferences (EXPANDED) ─── */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">📊 Costing & Inventory Preferences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Unit System</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setUnitSystem("imperial")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unitSystem === "imperial"
                        ? "bg-brand text-white"
                        : "bg-bg border border-default text-text-secondary hover:bg-brand-muted"
                    }`}
                  >
                    Imperial (oz, lb)
                  </button>
                  <button
                    onClick={() => setUnitSystem("metric")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unitSystem === "metric"
                        ? "bg-brand text-white"
                        : "bg-bg border border-default text-text-secondary hover:bg-brand-muted"
                    }`}
                  >
                    Metric (g, kg)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Currency Symbol</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {currencies.map((sym) => (
                    <option key={sym} value={sym}>{sym}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Date Format</label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {dateFormats.map((fmt) => (
                    <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Cost Valuation Method</label>
                <select
                  value={valuationMethod}
                  onChange={(e) => setValuationMethod(e.target.value as "weighted-average" | "fifo")}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="weighted-average">Weighted Average</option>
                  <option value="fifo">FIFO (First‑In, First‑Out)</option>
                </select>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                  Include Labor in Schedule C COGS
                </label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={includeLaborInCogs}
                      onChange={() => setIncludeLaborInCogs(true)}
                      className="accent-brand"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={!includeLaborInCogs}
                      onChange={() => setIncludeLaborInCogs(false)}
                      className="accent-brand"
                    />
                    No
                  </label>
                </div>
                <p className="text-text-muted text-xs mt-1">
                  Exclude self‑labor for taxes, include for internal margin.
                </p>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Low Stock Trigger</label>
                <select
                  value={lowStockTrigger}
                  onChange={(e) => setLowStockTrigger(e.target.value as "on-hand" | "available")}
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="on-hand">On‑Hand Quantity</option>
                  <option value="available">Available (On‑Hand − Committed)</option>
                </select>
              </div>

              <div>
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Default Reorder Threshold</label>
                <input
                  type="number"
                  value={defaultReorder}
                  onChange={(e) => setDefaultReorder(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
              </div>
            </div>
          </section>

          {/* ─── Batch Execution Defaults ─── */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">⚙️ Batch Execution Defaults</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text">Auto‑Deduct Raw Materials on Batch Completion</p>
                <p className="text-xs text-text-muted">When a batch is marked complete, automatically deduct ingredients from stock.</p>
              </div>
              <button
                onClick={() => setAutoDeductRawMaterials(!autoDeductRawMaterials)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoDeductRawMaterials ? "bg-brand" : "bg-border-strong"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoDeductRawMaterials ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* ─── Display Preferences ─── */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">🖥️ Display Preferences</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text">Show Unit Converter</p>
                <p className="text-xs text-text-muted">Display the unit converter widget on the Materials page.</p>
              </div>
              <button
                onClick={() => setShowConverter(!showConverter)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showConverter ? "bg-brand" : "bg-border-strong"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showConverter ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* ─── Data Management ─── */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">💾 Data Management</h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="/import"
                className="bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                📥 Import Data
              </a>
              <a
                href="/api/export"
                className="bg-surface border border-default text-text-secondary hover:bg-surface-elevated font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                ⬇️ Export All Data
              </a>
              <button
                onClick={handleSeedDemo}
                disabled={seeding}
                className="bg-info hover:bg-info-dark text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {seeding ? "Seeding..." : "🌱 Load Demo Data"}
              </button>
            </div>
            <p className="text-text-muted text-xs mt-3">
              Demo data includes sample materials, a sub‑assembly, and a finished product recipe. It won't overwrite existing data with the same names.
            </p>
          </section>

          {/* ─── Danger Zone ─── */}
          <section className="bg-surface-widget border border-error rounded-xl p-6 mt-4">
            <h2 className="text-lg font-semibold text-error mb-4">⚠️ Danger Zone</h2>
            <p className="text-sm text-text-secondary mb-4">
              Permanently delete all data from the application. This includes materials, products, recipes, adjustments, and settings.
            </p>
            <button
              onClick={() => {
                if (confirm("Are you sure? This will delete ALL data and cannot be undone.")) {
                  localStorage.clear();
                  window.location.href = "/onboarding";
                }
              }}
              className="bg-error hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Reset Everything
            </button>
          </section>

          {/* ─── Save Button ─── */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Save All Settings
              </button>
              {saved && <span className="text-success text-sm font-medium">✓ Saved</span>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}