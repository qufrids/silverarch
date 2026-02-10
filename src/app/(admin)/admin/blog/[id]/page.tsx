import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogPostForm } from "@/components/forms/blog-post-form";
import type { BlogPost } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Blog Post</h1>
        <p className="text-sm text-gray-400">
          Update &ldquo;{(data as BlogPost).title}&rdquo;
        </p>
      </div>
      <BlogPostForm post={data as BlogPost} />
    </div>
  );
}
