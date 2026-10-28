"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useArtistPopup } from "./ArtistPopupProvider";
import type { Artist } from "@/lib/artists";

export default function ArtistDetail({ artist }: { artist: Artist }) {
  const openArtistPopup = useArtistPopup();
  const skills = artist.skills ?? [];

  return (
    <article className="grid fade-in" style={{ "--artist": artist.accent } as CSSProperties}>
      <figure className="profile-media plate">
        <div className="plate-image">
          <Image
            src={encodeURI(artist.image)}
            alt={artist.imageAlt}
            width={artist.imageWidth}
            height={artist.imageHeight}
            sizes="(max-width: 960px) 90vw, 460px"
            priority
          />
        </div>
      </figure>
      <div className="profile-body">
        <span className="label entry-field">{artist.fieldLabel}</span>
        <h1 className="display">{artist.name}</h1>
        <p className="lede">{artist.longDescription}</p>
        <dl className="facts">
          <dt>Lokalita</dt>
          <dd>{artist.location}</dd>
          <dt>Členem od</dt>
          <dd>{artist.joinDate}</dd>
        </dl>
        {skills.length > 0 && (
          <div>
            <h2 className="label" style={{ marginBottom: 10 }}>
              Dovednosti
            </h2>
            <ul className="chips">
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        <a
          href={encodeURI(artist.portfolioUrl)}
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            openArtistPopup(artist.nick, e.currentTarget);
          }}
        >
          Otevřít portfolio
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </article>
  );
}
