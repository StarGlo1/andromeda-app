// app/components/Navbar.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  Boxes,
  Package,
  ShoppingCart,
  Store,
  Users,
  Calculator,
  LayoutDashboard,
  Truck,
  MapPin,
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
  Network,
  Zap,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Inventory",
    icon: Boxes,
    items: [
      { name: "Materials", href: "/materials", icon: Package },
      { name: "Suppliers", href: "/suppliers", icon: Truck },
      { name: "Locations", href: "/locations", icon: MapPin },
      { name: "Adjustments", href: "/adjustments", icon: ArrowUpDown },
      { name: "Categories", href: "/categories", icon: Tags },
      { name: "Constellation Stock", href: "/consignment", icon: Network },
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
      { name: "Production History", href: "/production", icon: BarChart3 },
      { name: "Market Prep", href: "/market-prep", icon: Store },
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
      { name: "COGS", href: "/reports/cogs", icon: DollarSign },
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

function AnimatedMenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "visible",
      }}
    >
      {open ? (
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
        <g
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-2 -2) scale(1.15)"
        >
          <g>
            <polygon
              points="14,0.5 5.5,14 14,9.8"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <polygon points="14,0.5 22.5,14 14,9.8" fill="none" />
            <line x1="5.5" y1="14" x2="22.5" y2="14" />
          </g>
          <g transform="rotate(90 14 14)">
            <polygon
              points="14,0.5 5.5,14 14,9.8"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <polygon points="14,0.5 22.5,14 14,9.8" fill="none" />
            <line x1="5.5" y1="14" x2="22.5" y2="14" />
          </g>
          <g transform="rotate(180 14 14)">
            <polygon
              points="14,0.5 5.5,14 14,9.8"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <polygon points="14,0.5 22.5,14 14,9.8" fill="none" />
            <line x1="5.5" y1="14" x2="22.5" y2="14" />
          </g>
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
  const [isClosing, setIsClosing] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);
  const pathname = usePathname();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const currentGroup = NAV_GROUPS.find((group) =>
      group.items.some((item) => item.href === pathname)
    );
    if (currentGroup) {
      setExpandedGroup(currentGroup.label);
    }
  }, [pathname]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
    }, 700);
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeDrawer]);

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500 rounded-b-2xl shadow-sm transition-transform duration-700">
        <div className="w-full px-4 sm:px-8 lg:px-10">
          <div className="relative flex items-center justify-center py-2 sm:py-3">
            <button
              onClick={() => (drawerOpen ? closeDrawer() : setDrawerOpen(true))}
              className="absolute left-0 p-3 sm:p-3.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-500 text-indigo-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-300"
              aria-label={drawerOpen ? "Close Menu" : "Open Menu"}
            >
              <AnimatedMenuIcon open={drawerOpen} />
            </button>

            <Link className="flex items-center gap-3 sm:gap-5 group" href="/">
              <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.15em] sm:tracking-[0.25em] text-gray-900 dark:text-gray-100 leading-none">
                  ANDROMEDA
                </span>
                <span className="text-lg sm:text-2xl lg:text-3xl font-medium tracking-[0.2em] sm:tracking-[0.3em] text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1 uppercase">
                  Studios
                </span>
              </div>
            </Link>

            <button
              onClick={toggleTheme}
              className="absolute right-0 p-3 sm:p-3.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-500 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
              ) : (
                <Moon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {(drawerOpen || isClosing) &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              style={{
                animation: isClosing
                  ? "fadeOut 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                  : "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onClick={closeDrawer}
            />
            <div
              className="fixed left-0 top-0 bottom-0 w-full sm:w-[28rem] max-w-[100vw] sm:max-w-[90vw] bg-white dark:bg-black border-r border-gray-200 dark:border-slate-700 shadow-xl flex flex-col z-[70]"
              style={{
                height: "100vh",
                top: 0,
                left: 0,
                animation: isClosing
                  ? "slideOutLeftSmooth 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                  : "slideInLeftSmooth 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="w-full px-4 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between pt-[20px] pb-[11px] sm:py-[15px]">
                  <button
                    onClick={closeDrawer}
                    className="p-3 sm:p-3.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-500 text-indigo-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-300 -mt-[3px] sm:mt-0"
                    aria-label="Close Menu"
                  >
                    <AnimatedMenuIcon open={drawerOpen} />
                  </button>

                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                    <Image
                      src="/images/andromeda-logo.png"
                      alt="Andromeda Studios Logo"
                      width={64}
                      height={64}
                      className="object-contain w-full h-full"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300 dark:border-gray-700"></div>

              <div className="w-full px-4 sm:px-8 lg:px-10 py-2 sm:py-3">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  MENU
                </span>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-800"></div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-3 sm:pt-4">
                <Link
                  href={isAuthenticated ? "/dashboard" : "/signin"}
                  onClick={closeDrawer}
                  className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg text-[1.5rem] sm:text-[1.4rem] font-medium mb-1 text-gray-600 dark:text-gray-300 hover:bg-[#8a7a65] dark:hover:bg-slate-700 hover:text-white dark:hover:text-gray-100 transition-all duration-300"
                >
                  <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
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
                        className="w-full flex items-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg text-[1.5rem] sm:text-[1.4rem] font-medium text-gray-600 dark:text-gray-300 hover:bg-[#8a7a65] dark:hover:bg-slate-700 hover:text-white dark:hover:text-gray-100 transition-all duration-300"
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mr-3" />
                        <span>{group.label}</span>
                      </button>

                      {isExpanded && (
                        <div
                          className="ml-3 sm:ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-slate-700 pl-2 sm:pl-3"
                          style={{
                            animation: "slideDownSmooth 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        >
                          {group.items.map((item) => {
                            const SubIcon = item.icon;
                            return (
                              <Link
                                href={item.href}
                                key={item.name}
                                onClick={closeDrawer}
                                className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-[1.5rem] sm:text-[1.4rem] font-medium text-gray-600 dark:text-gray-300 hover:bg-[#8a7a65] dark:hover:bg-slate-700 hover:text-white dark:hover:text-gray-100 transition-all duration-300"
                              >
                                <SubIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
