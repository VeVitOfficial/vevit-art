const FOOTER_LINKS = [
  { href: "/", label: "Domů" },
  { href: "/list", label: "Umělci" },
  { href: "/#about", label: "O nás" },
  { href: "/#contact", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="wordmark" aria-label="VeVit Art, úvodní stránka">
              VeVit <span>Art</span>
            </a>
            <p>Komunitní prostor pro začínající umělce všech oborů.</p>
          </div>
          <nav className="footer-col" aria-label="Navigace v zápatí">
            <h2>Na webu</h2>
            <ul>
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-col">
            <h2>Spojte se</h2>
            <ul>
              <li>
                <a href="https://discord.gg/kPPNp4JVum" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/vevit_art" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:info@vevit.art">info@vevit.art</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>&copy; 2026 VeVit Art</span>
          <span>
            Projekt od{" "}
            <a href="https://vevit.cz" target="_blank" rel="noopener noreferrer">
              VeVit Technologies
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
