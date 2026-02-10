import { ProjectForm } from "@/components/forms/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">New Project</h1>
        <p className="text-sm text-gray-400">
          Add a new portfolio project.
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}
