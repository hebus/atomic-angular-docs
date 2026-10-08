# Collections (/docs/atomic-angular/collections-and-labels/collections)

A paginated list of the user's saved collections (baskets), with an add-to-collection dialog and a delete confirmation — built on the shared ListPanel primitives.



A **collection** (the API calls it a *basket*) is a user-managed group of documents, persisted server-side
through `UserSettingsStore`. `<collections>` renders the current user's collections as a list; the
`AddToCollection` and `DeleteCollection` callables handle adding articles to one and removing one entirely.

<Callout title="Concept — basket">
  A basket is the backend's name for a collection: a named list of document ids, stored per user. `Basket` (from
  `@sinequa/atomic-angular`'s models) is `{ name: string; ids?: string[] }` — the type every component on this
  page reads and writes.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="collections-basic" title="The collections list">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { CollectionsComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [CollectionsComponent],
      template: `<collections />`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

Clicking a collection syncs `QueryParamsStore.basket` and navigates to `/search?b=<name>` — the sync happens
**before** the navigation so a consuming app's own `allowEmptySearch: false` guard already sees the basket by
the time the destination page evaluates it (see [Pitfalls](#pitfalls)).

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Collections[&#x22;CollectionsComponent&#x22;] --> Header[&#x22;ListPanelHeader&#x22;]
    Collections --> Panel[&#x22;ListPanel&#x22;]
    Collections --> Footer[&#x22;ListPanelFooter&#x22;]
    Panel -- &#x22;itemClick(collection)&#x22; --> Collections
    Panel -- &#x22;delete({item, index})&#x22; --> Collections
    Footer -- &#x22;loadMore()&#x22; --> Collections
    Collections -- &#x22;DeleteCollection.call()&#x22; --> DeleteDialog[&#x22;DeleteCollectionDialog&#x22;]
    Collections -- &#x22;patch(basket) then navigate&#x22; --> Router
    DeleteDialog -- &#x22;deleteBasket(index)&#x22; --> UserSettingsStore"
/>

`CollectionsComponent` itself never adds documents to a collection — that is a separate entry point, callable
from anywhere a set of articles is available (a result row, a multi-selection toolbar):

<CodeSample id="collections-add" title="Adding the current selection to a collection">
  <Lang value="angular">
    ```ts title="add-button.component.ts"
    import { Component, inject, Injector } from "@angular/core";
    import { AddToCollection } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "add-button",
      template: `<button (click)="add()">Add to collection…</button>`,
    })
    export class AddButtonComponent {
      private readonly injector = inject(Injector);

      protected async add() {
        // Accepts one article or an array — a multi-selection passes the whole array at once.
        const article: Article = { id: "doc-1", title: "Q3 Report" } as Article;
        const event = await AddToCollection.call(article, { injector: this.injector });

        // "dialog-yes" (added) / "dialog-no" (removed, toggled off) / the raw close event otherwise.
        if (event === "dialog-yes" || event === "dialog-no") {
          console.log("Collections updated");
        }
      }
    }
    ```
  </Lang>
</CodeSample>

The dialog shows a checkbox per collection, checked (or indeterminate, for several articles) if the article is
already in it — ticking one toggles membership immediately, no separate "confirm" step; a "Create collection"
screen at the bottom lets the user start a brand-new one already containing the article(s).

## Options [#options]

<TypeTable
  type="{
  options: {
    type: &#x22;CollectionsConfig&#x22;,
    description:
      &#x22;{ itemsPerPage?, showLoadMore?, routerLink? }. Overrides the COLLECTIONS_CONFIG-provided default (10 items, no load-more, /collections), merged over it.&#x22;,
  },
}"
/>

`CollectionsComponent` has no outputs — clicking a collection navigates directly via the router.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Selecting a collection sometimes shows an empty result, even though the collection has documents">
    Confirm the destination search page's empty-search guard (`allowEmptySearch: false`) reads
    `QueryParamsStore.basket` rather than a component-local copy of the URL — `CollectionsComponent.onClick()`
    already patches the store (with `syncUrl: false`) before navigating, precisely so the guard sees the basket in
    time. A page that derives its own "is this search empty" check from something other than the store can still
    race the navigation.
  </Accordion>

  <Accordion title="A component reading QueryService.result() shows stale data right after selecting a collection">
    If the empty-search guard skips the query, make sure the component consuming `QueryService.result()` treats a
    skipped query the same as a genuinely empty result — a stale previous result left in the signal reads as "the
    collection has these documents", when in fact no query ran.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Labels" href="./labels.mdx">
    Public and private labels on a document, with autosuggest and a bulk-edit dialog.
  </Card>
</Cards>
