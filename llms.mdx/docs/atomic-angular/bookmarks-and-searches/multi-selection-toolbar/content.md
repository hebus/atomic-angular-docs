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

The toolbar is invisible (`opacity-0`, translated off-screen) &#x2A;*and `inert`** whenever
`SelectionStore.multiSelectCount()` is zero — there is no `hidden`/`shown` input to manage yourself. `inert`
is what keeps its buttons out of the tab order while it cannot be seen.

## Keyboard and screen readers [#keyboard-and-screen-readers]

The bar is a `role="toolbar"` named by the `multiSelectionToolbar.label` key. Because it is `inert` while
empty, the lib cannot announce anything *from inside it*: a separate `role="status"` region renders the
selection count ("3 items selected") and nothing when the selection is empty.

Reaching the bar is the application's job, since the lib cannot know how a page lays out its zones. Use the
`hint` input to tell screen reader users how, on the **first** selection only:

```html
<multi-selection-toolbar [hint]="'searchZones.selectionHint' | transloco" (cleared)="focusResults()" />
```

`Escape` inside the bar clears the selection. The bar then becomes `inert` and drops the focus, so the
`cleared` output is where the page puts it back (for example on the results).

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

## The floating variant [#the-floating-variant]

`variant="floating"` is the lexiQ layout: no bar, but detached galactik buttons in the bottom-right corner of
the window — "Add to collection" (accent), "Export" and the optional AI action (secondary). It shows no count:
the page that renders the checkboxes already does.

```html
<multi-selection-toolbar variant="floating" (cleared)="focusResults()" (addedToCollection)="leaveSelectionMode()" />
```

"Add to collection" opens `AddToCollectionPanel` in a popover anchored to the button, instead of the dialog:

* each collection has one button — `+` adds the selected documents, `✓` means they are all there (clicking it
  removes them); a collection that holds only part of them keeps the `+` and says so under its name;
* "New collection" opens a name field at the top of the list, which stays on screen, dimmed (a taken name is
  refused as it is typed; Escape goes back to the list, a second Escape closes the panel). The collection is
  created empty and appears at the top of the list, highlighted, with the focus on its `+`;
* every change is saved at once. After an addition the header confirms it, the panel closes about a second
  later, the selection is emptied (`cleared` fires) and then `addedToCollection` fires with the collection's
  name — the place to leave a "selection mode".

The panel is exported on its own (`AddToCollectionPanelComponent`, outputs `done`, `changed`,
`closeRequested`) for a host that wants it somewhere else, in a sheet for example.

## Options [#options]

<TypeTable
  type="{
  class: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;Additional CSS classes merged into the computed variant classes.&#x22; },
  variant: { type: '&#x22;dark&#x22; | &#x22;light&#x22; | &#x22;glassy&#x22; | &#x22;floating&#x22;', default: '&#x22;dark&#x22;', description: &#x22;Visual style. dark, light and glassy: one bar at the bottom centre of the window. floating: detached buttons in the bottom-right corner, with the collection panel.&#x22; },
  allowAI: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Opt-in of the host app for the \&#x22;Add to AI overview\&#x22; action. Set it to true only if the app embeds an assistant that reads SelectionStore.assistantIdsToAttach — the lib cannot tell whether one exists.&#x22; },
  hint: { type: &#x22;string&#x22;, description: &#x22;Appended to the screen reader announcement on the first selection only (e.g. how to reach the bar). Omitted by default: the lib assumes no shortcut.&#x22; },
  cleared: { type: &#x22;OutputEmitterRef<void>&#x22;, description: &#x22;Fires when the selection is emptied from the bar (the count button or Escape). Restore the focus here — the bar goes inert.&#x22; },
  updatedCollections: { type: &#x22;OutputEmitterRef<void>&#x22;, description: &#x22;Fires once AddToCollection resolves with an actual add or remove (not on a plain dismiss). floating: once the panel closes after any saved change.&#x22; },
  addedToCollection: { type: &#x22;OutputEmitterRef<string>&#x22;, description: &#x22;floating only: the selection has been filed in the named collection; the panel has closed and the selection has been emptied.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The &#x22;Add to AI overview&#x22; action never appears">
    Three conditions must all hold: the host passes `[allowAI]="true"` (it is `false` by default, because the lib
    cannot know whether the app embeds an assistant), `AppStore.isAssistantAllowed()` is true for the instance
    (a `defaultValues.service_id` is configured), and that instance has `modeSettings.enabledUserInput` set. The
    instance is resolved as `<app-name>-search-results-assistant` (or plain `search-results-assistant`, depending on
    `appFeatures.features.assistant.usePrefixName`). Check them in that order before assuming the button is broken.
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
