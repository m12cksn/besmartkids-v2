import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-[background-color,color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover",
        secondary:
          "border border-border bg-card text-foreground shadow-sm hover:bg-muted",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:bg-yellow-300",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        default: "h-11",
        sm: "h-11 min-h-11 rounded-md px-3 text-sm",
        lg: "h-13 min-h-13 rounded-xl px-6 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
