# More (/docs/atomic-angular/filters/more)

The overflow surface for filters beyond the filters bar's visible count — a popover on desktop, escalating to a Dialog or a mobile Sheet.



`<more-button>` renders the "More" trigger [Filters bar](./filters-bar.mdx) shows once more filters are
authorized than fit — its content, `<more>`, is a list of the filters that opens one at a time (or, with
`layout="accordion"`, the same stacked-facet accordion as [Aside filters](./aside-filters.mdx)), shown inside an overlay
instead of a persistent sidebar.

## Minimal example [#minimal-example]

<CodeSample id="more-button-basic" title="The overflow button, standalone">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { MoreButtonComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [MoreButtonComponent],
      template: ` <more-button [count]="3" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

`count` is how many authorized filters are already shown elsewhere (typically the bar's own `filtersCount`) —
`<more-button>` renders everything **beyond** that.

## How it works [#how-it-works]

`<more-button>` picks its container by context, never the same one twice on a given viewport:

<Mermaid
  chart="flowchart TD
    A[&#x22;more-button&#x22;] --> B{&#x22;isMobile()?&#x22;}
    B -->|&#x22;yes&#x22;| C[&#x22;Sheet, bottom, size lg&#x22;]
    B -->|&#x22;no&#x22;| D{&#x22;enrichedThreshold set and overflow count exceeds it?&#x22;}
    D -->|&#x22;yes&#x22;| E[&#x22;modal Dialog&#x22;]
    D -->|&#x22;no&#x22;| F[&#x22;anchored Popover&#x22;]
    C --> G[&#x22;More component&#x22;]
    E --> G
    F --> G"
/>

Above 6 overflow filters, `<More>` itself grows a facet-name search box, independently of which container it
renders inside — a popover with many facets is otherwise as hard to scan as a sidebar with many facets.

In the popover each facet keeps its header (its title and the chevron that collapses and expands it), without a border
between two facets. Under the search field of an open facet sits the same bar as in a filter button's popover:
**Clear all** and **Apply**, with a **Select all** row above the items of a list or tree facet; a date facet, which has no
search field, shows the bar at its top. The trigger reads
"More" (`filters.more`; "Plus" in French, "Mehr" in German), and its accessible name stays "More filters".

The popover can be resized in height, as a filter button's one: a handle on its top edge (which keeps the bottom edge
where it is) and one on its bottom edge (hidden when there is no room under the popover). The handles take the mouse, a
finger and the keyboard: they are focusable separators, Up and Down move them by 16px, Home goes to the smallest height and
End to the largest. The list of facets fills the height it is given and scrolls. From the first resize the popover stays
where it is while it is open, instead of flipping or shifting under the pointer; closing it, or scrolling the page, lets
Floating UI place it again, and the height the user chose is kept. The Dialog and the mobile Sheet are not resizable.

## Recipes [#recipes]

### Escalate to a modal past a threshold [#escalate-to-a-modal-past-a-threshold]

<CodeSample id="more-button-enriched" title="Popover up to 6 overflow filters, Dialog beyond">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { MoreButtonComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [MoreButtonComponent],
      template: ` <more-button [count]="3" [enrichedThreshold]="6" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### `<More>` alone, inside a custom container [#more-alone-inside-a-custom-container]

Reach for `<more>` directly (skipping `<more-button>`'s own popover/dialog/sheet selection) when it needs to
sit inside a container you already control:

<CodeSample id="more-standalone" title="The stacked facets, inside your own overlay">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { MoreComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [MoreComponent],
      template: `
        <div class="max-h-[60vh] overflow-y-auto">
          <more [count]="3" [hideWhenEmpty]="true" />
        </div>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  count: { type: &#x22;number&#x22;, default: &#x22;2&#x22;, description: &#x22;Filters already shown elsewhere; everything authorized beyond this renders here.&#x22; },
  position: { type: &#x22;Placement&#x22;, default: '&#x22;bottom-end&#x22;', description: &#x22;Desktop popover placement.&#x22; },
  lockPosition: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22; },
  includedFilters: { type: &#x22;string[]&#x22;, default: &#x22;[]&#x22; },
  excludedFilters: { type: &#x22;string[]&#x22;, default: &#x22;[]&#x22; },
  aggregations: { type: &#x22;Aggregation[] | undefined&#x22; },
  homepage: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22; },
  hideWhenEmpty: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Relayed to every <Aggregation [hideWhenEmpty]> in the overflow list.&#x22; },
  layout: {
    type: '&#x22;drilldown&#x22; | &#x22;accordion&#x22;',
    default: '&#x22;drilldown&#x22;',
    description: &#x22;Collapsible sections, or a list of facets that opens one at a time under a header with a back button.&#x22;,
  },
  applyOnSelect: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Relayed to every <Aggregation [applyOnSelect]>: a gesture applies at once. In drilldown the opened facet then stays open.&#x22; },
  enrichedThreshold: {
    type: &#x22;number | undefined&#x22;,
    description: &#x22;Above this many overflow filters, escalate the desktop Popover to a modal Dialog. Unset: never escalate, whatever the count.&#x22;,
  },
}"
/>

## Layout [#layout]

By default (`layout="drilldown"`, `moreLayout` on `<filters-bar>`) the container has two screens: the
list of the facets (icon, name, number of values applied, chevron), then the picked facet alone, under a header with a
back button. Both screens have the same height, so the popover does not jump, and the facet's own list is the one
scroller. Applying a facet brings the list back (unless `applyOnSelect` is set: the facet then stays open so several
values can be ticked in a row), **Escape** closes the whole popover, the focus moves into the facet when it opens (its
search field, or its name when it has none) and returns to its row on the way back.

A facet with nothing to pick and nothing applied stays in the list, dimmed and inert (`hideWhenEmpty` removes it).

`layout="accordion"` keeps every filter as a collapsible section of one scrolling list. Its facet headers are dressed like
the rows of the list: same height, weight and hover tint, and a focus ring around the whole row (the chevron is the tab
stop), so the two layouts read alike.

When you use `<more>` alone, give it a bounded height in a flex column (`flex h-[60vh] flex-col`): the facet's own list is
then the one scroller. In a plain `max-h` + `overflow-y-auto` wrapper it still works, the wrapper scrolling instead.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The overflow list shows the same facets already visible in the bar">
    `count` must match what the bar itself actually shows — typically its own `filtersCount` (or the app-wide
    `FILTERS_BREAKPOINT` it defaults to). `<more-button>` has no way to know what another component rendered; it
    only knows how many to skip.
  </Accordion>

  <Accordion title="The popover grows a search box I didn't ask for">
    Not configurable — it appears automatically past 6 overflow filters (`SEARCH_THRESHOLD`), regardless of
    container or `enrichedThreshold`. It exists precisely because a long facet list is hard to scan in a popover.
  </Accordion>

  <Accordion title="Setting enrichedThreshold doesn't change anything on mobile">
    Expected — mobile always uses the bottom Sheet, checked first and independently of `enrichedThreshold`. That
    input only arbitrates between the desktop Popover and Dialog.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Filters bar" href="./filters-bar.mdx">
    Where this overflow button is normally mounted from.
  </Card>

  <Card title="Aside filters" href="./aside-filters.mdx">
    The same stacked-facet accordion, in a persistent sidebar instead of an overlay.
  </Card>
</Cards>
