"use client";

import { useState } from "react";

type Source = "homepage" | "404" | "portfolio";

const OBOR_OPTIONS = [
  "Ilustrace",
  "Cosplay",
  "Sochařství",
  "Fotografie",
  "Zpěváci",
  "Hudebníci",
  "Spisovatelé",
  "Tetování",
  "Masky / Rekvizity",
  "Jiné",
];

export default function ContactForm({ source = "homepage" }: { source?: Source }) {
  const [obor, setObor] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [status, setStatus] = useState<{ text: string; color: string }>({
    text: "",
    color: "rgba(255,255,255,0.6)",
  });
  const [sending, setSending] = useState(false);

  const onOborChange = (value: string) => {
    setObor(value);
    setShowOther(value === "Jiné");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    setStatus({ text: "", color: "rgba(255,255,255,0.6)" });

    // Honeypot — silently accept, never send.
    if (fd.get("botcheck")) {
      setSending(false);
      form.reset();
      onOborChange("");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jmeno: fd.get("jmeno"),
          email: fd.get("email"),
          obor: fd.get("obor"),
          obor_jiny: fd.get("obor_jiny") || null,
          zprava: fd.get("zprava"),
          source,
        }),
      });
      if (res.ok) {
        setStatus({
          text: "Díky! Vaši zprávu jsme přijali. Ozveme se vám co nejdříve.",
          color: "#10B981",
        });
        form.reset();
        onOborChange("");
      } else {
        throw new Error("Request failed");
      }
    } catch {
      setStatus({
        text: "Něco se pokazilo. Zkuste to prosím znovu nebo napište na info@vevit.art.",
        color: "#ef4444",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      className="fade-in stagger-1"
      id="contact-form"
      onSubmit={onSubmit}
      style={{ textAlign: "left" }}
    >
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: "none !important" }}
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Jméno</label>
          <input type="text" name="jmeno" className="form-input" placeholder="Vaše jméno" required />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-input" placeholder="vas@email.cz" required />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Obor</label>
        <select
          name="obor"
          id="obor-select"
          className="form-input"
          required
          value={obor}
          onChange={(e) => onOborChange(e.target.value)}
        >
          <option value="" disabled>
            Vyberte váš obor
          </option>
          {OBOR_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group" id="other-field-group" style={{ display: showOther ? undefined : "none" }}>
        <label className="form-label">Váš obor</label>
        <input type="text" name="obor_jiny" className="form-input" placeholder="Napište váš obor" />
      </div>
      <div className="form-group">
        <label className="form-label">Zpráva</label>
        <textarea
          name="zprava"
          className="form-input"
          rows={5}
          placeholder="Napište nám něco o sobě a proč se chcete zapojit..."
          required
        />
      </div>
      <button type="submit" className="btn-primary" id="contact-submit" disabled={sending}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        <span className="btn-label">{sending ? "Odesílám…" : "Odeslat zprávu"}</span>
      </button>
      <p id="form-status" style={{ marginTop: 16, fontSize: 14, minHeight: 20, color: status.color }}>
        {status.text}
      </p>
    </form>
  );
}