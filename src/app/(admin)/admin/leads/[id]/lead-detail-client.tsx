"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GlowButton } from "@/components/shared/glow-button";
import {
  markLeadAsRead,
  archiveLead,
  updateLeadNotes,
} from "@/actions/leads";
import type { Lead } from "@/types";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  DollarSign,
  Globe,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface LeadDetailClientProps {
  lead: Lead;
}

export function LeadDetailClient({ lead }: LeadDetailClientProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(lead.notes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [markingRead, setMarkingRead] = useState(false);
  const [archiving, setArchiving] = useState(false);

  async function handleMarkRead() {
    setMarkingRead(true);
    const result = await markLeadAsRead(lead.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Lead marked as read");
      router.refresh();
    }
    setMarkingRead(false);
  }

  async function handleArchive() {
    setArchiving(true);
    const result = await archiveLead(lead.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Lead archived");
      router.push("/admin/leads");
    }
    setArchiving(false);
  }

  async function handleSaveNotes() {
    setSavingNotes(true);
    const result = await updateLeadNotes(lead.id, notes);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Notes saved");
    }
    setSavingNotes(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/leads">
          <Button
            variant="outline"
            size="icon"
            className="border-[#1f1f25] bg-[#111116]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{lead.name}</h1>
          <p className="text-sm text-gray-400">Lead details</p>
        </div>
        <div className="flex gap-2">
          {!lead.is_read && (
            <Button
              variant="outline"
              onClick={handleMarkRead}
              disabled={markingRead}
              className="border-[#1f1f25] bg-[#111116]"
            >
              {markingRead ? "Marking..." : "Mark as Read"}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleArchive}
            disabled={archiving}
            className="border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            {archiving ? "Archiving..." : "Archive"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lead Info Card */}
        <div className="rounded-xl border border-[#1f1f25] bg-[#111116] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Contact Information
            </h2>
            <Badge
              className={
                lead.is_read
                  ? "bg-gray-500/10 text-gray-400 border-gray-500/20"
                  : "bg-purple-500/10 text-purple-400 border-purple-500/20"
              }
            >
              {lead.is_read ? "Read" : "Unread"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-sm text-purple-400 hover:underline"
                >
                  {lead.email}
                </a>
              </div>
            </div>

            {lead.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-gray-300">{lead.phone}</p>
                </div>
              </div>
            )}

            {lead.company && (
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm text-gray-300">{lead.company}</p>
                </div>
              </div>
            )}

            {lead.service_interest && (
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Service Interest</p>
                  <p className="text-sm text-gray-300">
                    {lead.service_interest}
                  </p>
                </div>
              </div>
            )}

            {lead.budget_range && (
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Budget Range</p>
                  <p className="text-sm text-gray-300">
                    {lead.budget_range}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Submitted</p>
                <p className="text-sm text-gray-300">
                  {new Date(lead.created_at).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {lead.source && (
              <div className="pt-2">
                <p className="text-xs text-gray-500">Source</p>
                <Badge
                  variant="outline"
                  className="mt-1 border-[#1f1f25] text-gray-400"
                >
                  {lead.source}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Message & Notes */}
        <div className="space-y-6">
          {/* Message */}
          <div className="rounded-xl border border-[#1f1f25] bg-[#111116] p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Message
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
              {lead.message}
            </p>
          </div>

          {/* Notes */}
          <div className="rounded-xl border border-[#1f1f25] bg-[#111116] p-6">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Internal Notes
            </h2>
            <div className="space-y-3">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Add notes about this lead..."
                className="border-[#1f1f25] bg-[#0b0b0f]"
              />
              <GlowButton
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
              >
                {savingNotes ? "Saving..." : "Save Notes"}
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
