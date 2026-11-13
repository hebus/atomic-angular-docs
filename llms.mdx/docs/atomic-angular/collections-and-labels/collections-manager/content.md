# Collections manager (/docs/atomic-angular/collections-and-labels/collections-manager)

A page to manage the user's collections — grid or list, filter, create, delete — with a detail view of one collection (rename it, preview its documents) and an action that applies it to the filters.



`<collections-manager>` is the page-sized way to manage collections: every collection as a grid or a list, a
filter, creation and deletion, and a detail view that lists the documents of one collection: the user can rename the
collection, preview a document beside the list, and take documents out. From the list or from the detail, a collection can be **applied to the filters**, which opens the search
page scoped to it. For a compact list in a popover, use the [collections list](./collections.mdx) instead.

<Callout title="Concept — apply to the filters">
  Applying a collection means opening `/search?b=<name>`: the search page then only returns the documents that are in
  that collection. `b` is the URL key of `QueryParamsStore.basket`, and the store is written **before** navigating
  (see [Pitfalls](#pitfalls)).
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="collections-manager-basic" title="The collections manager">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { CollectionsManager } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [CollectionsManager],
      // The component fills the height of its parent and scrolls its own content: give it a height.
      host: { class: "block h-screen" },
      template: `<collections-manager />`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

It reads `UserSettingsStore.baskets`, so nothing needs to be passed in. The user's settings must be loaded, as for
every collections feature.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Manager[&#x22;CollectionsManager&#x22;] --> List[&#x22;List view: CollectionCard or CollectionRow&#x22;]
    Manager --> Detail[&#x22;CollectionDetail&#x22;]
    List -- &#x22;click on a card&#x22; --> Detail
    List -- &#x22;Apply&#x22; --> Apply[&#x22;apply(collection)&#x22;]
    Detail -- &#x22;Apply to the filters&#x22; --> Apply
    Apply -- &#x22;applied output&#x22; --> Host[&#x22;Host application&#x22;]
    Apply -- &#x22;navigateOnApply&#x22; --> Search[&#x22;patch QueryParamsStore, then /search?b=name&#x22;]
    List -- &#x22;New collection&#x22; --> Create[&#x22;CreateCollection dialog&#x22;]
    List -- &#x22;cross or swipe&#x22; --> Delete[&#x22;DeleteCollection dialog&#x22;]
    Detail -- &#x22;cross on a document&#x22; --> Remove[&#x22;removeFromBasket&#x22;]
    Detail -- &#x22;pencil next to the name&#x22; --> Rename[&#x22;updateBasket&#x22;]
    Detail -- &#x22;click on a document&#x22; --> Preview[&#x22;preview-content in a resizable panel&#x22;]
    Bookmarks[&#x22;Bookmarks tab&#x22;] -- &#x22;click on a bookmark&#x22; --> Preview
    Detail -- &#x22;documents&#x22; --> Query[&#x22;QueryService.search scoped by basket&#x22;]"
/>

* **The list** shows a card per collection (a row in list mode) with its name, the number of documents, an **Apply**
  button and a delete cross. A click on the card, or on its name, opens the detail. The cross shows on hover; on a
  touch screen a row is deleted by dragging it to the left, and the cross stays in the page for screen readers.
* **The width.** The manager fills its parent. The list views (the grid, the list, their header and toolbar) are
  centered and stop at `max-w-4xl` (56rem), however wide the parent is: a row stretched over a very wide screen puts
  the name and its delete cross a screen apart. The detail caps and centers only its head (back, name, count, apply) and its rows: the head stays in place when a
  preview opens, only the list slides, and the preview can use the room. The scrollbar
  of the list stays at the edge of the parent. The Bookmarks tab follows the detail: its rows stop at `max-w-4xl`, centered when alone and moved to the
  left, with the same slide, when a preview opens, so that the preview can use the room.
* **The filter** matches names ignoring case and accents, and marks the match in the name.
* **A long name** takes two lines, then is cut. A tooltip with the whole name shows only when the name is actually
  cut, and the full name shows while the name has the keyboard focus.
* **The detail** loads the documents of the collection through a query scoped by `basket` (100 at most): the user's
  settings only keep their ids. Taking a document out writes the store, and the list follows without another
  request.
* **Renaming** a collection: the pencil next to its name turns the name into a field. Enter or the check saves
  (`UserSettingsStore.updateBasket`), Escape or the cross gives up. A name another collection already has is refused
  as it is typed, however it is cased, and so is an empty one. The detail stays open on the renamed collection.
* **Previewing** a document: a click on a document opens `<preview-content>` on the right of the list, in a
  resizable panel. The user drags the handle (or uses the arrow keys on it) to give the preview more or less room;
  the list never goes under a third of the width, and the chosen layout is remembered in `localStorage` under
  `collection-detail`. The preview closes with its cross, with the Escape key (not while the focus is inside the
  document itself, an iframe, which keeps the key), or when its document is taken out of the collection. When a
  preview opens, the list slides from the center to the left, and back to the center when it closes, unless the user
  asked for reduced motion. On a detail narrower than 640px (the width of the component, not of the window) there is
  no room for both: the preview replaces the list. The preview shows the document alone: its action bar (search,
  zoom, pages) is hidden with `showActions`.
* **Empty states** all show an icon on a colored tile with a message: no collection yet, no collection matching the
  filter, an empty collection.

## Recipes [#recipes]

### Apply a collection yourself [#apply-a-collection-yourself]

Set `navigateOnApply` to `false` and handle `applied`. Use it when the application opens its search page another
way, or needs to do something else first.

<CodeSample id="collections-manager-applied" title="Handling the apply action in the application">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject } from "@angular/core";
    import { Router } from "@angular/router";
    import { type Basket, CollectionsManager } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [CollectionsManager],
      host: { class: "block h-screen" },
      template: `<collections-manager [navigateOnApply]="false" (applied)="open($event)" />`,
    })
    export class SampleComponent {
      private readonly router = inject(Router);

      protected open(collection: Basket): void {
        void this.router.navigate(["/results"], { queryParams: { b: collection.name } });
      }
    }
    ```
  </Lang>
</CodeSample>

### Apply a collection from your own component [#apply-a-collection-from-your-own-component]

`injectApplyCollection()` is the function the manager and `<collections>` use. It writes the basket into
`QueryParamsStore`, then navigates to `/search?b=<name>`.

<CodeSample id="collections-manager-apply-fn" title="A button that applies a collection">
  <Lang value="angular">
    ```ts title="apply-button.component.ts"
    import { Component, input } from "@angular/core";
    import { injectApplyCollection } from "@sinequa/atomic-angular";

    @Component({
      selector: "apply-button",
      template: `<button type="button" (click)="apply()">Show this collection</button>`,
    })
    export class ApplyButtonComponent {
      readonly name = input.required<string>();

      private readonly applyCollection = injectApplyCollection(); // an injection context: a field initializer

      protected apply(): void {
        void this.applyCollection({ name: this.name() });
      }
    }
    ```
  </Lang>
</CodeSample>

### Open the creation dialog [#open-the-creation-dialog]

The **New collection** button opens `CreateCollection`, a callable like `AddToCollection` and `DeleteCollection`. It
names an empty collection and resolves `"dialog-yes"` once it is created.

<CodeSample id="collections-manager-create" title="Creating a collection from a button">
  <Lang value="angular">
    ```ts title="new-collection-button.component.ts"
    import { Component, inject, Injector } from "@angular/core";
    import { CreateCollection } from "@sinequa/atomic-angular";

    @Component({
      selector: "new-collection-button",
      template: `<button type="button" (click)="create()">New collection</button>`,
    })
    export class NewCollectionButtonComponent {
      private readonly injector = inject(Injector);

      protected async create(): Promise<void> {
        const result = await CreateCollection.call({}, { injector: this.injector });
        if (result === "dialog-yes") console.log("Collection created");
      }
    }
    ```
  </Lang>
</CodeSample>

An empty name is reported only once **Create** is pressed, not when the field loses the focus (leaving it for
**Cancel** is not an error). A name that is already taken is reported as it is typed, whatever its case.

## Moving documents and migrating bookmarks [#moving-documents-and-migrating-bookmarks]

In the detail of a collection, tick documents and choose &#x2A;*Move to…**: the panel lists the other collections, and
offers to create one. The documents are added to the chosen collection first, then taken out of the source, so a
failure never loses them.

While the user still has bookmarks, a **Bookmarks** tab sits above the list. A click on a bookmark opens its document in
the same preview as a document of a collection: `<preview-content>` on the right of the list, in a resizable panel,
replacing the list when the component is narrow. A bookmark only keeps what the old list showed (id, label, source,
author), so the preview looks the document up by its id, with the current query of the application, not the one the
bookmark was made from. Bookmarks can also be ticked and moved to a collection the same way, which is how old
bookmarks are migrated; the tab disappears with the last bookmark. A moved document is loaded again by the
collection's detail, with the default query of the application.

To make the bookmark button of a result write to the collections instead, set `target`:

```html
<bookmark-button [article]="article" target="collections" />
```

## Options [#options]

<TypeTable
  type="{
  navigateOnApply: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description:
      &#x22;Input. Open /search?b=<name> when a collection is applied. Set to false to handle the applied output yourself.&#x22;,
  },
  applied: {
    type: &#x22;OutputEmitterRef<Basket>&#x22;,
    description: &#x22;Output. The user applied this collection to the filters, from the list or from its detail.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The component is blank, or its list does not scroll">
    The manager fills the height of its parent (`h-full`) and scrolls its own content. In a parent with no height, it
    collapses to nothing. Give the parent a height (`h-screen`, a flex child with `min-h-0 flex-1`, a fixed height in a
    demo).
  </Accordion>

  <Accordion title="Applying a collection shows an empty result">
    `injectApplyCollection()` writes `QueryParamsStore.basket` (with `syncUrl: false`) **before** navigating: the store
    update is synchronous, the navigation is not, and the search page must see the basket when it fires its first
    query. If you handle `applied` yourself, do the same, or the page may evaluate its empty-search guard without the
    basket. See the pitfalls of the [collections list](./collections.mdx#pitfalls).
  </Accordion>

  <Accordion title="Opening a collection shows a loading error, or fewer documents than its counter">
    The documents come from `QueryService.search` with the default query of the application (`basket` set, empty
    text), 100 at most. A failed request shows an error with a **Retry** button. The counter comes from the ids stored
    in the user's settings, so a document that no longer exists, or that the user cannot read any more, is counted but
    not listed; the detail then says how many more documents the collection holds. The search also overwrites
    `QueryService.result()`, which the search page does anyway on arrival.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Collections list" href="./collections.mdx">
    The compact list for a popover, and the add-to-collection dialog.
  </Card>

  <Card title="Multi-selection toolbar" href="../bookmarks-and-searches/multi-selection-toolbar.mdx">
    Add the selected documents to a collection.
  </Card>
</Cards>
