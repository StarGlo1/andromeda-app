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
  LayoutDashboard,
  Truck,
  FileText,
  Settings,
  Sun,
  Moon,
  BarChart3,
  DollarSign,
  ClipboardList,
  Tags,
  ArrowUpDown,
  Upload,
  Bell,
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

// Toggle between "orbit" and "waves" for the open state
const OPEN_ICON_STYLE: "orbit" | "waves" = "orbit";

function AnimatedMenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "visible",
      }}
    >
      {open ? (
        OPEN_ICON_STYLE === "orbit" ? (
          /* Orbit rings — 20% bigger */
          <g
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            transform="translate(-1.5 -1.5) scale(1.2)"
          >
            <circle cx="11" cy="14" r="4" fill="currentColor" stroke="none" />
            <ellipse
              cx="12.5"
              cy="14"
              rx="13"
              ry="5.5"
              transform="rotate(-22 12.5 14)"
            />
            <circle cx="25.5" cy="5.5" r="1.8" fill="currentColor" stroke="none" />
          </g>
        ) : (
          /* Three stacked waves */
          <g
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M4 6.5C6.5 5 9 8 14 6.5C19 5 21.5 8 24 6.5" />
            <path d="M4 14C6.5 12.5 9 15.5 14 14C19 12.5 21.5 15.5 24 14" />
            <path d="M4 21.5C6.5 20 9 23 14 21.5C19 20 21.5 23 24 21.5" />
          </g>
        )
      ) : (
        /* Pinwheel — adjusted to fit fully in viewBox */
        <g
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-2 -2) scale(1.15)"
        >
          {/* Blade 0 (Top) */}
          <g>
            <polygon
              points="14,0.5 5.5,14 14,9.8"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <polygon points="14,0.5 22.5,14 14,9.8" fill="none" />
            <line x1="5.5" y1="14" x2="22.5" y2="14" />
          </g>
          {/* Blade 1 (Right) */}
          <g transform="rotate(90 14 14)">
            <polygon
              points="14,0.5 5.5,14 14,9.8"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <polygon points="14,0.5 22.5,14 14,9.8" fill="none" />
            <line x1="5.5" y1="14" x2="22.5" y2="14" />
          </g>
          {/* Blade 2 (Bottom) */}
          <g transform="rotate(180 14 14)">
            <polygon
              points="14,0.5 5.5,14 14,9.8"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <polygon points="14,0.5 22.5,14 14,9.8" fill="none" />
            <line x1="5.5" y1="14" x2="22.5" y2="14" />
          </g>
          {/* Blade 3 (Left) */}
          <g transform="rotate(270 14 14)">
            <polygon
              points="14,0.5 5.5,14 14,9.8"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <polygon points="14,0.5 22.5,14 14,9.8" fill="none" />
            <line x1="5.5" y1="14" x2="22.5" y2="14" />
          </g>
        </g>
      )}
    </svg>
  );
}

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
          <div className="flex items-center justify-between py-5">
            {/* Left: Hamburger + Brand */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-300"
                aria-label={drawerOpen ? "Close Menu" : "Open Menu"}
              >
                <AnimatedMenuIcon open={drawerOpen} />
              </button>

              <Link className="flex items-center gap-3 group" href="/">
                <div className="w-11 h-11 rounded-xl bg-teal-600 flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform shrink-0">
                  <Boxes className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 truncate">
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
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Menu
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Toggle Theme"
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-indigo-600" />
                    )}
                  </button>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Close Menu"
                >
                  <AnimatedMenuIcon open={drawerOpen} />
                </button>
              </div>

              {/* Drawer Navigation */}
              <div className="flex-1 overflow-y-auto p-4">
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium mb-1 ${
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
                        onClick={() =>
                          setExpandedGroup(isExpanded ? null : group.label)
                        }
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
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
                                href={item.href}
                                key={item.name}
                                onClick={() => setDrawerOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
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