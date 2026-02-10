import { PackageForm } from "@/components/forms/package-form";

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Package</h1>
        <p className="text-sm text-gray-400">Create a new pricing package.</p>
      </div>
      <PackageForm />
    </div>
  );
}
