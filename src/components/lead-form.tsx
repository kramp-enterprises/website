import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { EMAIL, PHONE } from "@/lib/catalog";

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
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    const county = String(data.get("county") ?? "").trim();
    const size = String(data.get("size") ?? "").trim();
    const job = String(data.get("job") ?? "").trim();

    const subject =
      kind === "quote"
        ? `Bin quote — ${name || "Kramp site"}`
        : kind === "order"
          ? `Store order — ${name || "Kramp cart"}`
          : `Website message — ${name || "Kramp"}`;

    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      context ? `Items: ${context}` : null,
      county ? `County / town: ${county}` : null,
      size ? `Size: ${size}` : null,
      job ? `Job: ${job}` : null,
      notes ? `Notes:\n${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    onDone?.();
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-leaf/30 bg-leaf/8 p-6">
        <p className="font-display text-2xl text-forest">We have it.</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          That opened an email to the shop. If it didn’t, call {PHONE} or write{" "}
          {EMAIL}.
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
