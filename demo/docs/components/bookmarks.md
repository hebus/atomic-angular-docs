# Bookmarks

Lists the current user's bookmarked documents. Backed by `UserSettingsStore.bookmarks`, it renders each bookmark as a clickable row that opens the document, with a delete action revealed on hover.

## Demo

<demo-bookmarks-basic></demo-bookmarks-basic>

```html
<bookmarks [options]="{ showLoadMore: false }" />
```

## Inputs

| Input     | Type              | Default                                                              | Description                                                                            |
| --------- | ----------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `options` | `BookmarksConfig` | `{ itemsPerPage: 10, showLoadMore: true, routerLink: '/bookmarks' }` | Pagination size, whether to show a "load more" button, and the "see more" link target. |

## Inside a popover

Hosted in a galactik popover (a native `popover` element handled by `PopoverDirective`), the feature finds the ancestor directive and shows its own floating title — it is hidden in the inline example above, where the page already names the list.

<demo-bookmarks-popover></demo-bookmarks-popover>

```html
<button popovertarget="bookmarks-popover" variant="secondary" size="md">Bookmarks</button>

<div popover id="bookmarks-popover" class="p-2" placement="bottom-start" [matchTriggerWidth]="false">
  <bookmarks [options]="{ showLoadMore: false }" />
</div>
```

## Long titles

A title that does not fit on one line wraps: the row grows with its content, and the hover background covers every line. The first row also carries an author and a parent-folder tag, on a second line under the title.

<demo-bookmarks-multiline></demo-bookmarks-multiline>

```html
<div class="max-w-xs">
  <bookmarks [options]="{ showLoadMore: false }" />
</div>
```

## Narrow container

In a very narrow container the title is limited to two lines and the tags wrap under it, truncated when a value is too long.

<demo-bookmarks-narrow></demo-bookmarks-narrow>

```html
<div class="w-56">
  <bookmarks [options]="{ showLoadMore: false }" />
</div>
```

## Pagination

With more bookmarks than `itemsPerPage`, the footer shows a "load more" button.

<demo-bookmarks-pagination></demo-bookmarks-pagination>

```html
<bookmarks [options]="{ itemsPerPage: 5, showLoadMore: true }" />
```

## Empty state

<demo-bookmarks-empty></demo-bookmarks-empty>

```html
<bookmarks [options]="{ showLoadMore: false }" />
```

## Notes

- Rows use the galactik `List`/`ListItem` (ARIA listbox) — arrow-key navigation, Enter or click to open. The title is limited to two lines. Author and parent-folder tags are shown on a second line when present on the bookmark.
- Clicking a bookmark re-runs its query against the live search backend — offline in this demo, it has no visible effect beyond the click itself.
- The hover-revealed delete action works in this demo: it removes the row locally instead of calling the real `UserSettingsStore.unbookmark` (which persists via the backend).
