/* =====================================================================
   main.js: builds the menu, footer and page content from js/data.js
   You usually DON'T need to edit this file. Edit js/data.js instead.
   ===================================================================== */
document.documentElement.classList.add('js');
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Helpers ---------- */
function driveId(link) {
  const m = String(link || '').match(/drive\.google\.com\/.*?(?:\/d\/|[?&]id=)([\w-]+)/);
  return m ? m[1] : null;
}
function imgUrl(src, size = 1600) {
  if (!src) return '';
  const id = driveId(src);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${size}` : src;
}
function placeholder(text = 'Add image in js/data.js', icon = 'fa-regular fa-image') {
  return `<div class="ph"><i class="${icon}"></i><span>${text}</span></div>`;
}
function thumbHTML(item) {
  let media;
  const alt = (item.title || '').replace(/"/g, '');
  if (item.image) {
    media = `<img src="${imgUrl(item.image, 900)}" alt="${alt}" loading="lazy">`;
  } else if (item.video && driveId(item.video)) {
    // Drive video thumbnail (if it can't load, a styled box is shown instead)
    media = `<img src="${imgUrl(item.video, 900)}" alt="${alt}" loading="lazy"
              onerror="this.outerHTML='${placeholder('Promo Video', 'fa-solid fa-film').replace(/'/g, "\\'").replace(/"/g, '&quot;')}'">`;
  } else if (item.video) {
    media = `<video src="${item.video}" muted preload="metadata"></video>`;
  } else {
    media = placeholder();
  }
  const play  = item.video ? '<span class="play"><i class="fa-solid fa-play"></i></span>' : '';
  const count = item.gallery && item.gallery.length > 1 ? `<span class="count"><i class="fa-regular fa-images"></i> ${item.gallery.length}</span>` : '';
  return `<div class="thumb${item.contain ? ' contain' : ''}">${media}${play}${count}</div>`;
}
function makeCard(item, meta = '') {
  const el = document.createElement('article');
  el.className = 'card reveal';
  el.tabIndex = 0;
  el.innerHTML = `${thumbHTML(item)}
    <div class="card-body">
      ${item.category ? `<span class="tag">${item.category}</span>` : ''}
      <h3>${item.title || ''}</h3>
      ${meta ? `<p class="meta">${meta}</p>` : ''}
      ${item.description ? `<p>${item.description}</p>` : ''}
    </div>`;
  el.addEventListener('click', () => openLightbox(item, meta));
  el.addEventListener('keydown', e => { if (e.key === 'Enter') openLightbox(item, meta); });
  return el;
}

/* ---------- Starfield on hero banners ("Keep Looking Above") ---------- */
$$('.hero, .page-hero, .section.sky').forEach(el => {
  const field = document.createElement('div');
  field.className = 'starfield';
  const n = el.classList.contains('hero') ? 110 : 60;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    const size = Math.random() < 0.12 ? 3 : Math.random() < 0.5 ? 2 : 1;
    s.className = 'star';
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 75}%;width:${size}px;height:${size}px;--d:${2 + Math.random() * 4}s;--delay:${-Math.random() * 5}s`;
    field.appendChild(s);
  }
  el.prepend(field);
});

/* ---------- Lightbox (click a card to view large) ---------- */
const lb = document.createElement('div');
lb.className = 'lightbox';
lb.innerHTML = `<button class="lb-close" aria-label="Close">&times;</button>
  <button class="lb-nav lb-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
  <button class="lb-nav lb-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
  <div class="lb-inner"></div>`;
document.body.appendChild(lb);
let lbState = null;

function renderLightbox() {
  const { item, meta, idx } = lbState;
  const pics = item.gallery && item.gallery.length ? item.gallery : (item.image ? [item.image] : []);
  let media;
  if (item.video) {
    const id = driveId(item.video);
    media = id ? `<iframe src="https://drive.google.com/file/d/${id}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`
               : `<video src="${item.video}" controls autoplay></video>`;
  } else if (pics.length) {
    media = `<img src="${imgUrl(pics[idx], 2000)}" alt="${(item.title || '').replace(/"/g, '')}">`;
  } else {
    media = '<p class="empty">No image yet</p>';
  }
  const multi = !item.video && pics.length > 1;
  $('.lb-prev', lb).style.display = $('.lb-next', lb).style.display = multi ? '' : 'none';
  $('.lb-inner', lb).innerHTML = `${media}
    ${multi ? `<p class="lb-dots">${idx + 1} / ${pics.length}</p>` : ''}
    <h3>${item.title || ''}</h3>
    ${meta ? `<p class="meta">${meta}</p>` : ''}
    <p>${item.description || ''}</p>
    ${item.link ? `<p style="margin-top:16px"><a class="btn btn-gold" href="${item.link}" target="_blank" rel="noopener">Open Link <i class="fa-solid fa-arrow-up-right-from-square"></i></a></p>` : ''}`;
  lbState.total = pics.length;
}
function openLightbox(item, meta) {
  lbState = { item, meta, idx: 0 };
  renderLightbox();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function step(d) {
  if (!lbState || lbState.total < 2 || lbState.item.video) return;
  lbState.idx = (lbState.idx + d + lbState.total) % lbState.total;
  renderLightbox();
}
function closeLightbox() {
  lb.classList.remove('open');
  $('.lb-inner', lb).innerHTML = '';
  document.body.style.overflow = '';
  lbState = null;
}
lb.addEventListener('click', e => {
  if (e.target === lb || e.target.closest('.lb-close')) closeLightbox();
  else if (e.target.closest('.lb-prev')) step(-1);
  else if (e.target.closest('.lb-next')) step(1);
});
document.addEventListener('keydown', e => {
  if (!lbState) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

/* ---------- Header / menu ---------- */
const PAGES = [
  { id: 'home',           label: 'Home',           href: 'index.html' },
  { id: 'about',          label: 'About',          href: 'about.html' },
  { id: 'skills',         label: 'Skills',         href: 'skills.html' },
  { id: 'portfolio',      label: 'Portfolio',      href: 'portfolio.html' },
  { id: 'certifications', label: 'Certifications', href: 'certifications.html', hidden: CERTIFICATIONS.length === 0 },
  { id: 'contact',        label: 'Contact',        href: 'contact.html' },
];
const current = document.body.dataset.page;
const header = $('#site-header');
if (header) {
  header.innerHTML = `<nav class="nav">
    <a class="brand" href="index.html">${PROFILE.logo ? `<img src="${PROFILE.logo}" alt="">` : ''}${PROFILE.brand}</a>
    <button class="menu-btn" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
    <ul class="nav-links">${PAGES.filter(p => !p.hidden).map(p =>
      `<li><a href="${p.href}"${p.id === current ? ' class="active"' : ''}>${p.label}</a></li>`).join('')}</ul>
  </nav>`;
  $('.menu-btn', header).onclick = () => $('.nav-links', header).classList.toggle('show');
}

/* ---------- Footer ---------- */
const socials = PROFILE.socials.filter(s => s.url);
const footer = $('#site-footer');
if (footer) {
  footer.innerHTML = `<p class="motto">✦ ${PROFILE.motto} ✦</p>
    ${socials.length ? `<div class="socials">${socials.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}"><i class="${s.icon}"></i></a>`).join('')}</div>` : ''}
    <p>© ${new Date().getFullYear()} ${PROFILE.firstName} ${PROFILE.lastName} · Web Portfolio</p>`;
}

/* ---------- Profile text & photo ---------- */
document.title = document.title.replace('{name}', `${PROFILE.firstName} ${PROFILE.lastName}`);
$$('[data-profile]').forEach(el => { el.textContent = PROFILE[el.dataset.profile] || ''; });
$$('[data-profile-photo]').forEach(el => {
  const src = (el.dataset.profilePhoto === 'about' && PROFILE.aboutPhoto) ? PROFILE.aboutPhoto : PROFILE.photo;
  el.innerHTML = src ? `<img src="${imgUrl(src, 800)}" alt="${PROFILE.firstName}">` : placeholder('Your photo');
});
$$('[data-profile-logo]').forEach(el => { if (PROFILE.logoFull) el.src = PROFILE.logoFull; else el.remove(); });

/* ---------- GitHub buttons ---------- */
const gh = PROFILE.socials.find(s => s.label === 'GitHub' && s.url);
$$('[data-github]').forEach(el => { if (gh) el.href = gh.url; else el.remove(); });

/* ---------- HOME: featured work ---------- */
const featured = $('#featured');
if (featured) {
  const list = OUTPUTS.filter(o => o.featured);
  (list.length ? list : OUTPUTS).slice(0, 3).forEach(o => featured.appendChild(makeCard(o, o.subject)));
}

/* ---------- ABOUT ---------- */
const bio = $('#bio');
if (bio) bio.innerHTML = (PROFILE.quote ? `<blockquote>"${PROFILE.quote}"</blockquote>` : '') + PROFILE.bio.map(p => `<p>${p}</p>`).join('');
const facts = $('#facts');
if (facts) facts.innerHTML = PROFILE.facts.map(f => `<li><i class="${f.icon}"></i><span>${f.text}</span></li>`).join('');
const promo = $('#promo');
if (promo) PROMO_ADS.forEach(p => promo.appendChild(makeCard(p, p.subject)));

/* ---------- SKILLS ---------- */
const sg = $('#skill-groups');
if (sg) sg.innerHTML = SKILLS.map(g => `<div class="skill-group reveal"><i class="${g.icon}"></i><h3>${g.group}</h3>
  <div class="chips">${g.items.map(s => `<span class="chip">${s}</span>`).join('')}</div></div>`).join('');
const tools = $('#tools');
if (tools) tools.innerHTML = TOOLS.map(t =>
  `<div class="tool reveal"><div class="badge">${t.icon ? `<i class="${t.icon}"></i>` : t.short}</div>${t.name}</div>`).join('');

/* ---------- PORTFOLIO (with filter buttons) ---------- */
const gallery = $('#gallery'), filters = $('#filters');
if (gallery) {
  const cats = ['All', ...new Set(OUTPUTS.map(o => o.category))];
  const render = cat => {
    gallery.innerHTML = '';
    OUTPUTS.filter(o => cat === 'All' || o.category === cat).forEach((o, i) => {
      const c = makeCard(o, o.subject); c.classList.add('in', 'settled'); c.style.setProperty('--i', i); gallery.appendChild(c);
    });
  };
  filters.innerHTML = cats.map((c, i) => `<button class="filter${i ? '' : ' active'}" data-cat="${c}">${c}</button>`).join('');
  filters.addEventListener('click', e => {
    const b = e.target.closest('.filter'); if (!b) return;
    $$('.filter', filters).forEach(f => f.classList.remove('active'));
    b.classList.add('active'); render(b.dataset.cat);
  });
  render('All');
}

/* ---------- CERTIFICATIONS ---------- */
const certs = $('#certs');
if (certs) {
  if (CERTIFICATIONS.length) CERTIFICATIONS.forEach(c => certs.appendChild(makeCard(c, [c.issuer, c.date].filter(Boolean).join(' · '))));
  else certs.outerHTML = '<p class="empty">No certifications yet. Coming soon!</p>';
}

/* ---------- CONTACT ---------- */
const cl = $('#contact-list');
if (cl) {
  const items = [
    { icon: 'fa-solid fa-envelope', handle: PROFILE.email, url: `mailto:${PROFILE.email}` },
    PROFILE.phone ? { icon: 'fa-solid fa-phone', handle: PROFILE.phone, url: `tel:+${PROFILE.phone.replace(/\D/g, '').replace(/^0/, '63')}` } : null,
    ...socials,
  ].filter(Boolean);
  cl.innerHTML = items.map(i => `<a href="${i.url}"${i.url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>
    <i class="${i.icon}"></i><span>${i.handle || i.label}</span></a>`).join('');
}
const form = $('#contact-form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const subject = `Portfolio inquiry from ${d.get('name')}`;
  const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`;
  location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* ---------- HOME: stats strip ---------- */
const stats = $('#stats');
if (stats) {
  const langs  = SKILLS.filter(g => /Programming|Databases/.test(g.group)).reduce((n, g) => n + g.items.length, 0);
  const pieces = OUTPUTS.reduce((n, o) => n + (o.gallery ? o.gallery.length : 1), 0);
  const items = [[OUTPUTS.length, 'Graphics Projects'], [pieces, 'Design Pieces'], [langs, 'Languages & Databases'], [CERTIFICATIONS.length, 'Certifications']]
    .filter(x => x[0] > 0);
  stats.innerHTML = items.map(([n, l]) => `<div class="stat reveal" data-count="${n}"><b>${n}</b><span>${l}</span></div>`).join('');
}

/* =====================================================================
   ✨ ANIMATIONS
   ===================================================================== */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Stagger: number the items in each group so they appear one by one
['.grid', '.tiles', '.tools', '.skill-groups', '.chips', '#stats'].forEach(sel => $$(sel).forEach(box => {
  [...box.children].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 12)));
}));

// Numbers count up from 0
function countUp(el) {
  const num = $('b', el), end = +el.dataset.count;
  if (reduceMotion || !num) return;
  const t0 = performance.now(), dur = 1300;
  const tick = t => {
    const p = Math.min((t - t0) / dur, 1);
    num.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  num.textContent = '0';
  requestAnimationFrame(tick);
}

// Reveal on scroll
function show(el) {
  if (el.classList.contains('in')) return;
  el.classList.add('in');
  const delay = (parseFloat(el.style.getPropertyValue('--i')) || 0) * 80;
  setTimeout(() => el.classList.add('settled'), 750 + delay);
  if (el.classList.contains('stat')) countUp(el);
}
const toReveal = [...$$('.reveal'), ...$$('.title')];
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
  }), { threshold: 0.08 });
  toReveal.forEach(el => io.observe(el));
} else {
  toReveal.forEach(show);
}
// Safety net: anything already on screen is always shown, even if the observer is slow
function revealVisible() {
  toReveal.forEach(el => { if (el.getBoundingClientRect().top < innerHeight * 0.95) show(el); });
}
setTimeout(revealVisible, 1200);
addEventListener('scroll', revealVisible, { passive: true });

// Typing effect on the motto ("Keep Looking Above")
const motto = $('.hero .motto [data-profile="motto"]');
if (motto && !reduceMotion && PROFILE.motto) {
  const text = PROFILE.motto;
  motto.textContent = '';
  motto.setAttribute('aria-label', text);
  const caret = document.createElement('span'); caret.className = 'caret'; motto.after(caret);
  let n = 0;
  setTimeout(function type() {
    motto.textContent = text.slice(0, ++n);
    if (n < text.length) setTimeout(type, 65 + Math.random() * 60);
  }, 1000);
}

// Shooting stars across the banners
if (!reduceMotion) {
  $$('.hero .starfield, .page-hero .starfield').forEach(field => {
    const launch = () => {
      const s = document.createElement('span');
      s.className = 'shooting';
      s.style.left = (35 + Math.random() * 65) + '%';
      s.style.top = (Math.random() * 40) + '%';
      field.appendChild(s);
      s.addEventListener('animationend', () => s.remove());
      setTimeout(launch, 2500 + Math.random() * 4500);
    };
    setTimeout(launch, 1200 + Math.random() * 2000);
  });
}

// Scroll progress bar, back-to-top rocket, and star parallax
const bar = document.createElement('div'); bar.className = 'scroll-progress'; document.body.appendChild(bar);
const topBtn = document.createElement('button');
topBtn.className = 'to-top'; topBtn.setAttribute('aria-label', 'Back to top');
topBtn.innerHTML = '<i class="fa-solid fa-rocket" style="transform:rotate(-45deg)"></i>';
topBtn.onclick = () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
document.body.appendChild(topBtn);
const heroField = $('.hero .starfield');
let ticking = false;
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
  topBtn.classList.toggle('show', scrollY > 500);
  if (heroField && !reduceMotion) heroField.style.transform = `translateY(${scrollY * 0.35}px)`;
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; (window.requestAnimationFrame || setTimeout)(onScroll); } }, { passive: true });
onScroll();

// Smooth fade when moving between pages
if (!reduceMotion) {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    const href = a.getAttribute('href');
    if (!/^[\w-]+\.html(#.*)?$/.test(href)) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = href; }, 220);
  });
  addEventListener('pageshow', () => document.body.classList.remove('leaving'));
}

/* =====================================================================
   🎬 FEATURED PROMO VIDEO
   - Hover starts it WITH SOUND
   - Keeps playing after the mouse leaves
   - Pauses when you scroll away (up or down), resumes when you come back
   - Click to pause / resume, speaker button to mute / unmute
   ===================================================================== */
const pf = $('#promo-feature');
if (pf && typeof PROMO_VIDEO !== 'undefined') {
  const v = $('#promo-video'), soundBtn = $('#promo-sound'), prog = $('.promo-progress span', pf);
  const desc = $('#promo-desc'); if (desc) desc.textContent = PROMO_VIDEO.description;
  let wantSound = true;      // start with volume ON
  let started = false;       // has the visitor started it yet?
  let userPaused = false;    // visitor clicked pause
  let scrollPaused = false;  // paused because it scrolled out of view
  let inView = false;

  const showFallback = () => {
    pf.classList.remove('playing');
    pf.innerHTML = `<div class="promo-fallback"><i class="fa-solid fa-film big-ic"></i><span>${PROMO_VIDEO.title}</span>
      <a class="btn btn-gold" href="${PROMO_VIDEO.drive}" target="_blank" rel="noopener"><i class="fa-solid fa-play"></i> Watch on Google Drive</a></div>`;
    pf.style.cursor = 'default';
  };
  const updateIcon = () => {
    soundBtn.innerHTML = `<i class="fa-solid ${v.muted ? 'fa-volume-xmark' : 'fa-volume-high'}"></i>`;
    soundBtn.setAttribute('aria-label', v.muted ? 'Turn sound on' : 'Mute');
  };

  if (!PROMO_VIDEO.src) showFallback();
  else {
    v.muted = false; v.volume = 1;
    v.addEventListener('error', showFallback);
    v.src = PROMO_VIDEO.src;
    v.addEventListener('loadedmetadata', () => { try { if (!started) v.currentTime = 0.1; } catch (e) {} });
    updateIcon();

    let token = 0;
    const play = () => {
      started = true; scrollPaused = false;
      const my = ++token;
      v.muted = !wantSound;
      pf.classList.add('playing');
      const p = v.play();
      if (p && p.catch) p.catch(err => {
        if (my !== token || userPaused || scrollPaused) return;   // we paused on purpose; don't restart
        if (err && err.name === 'NotAllowedError') {
          // Browsers block sound until the visitor clicks/taps the page once.
          // Play muted for now; sound turns on at the first click or key press.
          v.muted = true; updateIcon();
          v.play().catch(() => pf.classList.remove('playing'));
        }
      });
      updateIcon();
    };
    const pause = () => { token++; v.pause(); pf.classList.remove('playing'); };

    // Hover = start (it keeps playing when the mouse leaves)
    pf.addEventListener('mouseenter', () => { if (v.paused && !userPaused && inView) play(); });

    // Click / tap = pause or resume
    pf.addEventListener('click', e => {
      if (e.target.closest('#promo-sound')) return;
      if (v.paused) { userPaused = false; play(); } else { userPaused = true; scrollPaused = false; pause(); }
    });

    // Speaker button
    soundBtn.addEventListener('click', e => {
      e.stopPropagation();
      wantSound = v.muted;          // toggle
      v.muted = !wantSound;
      updateIcon();
      if (v.paused && !userPaused) play();
    });

    // First click / key press anywhere unlocks sound if the browser blocked it
    const unlock = () => { if (wantSound && v.muted && !v.paused) { v.muted = false; updateIcon(); } };
    ['pointerdown', 'keydown', 'touchend'].forEach(ev => document.addEventListener(ev, unlock, { passive: true }));

    // Pause when scrolled away, resume when back in view
    const check = () => {
      const r = pf.getBoundingClientRect();
      const visible = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
      inView = r.height > 0 && visible / r.height >= 0.5;
      if (!inView && !v.paused) { pause(); scrollPaused = true; }
      else if (inView && scrollPaused && started && !userPaused) play();
    };
    if ('IntersectionObserver' in window) new IntersectionObserver(check, { threshold: [0, 0.25, 0.5, 0.75, 1] }).observe(pf);
    addEventListener('scroll', check, { passive: true });
    addEventListener('resize', check);
    check();

    // Also pause if the visitor switches browser tabs
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && !v.paused) { pause(); scrollPaused = true; }
      else if (!document.hidden && scrollPaused && inView && !userPaused) play();
    });

    v.addEventListener('timeupdate', () => { if (v.duration) prog.style.width = (v.currentTime / v.duration * 100) + '%'; });
  }
}
