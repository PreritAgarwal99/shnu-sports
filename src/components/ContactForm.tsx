"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
  const sp = useSearchParams();
  const product = sp.get("product") || "";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold" />
        <h3 className="text-xl font-semibold">Enquiry sent</h3>
        <p className="text-muted">Thanks — we&apos;ll get back to you shortly. For anything urgent, WhatsApp or call us.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-2 text-sm font-medium text-gold hover:text-gold-bright">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      {product ? (
        <div className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-muted">
          Enquiry about: <span className="font-medium text-foreground">{product}</span>
          <input type="hidden" name="product" value={product} />
        </div>
      ) : null}

      <Field label="Name" name="name" placeholder="Your name" required />
      <Field label="Phone or email" name="contact" placeholder="How we can reach you" required />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="What are you looking for? Include size, quantity or budget if relevant."
          className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-gold"
        />
      </div>

      {/* Honeypot (hidden from users) */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === "error" ? <p className="text-sm text-red-400">{error}</p> : null}

      <button type="submit" disabled={status === "sending"} className="btn-gold w-full disabled:opacity-70">
        {status === "sending" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="h-4 w-4" /> Send enquiry</>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-gold"
      />
    </div>
  );
}
