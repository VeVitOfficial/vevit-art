"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useArtistPopup } from "./ArtistPopupProvider";
import type { Artist } from "@/lib/artists";

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export function NoArtistsYet() {
  return (
    <div className="notice fade-in">
      <h2>Staň se naším prvním umělcem</h2>
      <p>Buďte první, kdo se připojí k VeVit Art. Společně vytvoříme prostor, kde umění roste.</p>
      <a href="/#contact" className="btn">
        Přihlásit se zde <Arrow />
      </a>
    </div>
  );
}

/** Katalog umělců: každý záznam je jedna „stěna“ s dílem, jménem a odkazem na portfolio. */
export default function ArtistEntries({ artists }: { artists: Artist[] }) {
  const openArtistPopup = useArtistPopup();

  if (artists.length === 0) return <NoArtistsYet />;

  return (
    <div className="entries">
      {artists.map((artist, i) => (
        <article
          key={artist.nick}
          className="entry fade-in"
          data-nick={artist.nick}
          style={{ "--artist": artist.accent, transitionDelay: `${i * 0.05}s` } as CSSProperties}
        >
          <div className="entry-media">
            <a
              className="plate-image"
              href={encodeURI(artist.portfolioUrl)}
              aria-label={`Otevřít portfolio, ${artist.name}`}
              onClick={(e) => {
                e.preventDefault();
                openArtistPopup(artist.nick, e.currentTarget);
              }}
            >
              <Image
                src={encodeURI(artist.image)}
                alt={artist.imageAlt}
                width={artist.imageWidth}
                height={artist.imageHeight}
                sizes="(max-width: 960px) 90vw, 360px"
              />
            </a>
          </div>
          <div className="entry-body">
            <span className="label entry-field">{artist.fieldLabel}</span>
            <h3 className="entry-name">{artist.name}</h3>
            <p className="entry-desc">{artist.description}</p>
            <p className="label">{artist.location}</p>
            <div className="entry-actions">
              <a
                className="btn"
                href={encodeURI(artist.portfolioUrl)}
                onClick={(e) => {
                  e.preventDefault();
                  openArtistPopup(artist.nick, e.currentTarget.closest(".entry")?.querySelector<HTMLElement>(".plate-image") ?? null);
                }}
              >
                Otevřít portfolio <Arrow />
              </a>
              <a className="arrow-link" href={`/artist?nick=${artist.nick}`}>
                O umělci
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
