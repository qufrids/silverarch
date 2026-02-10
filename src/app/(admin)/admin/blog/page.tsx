import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllBlogPosts } from "@/actions/blog-posts";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "category",
      label: "Category",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-400">
          {item.category ? String(item.category) : "--"}
        </span>
      ),
    },
    {
      key: "is_published",
      label: "Status",
      render: (item: Record<string, unknown>) => (
        <Badge
          className={
            item.is_published
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
          }
        >
          {item.is_published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "published_at",
      label: "Published",
      render: (item: Record<string, unknown>) => (
        <span className="text-gray-500">
          {item.published_at ? formatDate(String(item.published_at)) : "--"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-sm text-gray-400">
            Manage your blog content.
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="outline" className="border-[#1f1f25] bg-[#111116]">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={posts as unknown as Record<string, unknown>[]}
        searchField="title"
        actions={(item) => (
          <Link href={`/admin/blog/${String(item.id)}`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        )}
      />
    </div>
  );
}
