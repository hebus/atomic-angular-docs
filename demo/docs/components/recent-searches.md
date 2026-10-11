# Recent Searches

Lists the current user's recent searches. Backed by `UserSettingsStore.recentSearches`, it renders each entry as a clickable row that re-runs the search, with a delete action revealed on hover.

## Demo

<demo-recent-searches-basic></demo-recent-searches-basic>

```html
<recent-searches [options]="{ showLoadMore: false }" />
```

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `SearchesConfig` | `{ itemsPerPage: 10, showLoadMore: true, routerLink: '/recent-searches' }` | Pagination size, whether to show a "load more" button, and the "see more" link target. |

## Inside a popover

Hosted in a galactik popover (a native `popover` element handled by `PopoverDirective`), the feature finds the ancestor directive and shows its own floating title — it is hidden in the inline example above, where the page already names the list.

<demo-recent-searches-popover></demo-recent-searches-popover>

```html
<button popovertarget="recent-searches-popover" variant="secondary" size="md">Recent searches</button>

<div popover id="recent-searches-popover" class="p-2" placement="bottom-start" [matchTriggerWidth]="false">
  <recent-searches [options]="{ showLoadMore: false }" />
</div>
```

## Notes

- Rows use the galactik `List`/`ListItem` (ARIA listbox) — arrow-key navigation, Enter or click to re-run the search.
- Each row shows a relative-date badge and, if the search had active filters, a filter-count badge.
- The hover-revealed delete action works in this demo: it removes the row locally instead of calling the real `UserSettingsStore.deleteRecentSearch` (which persists via the backend).
