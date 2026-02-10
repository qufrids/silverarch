import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { getBlogPosts } from "@/actions/blog-posts";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlowCard } from "@/components/shared/glow-card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Insights, tutorials, and industry perspectives from the SilverArch team.",
  path: "/blog",
});

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    posts = await getBlogPosts();
  } catch {
    posts = [];
  }

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Blog"
          title="Insights & Updates"
          description="Tutorials, industry perspectives, and behind-the-scenes looks at our work."
        />

        {posts.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            No blog posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <GlowCard className="group h-full cursor-pointer">
                  {/* Cover image placeholder */}
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg border border-[#1f1f25] bg-[#0b0b0f]">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/15 to-cyan-900/10">
                      <span className="text-sm font-bold text-white/10">
                        {post.title}
                      </span>
                    </div>
                  </div>

                  {post.category && (
                    <Badge
                      variant="secondary"
                      className="mb-3 border-[#1f1f25] bg-[#1a1a22] text-purple-400"
                    >
                      {post.category}
                    </Badge>
                  )}

                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-purple-400">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-400">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {post.published_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.published_at)}
                      </div>
                    )}
                    {post.reading_time && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.reading_time} min read
                      </div>
                    )}
                  </div>
                </GlowCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
