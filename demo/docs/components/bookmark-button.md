# Bookmark Button

An icon button that bookmarks or un-bookmarks a document, and shows whether it is bookmarked.

## Imports

```ts
import { BookmarkButtonComponent } from "@sinequa/atomic-angular";
```

## Example

The filled icon and `aria-pressed` reflect `UserSettingsStore.isBookmarked(article)`. A click toggles the bookmark and shows a success notification. The demo uses an in-memory stand-in for the store, so nothing is saved.

<demo-bookmark-button-basic></demo-bookmark-button-basic>

```html
<bookmark-button [article]="article" />
```

## Variants and sizes

`variant` and `size` are passed to the inner galactik `button`.

<demo-bookmark-button-variants></demo-bookmark-button-variants>

```html
<bookmark-button [article]="article" size="sm" />
<bookmark-button [article]="article" size="md" />
<bookmark-button [article]="article" variant="secondary" size="md" />
```

## Filing in collections

Set `target="collections"` to write to the collections instead of the bookmarks. A click opens the "add to collection" panel under the button (add the document to a collection, remove it, or create one), and the button reads as pressed when the document is in at least one collection. Bookmarks are left alone. The default, `target="bookmarks"`, is the behaviour described above.

<demo-bookmark-button-collections></demo-bookmark-button-collections>

```html
<bookmark-button [article]="article" target="collections" />
```

## Notes

- The article needs an `id`: without one, a click does nothing.
- The accessible name is real text (`sr-only`) plus a tooltip, not an `aria-label` alone.
- The click calls `stopPropagation()`, so the button can sit inside a clickable row or card.
- When bookmarking, the button records the `queryName` of the deepest active route.
- Use `tabIndex` when a roving tabindex or an `@angular/aria` grid cell manages the focus.
- To list the bookmarks, see the Bookmarks page.

## API Reference

### BookmarkButtonComponent

| Input      | Type                                  | Default       | Description                                             |
| ---------- | ------------------------------------- | ------------- | ------------------------------------------------------- |
| `article`  | `Partial<Article>` (required)         |               | The document to bookmark. Needs an `id`.                |
| `variant`  | `ButtonVariants["variant"]`           | `"tertiary"`  | Button variant.                                         |
| `size`     | `ButtonVariants["size"]`              | `"md"`        | Button size.                                            |
| `target`   | `"bookmarks" \| "collections"`        | `"bookmarks"` | Where a click files the document. `collections` opens the add-to-collection panel. |
| `tabIndex` | `number \| undefined`                 | `undefined`   | Tab index of the inner button. Leave unset for natural. |

| Method              | Description                                       |
| ------------------- | ------------------------------------------------- |
| `bookmark(e: Event)` | Toggles the bookmark. Stops the event's propagation. |
