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
| Appendix › Wireframes (rough wireframes of the four views, one tab each) | [`appendix/wireframes.html`](appendix/wireframes.html) |
| Design system (Proton Dark kit used in the mockups, not in the nav) | [`design-system/index.html`](design-system/index.html) |

Static pages, no build step.

## Two design systems

- **The website** (nav, page headers, home, mockups overview, matrix frame) uses **DS Dark**: [`assets/ds/ds.css`](assets/ds/ds.css), scoped to `.ds-system`, plus the site layer in [`assets/site.css`](assets/site.css).
- **Inside the mockups** (everything in `.app`) uses the **Proton Dark** mimic: [`design-system/proton-dark.css`](design-system/proton-dark.css) and [`mockups/mockup.css`](mockups/mockup.css).

Trusted Contacts is the MVP and the focus; Protection is shown as an additional, muted feature on the home page and the mockups overview.

The **Get the document** card on the home page opens the write-up, [`assets/SherryBond-B2B-Proton.pdf`](assets/SherryBond-B2B-Proton.pdf) (preview image: `assets/img/writeup-page1.jpg`). To update it, replace the PDF with a file of the same name.

**Not indexed:** every page has `<meta name="robots" content="noindex, nofollow, noarchive">` (and `site-nav.js` adds it if a page is missing it). GitHub Pages can't send a noindex header for the PDF itself, but only noindex, nofollow pages link to it.

Every mockup page has the same plain header: a small label (the feature), a large title (the view), optional scenario switch, then a divider and the mockup.

## Shared files

| File | What it does |
|---|---|
| [`assets/site-nav.js`](assets/site-nav.js) | Header nav (Mockups dropdown grouped by feature) and loads the motion script |
| [`assets/site.css`](assets/site.css) | Page container, page headers, cards and grids on top of DS Dark |
| [`assets/site-fx.js`](assets/site-fx.js) | Smooth scrolling, reveal on scroll, hover spotlight, back-to-top (off for reduced motion) |
| [`assets/ds/`](assets/ds/) | DS Dark kit (CSS, optional JS, its README) |
| [`data/features.js`](data/features.js) | Feature ideas with impact/effort scores |
| [`assets/prioritisation.css`](assets/prioritisation.css) / [`assets/prioritisation.js`](assets/prioritisation.js) | Shared by the Impact / Effort and Backlog pages: matrix, table, filters and the feature drawer |
| [`mockups/mockup.css`](mockups/mockup.css) / [`mockups/mockup.js`](mockups/mockup.js) | Shared mockup styles and mock data. `MK.live(root, selector)` marks what works in a mockup so it lights up on hover; clicking anything else flashes all of it |
| [`data/contacts.vcf`](data/contacts.vcf) / [`data/contacts.js`](data/contacts.js) | Fictional sample contacts for mockups (vCard for import, JS for pages) |
| [`assets/fonts/`](assets/fonts/) | Self-hosted Inter and Material Symbols Rounded (`fonts.css`). The icon font is subset to the icons the site uses, so a new icon name needs the subset rebuilt |

Screenshots in `mockups/img/` and `assets/img/` (matrix, backlog) are captures for the home page and mockups overview; retake them after changing a mockup.

Icons use [Material Symbols Rounded](https://fonts.google.com/icons): `<span class="ms">name</span>` on site pages, `<span class="pt-icon">name</span>` in mockups. To add a page, add one entry to `PAGES` in [`assets/site-nav.js`](assets/site-nav.js) (`{ section: "Name" }` starts a labelled block inside a dropdown) and include the script straight after `<body>`.

Hosted with GitHub Pages from the `main` branch root.

The Proton Dark kit mimics Proton's dark UI for mockups. It is not an official Proton asset.
