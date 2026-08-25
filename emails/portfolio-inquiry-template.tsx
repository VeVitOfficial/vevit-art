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

export type PortfolioInquiryTemplateProps = {
  jmeno: string;
  email: string;
  zprava: string;
  artistName: string;
  artistNick?: string;
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

export default function PortfolioInquiryTemplate({
  jmeno,
  email,
  zprava,
  artistName,
  artistNick,
}: PortfolioInquiryTemplateProps) {
  const zdroj = artistNick
    ? `Portfolio — ${artistName} (${artistNick})`
    : `Portfolio — ${artistName}`;

  return (
    <Html>
      <Head />
      <Preview>Nová žádost o spolupráci — {artistName} | VeVit Art</Preview>
      <Body style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "32px 24px" }}>
          <Heading style={{ fontSize: 22, color: "#10B981", margin: "0 0 4px" }}>
            Nová žádost o spolupráci
          </Heading>
          <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 24px" }}>
            VeVit Art — zpráva z vašeho portfolia
          </Text>
          <Hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "0 0 24px" }} />

          <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Tuto zprávu vám poslal někdo z vašeho portfolia na vevit.art. Odpovězte
            přímo na jeho e-mail ({email}) přes Reply.
          </Text>

          <Field label="Jméno" value={jmeno} />
          <Field label="Email" value={email} />
          <Field label="Zpráva" value={zprava} />

          <Hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "24px 0" }} />

          <Field label="Zdroj" value={zdroj} />
          <Text style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "16px 0 0" }}>
            Kopie této zprávy byla odeslána i na info@vevit.art.
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