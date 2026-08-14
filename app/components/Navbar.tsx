"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Package,
  ShoppingCart,
  Users,
  Calculator,
  X,
  LayoutDashboard,
  Truck,
  FileText,
  Settings,
  Sun,
  Moon,
  Ruler,
  BarChart3,
  DollarSign,
  ClipboardList,
  Tags,
  ArrowUpDown,
  Upload,
  Bell,
  Menu,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Inventory",
    icon: Boxes,
    items: [
      { name: "Materials", href: "/materials", icon: Package },
      { name: "Suppliers", href: "/suppliers", icon: Truck },
      { name: "Adjustments", href: "/adjustments", icon: ArrowUpDown },
      { name: "Categories", href: "/categories", icon: Tags },
    ],
  },
  {
    label: "Production",
    icon: ClipboardList,
    items: [
      { name: "Products", href: "/finished-goods", icon: Package },
      { name: "Recipes", href: "/recipes", icon: FileText },
      { name: "Calculator", href: "/calculator", icon: Calculator },
      { name: "Pricing", href: "/pricing", icon: DollarSign },
    ],
  },
  {
    label: "Commerce",
    icon: ShoppingCart,
    items: [
      { name: "Sales", href: "/sales", icon: ShoppingCart },
      { name: "Customers", href: "/customers", icon: Users },
    ],
  },
  {
    label: "Insights",
    icon: BarChart3,
    items: [
      { name: "Reports", href: "/reports", icon: BarChart3 },
      { name: "COGS", href: "/cogs", icon: DollarSign },
      { name: "Alerts", href: "/alerts", icon: Bell },
    ],
  },
  {
    label: "System",
    icon: Settings,
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Import / Export", href: "/import", icon: Upload },
    ],
  },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setExpandedGroup(null);
  }, [pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setExpandedGroup(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      {/* Fixed top header with hamburger and brand */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-slate-700 rounded-b-2xl shadow-sm transition-transform duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Left: Hamburger + Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-300"
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform shrink-0">
                  <Boxes className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 truncate">
                  ANDROMEDA
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Drawer */}
      {drawerOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <div
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-black border-r border-gray-200 dark:border-slate-700 shadow-xl animate-slide-in-left flex flex-col z-[70]"
              style={{ height: "100vh", top: 0, left: 0 }}
            >
              {/* Drawer Header: Menu title + Theme Toggle + Close */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Menu</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Toggle Theme"
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-indigo-600" />
                    )}
                  </button>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <div className="flex-1 overflow-y-auto p-4">
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium mb-1 ${
                    pathname === "/"
                      ? "bg-teal-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 shrink-0" />
                  Command Deck
                </Link>

                {NAV_GROUPS.map((group) => {
                  const Icon = group.icon;
                  const isExpanded = expandedGroup === group.label;
                  return (
                    <div key={group.label} className="mb-1">
                      <button
                        onClick={() => setExpandedGroup(isExpanded ? null : group.label)}
                        className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isExpanded
                            ? "bg-teal-600 text-white"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0 mr-3" />
                        <span>{group.label}</span>
                      </button>

                      {isExpanded && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-slate-700 pl-2">
                          {group.items.map((item) => {
                            const SubIcon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setDrawerOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  isActive
                                    ? "bg-teal-600 text-white"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100"
                                }`}
                              >
                                <SubIcon className="w-4 h-4 shrink-0" />
                                {item.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}