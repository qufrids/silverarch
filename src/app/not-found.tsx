import Link from "next/link";
import { GlowButton } from "@/components/shared/glow-button";
import { GradientText } from "@/components/shared/gradient-text";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <GradientText as="h1" className="text-8xl font-bold">
        404
      </GradientText>
      <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
      <p className="max-w-md text-center text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <GlowButton href="/" size="lg">
        Back to Home
      </GlowButton>
    </div>
  );
}
