// Artist directory data — port of legacy js/data.js.
// Source of truth for the public marketing site (2 seeded demo artists).
// Shape mirrors a Supabase `artists` row so a future swap to a DB fetch is a
// one-line import change. Portfolio URLs now point at /public/portfolios/<nick>/.

export type ArtistIconKey = "brush" | "mic";

export type Artist = {
  nick: string;
  name: string;
  image: string;
  fieldLabel: string;
  iconKey: ArtistIconKey;
  accent: string;
  description: string;
  longDescription: string;
  location: string;
  joinDate: string; // dd.mm.yyyy
  portfolioUrl: string;
  skills?: string[];
};

export const artistsData: Artist[] = [
  {
    nick: "art3mis",
    name: "ART3MIS",
    image: "/portfolios/art3mis/uploads/20251020_222528-605336dc.jpg",
    fieldLabel: "Ilustrace",
    iconKey: "brush",
    accent: "#e6362e",
    description: "Anime a videoherní ilustrace — tužka, fix i digitální kresba.",
    longDescription:
      "Kreslíř od dětství. Anime a videoherní světy jsou hlavní inspirace; tužka, fix a čím dál víc i digitální kresba.",
    location: "CZ",
    joinDate: "10.08.2026",
    portfolioUrl: "/portfolios/art3mis/Art3mis Portfolio.dc.html",
  },
  {
    nick: "anelly",
    name: "Anelly",
    image: "/portfolios/anelly/uploads/IMG_5636.jpeg",
    fieldLabel: "Zpěvačka · Pop",
    iconKey: "mic",
    accent: "#8f9678",
    description: "Zpěvačka a autorka písní z Prahy.",
    longDescription:
      "Zpěvačka a autorka písní z Prahy. Píše o víře, pochybnostech a o tom, co se běžně neříká nahlas.",
    location: "Praha, CZ",
    joinDate: "05.08.2026",
    portfolioUrl: "/portfolios/anelly/Anelly Portfolio.dc.html",
  },
];

export function getArtistByNick(nick: string | null | undefined): Artist | undefined {
  if (!nick) return undefined;
  return artistsData.find((a) => a.nick === nick);
}

export function getLatestArtists(count: number): Artist[] {
  return artistsData
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.joinDate.split(".").reverse().join("-"));
      const dateB = new Date(b.joinDate.split(".").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, count);
}

export const ARTIST_ICONS: Record<ArtistIconKey, string> = {
  brush: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>',
  mic: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>',
};