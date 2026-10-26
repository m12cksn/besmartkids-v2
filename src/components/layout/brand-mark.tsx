import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
export function BrandMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-10 place-items-center rounded-xl bg-primary text-accent">
        <Lightbulb aria-hidden="true" className="size-6" />
      </span>
      {!compact && (
        <span className="text-lg font-black tracking-tight">
          BeSmart<span className="text-primary">Kids</span>
        </span>
      )}
    </span>
  );
}
