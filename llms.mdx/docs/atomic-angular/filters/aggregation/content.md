# Aggregation (/docs/atomic-angular/filters/aggregation)

Render a facet as a list, a tree or a date range from a query's aggregations, and turn a click into an applied filter — with a custom item template or full control over the data.



A facet — "Sources", "Authors", "Modified date" — is one **aggregation** of a query's result, rendered so the
user can turn a bucket into a filter with a click. `<Aggregation>` picks and renders the right shape (a flat
list, a tree, or a date range) for a given column, and handles selecting, applying and clearing the filter for
you.

<Callout title="Concept — aggregation">
  An **aggregation** is a bucketed count over one column of the result set — how many documents have each
  value of `docformat`, how many fall in each date range of `modified`. The server computes it alongside the
  result records; `<Aggregation>` never computes it itself, only renders and lets the user filter on it.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="aggregation-basic" title="A facet that applies a filter on selection">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AggregationComponent } from "@sinequa/atomic-angular";
    import type { AggregationItem } from "@sinequa/atomic";

    @Component({
      selector: "sample-component",
      imports: [AggregationComponent],
      template: `
        <Aggregation
          name="Sources"
          column="sourcestr4"
          [searchable]="true"
          [showFiltersCount]="true"
          (onSelect)="handleSelect($event)"
        />
      `,
    })
    export class SampleComponent {
      protected handleSelect(items: AggregationItem[]) {
        console.log(
          "Selected:",
          items.map((item) => item.value),
        );
      }
    }
    ```
  </Lang>
</CodeSample>

`name` and `column` identify which aggregation of the current query's result to render — `name` is matched
first against the app's aggregation configuration, `column` as a fallback. Selecting an item and clicking
**Apply** (or ticking a value in a facet search) writes the corresponding filter to the shared
`QueryParamsStore` and re-runs the query; nothing else in the template has to react to that by hand.

## How it works [#how-it-works]

`<Aggregation>` does not render anything itself — it resolves which of three sub-components actually renders,
then delegates:

<Mermaid
  chart="flowchart TD
    A[&#x22;Aggregation (type: auto)&#x22;] --> B{&#x22;isDateColumn(column)?&#x22;}
    B -->|&#x22;yes&#x22;| D[&#x22;aggregation-date&#x22;]
    B -->|&#x22;no&#x22;| C{&#x22;aggregation.isTree?&#x22;}
    C -->|&#x22;yes&#x22;| T[&#x22;aggregation-tree&#x22;]
    C -->|&#x22;no&#x22;| L[&#x22;aggregation-list&#x22;]"
/>

Set `type` explicitly (`"list" | "tree" | "date"`, instead of the default `"auto"`) when the heuristic cannot
apply — a date facet of a query the app's column map does not know about, for instance.

### Missing vs. empty [#missing-vs-empty]

Two different situations can leave a facet with nothing to show, and `<Aggregation>` treats them differently:

| Case                                                                                                         | Behaviour                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Missing** — no entry in the store matching `name`/`column`, or an empty `[aggregation]` in controlled mode | Always hidden, unconditionally                                                                    |
| **Resolves to zero items**                                                                                   | Visible with a dimmed, non-expandable header by default; hidden too when `[hideWhenEmpty]="true"` |

A missing aggregation is a misconfiguration (a typo'd `name`, an aggregation removed from the app's setup) —
not a state worth showing the user anything about — so it always disappears. A facet that genuinely resolves
to zero items is a legitimate, often temporary state, so it stays by default and only disappears once you opt
in with `hideWhenEmpty`. Two exemptions keep a facet the user can still act on regardless of that input: a
date facet (no "resolved but empty" state exists for it — see [Pitfalls](#pitfalls)) and a facet currently
carrying an applied filter (hiding it would leave no way to clear that filter from the facet itself).

### Controlled vs. uncontrolled [#controlled-vs-uncontrolled]

By default `<Aggregation>` reads and writes the shared `QueryParamsStore`/`AggregationsStore` and the URL. Set
any of `query`, `aggregation` or `selection` to switch the whole instance to **controlled mode**: it then
reads only from those inputs, holds its own state, and never touches the shared stores, the URL or
`sessionStorage` — changes surface exclusively through `(selectionChange)`/`(filtersChange)`. This is what lets
several independent facet instances coexist on one page, each over its own query.

## Recipes [#recipes]

### Custom item content, in a list [#custom-item-content-in-a-list]

Project an `<ng-template aggregationItem>` to own the content/label region of each row; `<aggregation-list>`
keeps the checkbox, click-to-select, count and virtualization.

<CodeSample id="aggregation-custom-item" title="A flag next to each language">
  <Lang value="angular">
    ```ts title="languages-facet.component.ts"
    import { Component, input } from "@angular/core";
    import { AggregationItemDirective, AggregationListComponent } from "@sinequa/atomic-angular";
    import type { Aggregation } from "@sinequa/atomic";

    @Component({
      selector: "languages-facet",
      imports: [AggregationListComponent, AggregationItemDirective],
      template: `
        <aggregation-list name="Languages" column="language" [aggregation]="aggregation()">
          <ng-template aggregationItem let-item let-name="name" let-count="count" let-selected="selected">
            <img [src]="'/flags/' + item.value + '.svg'" alt="" class="size-4" />
            <span [class.font-semibold]="selected">{{ name }}</span>
            <span class="badge">{{ count }}</span>
          </ng-template>
        </aggregation-list>
      `,
    })
    export class LanguagesFacetComponent {
      readonly aggregation = input.required<Aggregation>();
    }
    ```
  </Lang>
</CodeSample>

The same directive works on `<aggregation-tree>` — the context gains `level`/`expanded`/`hasChildren`, typed
as required through `AggregationTreeItemContext` if you annotate `let-*` manually.

### Full control over the data and the selection [#full-control-over-the-data-and-the-selection]

Set `query`, `aggregation` and `selection` together to render an aggregation that belongs to a query the
current app does not manage — an independent facet panel over a per-agent query, for instance. Nothing is
read from or written to the shared stores; every change surfaces through the outputs.

<CodeSample id="aggregation-controlled" title="A facet over an unmanaged query">
  <Lang value="angular">
    ```ts title="agent-language-facet.component.ts"
    import { Component, computed, inject, signal } from "@angular/core";
    import { AggregationComponent } from "@sinequa/atomic-angular";
    import type { AggregationSelection } from "@sinequa/atomic-angular";
    import { fetchQuery, type Aggregation, type Filter, type Query } from "@sinequa/atomic";

    @Component({
      selector: "agent-language-facet",
      imports: [AggregationComponent],
      template: `
        <Aggregation
          name="Languages"
          column="language"
          [aggregation]="languagesAggregation()"
          [selection]="selection()"
          [query]="agentQuery"
          (selectionChange)="selection.set($event)"
          (filtersChange)="applyToQuery($event)"
        />
      `,
    })
    export class AgentLanguageFacetComponent {
      private readonly agentQuery: Query = { name: "agent-query", text: "" };

      protected readonly selection = signal<AggregationSelection | undefined>(undefined);

      // A stable, typed reference: an inline `{ ...agg, display }` literal in the
      // template would reseed the instance on every change-detection pass — see Pitfalls.
      protected readonly languagesAggregation = computed<Aggregation>(() => this.rawAggregation());

      private readonly rawAggregation = signal<Aggregation>({
        name: "Languages",
        column: "language",
        items: [],
      } as unknown as Aggregation);

      protected async applyToQuery(filters: Filter | undefined) {
        await fetchQuery({ ...this.agentQuery, filters });
      }
    }
    ```
  </Lang>
</CodeSample>

The `aggregation` input is deep-cloned on the way in, so the host's object is never mutated and several
instances can safely share one source object — but any **reference change** of that input reseeds the whole
internal state (pages loaded through load-more, tree nodes opened by the user are discarded).

## Options [#options]

<TypeTable
  type="{
  name: { type: &#x22;string&#x22;, description: &#x22;Matched first against the app's aggregation configuration.&#x22; },
  column: { type: &#x22;string&#x22;, description: &#x22;Fallback match, and the column passed to filter.* when applying.&#x22; },
  type: {
    type: '&#x22;auto&#x22; | &#x22;list&#x22; | &#x22;tree&#x22; | &#x22;date&#x22;',
    default: '&#x22;auto&#x22;',
    description:
      &#x22;Which sub-component renders. auto keeps the isDateColumn / isTree heuristic; set explicitly when it cannot apply.&#x22;,
  },
  searchable: { type: &#x22;boolean | undefined&#x22;, description: &#x22;Search-within-facet. Undefined defers to the aggregation's own setting.&#x22; },
  showFiltersCount: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Shows the count of currently applied filters in the header.&#x22; },
  showCheckbox: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;Whether to render the per-item checkbox. Selection still toggles on row click when false — pair with a custom aggregationItem template. Ignored by the date variant.&#x22;,
  },
  applyOnSelect: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description: &#x22;Every selection gesture (row, checkbox, Space/Enter) applies immediately instead of only revealing Apply. Independent of the app-wide quickFilter flag — see Pitfalls.&#x22;,
  },
  hideWhenEmpty: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description: &#x22;Hide the host once it resolves to zero items, instead of a dimmed non-expandable header. Never affects a missing aggregation, which always hides. See How it works.&#x22;,
  },
  syncUrl: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;When false, applying/clearing updates the store without touching browser history or the URL.&#x22; },
}"
/>

### Controlled mode [#controlled-mode]

<TypeTable
  type="{
  query: { type: &#x22;Query | undefined&#x22;, description: &#x22;Switches to controlled mode. Operations run against this query instead of the shared one.&#x22; },
  aggregation: { type: &#x22;Aggregation | undefined&#x22;, description: &#x22;Switches to controlled mode. Rendered instead of reading from the shared store — deep-cloned on the way in.&#x22; },
  selection: {
    type: &#x22;AggregationSelection | undefined&#x22;,
    description:
      'Switches to controlled mode. { kind: &#x22;values&#x22; | &#x22;paths&#x22; | &#x22;option&#x22; | &#x22;range&#x22;, ... } depending on list / tree / date.',
  },
  emitOn: {
    type: '&#x22;selection&#x22; | &#x22;apply&#x22;',
    default: '&#x22;selection&#x22;',
    description: &#x22;Date variant only. selection emits live on every pick/confirm; apply defers to an Apply button, matching list/tree.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A facet doesn't render at all, even though the column exists">
    `<Aggregation>` (and `<aggregation-list>`/`<aggregation-tree>` directly) hides itself **unconditionally** when
    the aggregation is **missing** — no entry in the store matching `name`/`column`, most often a typo, or an
    empty `[aggregation]` in controlled mode. This is different from resolving to zero items, which stays visible
    by default. `hideWhenEmpty` has no effect on a missing aggregation; check the `name`/`column` values against
    the app's aggregation configuration first.
  </Accordion>

  <Accordion title="hideWhenEmpty is set, but the date facet never hides">
    Expected — a date facet has no "resolved but empty" state: it is either missing (always hidden) or present
    (always visible), because its custom range stays usable with no bucket at all. `hideWhenEmpty` only ever
    affects `<aggregation-list>`/`<aggregation-tree>`.
  </Accordion>

  <Accordion title="Ticking a tree node's checkbox doesn't apply the filter, even with quickFilter on">
    Expected, and the same contract as the list. The app-wide `features.quickFilter` flag is a **node-label**
    shortcut only — clicking the label applies in one gesture, but the checkbox, the row and Space/Enter always
    just select and reveal the **Apply** button. Set `[applyOnSelect]="true"` on the instance to make every
    gesture apply immediately, independently of the app-wide flag.
  </Accordion>

  <Accordion title="A custom aggregationItem template stops highlighting the search match, and clicking it no longer applies instantly">
    Both behaviours are part of the **default** label only. Projecting a custom template replaces that whole
    region, so you lose the built-in search highlight and the quick-filter click-to-apply along with it — this is
    intentional, not a bug to work around. Re-apply the highlight yourself with the public `highlightWord` pipe,
    using the `searchText` the template context already gives you.
  </Accordion>

  <Accordion title="A custom item template in a list renders with overlapping or misaligned rows">
    The **list** virtualizer estimates row height at a fixed \~32px and never measures — keep a custom list item
    roughly that height, or rows start to overlap. The **tree** virtualizer measures each row instead, so a custom
    tree item is free to vary in height.
  </Accordion>

  <Accordion title="A controlled instance keeps reseeding, or the template fails to compile">
    An inline object literal on `[aggregation]` — `[aggregation]="{ ...agg, display: label }"` — is a **new
    reference on every change-detection pass**, and any reference change reseeds the whole instance (discarding
    load-more pages and open tree nodes). It also fails to compile: the raw `Aggregation` type from
    `@sinequa/atomic` has no `display` field, so the literal trips the excess-property check.

    Build the object once, in a `computed()` or a plain field, and pass that stable reference instead — see
    [Full control over the data and the selection](#full-control-over-the-data-and-the-selection) above.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Data visualization" href="../dataviz/index.mdx">
    Render the same aggregation data as a chart instead of a list — bar charts, heatmaps, timelines.
  </Card>

  <Card title="Getting started" href="../start.mdx">
    Connect a client and run your first query, if you have not yet.
  </Card>
</Cards>
