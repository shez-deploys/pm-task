/* Shared site header for every page.
   To add a page: add one entry to PAGES below, then include this script
   straight after <body> on the new page:
     <script src="assets/site-nav.js"></script>        (page at the root)
     <script src="../assets/site-nav.js"></script>     (page in a subfolder)
   The home page (index.html) builds its page list from PAGES too. */
(function () {
  var PAGES = [
    { href: "index.html",            label: "Overview",        desc: "What's here and how it fits together." },
    { href: "matrix.html",           label: "Impact / Effort", desc: "25 feature ideas on an impact/effort matrix, with filters, feature details and the full backlog." },
    { href: "design-system/",        label: "Design system",   desc: "Proton Dark tokens and components used for the mockups." }
  ];

  var script = document.currentScript;
  var root = script.src.replace(/assets\/site-nav\.js(\?.*)?$/, "");
  var here = location.href.split("#")[0].split("?")[0].replace(/index\.html$/, "");

  var css = '' +
    '.site-nav{position:sticky;top:env(safe-area-inset-top,0px);z-index:30;background:rgba(14,13,18,.86);' +
      '-webkit-backdrop-filter:saturate(140%) blur(10px);backdrop-filter:saturate(140%) blur(10px);border-bottom:1px solid #24242d;' +
      'font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased}' +
    '.site-nav__in{max-width:1240px;margin:0 auto;padding:0 24px;height:56px;display:flex;align-items:center;gap:20px}' +
    '.site-nav__brand{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-weight:700;font-size:14px;white-space:nowrap;flex:none}' +
    '.site-nav__brand span{color:#a7a4b5;font-weight:500}' +
    '.site-nav__logo{width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,#8a6bff,#5b3cf0);display:grid;place-items:center;font-size:12px;font-weight:700;color:#fff}' +
    '.site-nav__links{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;margin-left:auto;min-width:0}' +
    '.site-nav__links::-webkit-scrollbar{display:none}' +
    '.site-nav__links a{display:inline-flex;align-items:center;height:34px;padding:0 12px;border-radius:8px;color:#a7a4b5;text-decoration:none;font-size:13px;font-weight:500;white-space:nowrap;transition:background .15s,color .15s}' +
    '.site-nav__links a:hover{background:#292732;color:#fff}' +
    '.site-nav__links a[aria-current="page"]{background:rgba(109,74,255,.16);color:#fff}' +
    '.site-nav a:focus-visible{outline:2px solid #947ff7;outline-offset:2px}' +
    '@media (max-width:640px){.site-nav__in{padding:0 16px;gap:12px}.site-nav__brand span{display:none}}';

  var links = PAGES.map(function (p) {
    var url = root + p.href;
    var cur = url.replace(/index\.html$/, "") === here ? ' aria-current="page"' : "";
    return '<a href="' + url + '"' + cur + '>' + p.label + '</a>';
  }).join("");

  document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");
  document.body.insertAdjacentHTML("afterbegin",
    '<header class="site-nav"><div class="site-nav__in">' +
      '<a class="site-nav__brand" href="' + root + 'index.html"><span class="site-nav__logo" aria-hidden="true">P</span>Proton Contacts <span>· PM task</span></a>' +
      '<nav class="site-nav__links" aria-label="Pages">' + links + '</nav>' +
    '</div></header>');

  window.SITE_PAGES = PAGES.map(function (p) { return { href: root + p.href, label: p.label, desc: p.desc }; });
})();
