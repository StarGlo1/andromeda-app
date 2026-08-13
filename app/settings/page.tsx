'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Calculator,
  Search,
  Sparkles,
  Plus,
  ArrowRight,
  Pencil,
  Check,
} from 'lucide-react';
import DashboardWidgets from '@/app/components/DashboardWidgets'; // adjust path if needed

// Sample data for widgets – replace with real data from your backend later
const dashboardData = {
  totalSales: 45,
  totalRevenue: 1480.0,
  rawMaterialsCount: 24,
  lowStockCount: 5,
  totalProducts: 12,
  totalInventoryValue: 4250.75,
  activeRecipesCount: 8,
  avgCogs: 6.25,
  potentialProfit: 2100.5,
  recentActivity: [
    { id: 1, name: 'Lavender Candle', type: 'product' },
    { id: 2, name: 'Vanilla Candle', type: 'product' },
  ],
  lowStockMaterials: [
    { id: 1, name: 'Soy Wax', category: { name: 'Wax' }, totalQuantity: 10, unit: 'lb', reorderThreshold: 20 },
    { id: 2, name: 'Cotton Wicks', category: { name: 'Wicks' }, totalQuantity: 15, unit: 'pcs', reorderThreshold: 25 },
  ],
};

// Quick Navigation default links
const DEFAULT_QUICK_LINKS = [
  { name: 'Materials', href: '/materials', icon: Package, color: 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400' },
  { name: 'Finished Goods', href: '/finished-goods', icon: Calculator, color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' },
  { name: 'Recipes', href: '/recipes', icon: Sparkles, color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400' },
];

// All available quick links for customization
const ALL_QUICK_LINKS = [
  { name: 'Materials', href: '/materials', icon: Package },
  { name: 'Finished Goods', href: '/finished-goods', icon: Calculator },
  { name: 'Recipes', href: '/recipes', icon: Sparkles },
  { name: 'Suppliers', href: '/suppliers', icon: Package }, // replace with proper icon
  { name: 'Sales', href: '/sales', icon: Calculator },
  { name: 'Customers', href: '/customers', icon: Package },
  { name: 'Settings', href: '/settings', icon: Package },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Batch Estimator state
  const [batchSizeOz, setBatchSizeOz] = useState(16);
  const [numCandles, setNumCandles] = useState(8);
  const [waxCostPerLb, setWaxCostPerLb] = useState(2.5);
  const [fragranceOzPerLb, setFragranceOzPerLb] = useState(1.0);
  const [fragranceCostPerOz, setFragranceCostPerOz] = useState(3.0);
  const [wickCostPerCandle, setWickCostPerCandle] = useState(0.15);
  const [containerCostPerCandle, setContainerCostPerCandle] = useState(1.2);

  // Quick Navigation custom state
  const [quickLinks, setQuickLinks] = useState(DEFAULT_QUICK_LINKS);
  const [editingQuickLinks, setEditingQuickLinks] = useState(false);

  // Load saved quick links from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dashboardQuickLinks');
      if (saved) {
        setQuickLinks(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveQuickLinks = (links: typeof DEFAULT_QUICK_LINKS) => {
    setQuickLinks(links);
    try {
      localStorage.setItem('dashboardQuickLinks', JSON.stringify(links));
    } catch {}
  };

  // Calculate batch cost
  const totalWaxOz = batchSizeOz;
  const totalFragranceOz = (batchSizeOz / 16) * fragranceOzPerLb;
  const totalWaxCost = (batchSizeOz / 16) * waxCostPerLb;
  const totalFragranceCost = totalFragranceOz * fragranceCostPerOz;
  const totalWickCost = numCandles * wickCostPerCandle;
  const totalContainerCost = numCandles * containerCostPerCandle;
  const totalBatchCost = totalWaxCost + totalFragranceCost + totalWickCost + totalContainerCost;
  const costPerCandle = numCandles > 0 ? totalBatchCost / numCandles : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of your inventory, production metrics, and sales performance.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Quick search materials, suppliers, or product formulas..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        />
        {searchQuery && (
          <div className="absolute right-3 top-2.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
            Press Enter to search
          </div>
        )}
      </div>

      {/* Draggable Widgets */}
      <DashboardWidgets data={dashboardData} />

      {/* Quick Batch Estimator Widget */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Quick Batch Estimator
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded text-teal-600 dark:text-teal-400 font-medium">
            Live
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Estimate your candle batch cost with just a few inputs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Batch Size (oz)</label>
            <input
              type="number"
              value={batchSizeOz}
              onChange={(e) => setBatchSizeOz(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Number of Candles</label>
            <input
              type="number"
              value={numCandles}
              onChange={(e) => setNumCandles(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Wax Cost / lb ($)</label>
            <input
              type="number"
              step="0.01"
              value={waxCostPerLb}
              onChange={(e) => setWaxCostPerLb(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Fragrance (oz/lb)</label>
            <input
              type="number"
              step="0.1"
              value={fragranceOzPerLb}
              onChange={(e) => setFragranceOzPerLb(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Fragrance Cost / oz ($)</label>
            <input
              type="number"
              step="0.01"
              value={fragranceCostPerOz}
              onChange={(e) => setFragranceCostPerOz(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Wick Cost / candle ($)</label>
            <input
              type="number"
              step="0.01"
              value={wickCostPerCandle}
              onChange={(e) => setWickCostPerCandle(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Container Cost / candle ($)</label>
            <input
              type="number"
              step="0.01"
              value={containerCostPerCandle}
              onChange={(e) => setContainerCostPerCandle(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Batch Cost:</span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 ml-2">
              ${totalBatchCost.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cost per Candle:</span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 ml-2">
              ${costPerCandle.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Navigation – Customizable 3 Tiles */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Navigation</h2>
          <button
            onClick={() => setEditingQuickLinks(!editingQuickLinks)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {editingQuickLinks ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
            {editingQuickLinks ? 'Done' : 'Edit'}
          </button>
        </div>

        {editingQuickLinks ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ALL_QUICK_LINKS.map((link) => {
              const isSelected = quickLinks.some((ql) => ql.name === link.name);
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    if (isSelected) {
                      saveQuickLinks(quickLinks.filter((ql) => ql.name !== link.name));
                    } else if (quickLinks.length < 3) {
                      saveQuickLinks([...quickLinks, { ...link, color: 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400' }]);
                    }
                  }}
                  className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-teal-600 dark:hover:border-teal-400 transition-colors group bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.color}`}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {link.name}
                    </h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}