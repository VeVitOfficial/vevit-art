// ============ NAVBAR SCROLL ============
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============ MOBILE MENU ============
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
mobileToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============ RENDER LATEST ARTISTS (3) ============
const ARTIST_ICONS = {
  brush: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>',
  mic: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>'
};
function renderLatestArtists() {
  const container = document.getElementById('latest-artists-grid');
  if (!container) return;

  const latest = getLatestArtists(3);
  const subtitle = document.getElementById('latest-subtitle');
  const title = document.getElementById('latest-title');
  const viewAll = document.getElementById('latest-view-all');

  if (latest.length === 0) {
    if (title) title.textContent = 'Naše komunita teprve roste';
    if (subtitle) subtitle.textContent = 'Zatím u nás nemáme žádné členy. Získejte místo mezi prvními a pomozte nám ji vybudovat.';
    if (viewAll) viewAll.style.display = 'none';
    container.className = '';
    container.innerHTML = `
      <div class="join-cta fade-in">
        <div class="join-cta-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
        <h3 class="join-cta-title">Staň se naším prvním umělcem</h3>
        <p class="join-cta-text">Buďte první, kdo se připojí k VeVit Art. Společně vytvoříme prostor, kde umění roste.</p>
        <a href="#contact" class="btn-primary join-cta-btn">
          přihlásit se zde
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>`;
    container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return;
  }

  container.className = 'artist-icons-grid';
  container.innerHTML = latest.map((artist, i) => `
    <button class="artist-icon fade-in" type="button" data-nick="${artist.nick}"
            aria-label="Otevřít profil — ${artist.name}" style="transition-delay: ${i * 0.06}s;">
      <span class="artist-icon-img">
        <img src="${encodeURI(artist.image)}" alt="${artist.name}" loading="lazy">
      </span>
      <span class="artist-icon-body">
        <span class="artist-icon-text">
          <span class="artist-icon-name">${artist.name}</span>
          <span class="artist-icon-type">${artist.fieldLabel}</span>
        </span>
        <span class="artist-icon-glyph" aria-hidden="true">${ARTIST_ICONS[artist.iconKey] || ''}</span>
      </span>
    </button>
  `).join('');

  // Observe newly added elements
  container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  // Bind popup openers
  container.querySelectorAll('.artist-icon').forEach(btn => {
    btn.addEventListener('click', () => openArtistPopup(btn.dataset.nick, btn));
  });
}

renderLatestArtists();

// ============ AUTO-OPEN POPUP FROM URL (?open=<nick>, used by vevit.art/<nick> shortcuts) ============
(function () {
  const nick = new URLSearchParams(location.search).get('open');
  if (nick && window.openArtistPopup) {
    // wait a frame so the popup overlay is in the DOM and data.js is ready
    requestAnimationFrame(() => window.openArtistPopup(nick, null));
  }
})();

// ============ DISCORD BUTTON ============
// Discord je aktivní — tlačítko je odkaz v HTML, není potřeba žádná hover logika.

// ============ COPY EMAIL ON CLICK ============
const copyEmail = document.getElementById('copy-email');
if (copyEmail) {
  const email = copyEmail.dataset.email;
  const original = copyEmail.textContent;
  copyEmail.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    copyEmail.textContent = 'Zkopírováno! ✓';
    setTimeout(() => { copyEmail.textContent = original; }, 2000);
  });
}

// ============ CONTACT FORM (FormSubmit AJAX → info@vevit.art) ============
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  // Show "Váš obor" field only when "Jiné" is selected
  const oborSelect = contactForm.querySelector('#obor-select');
  const otherGroup = document.getElementById('other-field-group');
  if (oborSelect && otherGroup) {
    const otherInput = otherGroup.querySelector('input');
    const toggleOther = () => {
      const show = oborSelect.value === 'Jiné';
      otherGroup.style.display = show ? '' : 'none';
      if (otherInput) otherInput.required = show;
    };
    oborSelect.addEventListener('change', toggleOther);
    toggleOther();
  }

  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('contact-submit');
  const submitLabel = submitBtn.querySelector('.btn-label');
  const originalLabel = submitLabel.textContent;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);

    submitBtn.disabled = true;
    submitLabel.textContent = 'Odesílám…';
    status.style.color = 'rgba(255,255,255,0.6)';
    status.textContent = '';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        status.style.color = '#10B981';
        status.textContent = 'Díky! Vaši zprávu jsme přijali. Ozveme se vám co nejdříve.';
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Request failed');
      }
    } catch (err) {
      status.style.color = '#ef4444';
      status.textContent = 'Něco se pokazilo. Zkuste to prosím znovu nebo napište na info@vevit.art.';
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = originalLabel;
    }
  });
}