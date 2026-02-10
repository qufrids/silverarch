import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TestimonialForm } from "@/components/forms/testimonial-form";
import type { Testimonial } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Testimonial</h1>
        <p className="text-sm text-gray-400">
          Update testimonial from &ldquo;{(data as Testimonial).client_name}
          &rdquo;
        </p>
      </div>
      <TestimonialForm testimonial={data as Testimonial} />
    </div>
  );
}
