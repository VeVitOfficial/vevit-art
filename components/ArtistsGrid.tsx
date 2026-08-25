"use client";

import Image from "next/image";
import { useArtistPopup } from "./ArtistPopupProvider";
import { artistsData } from "@/lib/artists";

export default function ArtistsGrid() {
  const openArtistPopup = useArtistPopup();

  if (artistsData.length === 0) {
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
        <a href="/#contact" className="btn-primary join-cta-btn">
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
    <div className="artists-grid">
      {artistsData.map((artist, i) => (
        <article
          key={artist.nick}
          className="artist-card fade-in"
          data-nick={artist.nick}
          style={{ ["--accent" as string]: artist.accent || "#10B981", transitionDelay: `${i * 0.05}s` }}
        >
          <a
            href={`/artist?nick=${artist.nick}`}
            onClick={(e) => {
              e.preventDefault();
              openArtistPopup(artist.nick, e.currentTarget.closest(".artist-card") as HTMLElement);
            }}
          >
            <div className="artist-card-img" style={{ position: "relative" }}>
              <Image
                src={encodeURI(artist.image)}
                alt={artist.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="artist-card-body">
              <span className="artist-tag">{artist.fieldLabel}</span>
              <h3 className="artist-card-title">{artist.name}</h3>
              <p className="artist-card-desc">{artist.description}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
                {artist.location}
              </p>
              <span className="artist-card-link">
                Zobrazit profil
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l9.2-9.2M17 17V8H8" />
                </svg>
              </span>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}