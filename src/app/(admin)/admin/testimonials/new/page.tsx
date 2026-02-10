import { TestimonialForm } from "@/components/forms/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Testimonial</h1>
        <p className="text-sm text-gray-400">
          Add a new client testimonial.
        </p>
      </div>
      <TestimonialForm />
    </div>
  );
}
