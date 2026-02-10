import { ServiceForm } from "@/components/forms/service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Service</h1>
        <p className="text-sm text-gray-400">Create a new service offering.</p>
      </div>
      <ServiceForm />
    </div>
  );
}
