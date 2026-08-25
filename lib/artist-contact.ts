import "server-only";

// Skutečné kontaktní e-maily umělců — SERVER-ONLY. `import "server-only"` zajistí,
// že modul nikdy neskončí v client bundlu (build fail při accidental client import).
// Dříve byly tyto e-maily vystavené v .dc.html portfoliích (mailto:), takže je kdokoli
// viděl ve view-source. Teď žijí jen tady → soukromí umělců se zlepší a `to` adresu
// si server vždy dopočítá z `artistNick` (klient nikdy `to` neposílá → žádný open relay).
export const ARTIST_CONTACT_EMAIL: Record<string, string> = {
  art3mis: "hanasulcova139@seznam.cz",
  anelly: "annabodruhova@gmail.com",
};

export function getArtistContactEmail(
  nick: string | null | undefined
): string | undefined {
  if (!nick) return undefined;
  return ARTIST_CONTACT_EMAIL[nick];
}