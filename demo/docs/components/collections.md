# Collections

Lists the current user's saved collections (baskets). Backed by `UserSettingsStore.baskets`, it renders each collection as a clickable row that opens a search scoped to it, with a delete action revealed on hover. To create one, see the [Add to Collection](/components/add-to-collection) dialog.

## Demo

<demo-collections-basic></demo-collections-basic>

```html
<collections [options]="{ showLoadMore: false }" />
```

## Inputs

| Input     | Type                | Default                                                                 | Description                                                                            |
| --------- | ------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `options` | `CollectionsConfig` | `{ itemsPerPage: 10, showLoadMore: false, routerLink: '/collections' }` | Pagination size, whether to show a "load more" button, and the "see more" link target. |

## Inside a popover

Hosted in a galactik popover (a native `popover` element handled by `PopoverDirective`), the feature finds the ancestor directive and shows its own floating title — it is hidden in the inline example above, where the page already names the list.

<demo-collections-popover></demo-collections-popover>

```html
<button popovertarget="collections-popover" variant="secondary" size="md">Collections</button>

<div popover id="collections-popover" class="p-2" placement="bottom-start" [matchTriggerWidth]="false">
  <collections [options]="{ showLoadMore: false }" />
</div>
```

## Long names

A name that does not fit on one line wraps: the row grows with its content, and the hover background covers every line.

<demo-collections-multiline></demo-collections-multiline>

```html
<div class="max-w-xs">
  <collections [options]="{ showLoadMore: false }" />
</div>
```

## Narrow container

In a very narrow container (sidebar, small popover) long and short names sit side by side; each row grows to hold its name.

<demo-collections-narrow></demo-collections-narrow>

```html
<div class="w-56">
  <collections [options]="{ showLoadMore: false }" />
</div>
```

## Pagination

With more collections than `itemsPerPage`, the footer shows a "load more" button.

<demo-collections-pagination></demo-collections-pagination>

```html
<collections [options]="{ itemsPerPage: 5, showLoadMore: true }" />
```

## Empty state

<demo-collections-empty></demo-collections-empty>

```html
<collections [options]="{ showLoadMore: false }" />
```

## Notes

- Rows use the galactik `List`/`ListItem` (ARIA listbox) — arrow-key navigation, Enter or click to open.
- The hover-revealed delete action opens the real `DeleteCollection` confirmation dialog; confirming removes the row locally instead of calling the real `UserSettingsStore.deleteBasket` (which persists via the backend).
