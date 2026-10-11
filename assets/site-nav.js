/* Shared site header for every page.
   To add a page: add one entry to PAGES below, then include this script
   straight after <body> on the new page:
     <script src="assets/site-nav.js"></script>        (page at the root)
     <script src="../assets/site-nav.js"></script>     (page in a subfolder)
   A group ({ label, children: [...] }) has no page of its own; it shows as a
   dropdown. The home page (index.html) builds its page list from PAGES too. */
(function () {
  var PAGES = [
    { href: "index.html",     label: "Overview",        icon: "home",      desc: "What's here and how it fits together." },
    { href: "matrix.html",    label: "Impact / Effort", icon: "grid_view", desc: "27 feature ideas on an impact/effort matrix, with filters, feature details and the full backlog." },
    { label: "Mockups", icon: "devices", children: [
      { href: "mockups/", label: "Overview", icon: "dashboard", desc: "Both MVP features, Trusted Contacts and Protection, with screenshots of every view." },
      { href: "mockups/contacts-list.html", label: "Contacts list", icon: "contacts", desc: "All contacts with hover summaries, suggested contacts with confidence scores, groups and colleagues." },
      { href: "mockups/contacts.html", label: "Contact view", icon: "contact_page", desc: "A contact opens full screen with history, trust signals and impersonation warnings." },
      { href: "mockups/protection.html", label: "Protection", icon: "shield_person", desc: "An impersonation attempt in the inbox, and a misdirected email caught before sending." }
    ]},
    { href: "design-system/", label: "Design system",   icon: "palette",   desc: "Proton Dark tokens, components and Material Symbols icons used for the mockups." }
  ];

  var script = document.currentScript;
  var root = script.src.replace(/assets\/site-nav\.js(\?.*)?$/, "");
  var here = location.href.split("#")[0].split("?")[0].replace(/index\.html$/, "");
  var isHere = function (href) { return (root + href).replace(/index\.html$/, "") === here; };

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
    '.site-nav__links>a,.site-nav__group{display:inline-flex;align-items:center;gap:4px;height:34px;padding:0 12px;border-radius:8px;border:0;background:none;color:#a7a4b5;text-decoration:none;font:500 13px/1 inherit;font-family:inherit;white-space:nowrap;cursor:pointer;transition:background .15s,color .15s}' +
    '.site-nav__links>a:hover,.site-nav__group:hover,.site-nav__group[aria-expanded="true"]{background:#292732;color:#fff}' +
    '.site-nav__links>a[aria-current="page"],.site-nav__group.is-current{background:rgba(109,74,255,.16);color:#fff}' +
    '.site-nav__group .ms{font-size:18px;transition:transform .2s}' +
    '.site-nav__group[aria-expanded="true"] .ms{transform:rotate(180deg)}' +
    '.site-nav__menu{position:fixed;z-index:40;min-width:240px;padding:6px;border-radius:12px;background:#16141b;border:1px solid #3f3d4d;box-shadow:0 18px 40px -16px rgba(0,0,0,.8);opacity:0;transform:translateY(-4px);pointer-events:none;transition:opacity .15s,transform .15s;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}' +
    '.site-nav__menu.is-open{opacity:1;transform:none;pointer-events:auto}' +
    '.site-nav__menu a{display:flex;gap:10px;align-items:flex-start;padding:10px;border-radius:8px;color:#fff;text-decoration:none;font-size:13px;font-weight:600}' +
    '.site-nav__menu a small{display:block;color:#a7a4b5;font-weight:400;font-size:12px;margin-top:2px;line-height:1.4;max-width:30ch}' +
    '.site-nav__menu a .ms{color:#947ff7;margin-top:1px}' +
    '.site-nav__menu a:hover,.site-nav__menu a[aria-current="page"]{background:#292732}' +
    '.site-nav a:focus-visible,.site-nav__group:focus-visible{outline:2px solid #947ff7;outline-offset:2px}' +
    '.ms{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:20px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;direction:ltr;overflow:hidden;-webkit-font-smoothing:antialiased;font-variation-settings:"FILL" 0,"wght" 400,"GRAD" 0,"opsz" 20;vertical-align:middle;user-select:none}' +
    '@media (max-width:640px){.site-nav__in{padding:0 16px;gap:12px}.site-nav__brand span{display:none}}';

  var menus = "";
  var links = PAGES.map(function (p, i) {
    if (p.children) {
      var cur = p.children.some(function (c) { return isHere(c.href); });
      menus += '<div class="site-nav__menu" id="site-nav-menu-' + i + '" role="menu">' + p.children.map(function (c) {
        return '<a role="menuitem" href="' + root + c.href + '"' + (isHere(c.href) ? ' aria-current="page"' : "") + '><span class="ms" aria-hidden="true">' + (c.icon || "arrow_forward") + '</span><span>' + c.label + '<small>' + c.desc + '</small></span></a>';
      }).join("") + '</div>';
      return '<button type="button" class="site-nav__group' + (cur ? " is-current" : "") + '" aria-haspopup="true" aria-expanded="false" aria-controls="site-nav-menu-' + i + '">' + p.label + '<span class="ms" aria-hidden="true">expand_more</span></button>';
    }
    return '<a href="' + root + p.href + '"' + (isHere(p.href) ? ' aria-current="page"' : "") + '>' + p.label + '</a>';
  }).join("");

  /* Material Symbols (icon font) and the shared motion script load on every page. */
  if (!document.querySelector('link[href*="Material+Symbols"]')) {
    document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..600,0..1,-25..0&display=block">');
  }
  var fx = document.createElement("script"); fx.src = root + "assets/site-fx.js"; fx.defer = true; document.head.appendChild(fx);

  document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");
  document.body.insertAdjacentHTML("afterbegin",
    '<header class="site-nav"><div class="site-nav__in">' +
      '<a class="site-nav__brand" href="' + root + 'index.html"><span class="site-nav__logo" aria-hidden="true">P</span>Proton Contacts <span>· PM task</span></a>' +
      '<nav class="site-nav__links" aria-label="Pages">' + links + '</nav>' +
    '</div></header>' + menus);

  /* Dropdowns: open on click or hover, close on outside click, Escape or scroll. */
  var open = null, hoverTimer = null;
  function place(btn, menu) {
    var r = btn.getBoundingClientRect();
    menu.style.top = (r.bottom + 6) + "px";
    menu.style.left = Math.max(8, Math.min(r.left, window.innerWidth - menu.offsetWidth - 8)) + "px";
  }
  function show(btn) {
    if (open && open !== btn) hide(open);
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    place(btn, menu); menu.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); open = btn;
  }
  function hide(btn) {
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    menu.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); if (open === btn) open = null;
  }
  Array.prototype.forEach.call(document.querySelectorAll(".site-nav__group"), function (btn) {
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () { open === btn ? hide(btn) : show(btn); });
    [btn, menu].forEach(function (el) {
      el.addEventListener("mouseenter", function () { clearTimeout(hoverTimer); if (window.matchMedia("(hover:hover)").matches) show(btn); });
      el.addEventListener("mouseleave", function () { hoverTimer = setTimeout(function () { hide(btn); }, 180); });
    });
  });
  document.addEventListener("click", function (e) { if (open && !e.target.closest(".site-nav__group,.site-nav__menu")) hide(open); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) { var b = open; hide(b); b.focus(); } });
  window.addEventListener("scroll", function () { if (open) hide(open); }, { passive: true });
  window.addEventListener("resize", function () { if (open) hide(open); });

  /* Flat list for the home page cards (groups contribute their children). */
  var flat = [];
  PAGES.forEach(function (p) { (p.children || [p]).forEach(function (c) { flat.push({ href: root + c.href, label: c.label, desc: c.desc, icon: c.icon, group: p.children ? p.label : "" }); }); });
  window.SITE_PAGES = flat;
})();
