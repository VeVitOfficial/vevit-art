import { createElement } from "react";
import { z } from "zod";
import { getResend } from "@/lib/resend";
import { getArtistByNick } from "@/lib/artists";
import { getArtistContactEmail } from "@/lib/artist-contact";
import ContactTemplate from "@/emails/contact-template";
import PortfolioInquiryTemplate from "@/emails/portfolio-inquiry-template";

const schema = z.object({
  jmeno: z.string().min(1),
  email: z.string().email(),
  // obor je nepovinný — portfolio formulář ho nemá (jen jméno/e-mail/zpráva).
  obor: z.string().optional(),
  obor_jiny: z.string().nullable().optional(),
  zprava: z.string().min(1),
  botcheck: z.string().optional(),
  source: z.enum(["homepage", "404", "portfolio"]),
  artistNick: z.string().optional(),
});

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Neplatná data" }, { status: 422 });
  }

  // Honeypot — bot vyplnil skryté pole; tiše přijmeme, ale nic nepošleme.
  const parsed = schema.safeParse(data);
  if (parsed.success && parsed.data.botcheck && parsed.data.botcheck.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  // Kontrola původu (CSRF). V devu (env chybí) kontrolu přeskočíme.
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN;
  if (allowedOrigin) {
    const origin = request.headers.get("origin");
    const isAllowed =
      origin === allowedOrigin || (origin != null && origin.endsWith(".vercel.app"));
    if (!isAllowed) {
      return Response.json({ error: "Nepovolený původ" }, { status: 403 });
    }
  }

  if (!parsed.success) {
    return Response.json(
      { error: "Neplatná data", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { jmeno, email, zprava, source, artistNick } = parsed.data;

  // Portfolio: doručit PŘÍMO umělci (e-mail z server-only mapy, nikdy od klienta)
  // a přidat BCC na info@vevit.art (záznam/log pro tým).
  if (source === "portfolio") {
    if (!artistNick) {
      return Response.json({ error: "Neznámý umělec" }, { status: 422 });
    }
    const artistEmail = getArtistContactEmail(artistNick);
    const artist = getArtistByNick(artistNick);
    if (!artistEmail || !artist) {
      return Response.json({ error: "Neznámý umělec" }, { status: 422 });
    }

    const { error } = await getResend().emails.send({
      from: "VeVit Art <no-reply@vevit.art>",
      to: artistEmail,
      bcc: "info@vevit.art",
      replyTo: email,
      subject: `Nová žádost o spolupráci — ${artist.name} | VeVit Art`,
      react: createElement(PortfolioInquiryTemplate, {
        jmeno,
        email,
        zprava,
        artistName: artist.name,
        artistNick,
      }),
    });

    if (error) {
      return Response.json({ error: "Odeslání selhalo" }, { status: 500 });
    }
    return Response.json({ ok: true }, { status: 200 });
  }

  // Homepage / 404: přihlášení umělce → tým.
  const { error } = await getResend().emails.send({
    from: "VeVit Art <no-reply@vevit.art>",
    to: "info@vevit.art",
    replyTo: email,
    subject: "Nové přihlášení umělce | VeVit Art",
    react: createElement(ContactTemplate, parsed.data),
  });

  if (error) {
    return Response.json({ error: "Odeslání selhalo" }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}