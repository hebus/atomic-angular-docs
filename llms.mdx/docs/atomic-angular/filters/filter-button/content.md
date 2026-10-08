# Filter button (/docs/atomic-angular/filters/filter-button)

The single-facet popover button rendered by the filters bar — one Aggregation per button, sized to fit the viewport.



`<filter-button>` is what [Filters bar](./filters-bar.mdx) renders one of, per authorized aggregation: a pill
button that opens the aggregation's facet in a native popover.

## Minimal example [#minimal-example]

<CodeSample id="filter-button-basic" title="A single facet button, standalone">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { FilterButtonComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [FilterButtonComponent],
      template: ` <filter-button name="Sources" column="sourcestr4" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

The button's label follows the same `display`/`name` precedence as [Aggregation](./aggregation.mdx), and shows
a count badge once more than one value is selected. A date column renders its currently-applied range inline
instead of a plain label.

## How it works [#how-it-works]

The popover is a native `[popover]` element (top layer): it can never be clipped by an ancestor's
`overflow`/`z-index`, and only the viewport itself bounds its size. Its inner `<Aggregation>` is capped to the
actual available space between the trigger and the viewport edge:

<Mermaid
  chart="flowchart TD
    A[&#x22;click / Space / Enter&#x22;] --> B[&#x22;native [popover] opens&#x22;]
    B --> C[&#x22;floating-ui size() middleware&#x22;]
    C --> D[&#x22;--popover-available-height CSS var&#x22;]
    D --> E[&#x22;Aggregation wrapped in a scrollable div, capped to it&#x22;]"
/>

Without this, `flip()`/`shift()` alone only reposition the popover — they never shrink it — so a facet with
many values could overflow past the viewport in the gap between the trigger and the screen edge.

## Recipes [#recipes]

### A fixed placement, ignoring available space [#a-fixed-placement-ignoring-available-space]

<CodeSample id="filter-button-locked" title="Always open below, never flipped">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { FilterButtonComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [FilterButtonComponent],
      template: ` <filter-button name="Authors" column="authors" position="bottom-start" [lockPosition]="true" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  name: { type: &#x22;string | undefined&#x22; },
  column: { type: &#x22;string&#x22;, description: &#x22;Required.&#x22; },
  position: { type: &#x22;Placement&#x22;, default: '&#x22;bottom-start&#x22;' },
  offset: { type: &#x22;number&#x22;, default: &#x22;8&#x22; },
  lockPosition: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22; },
  expandedLevel: { type: &#x22;number | undefined&#x22;, description: &#x22;Relayed to the inner Aggregation, for a tree facet.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The button renders permanently disabled">
    Check the aggregation actually has items — `disabled` follows `!agg?.items?.length`, **unless** the column is
    a date column, which is never disabled even with zero buckets (a date's custom range stays usable regardless,
    the same exemption `<aggregation-date>` itself has — see
    [its pitfall](./aggregation-date.mdx#hidewhenempty-has-no-effect-on-a-date-facet)).
  </Accordion>

  <Accordion title="Arrow keys inside the open popover move the toolbar's focus instead of the facet's own list">
    This would be a regression, not expected behaviour — the popover panel deliberately stops propagation of every
    keyboard/pointer event except `Tab` and `Escape`, precisely so the surrounding `filters-bar` toolbar (which
    owns arrow-key roving) never intercepts navigation meant for the facet inside the panel (a listbox, a tree, a
    date radio group).
  </Accordion>

  <Accordion title="Tabbing away leaves the popover open, overlaying the rest of the page">
    Also a regression to report, not expected — the component closes its own popover on `focusout` once focus
    genuinely leaves the button and its panel (checked via `contains()` on the `relatedTarget`). A `null`
    `relatedTarget` — focus leaving the document entirely (alt-tab, browser chrome) — is the one case where it is
    deliberately left open, so it survives a window switch.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Filters bar" href="./filters-bar.mdx">
    Where these buttons are rendered from, and how overflow is handled.
  </Card>

  <Card title="Aggregation" href="./aggregation.mdx">
    What actually renders inside the popover.
  </Card>
</Cards>
