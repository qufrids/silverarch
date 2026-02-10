"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/shared/glow-button";
import { createBlogPost, updateBlogPost } from "@/actions/blog-posts";
import { slugify } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogPostFormProps {
  post?: BlogPost;
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const data = {
      title: form.get("title") as string,
      slug: form.get("slug") as string,
      excerpt: form.get("excerpt") as string,
      content: form.get("content") as string,
      category: (form.get("category") as string) || undefined,
      author_name:
        (form.get("author_name") as string) || "SilverArch Team",
      tags: [],
      is_published: form.get("is_published") === "on",
    };

    const result = post
      ? await updateBlogPost(post.id, data)
      : await createBlogPost(data);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(post ? "Blog post updated" : "Blog post created");
      router.push("/admin/blog");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={post?.title}
            onChange={(e) => {
              if (!post) {
                const slugInput = document.getElementById(
                  "slug"
                ) as HTMLInputElement;
                if (slugInput) slugInput.value = slugify(e.target.value);
              }
            }}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            name="slug"
            required
            defaultValue={post?.slug}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt}
          placeholder="Brief summary of the post..."
          className="border-[#1f1f25] bg-[#0b0b0f]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content * (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={16}
          defaultValue={post?.content}
          placeholder="Write your blog post content here..."
          className="border-[#1f1f25] bg-[#0b0b0f] font-mono text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={post?.category || ""}
            placeholder="e.g. AI, Engineering, Design"
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author_name">Author Name</Label>
          <Input
            id="author_name"
            name="author_name"
            defaultValue={post?.author_name || "SilverArch Team"}
            className="border-[#1f1f25] bg-[#0b0b0f]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="is_published"
          name="is_published"
          defaultChecked={post?.is_published ?? false}
        />
        <Label htmlFor="is_published">Published</Label>
      </div>

      <div className="flex gap-4">
        <GlowButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : post
              ? "Update Post"
              : "Create Post"}
        </GlowButton>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
          className="border-[#1f1f25] bg-[#111116]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
