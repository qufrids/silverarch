import { GradientText } from "@/components/shared/gradient-text";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <GradientText className="text-2xl font-bold">
            SilverArch
          </GradientText>
        </div>
        {children}
      </div>
    </div>
  );
}
