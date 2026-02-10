"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllPackages } from "@/actions/packages";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Package } from "@/types";

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPackages().then((data) => {
      setPackages(data);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "monthly_price",
      label: "Monthly Price",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-300">
          {item.monthly_price != null
            ? formatPrice(Number(item.monthly_price))
            : "--"}
        </span>
      ),
    },
    {
      key: "is_popular",
      label: "Popular",
      render: (item: Record<string, unknown>) => (
        <Badge
          className={
            item.is_popular
              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
              : "bg-gray-500/10 text-gray-400 border-gray-500/20"
          }
        >
          {item.is_popular ? "Popular" : "Standard"}
        </Badge>
      ),
    },
    {
      key: "display_order",
      label: "Order",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Packages</h1>
          <p className="text-sm text-gray-400">Manage pricing packages.</p>
        </div>
        <Link href="/admin/packages/new">
          <Button variant="outline" className="border-[#1f1f25] bg-[#111116]">
            <Plus className="mr-2 h-4 w-4" />
            New Package
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={packages as unknown as Record<string, unknown>[]}
        searchField="name"
        actions={(item) => (
          <Link href={`/admin/packages/${String(item.id)}`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        )}
      />
    </div>
  );
}
