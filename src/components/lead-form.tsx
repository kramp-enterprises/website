import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { PHONE } from "@/lib/catalog";

type Kind = "quote" | "contact" | "order";

export function LeadForm({
  kind,
  context,
  onDone,
}: {
  kind: Kind;
  context?: string;
  onDone?: () => void;
}) {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    onDone?.();
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-leaf/30 bg-leaf/8 p-6">
        <p className="font-display text-2xl text-forest">We have it.</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This preview stores the request on your device. When the live site is
          on krampenterprises.com, it will land in the shop inbox. Call{" "}
          {PHONE} if you need us today.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      {context ? <input type="hidden" name="context" value={context} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
      </div>
      <Field label="Email" name="email" type="email" />
      {kind === "quote" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="County / town" name="county" />
            <Field label="Bin diameter or bushels" name="size" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="job">What are you putting in?</Label>
            <select
              id="job"
              name="job"
              className="h-11 rounded-md border border-line bg-paper px-3 text-ink"
              defaultValue="new"
            >
              <option value="new">New bin site</option>
              <option value="add">Add to existing site</option>
              <option value="handling">Handling / auger / sweep</option>
              <option value="service">Service or repair</option>
            </select>
          </div>
        </>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="notes">
          {kind === "order" ? "Notes for this order" : "Notes"}
        </Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder={
            kind === "quote"
              ? "New vs add-on, wet holding, dryer, power, timeline…"
              : "Tell us what you need."
          }
        />
      </div>
      <Button type="submit" size="lg">
        {kind === "quote"
          ? "Send bin quote request"
          : kind === "order"
            ? "Request this order"
            : "Send message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
