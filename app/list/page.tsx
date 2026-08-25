import type { Metadata } from "next";
import ArtistsGrid from "@/components/ArtistsGrid";
import JsonLd from "@/components/JsonLd";
import { artistsData } from "@/lib/artists";

const SITE_URL = "https://vevit.art";

export const metadata: Metadata = {
  title: "Naši umělci",
  description:
    "Kompletní seznam umělců komunity VeVit Art — ilustrátoři, cosplayeři, sochaři, fotografové, hudebníci, spisovatelé a další. Klikněte na profil pro detail.",
  alternates: { canonical: "https://vevit.art/list" },
};

export default function ListPage() {
  const itemListElement = artistsData.map((artist, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: artist.name,
      url: `${SITE_URL}/artist?nick=${encodeURIComponent(artist.nick)}`,
      image: artist.image,
      jobTitle: artist.fieldLabel,
      address: { "@type": "PostalAddress", addressLocality: artist.location },
      description: artist.description,
    },
  }));

  const listJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/list#page`,
        name: "Naši umělci — VeVit Art",
        url: `${SITE_URL}/list`,
        inLanguage: "cs",
        description:
          "Kompletní adresář umělců komunity VeVit Art. Každý profil obsahuje obor, lokalitu, dovednosti a odkaz na portfolio.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainContentOfPage: { "@id": `${SITE_URL}/list#artist-list` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domů", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Naši umělci", item: `${SITE_URL}/list` },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/list#artist-list`,
        name: "Umělci komunity VeVit Art",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: itemListElement.length,
        itemListElement,
      },
    ],
  };

  return (
    <>
      <JsonLd data={listJsonLd} />
      <main style={{ minHeight: "100vh", paddingTop: 96, paddingBottom: 80 }}>
        <div className="container">
          <header style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="font-mono-label section-label" style={{ marginBottom: 0 }}>
                NAŠI UMĚLCI
              </span>
            </div>
            <h1 className="page-title">Naši umělci</h1>
            <p className="section-text" id="list-subtitle">
              Kompletní seznam všech umělců, kteří se k nám přidali. Klikněte na jakéhokoli umělce pro více informací o
              jeho práci.
            </p>
          </header>

          <ArtistsGrid />

          {artistsData.length > 0 && (
            <div className="join-cta fade-in" id="list-join-cta" style={{ marginTop: 48 }}>
              <h3 className="join-cta-title">Chcete se také přidat?</h3>
              <p className="join-cta-text">
                Staňte se součástí VeVit Art. Společně tvoříme prostor, kde umění roste.
              </p>
              <a href="/#contact" className="btn-primary join-cta-btn">
                přihlásit se zde
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  );
}