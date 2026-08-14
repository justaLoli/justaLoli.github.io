/* Clamp hexo-reference tooltips (hint.css) inside the viewport.
 *
 * hint.css centers each tooltip (a ::after pseudo-element) on its note span.
 * When the note sits near the left/right edge, the centered tooltip spills
 * out of the viewport. On hover we measure both, then shift the tooltip via
 * the --hint-shift-x custom property so it stays fully visible, keeping the
 * note-centered alignment whenever there is room. If the note is too close
 * to the top edge, the tooltip flips below the note instead.
 */
(function () {
  'use strict';

  var MARGIN = 10;         // minimum gap from the viewport edges (px)
  var MIN_TOP_SPACE = 180; // flip below when less than this (px) is available above

  function clamp(el) {
    var rect = el.getBoundingClientRect();
    var pseudo = window.getComputedStyle(el, '::after');
    // .width is the content box (150px); the rendered tooltip box also has
    // 10px padding on each side, so use the border-box width for clamping.
    var width =
      parseFloat(pseudo.width) +
      parseFloat(pseudo.paddingLeft) +
      parseFloat(pseudo.paddingRight) ||
      170;

    // Keep the tooltip's horizontal center inside the viewport.
    var center = rect.left + rect.width / 2;
    var min = MARGIN + width / 2;
    var max = window.innerWidth - MARGIN - width / 2;
    var target = Math.min(Math.max(center, min), max);
    el.style.setProperty('--hint-shift-x', (target - center) + 'px');

    // Flip below the note when there is not enough room above it.
    el.classList.toggle('hint--bottom', rect.top < MIN_TOP_SPACE);
    el.classList.toggle('hint--top', rect.top >= MIN_TOP_SPACE);
  }

  document.addEventListener('mouseover', function (event) {
    var node = event.target;
    while (node && node.nodeType === 1) {
      if (node.matches && node.matches('[class*="hint--"]')) {
        clamp(node);
        return;
      }
      node = node.parentNode;
    }
  });
})();
