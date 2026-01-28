"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Link2,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/admin/auth";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: <Users className="w-5 h-5" />,
  },
  {
    href: "/admin/gallery",
    label: "Galeria",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    href: "/admin/links",
    label: "Links",
    icon: <Link2 className="w-5 h-5" />,
  },
];

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-black/40 backdrop-blur-md border-r border-white/10 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="font-display text-xl font-bold text-white">
              Admin
            </h2>
            <p className="font-body text-xs text-text-muted mt-0.5">
              SimplesmenteDigital
            </p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "font-body text-sm font-medium",
                "relative overflow-hidden group",
                isActive
                  ? "bg-primary/20 text-white"
                  : "text-text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              {!collapsed && (
                <span className="relative z-10">{item.label}</span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg",
            "font-body text-sm font-medium text-text-muted",
            "hover:bg-white/5 hover:text-white transition-all duration-200"
          )}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          {!collapsed && <span>Ver Site</span>}
        </a>
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
            "font-body text-sm font-medium text-text-muted",
            "hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </motion.aside>
  );
}
