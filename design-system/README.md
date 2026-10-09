# Proton Dark Kit

Dark-mode design system mimicking Proton Workspace (Mail, Calendar, Contacts).
Colours sampled from the dark Mail/Calendar screenshots in the "Proton" Figma file,
brand purple from proton.me. Not an official Proton asset.

## Files

| File | Use |
|---|---|
| `proton-dark.css` | Tokens (`--pt-*`) and component classes (`.pt-*`). Import or inline into any mockup. |
| `index.html` | Self-contained reference page showing every token and component. |

## How to use in a mockup

1. Inline `proton-dark.css` in a `<style>` tag (artifacts need a single file).
2. Add `class="pt"` to `<body>`.
3. Build with the classes below; only use raw values via `var(--pt-*)`.

## Surface hierarchy

| Token | Hex | Where |
|---|---|---|
| `--pt-bg-canvas` | #0e0d12 | Message list, calendar grid, page background |
| `--pt-bg-norm` | #16141b | Sidebar, drawers, modals, cards |
| `--pt-bg-raised` | #292732 | Search bar, toolbars, hover |
| `--pt-bg-strong` | #312f3a | Menus, autocomplete, active nav |
| `--pt-bg-elevated` | #3f3d4d | Avatars, chips |

## Components

| Group | Classes |
|---|---|
| Buttons | `pt-btn` + `--primary / --secondary / --ghost / --danger / --lg / --block`, `pt-icon-btn` |
| Inputs | `pt-input`, `pt-select`, `pt-textarea`, `pt-search`, `pt-checkbox(--on)`, `pt-toggle(--on)`, `pt-label` |
| Menus | `pt-menu`, `pt-menu__item(--active)` (bold the matched part with `<b>`) |
| Identity | `pt-avatar` (`--sm / --lg / --brand / --outline`), `pt-presence(--away)` |
| Status | `pt-badge`, `pt-count`, `pt-chip` (`--primary / --success / --warning / --danger / --info`), `pt-lock` |
| Banners | `pt-banner` (`--info / --warning / --danger / --success / --brand / --flat`) |
| Navigation | `pt-sidebar`, `pt-logo`, `pt-nav-item(--active)`, `pt-nav-section`, `pt-tabs`, `pt-tab(--active)`, `pt-rail` |
| Lists | `pt-list`, `pt-row(--selected)`, `pt-row__main / __title / __sub / __meta` |
| Containers | `pt-card`, `pt-drawer`, `pt-popover(__head)`, `pt-modal-scrim`, `pt-modal(__head / __foot)`, `pt-kv` |

## Rules

| Rule | Detail |
|---|---|
| One primary action per view | Purple fill is reserved for the main CTA (Save, New message, Share) |
| Avatars are rounded squares | 8px radius, initials, `--pt-bg-elevated` fill |
| Focus = purple border + soft halo | Use `pt-input--focus` in static mockups |
| Links on dark | `--pt-primary-soft`, underlined |
| Signal colours | Tints for backgrounds, solid for a 3px left edge on banners |
| Font | Inter, 14px body, 600 for row titles |
