"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 border-[#1f1f25] bg-[#0e0e13] p-0">
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-4 border-b border-[#1f1f25] bg-[#0b0b0f] px-4 md:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-gray-400 hover:text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-sm font-medium text-gray-400">Admin Panel</h2>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#0b0b0f] p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
