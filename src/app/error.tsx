"use client";

import { GlowButton } from "@/components/shared/glow-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-4xl font-bold text-foreground">Something went wrong</h1>
      <p className="max-w-md text-center text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4">
        <GlowButton onClick={reset}>Try Again</GlowButton>
        <GlowButton href="/" variant="secondary">
          Back to Home
        </GlowButton>
      </div>
    </div>
  );
}
