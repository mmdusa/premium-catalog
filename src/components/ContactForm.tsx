"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // demo: no backend; just fake delay
    await new Promise(r => setTimeout(r, 900));
    setStatus("sent");
  }

  return (
    <form onSubmit={onSubmit} className="bg-white/80 rounded-2xl border border-gold/30 shadow-lg p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Name</label>
          <input className="input" required />
        </div>
        <div>
          <label className="label">Email</label>
          <input type="email" className="input" required />
        </div>
      </div>
      <div>
        <label className="label">Message</label>
        <textarea className="input h-32" required />
      </div>
      <button type="submit" className="btn" disabled={status==="sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && <p className="text-sm text-deepgreen/80">Thank you! We’ll get back to you soon.</p>}
    </form>
  );
}
