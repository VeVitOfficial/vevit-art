import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import ArtistPopupProvider from "@/components/ArtistPopupProvider";

const SITE_URL = "https://vevit.art";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "VeVit Art", template: "%s — VeVit Art" },
  description:
    "VeVit Art je komunitní prostor, který propojuje začínající umělce všech oborů — od ilustrace přes cosplay až po spisovatele. Společně rosteme, sdílíme a tvoříme.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: { locale: "cs_CZ", siteName: "VeVit Art", url: SITE_URL },
};

const rootJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "VeVit Art",
      alternateName: "VeVit Art — komunita pro umělce",
      description:
        "Komunitní prostor založený firmou VeVit Technologies, který propojuje začínající umělce všech oborů a dává jim prostor pro růst, sdílení a spolupráci.",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      email: "info@vevit.art",
      slogan: "Prostor, kde umění roste",
      foundingDate: "2026",
      areaServed: "CZ",
      knowsAbout: [
        "Ilustrace",
        "Cosplay",
        "Sochařství",
        "Fotografie",
        "Zpěváci",
        "Hudebníci",
        "Spisovatelé",
        "Tetování",
        "Masky a rekvizity",
      ],
      parentOrganization: { "@type": "Organization", name: "VeVit Technologies", url: "https://vevit.cz" },
      sameAs: ["https://www.instagram.com/vevit_art"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "VeVit Art",
      url: `${SITE_URL}/`,
      inLanguage: "cs",
      description:
        "Komunitní prostor propojující začínající umělce všech oborů — ilustrace, cosplay, sochařství, fotografie, hudba, spisovatelé a další.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "ReadAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/list`,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
      },
    },
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/#about-page`,
      name: "O projektu VeVit Art",
      url: `${SITE_URL}/#about`,
      inLanguage: "cs",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <JsonLd data={rootJsonLd} />
      </head>
      <body>
        <ArtistPopupProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Reveal />
        </ArtistPopupProvider>
      </body>
    </html>
  );
}