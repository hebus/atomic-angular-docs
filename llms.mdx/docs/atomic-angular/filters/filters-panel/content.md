# Filters panel (/docs/atomic-angular/filters/filters-panel)

The filters column of a search page in one piece — facets with a search field, and the user's quick filters.



`<filters-panel>` is the content of the filters column of a search page: a header with a close button, a switch between two
views, and the view itself. It holds the [Aside filters](./aside-filters.mdx) and the [Quick filters](./quick-filters.mdx) of the
user, which it drives from the same stores as they do: nothing to wire but the count of documents and what to do on close.

The panel is the content only. It fills the height it is given and scrolls inside; whether it is a column next to the results,
an overlay or a sheet, and the card around it, belong to the page.

## Minimal example [#minimal-example]

<CodeSample id="filters-panel-basic" title="A filters column">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { FiltersPanelComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [FiltersPanelComponent],
      template: `
        @if (open()) {
          <aside class="h-96 w-80">
            <filters-panel [documentCount]="1060" (closed)="open.set(false)" />
          </aside>
        }
      `,
    })
    export class SampleComponent {
      readonly open = signal(true);
    }
    ```
  </Lang>
</CodeSample>

## The two views [#the-two-views]

**All** shows the facets of the search, as `<aside-filters>` does (the `position` and `hidden` rules of the `filters` configuration).
The field above narrows them by name; with no match, a message replaces them. Under the field, a bar holds the count of documents
and **Save as Quick Filter**, which opens a card under the button asking for a name and saves the filters applied at that moment.
The button is disabled while no filter is applied. `Escape` closes the card only, and the focus goes back to the button.

**Quick Filters** is the list of the [Quick filters](./quick-filters.mdx) pill, inline (`<quick-filters-list>`), one line each:

* a click **replaces all the applied filters** by the quick filter's own, and keeps the rest of the query — the text above all;
* hovering (or focusing) a line shows its filters as chips in a card; `Escape` closes the card before anything else;
* the cross, shown when the line is hovered or holds the focus (and `Del` on the line), deletes the quick filter and says so with a toast;
* with none saved, the empty state says how to make one.

## Options [#options]

<TypeTable
  type="{
  documentCount: {
    type: &#x22;number&#x22;,
    default: &#x22;0&#x22;,
    description: &#x22;How many documents the search found: the count under the field, written with the number format of the interface language. The panel does not run the search.&#x22;,
  },
  closed: {
    type: &#x22;output<void>&#x22;,
    description: &#x22;Emitted when the user presses the close button of the header. Closing is the host's: it decides how the panel is shown.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The panel is empty or has no height">
    It fills `100%` of its parent and scrolls inside, so the parent needs a height (a fixed one, or a flex/grid cell that has one).
    The host element is `display: block` with `min-height: 0` for the same reason.
  </Accordion>

  <Accordion title="Save as Quick Filter is disabled">
    By design while no filter is applied: a quick filter with no filter would apply nothing. The count it checks is that of the
    values of the query's filters (`QueryParamsStore.filters()`), a group being counted through the filters it holds.
  </Accordion>

  <Accordion title="Quick filters do not appear or are not saved">
    They live in the user settings (`UserSettingsStore`), loaded with the application. The save fails silently for the panel when the
    store refuses it (no name, or the request failed); the card then stays open.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Aside filters" href="./aside-filters.mdx">
    The facets of the "All" view, usable on their own.
  </Card>

  <Card title="Quick filters" href="./quick-filters.mdx">
    The pill version of the user's quick filters.
  </Card>

  <Card title="Applied filters" href="./applied-filters.mdx">
    The chips of the filters in use, usually above the results.
  </Card>
</Cards>
