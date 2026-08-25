import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type ContactTemplateProps = {
  jmeno: string;
  email: string;
  obor: string;
  obor_jiny?: string | null;
  zprava: string;
  source: "homepage" | "404" | "portfolio";
  artistNick?: string;
};

const SOURCE_LABEL: Record<ContactTemplateProps["source"], string> = {
  homepage: "Domovská stránka",
  "404": "Stránka 404",
  portfolio: "Portfolio umělce",
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Section style={{ marginBottom: 4 }}>
      <Text style={{ margin: 0, fontSize: 12, color: "#10B981", fontWeight: 600 }}>
        {label.toUpperCase()}
      </Text>
      <Text style={{ margin: "2px 0 0", fontSize: 15, color: "#FFFFFF", lineHeight: 1.5 }}>
        {value}
      </Text>
    </Section>
  );
}

export default function ContactTemplate({
  jmeno,
  email,
  obor,
  obor_jiny,
  zprava,
  source,
  artistNick,
}: ContactTemplateProps) {
  const oborValue =
    obor === "Jiné" && obor_jiny ? `${obor} — ${obor_jiny}` : obor;

  const zdroj = artistNick
    ? `${SOURCE_LABEL[source]} (${artistNick})`
    : SOURCE_LABEL[source];

  return (
    <Html>
      <Head />
      <Preview>Nové přihlášení umělce | VeVit Art</Preview>
      <Body style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "32px 24px" }}>
          <Heading style={{ fontSize: 22, color: "#10B981", margin: "0 0 4px" }}>
            Nové přihlášení umělce
          </Heading>
          <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 24px" }}>
            VeVit Art
          </Text>
          <Hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "0 0 24px" }} />

          <Field label="Jméno" value={jmeno} />
          <Field label="Email" value={email} />
          <Field label="Obor" value={oborValue} />
          <Field label="Zpráva" value={zprava} />

          <Hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "24px 0" }} />

          <Field label="Zdroj" value={zdroj} />
          <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "16px 0 0" }}>
            Odpovědět můžete přímo na e-mail odesílatele ({email}) přes Reply.
          </Text>

          <Hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "24px 0" }} />
          <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            VeVit Art — vevit.art
          </Text>
        </Container>
      </Body>
    </Html>
  );
}