<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script><script class="meting-secondary-script-marker" src="/assets/js/Meting.min.js"></script><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/hint.css/2.4.1/hint.min.css">(function () {
  var newMathJax = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js';
  var oldMathJax = 'cdn.mathjax.org/mathjax/latest/MathJax.js';

  var replaceScript = function (script, src) {
    //
    //  Make redirected script
    //
    var newScript = document.createElement('script');
    newScript.src = newMathJax + src.replace(/.*?(\?|$)/, '$1');
    //
    //  Move onload and onerror handlers to new script
    //
    newScript.onload = script.onload; 
    newScript.onerror = script.onerror;
    script.onload = script.onerror = null;
    //
    //  Move any content (old-style configuration scripts)
    //
    while (script.firstChild) newScript.appendChild(script.firstChild);
    //
    //  Copy script id
    //
    if (script.id != null) newScript.id = script.id;
    //
    //  Replace original script with new one
    //
    script.parentNode.replaceChild(newScript, script);
    //
    //  Issue a console warning
    //
    console.warn('WARNING: cdn.mathjax.org has been retired. Check https://www.mathjax.org/cdn-shutting-down/ for migration tips.')
  }

  if (document.currentScript) {
    var script = document.currentScript;
    replaceScript(script, script.src);
  } else {
    //
    // Look for current script by searching for one with the right source
    //
    var n = oldMathJax.length;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i];
      var src = (script.src || '').replace(/.*?:\/\//,'');
      if (src.substr(0, n) === oldMathJax) {
        replaceScript(script, src);
        break;
      }
    }
  }
})();
MathJax.Hub.Config({
  config: ["MMLorHTML.js"],
  jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML", "output/PreviewHTML"],
  extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js", "fast-preview.js", "AssistiveMML.js", "a11y/accessibility-menu.js"],
  TeX: {
    extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"],
    equationNumbers: { autoNumber: "AMS" }
  }
});

// <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>