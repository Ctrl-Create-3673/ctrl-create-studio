/* Intro: a condensed, in-browser version of the Ctrl + Create logo reveal.
   Story: cursor -> pen tool draws the purple C -> Ctrl+C / Ctrl+V makes the blue C -> click presses play ->
   cursor docks -> camera pulls back -> caret types "Ctrl" and becomes the + -> "Create" is selected -> light finish. */
(function () {
  'use strict';
  var root = document.documentElement;
  var loader = document.getElementById('loader');
  var SPEED = 0.86;                       // < 1 plays faster than the timings below
  var END = 7850;                         // ms (before SPEED)

  // ------------------------------------------------------------------ easing: AE-style influence curves
  function bezier(x1, y1, x2, y2) {
    return function (t) {
      if (t <= 0) return 0; if (t >= 1) return 1;
      var lo = 0, hi = 1, m, x;
      for (var i = 0; i < 24; i++) { m = (lo + hi) / 2; x = 3 * (1 - m) * (1 - m) * m * x1 + 3 * (1 - m) * m * m * x2 + m * m * m; if (x < t) lo = m; else hi = m; }
      m = (lo + hi) / 2;
      return 3 * (1 - m) * (1 - m) * m * y1 + 3 * (1 - m) * m * m * y2 + m * m * m;
    };
  }
  function ease(outInf, inInf) { return bezier(outInf / 100, 0, 1 - inInf / 100, 1); }
  var E = { std: ease(33, 33), arrive: ease(22, 86), drag: ease(38, 82), draw: ease(38, 62), out: ease(25, 88), io: ease(45, 70) };

  // value at time t for keys [[t, v, easeIntoThisKey?], ...]; numbers or arrays of numbers
  function kf(t, keys) {
    if (t <= keys[0][0]) return keys[0][1];
    for (var i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        var a = keys[i - 1], b = keys[i], p = (t - a[0]) / (b[0] - a[0]), e = (b[2] || E.std)(p);
        if (typeof a[1] === 'number') return a[1] + (b[1] - a[1]) * e;
        return a[1].map(function (v, k) { return v + (b[1][k] - v) * e; });
      }
    }
    return keys[keys.length - 1][1];
  }
  function rgb(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function css(c) { return 'rgb(' + c.map(Math.round).join(',') + ')'; }
  var C = { white: rgb('#FFFFFF'), lav: rgb('#B4A8E6'), purple: rgb('#584294'), blue: rgb('#2F6BC6'), spark: rgb('#EA5F37') };

  // ------------------------------------------------------------------ geometry (logo units, from the v2 vector files)
  var LCX = 100, CY = 100, RM = 73, DX = 122;
  var TIPF = [169.09, 132.91];             // pen nib tip in the final logo (rotation 45)
  var CUR_TIP = [86, 77];                  // cursor tip in the final logo
  function arcPt(a) { a = a * Math.PI / 180; return [LCX + RM * Math.cos(a), CY + RM * Math.sin(a)]; }
  var P0 = arcPt(315), PE = arcPt(45);
  var SEL = arcPt(200);

  function $(id) { return document.getElementById(id); }
  var el = {};
  'lv lvCam lvDrawStroke lvPSector lvPFinal lvCopy lvBSector lvSelP lvBFinal lvPlay lvPlayRect lvHead lvNib lvWord lvCtrl lvCtrlRect lvHL lvCreate lvCreateRect lvPlus lvPlusPath lvCaret lvTag lvCursor lvCursorPath lvHair loaderMist'
    .split(' ').forEach(function (k) { el[k] = $(k); });
  if (!el.lv) return;

  var VB = el.lv.viewBox.baseVal, VC = [VB.x + VB.width / 2, VB.y + VB.height / 2];
  var bb, plusC, tagC, edges, cx0, crx, crw, px, py, pw, ph, measured = false;

  // getBBox needs the loader to be rendered, so measure on first play
  function measure() {
    if (measured) return; measured = true;
    bb = {};
    ['lvPlay', 'lvCtrl', 'lvCreate', 'lvPlusPath', 'lvTag'].forEach(function (k) { bb[k] = el[k].getBBox(); });
    plusC = [bb.lvPlusPath.x + bb.lvPlusPath.width / 2, bb.lvPlusPath.y + bb.lvPlusPath.height / 2];
    tagC = [bb.lvTag.x + bb.lvTag.width / 2, bb.lvTag.y + bb.lvTag.height / 2];

    // right edge of each letter in "Ctrl": measure each contour and merge overlapping ones into glyphs
    var spans = [];
    el.lvCtrl.getAttribute('d').split(/(?=M)/).forEach(function (sub) {
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', sub); p.setAttribute('opacity', '0'); el.lvWord.appendChild(p);
      var b = p.getBBox(); el.lvWord.removeChild(p); spans.push([b.x, b.x + b.width]);
    });
    spans.sort(function (a, b) { return a[0] - b[0]; });
    var g = [];
    spans.forEach(function (s) { if (g.length && s[0] < g[g.length - 1][1] - 0.5) g[g.length - 1][1] = Math.max(g[g.length - 1][1], s[1]); else g.push(s.slice()); });
    edges = g.map(function (s) { return s[1]; });

    cx0 = bb.lvCtrl.x - 4;
    setR(el.lvCtrlRect, cx0, bb.lvCtrl.y - 14, 0, bb.lvCtrl.height + 28);
    crx = bb.lvCreate.x - 6; crw = bb.lvCreate.width + 12;
    setR(el.lvCreateRect, crx, bb.lvCreate.y - 10, 0, bb.lvCreate.height + 20);
    setR(el.lvHL, crx, bb.lvCreate.y - 10, 0, bb.lvCreate.height + 20);
    px = bb.lvPlay.x - 3; py = bb.lvPlay.y - 3; pw = bb.lvPlay.width + 6; ph = bb.lvPlay.height + 6;
    setR(el.lvPlayRect, px, py, 0, ph);
    el.lvHead.setAttribute('y', py - 10); el.lvHead.setAttribute('height', ph + 20);
    el.lvCaret.setAttribute('y', bb.lvCtrl.y - 4); el.lvCaret.setAttribute('height', bb.lvCtrl.height + 8);
    el.lvHair.setAttribute('opacity', '0');
  }

  function setR(r, x, y, w, h) { r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', Math.max(0, w)); r.setAttribute('height', h); }
  function op(e, v) { e.setAttribute('opacity', Math.max(0, Math.min(1, v)).toFixed(3)); }

  // ------------------------------------------------------------------ the timeline (ms)
  function render(t) {
    // camera: push in while drawing, pan to the full mark during the drag, pull back to the stacked logo
    var s = kf(t, [[0, 1.82], [2400, 1.92, E.std], [4050, 1.92], [4650, 1, ease(42, 86)]]);
    var f = kf(t, [[0, [LCX, CY]], [2480, [LCX, CY]], [2980, [148, 100], E.io], [4050, [148, 100]], [4650, VC, ease(42, 86)]]);
    el.lvCam.setAttribute('transform', 'translate(' + (VC[0] - s * f[0]) + ' ' + (VC[1] - s * f[1]) + ') scale(' + s + ')');

    // pen draws the C: mask stroke grows along the centre line, then swells to full weight
    var e = kf(t, [[650, 0], [1450, 1, E.draw]]);
    el.lvDrawStroke.setAttribute('stroke-dashoffset', (1 - e).toFixed(4));
    el.lvDrawStroke.setAttribute('stroke-width', kf(t, [[1450, 1.8], [1760, 36, E.out]]).toFixed(2));
    el.lvPSector.setAttribute('fill', css(kf(t, [[1470, C.lav], [1700, C.purple, ease(30, 70)]])));

    // pen nib: appears as the tool, follows the tip, then is set down in its final place
    var tip, rot, sc = kf(t, [[520, 0], [650, 1, E.out]]);
    if (t < 650) { tip = P0; rot = kf(t, [[520, 165], [650, 135, E.out]]); }
    else if (t < 1450) { tip = arcPt(315 - 270 * e); rot = kf(t, [[650, 135], [1450, 146, ease(40, 50)]]); }
    else { tip = kf(t, [[1500, PE], [1850, TIPF, ease(35, 85)]]); rot = kf(t, [[1500, 146], [1850, 45, ease(35, 86)]]); }
    op(el.lvNib, t < 520 ? 0 : 1);
    el.lvNib.setAttribute('transform', 'translate(' + (tip[0] - TIPF[0]) + ' ' + (tip[1] - TIPF[1]) + ') rotate(' + (rot - 45) + ' ' + TIPF[0] + ' ' + TIPF[1] + ') translate(' + TIPF[0] + ' ' + TIPF[1] + ') scale(' + sc + ') translate(' + (-TIPF[0]) + ' ' + (-TIPF[1]) + ')');

    // select, copy, paste, drag
    op(el.lvSelP, t > 2280 && t < 2420 ? 1 : 0);
    var drag = kf(t, [[2480, 0], [2900, 1, E.drag]]);
    var lift = kf(t, [[2420, 1], [2500, 1.035, E.out], [2880, 1.035], [3000, 1, E.out]]);
    var dy = -8 * Math.sin(Math.PI * drag);
    op(el.lvCopy, t >= 2420 && t < 3000 ? 1 : 0);
    el.lvCopy.setAttribute('transform', 'translate(' + DX * drag + ' ' + dy + ') translate(' + LCX + ' ' + CY + ') scale(' + lift + ') translate(' + (-LCX) + ' ' + (-CY) + ')');
    el.lvBSector.setAttribute('fill', css(kf(t, [[2560, C.purple], [2820, C.blue, E.io]])));
    var landed = t >= 3000;
    op(el.lvPSector, landed ? 0 : 1); op(el.lvPFinal, landed ? 1 : 0); op(el.lvBFinal, landed ? 1 : 0);

    // press play: the playhead scrubs across and reveals the triangle
    var pr = kf(t, [[3240, 0], [3500, 1, E.io]]);
    el.lvPlayRect.setAttribute('width', (pw * pr).toFixed(2));
    el.lvHead.setAttribute('x', px + pw * pr);
    op(el.lvHead, kf(t, [[3230, 0], [3260, 1], [3480, 1], [3560, 0]]));

    // the cursor: enters, clicks, hides behind the pen tool, comes back, selects, drags, presses play, docks
    var cp, cs = 0.55, cfill = C.white, cvis = 1;
    if (t < 520) {
      cp = kf(t, [[0, [318, 232]], [420, P0, E.arrive]]);
      cs = t > 470 && t < 590 ? 0.5 : 0.55; cs *= kf(t, [[470, 1], [560, 0.0001, E.out]]);
    } else if (t < 1850) { cvis = 0; cp = P0; }
    else if (t < 2420) {
      cp = kf(t, [[1850, [196, 160]], [2000, [196, 160]], [2250, SEL, E.arrive]]);
      cs = 0.55 * kf(t, [[1850, 0.0001], [1980, 1, E.out]]) * (t > 2250 && t < 2330 ? 0.9 : 1);
    } else if (t < 3000) { cp = [SEL[0] + DX * drag, SEL[1] + dy]; cs = 0.55 * lift; }
    else if (t < 3520) {
      cp = kf(t, [[3000, [SEL[0] + DX, SEL[1]]], [3200, [224, 108], E.arrive], [3260, [224, 108]], [3420, [252, 132], E.out]]);
      cs = 0.55 * (t > 3200 && t < 3270 ? 0.9 : 1);
    } else {
      cp = kf(t, [[3520, [252, 132]], [3900, CUR_TIP, ease(34, 88)]]);
      cs = kf(t, [[3540, 0.55], [3900, 1, ease(30, 88)]]);
      cfill = kf(t, [[3560, C.white], [3860, C.purple, ease(40, 70)]]);
    }
    op(el.lvCursor, cvis);
    el.lvCursor.setAttribute('transform', 'translate(' + cp[0] + ' ' + cp[1] + ') scale(' + cs + ') translate(' + (-CUR_TIP[0]) + ' ' + (-CUR_TIP[1]) + ')');
    el.lvCursorPath.setAttribute('fill', css(cfill));

    // the caret types "Ctrl", slides over and becomes the +
    var typed = 0, TY = [4850, 4980, 5100, 5260];
    for (var i = 0; i < TY.length; i++) if (t >= TY[i]) typed = i + 1;
    var reach = typed ? edges[Math.min(typed, edges.length) - 1] : cx0 + 4;
    if (typed === TY.length) reach = edges[edges.length - 1];
    el.lvCtrlRect.setAttribute('width', Math.max(0, reach + 6 - cx0));
    var caretX = t < 5300 ? reach + 5 : kf(t, [[5300, edges[edges.length - 1] + 5], [5460, plusC[0] - 1.5, E.arrive]]);
    el.lvCaret.setAttribute('x', caretX);
    var blink = t > 4700 && t < 4850 && Math.floor((t - 4700) / 75) % 2 === 1;
    op(el.lvCaret, t > 4700 && t < 5470 && !blink ? 1 : 0);
    var pp = kf(t, [[5460, 0], [5760, 1, E.out]]);
    op(el.lvPlus, t >= 5460 ? 1 : 0);
    el.lvPlus.setAttribute('transform', 'rotate(' + (-90 + 90 * pp) + ' ' + plusC[0] + ' ' + plusC[1] + ') translate(' + plusC[0] + ' ' + plusC[1] + ') scale(' + (0.25 + 0.75 * pp) + ') translate(' + (-plusC[0]) + ' ' + (-plusC[1]) + ')');
    el.lvPlusPath.setAttribute('fill', css(kf(t, [[5460, C.white], [5700, C.spark]])));

    // "Create" is revealed by a text-selection sweep
    var sw = kf(t, [[5700, 0], [6050, 1, ease(40, 72)]]);
    el.lvCreateRect.setAttribute('width', (crw * sw).toFixed(2));
    el.lvHL.setAttribute('width', (crw * sw).toFixed(2));
    op(el.lvHL, 0.32 * kf(t, [[5690, 0], [5710, 1], [6050, 1], [6220, 0]]));

    // tagline closes its tracking
    var tg = kf(t, [[6000, 0], [6450, 1, E.out]]);
    op(el.lvTag, tg);
    el.lvTag.setAttribute('transform', 'translate(' + tagC[0] + ' ' + tagC[1] + ') scale(' + (1.14 - 0.14 * tg) + ' 1) translate(' + (-tagC[0]) + ' ' + (-tagC[1]) + ')');

    // final hit: the light opens from behind the mark
    var m = kf(t, [[6450, 0], [6900, 1, ease(8, 82)]]);
    if (m > 0) {
      var r = el.lv.getBoundingClientRect(), k = r.width / VB.width;
      var mx = r.left + (148 - VB.x) * k, my = r.top + (100 - VB.y) * k;
      el.loaderMist.style.clipPath = 'circle(' + (m * 150).toFixed(2) + 'vmax at ' + mx.toFixed(1) + 'px ' + my.toFixed(1) + 'px)';
    }
  }

  // ------------------------------------------------------------------ playback
  var start = 0, raf = 0, done = false;
  function frame(now) {
    if (!start) start = now;
    var t = (now - start) / SPEED;
    render(Math.min(t, END));
    if (t >= 7300 && !loader.classList.contains('leaving')) finish();
    if (t < END) raf = requestAnimationFrame(frame);
  }
  function finish() {
    if (done) return; done = true;
    try { sessionStorage.setItem('cc-intro-seen', '1'); } catch (e) {}
    loader.classList.add('leaving');            // .leaving keeps the loader on screen while it dissolves
    root.classList.remove('intro'); root.classList.add('no-intro');
    root.classList.remove('booted'); void root.offsetWidth; root.classList.add('booted');
    document.dispatchEvent(new CustomEvent('cc:intro-done'));
    setTimeout(function () { cancelAnimationFrame(raf); loader.classList.remove('leaving'); }, 650);
  }
  function play() {
    done = false; start = 0;
    root.classList.remove('no-intro'); root.classList.add('intro');
    el.loaderMist.style.clipPath = 'circle(0 at 50% 50%)';
    measure();
    render(0);
    cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
  }
  document.getElementById('loaderSkip').addEventListener('click', finish);
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && root.classList.contains('intro')) finish(); });
  window.CCIntro = { play: play, skip: finish, render: render };

  if (root.classList.contains('intro')) {
    var go = function () { (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(play); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  } else {
    root.classList.add('booted');
  }
})();
