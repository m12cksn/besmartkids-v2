import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary",
      accent: "bg-accent/30 text-accent-foreground",
      neutral: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
