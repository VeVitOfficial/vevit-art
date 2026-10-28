import type { Metadata } from "next";
import Image from "next/image";
import LatestArtists from "@/components/LatestArtists";
import HeroPlates from "@/components/HeroPlates";
import ContactForm from "@/components/ContactForm";
import CopyEmailButton from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "VeVit Art",
  alternates: { canonical: "https://vevit.art/" },
};

const activeOfferings = [
  {
    title: "Portfolio zdarma",
    desc: "Vlastní online portfolio, kde prezentujete svou tvorbu zcela zdarma a bez starostí s technikou.",
  },
  {
    title: "Komunitní prostor",
    desc: "Diskord, kde sdílíme práci, radíme si a povídáme si o tvorbě.",
  },
  {
    title: "Mentoring",
    desc: "Možnost poradit se a popovídat si se zkušenějšími umělci z komunity.",
  },
];

const plannedOfferings = [
  {
    title: "Workshopy",
    desc: "Workshop, kde si mezi sebou ukážeme vlastní postupy a techniky.",
  },
  {
    title: "Výstavy",
    desc: "Až nás bude víc, chceme uspořádat první společnou výstavu. Zatím je nás málo, to je jasný cíl, ne skrývaná podmínka.",
  },
];

const audiences = [
  { title: "Začínající umělci", desc: "Hledáte první kroky, inspiraci a podpůrné prostředí pro váš rozvoj." },
  { title: "Zkušení umělci", desc: "Chcete sdílet své know-how, mentorovat a propojit se s dalšími profesionály." },
  { title: "Cosplay komunita", desc: "Tvoříte kostýmy, rekvizity nebo se chcete naučit nové techniky craftingu." },
  {
    title: "Všestranní tvořivci",
    desc: "Klidně kreslíte a zároveň zpíváte, nebo šijete kostýmy a fotíte, nechcete se škatulkovat do jednoho oboru.",
  },
];

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="hero" aria-labelledby="hero-title">
        <div className="wrap grid">
          <header className="hero-copy">
            <p className="label">VeVit Art · Komunita pro umělce</p>
            <h1 className="display" id="hero-title">
              <span className="sr-only">VeVit Art: </span>
              Prostor, kde <em>umění</em> roste
            </h1>
            <p className="lede">
              Propojujeme začínající umělce všech oborů, od ilustrace přes cosplay až po spisovatele. Společně
              rosteme, sdílíme a tvoříme.
            </p>
            <div className="hero-actions">
              <a href="/list" className="btn">
                Prohlédněte si naše umělce <Arrow />
              </a>
              <a href="#about" className="arrow-link">
                nebo se dozvědět více
              </a>
            </div>
          </header>
          <HeroPlates />
        </div>
      </section>

      {/* LATEST ARTISTS */}
      <section id="artists" className="band band--deep" aria-labelledby="artists-title">
        <div className="wrap">
          <div className="section-head section-head--split fade-in">
            <div>
              <span className="label">Nejnovější přírůstky</span>
              <h2 className="title" id="artists-title">
                Poznejte nové tváře
              </h2>
              <p className="lede">Naši nejnovější členové komunity. Podívejte se, kdo se k nám přidal.</p>
            </div>
            <a href="/list" className="arrow-link">
              Zobrazit všechny umělce <Arrow />
            </a>
          </div>
          <LatestArtists />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="band" aria-labelledby="about-title">
        <div className="wrap grid">
          <div className="about-copy fade-in">
            <span className="label">O projektu</span>
            <h2 className="title" id="about-title">
              Co je VeVit Art?
            </h2>
            <div className="prose">
              <p>
                VeVit Art stavíme my z VeVit Technologies jako prostor pro začínající umělce, ilustrátory,
                cosplayery, sochaře, fotografy, hudebníky i spisovatele, bez ohledu na obor či zkušenosti. Chceme,
                aby tu každý, kdo tvoří, našel podporu a místo, kde si zaslouží růst.
              </p>
              <p>
                Právě teď je nás v komunitě pár. ART3MIS a Anelly, a průběžně hledáme další. Menší komunita
                znamená, že se tu neztratíte: vaši práci uvidíme, propojíme vás s ostatními a pomůžeme vám najít
                vlastní cestu.
              </p>
            </div>
          </div>
          <figure className="about-figure plate fade-in" style={{ ["--artist" as string]: "#e6362e" }}>
            <Image
              src={encodeURI("/portfolios/art3mis/uploads/20260106_220425-9fe8b4e8.jpg")}
              alt="Ilustrace fanart postav ze hry Hollow Knight, autorka ART3MIS"
              width={3849}
              height={2702}
              sizes="(max-width: 960px) 90vw, 520px"
            />
            <figcaption>
              <strong>ART3MIS</strong>
              Ilustrace, členka komunity
            </figcaption>
          </figure>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="band band--deep" aria-labelledby="offer-title">
        <div className="wrap">
          <div className="section-head fade-in">
            <span className="label">Naše aktivity</span>
            <h2 className="title" id="offer-title">
              Co pro vás chystáme
            </h2>
          </div>

          <div className="ledger-group fade-in">
            <h3 className="label">Aktivní nyní</h3>
            <ol className="ledger">
              {activeOfferings.map((o) => (
                <li key={o.title}>
                  <h3>{o.title}</h3>
                  <p>{o.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="ledger-group ledger-group--planned fade-in">
            <h3 className="label">V přípravě</h3>
            <ol className="ledger ledger--planned">
              {plannedOfferings.map((o) => (
                <li key={o.title}>
                  <h3>{o.title}</h3>
                  <p>{o.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="vision fade-in">
            Do budoucna bychom rádi šli dál, vlastní dílna s nástroji a materiálem, půjčovna cosplay kostýmů nebo
            pomoc s ochranou autorských práv. Je to naše vize, ne blízký slib, dá smysl až ve chvíli, kdy komunita
            skutečně poroste.
          </p>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="band" aria-labelledby="audience-title">
        <div className="wrap grid">
          <div className="audience-head fade-in">
            <span className="label">Cílová skupina</span>
            <h2 className="title" id="audience-title">
              Jste na správném místě, pokud…
            </h2>
            <p className="lede">
              VeVit Art je otevřené pro každého, kdo tvoří. Nezáleží na úrovni zkušeností ani na oboru, důležitá je
              vášeň a chuť se rozvíjet.
            </p>
          </div>
          <ul className="audience fade-in">
            {audiences.map((a) => (
              <li key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="band band--deep" aria-labelledby="contact-title">
        <div className="wrap grid">
          <div className="contact-intro fade-in">
            <span className="label">Přidejte se</span>
            <h2 className="title" id="contact-title">
              Jak se zapojit?
            </h2>
            <p className="prose">
              Chcete být součástí VeVit Art? Vyplňte formulář nebo se připojte přímo na náš Discord. Těšíme se na vás!
            </p>
            <ul className="channels">
              <li>
                <span className="label">Discord</span>
                <a href="https://discord.gg/kPPNp4JVum" target="_blank" rel="noopener noreferrer">
                  Připojit se na Discord<span className="sr-only"> (otevře se v novém okně)</span>
                </a>
              </li>
              <li>
                <span className="label">Instagram</span>
                <a href="https://www.instagram.com/vevit_art" target="_blank" rel="noopener noreferrer">
                  @vevit_art<span className="sr-only"> (otevře se v novém okně)</span>
                </a>
              </li>
              <li>
                <span className="label">E-mail</span>
                <CopyEmailButton email="info@vevit.art" />
              </li>
            </ul>
          </div>
          <ContactForm source="homepage" />
        </div>
      </section>
    </>
  );
}
