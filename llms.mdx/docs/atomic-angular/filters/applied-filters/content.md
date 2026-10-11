# Applied filters (/docs/atomic-angular/filters/applied-filters)

Show what the query is currently filtered by, as one removable chip per value — the counterpart of the filters bar, which shows what a user can filter on.



`<applied-filters>` shows what the query **is** filtered by, one chip per value. Contrast with
[Filters bar](./filters-bar.mdx), which shows what a user **can** filter on.

<Callout title="Concept — one entry, several chips">
  `QueryParamsStore` keeps **one filter entry per field or per aggregation** — three selected authors are a
  single `values` array, and two selected date buckets are a nested `or` tree. Rendering that directly would
  show one chip for three choices, and removing it would drop all three. `<applied-filters>` expands each entry
  into one chip per value first, so each one can be removed independently.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="applied-filters-basic" title="One removable chip per applied value">
  <Lang value="angular">
    ```ts title="search.page.ts"
    import { Component, inject } from "@angular/core";
    import { AppliedFiltersComponent } from "@sinequa/atomic-angular";
    import { QueryService } from "@sinequa/atomic-angular";

    @Component({
      selector: "search-page",
      imports: [AppliedFiltersComponent],
      template: ` <applied-filters (changed)="search()" /> `,
    })
    export class SearchPage {
      private readonly queryService = inject(QueryService);

      protected search() {
        this.queryService.search().subscribe();
      }
    }
    ```
  </Lang>
</CodeSample>

`(changed)` fires on any mutation — a removal or a full clear alike — so a host that only needs to re-run its
query can bind that one output and ignore the more precise `(removed)`/`(cleared)`.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    A[&#x22;QueryParamsStore.filters()&#x22;] --> B[&#x22;filterLeaves — flatten and/or trees&#x22;]
    B --> C[&#x22;one chip per value&#x22;]
    C --> D[&#x22;click x on a chip&#x22;]
    D --> E[&#x22;rebuildWithout(source, chip)&#x22;]
    E -->|&#x22;values remain&#x22;| F[&#x22;updateFilter / addFilter&#x22;]
    E -->|&#x22;nothing remains&#x22;| G[&#x22;removeFilterByName / removeFilter&#x22;]
    F --> H[&#x22;changed&#x22;]
    G --> H"
/>

Removing a chip never deletes the whole stored entry outright: `rebuildWithout` returns the entry **minus**
that one value, so the aggregation's other selections survive. A named entry (one carrying the aggregation's
`name`) is *replaced* through `updateFilter` rather than patched, because `updateFilter` only ever merges —
growing a selection, never shrinking it.

A chip's identity is its **leaf filter**, not its value: a date distribution's two bounds can share one value
("This year" is `modified >= 2026-01-01`, "Before this year" is `modified < 2026-01-01`, differing only by
operator), so tracking by value would make removing one chip drop both.

## Recipes [#recipes]

### Two backends sharing one screen [#two-backends-sharing-one-screen]

Both scopes would otherwise fight over the URL query parameters they have in common.

<CodeSample id="applied-filters-no-sync" title="A second, independent filter list">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AppliedFiltersComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [AppliedFiltersComponent],
      template: ` <applied-filters [syncUrl]="false" (changed)="search()" /> `,
    })
    export class SampleComponent {
      protected search() {
        // re-run the second backend's own query here
      }
    }
    ```
  </Lang>
</CodeSample>

### Controlled — the caller owns the state [#controlled--the-caller-owns-the-state]

<CodeSample id="applied-filters-controlled" title="Filters supplied and stored by the host">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { AppliedFiltersComponent } from "@sinequa/atomic-angular";
    import type { LegacyFilter } from "@sinequa/atomic";

    @Component({
      selector: "sample-component",
      imports: [AppliedFiltersComponent],
      template: `
        <applied-filters [filters]="applied()" (filtersChange)="applied.set($event)" (changed)="search()" />
      `,
    })
    export class SampleComponent {
      protected readonly applied = signal<LegacyFilter[]>([]);

      protected search() {
        // re-run the query against applied()
      }
    }
    ```
  </Lang>
</CodeSample>

Providing `[filters]` writes nothing to `QueryParamsStore`: the component only renders what it is given and
emits what the caller should keep on `(filtersChange)`.

### Reconciling a facet's own selection after a removal [#reconciling-a-facets-own-selection-after-a-removal]

A facet lit from its own local selection state has to reconcile after a chip is removed elsewhere on the
page — neither the value nor the object reference survives the round-trip (the store rebuilds entries by
spreading them), so compare on `filterKey` instead:

```ts title="reconcile.ts" partial
import { filterKey, filterLeaves } from "@sinequa/atomic-angular";

const inStore = new Set(queryParamsStore.filters().flatMap(filterLeaves).map(filterKey));
selection.update((current) => current.filter((s) => inStore.has(filterKey(s.filter))));
```

## Options [#options]

<TypeTable
  type="{
  filters: { type: &#x22;LegacyFilter[] | undefined&#x22;, description: &#x22;Switches to controlled mode. Omit to read QueryParamsStore.&#x22; },
  syncUrl: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Whether a removal is reflected in the URL.&#x22; },
  showField: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Whether each chip is prefixed with its aggregation (or field) name.&#x22; },
  variant: { type: 'TagVariants[&#x22;variant&#x22;]', description: &#x22;Chip fill, passed to galactik's tag. null opts out — and silently neutralises scheme too, see Pitfalls.&#x22; },
  scheme: { type: 'TagVariants[&#x22;scheme&#x22;]', default: '&#x22;grey&#x22;' },
  size: { type: 'TagVariants[&#x22;size&#x22;]', default: '&#x22;sm&#x22;' },
  chipClass: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;Extra classes merged onto each chip.&#x22; },
}"
/>

### Exports [#exports]

<TypeTable
  type="{
  AppliedFilterChip: { type: &#x22;type&#x22;, description: &#x22;{ field, name?, value, display, leaf, source, id } — one rendered value.&#x22; },
  filterLeaves: { type: &#x22;(filter: LegacyFilter) => LegacyFilter[]&#x22;, description: &#x22;The leaf filters of an entry, flattening a nested and/or tree.&#x22; },
  filterValues: { type: &#x22;(filter: LegacyFilter) => string[]&#x22;, description: &#x22;Every value a filter carries. Not unique — see filterLeaves for identity.&#x22; },
  filterKey: { type: &#x22;(leaf: LegacyFilter) => string&#x22;, description: 'A leaf\'s stable identity: &#x22;field|operator|value|values&#x22;.' },
  rebuildWithout: { type: &#x22;(source, chip) => LegacyFilter | undefined&#x22;, description: &#x22;The filter left once one chip is dropped, or undefined when nothing remains.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Removing one value from a multi-value filter removes them all">
    That would mean `rebuildWithout` is being bypassed — check that removal goes through the component's own
    `(click)` handler rather than a custom one calling `queryParamsStore.removeFilter` directly, which drops the
    whole entry regardless of which value was clicked.
  </Accordion>

  <Accordion title="Two chips with different labels both disappear when only one is removed">
    This is the distribution-bounds trap: two chips can share the same **value** (two ends of a bucket), so a
    value-keyed removal drops both. `<applied-filters>` itself keys removal on the chip's **leaf**, not its value,
    so this should not happen inside the component — but if you reconcile your own selection state afterward,
    make sure you compare with `filterKey`, not the chip's `value`.
  </Accordion>

  <Accordion title="Passing variant=null unexpectedly changes the chip's colour scheme too">
    Documented, not a bug: the tag's colours come from a `variant` × `scheme` compound pair, and
    `class-variance-authority` treats an explicit `null` as opting out of the whole variant — which silently
    neutralises `scheme` along with it. Leave `variant` `undefined` (the default) unless you specifically want to
    opt out of both together.
  </Accordion>

  <Accordion title="The component takes up no space when nothing is applied, but I expected a placeholder">
    Deliberate — the host is hidden (`class.hidden`) whenever there are zero chips, so no empty gap is left in a
    `flex`/`grid` layout that uses `gap` between siblings. There is no built-in "no filters applied" placeholder;
    render your own conditionally on the chip count if you need one.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Filters bar" href="./filters-bar.mdx">
    What a user can filter on — the counterpart this component's chips come from.
  </Card>

  <Card title="Aggregation" href="./aggregation.mdx">
    Where a selection actually gets made, before it reaches the applied-filters store.
  </Card>
</Cards>
