/* Shared site header for every page (DS Dark style).
   To add a page: add one entry to PAGES below, then include this script
   straight after <body> on the new page:
     <script src="assets/site-nav.js"></script>        (page at the root)
     <script src="../assets/site-nav.js"></script>     (page in a subfolder)
   A group ({ label, children: [...] }) has no page of its own; it shows as a
   dropdown. Inside a group, { section: "Name" } starts a labelled block.
   Also adds the Clear cache button (reloads every file from the server). */
(function () {
  var PAGES = [
    { href: "index.html",     label: "Overview",        icon: "home",      desc: "What's here and how it fits together." },
    { href: "matrix.html",    label: "Impact / Effort", icon: "grid_view", section: "Prioritisation", desc: "Feature ideas on an impact/effort matrix, with filters and a brief for each feature." },
    { href: "backlog.html",   label: "Backlog",         icon: "table_rows", section: "Prioritisation", desc: "All 27 feature ideas in one sortable table." },
    { label: "Mockups", icon: "devices", children: [
      { href: "mockups/", label: "All mockups", icon: "dashboard", desc: "Both MVP features with screenshots of every view." },
      { section: "Trusted Contacts" },
      { href: "mockups/contacts-list.html", label: "Overview", icon: "contacts", desc: "The contacts list: hover summaries, suggested contacts with confidence scores, groups and colleagues." },
      { href: "mockups/contacts.html", label: "Contact card", icon: "contact_page", desc: "A contact opens full screen with history, trust signals and connections." },
      { section: "Protection" },
      { href: "mockups/protection.html#imp", label: "Impersonation", icon: "gpp_maybe", def: true, desc: "Inbound: a look-alike sender asks to change bank details." },
      { href: "mockups/protection.html#mis", label: "Misdirection", icon: "alt_route", desc: "Outbound: an email about to go to the wrong Camille." }
    ]},
    { label: "Appendix", icon: "menu_book", children: [
      { href: "appendix/sources.html", label: "Sources", icon: "link", desc: "Research behind the write-up, the feature ideas and the mockups." },
      { href: "appendix/context.html", label: "Context", icon: "article", desc: "Background and detail cut from the main document." }
    ]}
    /* The design system page (design-system/) still exists, it just isn't in the nav. */
  ];

  var script = document.currentScript;
  var root = script.src.replace(/assets\/site-nav\.js(\?.*)?$/, "");
  var norm = function (u) { return u.split("#")[0].split("?")[0].replace(/index\.html$/, ""); };
  var here = norm(location.href);
  /* Same page; for links with a hash (two scenarios on one page) the hash must match too. */
  function isHere(p) {
    if (norm(root + p.href) !== here) return false;
    var h = (p.href.split("#")[1] || "");
    if (!h) return true;
    return location.hash ? location.hash.slice(1) === h : !!p.def;
  }

  /* DS Dark styles, in case the page didn't link them */
  if (!document.querySelector('link[href*="ds/ds.css"]')) document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="' + root + 'assets/ds/ds.css">');
  if (!document.querySelector('link[href*="assets/site.css"]')) document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="' + root + 'assets/site.css">');

  var css = '' +
    '.site-nav{position:sticky;top:env(safe-area-inset-top,0px);z-index:30;background:#0a0a0ad9;-webkit-backdrop-filter:saturate(140%) blur(12px);backdrop-filter:saturate(140%) blur(12px);border-bottom:1px solid #2b2b2b}' +
    '.site-nav__in{width:min(1400px,100%);margin:0 auto;padding:0 clamp(16px,4vw,40px);height:60px;display:flex;align-items:center;gap:20px}' +
    '.site-nav__brand{display:flex;align-items:center;gap:8px;color:#f5f5f5;text-decoration:none;font-weight:700;font-size:12px;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;flex:none;padding:6px 0}' +
    '.site-nav__brand span{color:#929292;font-weight:600}' +
    '.site-nav__links{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;margin-left:auto;min-width:0}' +
    '.site-nav__links::-webkit-scrollbar{display:none}' +
    '.site-nav__links>a,.site-nav__group{display:inline-flex;align-items:center;gap:4px;height:36px;padding:0 12px;border-radius:6px;border:0;background:none;color:#b3b3b3;text-decoration:none;font:500 13px/1 inherit;font-family:inherit;white-space:nowrap;cursor:pointer;transition:background-color .14s,color .14s,box-shadow .2s}' +
    '.site-nav__links>a:hover,.site-nav__group:hover,.site-nav__group[aria-expanded="true"]{background:#222;color:#f5f5f5}' +
    '.site-nav__links>a[aria-current="page"],.site-nav__group.is-current{background:#2b2b2b;color:#f5f5f5}' +
    '.site-nav__group .ms{font-size:18px;transition:transform .2s}' +
    '.site-nav__group[aria-expanded="true"] .ms{transform:rotate(180deg)}' +
    '.site-nav__clear{flex:none;display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:6px;border:1px solid #2b2b2b;background:#161616;color:#f5f5f5;font:500 12.5px/1 inherit;font-family:inherit;cursor:pointer;white-space:nowrap;transition:background-color .14s,border-color .14s,box-shadow .2s}' +
    '.site-nav__clear:hover{background:#222;border-color:#5f5f5f;box-shadow:0 0 0 1px #ffffff12,0 0 22px -8px #ffffff66}' +
    '.site-nav__clear .ms{font-size:17px}' +
    '.site-nav__clear.is-busy{opacity:.7;cursor:progress}' +
    '.site-nav__clear.is-busy .ms{animation:site-spin .8s linear infinite}' +
    '@keyframes site-spin{to{transform:rotate(360deg)}}' +
    '.site-nav__menu{position:fixed;z-index:40;min-width:280px;padding:6px;border-radius:12px;background:#161616;border:1px solid #2b2b2b;box-shadow:0 16px 48px #0008;opacity:0;transform:translateY(-4px);pointer-events:none;transition:opacity .15s,transform .15s;color:#f5f5f5}' +
    '.site-nav__menu.is-open{opacity:1;transform:none;pointer-events:auto}' +
    '.site-nav__sec{display:block;padding:12px 10px 4px;font-size:10.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#929292}' +
    '.site-nav__menu a{display:flex;gap:10px;align-items:flex-start;padding:9px 10px;border-radius:6px;color:#f5f5f5;text-decoration:none;font-size:13px;font-weight:600}' +
    '.site-nav__menu a small{display:block;color:#b3b3b3;font-weight:400;font-size:12px;margin-top:2px;line-height:1.4;max-width:32ch}' +
    '.site-nav__menu a .ms{color:#b3b3b3;margin-top:1px}' +
    '.site-nav__menu a:hover{background:#222}' +
    '.site-nav__menu a[aria-current="page"]{background:#2b2b2b}' +
    '.site-nav__menu a[aria-current="page"] .ms,.site-nav__menu a:hover .ms{color:#f5f5f5}' +
    '.site-nav a:focus-visible,.site-nav button:focus-visible,.site-nav__menu a:focus-visible{outline:2px solid #9acbea;outline-offset:2px}' +
    '.ms{font-family:"Material Symbols Rounded";font-weight:normal;font-style:normal;font-size:20px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;direction:ltr;overflow:hidden;-webkit-font-smoothing:antialiased;font-variation-settings:"FILL" 0,"wght" 400,"GRAD" 0,"opsz" 20;vertical-align:middle;user-select:none}' +
    '@media (max-width:760px){.site-nav__in{gap:10px}.site-nav__brand span{display:none}.site-nav__clear b{display:none}.site-nav__clear{padding:0 9px}}';

  var menus = "";
  var links = PAGES.map(function (p, i) {
    if (p.children) {
      var cur = p.children.some(function (c) { return c.href && norm(root + c.href) === here; });
      menus += '<div class="site-nav__menu ds-system" id="site-nav-menu-' + i + '" role="menu" aria-label="' + p.label + '">' + p.children.map(function (c) {
        if (c.section) return '<span class="site-nav__sec" role="presentation">' + c.section + '</span>';
        return '<a role="menuitem" href="' + root + c.href + '" data-nav-href="' + c.href + '"><span class="ms" aria-hidden="true">' + (c.icon || "arrow_forward") + '</span><span>' + c.label + '<small>' + c.desc + '</small></span></a>';
      }).join("") + '</div>';
      return '<button type="button" class="site-nav__group' + (cur ? " is-current" : "") + '" aria-haspopup="true" aria-expanded="false" aria-controls="site-nav-menu-' + i + '">' + p.label + '<span class="ms" aria-hidden="true">expand_more</span></button>';
    }
    return '<a href="' + root + p.href + '" data-nav-href="' + p.href + '">' + p.label + '</a>';
  }).join("");

  /* Material Symbols (icon font) and the shared motion script load on every page. */
  if (!document.querySelector('link[href*="Material+Symbols"]')) {
    document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..600,0..1,-25..0&display=block">');
  }
  var fx = document.createElement("script"); fx.src = root + "assets/site-fx.js"; fx.defer = true; document.head.appendChild(fx);

  document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");
  document.body.insertAdjacentHTML("afterbegin",
    '<header class="site-nav ds-system"><div class="site-nav__in">' +
      '<a class="site-nav__brand" href="' + root + 'index.html">Proton Contacts <span>/ PM task</span></a>' +
      '<nav class="site-nav__links" aria-label="Pages">' + links + '</nav>' +
      '<button type="button" class="site-nav__clear" id="site-clear" title="Reload every file from the server and reset saved filters"><span class="ms" aria-hidden="true">refresh</span><b>Clear cache</b></button>' +
    '</div></header>' + menus);

  /* Current page markers (re-run when the hash changes, e.g. Impersonation ↔ Misdirection) */
  function markCurrent() {
    var flatAll = [];
    PAGES.forEach(function (p) { (p.children || [p]).forEach(function (c) { if (c.href) flatAll.push(c); }); });
    Array.prototype.forEach.call(document.querySelectorAll("[data-nav-href]"), function (a) {
      var p = flatAll.filter(function (c) { return c.href === a.getAttribute("data-nav-href"); })[0];
      if (p && isHere(p)) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  markCurrent();
  window.addEventListener("hashchange", markCurrent);

  /* Dropdowns: open on click or hover, close on outside click, Escape or scroll. */
  var open = null, hoverTimer = null, hoverOpened = false;
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
    /* A click right after hover-open keeps the menu open; the next click closes it. */
    btn.addEventListener("click", function () { if (open === btn && !hoverOpened) hide(btn); else show(btn); hoverOpened = false; });
    [btn, menu].forEach(function (el) {
      el.addEventListener("mouseenter", function () { clearTimeout(hoverTimer); if (window.matchMedia("(hover:hover)").matches && open !== btn) { show(btn); hoverOpened = true; } });
      el.addEventListener("mouseleave", function () { hoverTimer = setTimeout(function () { hide(btn); }, 180); });
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) hide(btn); });
  });
  document.addEventListener("click", function (e) { if (open && !e.target.closest(".site-nav__group,.site-nav__menu")) hide(open); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) { var b = open; hide(b); b.focus(); } });
  window.addEventListener("scroll", function () { if (open) hide(open); }, { passive: true });
  window.addEventListener("resize", function () { if (open) hide(open); });

  /* Flat list of pages (groups contribute their children; sections become a field). */
  var flat = [];
  PAGES.forEach(function (p) {
    var sec = p.section || "";
    (p.children || [p]).forEach(function (c) {
      if (c.section && !c.href) { sec = c.section; return; }
      flat.push({ href: root + c.href, label: c.label, desc: c.desc, icon: c.icon, group: p.children ? p.label : "", section: c.section || sec });
    });
  });
  window.SITE_PAGES = flat;

  /* ---- Clear cache: re-download every file from the server, then reload ----
     fetch(..., {cache: "reload"}) skips the browser cache and stores the fresh copy,
     so the reload picks up new versions straight away (GitHub Pages caches for 10 minutes). */
  var ASSETS = ["", "index.html", "matrix.html", "backlog.html", "assets/prioritisation.css", "assets/prioritisation.js", "appendix/img/prioritisation-inputs.png", "appendix/img/wireframe-contact-card.png", "mockups/", "mockups/index.html", "mockups/contacts-list.html", "mockups/contacts.html", "mockups/protection.html",
    "appendix/sources.html", "appendix/context.html", "design-system/", "design-system/index.html", "design-system/proton-dark.css", "assets/site-nav.js", "assets/site-fx.js", "assets/site.css", "assets/ds/ds.css",
    "data/features.js", "data/contacts.js", "mockups/mockup.css", "mockups/mockup.js"];
  document.getElementById("site-clear").addEventListener("click", function () {
    var btn = this; if (btn.classList.contains("is-busy")) return;
    btn.classList.add("is-busy"); btn.querySelector("b").textContent = "Clearing…";
    var urls = {};
    urls[location.href.split("#")[0]] = 1;
    ASSETS.forEach(function (a) { urls[root + a] = 1; });
    try { (performance.getEntriesByType("resource") || []).forEach(function (e) { if (e.name.indexOf(location.origin) === 0) urls[e.name.split("#")[0]] = 1; }); } catch (e) {}
    var jobs = Object.keys(urls).map(function (u) { return fetch(u, { cache: "reload", credentials: "same-origin" }).catch(function () {}); });
    if (window.caches && caches.keys) jobs.push(caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); }).catch(function () {}));
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) jobs.push(navigator.serviceWorker.getRegistrations().then(function (rs) { return Promise.all(rs.map(function (r) { return r.unregister(); })); }).catch(function () {}));
    try { localStorage.clear(); } catch (e) {}
    try { sessionStorage.clear(); } catch (e) {}
    var done = false, finish = function () { if (done) return; done = true; location.reload(); };
    Promise.all(jobs).then(finish, finish);
    setTimeout(finish, 5000);
  });
})();
