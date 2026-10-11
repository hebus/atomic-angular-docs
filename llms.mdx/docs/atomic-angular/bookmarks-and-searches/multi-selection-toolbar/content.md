# Multi-selection toolbar (/docs/atomic-angular/bookmarks-and-searches/multi-selection-toolbar)

A floating action bar that appears once the user has multi-selected documents — add to a collection, export, or attach to an AI assistant — backed by the shared SelectionStore.



`<multi-selection-toolbar>` is the bar that slides up from the bottom of the screen once the user has selected
more than one document — add them all to a collection, export them, or (when the app's assistant feature
allows it) attach them to an AI overview. It reads the current selection from `SelectionStore` and needs
nothing wired to know when to appear.

<Callout title="Concept — the two kinds of selection">
  `SelectionStore` holds two independent things: the single currently-**open** article (`article`), and the
  **multi-selection** (`multiSelection`, an `Article[]`) the toolbar acts on.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="multi-selection-toolbar-basic" title="The toolbar, reacting to the shared selection store">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject } from "@angular/core";
    import { MultiSelectionToolbarComponent } from "@sinequa/atomic-angular";
    import { SelectionStore } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "sample-component",
      imports: [MultiSelectionToolbarComponent],
      template: `<multi-selection-toolbar variant="dark" />`,
    })
    export class SampleComponent {
      private readonly selection = inject(SelectionStore);

      // Whatever UI lets the user tick rows calls this — a checkbox column, a
      // ctrl/shift-click handler — the toolbar itself has no selection UI of its own.
      protected toggle(article: Article) {
        this.selection.addArticleToMultiSelection(article);
      }
    }
    ```
  </Lang>
</CodeSample>

The toolbar is invisible (`opacity-0`, translated off-screen) whenever `SelectionStore.multiSelectCount()` is
zero — there is no `hidden`/`shown` input to manage yourself.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Host[&#x22;Host app&#x22;] -- &#x22;addArticleToMultiSelection() / removeArticleFromMultiSelection()&#x22; --> Store[&#x22;SelectionStore&#x22;]
    Store -- &#x22;multiSelectCount()&#x22; --> Toolbar[&#x22;MultiSelectionToolbarComponent&#x22;]
    Toolbar -- &#x22;Add to collection&#x22; --> AddDialog[&#x22;AddToCollection.call(multiSelection)&#x22;]
    Toolbar -- &#x22;Export&#x22; --> ExportDialog[&#x22;Export.call(ids)&#x22;]
    Toolbar -- &#x22;Add to AI overview&#x22; --> Store
    AddDialog -- &#x22;on remove (dialog-no)&#x22; --> Clear[&#x22;clearMultiSelection()&#x22;]"
/>

"Add to collection" reuses the same [`AddToCollection`](../collections-and-labels/collections.mdx#adding-the-current-selection-to-a-collection)
callable a single-document flow would call, passed the whole `multiSelection` array at once — the dialog
already accepts one article or an array. If every selected document ends up removed from the target collection
(the dialog resolves `"dialog-no"`), the toolbar clears the selection on the assumption the user is done with
it.

## Options [#options]

<TypeTable
  type="{
  class: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;Additional CSS classes merged into the computed variant classes.&#x22; },
  variant: { type: '&#x22;dark&#x22; | &#x22;light&#x22; | &#x22;glassy&#x22;', default: '&#x22;dark&#x22;', description: &#x22;Visual style of the bar.&#x22; },
  updatedCollections: { type: &#x22;OutputEmitterRef<void>&#x22;, description: &#x22;Fires once AddToCollection resolves with an actual add or remove (not on a plain dismiss).&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The &#x22;Add to AI overview&#x22; action never appears">
    Gated behind `AppStore`'s assistant feature configuration
    (`appFeatures.features.assistant`) for an instance resolved as `<app-name>-search-results-assistant` (or plain
    `search-results-assistant`, depending on `usePrefixName`) — it only shows once that assistant instance exists
    and has `modeSettings.enabledUserInput` set. Confirm the assistant feature is actually configured for the app
    before assuming the button is broken.
  </Accordion>

  <Accordion title="Selecting many documents doesn't clear after adding them to a collection">
    Only removing **every** selected document from a collection (the dialog resolving `"dialog-no"`) clears the
    selection automatically — adding them (`"dialog-yes"`) deliberately leaves the selection in place, so the user
    can immediately act on the same set again (export it next, say). Clear it yourself if your flow expects the
    opposite.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Collections" href="../collections-and-labels/collections.mdx">
    What "Add to collection" actually does with the selected documents.
  </Card>

  <Card title="Bookmarks" href="./bookmarks.mdx">
    Marking one document at a time, rather than a batch.
  </Card>
</Cards>
