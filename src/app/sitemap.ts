import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const supabase = createAdminClient();

    const [servicesResult, projectsResult, blogResult] = await Promise.all([
      supabase.from("services").select("slug, updated_at").eq("is_active", true),
      supabase.from("projects").select("slug, updated_at").eq("is_active", true),
      supabase.from("blog_posts").select("slug, updated_at").eq("is_published", true),
    ]);

    const servicePages: MetadataRoute.Sitemap = (servicesResult.data ?? []).map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(s.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const portfolioPages: MetadataRoute.Sitemap = (projectsResult.data ?? []).map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const blogPages: MetadataRoute.Sitemap = (blogResult.data ?? []).map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...servicePages, ...portfolioPages, ...blogPages];
  } catch {
    return staticPages;
  }
}
