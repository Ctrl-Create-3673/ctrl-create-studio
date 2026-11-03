/* Ctrl + Create Studio — the desktop: menu bar, icons, windows (Finder, Quick Look, Notes, Mail), dock. */
(function () {
  'use strict';
  var D = window.CC;
  var root = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var mobile = function () { return window.matchMedia('(max-width: 760px)').matches; };
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var announce = function (msg) { $('#announce').textContent = msg; };
  var byId = {}; D.projects.forEach(function (p) { byId[p.id] = p; });
  var folderById = {}; D.folders.forEach(function (f) { folderById[f.id] = f; });

  // ------------------------------------------------------------------ icons
  var uid = 0;
  var TINT = { purple: ['#8A74D6', '#584294'], blue: ['#5B92E3', '#2F6BC6'], teal: ['#45B7B0', '#1F8A86'], orange: ['#F5875F', '#D9512C'], ink: ['#4A5180', '#1D2340'] };
  var GLYPH = {
    grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="currentColor"/>',
    nib: '<path d="M12 2.5 18 11l-2.6 5H8.6L6 11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 3v7.2" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="11.4" r="1.5" fill="currentColor"/><path d="M9 18.5h6v2.5H9z" fill="currentColor"/>',
    book: '<path d="M3 5.5c3-1.6 6-1.6 9 0v13.5c-3-1.6-6-1.6-9 0zM21 5.5c-3-1.6-6-1.6-9 0v13.5c3-1.6 6-1.6 9 0z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    globe: '<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.8"/><ellipse cx="12" cy="12" rx="3.8" ry="8.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.6 9h16.8M3.6 15h16.8" stroke="currentColor" stroke-width="1.6"/>',
    play: '<path d="M8 5.2v13.6L19.2 12z" fill="currentColor"/>',
    cc: '<path d="M10.5 6.2a6.5 6.5 0 1 0 0 11.6M19.5 6.2a6.5 6.5 0 1 0 0 11.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    lines: '<path d="M6 7h12M6 11h12M6 15h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    chat: '<path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.8 8.6c.3 2.9 3.2 6 6.4 6.6l1.1-1.5-2-1.1-.9.8c-1-.5-2-1.5-2.5-2.6l.8-.9-1.1-2z" fill="currentColor"/>',
    phone: '<path d="M6.6 3.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    info: '<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1.3" fill="currentColor"/>',
    folder: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.4l2 2h8.6A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m15.2 15.2 4.8 4.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    left: '<path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    right: '<path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    out: '<path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  var FOLDER_GLYPH = { logos: 'nib', print: 'book', web: 'globe', motion: 'play', brand: 'cc', all: 'grid' };
  function g(name, cls) { return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + GLYPH[name] + '</svg>'; }
  function folderIcon(color, glyph) {
    var t = TINT[color], id = 'fg' + (++uid);
    return '<svg viewBox="0 0 64 52" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + t[0] + '"/><stop offset="1" stop-color="' + t[1] + '"/></linearGradient></defs>' +
      '<path d="M4 9a4 4 0 0 1 4-4h13.5l5 5H56a4 4 0 0 1 4 4v4H4z" fill="' + t[1] + '"/>' +
      '<rect x="4" y="14" width="56" height="35" rx="4.5" fill="url(#' + id + ')"/><rect x="4" y="14" width="56" height="2" rx="1" fill="#fff" opacity=".25"/>' +
      '<g transform="translate(23 21) scale(.75)" color="#fff" opacity=".9">' + GLYPH[glyph] + '</g></svg>';
  }
  function docIcon(label, color) {
    return '<svg viewBox="0 0 64 52" aria-hidden="true"><path d="M17 1h22l10 10v39a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" fill="#fff"/><path d="M39 1v8a2 2 0 0 0 2 2h8" fill="#E3E4EC"/>' +
      '<path d="M21 18h22M21 23h22M21 28h16" stroke="#C9CCDA" stroke-width="2"/><rect x="18" y="35" width="28" height="11" rx="2.5" fill="' + color + '"/>' +
      '<text x="32" y="43.3" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="7.5" font-weight="700" fill="#fff">' + label + '</text></svg>';
  }
  var TL_ICONS = '<svg viewBox="0 0 10 10"><path d="m2.5 2.5 5 5m0-5-5 5" stroke="currentColor" stroke-width="1.4"/></svg>|<svg viewBox="0 0 10 10"><path d="M2 5h6" stroke="currentColor" stroke-width="1.4"/></svg>|<svg viewBox="0 0 10 10"><path d="M3 2h5v5zM7 8H2V3z" fill="currentColor"/></svg>'.split('|');

  // ------------------------------------------------------------------ clock
  function tick() {
    var d = new Date();
    $('#clock').textContent = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) + '  ' +
      d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  tick(); setInterval(tick, 15000);

  // ------------------------------------------------------------------ window manager
  var Z = 20, wins = {}, cascade = 0;
  function focusWin(w) {
    if (!w) return;
    w.style.zIndex = ++Z;
    $$('.win').forEach(function (o) { o.classList.toggle('inactive', o !== w); });
    syncDock();
  }
  function topWin() {
    var best = null, z = -1;
    $$('.win').forEach(function (w) { if (w.style.display !== 'none' && +w.style.zIndex > z) { z = +w.style.zIndex; best = w; } });
    return best;
  }
  function makeWin(id, o) {
    if (wins[id]) { var w0 = wins[id]; w0.style.display = ''; w0.classList.remove('minimizing'); focusWin(w0); return { el: w0, body: $('.wbody', w0), existed: true }; }
    var w = document.createElement('section');
    w.className = 'win ' + (o.cls || '');
    w.setAttribute('role', 'dialog');
    w.setAttribute('aria-label', o.title);
    w.dataset.id = id;
    w.innerHTML = '<div class="titlebar"><div class="tl"><button type="button" class="close" aria-label="Close ' + esc(o.title) + '">' + TL_ICONS[0] + '</button>' +
      '<button type="button" class="min" aria-label="Minimise">' + TL_ICONS[1] + '</button><button type="button" class="zoom" aria-label="Zoom">' + TL_ICONS[2] + '</button></div>' +
      '<div class="title">' + esc(o.title) + '</div></div><div class="wbody"></div>';
    var vw = window.innerWidth, vh = window.innerHeight;
    var ww = Math.min(o.w || 760, vw - 40), hh = Math.min(o.h || 520, vh - 150);
    var x = o.x != null ? o.x : Math.max(16, Math.min(vw - ww - 130, 70 + cascade * 30));
    var y = o.y != null ? o.y : Math.max(40, Math.min(vh - hh - 90, 52 + cascade * 26));
    cascade = (cascade + 1) % 6;
    w.style.left = x + 'px'; w.style.top = y + 'px'; w.style.width = ww + 'px'; w.style.height = hh + 'px';
    $('#windows').appendChild(w);
    wins[id] = w;
    w.addEventListener('pointerdown', function () { focusWin(w); });
    $('.close', w).addEventListener('click', function () { closeWin(id); });
    $('.min', w).addEventListener('click', function () { w.classList.add('minimizing'); setTimeout(function () { w.style.display = 'none'; w.classList.remove('minimizing'); focusWin(topWin()); }, 330); });
    $('.zoom', w).addEventListener('click', function () { w.classList.toggle('zoomed'); });
    dragify(w);
    focusWin(w);
    setTimeout(function () { var f = $('.close', w); if (f && !coarse) f.focus({ preventScroll: true }); }, 30);
    return { el: w, body: $('.wbody', w), existed: false };
  }
  function closeWin(id) {
    var w = wins[id]; if (!w) return;
    delete wins[id];
    var v = $('video', w); if (v) v.pause();
    w.classList.add('closing');
    setTimeout(function () { w.remove(); focusWin(topWin()); syncDock(); }, 170);
  }
  function dragify(w) {
    var bar = $('.titlebar', w), sx, sy, ox, oy, on = false;
    bar.addEventListener('pointerdown', function (e) {
      if (mobile() || e.target.closest('button') || e.button !== 0 || w.classList.contains('zoomed')) return;
      on = true; sx = e.clientX; sy = e.clientY; ox = w.offsetLeft; oy = w.offsetTop;
      bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener('pointermove', function (e) {
      if (!on) return;
      var nx = Math.min(window.innerWidth - 80, Math.max(80 - w.offsetWidth, ox + e.clientX - sx));
      var ny = Math.min(window.innerHeight - 80, Math.max(30, oy + e.clientY - sy));
      w.style.left = nx + 'px'; w.style.top = ny + 'px';
    });
    bar.addEventListener('pointerup', function () { on = false; });
    bar.addEventListener('dblclick', function (e) { if (!e.target.closest('button')) w.classList.toggle('zoomed'); });
  }

  // ------------------------------------------------------------------ opening things
  function open(spec, extra) {
    closeMenus();
    if (!spec) return;
    var parts = spec.split(':');
    if (parts[0] === 'finder') return openFinder(parts[1] || 'all');
    if (parts[0] === 'project') return openProject(parts[1]);
    if (spec === 'about') return openAbout();
    if (spec === 'contact') return openContact(extra);
    if (spec === 'readme') return openReadme();
  }
  // a click that should open: double-click with a mouse, single tap on touch, Enter/Space on keyboard
  function opener(el, fn) {
    el.addEventListener('click', function (e) {
      if (coarse || e.detail === 0) return fn();
      $$('[aria-selected="true"]', el.parentNode).forEach(function (o) { o.setAttribute('aria-selected', 'false'); });
      el.setAttribute('aria-selected', 'true');
    });
    el.addEventListener('dblclick', fn);
  }

  // ------------------------------------------------------------------ Finder
  var finderState = { folder: 'all', q: '' };
  function itemsFor(folder, q) {
    q = (q || '').trim().toLowerCase();
    return D.projects.filter(function (p) {
      if (folder !== 'all' && p.folder !== folder) return false;
      if (!q) return true;
      return (p.title + ' ' + p.kind + ' ' + p.tags.join(' ') + ' ' + p.text).toLowerCase().indexOf(q) >= 0;
    });
  }
  function thumbOf(p) { return p.thumb || ('assets/work/' + p.id + '/01-thumb.webp'); }
  function openFinder(folder) {
    finderState.folder = folder; finderState.q = '';
    var r = makeWin('finder', { title: 'Portfolio', cls: 'finder', w: Math.min(900, window.innerWidth - 64 - 140), h: 600, x: mobile() ? 0 : 64, y: mobile() ? 36 : 56 });  // leave the desktop-icon column free
    if (!r.existed) {
      var side = '<h4>Favourites</h4>' + [{ id: 'all', name: 'All Work' }].concat(D.folders).map(function (f) {
        return '<button type="button" data-folder="' + f.id + '">' + g(f.id === 'all' ? 'grid' : 'folder') + '<span>' + esc(f.short || f.name) + '</span></button>';
      }).join('') + '<h4>Studio</h4><button type="button" data-go="about">' + g('info') + '<span>About</span></button><button type="button" data-go="contact">' + g('mail') + '<span>Contact</span></button>';
      r.body.innerHTML = '<nav class="f-side" aria-label="Folders">' + side + '</nav><div class="f-main"><div class="f-toolbar"><h2 id="fTitle"></h2>' +
        '<label class="f-search">' + g('search') + '<span class="sr-only">Search projects</span><input type="search" id="fSearch" placeholder="Search"></label></div>' +
        '<div class="f-grid" id="fGrid" role="listbox" aria-label="Projects"></div><div class="f-status" id="fStatus"></div></div>';
      $$('[data-folder]', r.body).forEach(function (b) { b.addEventListener('click', function () { finderState.folder = b.dataset.folder; renderFinder(); }); });
      $$('[data-go]', r.body).forEach(function (b) { b.addEventListener('click', function () { open(b.dataset.go); }); });
      $('#fSearch').addEventListener('input', function (e) { finderState.q = e.target.value; renderFinder(); });
    }
    renderFinder();
    announce('Opened ' + (folder === 'all' ? 'all work' : folderById[folder].name));
  }
  function renderFinder() {
    var w = wins.finder; if (!w) return;
    var f = finderState.folder, list = itemsFor(f, finderState.q);
    var name = f === 'all' ? 'All Work' : folderById[f].name;
    $('.title', w).textContent = name;
    $('#fTitle').textContent = name;
    $$('[data-folder]', w).forEach(function (b) { b.setAttribute('aria-current', b.dataset.folder === f ? 'true' : 'false'); });
    var grid = $('#fGrid');
    grid.innerHTML = list.length ? list.map(function (p) {
      return '<button type="button" class="f-item" role="option" aria-selected="false" data-id="' + p.id + '">' +
        '<span class="f-thumb"><img src="' + thumbOf(p) + '" alt="" loading="lazy">' + (p.video ? '<span class="play">' + g('play') + '</span>' : '') +
        '<span class="badge ' + p.ext + '">' + (p.ext === 'web' ? 'web' : p.ext) + '</span></span>' +
        '<span class="f-name">' + esc(p.title) + '</span><span class="f-kind">' + esc(p.kind) + '</span></button>';
    }).join('') : '<p class="f-empty">No projects match “' + esc(finderState.q) + '”.</p>';
    $$('.f-item', grid).forEach(function (b) { opener(b, function () { openProject(b.dataset.id); }); });
    $('#fStatus').textContent = list.length + (list.length === 1 ? ' item' : ' items') + (coarse ? ' · tap to open' : ' · double-click to open');
  }

  // ------------------------------------------------------------------ Quick Look (images) and QuickTime (video)
  var FORMAT = { ai: 'Adobe Illustrator', pdf: 'PDF', web: 'Live website', mov: 'Video' };
  function infoPanel(p) {
    var folder = folderById[p.folder];
    var btns = '';
    if (p.url) btns += '<a class="btn btn-primary" href="' + p.url + '" target="_blank" rel="noopener noreferrer">Visit live website ' + g('out') + '</a>';
    if (p.related && byId[p.related]) btns += '<button type="button" class="btn btn-ghost" data-related="' + p.related + '">See ' + esc(byId[p.related].kind.split(' ')[0].toLowerCase()) + ' →</button>';
    btns += '<button type="button" class="btn ' + (p.url ? 'btn-ghost' : 'btn-primary') + '" data-similar>Start a similar project</button>';
    return '<aside class="pv-info"><div class="kicker">' + esc(folder.name) + '</div><h2>' + esc(p.title) + '</h2><p>' + esc(p.text) + '</p>' +
      '<dl class="meta"><dt>Kind</dt><dd>' + esc(p.kind) + '</dd><dt>Format</dt><dd>' + FORMAT[p.ext] + '</dd>' +
      (p.pages > 1 ? '<dt>Shown</dt><dd>' + p.pages + ' pages</dd>' : '') + '<dt>' + (p.ext === 'web' ? 'Status' : 'Modified') + '</dt><dd>' + esc(p.modified) + '</dd></dl>' +
      '<div class="tags">' + p.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div><div class="btn-row">' + btns + '</div></aside>';
  }
  function wireInfo(body, p) {
    var rel = $('[data-related]', body); if (rel) rel.addEventListener('click', function () { openProject(rel.dataset.related); });
    $('[data-similar]', body).addEventListener('click', function () { open('contact', { subject: 'A project like ' + p.title }); });
  }
  function openProject(id) {
    var p = byId[id]; if (!p) return;
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
    if (p.video) return openVideo(p);
    var r = makeWin('pv:' + id, { title: p.title + (p.ext === 'web' ? '' : '.' + p.ext), cls: 'preview', w: 1040, h: 660 });
    if (r.existed) return;
    var n = p.pages || 1, cur = 0;
    var src = function (i, th) { return 'assets/work/' + p.id + '/' + String(i + 1).padStart(2, '0') + (th ? '-thumb' : '') + '.webp'; };
    r.body.innerHTML = '<div class="pv-stage"><div class="pv-view"><img alt=""><button type="button" class="pv-nav prev" aria-label="Previous page">' + g('left') + '</button>' +
      '<button type="button" class="pv-nav next" aria-label="Next page">' + g('right') + '</button></div>' +
      (n > 1 ? '<div class="pv-strip">' + Array.apply(null, Array(n)).map(function (_, i) { return '<button type="button" aria-label="Page ' + (i + 1) + '"><img src="' + src(i, true) + '" alt="" loading="lazy"></button>'; }).join('') + '</div>' : '') +
      '</div>' + infoPanel(p);
    var view = $('.pv-view', r.body), img = $('img', view), strip = $$('.pv-strip button', r.body);
    function show(i) {
      cur = Math.max(0, Math.min(n - 1, i));
      img.src = src(cur); img.alt = p.title + (n > 1 ? ', page ' + (cur + 1) + ' of ' + n : '');
      $('.prev', view).disabled = cur === 0; $('.next', view).disabled = cur === n - 1;
      strip.forEach(function (b, k) { b.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
      if (strip[cur]) strip[cur].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      view.scrollTop = 0;
    }
    img.addEventListener('load', function () { view.classList.toggle('tall', img.naturalHeight / img.naturalWidth > 1.8); });
    $('.prev', view).addEventListener('click', function () { show(cur - 1); });
    $('.next', view).addEventListener('click', function () { show(cur + 1); });
    strip.forEach(function (b, k) { b.addEventListener('click', function () { show(k); }); });
    r.el.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
    var sx = null;
    view.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    view.addEventListener('touchend', function (e) { if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 45) show(cur + (dx < 0 ? 1 : -1)); sx = null; });
    wireInfo(r.body, p);
    show(0);
  }
  function openVideo(p) {
    var r = makeWin('pv:' + p.id, { title: p.title + '.mp4', cls: 'preview', w: 900, h: 680 });
    if (r.existed) return;
    r.body.innerHTML = '<div class="pv-stage"><div class="pv-view"><video controls playsinline preload="metadata" poster="' + p.poster + '"><source src="' + p.video + '" type="video/mp4"></video></div></div>' + infoPanel(p);
    wireInfo(r.body, p);
  }

  // ------------------------------------------------------------------ Notes (About), Mail (Contact), Read Me
  function openAbout() {
    var r = makeWin('about', { title: 'About Ctrl + Create', cls: 'notes', w: 560, h: 620 });
    if (r.existed) return;
    r.body.innerHTML = '<div class="date">Studio notes</div><h2>Small details. Big-picture thinking.</h2>' +
      '<p>Ctrl + Create is an independent creative studio for design, websites and video. The name says how we work: <b>Ctrl</b> for the craft and technology, <b>Create</b> for the ideas. Every project gets both.</p>' +
      '<h3>What we do</h3><div class="svc">' +
      '<div><i style="background:#584294">' + g('nib') + '</i><p><b>Graphic design &amp; branding</b><span>Logos, brand guides, business cards, brochures, catalogues, magazines and print.</span></p></div>' +
      '<div><i style="background:#2F6BC6">' + g('globe') + '</i><p><b>Web design &amp; development</b><span>Responsive websites and online stores, designed and built to work just as well on a phone.</span></p></div>' +
      '<div><i style="background:#EA5F37">' + g('play') + '</i><p><b>Video &amp; motion graphics</b><span>Logo animations, reels, promos and edits with sound design.</span></p></div></div>' +
      '<h3>How we work</h3><ul><li>Start with what the brand needs to say.</li><li>Sketch, explore and refine. You see options, not guesses.</li><li>Deliver clean, ready-to-use files: vector logos, print-ready PDFs and web-ready assets.</li></ul>' +
      '<h3>Tools</h3><p>Adobe Illustrator, Adobe After Effects, HTML, CSS &amp; JavaScript.</p>' +
      '<div class="btn-row" style="margin-top:18px"><button type="button" class="btn btn-primary" data-go="contact">Start a project</button><button type="button" class="btn btn-ghost" data-go="finder:all">Browse the work</button></div>';
    $$('[data-go]', r.body).forEach(function (b) { b.addEventListener('click', function () { open(b.dataset.go); }); });
  }
  function openContact(extra) {
    var r = makeWin('contact', { title: 'New Message', cls: 'mail', w: 620, h: 560 });
    var subject = extra && extra.subject ? extra.subject : '';
    if (r.existed) { if (subject) $('#mSubject').value = subject; return; }
    var C = D.contact;
    r.body.innerHTML = '<form class="mail-form" style="display:contents"><div class="mail-fields">' +
      '<div class="mail-fields-row"><label class="to"><span>To:</span> <b>' + esc(C.email) + '</b></label></div>' +
      '<label><span>From:</span><input id="mName" name="name" autocomplete="name" placeholder="Your name"></label>' +
      '<label><span>Subject:</span><input id="mSubject" name="subject" placeholder="What are we creating?"></label></div>' +
      '<label class="sr-only" for="mBody">Message</label><textarea id="mBody" name="body" placeholder="Tell us about your project: what it is, who it is for and when you need it."></textarea>' +
      '<div class="mail-foot"><button type="submit" class="btn btn-primary">' + g('mail') + ' Send email</button>' +
      '<a class="btn btn-ghost" href="' + C.whatsapp + '" target="_blank" rel="noopener noreferrer">' + g('chat') + ' WhatsApp</a>' +
      '<a class="btn btn-ghost" href="tel:' + C.tel + '">' + g('phone') + ' ' + esc(C.phone) + '</a>' +
      '<span class="grow"></span><small>Opens in your email app.</small></div></form>';
    $('#mSubject').value = subject;
    $('.mail-form', r.body).addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#mName').value.trim(), sub = $('#mSubject').value.trim() || 'New project enquiry', body = $('#mBody').value.trim();
      var text = (body || 'Hi Ctrl + Create,') + (name ? '\n\n— ' + name : '');
      window.location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(text);
    });
  }
  function openReadme() {
    var r = makeWin('readme', { title: 'Read Me.rtf', cls: 'readme', w: 430, h: 480,
      x: mobile() ? 0 : Math.max(16, window.innerWidth - 430 - 140), y: mobile() ? 36 : 96 });
    if (r.existed) return;
    r.body.innerHTML = '<img src="assets/brand/ctrl-create-horizontal.svg" alt="Ctrl + Create — Design · Web Development · Video">' +
      '<h2>Welcome to our desktop. <em>Have a look around.</em></h2>' +
      '<p>This is where we keep our work: logos, brochures, websites and motion. Open a folder, flip through the pages and watch the reels.</p>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary" data-go="finder:all">Open the portfolio</button><button type="button" class="btn btn-ghost" data-go="contact">Say hello</button></div>' +
      '<p class="hint">' + (coarse ? 'Tap any icon to open it.' : '<span>Double-click icons to open · <kbd>Esc</kbd> closes a window · drag windows by their title bar</span>') + '</p>';
    $$('[data-go]', r.body).forEach(function (b) { b.addEventListener('click', function () { open(b.dataset.go); }); });
  }

  // ------------------------------------------------------------------ desktop icons
  var DESK = D.folders.map(function (f) { return { label: f.name, icon: folderIcon(f.color, FOLDER_GLYPH[f.id]), go: 'finder:' + f.id }; })
    .concat([{ label: 'Logo Reveal.mp4', icon: docIcon('MP4', '#EA5F37'), go: 'project:logo-reveal' },
             { label: 'Read Me.rtf', icon: docIcon('RTF', '#2F6BC6'), go: 'readme' },
             { label: 'Contact.vcf', icon: docIcon('VCF', '#2BB673'), go: 'contact' }]);
  $('#deskIcons').innerHTML = DESK.map(function (d, i) {
    return '<li><button type="button" class="desk-icon" aria-selected="false" data-i="' + i + '"><span class="ic">' + d.icon + '</span><span class="lbl">' + esc(d.label) + '</span></button></li>';
  }).join('');
  $$('.desk-icon').forEach(function (b) {
    opener(b, function () { open(DESK[+b.dataset.i].go); });
  });
  $('#desktop').addEventListener('pointerdown', function (e) {
    if (!e.target.closest('.desk-icon') && !e.target.closest('.win')) $$('.desk-icon').forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
  });

  // ------------------------------------------------------------------ dock
  var DOCK = [
    { id: 'finder', label: 'Portfolio', glyph: 'grid', bg: 'linear-gradient(160deg,#7B66C4,#2F6BC6)', go: 'finder:all', win: 'finder' },
    { label: 'Logos & Identity', glyph: 'nib', bg: 'linear-gradient(160deg,#2A3057,#14182B)', color: '#EA5F37', go: 'finder:logos' },
    { label: 'Print & Editorial', glyph: 'book', bg: 'linear-gradient(160deg,#5B92E3,#2653A5)', go: 'finder:print' },
    { label: 'Websites', glyph: 'globe', bg: 'linear-gradient(160deg,#4FC3B9,#1F8A86)', go: 'finder:web' },
    { label: 'Motion & Video', glyph: 'play', bg: 'linear-gradient(160deg,#F5875F,#D9512C)', go: 'finder:motion' },
    { label: 'Our Brand', img: 'assets/brand/ctrl-create-icon-white.svg', bg: 'linear-gradient(160deg,#584294,#2F6BC6)', go: 'finder:brand' },
    { sep: true },
    { id: 'about', label: 'About', glyph: 'lines', bg: 'linear-gradient(160deg,#FFF6D6,#F4DC8A)', color: '#6B5A1E', go: 'about', win: 'about' },
    { id: 'contact', label: 'Contact', glyph: 'mail', bg: 'linear-gradient(160deg,#8FB0E8,#2F6BC6)', go: 'contact', win: 'contact' },
    { label: 'WhatsApp us', glyph: 'chat', bg: 'linear-gradient(160deg,#3DDC84,#1E9E57)', href: D.contact.whatsapp }
  ];
  $('#dockInner').innerHTML = DOCK.map(function (d, i) {
    if (d.sep) return '<span class="dock-sep" aria-hidden="true"></span>';
    var inner = '<span class="app" style="background:' + d.bg + ';color:' + (d.color || '#fff') + '">' + (d.img ? '<img src="' + d.img + '" alt="" style="width:66%">' : g(d.glyph)) + '</span><span class="tip">' + esc(d.label) + '</span>';
    return d.href ? '<a class="dock-item" href="' + d.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(d.label) + '" data-i="' + i + '">' + inner + '</a>'
                  : '<button type="button" class="dock-item" aria-label="' + esc(d.label) + '" data-i="' + i + '">' + inner + '</button>';
  }).join('');
  $$('button.dock-item').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = DOCK[+b.dataset.i];
      b.classList.remove('bounce'); void b.offsetWidth; b.classList.add('bounce');
      open(d.go);
    });
  });
  function syncDock() {
    $$('.dock-item').forEach(function (b) {
      var d = DOCK[+b.dataset.i];
      b.classList.toggle('running', !!(d && d.win && wins[d.win]));
    });
  }
  if (!coarse) {      // magnification for mouse and trackpad users
    var dock = $('#dockInner'), BASE = 52, MAX = 84, RANGE = 130;
    dock.addEventListener('mousemove', function (e) {
      if (mobile()) return;
      $$('.dock-item', dock).forEach(function (it) {
        var r = it.getBoundingClientRect(), c = r.left + r.width / 2, d = Math.abs(e.clientX - c);
        var s = BASE + (MAX - BASE) * Math.max(0, Math.cos(Math.min(1, d / RANGE) * Math.PI / 2));
        it.style.width = it.style.height = s.toFixed(1) + 'px';
      });
    });
    dock.addEventListener('mouseleave', function () { $$('.dock-item', dock).forEach(function (it) { it.style.width = it.style.height = ''; }); });
  }

  // ------------------------------------------------------------------ menu bar
  function closeMenus() { $$('.mb-menu.open').forEach(function (m) { m.classList.remove('open'); $('button', m).setAttribute('aria-expanded', 'false'); }); }
  $$('.mb-menu > button').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var m = b.parentNode, was = m.classList.contains('open');
      closeMenus();
      if (!was) { m.classList.add('open'); b.setAttribute('aria-expanded', 'true'); var first = $('.mb-drop button', m); if (first) first.focus(); }
    });
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open],[data-action]');
    if (t && t.closest('.menubar')) {
      if (t.dataset.open) open(t.dataset.open);
      if (t.dataset.action === 'replay') { closeMenus(); if (window.CCIntro) window.CCIntro.play(); }
      if (t.dataset.action === 'close-all') { closeMenus(); Object.keys(wins).forEach(closeWin); }
      return;
    }
    if (!e.target.closest('.mb-menu')) closeMenus();
  });
  document.addEventListener('keydown', function (e) {
    if (root.classList.contains('intro')) return;
    if (e.key === 'Escape') {
      if ($('.mb-menu.open')) return closeMenus();
      var w = topWin(); if (w) closeWin(w.dataset.id);
    }
  });

  // ------------------------------------------------------------------ boot
  function boot() {
    var hash = decodeURIComponent((location.hash || '').slice(1));
    if (mobile()) openReadme();
    else { openFinder('all'); openReadme(); }
    if (byId[hash]) openProject(hash);
    else if (folderById[hash]) openFinder(hash);
  }
  if (root.classList.contains('intro')) document.addEventListener('cc:intro-done', boot, { once: true });
  else boot();
})();
