# Saved Searches

Lists the current user's saved searches. Backed by `UserSettingsStore.savedSearches`, it renders each entry as a clickable row that re-runs the search, with a delete action revealed on hover. To create one, see the [Saved Search](/components/saved-search) dialog.

## Demo

<demo-saved-searches-basic></demo-saved-searches-basic>

```html
<saved-searches [options]="{ showLoadMore: false }" />
```

## Inputs

| Input     | Type             | Default                                                                   | Description                                                                            |
| --------- | ---------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `options` | `SearchesConfig` | `{ itemsPerPage: 10, showLoadMore: true, routerLink: '/saved-searches' }` | Pagination size, whether to show a "load more" button, and the "see more" link target. |

## Inside a popover

Hosted in a galactik popover (a native `popover` element handled by `PopoverDirective`), the feature finds the ancestor directive and shows its own floating title — it is hidden in the inline example above, where the page already names the list.

<demo-saved-searches-popover></demo-saved-searches-popover>

```html
<button popovertarget="saved-searches-popover" variant="secondary" size="md">Saved searches</button>

<div popover id="saved-searches-popover" class="p-2" placement="bottom-start" [matchTriggerWidth]="false">
  <saved-searches [options]="{ showLoadMore: false }" />
</div>
```

## Long labels

A label that does not fit on one line wraps: the row grows with its content, and the hover background covers every line.

<demo-saved-searches-multiline></demo-saved-searches-multiline>

```html
<div class="max-w-xs">
  <saved-searches [options]="{ showLoadMore: false }" />
</div>
```

## Narrow container

In a very narrow container (sidebar, small popover) the label wraps over several lines and the filter count and date stay on their own second line; each row grows to hold them.

<demo-saved-searches-narrow></demo-saved-searches-narrow>

```html
<div class="w-56">
  <saved-searches [options]="{ showLoadMore: false }" />
</div>
```

## Filters and date

The second line reads « N filters · relative date »: the filter count appears when the saved URL carries filters (`f` query parameter), the date when the entry has a `date`. A row with neither stays on a single line (the last row below).

<demo-saved-searches-filters></demo-saved-searches-filters>

```html
<saved-searches [options]="{ showLoadMore: false }" />
```

## Pagination

With more entries than `itemsPerPage`, the footer shows a "load more" button.

<demo-saved-searches-pagination></demo-saved-searches-pagination>

```html
<saved-searches [options]="{ itemsPerPage: 5, showLoadMore: true }" />
```

## Empty state

<demo-saved-searches-empty></demo-saved-searches-empty>

```html
<saved-searches [options]="{ showLoadMore: false }" />
```

## Notes

- Rows use the galactik `List`/`ListItem` (ARIA listbox) — arrow-key navigation, Enter or click to re-run the search.
- The hover-revealed delete action works in this demo: it removes the row locally instead of calling the real `UserSettingsStore.deleteSavedSearch` (which persists via the backend).
