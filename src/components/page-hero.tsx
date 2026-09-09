import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  kicker,
  title,
  lede,
  image,
  video,
  position = "center",
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  image: string;
  video?: string;
  position?: "center" | "top";
  children?: ReactNode;
}) {
  const mediaPos = position === "top" ? "object-top" : "object-center";
  return (
    <section className="relative isolate min-h-[58vh] overflow-hidden bg-forest-deep text-cream">
      <img
        src={image}
        alt=""
        className={cn("absolute inset-0 size-full object-cover opacity-50", mediaPos)}
      />
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={image}
          className={cn(
            "absolute inset-0 size-full object-cover opacity-50 motion-reduce:hidden",
            mediaPos,
          )}
          src={video}
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-r from-forest-deep via-forest-deep/78 to-forest/25" />
      <div className="relative mx-auto flex min-h-[58vh] max-w-6xl flex-col justify-end gap-4 px-4 py-16">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-cream/70">
          {kicker}
        </p>
        <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          {title}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
          {lede}
        </p>
        {children}
      </div>
    </section>
  );
}
