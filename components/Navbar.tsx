"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Domů" },
  { href: "/list", label: "Umělci" },
  { href: "/#about", label: "O nás" },
  { href: "/#contact", label: "Zapojit se" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape zavře panel a vrátí fokus na tlačítko; klik mimo panel ho zavře také.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname === href);

  return (
    <header className="site-header">
      <div className="wrap">
        <a href="/" className="wordmark" aria-label="VeVit Art, úvodní stránka">
          VeVit <span>Art</span>
        </a>
        <nav aria-label="Hlavní navigace">
          <ul className="nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="menu-panel"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span>{menuOpen ? "Zavřít" : "Menu"}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>
      <div id="menu-panel" ref={panelRef} className={`menu-panel${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobilní navigace">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
