"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/constants";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { GlowButton } from "@/components/shared/glow-button";
import { GradientText } from "@/components/shared/gradient-text";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-[#1f1f25] bg-[#0b0b0f]/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <GradientText className="text-xl font-bold tracking-tight">
            {siteConfig.name}
          </GradientText>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <GlowButton href="/contact" size="default">
            Start a Project
          </GlowButton>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-2 text-gray-400 hover:text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
