/* Shared helpers and mock data for the Proton mockups.
   Loaded after ../data/contacts.js. Exposes window.MK. */
(function () {
  var C = window.CONTACTS || [];
  var byId = {}; C.forEach(function (c) { byId[c.id] = c; });
  var ME = { name: "Sophie Keller", initials: "SK" };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };
  var ic = function (n, cls) { return '<span class="pt-icon' + (cls ? " " + cls : "") + '" aria-hidden="true">' + n + '</span>'; };
  var st = function (kind, text, icon) { return '<span class="st st--' + kind + '">' + (icon ? ic(icon) : "") + esc(text) + '</span>'; };
  var initials = function (n) { return n.split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase(); };
  var avClass = function (c) { return c.type === "colleague" ? "av av--int" : c.type === "impersonation" ? "av av--bad" : "av"; };
  var stack = function (list, extra) { return '<span class="stack">' + list.map(function (x) { return '<span class="av' + (x === "SK" ? " av--int" : "") + '">' + x + '</span>'; }).join("") + (extra ? '<span class="av" style="background:var(--pt-bg-raised);color:var(--pt-text-weak)">+' + extra + '</span>' : "") + '</span>'; };
  var primary = function (c) { return (c.emails.find(function (e) { return e.primary; }) || c.emails[0]).address; };
  var domainOf = function (a) { return a.split("@")[1]; };

  /* ---------------- Mock history, per contact ---------------- */
  var H = {};
  H[8] = {
    chips: [st("warn", "External", "public"), st("muted", "Supplier"), st("ok", "Trusted", "verified_user")],
    stats: { email: [42, "threads in 12 months", ""], cal: [3, "next on 14 Oct", ""], files: [6, "4 from Marco · 2 from you", ""] },
    recent: [
      { k: "mail", t: "Re: Q3 service review – actions", d: "8 Oct 26", m: "3 messages · you, Marco, Matthias", p: ["MR","SK","MF"], hot: 1 },
      { k: "event", t: "Quarterly service review", d: "14 Oct 26", m: "Upcoming · Proton Meet · 45 min", p: ["MR","SK","MF"], x: 1, pill: st("brand", "Upcoming") },
      { k: "file", t: "Brightlane SLA 2026.pdf", d: "2 Oct 26", m: "Shared with you · 1.2 MB" },
      { k: "mail", t: "Invoice INV-2026-0912", d: "12 Sep 26", m: "From billing@brightlane-it.example · same domain", p: ["BI"] }
    ],
    trustSum: [4, 0, 1],
    trust: [
      ["ok", "check_circle", "Domain verified", "<code>brightlane-it.example</code> passes SPF, DKIM and DMARC.", st("ok", "Verified", "check_circle")],
      ["ok", "history", "Known for 3 years", "First email on 14 Mar 2023. 214 messages since.", st("muted", "Since 2023")],
      ["ok", "alternate_email", "Consistent sender", "Every message came from the same domain and display name.", st("muted", "100%")],
      ["muted", "key_off", "Encryption key", "Not on Proton, so mail isn't end-to-end encrypted. Use a password-protected message for sensitive files.", st("muted", "Not on Proton")],
      ["bad", "gpp_maybe", "Look-alike blocked", "<code>brightIane-it.example</code> used Marco's name on 9 Oct.", st("bad", "Review", "error"), 10]
    ],
    email: [
      ["8 Oct 26", "09:12", "Re: Q3 service review – actions", ["Project Atlas", "2 attachments"], "marco.rossi@brightlane-it.example", ""],
      ["30 Sep 26", "16:40", "Ticket #4471 resolved: VPN for new joiners", ["IT"], "marco.rossi@brightlane-it.example", ""],
      ["12 Sep 26", "07:05", "Invoice INV-2026-0912", ["Invoice", "PDF"], "billing@brightlane-it.example", ""],
      ["28 Aug 26", "11:22", "Laptop rollout for September", ["IT"], "marco.rossi@brightlane-it.example", ""],
      ["15 Jul 26", "14:03", "Q2 service review notes", ["1 attachment"], "marco.rossi@brightlane-it.example", ""]
    ],
    cal: [
      ["14 Oct 26", "10:00–10:45", "Quarterly service review", ["Upcoming", "Proton Meet"], "You, Marco Rossi, Matthias Frei"],
      ["15 Jul 26", "10:00–10:45", "Quarterly service review", ["Proton Meet"], "You, Marco Rossi, Matthias Frei"],
      ["16 Apr 26", "14:00–15:00", "Laptop refresh planning", ["Office"], "You, Marco Rossi"]
    ],
    files: [
      ["2 Oct 26", "", "Brightlane SLA 2026.pdf", ["PDF", "1.2 MB"], "Shared with you by Marco"],
      ["8 Oct 26", "", "Q3 service review actions.docx", ["Doc"], "Shared with you by Marco"],
      ["26 Sep 26", "", "Aldermoor asset register.xlsx", ["Sheet"], "You shared with Marco"],
      ["28 Aug 26", "", "Laptop rollout plan.pdf", ["PDF"], "Shared with you by Marco"]
    ],
    colleagues: [["MF", "Matthias Frei", "Finance Lead · 12 threads with Marco"], ["LB", "Lea Baumann", "Junior Analyst · 2 threads"], ["AV", "Adrian Vogt", "CEO · 1 meeting"]],
    sameOrg: []
  };
  H[10] = {
    chips: [st("warn", "External", "public"), st("bad", "Unverified", "gpp_maybe"), st("muted", "First seen 2 days ago")],
    alert: true,
    stats: { email: [1, "first message on 9 Oct", ""], cal: [0, "no meetings", ""], files: [0, "nothing shared", ""] },
    recent: [ { k: "mail", t: "Updated bank details for October invoice", d: "9 Oct 26", m: "From marco.rossi@brightIane-it.example", p: ["MR"], bad: 1, pill: st("bad", "Look-alike", "error") } ],
    trustSum: [0, 4, 1],
    trust: [
      ["bad", "spellcheck", "Look-alike domain", "<code>bright<b style='color:#ff8da1'>I</b>ane-it.example</code> uses a capital I where your supplier's <code>brightlane-it.example</code> has an l.", st("bad", "Look-alike", "error")],
      ["bad", "badge", "Name matches a trusted contact", "Marco Rossi at <code>brightlane-it.example</code>: 42 threads since 2023.", st("bad", "Mismatch", "error"), 8],
      ["bad", "domain_disabled", "Domain not verified", "No DMARC record. SPF and DKIM don't match the sender.", st("bad", "Failed", "cancel")],
      ["warn", "schedule", "First seen 2 days ago", "One message, asking you to change bank details.", st("warn", "New", "schedule")],
      ["muted", "key_off", "Encryption key", "No key published for this address.", st("muted", "None")]
    ],
    email: [ ["9 Oct 26", "17:48", "Updated bank details for October invoice", ["Payment request", "Urgent"], "marco.rossi@brightIane-it.example", "bad"] ],
    cal: [], files: [],
    colleagues: [["MF", "Matthias Frei", "Also received this sender on 9 Oct"]],
    sameOrg: [["MR", "Marco Rossi", "The real contact · brightlane-it.example", "Open", 8]]
  };
  function seed(c) { var s = 0; c.name.split("").forEach(function (ch) { s = (s * 31 + ch.charCodeAt(0)) % 997; }); return s; }
  function generic(c) {
    var s = seed(c), n = c.name.split(" ")[0], int = c.type === "colleague";
    var proj = (c.groups || []).find(function (g) { return /^Project/.test(g); }) || (int ? "Team update" : "Account review");
    var email = 6 + s % 60, cal = 1 + s % 7, files = 1 + s % 12;
    var chips = int ? [st("brand", "Internal", "domain"), st("ok", "Key verified", "verified_user")]
      : c.type === "former" ? [st("warn", "External", "public"), st("muted", "Changed company"), st("ok", "Trusted", "verified_user")]
      : [st("warn", "External", "public"), st("muted", c.type[0].toUpperCase() + c.type.slice(1)), st("ok", "Trusted", "verified_user")];
    var since = int ? (c.note && /Joined in ([A-Z][a-z]+ \d{4})/.test(c.note) ? RegExp.$1 : "2021") : String(2021 + s % 4);
    var trust = [
      ["ok", "check_circle", "Domain verified", "<code>" + esc(domainOf(primary(c))) + "</code> passes SPF, DKIM and DMARC.", st("ok", "Verified", "check_circle")],
      ["ok", "history", "Known since " + since, email * 3 + " messages across " + c.emails.length + " address" + (c.emails.length > 1 ? "es" : "") + ".", st("muted", "Since " + since.slice(-4))],
      ["ok", "alternate_email", "Consistent sender", c.emails.length > 1 ? "Messages came from " + c.emails.length + " known addresses on this card." : "Every message came from the same domain and display name.", st("muted", "100%")],
      int ? ["ok", "key", "Encryption key", "On Proton. Key verified, so mail is end-to-end encrypted.", st("ok", "Verified", "check_circle")]
          : ["muted", "key_off", "Encryption key", "Not on Proton. Use a password-protected message for sensitive files.", st("muted", "Not on Proton")]
    ];
    return {
      chips: chips,
      stats: { email: [email, "threads in 12 months", ""], cal: [cal, "next on 16 Oct", ""], files: [files, "shared both ways", ""] },
      recent: [
        { k: "mail", t: "Re: " + proj + " – next steps", d: "7 Oct 26", m: "4 messages · you and " + n, p: [c.initials, "SK"], hot: 1 },
        { k: "event", t: proj + " check-in", d: "16 Oct 26", m: "Upcoming · Proton Meet · 30 min", p: [c.initials, "SK"], pill: st("brand", "Upcoming") },
        { k: "file", t: proj.replace(/\s+/g, " ") + " notes.docx", d: "1 Oct 26", m: "Shared " + (s % 2 ? "with you" : "by you") }
      ],
      trustSum: [int ? 4 : 3, 0, int ? 0 : 1],
      trust: trust,
      email: [["7 Oct 26", "10:31", "Re: " + proj + " – next steps", [proj], primary(c), ""], ["24 Sep 26", "15:02", proj + ": agenda", [proj], c.emails[c.emails.length - 1].address, ""]],
      cal: [["16 Oct 26", "11:00–11:30", proj + " check-in", ["Upcoming", "Proton Meet"], "You, " + c.name]],
      files: [["1 Oct 26", "", proj + " notes.docx", ["Doc"], s % 2 ? "Shared with you by " + n : "You shared with " + n]],
      colleagues: int ? [["MF", "Matthias Frei", "Finance Lead · same team threads"]] : [["AV", "Adrian Vogt", "CEO · " + (2 + s % 5) + " threads with " + n]],
      sameOrg: int ? [] : [["@", domainOf(primary(c)), "No other contacts at this company yet", ""]]
    };
  }
  var hist = function (c) { return H[c.id] || (H[c.id] = generic(c)); };

  /* Last interaction shown in lists and hover cards. */
  var lastContact = function (c) { var h = hist(c); return (h.recent[0] || {}).d || "–"; };
  var trustPill = function (c) {
    if (c.type === "impersonation") return st("bad", "Unverified", "gpp_maybe");
    if (c.type === "colleague") return st("ok", "Key verified", "verified_user");
    return st("ok", "Trusted", "verified_user");
  };

  /* People you correspond with who aren't saved yet. Never includes look-alikes. */
  var SUGGESTED = [
    { id: "s1", name: "Brightlane Billing", email: "billing@brightlane-it.example", org: "Brightlane IT Services", title: "Accounts receivable", score: 94, related: 8,
      why: "Sends your monthly invoices from the same verified domain as Marco Rossi.", msgs: 9, replies: 3, meets: 0, since: "Jan 2025", from: "Domain" },
    { id: "s2", name: "Sarah Lindqvist", email: "sarah.lindqvist@veloria-partners.example", org: "Veloria Partners", title: "Head of Procurement", score: 88, related: 4,
      why: "Copied with Camille Rochat on 6 Project Atlas threads. Title and phone found in her signature.", msgs: 14, replies: 8, meets: 2, since: "Jun 2026", from: "Signature" },
    { id: "s3", name: "Tomás Ortega", email: "t.ortega@meridian-fleet.example", org: "Meridian Fleet", title: "Chief Operating Officer", score: 81, related: 5,
      why: "Introduced you to Noah Meier and joined both scoping calls.", msgs: 5, replies: 4, meets: 2, since: "Sep 2026", from: "Signature" },
    { id: "s4", name: "Priya Raman", email: "priya.raman@greyhaven-risk.example", org: "Greyhaven Risk", title: "Security Analyst", score: 72, related: 7,
      why: "Works with Oliver Grant on your vendor security review.", msgs: 4, replies: 2, meets: 1, since: "Aug 2026", from: "Thread" },
    { id: "s5", name: "Brightlane Support", email: "support@brightlane-it.example", org: "Brightlane IT Services", title: "Service desk", score: 69, related: 8,
      why: "Six support tickets this year, same verified domain as Marco Rossi.", msgs: 6, replies: 6, meets: 0, since: "Feb 2026", from: "Domain" },
    { id: "s6", name: "Jonas Keller", email: "jonas.k@gmail.example", org: "", title: "", score: 38, related: null,
      why: "Two messages in 2025 from a personal address. Not enough history to suggest.", msgs: 2, replies: 0, meets: 0, since: "Mar 2025", from: "Thread", low: true }
  ];
  var HELD = [{ email: "marco.rossi@brightIane-it.example", name: "Marco Rossi", why: "Looks like your existing contact Marco Rossi (brightlane-it.example), so it is never suggested." }];

  /* Confidence ring, 0–100. Higher means more evidence you work with this person. */
  var ring = function (score, size) {
    size = size || 40; var r = size / 2 - 4, c = 2 * Math.PI * r, off = c * (1 - score / 100);
    var col = score >= 85 ? "var(--pt-success)" : score >= 65 ? "var(--pt-primary-soft)" : score >= 50 ? "var(--pt-warning)" : "var(--pt-text-hint)";
    return '<span class="ring" style="width:' + size + 'px;height:' + size + 'px" aria-label="Confidence ' + score + ' of 100"><svg viewBox="0 0 ' + size + ' ' + size + '"><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--pt-bg-elevated)" stroke-width="3"/><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/></svg><b>' + score + '</b></span>';
  };

  /* Proton category-tab markup (icon + label, ghost bold label keeps width stable). */
  var ptab = function (key, label, icon, selected, count, attr) {
    return '<button class="ptab" role="tab" type="button" ' + (attr || "data-tab") + '="' + key + '" aria-selected="' + !!selected + '">' + ic(icon, "ptab-ic") +
      '<span class="ptab-l"><span class="ptab-ghost" aria-hidden="true">' + label + '</span><span class="ptab-t">' + label + '</span></span>' +
      (count != null ? '<span class="ptab-n">' + count + '</span>' : "") + '</button>';
  };

  window.MK = { C: C, byId: byId, ME: ME, esc: esc, ic: ic, st: st, initials: initials, avClass: avClass, stack: stack, primary: primary, domainOf: domainOf,
    hist: hist, lastContact: lastContact, trustPill: trustPill, SUGGESTED: SUGGESTED, HELD: HELD, ring: ring, ptab: ptab };
})();
