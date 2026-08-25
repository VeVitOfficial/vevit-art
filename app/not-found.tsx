import type { Metadata } from "next";
import LatestArtists from "@/components/LatestArtists";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "VeVit Art",
};

export default function NotFound() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-particles">
          <div className="hero-particle" style={{ width: 120, height: 120, left: "10%", top: "20%" }} />
          <div className="hero-particle" style={{ width: 200, height: 200, left: "70%", top: "10%" }} />
          <div className="hero-particle" style={{ width: 80, height: 80, left: "80%", top: "60%" }} />
          <div className="hero-particle" style={{ width: 150, height: 150, left: "20%", top: "70%" }} />
          <div className="hero-particle" style={{ width: 100, height: 100, left: "50%", top: "80%" }} />
        </div>
        <div className="hero-content">
          <span className="font-mono-label hero-label">KOMUNITA PRO UMĚLCE</span>
          <h1 className="hero-title">VeVit Art</h1>
          <p className="hero-subtitle">
            Prostor, kde <span>umění</span> roste
          </p>
          <p className="hero-text">
            Propojujeme začínající umělce všech oborů — od ilustrace přes cosplay až po sochařství. Společně rosteme,
            sdílíme a tvoříme.
          </p>
          <a href="/list" className="hero-cta">
            Prohlédněte si naše umělce
          </a>
          <a href="#about" className="hero-secondary">
            nebo se dozvědět více
          </a>
        </div>
        <a href="#artists" className="hero-scroll">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </section>

      {/* LATEST ARTISTS */}
      <section id="artists" className="section-padding" style={{ background: "#131313" }}>
        <div className="container">
          <div className="fade-in" style={{ marginBottom: 48, display: "flex", flexWrap: "wrap", alignItems: "end", justifyContent: "space-between", gap: 16 }}>
            <div>
              <span className="font-mono-label section-label">NEJNOVĚJŠÍ PŘÍRŮSTKY</span>
              <h2 className="section-title">Poznejte nové tváře</h2>
              <p className="section-text">Naši nejnovější členové komunity. Podívejte se, kdo se k nám přidal.</p>
            </div>
            <a
              href="/list"
              className="link-arrow"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#10B981", fontWeight: 500, transition: "color 0.2s" }}
            >
              Zobrazit všechny umělce
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <LatestArtists />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-padding" style={{ background: "#0D0D0D" }}>
        <div className="container">
          <div className="two-col">
            <div className="fade-in">
              <span className="font-mono-label section-label">O PROJEKTU</span>
              <h2 className="section-title">Co je VeVit Art?</h2>
              <div className="text-secondary" style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 32 }}>
                <p style={{ marginBottom: 16 }}>
                  VeVit Art je komunitní prostor založený technologickou firmou VeVit Technologies. Věříme, že každý
                  umělec — bez ohledu na zkušenosti či obor — zaslouží podporu, inspiraci a možnost růstu.
                </p>
                <p>
                  Naše komunita je místem, kde se umělci mohou propojovat, vzájemně si pomáhat, sdílet zkušenosti a
                  společně tvořit něco většího.
                </p>
              </div>
              <ul className="values-list">
                <li className="value-item fade-in stagger-1">
                  <div className="value-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
                    </svg>
                  </div>
                  <span className="value-text">Propojení umělců napříč obory</span>
                </li>
                <li className="value-item fade-in stagger-2">
                  <div className="value-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span className="value-text">Vzájemná podpora a sdílení zkušeností</span>
                </li>
                <li className="value-item fade-in stagger-3">
                  <div className="value-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  </div>
                  <span className="value-text">Prostor pro růst a rozvoj talentu</span>
                </li>
                <li className="value-item fade-in stagger-4">
                  <div className="value-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="value-text">Inspirace a kreativní spolupráce</span>
                </li>
              </ul>
            </div>
            <div className="fade-in stagger-2">
              <figure style={{ position: "relative", margin: 0 }}>
                <img
                  src="/about-illustration.jpg"
                  alt="Ilustrace komunity VeVit Art"
                  style={{ width: "100%", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}
                />
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", inset: -16, background: "rgba(16,185,129,0.05)", borderRadius: 12, filter: "blur(24px)", zIndex: -1 }}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="section-padding" style={{ background: "#131313" }}>
        <div className="container">
          <div className="fade-in" style={{ marginBottom: 56 }}>
            <span className="font-mono-label section-label">NAŠE AKTIVITY</span>
            <h2 className="section-title">Co pro vás chystáme</h2>
          </div>

          {/* Active */}
          <div style={{ marginBottom: 56 }}>
            <div className="fade-in" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span className="status-badge active">AKTIVNÍ NYNÍ</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
            </div>
            <div className="artists-grid fade-in">
              {[
                {
                  title: "Portfolio zdarma",
                  desc: "Vlastní online portfolio, kde prezentujete svou tvorbu — zcela zdarma a bez starostí s technikou.",
                  icon: (
                    <>
                      <rect x="3" y="3" width="7" height="9" />
                      <rect x="14" y="3" width="7" height="5" />
                      <rect x="14" y="12" width="7" height="9" />
                      <rect x="3" y="16" width="7" height="5" />
                    </>
                  ),
                },
                {
                  title: "Komunitní prostor",
                  desc: "Online platforma pro sdílení práce, diskuzi a vzájemnou inspiraci.",
                  icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
                },
                {
                  title: "Mentoring",
                  desc: "Možnost konzultací s zkušenějšími umělci z komunity.",
                  icon: (
                    <>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </>
                  ),
                },
                {
                  title: "Výstavy",
                  desc: "Organizace skupinových výstav podmíněných dostatečným počtem členů.",
                  icon: (
                    <>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </>
                  ),
                },
              ].map((o) => (
                <article className="offering-card" key={o.title}>
                  <div className="offering-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {o.icon}
                    </svg>
                  </div>
                  <h3 className="offering-title">{o.title}</h3>
                  <p className="offering-desc">{o.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Planned */}
          <div>
            <div className="fade-in" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span className="status-badge planning">V PŘÍPRAVĚ</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
            </div>
            <div className="artists-grid grid-2col fade-in">
              {[
                { title: "Dílny pro naše umělce", desc: "Plně vybavené dílny se všemi materiály a nástroji, které budete potřebovat pro svou tvorbu.", path: "m22 8-6 6-6-6 M2 12h4 M20 12h2 m15 13 3 3 3-3 m9 13-3 3-3-3" },
                { title: "Workshopy", desc: "Praktické workshopy vedené zkušenými lektory z řad komunity.", path: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" },
                { title: "Půjčovna cosplay", desc: "Možnost zapůjčit si profesionální cosplay kostýmy pro focení či akce.", path: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" },
                { title: "Ochrana autorských práv", desc: "Pomoc s vymáháním autorských práv a poradenství v oblasti duševního vlastnictví.", path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
              ].map((o) => (
                <article className="offering-card planning" key={o.title}>
                  <div className="offering-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={o.path} />
                    </svg>
                  </div>
                  <h3 className="offering-title">{o.title}</h3>
                  <p className="offering-desc">{o.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="section-padding" style={{ background: "#0D0D0D" }}>
        <div className="container">
          <div className="two-col reverse">
            <div className="fade-in">
              <span className="font-mono-label section-label">CÍLOVÁ SKUPINA</span>
              <h2 className="section-title">Jste na správném místě, pokud...</h2>
              <p className="section-text">
                VeVit Art je otevřené pro každého, kdo tvoří. Nezáleží na úrovni zkušeností ani na oboru — důležitá je
                vášeň a chuť se rozvíjet.
              </p>
            </div>
            <div className="artists-grid grid-2col">
              {[
                { title: "Začínající umělci", desc: "Hledáte první kroky, inspiraci a podpůrné prostředí pro váš rozvoj.", path: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" },
                { title: "Zkušení tvůrci", desc: "Chcete sdílet své know-how, mentorovat a propojit se s dalšími profesionály.", path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
                { title: "Cosplay komunita", desc: "Tvoříte kostýmy, rekvizity nebo se chcete naučit nové techniky craftingu.", path: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" },
                { title: "Všestranní tvořivci", desc: "Kombinujete více oborů, experimentujete a hledáte svou cestu.", path: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20 M2 12h20", circle: true },
              ].map((a) => (
                <article className="audience-card fade-in" key={a.title}>
                  <div className="offering-icon" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {a.circle && <circle cx="12" cy="12" r="10" />}
                      <path d={a.path} />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{a.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-padding" style={{ background: "#131313" }}>
        <div className="container" style={{ maxWidth: 800, textAlign: "center" }}>
          <div className="fade-in">
            <span className="font-mono-label section-label">PŘIDEJTE SE</span>
            <h2 className="section-title">Jak se zapojit?</h2>
            <p className="section-text" style={{ margin: "0 auto 40px" }}>
              Chcete být součástí VeVit Art? Vyplňte formulář nebo se připojte přímo na náš Discord. Těšíme se na vás!
            </p>
          </div>
          <ContactForm source="404" />
          <div className="fade-in stagger-2" style={{ marginTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <a href="https://discord.gg/kPPNp4JVum" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="btn-label">Připojit se na Discord</span>
            </a>
            <a href="https://www.instagram.com/vevit_art" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
            <CopyEmailButton email="info@vevit.art" />
          </div>
        </div>
      </section>
    </>
  );
}