import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ArtistDetail from "@/components/ArtistDetail";
import { getArtistByNick } from "@/lib/artists";

const SITE_URL = "https://vevit.art";

type Props = {
  searchParams: Promise<{ nick?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { nick } = await searchParams;
  const artist = getArtistByNick(nick);
  if (!artist) {
    return {
      title: "Profil nenalezen",
      description:
        "Profil umělce komunity VeVit Art, obor, lokalita, dovednosti, datum připojení a odkazy na sociální sítě a portfolio.",
      alternates: { canonical: `${SITE_URL}/artist` },
    };
  }
  return {
    title: artist.name,
    description: `${artist.name}, ${artist.fieldLabel}, ${artist.location}. ${artist.longDescription}`,
    alternates: { canonical: `${SITE_URL}/artist?nick=${encodeURIComponent(artist.nick)}` },
    openGraph: {
      title: `${artist.name}. VeVit Art`,
      description: artist.longDescription,
      images: [{ url: artist.image }],
    },
  };
}

export default async function ArtistPage({ searchParams }: Props) {
  const { nick } = await searchParams;
  const artist = getArtistByNick(nick);
  const profileUrl = `${SITE_URL}/artist?nick=${encodeURIComponent(nick ?? "")}`;

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/artist#page`,
        name: "Profil umělce. VeVit Art",
        url: `${SITE_URL}/artist`,
        inLanguage: "cs",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domů", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Naši umělci", item: `${SITE_URL}/list` },
          { "@type": "ListItem", position: 3, name: "Profil umělce", item: profileUrl },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={pageJsonLd} />
      <div className="page">
        <div className="wrap">
          <a href="/list" className="back-link" id="back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Zpět na naše umělce
          </a>

          {artist ? (
            <>
              <ArtistDetail artist={artist} />
              <JsonLd
                data={{
                  "@context": "https://schema.org",
                  "@type": ["Person", "ProfilePage"],
                  "@id": profileUrl,
                  name: artist.name,
                  url: profileUrl,
                  image: artist.image,
                  description: artist.longDescription,
                  jobTitle: artist.fieldLabel,
                  address: { "@type": "PostalAddress", addressLocality: artist.location },
                  memberOf: { "@id": `${SITE_URL}/#organization` },
                  knowsAbout: artist.skills ?? [],
                }}
              />
            </>
          ) : (
            <article className="notice fade-in" style={{ marginTop: 24 }}>
              <h2>Umělec nenalezen</h2>
              <p>Tento profil neexistuje. Podívejte se na ostatní umělce, nebo se k nám přidejte.</p>
              <a href="/list" className="btn">
                Zpět na naše umělce
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </article>
          )}
        </div>
      </div>
    </>
  );
}
