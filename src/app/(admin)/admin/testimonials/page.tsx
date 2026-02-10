import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { getAllTestimonials } from "@/actions/testimonials";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

  const columns = [
    {
      key: "client_name",
      label: "Client",
      render: (item: Record<string, unknown>) => (
        <div>
          <p className="font-medium text-white">
            {String(item.client_name)}
          </p>
          {item.client_company ? (
            <p className="text-xs text-gray-500">
              {String(item.client_company)}
            </p>
          ) : null}
        </div>
      ),
    },
    {
      key: "client_company",
      label: "Company",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-400">
          {item.client_company ? String(item.client_company) : "--"}
        </span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (item: Record<string, unknown>) => (
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-gray-300">
            {item.rating != null ? String(item.rating) : "--"}
          </span>
        </div>
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
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-sm text-gray-400">
            Manage client testimonials.
          </p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button variant="outline" className="border-[#1f1f25] bg-[#111116]">
            <Plus className="mr-2 h-4 w-4" />
            New Testimonial
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={testimonials as unknown as Record<string, unknown>[]}
        searchField="client_name"
        actions={(item) => (
          <Link href={`/admin/testimonials/${String(item.id)}`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        )}
      />
    </div>
  );
}
