// app/components/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLogo } from "@/app/context/LogoContext";
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
  Network,
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
      width="34"
      height="34"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "visible",
      }}
    >
      {open ? (
        /* Orbit rings */
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
        /* Pinwheel */
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
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const { logoUrl } = useLogo();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Auto-expand the group that contains the current page
  useEffect(() => {
    const currentGroup = NAV_GROUPS.find((group) =>
      group.items.some((item) => item.href === pathname)
    );
    if (currentGroup) {
      setExpandedGroup(currentGroup.label);
    }
  }, [pathname]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500 rounded-b-2xl shadow-sm transition-transform duration-300">
        <div className="w-full px-6 sm:px-8 lg:px-10">
          <div className="relative flex items-center justify-center py-7">
            {/* Left: Hamburger - stays in header, animates pinwheel/orbital */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="absolute left-0 p-3.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-500 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-300"
              aria-label={drawerOpen ? "Close Menu" : "Open Menu"}
            >
              <AnimatedMenuIcon open={drawerOpen} />
            </button>

            {/* Brand - Logo + Text together, centered, seamless */}
            <Link className="flex items-center gap-5 group" href="/">
              <div className="w-20 h-20 flex items-center justify-center shrink-0">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="Andromeda Studios Logo"
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                    priority
                  />
                ) : (
                  <Boxes className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                )}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-bold tracking-[0.25em] text-gray-900 dark:text-gray-100 leading-none">
                  ANDROMEDA
                </span>
                <span className="text-lg sm:text-xl font-medium tracking-[0.3em] text-gray-600 dark:text-gray-300 mt-1 uppercase">
                  Studios
                </span>
              </div>
            </Link>
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
              className="fixed left-0 top-0 bottom-0 w-[28rem] max-w-[90vw] bg-white dark:bg-black border-r border-gray-200 dark:border-slate-700 shadow-xl animate-slide-in-left flex flex-col z-[70]"
              style={{ height: "100vh", top: 0, left: 0 }}
            >
              {/* Row 1: Close button + Theme toggle */}
              <div className="w-full px-6 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between py-11">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-3.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-500 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 transition-all duration-300"
                    aria-label="Close Menu"
                  >
                    <AnimatedMenuIcon open={drawerOpen} />
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-3 rounded-xl bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    aria-label="Toggle Theme"
                  >
                    {isDark ? (
                      <Sun className="w-7 h-7 text-amber-400" />
                    ) : (
                      <Moon className="w-7 h-7 text-indigo-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Line separator */}
              <div className="border-b border-gray-300 dark:border-gray-700"></div>

              {/* Row 2: MENU title */}
              <div className="w-full px-6 sm:px-8 lg:px-10 py-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  MENU
                </span>
              </div>

              {/* Small thin break line */}
              <div className="border-b border-gray-200 dark:border-gray-800"></div>

              {/* Drawer Navigation */}
              <div className="flex-1 overflow-y-auto p-6 pt-4">
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-lg text-lg font-medium mb-1 text-gray-600 dark:text-gray-300 hover:bg-[#8a7a65] dark:hover:bg-slate-700 hover:text-white dark:hover:text-gray-100 transition-colors"
                >
                  <LayoutDashboard className="w-6 h-6 shrink-0" />
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
                        className="w-full flex items-center px-5 py-3.5 rounded-lg text-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-[#8a7a65] dark:hover:bg-slate-700 hover:text-white dark:hover:text-gray-100 transition-colors"
                      >
                        <Icon className="w-6 h-6 shrink-0 mr-3" />
                        <span>{group.label}</span>
                      </button>

                      {isExpanded && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-slate-700 pl-3">
                          {group.items.map((item) => {
                            const SubIcon = item.icon;
                            return (
                              <Link
                                href={item.href}
                                key={item.name}
                                onClick={() => setDrawerOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-[#8a7a65] dark:hover:bg-slate-700 hover:text-white dark:hover:text-gray-100 transition-colors"
                              >
                                <SubIcon className="w-5 h-5 shrink-0" />
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