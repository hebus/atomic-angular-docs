# Aggregation date (/docs/atomic-angular/filters/aggregation-date)

Render a date facet as preset ranges plus an optional custom range, and turn a pick into an applied filter — live or deferred, controlled or not.



`<aggregation-date>` is what `<Aggregation>` delegates to for a date column — see
[Aggregation](./aggregation.mdx#how-it-works). Unlike the list and tree variants, its options are a **radio
list** (never a multi-select), and it opens a dialog for a custom range instead of paging through buckets.

<Callout title="Concept — date option vs. custom range">
  The server turns a date column's buckets into named **date options** ("Today", "This week", "This year") via
  `translateAggregationToDateOptions`. Picking `"custom-range"` is the seventh, always-present option: it opens
  [AggregationDateRangeDialogComponent](#the-custom-range-dialog) instead of applying immediately.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="aggregation-date-basic" title="A date facet, applied on selection">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AggregationDateComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [AggregationDateComponent],
      template: ` <aggregation-date name="Modified" column="modified" [showFiltersCount]="true" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

Picking a preset radio, or confirming a date in the custom-range dialog, reveals the **Apply** button —
exactly like the list and tree facets — rather than applying instantly. Clicking it writes the filter to
`QueryParamsStore` and re-runs the query.

## How it works [#how-it-works]

### The custom range dialog [#the-custom-range-dialog]

Selecting `"custom-range"` opens `<aggregation-date-range-dialog>`, which renders one of two pickers —
`<aggregation-date-dual-pickers>` (two independent calendars) or `<aggregation-date-custom-range>` (one
range-aware calendar), chosen by its `useDateRange` input:

<Mermaid
  chart="flowchart TD
    A[&#x22;radio: custom-range&#x22;] --> B[&#x22;dialog.open()&#x22;]
    B --> C{&#x22;useDateRange?&#x22;}
    C -->|&#x22;false&#x22;| D[&#x22;dual pickers (From, To)&#x22;]
    C -->|&#x22;true&#x22;| E[&#x22;one range picker&#x22;]
    D --> F[&#x22;confirm() -> rangeSelected&#x22;]
    E --> F
    F --> G[&#x22;form seeded, Apply revealed&#x22;]"
/>

The pickers are destroyed and recreated on every open (`@if (isDialogOpen())`) — a projected datepicker keeps
its previous selection otherwise, leaving a stale "From"/"To" behind from the last time the dialog was used.

### Controlled vs. uncontrolled, and `emitOn` [#controlled-vs-uncontrolled-and-emiton]

Like `<Aggregation>`, setting any of `query`, `aggregation` or `selection&#x60; switches to controlled mode. Being a
radio list, controlled mode has one behaviour the list/tree variants do not: **`emitOn="selection"` (the
default) emits live**, at the moment a preset is picked or a custom range confirmed — there is no Apply click
to wait for. Set `emitOn="apply"` to defer every emission to the Apply button instead, matching the list/tree
select-then-Apply flow.

## Recipes [#recipes]

### A controlled date facet, with a live selection [#a-controlled-date-facet-with-a-live-selection]

<CodeSample id="aggregation-date-controlled" title="A date facet over an unmanaged query">
  <Lang value="angular">
    ```ts title="agent-date-facet.component.ts"
    import { Component, signal } from "@angular/core";
    import { AggregationDateComponent } from "@sinequa/atomic-angular";
    import type { AggregationSelection } from "@sinequa/atomic-angular";
    import type { Aggregation, Filter, Query } from "@sinequa/atomic";

    @Component({
      selector: "agent-date-facet",
      imports: [AggregationDateComponent],
      template: `
        <aggregation-date
          name="Modified"
          column="modified"
          [aggregation]="modifiedAggregation()"
          [selection]="selection()"
          [query]="agentQuery"
          (selectionChange)="selection.set($event)"
          (filtersChange)="applyToQuery($event)"
        />
      `,
    })
    export class AgentDateFacetComponent {
      private readonly agentQuery: Query = { name: "agent-query", text: "" };

      protected readonly selection = signal<AggregationSelection | undefined>(undefined);
      protected readonly modifiedAggregation = signal<Aggregation>({
        name: "Modified",
        column: "modified",
        isDistribution: true,
        items: [],
      } as unknown as Aggregation);

      protected async applyToQuery(filters: Filter | undefined) {
        console.log("Filters to send:", filters);
      }
    }
    ```
  </Lang>
</CodeSample>

The emitted `AggregationSelection` is `{ kind: "option", option }` for a preset — the item's real filter
`value`, never its `display`, so a round-trip survives across days for presets computed relative to today —
or `{ kind: "range", from, to }` for a custom range.

### Disable the custom range entirely [#disable-the-custom-range-entirely]

Some deployments only want the fixed presets — no "custom range" option at all.

```ts title="app.config.ts" partial
import { FILTER_DATE_ALLOW_CUSTOM_RANGE } from "@sinequa/atomic-angular";

providers: [{ provide: FILTER_DATE_ALLOW_CUSTOM_RANGE, useValue: false }];
```

## Options [#options]

<TypeTable
  type="{
  name: { type: &#x22;string | null&#x22; },
  column: { type: &#x22;string | null&#x22; },
  collapsible: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22; },
  collapsed: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22; },
  searchable: { type: &#x22;boolean | undefined&#x22;, description: &#x22;Accepted for parity with the base facet, but the date variant has no search-within-facet UI.&#x22; },
  showFiltersCount: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22; },
  syncUrl: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  title: {
    type: &#x22;AggregationTitle&#x22;,
    default: '{ label: &#x22;Date&#x22;, icon: &#x22;far fa-calendar-day&#x22; }',
    description: &#x22;The facet header's label and icon.&#x22;,
  },
  displayEmptyDistributionIntervals: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description: &#x22;Whether date buckets with a zero count still appear as pickable options.&#x22;,
  },
}"
/>

### Controlled mode [#controlled-mode]

<TypeTable
  type="{
  query: { type: &#x22;Query | undefined&#x22; },
  aggregation: { type: &#x22;Aggregation | undefined&#x22; },
  selection: {
    type: &#x22;AggregationSelection | undefined&#x22;,
    description: '{ kind: &#x22;option&#x22;, option } for a preset, { kind: &#x22;range&#x22;, from?, to? } for a custom range.',
  },
  emitOn: {
    type: '&#x22;selection&#x22; | &#x22;apply&#x22;',
    default: '&#x22;selection&#x22;',
    description: &#x22;selection emits live on every pick/confirm; apply defers everything to the Apply button.&#x22;,
  },
}"
/>

## Calendar styles [#calendar-styles]

The custom-range dialog renders [`vanillajs-datepicker`](https://mymth.github.io/vanillajs-datepicker/) calendars,
which ship no styling of their own. The library publishes a ready-made stylesheet, built on galactik's semantic
tokens, so the calendar follows the light/dark theme with no extra rule. Import it once from the application's
global stylesheet:

```css title="styles.css"
@import "@sinequa/atomic-angular/styles/datepicker.css";
```

Without a bundler that resolves package exports, link the file instead:
`<link rel="stylesheet" href="node_modules/@sinequa/atomic-angular/styles/datepicker.css" />`.

The application also installs `vanillajs-datepicker` (a peer dependency) and, for non-English calendars,
registers the locales it needs — e.g. `Datepicker.locales.fr = fr` with `import fr from "vanillajs-datepicker/locales/fr"`.
Two custom properties tune the look: `--datepicker-today` and `--datepicker-selected`.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="hideWhenEmpty has no effect on a date facet">
    Expected, and not a missing feature — `<aggregation-date>` has no `hideWhenEmpty` input at all. A date facet
    has no "resolved but empty" state to gate behind one: its custom range stays usable with zero buckets, so it
    is either missing (always hidden) or present (always visible). See
    [Aggregation's missing-vs-empty rules](./aggregation.mdx#missing-vs-empty).
  </Accordion>

  <Accordion title="A controlled date facet keeps re-emitting, or seeding from selectionChange loops">
    Feeding `selectionChange`'s payload straight back into `[selection]` is safe: seeding the form from the
    `[selection]` input is guarded internally against re-triggering a live emission. If you see a loop, check that
    `selection` is a **stable value** between renders (built in a `computed()`/signal, not an inline object
    literal) — the same rule as `<Aggregation>`'s own `[aggregation]` input, see
    [its pitfall](./aggregation.mdx#a-controlled-instance-keeps-reseeding-or-the-template-fails-to-compile).
  </Accordion>

  <Accordion title="Toggling the &#x22;custom range&#x22; radio does nothing, in controlled mode">
    Intentional. Picking `"custom-range"` only opens the dialog — nothing is emitted (or applied) until a real
    date is actually confirmed in it. A stale range left over from a previous open is never surfaced by merely
    re-selecting the radio.
  </Accordion>

  <Accordion title="A preset's applied filter doesn't match after the app has been open a few days">
    Not a bug — this is why presets round-trip on the item's `value`, not on a resolved date. `"This week"`'s
    `value` stays a stable identifier; only its resolved bounds change day to day. A controlled `[selection]` of
    `{ kind: "option", option: item.value }` re-selects correctly regardless of when it round-trips. If you
    compare resolved dates yourself instead of the option/item value, expect drift.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Aggregation" href="./aggregation.mdx">
    The shared missing/empty rules, controlled mode, and the list/tree variants.
  </Card>

  <Card title="Filters bar" href="./filters-bar.mdx">
    Where a date facet like this one is typically opened from — one popover per filter.
  </Card>
</Cards>
