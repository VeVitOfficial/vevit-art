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
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  const savedOverflow = useRef("");
  const returnFocusTo = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("about:blank");
  const [title, setTitle] = useState("Portfolio umělce");

  // Pozadí je při otevřeném okně neinteraktivní (čtečky i klávesnice).
  const setBackgroundInert = useCallback((inert: boolean) => {
    const overlay = overlayRef.current;
    Array.from(document.body.children).forEach((el) => {
      if (el === overlay || el.tagName === "SCRIPT") return;
      if (inert) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }, []);

  const openArtistPopup = useCallback<OpenFn>((nick, thumbEl) => {
    const artist = getArtistByNick(nick);
    if (!artist) return;

    const popupEl = popupRef.current;
    const overlay = overlayRef.current;
    if (!popupEl || !overlay) return;

    returnFocusTo.current = (document.activeElement as HTMLElement | null) ?? thumbEl;

    const rect = thumbEl
      ? thumbEl.getBoundingClientRect()
      : {
          left: window.innerWidth / 2,
          top: window.innerHeight / 2,
          width: 120,
          height: 120,
        };

    const mobile = window.innerWidth <= 760;
    const boxLeft = mobile ? 0 : window.innerWidth * 0.02;
    const boxTop = mobile ? 0 : window.innerHeight * 0.02;
    const boxW = mobile ? window.innerWidth : window.innerWidth * 0.96;
    const boxH = mobile ? window.innerHeight : window.innerHeight * 0.96;

    const dx = rect.left - boxLeft;
    const dy = rect.top - boxTop;
    const sx = Math.max(0.05, rect.width / boxW);
    const sy = Math.max(0.05, rect.height / boxH);

    popupEl.style.setProperty("--dx", dx + "px");
    popupEl.style.setProperty("--dy", dy + "px");
    popupEl.style.setProperty("--sx", String(sx));
    popupEl.style.setProperty("--sy", String(sy));

    setTitle(artist.name);
    setSrc(encodeURI(artist.portfolioUrl));

    savedOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setBackgroundInert(true);

    // Ensure closed state, then animate open on next frame (double-rAF so the
    // initial scaled transform registers).
    setOpen(false);
    void popupEl.offsetWidth;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);
      });
    });
    openRef.current = true;
  }, [setBackgroundInert]);

  const closeArtistPopup = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    setBackgroundInert(false);
    returnFocusTo.current?.focus?.();
  }, [setBackgroundInert]);

  // Fokus na tlačítko Zpět až poté, co je okno vykreslené jako viditelné.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  // Reset iframe + body overflow once the close transition finishes.
  useEffect(() => {
    const popupEl = popupRef.current;
    if (!popupEl || open) return;
    const reset = () => {
      if (!openRef.current) {
        setSrc("about:blank");
        document.body.style.overflow = savedOverflow.current;
      }
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      reset();
      popupEl.removeEventListener("transitionend", onEnd as EventListener);
    };
    popupEl.addEventListener("transitionend", onEnd as EventListener);
    // Bez animace (reduced motion) transitionend nepřijde, proto záložní časovač.
    const t = window.setTimeout(reset, 600);
    return () => {
      popupEl.removeEventListener("transitionend", onEnd as EventListener);
      window.clearTimeout(t);
    };
  }, [open]);

  // Escape zavře okno; Tab cyklí mezi tlačítkem Zpět a obsahem portfolia.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!openRef.current) return;
      if (e.key === "Escape") {
        closeArtistPopup();
        return;
      }
      if (e.key === "Tab") {
        const frame = frameRef.current;
        const close = closeRef.current;
        if (!frame || !close) return;
        if (document.activeElement === close && !e.shiftKey) {
          e.preventDefault();
          frame.focus();
        } else if (document.activeElement === frame && e.shiftKey) {
          e.preventDefault();
          close.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeArtistPopup]);

  // Auto-open from ?open=<nick> (legacy /<nick> shortcuts).
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
        className={`popup-overlay${open ? " open" : ""}`}
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === overlayRef.current) closeArtistPopup();
        }}
      >
        <div
          className="popup"
          ref={popupRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div className="popup-bar">
            <button className="popup-close" type="button" ref={closeRef} onClick={closeArtistPopup}>
              <span aria-hidden="true">←</span> Zpět na vevit.art
            </button>
            <span className="popup-title" id="popup-title">
              {title}
            </span>
          </div>
          <div className="popup-frame">
            <iframe
              ref={frameRef}
              title={`Portfolio: ${title}`}
              src={src}
              onLoad={onFrameLoad}
            />
          </div>
        </div>
      </div>
    </ArtistPopupContext.Provider>
  );
}
