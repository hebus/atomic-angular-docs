# Aside filters (/docs/atomic-angular/filters/aside-filters)

A collapsible accordion of facets for a sidebar or drawer, with keyboard navigation jumping directly between facet headers.



`<aside-filters>` stacks several [Aggregation](./aggregation.mdx) facets as a native `<details>`/`<summary>`
accordion — the sidebar counterpart of [Filters bar](./filters-bar.mdx), for a layout where facets sit in a
persistent column or drawer rather than a row of buttons.

## Minimal example [#minimal-example]

<CodeSample id="aside-filters-basic" title="A collapsible facet sidebar">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AsideFiltersComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [AsideFiltersComponent],
      template: ` <aside-filters class="w-64" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

By default this renders every `"left"`/`"both"` aggregation from the app's JSON configuration (excluding
admin-`hidden` ones), each collapsed, one open at a time (`exclusive`, the native `<details name>` behaviour).

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    A[&#x22;aggregations input&#x22;] -->|&#x22;non-empty&#x22;| B[&#x22;render exactly these, in order&#x22;]
    A -->|&#x22;empty (default)&#x22;| C[&#x22;AppStore.filters() with position left/both&#x22;]
    C --> D[&#x22;rejectHidden — admin hidden rule&#x22;]
    D --> E[&#x22;one Aggregation per entry&#x22;]
    B --> E"
/>

Passing an explicit `aggregations` list **bypasses** the JSON `position`/`hidden` configuration entirely — the
listed aggregations render as-is, in the given order, provided they exist in the store. Resolution tries each
entry as a `name` first (the canonical identifier), then falls back to a `column` match.

Each facet is a native `<details>`/`<summary>`. The `<summary>` row is **not** a keyboard stop (`tabindex="-1"`):
`Tab` goes straight to the chevron button that collapses the facet, then on to the facet's content. The chevron button is
the keyboard way to collapse a facet, and it exposes `aria-expanded`; clicking the row with a pointer still toggles it.

A searchable facet does not show its search field until asked: a magnifier button in the header, next to the chevron, opens it
with a short slide and puts the focus in it, and closes it again — which also clears what was typed, so no filter stays on that
you cannot see. `Escape` in the field does the same. The field is folded and `inert` in the meantime, out of the tab order and
of the accessibility tree. In a popover that holds one facet (no header), the magnifier is in the bar below instead.

Under the search field of an open facet (at the top of a date facet, which has none) a bar holds a **Clear all** button and,
while a choice is pending, **Apply**: the same bar as in the popover of a filter button, whichever way the facet is shown.
A list or tree facet adds a **Select all** row, with its checkbox, right above the items. They are not in the header.

## Recipes [#recipes]

### An explicit, developer-chosen facet list [#an-explicit-developer-chosen-facet-list]

<CodeSample id="aside-filters-explicit" title="Bypass the JSON configuration">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AsideFiltersComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [AsideFiltersComponent],
      template: ` <aside-filters [aggregations]="['Authors', 'Sources', 'Geo']" class="w-64" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Independent sections, expanded by default [#independent-sections-expanded-by-default]

<CodeSample id="aside-filters-independent" title="Every section open, none exclusive">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AsideFiltersComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [AsideFiltersComponent],
      template: ` <aside-filters [exclusive]="false" [collapsed]="false" class="w-64" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  aggregations: {
    type: &#x22;string[]&#x22;,
    default: &#x22;[]&#x22;,
    description: &#x22;Explicit name/column list, bypassing the JSON position/hidden rules. Resolution tries name first, then column.&#x22;,
  },
  exclusive: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;true: shared native <details name>, one section open at a time. false: each section expands independently.&#x22;,
  },
  collapsible: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Relayed to every <Aggregation [collapsible]>.&#x22; },
  collapsed: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Relayed to every <Aggregation [collapsed]>.&#x22; },
  hideWhenEmpty: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description: &#x22;Relayed to every <Aggregation [hideWhenEmpty]>. A missing aggregation still always hides regardless.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Setting collapsible=false still lets sections toggle">
    Check the input is bound with brackets (`[collapsible]="false"`), not passed as a bare attribute
    (`collapsible`) — a bare attribute is always truthy. The same applies to `collapsed`, `exclusive` and
    `hideWhenEmpty`, all `booleanAttribute`-transformed inputs.
  </Accordion>

  <Accordion title="An aggregation listed in [aggregations] never shows up">
    `[aggregations]` resolves each entry against the `AggregationsStore` **first by name, then by column** —
    it does not create an aggregation from nothing. If the store has no entry matching either, that name is
    silently dropped from the rendered list, not shown as an error. Confirm the aggregation is actually present in
    the current query's result — `[aggregations]` filters an existing list, it does not fetch one.
  </Accordion>

  <Accordion title="Tab skips the facet's header row and the arrow keys don't jump between facets">
    By design. The `<summary>` row has `tabindex="-1"`, so it never takes the keyboard focus, and facet headers
    are not wired into a grid: the arrow keys belong to the facet's own content (a listbox, a tree, a radio
    group). Reach the chevron with `Tab` and collapse the facet with it — a facet that is
    not `collapsible` has no chevron because there is nothing to toggle.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Filters bar" href="./filters-bar.mdx">
    The toolbar counterpart of this sidebar accordion.
  </Card>

  <Card title="More" href="./more.mdx">
    The same stacked-facet accordion, shown from an overflow popover instead of a persistent sidebar.
  </Card>
</Cards>
