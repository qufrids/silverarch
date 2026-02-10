import { Briefcase, FolderOpen, FileText, Inbox } from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/admin/stats-card";
import { createClient } from "@/lib/supabase/server";

async function getStats() {
  try {
    const supabase = await createClient();
    const [services, projects, posts, leads] = await Promise.all([
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("is_read", false),
    ]);
    return {
      services: services.count ?? 0,
      projects: projects.count ?? 0,
      posts: posts.count ?? 0,
      unreadLeads: leads.count ?? 0,
    };
  } catch {
    return { services: 0, projects: 0, posts: 0, unreadLeads: 0 };
  }
}

async function getRecentLeads() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("leads")
      .select("id, name, email, service_interest, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(5);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function AdminDashboard() {
  const [stats, recentLeads] = await Promise.all([
    getStats(),
    getRecentLeads(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400">Overview of your site.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Services" value={stats.services} icon={Briefcase} />
        <StatsCard title="Projects" value={stats.projects} icon={FolderOpen} />
        <StatsCard title="Blog Posts" value={stats.posts} icon={FileText} />
        <StatsCard
          title="Unread Leads"
          value={stats.unreadLeads}
          icon={Inbox}
        />
      </div>

      {/* Recent Leads */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
          <Link
            href="/admin/leads"
            className="text-sm text-purple-400 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="rounded-xl border border-[#1f1f25] bg-[#111116]">
          {recentLeads.length === 0 ? (
            <p className="p-6 text-center text-sm text-gray-500">
              No leads yet.
            </p>
          ) : (
            <div className="divide-y divide-[#1f1f25]">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-[#1a1a22]"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {!lead.is_read && (
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-purple-500" />
                      )}
                      {lead.name}
                    </p>
                    <p className="text-xs text-gray-400">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    {lead.service_interest && (
                      <p className="text-xs text-gray-400">
                        {lead.service_interest}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "New Service", href: "/admin/services/new" },
            { label: "New Project", href: "/admin/projects/new" },
            { label: "New Blog Post", href: "/admin/blog/new" },
            { label: "Site Settings", href: "/admin/settings" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-xl border border-[#1f1f25] bg-[#111116] p-4 text-center text-sm font-medium text-gray-400 transition-colors hover:border-purple-500/30 hover:text-white"
            >
              + {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
