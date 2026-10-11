# DS Dark

A dark-only HTML/CSS/JavaScript design system inspired by the supplied references: near-black surfaces, thin grey borders, white primary actions, rounded controls and bold sans-serif headings.

## Files

- `ds.css`: reusable tokens, components, responsive layout and utilities.
- `ds.js`: optional tabs, dialogs, toast notifications and table filtering.
- `index.html`: working component showcase. Open directly in a modern browser.
- `ds-preview.html`: the same showcase bundled into one offline HTML file.

No build step, package installation, CDN or external font request is needed.

## Add alongside an existing system

```html
<link rel="stylesheet" href="ds.css">
<script src="ds.js" defer></script>

<section class="ds-system" id="ds-contact-area">
  <article class="ds-card ds-stack">
    <h2 class="ds-title">Contact context</h2>
    <div class="ds-field">
      <label for="ds-contact-name">Name</label>
      <input id="ds-contact-name" class="ds-input" placeholder="Name">
    </div>
    <button type="button" class="ds-button ds-button--primary">Save</button>
  </article>
</section>
```

Place `.ds-system` on a wrapper around the new interface. Do not put it on the existing page's body unless you want all descendants to receive the DS foundation reset. Every CSS selector begins with `.ds-system`; custom properties use `--ds-*`, component classes use `ds-*`, and behavior uses `data-ds-*`. The JavaScript uses an isolated closure, installs listeners on each wrapper, and creates no global API.

All IDs in the example contain `ds`. Give repeated instances unique IDs such as `ds-contact-name-2`, and update `for`, `aria-controls`, `aria-labelledby`, `aria-describedby`, and data attribute references to match. Radio group names should also be unique across instances.

CSS scoping prevents this system from applying outside its wrapper. Existing styles such as global `button` rules or selectors using `!important` can still affect elements inside it. Prefer loading DS after your existing stylesheet, removing conflicting rules, or using Shadow DOM when you need hard isolation. No Shadow DOM infrastructure is included.

## Tokens and customisation

Override tokens on a particular wrapper; no `:root` changes are required:

```css
#ds-contact-area.ds-system {
  --ds-accent: #9acbea;
  --ds-radius: 12px;
  --ds-font: Inter, system-ui, sans-serif;
}
```

Inter is used if available in your app or installed locally. Otherwise the system uses native sans-serif fonts. The kit does not download Inter.

Palette: black `#000000`, canvas `#0A0A0A`, surface `#0E0E0E`, raised `#161616`, hover `#222222`, border `#2B2B2B`, stronger border `#5F5F5F`, primary text `#F5F5F5`, muted text `#B3B3B3`, subtle text `#929292`. Accent, success and danger colours are reserved for focus, illustrative charts and semantic states. Status badges always include descriptive text.

Spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64px. Radii: 6, 12, 20px and pill. Layout: 12 columns, two content columns at 900px, one at 640px.

## Components

Buttons: `.ds-button`, `--primary`, `--ghost`, `--danger`, `--pill`, `--icon`. Use actual `button` or `a` elements; icon-only buttons need an accessible name.

Form elements: `.ds-field`, `.ds-input`, `.ds-select`, `.ds-textarea`, `.ds-checkbox`, `.ds-radio`, `.ds-switch`. Use labels with matching IDs. Switches are checkbox inputs with `role="switch"`. Error messages use `aria-invalid="true"` and `aria-describedby`. Disabled controls use native `disabled`.

Surfaces: `.ds-card`, `.ds-card--raised`, `.ds-glass`, `.ds-alert`. Glass uses a translucent background and optional backdrop filtering; it remains usable without blur support.

Other primitives: `.ds-badge`, `--success`, `--danger`, `.ds-avatar`, `.ds-progress`, `.ds-divider`, `.ds-table`, `.ds-table-wrap`, native `details` with `.ds-accordion`, `.ds-chart` for SVG.

Typography/layout: `.ds-display`, `.ds-heading`, `.ds-title`, `.ds-lead`, `.ds-muted`, `.ds-small`, `.ds-label`, `.ds-number`, `.ds-container`, `.ds-stack`, `.ds-row`, `.ds-between`, `.ds-grid`, `.ds-col-4`, `.ds-col-6`, `.ds-col-8`, `.ds-col-12`, `.ds-grow`, `.ds-full`, `.ds-sr-only`.

## JavaScript conventions

Tabs require `.ds-tabs[role="tablist"]` containing `.ds-tab[role="tab"]` buttons with unique IDs, `aria-controls`, `aria-selected`, and roving `tabindex`. Panels use `role="tabpanel"`, `aria-labelledby`, `tabindex="0"`, and `hidden` on inactive panels. Left/Right arrows, Home and End navigate and activate tabs.

Dialogs use `<dialog class="ds-dialog" id="ds-example">` inside the wrapper. A trigger with `data-ds-open="ds-example"` opens it; a button inside with `data-ds-close` closes it. Native modal behavior handles focus containment and Escape. Focus returns to the opening control. Give each dialog a heading referenced by `aria-labelledby`.

Toasts require one empty `.ds-toast[data-ds-toast-region]` with `role="status"`, `aria-live="polite"`, `aria-atomic="true"` and `hidden` inside each wrapper. Add `data-ds-toast="Message"` to a button. Toasts disappear after five seconds. Reserve them for supplemental feedback; important information should remain visible elsewhere.

A search input with `data-ds-filter="ds-table-id"` filters the referenced table's body rows by their text. `data-ds-filter-status="ds-status-id"` updates an optional live status element with the count. The filter searches only the already rendered rows.

Load `ds.js` once, after static markup or using `defer`. It initializes wrappers present at page load. Dynamically mounted components/wrappers need your framework's lifecycle integration; no observer is provided. Without JS, native forms and accordions work, while tab switching, dialog triggers, toast buttons and filtering do not.

## Scope and accessibility

Visible focus indicators, labelled controls, native keyboard input, keyboard tabs, dialog focus management, reduced-motion support and text labels for semantic states are included. This is a starter kit, not an accessibility certification: test your final content, contrast, zoom, screen reader announcements and integration with your existing styles.

The showcase contains fictional contacts and illustrative SVG data. Actions displaying “demo” simulate feedback; they do not save, copy, invite or remove real data. No backend or persistence is included. Use your app's logic for production actions.

## Verification

JavaScript syntax, CSS scope and brace checks, unique ds-prefixed IDs, labels/ARIA references, initial tab states and the offline bundle were checked automatically. Browser rendering and interaction testing could not be completed in the authoring environment because its browser binary was unavailable. Test the showcase in your browser before integrating.
