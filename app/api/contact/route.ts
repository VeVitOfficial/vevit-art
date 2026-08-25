import { createElement } from "react";
import { z } from "zod";
import { getResend } from "@/lib/resend";
import ContactTemplate from "@/emails/contact-template";

const schema = z.object({
  jmeno: z.string().min(1),
  email: z.string().email(),
  obor: z.string().min(1),
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

  const { error } = await getResend().emails.send({
    from: "VeVit Art <no-reply@vevit.art>",
    to: "info@vevit.art",
    replyTo: parsed.data.email,
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