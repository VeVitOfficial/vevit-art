"use client";

import ArtistEntries from "./ArtistEntries";
import { getLatestArtists } from "@/lib/artists";

export default function LatestArtists() {
  return <ArtistEntries artists={getLatestArtists(3)} />;
}
