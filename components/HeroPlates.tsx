"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useArtistPopup } from "./ArtistPopupProvider";
import { artistsData } from "@/lib/artists";

/** Dvě „zavěšená“ díla v hero: reálná tvorba členů, každé s popiskem a barvou umělce. */
export default function HeroPlates() {
  const openArtistPopup = useArtistPopup();
  const featured = artistsData.slice(0, 2);
  if (featured.length === 0) return null;

  return (
    <div className="plates">
      {featured.map((artist, i) => (
        <figure className="plate" key={artist.nick} style={{ "--artist": artist.accent } as CSSProperties}>
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
              sizes="(max-width: 960px) 45vw, 330px"
              priority={i === 0}
            />
          </a>
          <figcaption>
            <strong>{artist.name}</strong>
            {artist.fieldLabel}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
