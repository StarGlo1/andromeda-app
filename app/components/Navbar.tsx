"use client";

import { useState, useEffect, useRef } from "react";
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
  PackageSearch,
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
      { name: "Lot Traceability", href: "/lots", icon: PackageSearch },
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
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setExpandedGroup(null);
  }, [pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setExpandedGroup(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen || expandedGroup) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, expandedGroup]);

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
      {/* Fixed Top Navbar - pure black in dark mode */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-slate-700 rounded-b-2xl shadow-sm transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Left side: Hamburger + Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-300"
                aria-label="Open Menu"
              >
                <span className="flex flex-col items-center justify-center w-5 h-5 gap-1">
                  <span className="block w-5 h-0.5 rounded-full bg-current transition-all duration-300 group-hover:w-3 group-hover:translate-x-2"></span>
                  <span className="block w-3 h-0.5 rounded-full bg-current self-start transition-all duration-300 group-hover:w-5 group-hover:translate-x-0"></span>
                  <span className="block w-5 h-0.5 rounded-full bg-current transition-all duration-300 group-hover:w-4 group-hover:translate-x-1"></span>
                </span>
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

            {/* Desktop nav groups (accordion) */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                  pathname === "/"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Command Deck
              </Link>

              {NAV_GROUPS.map((group) => {
                const Icon = group.icon;
                const isExpanded = expandedGroup === group.label;
                return (
                  <button
                    key={group.label}
                    onClick={() => setExpandedGroup(isExpanded ? null : group.label)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                      isExpanded
                        ? "bg-teal-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {group.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop expanded submenu */}
          {expandedGroup && (
            <div className="hidden lg:block border-t border-gray-200 dark:border-slate-700 py-4 animate-slide-down">
              {NAV_GROUPS.find((g) => g.label === expandedGroup)?.items.map((item) => {
                const SubIcon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setExpandedGroup(null)}
                    className={`inline-flex items-center gap-3 px-4 py-2 mx-1 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-teal-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100"
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
      </nav>

      {/* Mobile Drawer with accordion */}
      {isOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gray-50 dark:bg-black border-r border-gray-200 dark:border-slate-700 shadow-xl animate-slide-in-left flex flex-col z-[70]"
              style={{ height: "100vh", top: 0, left: 0 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Menu</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Toggle Theme"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
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
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isExpanded
                            ? "bg-teal-600 text-white"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        {group.label}
                      </button>

                      {isExpanded && (
                        <div className="ml-4 border-l-2 border-gray-200 dark:border-slate-700 pl-2 mt-1 space-y-1">
                          {group.items.map((item) => {
                            const SubIcon = item.icon;
                            const isSubActive = pathname === item.href;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  isSubActive
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