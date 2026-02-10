import { BlogPostForm } from "@/components/forms/blog-post-form";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Blog Post</h1>
        <p className="text-sm text-gray-400">Write a new blog post.</p>
      </div>
      <BlogPostForm />
    </div>
  );
}
