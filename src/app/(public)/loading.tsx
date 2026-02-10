import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero skeleton */}
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-16 w-[600px] max-w-full" />
        <Skeleton className="h-16 w-[500px] max-w-full" />
        <Skeleton className="h-6 w-[400px] max-w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
