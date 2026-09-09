import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandMark({
  invert = false,
  compact = false,
}: {
  invert?: boolean;
  compact?: boolean;
}) {
  return (
    <Link to="/" className="flex items-center" aria-label="Kramp Enterprises home">
      <img
        src="/images/logo.png"
        alt="Kramp Enterprises"
        className={cn(
          "w-auto object-contain object-left",
          compact ? "h-9 sm:h-10" : "h-11 sm:h-12",
          invert && "max-w-[220px] rounded-md bg-cream p-1.5",
        )}
      />
    </Link>
  );
}