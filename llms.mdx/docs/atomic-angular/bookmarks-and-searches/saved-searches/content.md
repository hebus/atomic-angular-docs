# Saved searches (/docs/atomic-angular/bookmarks-and-searches/saved-searches)

Name and store a whole search — text, filters, sort, everything the URL carries — behind a starred toggle button, and reopen it later from a paginated list.



A bookmark remembers one document; a **saved search** remembers a whole search state — the query text, every
applied filter, the sort order — as the URL that reproduces it. `<saved-search-popover>` is the starred toggle
that saves or unsaves the *current* search in one click; `<saved-searches>` is the paginated list of everything
the user has saved.

<Callout title="Concept — a saved search is a URL">
  `SavedSearchesService` stores each saved search as its full URL (`SearchItem.url`), not as a structured filter
  object. Reopening one means navigating to that URL — `navigateToSearch()` parses it back into query params — so
  a saved search stays valid across app versions as long as the URL scheme itself does.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="saved-searches-toggle" title="A starred toggle for the current search">
  <Lang value="angular">
    ```ts title="search-toolbar.component.ts"
    import { Component, signal } from "@angular/core";
    import { SavedSearchPopover } from "@sinequa/atomic-angular";
    import type { SearchItem } from "@sinequa/atomic-angular";

    @Component({
      selector: "search-toolbar",
      imports: [SavedSearchPopover],
      template: `
        <saved-search-popover [queryText]="searchInputText()" (onSavedSearch)="onSavedSearch($event)" />
      `,
    })
    export class SearchToolbarComponent {
      protected readonly searchInputText = signal("quarterly report");

      protected onSavedSearch(search: SearchItem | undefined) {
        // Fires only when *unsaving* — saving happens inside the dialog the popover opens.
        console.log("Unsaved:", search);
      }
    }
    ```
  </Lang>
</CodeSample>

The popover reads whether the current search is already saved from `UserSettingsStore.getSavedSearch(queryText)`
— there is no separate "saved" input to keep in sync yourself.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Popover[&#x22;SavedSearchPopover&#x22;] -- &#x22;already saved?&#x22; --> Store[&#x22;UserSettingsStore&#x22;]
    Popover -- &#x22;not saved: opens&#x22; --> Dialog[&#x22;SavedSearchDialog (SavedSearch.call)&#x22;]
    Dialog -- &#x22;confirm(name)&#x22; --> Service[&#x22;SavedSearchesService.saveSearch()&#x22;]
    Popover -- &#x22;already saved: unsaves directly&#x22; --> Service2[&#x22;SavedSearchesService.deleteSavedSearch()&#x22;]
    Service --> Store
    Service2 --> Store
    List[&#x22;SavedSearchesComponent&#x22;] -- &#x22;reads savedSearches()&#x22; --> Store
    List -- &#x22;itemClick(search)&#x22; --> Navigate[&#x22;navigateToSearch() — parses the stored URL&#x22;]"
/>

Saving and unsaving are asymmetric on purpose: saving needs a name, so it always goes through
`SavedSearchDialog`; unsaving an already-named search needs no further input, so the popover calls
`SavedSearchesService.deleteSavedSearch()` directly, with no confirmation dialog.

## Recipes [#recipes]

### The full list, with filter counts and relative dates [#the-full-list-with-filter-counts-and-relative-dates]

<CodeSample id="saved-searches-list" title="Every saved search, as a list">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { SavedSearchesComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [SavedSearchesComponent],
      template: `<saved-searches />`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

Each row shows a badge with the number of applied filters and a relative date ("2 days ago"), both derived
from parsing the stored URL — nothing extra to compute on the caller's side.

### Naming and saving explicitly [#naming-and-saving-explicitly]

Calling `SavedSearch` directly — rather than through the popover — is useful from a custom "save" action that
is not a starred toggle.

<CodeSample id="saved-searches-explicit" title="A plain 'Save this search' button">
  <Lang value="angular">
    ```ts title="save-button.component.ts"
    import { Component, inject, Injector } from "@angular/core";
    import { SavedSearch } from "@sinequa/atomic-angular";

    @Component({
      selector: "save-button",
      template: `<button (click)="save()">Save this search…</button>`,
    })
    export class SaveButtonComponent {
      private readonly injector = inject(Injector);

      protected async save() {
        // Resolves once the dialog closes; "dialog-confirm" means the name was saved.
        const result = await SavedSearch.call("quarterly report", { injector: this.injector });
        if (result === "dialog-confirm") console.log("Saved");
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  queryText: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;SavedSearchPopover. The current search's text, used to look it up among already-saved searches.&#x22; },
  onSavedSearch: { type: &#x22;OutputEmitterRef<SearchItem | undefined>&#x22;, description: &#x22;SavedSearchPopover. Fires only when unsaving — the SavedSearch call handles the save path internally.&#x22; },
  options: {
    type: &#x22;SearchesConfig&#x22;,
    description: &#x22;SavedSearchesComponent. { itemsPerPage?, showLoadMore?, routerLink? }, merged over SAVED_SEARCHES_CONFIG's default (10 items, load-more shown, /saved-searches).&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The starred button never shows as already-saved, even right after saving">
    `SavedSearchPopover.savedSearch` recomputes from `queryText()` — confirm the same text that was passed to
    `SavedSearch.call(...)` is also what the popover's `[queryText]` input carries afterwards. A popover bound to a
    signal that changed shape between the two (trimmed differently, say) will not find a match even though the
    search was genuinely saved.
  </Accordion>

  <Accordion title="Deleting a saved search from the list removes the wrong row">
    `SavedSearchesComponent.onDelete` deletes by the **index into the raw `userSettingsStore.savedSearches()`
    array** (`ListPanelDeleteEvent.index`), not by any value comparison — this is handled correctly by the
    component itself, but a custom list built the same way must delete by that same index, not by matching on
    `url` or `label` (two saved searches can legitimately share a display label).
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Recent searches" href="./recent-searches.mdx">
    The same list shape, populated automatically instead of explicitly saved.
  </Card>

  <Card title="Bookmarks" href="./bookmarks.mdx">
    Remembering a single document instead of a whole search.
  </Card>
</Cards>
