const FOOTER_LINKS = [
  { href: "/", label: "Domů" },
  { href: "/#artists", label: "Nové tváře" },
  { href: "/#about", label: "O nás" },
  { href: "/#contact", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <span className="footer-logo">
            VeVit <span>Art</span>
          </span>
          <span className="footer-year">&copy; 2026</span>
        </div>
        <nav>
          <ul className="footer-links">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-credit">
          Projekt od <a href="https://vevit.cz" target="_blank" rel="noopener noreferrer">VeVit Technologies</a>
        </div>
      </div>
    </footer>
  );
}