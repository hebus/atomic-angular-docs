# Recent Searches

Lists the current user's recent searches. Backed by `UserSettingsStore.recentSearches`, it renders each entry as a clickable row that re-runs the search, with a delete action revealed on hover.

## Demo

<demo-recent-searches-basic></demo-recent-searches-basic>

```html
<recent-searches [options]="{ showLoadMore: false }" />
```

## Inputs

| Input     | Type             | Default                                                                    | Description                                                                            |
| --------- | ---------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
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

## Long labels

A label that does not fit on one line wraps: the row grows with its content, and the hover background covers every line.

<demo-recent-searches-multiline></demo-recent-searches-multiline>

```html
<div class="max-w-xs">
  <recent-searches [options]="{ showLoadMore: false }" />
</div>
```

## Narrow container

In a very narrow container (sidebar, small popover) the label wraps over several lines and the filter count and date stay on their own second line; each row grows to hold them.

<demo-recent-searches-narrow></demo-recent-searches-narrow>

```html
<div class="w-56">
  <recent-searches [options]="{ showLoadMore: false }" />
</div>
```

## Filters and date

The second line reads « N filters · relative date »: the filter count appears when the URL carries filters (`f` query parameter), the date when the entry has a `date`. A row with neither stays on a single line (the last row below).

<demo-recent-searches-filters></demo-recent-searches-filters>

```html
<recent-searches [options]="{ showLoadMore: false }" />
```

## Pagination

With more entries than `itemsPerPage`, the footer shows a "load more" button.

<demo-recent-searches-pagination></demo-recent-searches-pagination>

```html
<recent-searches [options]="{ itemsPerPage: 5, showLoadMore: true }" />
```

## Empty state

<demo-recent-searches-empty></demo-recent-searches-empty>

```html
<recent-searches [options]="{ showLoadMore: false }" />
```

## Notes

- Rows use the galactik `List`/`ListItem` (ARIA listbox) — arrow-key navigation, Enter or click to re-run the search.
- Each row shows the label and, on a second line, the filter count (if the search had active filters) and the relative date.
- The hover-revealed delete action works in this demo: it removes the row locally instead of calling the real `UserSettingsStore.deleteRecentSearch` (which persists via the backend).
