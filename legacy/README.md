# legacy/ — původní Wedos web (archiv)

Tato složka obsahuje **původní verzi webu VeVit Art** tak, jak běžela na
Wedosu: statické HTML/CSS/vanilla JS + malé PHP/MySQL API v `api/`.

Web byl migrován na **Next.js 15 + Supabase + Resend + Vercel** — aktuální
produkční kód je v **kořenu repa** (`app/`, `components/`, `lib/`, `public/`).
Tato složka je **pouze archivní referenční kopie** a Vercel ji nenasazuje
(serva se Next.js aplikace z kořene).

## Co je zde
- `index.html`, `list.html`, `artist.html`, `404.html` — původní stránky
- `css/style.css`, `js/{data,main,popup}.js` — původní styly a skripty
- `api/*.php` — původní PHP backend (auth, profil, kontaktní formulář)
- `anelly/`, `art3mis/` — původní meta-refresh přesměrování
- `.htaccess`, `subdom/`, `llms.txt`, `logo.png`, `about-illustration.jpg`
- `README-original.md` — původní README

## Co zde NENÍ
- **`artists/` (portfolia ~40 MB)** — nejsou duplikována; designové soubory
  a obrázky portfolií žijí v nové verzi v `public/portfolios/{art3mis,anelly}/`.
- **Tajemství v `api/config.php`** — soubor je zde, ale **scrubbed** (hesla/klíče
  nahrazeny placeholdery). Původní `api/config.php` obsahoval Wedos MySQL
  heslo, Web3Forms klíč a DB údaje, které byly commitnuty v git historii
  (commit `4656add`) a jsou veřejné na GitHubu.

## Bezpečnost (akce nutné na tvé straně)
1. **Rotuj Wedos MySQL heslo** (heslo web-uživatele DB — viz git historie,
   commit `4656add`) — je veřejné na GitHubu.
2. **Smaž Web3Forms klíč / účet** (backend už nepoužívá Web3Forms; kontaktní
   formulář řeší Resend).
3. Zvaž `git filter-repo --path api/config.php --invert-paths` + force-push
   pro purge `api/config.php` z GitHub historie (samostatný krok, tvůj souhlas).