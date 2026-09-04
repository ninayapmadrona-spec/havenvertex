"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          name="name"
          placeholder="Your name"
          className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email address"
          className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent"
        />
      </div>
      <textarea
        required
        name="message"
        rows={4}
        placeholder="Tell us about your business and what you need support with…"
        className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-accent to-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            Sending <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            Send Message{" "}
            <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {status === "success" && (
        <p className="text-sm text-accent">
          Thank you — your message is on its way. We&rsquo;ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-300">
          Something went wrong. Please try again or book a call directly.
        </p>
      )}
    </form>
  );
}
