// ============ ARTIST POPUP (96% viewport, slide-from-thumbnail) ============
// Shared across homepage + list page. Requires data.js (getArtistByNick) loaded first.
(function () {
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'artist-popup-overlay';
  popupOverlay.id = 'artistPopupOverlay';
  popupOverlay.setAttribute('aria-hidden', 'true');
  popupOverlay.innerHTML = `
    <div class="artist-popup" id="artistPopup" role="dialog" aria-modal="true">
      <div class="artist-popup-bar">
        <button class="artist-popup-back" id="artistPopupBack" type="button">
          <span aria-hidden="true">←</span> Zpět na vevit.art
        </button>
      </div>
      <div class="artist-popup-frame">
        <iframe id="artistPopupFrame" title="Portfolio umělce" src="about:blank"></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(popupOverlay);

  const popupEl = document.getElementById('artistPopup');
  const popupFrame = document.getElementById('artistPopupFrame');
  const popupBack = document.getElementById('artistPopupBack');
  let popupOpen = false;
  let savedBodyOverflow = '';

  function openArtistPopup(nick, thumbEl) {
    const artist = getArtistByNick(nick);
    if (!artist) return;

    const rect = thumbEl
      ? thumbEl.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 120, height: 120 };

    // 96% box position (matches CSS: top 2vh, left 2vw, 96vw x 96vh)
    const boxLeft = window.innerWidth * 0.02;
    const boxTop = window.innerHeight * 0.02;
    const boxW = window.innerWidth * 0.96;
    const boxH = window.innerHeight * 0.96;

    const dx = rect.left - boxLeft;
    const dy = rect.top - boxTop;
    const sx = Math.max(0.05, rect.width / boxW);
    const sy = Math.max(0.05, rect.height / boxH);

    popupEl.style.setProperty('--dx', dx + 'px');
    popupEl.style.setProperty('--dy', dy + 'px');
    popupEl.style.setProperty('--sx', sx);
    popupEl.style.setProperty('--sy', sy);

    // Load portfolio into iframe
    popupFrame.src = encodeURI(artist.portfolioUrl);

    // Lock scroll
    savedBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Ensure closed state applied, then animate open on next frame
    popupOverlay.classList.remove('open');
    popupOverlay.setAttribute('aria-hidden', 'false');
    // force reflow so the initial (scaled) transform is registered before transition
    void popupEl.offsetWidth;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => popupOverlay.classList.add('open'));
    });
    popupOpen = true;
  }

  function closeArtistPopup() {
    if (!popupOpen) return;
    popupOpen = false;
    popupOverlay.classList.remove('open');
    popupOverlay.setAttribute('aria-hidden', 'true');

    const onEnd = (e) => {
      if (e.propertyName !== 'transform' && e.propertyName !== 'visibility') return;
      popupEl.removeEventListener('transitionend', onEnd);
      if (!popupOpen) {
        popupFrame.src = 'about:blank';
        document.body.style.overflow = savedBodyOverflow;
      }
    };
    popupEl.addEventListener('transitionend', onEnd);
  }

  // Hide the portfolio's own internal "Zpět na vevit.art" link (we use our own)
  popupFrame.addEventListener('load', () => {
    try {
      const doc = popupFrame.contentDocument;
      if (doc && doc.head) {
        const s = doc.createElement('style');
        s.textContent =
          'header a[href*="vevit.art"]{display:none !important;}';
        doc.head.appendChild(s);
      }
    } catch (e) { /* cross-origin: silently skip */ }
  });

  popupBack.addEventListener('click', closeArtistPopup);
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) closeArtistPopup();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOpen) closeArtistPopup();
  });

  // Expose globally so main.js / list.html can bind openers
  window.openArtistPopup = openArtistPopup;
})();