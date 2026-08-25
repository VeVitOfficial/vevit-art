"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal — 1:1 port of the legacy IntersectionObserver in main.js /
 * list.html / artist.html. Observes every `.fade-in` element in the document and
 * adds `.visible` when it enters the viewport, then unobserves. A MutationObserver
 * picks up `.fade-in` nodes added later (e.g. popup content) without re-scanning
 * the whole tree.
 */
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const observeAll = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".fade-in:not(.visible)").forEach((el) => io.observe(el));
    };

    observeAll(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            observeAll(node as ParentNode);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}