"use client";

import Image from "next/image";
import { useArtistPopup } from "./ArtistPopupProvider";
import { getLatestArtists, type ArtistIconKey } from "@/lib/artists";

function Glyph({ iconKey }: { iconKey: ArtistIconKey }) {
  if (iconKey === "brush") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

export default function LatestArtists() {
  const openArtistPopup = useArtistPopup();
  const latest = getLatestArtists(3);

  if (latest.length === 0) {
    return (
      <div className="join-cta fade-in">
        <div className="join-cta-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
        </div>
        <h3 className="join-cta-title">Staň se naším prvním umělcem</h3>
        <p className="join-cta-text">
          Buďte první, kdo se připojí k VeVit Art. Společně vytvoříme prostor, kde umění roste.
        </p>
        <a href="#contact" className="btn-primary join-cta-btn">
          přihlásit se zde
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <div className="artist-icons-grid">
      {latest.map((artist, i) => (
        <button
          key={artist.nick}
          className="artist-icon fade-in"
          type="button"
          data-nick={artist.nick}
          aria-label={`Otevřít profil — ${artist.name}`}
          style={{ transitionDelay: `${i * 0.06}s` }}
          onClick={(e) => openArtistPopup(artist.nick, e.currentTarget)}
        >
          <span className="artist-icon-img">
            <Image
              src={encodeURI(artist.image)}
              alt={artist.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </span>
          <span className="artist-icon-body">
            <span className="artist-icon-text">
              <span className="artist-icon-name">{artist.name}</span>
              <span className="artist-icon-type">{artist.fieldLabel}</span>
            </span>
            <span className="artist-icon-glyph" aria-hidden="true">
              <Glyph iconKey={artist.iconKey} />
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}