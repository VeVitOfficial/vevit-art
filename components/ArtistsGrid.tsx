"use client";

import ArtistEntries from "./ArtistEntries";
import { artistsData } from "@/lib/artists";

export default function ArtistsGrid() {
  return <ArtistEntries artists={artistsData} />;
}
