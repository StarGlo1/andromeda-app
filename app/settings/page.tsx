"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/app/context/ToastContext";
import { seedDemoData } from "@/app/actions/seedDemo";
import { useDemoMode } from "@/app/context/DemoModeContext";

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
  const { isDemoMode, enterDemoMode, exitDemoMode } = useDemoMode();
  const [seeding, setSeeding] = useState(false);

  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("imperial");
  const [currency, setCurrency] = useState("$");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [showConverter, setShowConverter] = useState(true);
  const [defaultReorder, setDefaultReorder] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const [defaultTaxRate, setDefaultTaxRate] = useState(0);
  const [defaultDiscount, setDefaultDiscount] = useState(0);
  const [defaultSaleStatus, setDefaultSaleStatus] = useState("Paid");

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
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
      localStorage.setItem("unitSystem", unitSystem);
      localStorage.setItem("currency", currency);
      localStorage.setItem("dateFormat", dateFormat);
      localStorage.setItem("showConverter", String(showConverter));
      if (defaultReorder) {
        localStorage.setItem("defaultReorder", defaultReorder);
      } else {
        localStorage.removeItem("defaultReorder");
      }

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
    <div className="space-y-8">
      {/* Company Profile */}
      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company Profile</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          This information appears on invoices, receipts, and reports.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Business Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your candle studio name"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Tax ID / EIN</label>
            <input
              type="text"
              value={companyTaxId}
              onChange={(e) => setCompanyTaxId(e.target.value)}
              placeholder="e.g. 12-3456789"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Address</label>
            <textarea
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              placeholder="Street address, city, state, zip"
              rows={2}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-y"
            />
          </div>
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Phone</label>
            <input
              type="tel"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Email</label>
            <input
              type="email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              placeholder="studio@candles.com"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Website</label>
            <input
              type="url"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="https://yourcandleshop.com"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Sales Defaults */}
      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Defaults</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Default values applied when creating new sales.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Default Tax Rate (%)</label>
            <select
              value={defaultTaxRate}
              onChange={(e) => setDefaultTaxRate(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {taxRates.map((rate) => (
                <option key={rate} value={rate}>{rate}%</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Default Discount (%)</label>
            <select
              value={defaultDiscount}
              onChange={(e) => setDefaultDiscount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {discountDefaults.map((d) => (
                <option key={d} value={d}>{d}%</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Default Sale Status</label>
            <select
              value={defaultSaleStatus}
              onChange={(e) => setDefaultSaleStatus(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {saleStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Unit System</label>
            <div className="flex gap-3">
              <button
                onClick={() => setUnitSystem("imperial")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  unitSystem === "imperial"
                    ? "bg-[#4f8792] text-white"
                    : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Imperial (oz, lb)
              </button>
              <button
                onClick={() => setUnitSystem("metric")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  unitSystem === "metric"
                    ? "bg-[#4f8792] text-white"
                    : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Metric (g, kg)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Currency Symbol</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {currencies.map((sym) => (
                <option key={sym} value={sym}>{sym}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Date Format</label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {dateFormats.map((fmt) => (
                <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Default Reorder Threshold</label>
            <input
              type="number"
              value={defaultReorder}
              onChange={(e) => setDefaultReorder(e.target.value)}
              placeholder="e.g. 50"
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Auto-filled when adding new materials.
            </p>
          </div>

          <div className="sm:col-span-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Show Unit Converter</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Display on Materials page</p>
            </div>
            <button
              onClick={() => setShowConverter(!showConverter)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full border-2 px-0.5 transition-colors duration-300 ${
                showConverter
                  ? "bg-[#4f8792] border-[#4f8792] justify-end"
                  : "bg-transparent border-[#bfb4a4] dark:border-gray-600 justify-start"
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full shadow-md transition-all duration-300 ${
                  showConverter ? "bg-white" : "bg-[#bfb4a4] dark:bg-gray-500"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Demo Mode Section */}
      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Demo Mode</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Explore Andromeda with sample data. Nothing you enter in demo mode will be saved, and any previously saved data remains untouched.
        </p>
        <button
          onClick={isDemoMode ? exitDemoMode : enterDemoMode}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isDemoMode
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-[#4f8792] hover:bg-[#426f79] text-white"
          }`}
        >
          {isDemoMode ? "Exit Demo Mode" : "Enter Demo Mode"}
        </button>
      </section>

      {/* Data Management */}
      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/import"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg border border-blue-600 transition-colors text-sm"
          >
            📥 Import Data
          </a>
          <a
            href="/api/export"
            className="inline-flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            ⬇️ Export All Data
          </a>
          <button
            onClick={() => {
              if (confirm("Download a full backup of your data (JSON)?")) {
                alert("Full database backup will be implemented with the Reports phase. For now, use Export.");
              }
            }}
            className="inline-flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            💾 Backup (Coming Soon)
          </button>
          <button
            onClick={handleSeedDemo}
            disabled={seeding}
            className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg border border-indigo-500 transition-colors text-sm disabled:opacity-50"
          >
            {seeding ? "Seeding..." : "🌱 Load Demo Data"}
          </button>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">
          Demo data includes sample materials, a sub‑assembly, and a finished product recipe. It won't overwrite existing data with the same names.
        </p>
      </section>

      {/* Danger Zone */}
      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6 mt-4">
        <h2 className="text-lg font-semibold text-red-500 mb-4">Danger Zone</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Permanently delete all data from the application. This includes materials, products, recipes, adjustments, and settings.
        </p>
        <button
          onClick={() => {
            if (confirm("Are you sure? This will delete ALL data and cannot be undone.")) {
              localStorage.clear();
              window.location.href = "/onboarding";
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg border border-red-600 transition-colors"
        >
          Reset Everything
        </button>
      </section>

      {/* Save Button */}
      <div className="flex justify-center pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-6 py-2 rounded-lg border border-[#4f8792] transition-colors"
          >
            Save All Settings
          </button>
          {saved && (
            <span className="text-green-500 text-sm font-medium">
              ✓ Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}