"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "default",
  className,
  type = "button",
  disabled,
}: GlowButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 group";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    secondary:
      "border border-[#1f1f25] bg-[#111116] text-white hover:border-purple-500/30 hover:bg-[#161620] hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
  };

  const sizes = {
    default: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
