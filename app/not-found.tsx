import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stránka nenalezena",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="page">
      <div className="wrap">
        <div className="error-page">
          <p className="error-code" aria-hidden="true">
            404
          </p>
          <h1 className="title">Tahle stránka tu není</h1>
          <p className="lede">Odkaz je možná zastaralý nebo je v něm překlep. Podívejte se k umělcům, nebo se vraťte na úvod.</p>
          <div className="hero-actions">
            <a href="/" className="btn">
              Na úvodní stránku
            </a>
            <a href="/list" className="arrow-link">
              Naši umělci
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
