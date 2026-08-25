"use client";

import Image from "next/image";
import { useArtistPopup } from "./ArtistPopupProvider";
import type { Artist } from "@/lib/artists";

export default function ArtistDetail({ artist }: { artist: Artist }) {
  const openArtistPopup = useArtistPopup();
  const skills = artist.skills ?? [];

  return (
    <article className="detail-grid fade-in">
      <figure className="detail-img" style={{ position: "relative" }}>
        <Image
          src={encodeURI(artist.image)}
          alt={artist.name}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </figure>
      <div>
        <span className="font-mono-label detail-field">{artist.fieldLabel}</span>
        <h1 className="detail-name">{artist.name}</h1>
        <p className="detail-desc">{artist.longDescription}</p>
        <div className="detail-meta">
          <div className="detail-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {artist.location}
          </div>
          <div className="detail-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Členem od {artist.joinDate}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <p className="skills-title">Dovednosti</p>
          <ul className="skills-list">
            {skills.length > 0 ? (
              skills.map((s) => (
                <li className="skill-tag" key={s}>
                  {s}
                </li>
              ))
            ) : (
              <li className="skill-tag" style={{ opacity: 0.5 }}>
                Dovednosti brzy doplníme
              </li>
            )}
          </ul>
        </div>
        <a
          href={encodeURI(artist.portfolioUrl)}
          className="btn-primary"
          style={{ width: "auto" }}
          onClick={(e) => {
            e.preventDefault();
            openArtistPopup(artist.nick, null);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Portfolio
        </a>
      </div>

      <aside className="social-section fade-in">
        <p className="social-title">Sociální sítě</p>
        <nav className="social-links" aria-label="Sociální sítě umělce">
          <a href="#" className="social-link">
            Instagram
          </a>
          <a href="#" className="social-link">
            Twitter / X
          </a>
        </nav>
      </aside>
    </article>
  );
}