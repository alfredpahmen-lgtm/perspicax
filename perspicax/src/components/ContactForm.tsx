"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "hairline w-full rounded-[10px] border bg-gradient-to-b from-surface/70 to-bg/40 px-4 py-[0.8125rem] text-[0.9rem] leading-[1.6] text-text placeholder:text-muted/60 outline-none transition-[border-color,box-shadow] duration-[var(--hover-duration)] ease-[var(--ease-out)] hover:border-muted/34 focus:border-violet/65 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.14)]";

const labelClass = "text-xs uppercase tracking-[0.08em] text-muted";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      book: data.get("book"),
      goal: data.get("goal"),
      message: data.get("message"),
      company: data.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        setStatus("error");
        setError(result.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2.5">
          <span className={labelClass}>Name</span>
          <input className={inputClass} type="text" name="name" placeholder="Your name" required maxLength={200} />
        </label>
        <label className="flex flex-col gap-2.5">
          <span className={labelClass}>Email</span>
          <input className={inputClass} type="email" name="email" placeholder="you@example.com" required maxLength={320} />
        </label>
      </div>

      <label className="flex flex-col gap-2.5">
        <span className={labelClass}>Book title + link</span>
        <input
          className={inputClass}
          type="text"
          name="book"
          placeholder="Title — Amazon or Goodreads URL"
          required
          maxLength={500}
        />
      </label>

      <label className="flex flex-col gap-2.5">
        <span className={labelClass}>Main goal</span>
        <select className={inputClass} name="goal" defaultValue="reviews">
          <option value="reviews">More reviews</option>
          <option value="discovery">Reader discovery</option>
          <option value="visibility">General visibility</option>
        </select>
      </label>

      <label className="flex flex-col gap-2.5">
        <span className={labelClass}>
          Message <span className="normal-case tracking-normal opacity-70">(optional)</span>
        </span>
        <textarea
          className={inputClass}
          name="message"
          rows={4}
          placeholder="Anything that helps us place it well."
          maxLength={4000}
        />
      </label>

      {/* Honeypot — hidden from real visitors, invisible to screen readers, catches bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="gradient-primary pressable group relative isolate inline-flex items-center justify-center rounded-full px-8 py-[0.9375rem] text-sm font-medium text-text disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 shadow-[0_10px_40px_-12px_rgba(139,92,246,0.85)] transition-opacity duration-[var(--hover-duration)] ease-[var(--ease-out)] group-hover:opacity-100"
          />
          {status === "sending" ? "Sending…" : "Send"}
        </button>

        <div role="status" aria-live="polite">
          {status === "sent" && (
            <span className="text-[0.8125rem] text-teal">
              Thank you — we&apos;ll read it and write back.
            </span>
          )}
          {status === "error" && error && (
            <span className="text-[0.8125rem] text-accent">{error}</span>
          )}
        </div>
      </div>
    </form>
  );
}
