# More (/docs/atomic-angular/filters/more)

The overflow surface for filters beyond the filters bar's visible count — a popover on desktop, escalating to a Dialog or a mobile Sheet.



`<more-button>` renders the "More" trigger [Filters bar](./filters-bar.mdx) shows once more filters are
authorized than fit — its content, `<more>`, is the same stacked-facet accordion as
[Aside filters](./aside-filters.mdx), just shown inside an overlay instead of a persistent sidebar.

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
  enrichedThreshold: {
    type: &#x22;number | undefined&#x22;,
    description: &#x22;Above this many overflow filters, escalate the desktop Popover to a modal Dialog. Unset: never escalate, whatever the count.&#x22;,
  },
}"
/>

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
