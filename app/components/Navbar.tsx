"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Boxes, 
  Package, 
  ShoppingCart, 
  Users, 
  Calculator, 
  Menu, 
  X, 
  LayoutDashboard,
  Truck,
  FileText,
  Settings,
  Sun,
  Moon
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Materials", href: "/materials", icon: Boxes },
    { name: "Finished Goods", href: "/finished-goods", icon: Package },
    { name: "Recipes", href: "/recipes", icon: FileText },
    { name: "Suppliers", href: "/suppliers", icon: Truck },
    { name: "Sales", href: "/sales", icon: ShoppingCart },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Calculator", href: "/calculator", icon: Calculator },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="bg-surface-widget border border-default rounded-2xl mb-6 sm:mb-8 px-3 sm:px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shadow-md shadow-brand/20 group-hover:scale-105 transition-transform shrink-0">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-text truncate">
              ANDROMEDA
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive
                    ? "bg-brand text-white shadow-sm"
                    : "text-text-secondary hover:text-text hover:bg-surface-elevated"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions: Theme Toggle & Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-surface border border-default text-text-secondary hover:text-text hover:bg-surface-elevated transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-surface border border-default text-text-secondary hover:text-text hover:bg-surface-elevated transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Dropdown */}
      {isOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-default grid grid-cols-2 sm:grid-cols-3 gap-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2.5 ${
                  isActive
                    ? "bg-brand text-white"
                    : "text-text-secondary hover:text-text bg-surface hover:bg-surface-elevated"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}