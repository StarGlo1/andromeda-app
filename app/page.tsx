'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Calculator,
  Search,
  Sparkles,
  ArrowRight,
  Pencil,
  Check,
  Truck,
  FileText,
  Settings,
  Bell,
} from 'lucide-react';
import DashboardWidgets from '@/app/components/DashboardWidgets';
import { syncAlerts } from '@/app/actions/alertSync';

const QUICK_LINK_ICONS: Record<string, React.ComponentType<any>> = {
  Package,
  Calculator,
  Sparkles,
  Truck,
  FileText,
  Settings,
  Bell,
};

const DEFAULT_QUICK_LINKS = [
  { name: 'Materials', href: '/materials', icon: 'Package', color: 'bg-[#c5d9dd] text-[#3d5a60]' },
  { name: 'Products', href: '/finished-goods', icon: 'Calculator', color: 'bg-[#d6d1e0] text-[#4d4760]' },
  { name: 'Recipes', href: '/recipes', icon: 'FileText', color: 'bg-[#e8d9bf] text-[#5e4c30]' },
];

const ALL_QUICK_LINKS = [
  { name: 'Materials', href: '/materials', icon: 'Package' },
  { name: 'Products', href: '/finished-goods', icon: 'Calculator' },
  { name: 'Recipes', href: '/recipes', icon: 'FileText' },
  { name: 'Suppliers', href: '/suppliers', icon: 'Truck' },
  { name: 'Sales', href: '/sales', icon: 'Calculator' },
  { name: 'Customers', href: '/customers', icon: 'Package' },
  { name: 'Settings', href: '/settings', icon: 'Settings' },
  { name: 'Alerts', href: '/alerts', icon: 'Bell' },
  { name: 'Calculator', href: '/calculator', icon: 'Calculator' },
  { name: 'Reports', href: '/reports', icon: 'FileText' },
  { name: 'COGS', href: '/cogs', icon: 'Calculator' },
  { name: 'Import / Export', href: '/import', icon: 'Truck' },
  { name: 'Pricing', href: '/pricing', icon: 'Settings' },
];

interface SearchResult {
  name: string;
  type: string;
  href: string;
  detail: string;
}

export default function CommandDeckPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [quickLinks, setQuickLinks] = useState(DEFAULT_QUICK_LINKS);
  const [editingQuickLinks, setEditingQuickLinks] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    rawMaterialsCount: 0,
    lowStockCount: 0,
    totalProducts: 0,
    totalInventoryValue: 0,
    activeRecipesCount: 0,
    avgCogs: 0,
    potentialProfit: 0,
    alertsCount: 0,
    recentActivity: [],
    lowStockMaterials: [],
    reorderSuggestions: [],
    topSelling: [],
    pendingSalesCount: 0,
    profitMargin: 0,
    expiringStock: [],
    profitTrend: [],
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dashboardQuickLinks');
      if (saved) {
        const parsed = JSON.parse(saved);
        const validLinks = parsed.map((link: any) => ({
          ...link,
          icon: QUICK_LINK_ICONS[link.icon] ? link.icon : 'Package',
        }));
        setQuickLinks(validLinks);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await syncAlerts();
        const res = await fetch('/api/dashboard-data');
        if (res.ok) {
          const data = await res.json();
          setDashboardData({
            totalSales: data.totalSales ?? 0,
            totalRevenue: data.totalRevenue ?? 0,
            rawMaterialsCount: data.totalMaterials ?? 0,
            lowStockCount: data.lowStockCount ?? 0,
            totalProducts: data.totalProducts ?? 0,
            totalInventoryValue: data.inventoryValue ?? 0,
            activeRecipesCount: data.totalRecipes ?? 0,
            avgCogs: data.avgCogs ?? 0,
            potentialProfit: data.potentialProfit ?? 0,
            alertsCount: data.alertsCount ?? 0,
            recentActivity: data.recentActivity || [],
            lowStockMaterials: data.lowStockMaterials || [],
            reorderSuggestions: data.reorderSuggestions || [],
            topSelling: data.topSelling || [],
            pendingSalesCount: data.pendingSalesCount ?? 0,
            profitMargin: data.profitMargin ?? 0,
            expiringStock: data.expiringStock || [],
            profitTrend: data.profitTrend || [],
          });
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };
    loadDashboardData();
  }, []);

  const saveQuickLinks = (links: typeof DEFAULT_QUICK_LINKS) => {
    setQuickLinks(links);
    try {
      localStorage.setItem('dashboardQuickLinks', JSON.stringify(links));
    } catch {}
  };

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
          if (res.ok) {
            const data = await res.json();
            setSearchResults(data.results || []);
            setShowSearchResults(true);
          }
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0) {
        router.push(searchResults[0].href);
        setSearchQuery('');
        setShowSearchResults(false);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Command Deck</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of your inventory, production metrics, and sales performance.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
          <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
          onFocus={() => searchQuery.trim().length >= 2 && setShowSearchResults(true)}
          placeholder="Search materials, products, suppliers, customers..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        />

        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-72 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={`${result.type}-${result.name}-${index}`}
                onClick={() => {
                  router.push(result.href);
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                  {result.name}
                </span>
                <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                  {result.type}
                </span>
                {result.detail && (
                  <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                    {result.detail}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {showSearchResults && searchResults.length === 0 && searchQuery.trim().length >= 2 && !isSearching && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            No results found for "{searchQuery}"
          </div>
        )}

        {isSearching && (
          <div className="absolute right-3 top-2.5 text-xs text-gray-500 dark:text-gray-400">
            Searching...
          </div>
        )}
      </div>

      {/* Draggable Widgets */}
      <DashboardWidgets data={dashboardData} />

      {/* Quick Navigation */}
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
                      saveQuickLinks([...quickLinks, { ...link, color: 'bg-[#c5d9dd] text-[#3d5a60]' }]);
                    }
                  }}
                  className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#4f8792] text-white border-[#4f8792]'
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
            {quickLinks.map((link) => {
              const IconComponent = QUICK_LINK_ICONS[link.icon] || Package;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#4f8792] dark:hover:border-[#4f8792] transition-colors group bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#4f8792] dark:group-hover:text-[#4f8792] transition-colors">
                        {link.name}
                      </h3>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-[#4f8792] dark:group-hover:text-[#4f8792] transition-colors" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}