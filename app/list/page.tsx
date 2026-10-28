import type { Metadata } from "next";
import ArtistsGrid from "@/components/ArtistsGrid";
import JsonLd from "@/components/JsonLd";
import { artistsData } from "@/lib/artists";

const SITE_URL = "https://vevit.art";

export const metadata: Metadata = {
  title: "Naši umělci",
  description:
    "Kompletní seznam umělců komunity VeVit Art, ilustrátoři, cosplayeři, sochaři, fotografové, hudebníci, spisovatelé a další. Klikněte na profil pro detail.",
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
        name: "Naši umělci. VeVit Art",
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
      <div className="page">
        <div className="wrap">
          <header className="page-head">
            <span className="label">Naši umělci</span>
            <h1 className="display">Naši umělci</h1>
            <p className="lede" id="list-subtitle">
              Kompletní seznam všech umělců, kteří se k nám přidali. Klikněte na jakéhokoli umělce pro více informací o
              jeho práci.
            </p>
          </header>

          <ArtistsGrid />

          {artistsData.length > 0 && (
            <div className="notice fade-in" id="list-join-cta" style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
              <h2>Chcete se také přidat?</h2>
              <p>Staňte se součástí VeVit Art. Společně tvoříme prostor, kde umění roste.</p>
              <a href="/#contact" className="btn">
                Přihlásit se zde
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
