import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type BrandMarkProps = { className?: string; compact?: boolean };

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-10 place-items-center rounded-xl bg-primary text-white shadow-sm">
        <span className="text-xl font-black" aria-hidden="true">B</span>
        <Sparkles className="absolute -right-1 -top-1 size-4 fill-accent text-accent" aria-hidden="true" />
      </span>
      {!compact && <span className="text-lg font-black tracking-tight">BeSmart<span className="text-primary">Kids</span></span>}
      <span className="sr-only">BeSmartKids</span>
    </div>
  );
}
