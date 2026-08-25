"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getArtistByNick } from "@/lib/artists";

type OpenFn = (nick: string, thumbEl: HTMLElement | null) => void;

const ArtistPopupContext = createContext<OpenFn>(() => {});

export function useArtistPopup() {
  return useContext(ArtistPopupContext);
}

export default function ArtistPopupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const openRef = useRef(false);
  const savedOverflow = useRef("");
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("about:blank");

  const openArtistPopup = useCallback<OpenFn>((nick, thumbEl) => {
    const artist = getArtistByNick(nick);
    if (!artist) return;

    const popupEl = popupRef.current;
    const overlay = overlayRef.current;
    if (!popupEl || !overlay) return;

    const rect = thumbEl
      ? thumbEl.getBoundingClientRect()
      : {
          left: window.innerWidth / 2,
          top: window.innerHeight / 2,
          width: 120,
          height: 120,
        };

    const boxLeft = window.innerWidth * 0.02;
    const boxTop = window.innerHeight * 0.02;
    const boxW = window.innerWidth * 0.96;
    const boxH = window.innerHeight * 0.96;

    const dx = rect.left - boxLeft;
    const dy = rect.top - boxTop;
    const sx = Math.max(0.05, rect.width / boxW);
    const sy = Math.max(0.05, rect.height / boxH);

    popupEl.style.setProperty("--dx", dx + "px");
    popupEl.style.setProperty("--dy", dy + "px");
    popupEl.style.setProperty("--sx", String(sx));
    popupEl.style.setProperty("--sy", String(sy));

    setSrc(encodeURI(artist.portfolioUrl));

    savedOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Ensure closed state, then animate open on next frame (double-rAF,
    // matching popup.js:60-67 so the initial scaled transform registers).
    setOpen(false);
    void popupEl.offsetWidth;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true));
    });
    openRef.current = true;
  }, []);

  const closeArtistPopup = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
  }, []);

  // Reset iframe + body overflow once the close transition finishes.
  useEffect(() => {
    const popupEl = popupRef.current;
    if (!popupEl || open) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform" && e.propertyName !== "visibility") return;
      if (!openRef.current) {
        setSrc("about:blank");
        document.body.style.overflow = savedOverflow.current;
      }
      popupEl.removeEventListener("transitionend", onEnd as EventListener);
    };
    popupEl.addEventListener("transitionend", onEnd as EventListener);
    return () => popupEl.removeEventListener("transitionend", onEnd as EventListener);
  }, [open]);

  // Escape + backdrop click.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) closeArtistPopup();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeArtistPopup]);

  // Auto-open from ?open=<nick> (legacy /<nick> shortcuts). Mirrors main.js:94-100.
  useEffect(() => {
    const nick = new URLSearchParams(window.location.search).get("open");
    if (nick) {
      requestAnimationFrame(() => openArtistPopup(nick, null));
    }
  }, [openArtistPopup]);

  // Hide the portfolio's own internal "Zpět na vevit.art" link (we use our own).
  const onFrameLoad = () => {
    const frame = frameRef.current;
    try {
      const doc = frame?.contentDocument;
      if (doc && doc.head) {
        const s = doc.createElement("style");
        s.textContent = 'header a[href*="vevit.art"]{display:none !important;}';
        doc.head.appendChild(s);
      }
    } catch {
      /* cross-origin: silently skip */
    }
  };

  return (
    <ArtistPopupContext.Provider value={openArtistPopup}>
      {children}
      <div
        ref={overlayRef}
        className={`artist-popup-overlay${open ? " open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === overlayRef.current) closeArtistPopup();
        }}
      >
        <div className="artist-popup" ref={popupRef} role="dialog" aria-modal="true">
          <div className="artist-popup-bar">
            <button className="artist-popup-back" type="button" onClick={closeArtistPopup}>
              <span aria-hidden="true">←</span> Zpět na vevit.art
            </button>
          </div>
          <div className="artist-popup-frame">
            <iframe
              ref={frameRef}
              title="Portfolio umělce"
              src={src}
              onLoad={onFrameLoad}
            />
          </div>
        </div>
      </div>
    </ArtistPopupContext.Provider>
  );
}