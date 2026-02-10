"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllServices } from "@/actions/services";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "slug",
      label: "Slug",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-500">{String(item.slug)}</span>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      render: (item: Record<string, unknown>) => (
        <Badge
          className={
            item.is_active
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-gray-500/10 text-gray-400 border-gray-500/20"
          }
        >
          {item.is_active ? "Active" : "Inactive"}
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
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-sm text-gray-400">
            Manage your service offerings.
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button variant="outline" className="border-[#1f1f25] bg-[#111116]">
            <Plus className="mr-2 h-4 w-4" />
            New Service
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={services as unknown as Record<string, unknown>[]}
        searchField="title"
        actions={(item) => (
          <Link href={`/admin/services/${String(item.id)}`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        )}
      />
    </div>
  );
}
