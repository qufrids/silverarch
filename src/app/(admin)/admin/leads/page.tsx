"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/types";

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { getLeads } = await import("@/actions/leads");
        const data = await getLeads();
        setLeads(data);
      } catch {
        // Failed to load leads
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (item: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          {!item.is_read && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-purple-500" />
          )}
          <span className="font-medium text-white">
            {String(item.name)}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-400">{String(item.email)}</span>
      ),
    },
    {
      key: "service_interest",
      label: "Service Interest",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-400">
          {item.service_interest ? String(item.service_interest) : "--"}
        </span>
      ),
    },
    {
      key: "is_read",
      label: "Status",
      render: (item: Record<string, unknown>) => (
        <Badge
          className={
            item.is_read
              ? "bg-gray-500/10 text-gray-400 border-gray-500/20"
              : "bg-purple-500/10 text-purple-400 border-purple-500/20"
          }
        >
          {item.is_read ? "Read" : "New"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      label: "Date",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-500">
          {new Date(String(item.created_at)).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="text-sm text-gray-400">
          {leads.length} lead{leads.length !== 1 ? "s" : ""} total
        </p>
      </div>

      <DataTable
        columns={columns}
        data={leads as unknown as Record<string, unknown>[]}
        searchField="name"
        onRowClick={(item) =>
          router.push(`/admin/leads/${String(item.id)}`)
        }
      />
    </div>
  );
}
