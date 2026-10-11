# Proton Contacts for Business: PM task

Supporting material for the Proton B2B PM take-home task.

| Page | Path |
|---|---|
| Overview (home) | [`index.html`](index.html) |
| Impact / Effort matrix and backlog | [`matrix.html`](matrix.html) (data in [`data/features.js`](data/features.js)) |
| Mockups › Contacts (full-screen contact view) | [`mockups/contacts.html`](mockups/contacts.html) |
| Proton Dark design system (showcase) | [`design-system/index.html`](design-system/index.html) |
| Proton Dark tokens and components | [`design-system/proton-dark.css`](design-system/proton-dark.css) |

Static pages, no build step.

| Shared file | What it does |
|---|---|
| [`assets/site-nav.js`](assets/site-nav.js) | Header nav, loads Material Symbols and the motion script |
| [`assets/site-fx.js`](assets/site-fx.js) | Smooth scrolling, reveal on scroll, hover spotlight, back-to-top (off for reduced motion) |
| [`data/features.js`](data/features.js) | Feature ideas with impact/effort scores |
| [`data/contacts.vcf`](data/contacts.vcf) / [`data/contacts.js`](data/contacts.js) | Fictional sample contacts for mockups (vCard for import, JS for pages) |

Icons use [Material Symbols Rounded](https://fonts.google.com/icons): `<span class="ms">name</span>` on site pages, `<span class="pt-icon">name</span>` in mockups. Every page shares the header nav (a `{ label, children }` entry becomes a dropdown with no page of its own, like Mockups) in [`assets/site-nav.js`](assets/site-nav.js): to add a page, add one entry to its `PAGES` list and include the script straight after `<body>`.

Hosted with GitHub Pages from the `main` branch root.

The design system mimics Proton's dark UI for mockups. It is not an official Proton asset.
