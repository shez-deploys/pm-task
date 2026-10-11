# Proton Contacts for Business: PM task

Supporting material for the Proton B2B PM take-home task.

| Page | Path |
|---|---|
| Overview (home) | [`index.html`](index.html) |
| Prioritisation › Impact / Effort matrix | [`matrix.html`](matrix.html) |
| Prioritisation › Backlog (all feature ideas in one table) | [`backlog.html`](backlog.html) (old link `matrix.html#backlog` redirects here) |
| Mockups › All mockups (landing page with screenshots) | [`mockups/index.html`](mockups/index.html) |
| Trusted Contacts › Overview (contacts list: tabs, hover cards, suggested contacts) | [`mockups/contacts-list.html`](mockups/contacts-list.html) |
| Trusted Contacts › Contact card (full-screen contact) | [`mockups/contacts.html`](mockups/contacts.html) |
| Protection › Impersonation and Misdirection | [`mockups/protection.html#imp`](mockups/protection.html) / `#mis` |
| Appendix › Sources | [`appendix/sources.html`](appendix/sources.html) |
| Appendix › Context (Additional Notes from the doc, every section with a link to copy, plus visuals) | [`appendix/context.html`](appendix/context.html) |
| Design system (Proton Dark kit used in the mockups, not in the nav) | [`design-system/index.html`](design-system/index.html) |

Static pages, no build step.

## Two design systems

- **The website** (nav, page headers, home, mockups overview, matrix frame) uses **DS Dark**: [`assets/ds/ds.css`](assets/ds/ds.css), scoped to `.ds-system`, plus the site layer in [`assets/site.css`](assets/site.css).
- **Inside the mockups** (everything in `.app`) uses the **Proton Dark** mimic: [`design-system/proton-dark.css`](design-system/proton-dark.css) and [`mockups/mockup.css`](mockups/mockup.css).

Trusted Contacts is the MVP and the focus; Protection is shown as an additional, muted feature on the home page and the mockups overview.

The **Get the document** card on the home page is a placeholder. When the PDF is ready, add it (for example `docs/trusted-contacts.pdf`) and follow the comment above the card in `index.html`.

Every mockup page has the same plain header: a small label (the feature), a large title (the view), optional scenario switch, then a divider and the mockup.

## Shared files

| File | What it does |
|---|---|
| [`assets/site-nav.js`](assets/site-nav.js) | Header nav (Mockups dropdown grouped by feature), Clear cache button, loads Material Symbols and the motion script |
| [`assets/site.css`](assets/site.css) | Page container, page headers, cards and grids on top of DS Dark |
| [`assets/site-fx.js`](assets/site-fx.js) | Smooth scrolling, reveal on scroll, hover spotlight, back-to-top (off for reduced motion) |
| [`assets/ds/`](assets/ds/) | DS Dark kit (CSS, optional JS, its README) |
| [`data/features.js`](data/features.js) | Feature ideas with impact/effort scores |
| [`assets/prioritisation.css`](assets/prioritisation.css) / [`assets/prioritisation.js`](assets/prioritisation.js) | Shared by the Impact / Effort and Backlog pages: matrix, table, filters and the feature drawer |
| [`mockups/mockup.css`](mockups/mockup.css) / [`mockups/mockup.js`](mockups/mockup.js) | Shared mockup styles and mock data. `MK.live(root, selector)` marks what works in a mockup so it lights up on hover; clicking anything else flashes all of it |
| [`data/contacts.vcf`](data/contacts.vcf) / [`data/contacts.js`](data/contacts.js) | Fictional sample contacts for mockups (vCard for import, JS for pages) |

**Clear cache** (top right on every page) re-downloads every file from the server, clears saved filters and reloads, so new versions show up straight away instead of after GitHub Pages' 10-minute cache.

Screenshots in `mockups/img/` and `assets/img/` (matrix, backlog) are captures for the home page and mockups overview; retake them after changing a mockup.

Icons use [Material Symbols Rounded](https://fonts.google.com/icons): `<span class="ms">name</span>` on site pages, `<span class="pt-icon">name</span>` in mockups. To add a page, add one entry to `PAGES` in [`assets/site-nav.js`](assets/site-nav.js) (`{ section: "Name" }` starts a labelled block inside a dropdown) and include the script straight after `<body>`.

Hosted with GitHub Pages from the `main` branch root.

The Proton Dark kit mimics Proton's dark UI for mockups. It is not an official Proton asset.
