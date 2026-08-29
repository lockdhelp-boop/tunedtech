/* Cursor backlight.
   A soft light that trails the pointer, matching the section glows. Kept in
   one file rather than inlined on seven pages.

   Notes on the approach:
   - mix-blend-mode: screen means the layer only ever adds light, so text
     underneath keeps its colour instead of being tinted.
   - The position is eased toward the pointer each frame rather than snapped,
     which reads as a light with weight rather than a sticker.
   - Mouse only. On touch there is no pointer to follow, and the effect is
     dropped entirely for anyone who asked for reduced motion. */
(function () {
  'use strict';

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || still.matches) return;

  var host = document.createElement('div');
  host.className = 'cursor-glow-host';
  var glow = document.createElement('div');
  glow.className = 'cursor-glow';
  host.appendChild(glow);
  document.body.appendChild(host);

  var tx = 0, ty = 0, cx = 0, cy = 0, frame = null, seen = false;

  function tick() {
    cx += (tx - cx) * 0.13;
    cy += (ty - cy) * 0.13;
    glow.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
    // Stop the loop once it has settled, so an idle cursor costs nothing.
    frame = (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4)
      ? requestAnimationFrame(tick)
      : null;
  }

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    tx = e.clientX;
    ty = e.clientY;
    if (!seen) {                       // first move: appear where the cursor is
      seen = true;
      cx = tx; cy = ty;
      glow.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      host.setAttribute('data-on', 'true');
    }
    if (!frame) frame = requestAnimationFrame(tick);
  }, { passive: true });

  /* rAF is suspended while the tab is hidden, so a movement interrupted by a
     tab switch would leave the light stranded mid-travel. On return, close the
     gap immediately rather than easing from a stale position. */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible' || !seen) return;
    cx = tx; cy = ty;
    glow.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
  });

  document.addEventListener('mouseleave', function () { host.removeAttribute('data-on'); });
  document.addEventListener('mouseenter', function () { if (seen) host.setAttribute('data-on', 'true'); });
})();
