# History Panel

A side panel listing the current user's recent searches, grouped by day, with an **All / Favorites** switch, a star to mark a search as favorite and a button to delete one. It reads `UserSettingsStore` itself and re-runs a search through the router, so the only thing to wire is whether it is open.

## Imports

```ts
import { HistoryPanelComponent } from "@sinequa/atomic-angular";
```

## Next to a sidebar

The panel is a flex child that grows from `0` to `--history-panel-width` (15.625rem by default) when `open` turns `true`, so beside a sidebar it **pushes** the page content instead of covering it. Closed, it is `inert` and hidden from assistive technology. Hover a row to reveal the cross (remove) and the star (favorite); click a row to re-run the search. The star of the first row is already on, and the panel in this demo never leaves the page: the area on the right shows the stored search you clicked and the `router.navigate(…)` call the panel made for it.

A search the user has just run is stored with its router path in `url` / `path`, but its `queryParams.path` is the **absolute URL** of the page (`https://host/#/search`), which the router cannot navigate to; an older entry may carry a real router path there. Click both kinds (the second and third rows) and both open `/search` with their query and filters: the panel reads what it needs back from `url`, it does not depend on how the entry was stored.

<demo-history-panel-basic></demo-history-panel-basic>

```html
<div class="flex h-svh">
  <nav>
    <button (click)="open.set(!open())" [attr.aria-expanded]="open()">History</button>
  </nav>
  <!-- the content spaces itself (ms-2), so the panel only takes a margin on the side of the nav -->
  <history-panel [(open)]="open" (searchSelected)="onSearch($event)" style="--history-panel-gap: 0.5rem" />
  <main class="ms-2 flex-1">…</main>
</div>
```

## Theming

Every colour of the panel is a CSS variable with a semantic-token fallback: by default it is a plain card on the page's layer colour, and a host retints it — a dark sidebar, here — by setting the variables on it or on an ancestor. The row actions appear on hover or focus: the star adds the search to the favorites, the cross removes it from the history. A title that is cut off scrolls while its row is hovered and shows the whole text in a tooltip.

<demo-history-panel-themed></demo-history-panel-themed>

```html
<history-panel
  [(open)]="open"
  style="--history-panel-bg: #374648; --history-panel-fg: #fff; --history-panel-muted: #d1e1dd; --history-panel-hover: #445556; --history-panel-group: #445556; --history-panel-toggle-active: #1a1f23" />
```

| Variable | Default | What it paints |
| --- | --- | --- |
| `--history-panel-bg` / `--history-panel-fg` | the page layer colours | the panel and its text |
| `--history-panel-muted` / `--history-panel-icon` | `--font-neutral-muted` | the header and the day labels / the row icons |
| `--history-panel-hover` / `--history-panel-active` | `--bg-neutral-base` / `--bg-neutral-hovered` | a hovered / pressed row, the close button hover |
| `--history-panel-group`, `-toggle-active`, `-toggle-hover` | `--bg-primary-lightest`, `--bg-neutral-white`, `--bg-primary-hovered` | the All / Favorites switch |
| `--history-panel-fav`, `-fav-hover-bg` | yellow tokens | the star |
| `--history-panel-del-hover-bg`, `-del-hover-fg` | error tokens | the cross on hover |
| `--history-panel-width`, `--history-panel-gap` | `15.625rem`, `0` | the open width, and the margin on its start side |

## Favorites

`tab="favorites"` lists only the recent searches the user starred. A favorite is a flag on a recent search, keyed by its query text: un-favoriting never deletes the search, and deleting the search drops its favorite.

<demo-history-panel-favorites></demo-history-panel-favorites>

```html
<history-panel [open]="true" tab="favorites" />
```

## Empty state

<demo-history-panel-empty></demo-history-panel-empty>

```html
<history-panel [open]="true" />
```

## Notes

- Under the mobile breakpoint the panel becomes a galactik `Sheet` sliding from the left — resize the window below 768px to see it (the pushing layout above only exists on desktop).
- `Escape` and the close button write `open` back, so a `[(open)]` binding stays in sync.
- Data comes from `UserSettingsStore` (`recentSearches`, `favoriteSearches`, `toggleFavoriteSearch`, `deleteRecentSearch`). The demo swaps the store for a local stand-in; the real one persists through the user-settings API.
- Strings live in the `searches` translation scope (`en`, `fr`, `de`).

## API reference

### HistoryPanelComponent (`<history-panel>`)

| Input   | Type                     | Default | Description                                                  |
| ------- | ------------------------ | ------- | ------------------------------------------------------------ |
| `open`  | `boolean`                | `false` | Whether the panel is shown. Two-way: `[(open)]`.             |
| `tab`   | `"all" \| "favorites"`   | `"all"` | Which list is shown. Two-way: `[(tab)]`.                     |
| `class` | `string`                 | —       | Extra classes for the desktop `<aside>`, merged with `cn`.   |

| Output           | Payload      | Description                                                                                     |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `searchSelected` | `SearchItem` | Emitted once a search has been re-run from the panel — close an overlaying host from here.       |
