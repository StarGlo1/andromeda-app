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

export default function SettingsPage() {
  const { showToast } = useToast();
  const [seeding, setSeeding] = useState(false);

  // ----- Preferences -----
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("imperial");
  const [currency, setCurrency] = useState("$");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [showConverter, setShowConverter] = useState(true);
  const [defaultReorder, setDefaultReorder] = useState("");

  // ----- Company Profile -----
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  // ----- Sales Defaults -----
  const [defaultTaxRate, setDefaultTaxRate] = useState(0);
  const [defaultDiscount, setDefaultDiscount] = useState(0);
  const [defaultSaleStatus, setDefaultSaleStatus] = useState("Paid");

  const [saved, setSaved] = useState(false);

  // Load all settings on mount
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

      // Company Profile
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

      // Sales Defaults
      const savedSales = localStorage.getItem("salesDefaults");
      if (savedSales) {
        const parsed = JSON.parse(savedSales);
        setDefaultTaxRate(parsed.taxRate ?? 0);
        setDefaultDiscount(parsed.discount ?? 0);
        setDefaultSaleStatus(parsed.status || "Paid");
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

      // Company Profile
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

      // Sales Defaults
      localStorage.setItem(
        "salesDefaults",
        JSON.stringify({
          taxRate: defaultTaxRate,
          discount: defaultDiscount,
          status: defaultSaleStatus,
        })
      );

      setSaved(true);
      showToast("Settings saved successfully!", "success");
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

<div className="space-y-10" suppressHydrationWarning>
            {/* Company Profile */}
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

          {/* Sales Defaults */}
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

          {/* Preferences */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">Preferences</h2>
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
                <label className="block text-text-muted text-xs font-medium uppercase mb-1">Default Reorder Threshold</label>
                <input
                  type="number"
                  value={defaultReorder}
                  onChange={(e) => setDefaultReorder(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
                />
                <p className="text-text-muted text-xs mt-1">
                  Auto-filled when adding new materials.
                </p>
              </div>

              <div className="sm:col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">Show Unit Converter</p>
                  <p className="text-xs text-text-muted">Display on Materials page</p>
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
            </div>
          </section>

          {/* Data Management */}
          <section className="bg-surface-widget border border-default rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text mb-4">Data Management</h2>
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
                onClick={() => {
                  if (confirm("Download a full backup of your data (JSON)?")) {
                    alert("Full database backup will be implemented with the Reports phase. For now, use Export.");
                  }
                }}
                className="bg-surface border border-default text-text-secondary hover:bg-surface-elevated font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                💾 Backup (Coming Soon)
              </button>
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

          {/* Danger Zone */}
          <section className="bg-surface-widget border border-error rounded-xl p-6 mt-4">
            <h2 className="text-lg font-semibold text-error mb-4">Danger Zone</h2>
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

          {/* Save Button */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Save All Settings
              </button>
              {saved && (
                <span className="text-success text-sm font-medium">
                  ✓ Saved
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}