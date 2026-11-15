/* Ctrl + Create Studio — effects: light mode on weak devices, wallpaper pause, glass cursor. */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var weak = innerWidth <= 760 || (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  if (weak) root.classList.add('lite');
  document.addEventListener('visibilitychange', function () { root.classList.toggle('fx-paused', document.hidden); });

  // mouse and pen only; touch screens keep the native pointer
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var LINK = 'a[href],button,[role="button"],[role="menuitem"],.f-item,.desk-icon,summary,label,select,input[type="checkbox"],input[type="radio"]';
  var TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]),textarea,[contenteditable="true"]';
  var MORPH = '.dock-item,.btn,.mb-item,.mb-logo,.f-side button';
  var ring, dot, body, light = document.getElementById('wpLight');
  var x = 0, y = 0, rx = 0, ry = 0, hov = null, morph = null, running = false, on = false;

  function make() {
    ring = document.createElement('div'); ring.className = 'cur cur-ring'; ring.innerHTML = '<i class="cur-body"></i>';
    dot = document.createElement('div'); dot.className = 'cur cur-dot'; dot.innerHTML = '<i></i>';
    document.body.appendChild(ring); document.body.appendChild(dot);
    body = ring.firstChild;
  }
  function show() { if (!ring) make(); if (!on) { on = true; rx = x; ry = y; root.classList.add('cc-cursor'); ring.classList.add('on'); dot.classList.add('on'); } }
  function hide() { if (!on) return; on = false; root.classList.remove('cc-cursor'); ring.classList.remove('on'); dot.classList.remove('on'); if (light) light.classList.remove('on'); }
  function go() { if (!running) { running = true; requestAnimationFrame(tick); } }

  function tick() {
    var tx = x, ty = y, k = reduce ? 1 : 0.22;
    if (morph && morph.isConnected) {            // ring wraps the hovered button; follows the dock as it grows
      var r = morph.getBoundingClientRect();
      tx = r.left + r.width / 2; ty = r.top + r.height / 2;
      body.style.width = (r.width + 10) + 'px'; body.style.height = (r.height + 10) + 'px';
    }
    rx += (tx - rx) * k; ry += (ty - ry) * k;
    ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
    dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    var dx = x - rx, dy = y - ry, sp = Math.sqrt(dx * dx + dy * dy);
    var stretch = (!morph && !reduce && !ring.classList.contains('is-text')) ? 1 + Math.min(sp / 140, 0.45) : 1;
    body.style.setProperty('--st', stretch.toFixed(3));
    if (stretch > 1.02) body.style.setProperty('--r', Math.atan2(dy, dx).toFixed(3) + 'rad');
    if (light && !weak && !reduce) light.style.transform = 'translate3d(' + (x * 0.9) + 'px,' + (y * 0.9) + 'px,0)';
    running = sp > 0.3 || !!morph;
    if (running) requestAnimationFrame(tick);
  }

  function setState(t) {
    var link = t && t.closest(LINK), text = t && t.closest(TEXT);
    ring.classList.toggle('is-text', !!text);
    ring.classList.toggle('is-link', !!link && !text);
    var m = link && !text ? link.closest(MORPH) : null;
    if (m !== morph) {
      morph = m; ring.classList.toggle('is-morph', !!m);
      if (!m) { body.style.width = body.style.height = ''; }
      go();
    }
  }

  document.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') { hide(); return; }
    x = e.clientX; y = e.clientY;
    show();
    if (light && !weak) light.classList.add('on');
    go();
  }, { passive: true });
  document.addEventListener('pointerover', function (e) { if (on) setState(e.target); }, { passive: true });
  document.addEventListener('pointerdown', function (e) { if (on && e.pointerType !== 'touch') ring.classList.add('is-down'); }, { passive: true });
  function up(e) {
    if (!on) return;
    ring.classList.remove('is-down');
    if (e.type === 'pointerup' && !reduce) {
      var r = document.createElement('i'); r.className = 'cur-rip';
      r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
      document.body.appendChild(r); setTimeout(function () { r.remove(); }, 700);
    }
  }
  document.addEventListener('pointerup', up, { passive: true });
  document.addEventListener('pointercancel', up, { passive: true });
  document.documentElement.addEventListener('mouseleave', hide);
  window.addEventListener('blur', hide);
})();
