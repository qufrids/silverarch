"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navItems, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/shared/glow-button";
import { GradientText } from "@/components/shared/gradient-text";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full border-[#1f1f25] bg-[#0b0b0f] sm:w-80"
      >
        <SheetHeader className="text-left">
          <SheetTitle>
            <GradientText className="text-xl font-bold">
              {siteConfig.name}
            </GradientText>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#111116] text-white"
                  : "text-gray-400 hover:bg-[#111116] hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 px-4">
          <GlowButton href="/contact" className="w-full" onClick={onClose}>
            Start a Project
          </GlowButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
