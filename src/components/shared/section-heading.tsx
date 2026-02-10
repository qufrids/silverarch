import { cn } from "@/lib/utils";
import { GradientText } from "./gradient-text";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl space-y-4",
        centered && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <GradientText className="text-sm font-semibold uppercase tracking-widest">
          {label}
        </GradientText>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-400 text-balance">{description}</p>
      )}
    </div>
  );
}
