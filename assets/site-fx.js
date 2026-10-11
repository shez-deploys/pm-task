/* Shared motion and hover polish for every page. Loaded by site-nav.js.
   - Smooth scrolling for in-page links, offset for the sticky header
   - Sections fade up as they scroll into view
   - Spotlight glow that follows the pointer on cards
   - Press feedback on buttons, shadow on the header once scrolled
   - Back-to-top button
   Everything is switched off for people who prefer reduced motion.

   Opt in on any element:
     data-reveal       fade up when it enters the viewport
     data-spotlight    pointer-following glow on hover */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NAV_H = 72;

  var css = '' +
    'html{scroll-padding-top:' + NAV_H + 'px}' +
    (reduce ? '' : 'html{scroll-behavior:smooth}') +


    /* Header shadow once the page scrolls */
    '.site-nav{transition:box-shadow .25s,border-color .25s}' +
    '.site-nav.is-scrolled{box-shadow:0 8px 24px -12px rgba(0,0,0,.8);border-bottom-color:#2b2b2b}' +

    (reduce ? '' :
    /* Reveal on scroll */
    '.fx-reveal{opacity:0;transform:translateY(14px);transition:opacity .6s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.7,.2,1);transition-delay:var(--fx-delay,0ms)}' +
    '.fx-reveal.is-in{opacity:1;transform:none}' +

    /* Lift on hover for link cards */
    '.page,[data-lift]{transition:transform .25s cubic-bezier(.2,.7,.2,1),border-color .2s,background-color .2s,box-shadow .25s}' +
    '.page:hover,[data-lift]:hover{transform:translateY(-3px);box-shadow:0 14px 32px -18px rgba(255,255,255,.22)}' +

    /* Press feedback */
    'button,.btn,.pt-btn,.tab,.fchip,.chip,.page{-webkit-tap-highlight-color:transparent}' +
    'button:active:not(:disabled),.btn:active,.pt-btn:active,.tab:active,.fchip:active{transform:scale(.97)}' +
    '.chip{transition:transform .15s,box-shadow .15s,filter .15s}' +
    '.chip:hover{transform:translateY(-1px);box-shadow:0 6px 14px -8px rgba(255,255,255,.35);filter:brightness(1.12)}' +

    /* Table rows */
    'tr.row{transition:background-color .15s}') +

    /* Spotlight: a soft white glow under the pointer */
    '.fx-spot{background-image:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.06),transparent 60%)}' +

    /* Back to top */
    '.fx-top{position:fixed;right:20px;bottom:20px;z-index:25;width:44px;height:44px;border-radius:6px;border:1px solid #2b2b2b;background:rgba(22,22,22,.9);color:#f5f5f5;display:grid;place-items:center;cursor:pointer;opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .2s,transform .2s,background-color .15s,border-color .15s;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}' +
    '.fx-top.is-shown{opacity:1;pointer-events:auto;transform:none}' +
    '.fx-top:hover{background:#222;border-color:#5f5f5f;box-shadow:0 0 24px -8px rgba(255,255,255,.4)}' +
    '.fx-top:focus-visible{outline:2px solid #9acbea;outline-offset:2px}' +
    '@media print{.fx-top{display:none}}';

  document.head.insertAdjacentHTML("beforeend", "<style>" + css + "</style>");

  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }

  ready(function () {
    /* ---- Smooth in-page links that also move focus ---- */
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href").length < 2) return;
      var t = document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      if (!t.hasAttribute("tabindex")) t.setAttribute("tabindex", "-1");
      t.focus({ preventScroll: true });
      try { history.pushState(null, "", a.getAttribute("href")); } catch (err) {}
    });

    /* ---- Header shadow + back-to-top ---- */
    var nav = document.querySelector(".site-nav");
    var top = document.createElement("button");
    top.className = "fx-top"; top.type = "button"; top.setAttribute("aria-label", "Back to top");
    top.innerHTML = '<span class="ms" aria-hidden="true">arrow_upward</span>';
    top.onclick = function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); };
    document.body.appendChild(top);
    var ticking = false;
    function onScroll() {
      var y = window.scrollY || 0;
      if (nav) nav.classList.toggle("is-scrolled", y > 4);
      top.classList.toggle("is-shown", y > 600);
      ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    /* ---- Spotlight on cards ---- */
    var SPOT = ".page,.card,.site-card,[data-spotlight]";
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest(SPOT);
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
      el.classList.add("fx-spot");
    }, { passive: true });
    document.addEventListener("pointerout", function (e) {
      var el = e.target.closest && e.target.closest(SPOT);
      if (el && !el.contains(e.relatedTarget)) el.classList.remove("fx-spot");
    });

    /* ---- Reveal on scroll ---- */
    if (reduce || !("IntersectionObserver" in window)) return;
    var targets = document.querySelectorAll(
      "[data-reveal], main > section, .wrap > .tabs, .card, .section-h, .table-scroll"
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    Array.prototype.forEach.call(targets, function (el) {
      if (el.closest(".drawer, .pt-drawer, [role=dialog]")) return;
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
            el.classList.add("fx-reveal");
      io.observe(el);
    });
  });
})();
