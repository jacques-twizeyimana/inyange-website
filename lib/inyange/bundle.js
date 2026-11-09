/* @ds-bundle: {"format":4,"namespace":"Inyange","components":[{"name":"MilkPour"},{"name":"FillMeter"}]} */
/* Inyange — fluid components (copied from the Inyange design system bundle.js). Vanilla JS, no dependencies.
   MilkPour: a thick, continuous stream (a ribbon thinning as it accelerates) falls into a
   glass; a viscous spring height-field surface takes the impact; stream, surface and heavy
   splash lobes merge through a metaball outline; condensation beads run down the cold glass.
   FillMeter: a small glass whose milk level springs to a value with a decaying slosh. */
(function () {
  var NS = (window.Inyange = window.Inyange || {});
  var reduceMotion = function () {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  };
  function cssVar(el, name, fallback) {
    var v = getComputedStyle(el).getPropertyValue(name).trim();
    return v || fallback;
  }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function alpha(hex, a) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h.slice(0, 6), 16);
    if (isNaN(n)) return 'rgba(255,255,255,' + a + ')';
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  /* ------------------------------------------------------------------ MilkPour */
  /* Milk is thick. Everything liquid here is drawn as ONE connected body:
     - the stream is a chain of slices under gravity rendered as a single filled ribbon whose
       width follows continuity (faster = thinner: w ∝ v^-1/2), with a slow rope-like undulation;
     - the surface is a viscous spring height-field driven by a smooth, Gaussian-spread push
       where the stream lands (no per-drop spikes), with a meniscus climbing the walls;
     - near the impact, stream, surface and the few heavy blobs it throws are joined by a
       metaball field (marching squares), so they neck and merge instead of scattering. */
  /* live simulations by key: when a host re-renders and hands us a fresh element,
     the running pour moves into it instead of starting over */
  var LIVE = {};

  function MilkPour(el, opts) {
    opts = opts || {};
    if (opts.key && LIVE[opts.key]) { LIVE[opts.key].attach(el); return LIVE[opts.key]; }
    var target = clamp(opts.fill == null ? 0.8 : opts.fill, 0.1, 0.92);
    var loop = opts.loop !== false;
    var gx = opts.x == null ? 0.7 : opts.x;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', opts.label || 'Chilled milk pouring into a glass');
    el.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var N = 72, hgt = new Float32Array(N), vel = new Float32Array(N), lD = new Float32Array(N), rD = new Float32Array(N), force = new Float32Array(N);
    var W = 0, H = 0, S = 1, G = null;
    var slices = [], blobs = [], beads = [], trails = [];
    var level = 0, state = 'pour', stateT = 0, frame = 0, ramp = 0, chain = 0, raf = 0, visible = true, destroyed = false;
    var impactX = null, impactW = 0, coldY = Infinity;
    var lastW = 0, lastH = 0, releaseTimer = 0, idleT = 0;
    var STEP = 1000 / 60, acc = 0, lastT = 0; // fixed 60 Hz physics, whatever the display does
    var C = {};

    function readColors() {
      C.milk = cssVar(el, '--milk', '#ffffff');
      C.sky = cssVar(el, '--sky-light', '#8fd3f5');
      C.deep = cssVar(el, '--blue-deep', '#00396b');
    }

    function layout() {
      var r = el.getBoundingClientRect();
      W = Math.max(160, r.width); H = Math.max(160, r.height);
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var gh = Math.min(H * 0.6, 300), gw = gh * 0.64;
      S = gh / 260;
      var cx = clamp(W * gx, gw * 0.7, W - gw * 0.7);
      var bottom = H - Math.max(18, H * 0.08);
      G = { cx: cx, top: bottom - gh, bottom: bottom, wTop: gw, wBot: gw * 0.78, wall: Math.max(3, gw * 0.045) };
      G.inTop = G.top + 6 * S;
      G.inBottom = G.bottom - G.wall * 2.6;
      // only re-scatter condensation when the stage really changed size
      if (!beads.length || Math.abs(W - lastW) > 2 || Math.abs(H - lastH) > 2) seedBeads();
      lastW = W; lastH = H;
    }

    function halfAt(y) {
      var t = clamp((y - G.top) / (G.bottom - G.top), 0, 1);
      return (G.wTop + (G.wBot - G.wTop) * t) / 2;
    }
    function surfY() { return G.inBottom - level * (G.inBottom - G.inTop); }
    function innerHalf() { return halfAt(surfY()) - G.wall; }
    function colF(x) { var hw = innerHalf(); return ((x - (G.cx - hw)) / (2 * hw)) * (N - 1); }
    // meniscus: thick milk climbs a few px up each wall
    function men(i) { var e = Math.min(i, N - 1 - i); return e > 4 ? 0 : -4.2 * S * Math.pow(1 - e / 5, 2); }
    // surface height at any x (linear between columns)
    function surfAt(x) {
      var f = colF(x);
      if (f < 0 || f > N - 1) return Infinity;
      var i = Math.floor(f), t = f - i, j = Math.min(N - 1, i + 1);
      return surfY() + (hgt[i] + men(i)) * (1 - t) + (hgt[j] + men(j)) * t;
    }

    function seedBeads() {
      beads = [];
      var n = Math.round(24 * S);
      for (var i = 0; i < n; i++) beads.push(newBead(rand(G.top + 14 * S, G.bottom - 14 * S)));
      trails = [];
    }
    function newBead(y) {
      var hw = halfAt(y) - 5 * S;
      return { x: G.cx + rand(-hw, hw), y: y, r: rand(2.2, 3.6) * S, vy: 0, slide: false, trail: [] };
    }

    var W0 = 0, lastRamp = 0; // stream width at the lip; ramp at the previous emit
    function emit() {
      W0 = 19 * S;
      var sx = G.cx - G.wTop * 0.8, sy = -14 * S, g = 0.3 * S, vy0 = 1.4 * S;
      var dy = surfY() - sy;
      var tf = (-vy0 + Math.sqrt(vy0 * vy0 + 2 * g * dy)) / g;
      var aimX = G.cx - G.wTop * 0.1 + Math.sin(frame * 0.02) * G.wTop * 0.05;
      var vx = (aimX - sx) / tf;
      // two slices a frame, evenly spaced in time: one born half a frame ago (already a little
      // way down its arc), then one at the lip — so the ribbon is uniformly sampled
      for (var h = 0.5; h >= 0; h -= 0.5) {
        slices.push({ x: sx + vx * h, y: sy + vy0 * h + 0.5 * g * h * h, vx: vx, vy: vy0 + g * h, g: g, v0: Math.hypot(vx, vy0), w: W0 * (h ? (ramp + lastRamp) / 2 : ramp), born: frame, chain: chain });
      }
      lastRamp = ramp;
    }

    function stepWater() {
      var k = 0.016, d = 0.075, spread = 0.3, i, j;
      for (i = 0; i < N; i++) { vel[i] += -k * hgt[i] - d * vel[i] + force[i]; hgt[i] += vel[i]; force[i] = 0; }
      for (j = 0; j < 6; j++) {
        for (i = 0; i < N; i++) {
          if (i > 0) { lD[i] = spread * (hgt[i] - hgt[i - 1]); vel[i - 1] += lD[i]; }
          if (i < N - 1) { rD[i] = spread * (hgt[i] - hgt[i + 1]); vel[i + 1] += rD[i]; }
        }
        for (i = 0; i < N; i++) {
          if (i > 0) hgt[i - 1] += lD[i];
          if (i < N - 1) hgt[i + 1] += rD[i];
        }
      }
      var lim = 22 * S;
      for (i = 0; i < N; i++) hgt[i] = clamp(hgt[i], -lim, lim);
    }
    // smooth Gaussian push centred on x
    function push(x, amount, sigmaPx) {
      var f = colF(x), hw = innerHalf(), sig = (sigmaPx / (2 * hw)) * (N - 1);
      for (var i = 0; i < N; i++) { var u = (i - f) / sig; force[i] += amount * Math.exp(-0.5 * u * u); }
    }

    function step() {
      frame++; stateT++;
      if (frame % 30 === 1) readColors();
      var i, p;

      if (state === 'pour') {
        ramp = Math.max(0.7, Math.min(1, ramp + 0.06));
        emit();
        if (level >= target) { state = 'settle'; stateT = 0; }
      } else if (state === 'settle') {
        if (ramp > 0) { ramp = Math.max(0, ramp - 0.045); if (ramp > 0.04) emit(); } // the pour thins and pinches off
        if (loop && stateT > 220 && !slices.length) { state = 'drink'; stateT = 0; }
        // not looping: the full glass stays alive with a slow, gentle slosh now and then
        if (!loop && !slices.length && ++idleT > 200) { idleT = 0; push(G.cx + rand(-0.5, 0.5) * innerHalf(), rand(0.25, 0.5) * S, 16 * S); }
      } else if (state === 'drink') {
        level = Math.max(0, level - 0.0055);
        if (level <= 0) { state = 'rest'; stateT = 0; }
      } else if (state === 'rest' && stateT > 50) { state = 'pour'; stateT = 0; chain++; }

      // stream slices
      impactX = null;
      for (i = slices.length - 1; i >= 0; i--) {
        p = slices[i];
        p.vy += p.g; p.x += p.vx; p.y += p.vy;
        var ys = surfAt(p.x);
        if (p.y >= ys) {
          // momentum and volume go into the surface as one smooth push
          var wr = p.w / Math.max(1, W0);
          push(p.x, 0.012 * p.vy * wr, 9 * S);
          if (level < Math.min(0.95, target + 0.03)) level += 0.0015 * wr * wr;
          impactX = p.x; impactW = Math.max(impactW * 0.9, widthOf(p));
          // a heavy blob now and then — thick milk throws few, large, slow lobes
          if (wr > 0.6 && Math.random() < 0.025 && blobs.length < 5) {
            blobs.push({ x: p.x + rand(-6, 6) * S, y: ys - 2 * S, vx: rand(-0.6, 0.6) * S, vy: -rand(0.9, 1.5) * S, r: rand(4.5, 7) * S, g: 0.13 * S });
          }
          slices.splice(i, 1);
          continue;
        }
        if (p.y > H + 30) slices.splice(i, 1);
      }
      for (i = blobs.length - 1; i >= 0; i--) {
        p = blobs[i];
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.98;
        if (p.vy > 0 && p.y > surfAt(p.x) + p.r * 0.6) { push(p.x, 0.05 * p.r * 0.2, 7 * S); blobs.splice(i, 1); }
      }
      stepWater();
      if (level > 0.02) coldY = Math.min(coldY, surfY() + 6 * S);
      if (state === 'rest') coldY = Math.min(Infinity, coldY + 1.5 * S);

      // condensation: a fat bead lets go now and then and runs down, leaving a clear trail
      if (frame % 90 === 0) {
        var big = beads.filter(function (b) { return !b.slide && b.r > 3 * S && b.y > coldY && b.y < G.bottom - 70 * S; });
        if (big.length) { var b0 = big[(Math.random() * big.length) | 0]; b0.slide = true; }
      }
      for (i = 0; i < beads.length; i++) {
        var b = beads[i];
        if (!b.slide) continue;
        b.vy = Math.min(0.9 * S, b.vy + 0.015 * S);
        b.y += b.vy; b.x += Math.sin(b.y * 0.06) * 0.03;
        b.trail.push([b.x, b.y]);
        if (b.y > G.bottom - 10 * S) {
          trails.push({ pts: b.trail, life: 1, w: b.r * 0.8 });
          beads[i] = newBead(rand(Math.max(G.top + 14 * S, Math.min(coldY, G.bottom - 40 * S)), G.bottom - 40 * S));
        }
      }
      for (i = trails.length - 1; i >= 0; i--) { trails[i].life -= 0.004; if (trails[i].life <= 0) trails.splice(i, 1); }
    }

    // continuity: a falling column thins as it speeds up
    function widthOf(p) { var v = Math.hypot(p.vx, p.vy); return p.w * Math.pow(p.v0 / Math.max(p.v0, v), 0.28) * (1 + 0.04 * Math.sin(p.y * 0.045 - frame * 0.12)); }

    function glassPath(inset) {
      var t = G.top, b = G.bottom;
      ctx.beginPath();
      ctx.moveTo(G.cx - halfAt(t) + inset, t);
      ctx.lineTo(G.cx + halfAt(t) - inset, t);
      ctx.lineTo(G.cx + halfAt(b) - inset, b - 6 * S);
      ctx.quadraticCurveTo(G.cx + halfAt(b) - inset, b, G.cx + halfAt(b) - inset - 6 * S, b);
      ctx.lineTo(G.cx - halfAt(b) + inset + 6 * S, b);
      ctx.quadraticCurveTo(G.cx - halfAt(b) + inset, b, G.cx - halfAt(b) + inset, b - 6 * S);
      ctx.closePath();
    }
    // interior of the glass, extended straight up so a blob above the rim is not cut off
    function interiorClip() {
      var t = G.top, b = G.bottom, i = G.wall;
      ctx.beginPath();
      ctx.moveTo(G.cx - halfAt(t) + i, t - 200);
      ctx.lineTo(G.cx + halfAt(t) - i, t - 200);
      ctx.lineTo(G.cx + halfAt(t) - i, t);
      ctx.lineTo(G.cx + halfAt(b) - i, b - 6 * S);
      ctx.quadraticCurveTo(G.cx + halfAt(b) - i, b, G.cx + halfAt(b) - i - 6 * S, b);
      ctx.lineTo(G.cx - halfAt(b) + i + 6 * S, b);
      ctx.quadraticCurveTo(G.cx - halfAt(b) + i, b, G.cx - halfAt(b) + i, b - 6 * S);
      ctx.lineTo(G.cx - halfAt(t) + i, t);
      ctx.closePath();
      ctx.clip();
    }

    function smooth(pts, cont) {
      if (cont) ctx.lineTo(pts[0][0], pts[0][1]); else ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length - 1; i++) {
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2);
      }
      var l = pts[pts.length - 1]; ctx.lineTo(l[0], l[1]);
    }

    /* the stream as filled ribbons, one per unbroken chain (newest slice = the lip) */
    function drawStream() {
      if (slices.length < 2) return;
      var groups = [], cur = [];
      for (var i = slices.length - 1; i >= 0; i--) {
        var p = slices[i], q = cur[cur.length - 1];
        if (q && (q.chain !== p.chain || Math.abs(q.born - p.born) > 2)) { groups.push(cur); cur = []; }
        cur.push(p);
      }
      groups.push(cur);
      ctx.fillStyle = C.milk;
      for (var gI = 0; gI < groups.length; gI++) {
        var gr = groups[gI];
        if (gr.length < 2) continue;
        // extend the lowest end down to the surface so the stream meets the milk
        var last = gr[gr.length - 1];
        var tail = { x: last.x + last.vx * 2, y: last.y + last.vy * 2, vx: last.vx, vy: last.vy, w: last.w, v0: last.v0, born: last.born };
        if (surfAt(tail.x) < Infinity) tail.y = Math.max(last.y, Math.min(tail.y + 6 * S, surfAt(tail.x) + 6 * S));
        var pts = gr.concat([tail]);
        var L = [], R = [];
        for (var k = 0; k < pts.length; k++) {
          var a = pts[Math.max(0, k - 1)], c = pts[Math.min(pts.length - 1, k + 1)];
          var tx = c.x - a.x, ty = c.y - a.y, tl = Math.hypot(tx, ty) || 1;
          var nx = -ty / tl, ny = tx / tl, hw = widthOf(pts[k]) / 2;
          L.push([pts[k].x + nx * hw, pts[k].y + ny * hw]);
          R.push([pts[k].x - nx * hw, pts[k].y - ny * hw]);
        }
        ctx.beginPath();
        smooth(L);
        var e = pts[pts.length - 1], eh = widthOf(e) / 2, ang = Math.atan2(e.vy, e.vx);
        ctx.arc(e.x, e.y, Math.max(0.5, eh), ang + Math.PI / 2, ang - Math.PI / 2, true);
        smooth(R.reverse(), true);
        var s0 = pts[0], sh = widthOf(s0) / 2, ang0 = Math.atan2(s0.vy, s0.vx);
        ctx.arc(s0.x, s0.y, Math.max(0.5, sh), ang0 - Math.PI / 2, ang0 - Math.PI * 1.5, true);
        ctx.closePath();
        ctx.fill();
      }
    }

    /* metaball join: stream foot + surface + blobs, as one outline (marching squares).
       Wyvill kernel: 1 at radius r, exactly 0 beyond KR·r, so the join meets the plain surface seamlessly. */
    var KR = 3.2, KA = 1 / Math.pow(1 - 1 / (KR * KR), 3);
    function kern(d2, r) { var R2 = r * r * KR * KR; if (d2 >= R2) return 0; var u = 1 - d2 / R2; return KA * u * u * u; }
    function drawJoin() {
      var parts = [];
      var foot = null;
      if (impactX != null) {
        // the last stretch of stream above the surface, as a capsule
        var lo = null, hi = null;
        for (var i = 0; i < slices.length; i++) { var p = slices[i]; if (!lo || p.y > lo.y) lo = p; }
        if (lo) {
          hi = { x: lo.x - lo.vx * 4, y: lo.y - lo.vy * 4 };
          var ys = surfAt(lo.x);
          foot = { ax: hi.x, ay: hi.y, bx: lo.x + lo.vx * 3, by: Math.max(lo.y, ys + 4 * S), r: widthOf(lo) / 2 };
          parts.push([foot.bx, foot.by, foot.r * KR]); parts.push([foot.ax, foot.ay, foot.r * KR]);
        }
      }
      for (var b = 0; b < blobs.length; b++) parts.push([blobs[b].x, blobs[b].y, blobs[b].r * KR]);
      if (!parts.length) return;
      var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (var q = 0; q < parts.length; q++) {
        x0 = Math.min(x0, parts[q][0] - parts[q][2]); x1 = Math.max(x1, parts[q][0] + parts[q][2]);
        y0 = Math.min(y0, parts[q][1] - parts[q][2]); y1 = Math.max(y1, parts[q][1] + parts[q][2]);
      }
      var hwI = innerHalf();
      x0 = Math.max(x0, G.cx - hwI - 2); x1 = Math.min(x1, G.cx + hwI + 2);
      
      if (x1 <= x0 || y1 <= y0) return;
      var st = 2.5, nx = Math.ceil((x1 - x0) / st) + 1, ny = Math.ceil((y1 - y0) / st) + 1;
      var kS = 5 * S, F = new Float32Array(nx * ny), sCache = new Float32Array(nx);
      for (var ix = 0; ix < nx; ix++) sCache[ix] = surfAt(x0 + ix * st);
      for (var iy = 0; iy < ny; iy++) {
        var y = y0 + iy * st;
        for (ix = 0; ix < nx; ix++) {
          var x = x0 + ix * st, f = 0, sy = sCache[ix];
          if (sy < Infinity) f += Math.exp(Math.min(4, (y - sy) / kS));
          if (foot) {
            var dx = foot.bx - foot.ax, dy = foot.by - foot.ay, l2 = dx * dx + dy * dy || 1;
            var t = clamp(((x - foot.ax) * dx + (y - foot.ay) * dy) / l2, 0, 1);
            var ex = x - (foot.ax + dx * t), ey = y - (foot.ay + dy * t);
            f += kern(ex * ex + ey * ey, foot.r);
          }
          for (b = 0; b < blobs.length; b++) {
            var bx = x - blobs[b].x, by = y - blobs[b].y;
            f += kern(bx * bx + by * by, blobs[b].r);
          }
          F[iy * nx + ix] = f;
        }
      }
      ctx.save(); interiorClip();
      ctx.beginPath();
      function lerp(xa, ya, va, xb, yb, vb, out) { var t = (1 - va) / (vb - va); out.push([xa + (xb - xa) * t, ya + (yb - ya) * t]); }
      for (iy = 0; iy < ny - 1; iy++) {
        for (ix = 0; ix < nx - 1; ix++) {
          var va = F[iy * nx + ix], vb = F[iy * nx + ix + 1], vc = F[(iy + 1) * nx + ix + 1], vd = F[(iy + 1) * nx + ix];
          var ia = va >= 1, ib = vb >= 1, ic = vc >= 1, id = vd >= 1;
          if (!(ia || ib || ic || id)) continue;
          var ax = x0 + ix * st, ay = y0 + iy * st, bx2 = ax + st, cy = ay + st, poly = [];
          if (ia) poly.push([ax, ay]);
          if (ia !== ib) lerp(ax, ay, va, bx2, ay, vb, poly);
          if (ib) poly.push([bx2, ay]);
          if (ib !== ic) lerp(bx2, ay, vb, bx2, cy, vc, poly);
          if (ic) poly.push([bx2, cy]);
          if (ic !== id) lerp(bx2, cy, vc, ax, cy, vd, poly);
          if (id) poly.push([ax, cy]);
          if (id !== ia) lerp(ax, cy, vd, ax, ay, va, poly);
          if (poly.length < 3) continue;
          ctx.moveTo(poly[0][0], poly[0][1]);
          for (var m = 1; m < poly.length; m++) ctx.lineTo(poly[m][0], poly[m][1]);
          ctx.closePath();
        }
      }
      ctx.fillStyle = C.milk; ctx.fill();
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var sy = surfY(), i;

      ctx.fillStyle = alpha(C.deep, 0.35);
      ctx.beginPath(); ctx.ellipse(G.cx, G.bottom + 4 * S, G.wBot * 0.62, 7 * S, 0, 0, Math.PI * 2); ctx.fill();
      glassPath(0); ctx.fillStyle = alpha(C.sky, 0.16); ctx.fill();

      // the milk body
      ctx.save();
      glassPath(G.wall); ctx.clip();
      var hw = innerHalf(), x0 = G.cx - hw, dx = (2 * hw) / (N - 1), pts = [];
      if (level > 0.002) {
        for (i = 0; i < N; i++) pts.push([x0 + i * dx, sy + hgt[i] + men(i)]);
        ctx.beginPath();
        ctx.moveTo(x0 - 20, G.bottom + 20);
        ctx.lineTo(x0 - 20, pts[0][1]);
        smooth(pts, true);
        ctx.lineTo(x0 + 2 * hw + 20, pts[N - 1][1]);
        ctx.lineTo(x0 + 2 * hw + 20, G.bottom + 20);
        ctx.closePath();
        ctx.fillStyle = C.milk; ctx.fill();
      }
      ctx.restore();

      drawStream();
      drawJoin();

      if (level > 0.002) {
        ctx.save();
        glassPath(G.wall); ctx.clip();
        ctx.beginPath();
        ctx.moveTo(x0 - 20, G.bottom + 20); ctx.lineTo(x0 - 20, pts[0][1]); smooth(pts, true);
        ctx.lineTo(x0 + 2 * hw + 20, pts[N - 1][1]); ctx.lineTo(x0 + 2 * hw + 20, G.bottom + 20); ctx.closePath();
        // soft body shading, inside the milk only: cool right band, a touch of depth at the base
        ctx.clip();
        ctx.fillStyle = alpha(C.sky, 0.2);
        ctx.fillRect(G.cx + hw * 0.5, sy - 40 * S, hw, G.bottom - sy + 60 * S);
        ctx.fillStyle = alpha(C.sky, 0.1);
        ctx.fillRect(x0 - 20, G.inBottom - 10 * S, 2 * hw + 40, 30 * S);
        // a broad, soft sheen just under the surface — reads as a creamy, opaque liquid
        ctx.beginPath(); smooth(pts.map(function (q) { return [q[0], q[1] + 5 * S]; }));
        ctx.strokeStyle = alpha(C.sky, 0.28); ctx.lineWidth = 5 * S; ctx.stroke();
        ctx.restore();
      }

      // glass walls, rim, highlights
      glassPath(0); ctx.strokeStyle = alpha(C.milk, 0.85); ctx.lineWidth = 2.4 * S; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(G.cx, G.top, G.wTop / 2, 5 * S, 0, 0, Math.PI * 2);
      ctx.strokeStyle = alpha(C.milk, 0.9); ctx.lineWidth = 2 * S; ctx.stroke();
      ctx.fillStyle = alpha(C.milk, 0.28);
      ctx.fillRect(G.cx - halfAt(G.bottom) + 2 * S, G.inBottom + 2 * S, (halfAt(G.bottom) - 2 * S) * 2, G.bottom - G.inBottom - 3 * S);
      ctx.fillStyle = alpha(C.milk, 0.4);
      ctx.beginPath();
      var hx = G.cx - halfAt(G.top) + G.wall + 6 * S, hx2 = G.cx - halfAt(G.bottom) + G.wall + 6 * S;
      ctx.moveTo(hx, G.top + 16 * S); ctx.lineTo(hx + 7 * S, G.top + 16 * S);
      ctx.lineTo(hx2 + 6 * S, G.inBottom - 12 * S); ctx.lineTo(hx2, G.inBottom - 12 * S); ctx.closePath(); ctx.fill();

      // condensation: fewer, softer beads; over the milk they are only a faint lens
      ctx.lineCap = 'round';
      for (i = 0; i < trails.length; i++) {
        var tr = trails[i]; if (tr.pts.length < 2) continue;
        ctx.strokeStyle = alpha(C.milk, 0.14 * tr.life); ctx.lineWidth = tr.w;
        ctx.beginPath(); smooth(tr.pts); ctx.stroke();
      }
      for (i = 0; i < beads.length; i++) {
        var bd = beads[i];
        if (bd.slide && bd.trail.length > 1) {
          ctx.strokeStyle = alpha(C.milk, 0.18); ctx.lineWidth = bd.r * 0.8;
          ctx.beginPath(); smooth(bd.trail); ctx.stroke();
        }
        if (bd.y < coldY && !bd.slide) continue; // the glass only fogs where the cold milk is
        var overMilk = level > 0.01 && bd.y > sy + 4 * S;
        ctx.fillStyle = overMilk ? alpha(C.sky, 0.13) : alpha(C.milk, 0.3);
        ctx.beginPath(); ctx.arc(bd.x, bd.y, bd.r, 0, Math.PI * 2); ctx.fill();
        if (!overMilk) {
          ctx.fillStyle = alpha(C.milk, 0.8);
          ctx.beginPath(); ctx.arc(bd.x - bd.r * 0.35, bd.y - bd.r * 0.35, bd.r * 0.3, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    function tick(t) {
      if (destroyed) return;
      if (!lastT) lastT = t;
      acc += Math.min(100, Math.max(0, t - lastT)); lastT = t;
      var n = 0;
      while (acc >= STEP && n < 4) { step(); acc -= STEP; n++; }
      if (n === 4) acc = 0; // after a long stall, carry on rather than fast-forward
      if (n) draw();
      raf = requestAnimationFrame(tick);
    }

    // touch the milk: dragging across the surface sloshes it; a tap lifts a heavy lobe
    var lastY = null;
    canvas.addEventListener('pointermove', function (e) {
      var r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, sy = surfY();
      if (level > 0.05 && Math.abs(x - G.cx) < innerHalf() && Math.abs(y - sy) < 40 * S && lastY != null) {
        push(x, clamp(y - lastY, -6, 6) * 0.06 * S, 10 * S);
      }
      lastY = y;
    });
    canvas.addEventListener('pointerleave', function () { lastY = null; });
    canvas.addEventListener('pointerdown', function (e) {
      var r = canvas.getBoundingClientRect(), x = e.clientX - r.left;
      if (state === 'rest' || (state === 'settle' && level < target)) { api.pour(); return; }
      if (level > 0.05 && Math.abs(x - G.cx) < innerHalf()) {
        push(x, 1.6 * S, 12 * S);
        if (blobs.length < 5) blobs.push({ x: x, y: surfAt(x) - 1 * S, vx: rand(-0.3, 0.3) * S, vy: -1.6 * S, r: 7 * S, g: 0.13 * S });
        if (reduceMotion()) draw();
      }
    });

    var ro = window.ResizeObserver ? new ResizeObserver(function () { layout(); if (reduceMotion()) draw(); }) : null;
    if (ro) ro.observe(el);

    var api = {
      pour: function () { level = 0; coldY = Infinity; slices = []; blobs = []; for (var i = 0; i < N; i++) { hgt[i] = 0; vel[i] = 0; } state = 'pour'; stateT = 0; ramp = 0; lastRamp = 0; chain++; },
      // move the running simulation into a new host element (after a re-render)
      attach: function (newEl) {
        clearTimeout(releaseTimer);
        if (!newEl || newEl === el) return;
        el = newEl; el.appendChild(canvas);
        if (ro) { ro.disconnect(); ro.observe(el); }
        readColors(); layout(); draw();
      },
      // the host is going away: keep running briefly in case it is re-created, then stop
      release: function () { clearTimeout(releaseTimer); releaseTimer = setTimeout(api.destroy, 4000); },
      destroy: function () {
        destroyed = true; clearTimeout(releaseTimer); cancelAnimationFrame(raf);
        if (ro) ro.disconnect(); canvas.remove();
        if (opts.key && LIVE[opts.key] === api) delete LIVE[opts.key];
      }
    };
    if (opts.key) LIVE[opts.key] = api;

    readColors(); layout();
    if (reduceMotion()) {
      level = target; state = 'settle'; coldY = surfY(); draw();
    } else {
      raf = requestAnimationFrame(tick);
    }
    return api;
  }

  /* ------------------------------------------------------------------ FillMeter */
  function FillMeter(el, opts) {
    opts = opts || {};
    var fmt = opts.format || function (v) { return Math.round(v * 100) + '%'; };
    var w = 72, h = 104, top = 6, bot = 100, wt = 64, wb = 50;
    var ns = 'http://www.w3.org/2000/svg';
    el.classList.add('iy-meter');
    el.innerHTML = '';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('aria-hidden', 'true');
    var shape = 'M' + (w - wt) / 2 + ' ' + top + ' L' + (w + wt) / 2 + ' ' + top + ' L' + (w + wb) / 2 + ' ' + (bot - 8) +
      ' Q' + (w + wb) / 2 + ' ' + bot + ' ' + ((w + wb) / 2 - 8) + ' ' + bot + ' L' + ((w - wb) / 2 + 8) + ' ' + bot +
      ' Q' + (w - wb) / 2 + ' ' + bot + ' ' + (w - wb) / 2 + ' ' + (bot - 8) + ' Z';
    var id = 'iyclip' + Math.random().toString(36).slice(2, 8);
    svg.innerHTML = '<defs><clipPath id="' + id + '"><path d="' + shape + '"/></clipPath></defs>' +
      '<path class="iy-meter-glass" d="' + shape + '"/>' +
      '<g clip-path="url(#' + id + ')"><path class="iy-meter-milk"/><rect class="iy-meter-shine" x="' + ((w - wt) / 2 + 6) + '" y="' + (top + 8) + '" width="5" height="' + (bot - top - 20) + '" rx="2.5"/></g>' +
      '<path class="iy-meter-rim" d="' + shape + '"/>';
    var milk = svg.querySelector('.iy-meter-milk');
    var text = document.createElement('div');
    var val = document.createElement('div'); val.className = 'iy-meter-value';
    var lab = document.createElement('div'); lab.className = 'iy-meter-label'; lab.textContent = opts.label || '';
    text.appendChild(val); text.appendChild(lab);
    el.appendChild(svg); el.appendChild(text);
    el.setAttribute('role', 'meter'); el.setAttribute('aria-valuemin', '0'); el.setAttribute('aria-valuemax', '1');
    if (opts.label) el.setAttribute('aria-label', opts.label);

    var goal = clamp(opts.value || 0, 0, 1), cur = reduceMotion() ? goal : 0, v = 0, amp = 6, t = 0, raf = 0, dead = false;
    function render() {
      var y = bot - cur * (bot - top - 4);
      var d = 'M-4 ' + y.toFixed(2);
      for (var x = -4; x <= w + 4; x += 4) {
        var yy = y + Math.sin(x * 0.14 + t * 0.09) * amp * 0.6 + Math.sin(x * 0.07 - t * 0.05) * amp * 0.4;
        d += ' L' + x + ' ' + yy.toFixed(2);
      }
      d += ' L' + (w + 4) + ' ' + (h + 4) + ' L-4 ' + (h + 4) + ' Z';
      milk.setAttribute('d', d);
      val.textContent = fmt(goal);
      el.setAttribute('aria-valuenow', String(goal));
      el.setAttribute('aria-valuetext', fmt(goal));
    }
    function tick() {
      if (dead) return;
      t++;
      v += (goal - cur) * 0.06; v *= 0.82; cur += v;
      amp = Math.max(1.2, amp * 0.985) + Math.abs(v) * 30;
      amp = Math.min(amp, 9);
      render();
      raf = requestAnimationFrame(tick);
    }
    render();
    if (!reduceMotion()) raf = requestAnimationFrame(tick);
    return {
      set: function (nv) { goal = clamp(nv, 0, 1); if (reduceMotion()) { cur = goal; render(); } else amp += 4; },
      destroy: function () { dead = true; cancelAnimationFrame(raf); el.innerHTML = ''; }
    };
  }

  /* ------------------------------------------------------------------ WaveSync */
  /* Every rolling wave (WaveDivider, product-card milk line) is a CSS loop. If its element is
     re-created, a plain CSS animation restarts from frame one and visibly jumps. Lock each one
     to the wall clock instead: a new element starts exactly where the old one was. */
  var WAVE_SEL = '.iy-wave svg, .iy-card-milk svg';
  var synced = typeof WeakSet !== 'undefined' ? new WeakSet() : null;
  function syncWave(svg) {
    if (synced && synced.has(svg)) return;
    var cs = getComputedStyle(svg), d = cs.animationDuration || '';
    if (!cs.animationName || cs.animationName === 'none') return;
    var sec = parseFloat(d) * (/ms$/.test(d) ? 0.001 : 1);
    if (!(sec > 0)) return;
    svg.style.animationDelay = (-((Date.now() / 1000) % sec)).toFixed(3) + 's';
    svg.style.willChange = 'transform';
    if (synced) synced.add(svg);
  }
  var syncQueued = false;
  function syncWaves() {
    if (syncQueued) return;
    syncQueued = true;
    (window.requestAnimationFrame || setTimeout)(function () {
      syncQueued = false;
      var list = document.querySelectorAll(WAVE_SEL);
      for (var i = 0; i < list.length; i++) syncWave(list[i]);
    });
  }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncWaves); else syncWaves();
    window.addEventListener('load', syncWaves);
    if (window.MutationObserver) new MutationObserver(syncWaves).observe(document.documentElement, { childList: true, subtree: true });
  }

  NS.MilkPour = MilkPour;
  NS.syncWaves = syncWaves;
  NS.FillMeter = FillMeter;
})();
