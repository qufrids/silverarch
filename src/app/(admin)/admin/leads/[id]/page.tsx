import { notFound } from "next/navigation";
import { getLeadById } from "@/actions/leads";
import { LeadDetailClient } from "./lead-detail-client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) notFound();

  return <LeadDetailClient lead={lead} />;
}
