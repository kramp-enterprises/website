export function FaqBlock({
  items,
  title = "Questions we get",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl text-forest">{title}</h2>
        <dl className="mt-8 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.q} className="rounded-xl border border-line bg-card p-6">
              <dt className="font-display text-xl text-forest">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
