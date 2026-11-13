# Collections Manager

Manages the current user's collections (baskets) in one component, with two views: the **list** of collections and the **detail** of one of them. Backed by `UserSettingsStore.baskets`, it needs no input. To only show a compact list in a popover, see [Collections](/components/collections).

## Demo

Try the whole flow: create a collection, filter, switch between grid and list, open a collection to rename it, preview a document, take documents out of it, delete one, and apply one to the filters. The demo has no `/search` page, so applying a collection only reports it under the demo. To judge it as an application page (the whole width and height, a very wide screen, the preview's height), open the [full-page version](/demo-collections).

<demo-collections-manager-basic></demo-collections-manager-basic>

```html
<collections-manager />
```

## The list

- **Grid or list**: the toggle next to the filter. The grid shows a card per collection, the list one row.
- **Filter**: by name, ignoring case and accents; the match is marked in the name.
- **New collection**: names an empty collection. An empty name is refused once a submission is attempted, a name already taken is refused as it is typed.
- **Delete**: asks for confirmation, then removes the collection. The documents are not deleted, only the collection.
- **Open**: a click on the card (or on its name) opens the detail.
- **Apply**: the button on each card applies the collection to the filters.

A name is shown on two lines, then cut. The cut name carries a tooltip with the whole name, and the full text is shown while the name has the keyboard focus. The delete button is always visible on touch screens.

## The detail

The name of the collection, which the pencil next to it turns into a field (Enter or the check saves, Escape gives up; a name another collection already has is refused). Under it, the documents of the collection, each with a checkbox and a button to take it out of the collection, and the **Apply to the filters** button. The documents are loaded through a query scoped to the collection (`basket`), 100 at most, since the user settings only keep their ids. Taking one out writes the store, and the list follows without another request.

A click on a document opens its **preview** on the right of the list: the real `<preview-content>`, in a resizable panel. Drag the handle between the two to give the preview more room, the list keeps a minimum width. The demo has no backend: `PreviewService` is replaced by a stub that serves the same sample document whichever document is clicked. The preview closes with its cross or with the Escape key (not while the focus is inside the document itself, an iframe, which keeps the key). The list slides from the center to the left when it opens, and back when it closes, unless the user asked for reduced motion. The preview shows the document alone (its action bar is hidden). When the component itself is narrow (under 640px, try the phone width above the demo), the preview replaces the list, and its cross brings the list back.

Tick documents and choose **Move to…** to move them to another collection, an existing one or a new one. They are added to the target first, then taken out of this collection, so a failure never loses them.

## Bookmarks

A user who still has bookmarks (kept before collections existed) gets a **Bookmarks** tab above the list. A click on a bookmark opens its document in the same preview as a document of a collection, on the right of the list (resizable, and replacing the list when the component is narrow); ticked bookmarks can be moved to a collection, which is how they are migrated, or removed one by one. The tab goes away once the last bookmark is moved.

<demo-collections-manager-bookmarks></demo-collections-manager-bookmarks>

**Simulate an outdated bookmark** adds a bookmark whose document is gone from the index, at the top of the Bookmarks tab. Opening it shows the preview as unavailable (the demo's stand-in for the preview service fails for it, as the backend would). The library renders no toast itself (`notify.*()` only dispatches a `notification` event on `window`, for the application's toaster): this demo shows the notifications in a small list under the manager.

A bookmark only keeps an id, so a moved document is loaded again by the collection's detail, with the default query of the application. To make the result's bookmark button write to the collections, see [Bookmark Button](/components/bookmark-button).

## Applying a collection to the filters

Applying opens `/search?b=<name>`. The basket is written to `QueryParamsStore` **before** navigating: `patchState` is synchronous while the router is not, so the search page must already see the basket when it fires its first query. The same function is exported for your own components:

```typescript
import { injectApplyCollection } from "@sinequa/atomic-angular";

const apply = injectApplyCollection(); // in an injection context
apply({ name: "my collection" });
```

An application that handles it itself sets `navigateOnApply` to `false` and listens to `applied`:

```html
<collections-manager [navigateOnApply]="false" (applied)="open($event)" />
```

## Long names

<demo-collections-manager-narrow></demo-collections-manager-narrow>

```html
<div class="max-w-md">
  <collections-manager />
</div>
```

## No collection

<demo-collections-manager-empty></demo-collections-manager-empty>

## Inputs and outputs

| Name              | Type              | Default | Description                                                                                 |
| ----------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------- |
| `navigateOnApply` | `boolean` (input) | `true`  | Open `/search?b=<name>` when a collection is applied. Set to `false` to handle it yourself. |
| `applied`         | `Basket` (output) |         | The user applied this collection to the filters, from the list or from its detail.          |

## Notes

- The component fills its parent's height and scrolls its content: give it a container with a height.
- It reuses the `DeleteCollection` dialog of the compact list, and adds a `CreateCollection` callable (`await CreateCollection.call({}, { injector })`).
