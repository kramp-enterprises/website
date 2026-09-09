import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-leaf/12 px-2 py-0.5 font-display text-[11px] uppercase tracking-[0.16em] text-leaf",
        className,
      )}
    >
      {children}
    </span>
  );
}
