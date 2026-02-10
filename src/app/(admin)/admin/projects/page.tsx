import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllProjects } from "@/actions/projects";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "category",
      label: "Category",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-400">{String(item.category)}</span>
      ),
    },
    {
      key: "is_featured",
      label: "Featured",
      render: (item: Record<string, unknown>) => (
        <Badge
          className={
            item.is_featured
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-gray-500/10 text-gray-400 border-gray-500/20"
          }
        >
          {item.is_featured ? "Featured" : "Standard"}
        </Badge>
      ),
    },
    {
      key: "display_order",
      label: "Order",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-gray-400">
            Manage your portfolio projects.
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button variant="outline" className="border-[#1f1f25] bg-[#111116]">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={projects as unknown as Record<string, unknown>[]}
        searchField="title"
        actions={(item) => (
          <Link href={`/admin/projects/${String(item.id)}`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        )}
      />
    </div>
  );
}
