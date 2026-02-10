"use client";

import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const { isScrolled } = useScrollPosition();

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full border border-border bg-card p-3 text-muted-foreground shadow-lg transition-all hover:border-purple-500/30 hover:text-foreground",
        isScrolled
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
