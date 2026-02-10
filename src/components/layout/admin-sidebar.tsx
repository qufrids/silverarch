"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  DollarSign,
  FolderOpen,
  FileText,
  MessageSquare,
  Inbox,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";
import { GradientText } from "@/components/shared/gradient-text";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Packages", href: "/admin/packages", icon: DollarSign },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-[#1f1f25] bg-[#0e0e13] transition-all",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-[#1f1f25] px-4">
        {!collapsed && (
          <Link href="/admin">
            <GradientText className="text-lg font-bold">
              SilverArch
            </GradientText>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="rounded-md p-1.5 text-gray-400 hover:bg-[#111116] hover:text-white"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-purple-600/10 text-purple-400"
                  : "text-gray-400 hover:bg-[#111116] hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#1f1f25] p-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-[#111116] hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
