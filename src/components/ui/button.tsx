import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display uppercase tracking-[0.12em] text-sm font-semibold transition-colors transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-forest text-cream hover:bg-forest-deep",
        leaf: "bg-leaf text-cream hover:bg-leaf-bright",
        outline:
          "border border-forest/20 bg-transparent text-forest hover:bg-forest hover:text-cream",
        ghost: "text-forest hover:bg-forest/10",
        cream: "bg-cream text-forest hover:bg-paper",
        invert: "bg-cream text-forest hover:bg-paper",
      },
      size: {
        default: "h-11 px-5 rounded-md",
        sm: "h-9 px-3 rounded-sm text-xs",
        lg: "h-12 px-7 rounded-lg",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
