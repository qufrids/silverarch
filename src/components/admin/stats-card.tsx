import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#1f1f25] bg-[#111116] p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <Icon className="h-5 w-5 text-gray-600" />
      </div>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {trend && <p className="mt-1 text-xs text-green-400">{trend}</p>}
    </div>
  );
}
