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
  ChevronRight,
  ChevronDown,
  Ruler,
  BarChart3,
  DollarSign,
  ClipboardList,
  Tags,
  ArrowUpDown,
  Upload,
} from "lucide-react";

// Navigation groups as per the new structure
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

// Flatten items for mobile drawer, with group headers and a top Command Deck link
const MOBILE_ITEMS = [
  { type: "header", label: "Main" },
  { type: "link", name: "Command Deck", href: "/", icon: LayoutDashboard },
  ...NAV_GROUPS.flatMap((group) => [
    { type: "header", label: group.label },
    ...group.items.map((item) => ({ ...item, type: "link" })),
  ]),
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const pathname = usePathname();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setOpenDropdown(null);
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
      if (isOpen || openDropdown) return;
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
  }, [isOpen, openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      let closeAll = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(target)) {
          closeAll = false;
        }
      });
      if (closeAll) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      {/* Fixed Top Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 rounded-b-2xl shadow-sm transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Left side: Hamburger (mobile) + Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
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

            {/* Desktop Navigation (center) - visible from lg up */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Command Deck link */}
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                  pathname === "/"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Command Deck
              </Link>

              {NAV_GROUPS.map((group) => {
                const Icon = group.icon;
                const isOpenDropdown = openDropdown === group.label;
                return (
                  <div
                    key={group.label}
                    className="relative"
                    ref={(el) => {
                      dropdownRefs.current[group.label] = el;
                    }}
                  >
                    <button
                      onClick={() =>
                        setOpenDropdown(isOpenDropdown ? null : group.label)
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                        isOpenDropdown
                          ? "bg-teal-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {group.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpenDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpenDropdown && (
                      <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-2 z-50 animate-slide-down">
                        {group.items.map((item) => {
                          const SubIcon = item.icon;
                          const isSubActive = pathname === item.href;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                                isSubActive
                                  ? "bg-teal-600 text-white"
                                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
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

            {/* Right side: nothing (theme toggle removed, kept only in drawer) */}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (portal) */}
      {isOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-xl animate-slide-in-left flex flex-col z-[70]"
              style={{ height: "100vh", top: 0, left: 0 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Menu</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <nav className="flex flex-col gap-1">
                  {MOBILE_ITEMS.map((item, idx) => {
                    if (item.type === "header") {
                      return (
                        <div
                          key={`header-${idx}`}
                          className="mt-3 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                        >
                          {item.label}
                        </div>
                      );
                    }
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                          isActive
                            ? "bg-teal-600 text-white"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        {item.name}
                        <ChevronRight className="w-4 h-4 opacity-50 ml-auto" />
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}