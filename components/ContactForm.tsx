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
  const [status, setStatus] = useState<{ text: string; state: "idle" | "ok" | "error" }>({
    text: "",
    state: "idle",
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
    setStatus({ text: "", state: "idle" });

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
          state: "ok",
        });
        form.reset();
        onOborChange("");
      } else {
        throw new Error("Request failed");
      }
    } catch {
      setStatus({
        text: "Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo napište na info@vevit.art.",
        state: "error",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="form fade-in" id="contact-form" onSubmit={onSubmit} aria-describedby="form-status">
      <p className="form-note">Všechna pole kromě upřesnění oboru jsou povinná.</p>
      <div className="hp" aria-hidden="true">
        <label>
          Nevyplňujte
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="contact-name">Jméno</label>
          <input id="contact-name" type="text" name="jmeno" autoComplete="name" placeholder="Vaše jméno" required />
        </div>
        <div className="field">
          <label htmlFor="contact-email">E-mail</label>
          <input id="contact-email" type="email" name="email" autoComplete="email" placeholder="vas@email.cz" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="obor-select">Obor</label>
        <select
          name="obor"
          id="obor-select"
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
      <div className="field" id="other-field-group" hidden={!showOther}>
        <label htmlFor="contact-other">Váš obor</label>
        <input id="contact-other" type="text" name="obor_jiny" placeholder="Napište váš obor" />
      </div>
      <div className="field">
        <label htmlFor="contact-message">Zpráva</label>
        <textarea
          id="contact-message"
          name="zprava"
          rows={5}
          placeholder="Napište nám něco o sobě a proč se chcete zapojit…"
          required
        />
      </div>
      <button type="submit" className="btn" id="contact-submit" disabled={sending} aria-busy={sending}>
        <span className="btn-label">{sending ? "Odesílám…" : "Odeslat zprávu"}</span>
      </button>
      <p
        id="form-status"
        className="status"
        role={status.state === "error" ? "alert" : "status"}
        aria-live={status.state === "error" ? "assertive" : "polite"}
        data-state={status.state}
      >
        {status.text}
      </p>
    </form>
  );
}
