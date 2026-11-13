# Aggregation date (/docs/atomic-angular/filters/aggregation-date)

Render a date facet as preset ranges plus an optional custom range, and turn a pick into an applied filter — live or deferred, controlled or not.



`<aggregation-date>` is what `<Aggregation>` delegates to for a date column — see
[Aggregation](./aggregation.mdx#how-it-works). Unlike the list and tree variants, its options are a **radio
list** (never a multi-select), and it opens a dialog for a custom range instead of paging through buckets.

<Callout title="Concept — date option vs. custom range">
  The server turns a date column's buckets into named **date options** ("Today", "This week", "This year") via
  `translateAggregationToDateOptions`. Picking `"custom-range"` is the seventh, always-present option: it opens
  the [custom-range dialog](#the-custom-range-dialog) instead of applying immediately.
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
`QueryParamsStore`; as with every facet, it is up to the page to call `QueryService.search()` afterwards (see
[Who runs the search](../results/query.mdx#who-runs-the-search)).

## How it works [#how-it-works]

### The custom range dialog [#the-custom-range-dialog]

Selecting `"custom-range"` opens a dialog, mounted imperatively with `AggregationDateRange.call({ min, max, lang })` (the `createCallable` pattern): one calendar showing two months side by
side, in which the range is picked and stays visible — both ends, and every day in between, with a hover
preview while picking the second end. A first click sets the start, a second one closes the range (clicking an
earlier day swaps the two), and a localized summary under the calendar reads the result back. Validating after a
single click means **that day alone** (`from` and `to` are the same day); the dialog cannot pick an open-ended
range.

<Mermaid
  chart="flowchart TD
    A[&#x22;radio: custom-range&#x22;] --> B[&#x22;AggregationDateRange.call()&#x22;]
    B --> C[&#x22;two-month calendar, pre-filled with the applied range&#x22;]
    C --> D{&#x22;clicks?&#x22;}
    D -->|&#x22;one&#x22;| E[&#x22;that day alone (from = to)&#x22;]
    D -->|&#x22;two&#x22;| F[&#x22;range between the two days&#x22;]
    E --> G[&#x22;confirm() -> call resolves with the range&#x22;]
    F --> G
    G --> H[&#x22;form seeded, Apply revealed&#x22;]"
/>

Every call mounts a fresh dialog instance and tears it down on close, so no selection survives from the last
time it was used. The call resolves with the picked range, or `undefined` when the dialog is dismissed (cancel,
Escape, backdrop) — the facet then leaves its model untouched.

### Inside a popover [#inside-a-popover]

A facet is often rendered in a native `popover="auto"` — that is what [`<filter-button>`](./filter-button.mdx)
does. The custom-range dialog is modal, and `showModal()` **hides every auto popover that is not an ancestor of
the dialog**. Mounted in `document.body` like any callable dialog, it would close the popover that opened it
and destroy the facet with it, dialog included.

So `<aggregation-date>` mounts the dialog **inside itself**, through the call's `container` option, instead of in
`document.body`: the dialog becomes a DOM descendant of the facet, hence of the popover, which stays open behind
the modal. The dialog is still rendered in the top layer, so it is not clipped by the facet's box. Mounting it
in the facet also means the calendar inherits CSS custom properties set on the facet or above it, which is how
[a single facet's colors are restyled](#customize-the-colors).

<Mermaid
  chart="sequenceDiagram
    participant Input as From / To input
    participant Facet as aggregation-date
    participant Popover as popover=&#x22;auto&#x22;
    Input->>Facet: click or Enter
    Facet->>Popover: mount the dialog inside the facet, then showModal()
    Note over Popover: the dialog is a descendant, so the popover stays open
    Popover-->>Facet: range picked, dialog closed, popover still open"
/>

Nothing to configure: the behaviour is automatic. The same `container` option is available to your own dialogs:
see "Open a dialog from inside a native popover" in galactik's Dialog page.

### Controlled vs. uncontrolled, and `emitOn` [#controlled-vs-uncontrolled-and-emiton]

Like `<Aggregation>`, setting any of `query`, `aggregation` or `selection&#x60; switches to controlled mode. Being a
radio list, controlled mode has one behaviour the list/tree variants do not: **`emitOn="selection"` (the
default) emits live**, at the moment a preset is picked or a custom range confirmed — there is no Apply click
to wait for. Set `emitOn="apply"` to defer every emission to the Apply button instead, matching the list/tree
select-then-Apply flow.

### Masked dates [#masked-dates]

A date column aggregated with a mask (`YYYY`, `YYYY-MM`) returns items such as `{ value: "2016", count: 12 }`,
with no `display`. The mask is deduced from the values, and the label is the value itself, formatted in the
active language for `YYYY-MM` (`March 2024` / `mars 2024`). Picking one commits the full dates of the period,
`gte 2016-01-01` and `lt 2017-01-01` (December rolls over to the next year), and puts the mask in the query's
`aggregation_overrides`, keyed by **aggregation name** (`{ Modified: { mask: "YYYY" } }`), which tells the server
how the values are built. Overrides of other aggregations are kept.

* **Default mode**: the component writes the override to `QueryParamsStore` itself — not to the URL, since a
  committed range is self-sufficient; only the masked aggregation values are lost after a page reload until the
  next apply — and removes it when the filter is cleared.
* **Controlled mode**: it is emitted through `(aggregationOverridesChange)`, right before `(filtersChange)`, on the
  same occasions. Assign it to the query you fetch with.

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
  headless: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description:
      &#x22;Leaves out the header for a popover that holds this one facet. Clear all and Apply are not in the header whichever way the facet is shown: they sit in a bar at the top of the facet (there is no search field).&#x22;,
  },
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

Outputs: `selectionChange` and `filtersChange` as described above, plus `aggregationOverridesChange`
(`Record<string, { mask?: string }> | undefined`) for [masked dates](#masked-dates).

## Set up the calendar [#set-up-the-calendar]

The custom-range dialog renders its two-month calendar with [vanilla-calendar-pro](https://vanilla-calendar.pro).
The calendar is internal to `<aggregation-date>` — there is no component to declare or provider to register —
but the application owns two pieces of setup.

**1. Install the peer dependency.**

```bash title="terminal"
npm install vanilla-calendar-pro
```

**2. Import the stylesheet once**, from the application's global stylesheet (not from a component: at 26 kB
it would break the default `anyComponentStyle` budget).

```css title="styles.css"
@import "@sinequa/atomic-angular/styles/calendar.css";
```

It bundles vanilla-calendar-pro's layout and light theme with every color mapped onto galactik's semantic
tokens, so the calendar follows the light/dark theme with no extra rule. It is a single flat file with no
nested import: without a bundler that resolves package exports, link it instead.

```html title="index.html"
<link rel="stylesheet" href="node_modules/@sinequa/atomic-angular/styles/calendar.css" />
```

Nothing else to configure: month and weekday names, and the first day of the week, come from the browser's
`Intl` API for the active Transloco language — no locale file to register.

### Customize the colors [#customize-the-colors]

Every color of the calendar is a `--vc-*` custom property set on the `date-range-calendar` element. Override
the ones to change **after** the `@import`, with the same selector, or scoped to one facet with a class on
`<aggregation-date>` since the calendar is mounted inside it (`.my-facet date-range-calendar { … }`). Pointing them at galactik tokens keeps the light/dark switch for free; a raw color applies to both themes.
The variables are those of [vanilla-calendar-pro](https://vanilla-calendar.pro), which remains the reference for
what each one paints.

```css title="styles.css"
@import "@sinequa/atomic-angular/styles/calendar.css";

date-range-calendar {
  --vc-date-selected-bg: var(--bg-accent-base);
  --vc-date-range-middle-bg: var(--bg-neutral-hovered);
  --vc-date-range-middle-color: var(--font-neutral-base);
}
```

| Property                                                     | Paints                               | Default                                        |
| ------------------------------------------------------------ | ------------------------------------ | ---------------------------------------------- |
| `--vc-bg` / `--vc-color`                                     | calendar surface and text            | `--bg-neutral-white` / `--font-neutral-base`   |
| `--vc-date-selected-bg` / `--vc-date-selected-color`         | both ends of the range               | `--bg-primary-base` / `--font-neutral-white`   |
| `--vc-date-range-middle-bg` / `--vc-date-range-middle-color` | days between the ends                | `--bg-primary-lighter` / `--font-primary-base` |
| `--vc-date-hover-bg` / `--vc-date-hover-edge-bg`             | preview while picking the second end | `--bg-primary-lighter` / `--bg-primary-light`  |
| `--vc-date-today-bg` / `--vc-date-today-color`               | today                                | `--bg-primary-lighter` / `--font-primary-base` |
| `--vc-date-disabled-color`                                   | disabled days                        | `--font-neutral-disabled`                      |
| `--vc-focus-outline-color`                                   | keyboard focus ring                  | `--stroke-focus`                               |

The full list (month/year grids, days outside the month…) is in the generated stylesheet, under the
`date-range-calendar` rule at its end. Layout — sizes, spacing, radii — comes from vanilla-calendar-pro and is
best left alone; the dialog sizes itself to the two months.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The custom range calendar shows up unstyled, or with cyan and red days">
    Unstyled — a bare grid of buttons with no layout: `@sinequa/atomic-angular/styles/calendar.css` is not
    imported. Add it to the global stylesheet ([Set up the calendar](#set-up-the-calendar)).

    Laid out but in vanilla-calendar-pro's own colors (cyan selection, red weekends): the application imports one of
    the library's stylesheets (`vanilla-calendar-pro/styles/index.css` or a theme) on top of — or instead of — ours.
    Remove it: ours already contains the layout, and its colors come from the galactik tokens.
  </Accordion>

  <Accordion title="The popover closes as soon as the custom-range calendar opens">
    `showModal()` closes any native auto popover that is not an ancestor of the dialog, so a calendar mounted
    outside the popover took it down with it. `<aggregation-date>` mounts the dialog inside itself, which keeps it
    a descendant of whatever popover hosts the facet. If it still happens, the facet is probably not rendered in
    the popover you think it is: check that the facet element really is inside the `[popover]` element in the DOM.
  </Accordion>

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
