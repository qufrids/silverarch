import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug } from "@/actions/blog-posts";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/shared/gradient-text";
import { formatDate } from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    path: `/blog/${slug}`,
    image: post.cover_image_url || undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All Posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          {post.category && (
            <Badge
              variant="secondary"
              className="mb-4 border-border bg-secondary text-purple-400"
            >
              {post.category}
            </Badge>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author_name}
            </div>
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at)}
              </div>
            )}
            {post.reading_time && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.reading_time} min read
              </div>
            )}
          </div>
        </header>

        {/* Cover image placeholder */}
        {post.cover_image_url ? (
          <div className="mb-12 aspect-video overflow-hidden rounded-xl border border-border">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="mb-12 aspect-video overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/15 to-cyan-900/10">
              <GradientText className="text-2xl font-bold">
                {post.title}
              </GradientText>
            </div>
          </div>
        )}

        {/* Content */}
        <article className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-headings:font-bold prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-purple-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card prose-pre:border prose-pre:border-border prose-li:text-foreground/80 prose-blockquote:border-purple-500 prose-blockquote:text-muted-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Tags */}
        {post.tags && (post.tags as string[]).length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {(post.tags as string[]).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
