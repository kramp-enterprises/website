import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GALLERY, GALLERY_FILTERS, type GalleryTag } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({ component: GalleryPage });

function GalleryPage() {
  const [tag, setTag] = useState<"all" | GalleryTag>("all");
  const items = GALLERY.filter((g) => tag === "all" || g.tag === tag);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">
        Gallery
      </p>
      <h1 className="mt-2 font-display text-5xl text-forest sm:text-6xl">
        Cut here. Stood here. Mowed here.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Shop photos, finished steel, grain sites this crew stood, and official
        Yarbo product shots.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setTag(f.id)}
            className={cn(
              "inline-flex h-10 items-center rounded-md px-4 font-display text-xs uppercase tracking-[0.16em]",
              tag === f.id
                ? "bg-forest text-cream"
                : "border border-line bg-card text-forest",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((g) => (
          <figure
            key={g.id}
            className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-line bg-card"
          >
            {g.video ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={g.src}
                src={g.video}
                className="w-full object-cover motion-reduce:hidden"
              />
            ) : null}
            <img
              src={g.src}
              alt={g.alt}
              className={cn(
                "w-full",
                g.cutout ? "bg-paper object-contain p-6 cutout-shadow" : "object-cover",
                g.video && "hidden motion-reduce:block",
              )}
            />
            <figcaption className="px-3 py-3 font-display text-sm tracking-wide text-forest">
              {g.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
