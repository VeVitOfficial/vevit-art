import "server-only";
import { Resend } from "resend";

// Lazy singleton: Resend konstruktor vyhodí chybu, když chybí API klíč.
// Next.js při buildu načítá moduly route handlerů („Collecting page data"),
// takže eager `new Resend(process.env.RESEND_API_KEY!)` by build bez env
// proměnné rozbil. Klient vytvoříme až při prvním requestu.
let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  _resend = new Resend(apiKey);
  return _resend;
}