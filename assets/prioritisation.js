/* Impact / Effort (matrix.html) and Backlog (backlog.html).
   Loaded after data/features.js. Renders the matrix and/or the backlog table if the page has them,
   and the shared feature drawer. Filter and sort choices are remembered in localStorage. */
const F = window.FEATURES;

const PRIOS = ["MVP","NEXT","LATER","VISION","PARITY","EXISTING"];
const QUADS = [
  {key:"QW",name:"QUICK WIN",desc:"High impact · low effort"},
  {key:"BB",name:"BIG BETS",desc:"High impact · high effort"},
  {key:"IN",name:"INCREMENTAL",desc:"Low impact · low effort"},
  {key:"MP",name:"MONEY PIT",desc:"Low impact · high effort"}
];
const quad = f => f.i >= 6 ? (f.e <= 5 ? "QW" : "BB") : (f.e <= 5 ? "IN" : "MP");
const qName = k => QUADS.find(q => q.key === k).name;
const cellRef = f => String.fromCharCode(64 + f.e + 2) + (11 - f.i);
F.forEach(f => { f.q = quad(f); f.cell = cellRef(f); });
const byId = Object.fromEntries(F.map(f => [f.id, f]));
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pill = p => `<span class="pill p-${p}">${p}</span>`;
const qpill = k => `<span class="qpill q-${k}">${qName(k)}</span>`;
const pips = n => `<span class="pips" aria-label="${n} of 5">${[1,2,3,4,5].map(x => `<i class="${x<=n?"on":""}"></i>`).join("")}</span>`;

let store = {}; try { store = JSON.parse(localStorage.getItem("cim-state-v2") || "{}"); } catch (e) {}
const save = () => { try { localStorage.setItem("cim-state-v2", JSON.stringify(state)); } catch (e) {} };
const state = {
  mPrio: new Set(store.mPrio || ["MVP","NEXT"]),
  bPrio: new Set(store.bPrio || PRIOS),
  sort: store.sort || {key:"id", dir:1},
  open: null, list: []
};
const toJSON = () => ({mPrio:[...state.mPrio], bPrio:[...state.bPrio], sort: state.sort});
const persist = () => { try { localStorage.setItem("cim-state-v2", JSON.stringify(toJSON())); } catch (e) {} };

/* ---------- Filters ---------- */
function renderFilters(el, set, onChange) {
  el.innerHTML = PRIOS.map(p => {
    const n = F.filter(f => f.prio === p).length;
    return `<button class="fchip" data-p="${p}" aria-pressed="${set.has(p)}"><span class="sw p-${p}"></span>${p}<span class="n">${n}</span></button>`;
  }).join("");
  el.onclick = e => {
    const b = e.target.closest(".fchip"); if (!b) return;
    const p = b.dataset.p; set.has(p) ? set.delete(p) : set.add(p);
    b.setAttribute("aria-pressed", set.has(p)); persist(); onChange();
  };
}

/* ---------- Matrix ---------- */
const matrixEl = document.getElementById("matrix");
function renderMatrix() {
  const shown = F.filter(f => state.mPrio.has(f.prio));
  let h = "";
  QUADS.forEach(q => {
    const n = shown.filter(f => f.q === q.key).length;
    h += `<div class="zone z-${q.key.toLowerCase()}"><div class="zl">${q.name} · ${n}<small>${q.desc}</small></div></div>`;
  });
  h += `<div class="divider-v"></div><div class="divider-h"></div>`;
  for (let impact = 10; impact >= 1; impact--) {
    const r = 11 - impact;
    h += `<div class="ax ax-y" style="grid-row:${r}">${impact}</div>`;
    for (let effort = 1; effort <= 10; effort++) {
      const items = shown.filter(f => f.i === impact && f.e === effort)
        .sort((a, b) => ((b.nudge?.di || 0) - (a.nudge?.di || 0)) || a.id - b.id);
      const chips = items.map(f => {
        const de = items.length > 1 ? (f.nudge?.de || 0) : 0;
        const al = de < -.1 ? "al-start" : de > .1 ? "al-end" : "al-center";
        return `<button class="chip p-${f.prio} ${al}" data-id="${f.id}" title="F${f.id}: ${esc(f.title)}" ${state.open === f.id ? 'aria-current="true"' : ""}>${esc(f.short)}</button>`;
      }).join("");
      h += `<div class="cell${items.length > 1 ? " multi" : ""}" style="grid-row:${r};grid-column:${effort + 1}">${chips}</div>`;
    }
  }
  h += `<div class="ax" style="grid-row:11;grid-column:1"></div>`;
  for (let effort = 1; effort <= 10; effort++) h += `<div class="ax ax-x" style="grid-column:${effort + 1}">${effort}</div>`;
  matrixEl.innerHTML = h;
  document.getElementById("qstats").innerHTML = QUADS.map(function (q) {
    var items = shown.filter(function (f) { return f.q === q.key; }).sort(function (a, b) { return b.i - a.i || a.e - b.e; });
    return '<div class="qs q-' + q.key + '"><div class="k">' + q.name + '</div><div class="v">' + items.length + '</div><div class="d">' + q.desc + '</div><div class="t">' + (items[0] ? '<span>Top:</span> ' + esc(items[0].short) : '<span>Nothing in this quadrant</span>') + '</div></div>';
  }).join("");
  renderMatrixTable(shown);
}
if (matrixEl) matrixEl.onclick = e => { const c = e.target.closest(".chip"); if (c) openDrawer(+c.dataset.id, matrixOrder()); };
const matrixOrder = () => QUADS.flatMap(q => F.filter(f => state.mPrio.has(f.prio) && f.q === q.key).sort((a,b) => b.i - a.i || a.e - b.e || a.id - b.id)).map(f => f.id);

function renderMatrixTable(shown) {
  const tb = document.getElementById("m-table");
  if (!shown.length) { tb.innerHTML = `<tr class="empty"><td colspan="7">Choose at least one priority above to show features.</td></tr>`; return; }
  tb.innerHTML = QUADS.map(q => {
    const rows = shown.filter(f => f.q === q.key).sort((a,b) => b.i - a.i || a.e - b.e || a.id - b.id);
    if (!rows.length) return "";
    return `<tr class="group q-${q.key}"><td colspan="7">${q.name}<span>${q.desc} · ${rows.length}</span></td></tr>` +
      rows.map(f => `<tr class="row" data-id="${f.id}" tabindex="0">
        <td class="t-id">F${f.id}</td><td>${pill(f.prio)}</td>
        <td class="t-title"><b>${esc(f.short)}</b>${esc(f.title)}</td>
        <td class="t-long">${esc(f.why)}</td><td class="t-long">${esc(f.what)}</td>
        <td class="t-num">${f.i}</td><td class="t-num">${f.e}</td></tr>`).join("");
  }).join("");
}

/* ---------- Backlog ---------- */
const COLS = [
  {key:"id",label:"ID",get:f=>f.id},
  {key:"title",label:"Feature",get:f=>f.short},
  {key:"theme",label:"Theme",get:f=>f.theme},
  {key:"prio",label:"Prio",get:f=>PRIOS.indexOf(f.prio)},
  {key:"q",label:"Quadrant",get:f=>QUADS.findIndex(q=>q.key===f.q)},
  {key:"i",label:"Impact",get:f=>f.i,num:1},
  {key:"e",label:"Effort",get:f=>f.e,num:1},
  {key:"size",label:"Size",get:f=>"SML".indexOf(f.size),num:1},
  {key:"wow",label:"Wow",get:f=>f.wow},
  {key:"strong",label:"Strong",get:f=>f.strong,num:1},
  {key:"diff",label:"Differentiator",get:f=>f.diff,num:1},
  {key:"personas",label:"Personas",get:f=>f.personas.join(",")}
];
const themeSel = document.getElementById("b-theme");
if (themeSel) [...new Set(F.map(f => f.theme))].sort().forEach(t => themeSel.insertAdjacentHTML("beforeend", `<option value="${esc(t)}">${esc(t)}</option>`));
function renderBacklogHead() {
  document.getElementById("b-head").innerHTML = COLS.map(c => {
    const s = state.sort.key === c.key ? (state.sort.dir > 0 ? "ascending" : "descending") : "none";
    const arr = s === "descending" ? "↓" : s === "ascending" ? "↑" : "↕";
    return `<th class="sortable${c.num ? " t-num" : ""}" data-k="${c.key}" aria-sort="${s}" tabindex="0">${c.label}<span class="arr">${arr}</span></th>`;
  }).join("");
}
function backlogRows() {
  const q = document.getElementById("b-search").value.trim().toLowerCase();
  const th = themeSel.value;
  const col = COLS.find(c => c.key === state.sort.key);
  return F.filter(f => state.bPrio.has(f.prio) && (!th || f.theme === th) &&
      (!q || [f.short,f.title,f.what,f.problem,f.theme,"f"+f.id].join(" ").toLowerCase().includes(q)))
    .sort((a,b) => { const x = col.get(a), y = col.get(b); return (x > y ? 1 : x < y ? -1 : a.id - b.id) * state.sort.dir; });
}
function renderBacklog() {
  renderBacklogHead();
  const rows = backlogRows(); state.blist = rows.map(f => f.id);
  const tb = document.getElementById("b-table");
  tb.innerHTML = rows.length ? rows.map(f => `<tr class="row" data-id="${f.id}" tabindex="0">
    <td class="t-id">F${f.id}</td>
    <td class="t-title" style="min-width:260px"><b>${esc(f.short)}</b>${esc(f.title)}</td>
    <td><span class="tag">${esc(f.theme)}</span></td>
    <td>${pill(f.prio)}</td><td>${qpill(f.q)}</td>
    <td class="t-num">${f.i}</td><td class="t-num">${f.e}</td><td class="t-num">${f.size}</td>
    <td>${pips(f.wow)}</td>
    <td class="t-num">${f.strong ? '<span class="yes">✓</span>' : '<span class="no">–</span>'}</td>
    <td class="t-num">${f.diff ? '<span class="yes">✓</span>' : '<span class="no">–</span>'}</td>
    <td><div class="chips">${f.personas.map(p => `<span class="tag">${esc(p)}</span>`).join("")}</div></td></tr>`).join("")
    : `<tr class="empty"><td colspan="${COLS.length}">No features match these filters.</td></tr>`;
}
if (document.getElementById("b-head")) {
  document.getElementById("b-head").onclick = e => {
    const t = e.target.closest("th"); if (!t) return;
    const k = t.dataset.k; state.sort = {key:k, dir: state.sort.key === k ? -state.sort.dir : 1}; persist(); renderBacklog();
  };
  document.getElementById("b-head").onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.target.click(); } };
  document.getElementById("b-search").oninput = renderBacklog;
  themeSel.onchange = renderBacklog;
}

function rowClick(e, listFn) { const r = e.target.closest("tr.row"); if (r) openDrawer(+r.dataset.id, listFn()); }
const mTable = document.getElementById("m-table"), bTable = document.getElementById("b-table");
if (mTable) mTable.onclick = e => rowClick(e, matrixOrder);
if (bTable) bTable.onclick = e => rowClick(e, () => state.blist);
[mTable, bTable].forEach(el => { if (el) el.onkeydown = e => { if (e.key === "Enter" && e.target.matches("tr.row")) e.target.click(); }; });

/* ---------- Drawer ---------- */
const drawer = document.getElementById("drawer"), scrim = document.getElementById("scrim");
let lastFocus = null;
const privacyLevel = s => /^strong/i.test(s) ? ["var(--success)","var(--success-tint)","rgba(30,168,133,.35)"] : /^weak/i.test(s) ? ["var(--danger)","var(--danger-tint)","rgba(245,56,90,.35)"] : ["var(--warning)","var(--warning-tint)","rgba(255,153,0,.35)"];
const meter = (v, c) => `<div class="meter"><i style="width:${v*10}%;background:${c}"></i></div>`;
const check = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3.5 8.5 3 3 6-7"/></svg>';
const dash = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h8"/></svg>';

function openDrawer(id, list) {
  const f = byId[id]; if (!f) return;
  if (!drawer.classList.contains("open")) lastFocus = document.activeElement;
  state.open = id; state.list = list && list.includes(id) ? list : [id];
  const [pc, pt, pb] = privacyLevel(f.privacy);
  const [lvl, ...rest] = f.privacy.split(/\s(?=\()/);
  document.getElementById("d-head").innerHTML = `
    <div class="d-top"><span class="id">F${f.id}</span>${pill(f.prio)}${qpill(f.q)}
      <button class="icon-btn" id="d-close" aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
    <div class="d-short">${esc(f.short)}</div>
    <h2 class="d-title" id="d-title">${esc(f.title)}</h2>
    <div class="chips"><span class="tag">${esc(f.theme)}</span></div>`;
  document.getElementById("d-body").innerHTML = `
    <div class="stats">
      <div class="stat"><span class="k">Impact</span><span class="v">${f.i}<small>/10</small></span>${meter(f.i,"var(--success)")}</div>
      <div class="stat"><span class="k">Effort</span><span class="v">${f.e}<small>/10</small></span>${meter(f.e,"var(--danger)")}</div>
      <div class="stat"><span class="k">Size</span><span class="v">${f.size}</span><span class="k" style="text-transform:none;letter-spacing:0">${{S:"Small",M:"Medium",L:"Large"}[f.size]}</span></div>
      <div class="stat"><span class="k">Wow</span><span class="v">${f.wow}<small>/5</small></span>${pips(f.wow)}</div>
    </div>
    <div class="flags">
      <span class="flag ${f.strong ? "on" : ""}">${f.strong ? check : dash}Strong candidate</span>
      <span class="flag ${f.diff ? "on" : ""}">${f.diff ? check : dash}Differentiator</span>
    </div>
    <div class="field"><h3>What it does</h3><p>${esc(f.what)}</p></div>
    <div class="field"><h3>Problem solved</h3><p>${esc(f.problem)}</p></div>
    <div class="field callout"><h3>Impact / effort rationale</h3><p>${esc(f.why)}</p></div>
    <div class="pc">
      <div class="field" style="--c:var(--success)"><h3>Pros</h3><p>${esc(f.pros)}</p></div>
      <div class="field" style="--c:var(--danger)"><h3>Cons / risks</h3><p>${esc(f.cons)}</p></div>
    </div>
    <div class="field"><h3>Privacy fit</h3>
      <div class="privacy" style="--c:${pc};--c-tint:${pt};--c-bd:${pb}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z"/></svg>
        <p><b>${esc(lvl.toUpperCase())}</b>${rest.length ? esc(rest.join(" ").replace(/^\(|\)$/g, "")) : "No caveats."}</p></div></div>
    <div class="field"><h3>Personas</h3><div class="chips">${f.personas.map(p => `<span class="tag">${esc(p)}</span>`).join("")}</div></div>
    <div class="field"><h3>Suggested metrics</h3><div class="chips">${f.metrics.map(m => `<span class="tag" style="text-transform:none;letter-spacing:0">${esc(m)}</span>`).join("")}</div></div>
    ${f.nudge ? `<div class="field"><h3>Placement on the matrix</h3><p style="color:var(--text-weak);font-size:13px">Shares cell ${f.cell} with other features. ${esc(f.nudge.note)}</p></div>` : ""}
    <div class="field"><h3>Sheet reference</h3><dl class="kv"><dt>Matrix cell</dt><dd>${f.cell}</dd><dt>Quadrant</dt><dd>${qName(f.q)}</dd></dl></div>`;
  const idx = state.list.indexOf(id);
  document.getElementById("d-prev").disabled = idx <= 0;
  document.getElementById("d-next").disabled = idx < 0 || idx >= state.list.length - 1;
  document.getElementById("d-close").onclick = closeDrawer;
  document.getElementById("d-body").scrollTop = 0;
  scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add("open"));
  drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false");
  document.querySelectorAll(".chip[aria-current]").forEach(c => c.removeAttribute("aria-current"));
  document.querySelector(`.chip[data-id="${id}"]`)?.setAttribute("aria-current", "true");
  document.getElementById("d-close").focus({preventScroll:true});
}
function closeDrawer() {
  drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true");
  scrim.classList.remove("open"); setTimeout(() => { if (!drawer.classList.contains("open")) scrim.hidden = true; }, 200);
  state.open = null;
  document.querySelectorAll(".chip[aria-current]").forEach(c => c.removeAttribute("aria-current"));
  lastFocus?.focus?.({preventScroll:true});
}
const step = d => { const i = state.list.indexOf(state.open); const n = state.list[i + d]; if (n) openDrawer(n, state.list); };
document.getElementById("d-prev").onclick = () => step(-1);
document.getElementById("d-next").onclick = () => step(1);
scrim.onclick = closeDrawer;
document.addEventListener("keydown", e => {
  if (!drawer.classList.contains("open")) return;
  if (e.key === "Escape") closeDrawer();
  if (e.key === "ArrowRight" || e.key === "ArrowDown") { if (!e.target.matches("input,select")) { e.preventDefault(); step(1); } }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") { if (!e.target.matches("input,select")) { e.preventDefault(); step(-1); } }
});

/* ---------- Start: render whichever view this page has ---------- */
if (matrixEl) { renderFilters(document.getElementById("m-filters"), state.mPrio, renderMatrix); renderMatrix(); }
if (bTable) { renderFilters(document.getElementById("b-filters"), state.bPrio, renderBacklog); renderBacklog(); }
