# Heatmap (/docs/atomic-angular/dataviz/heatmap)

Render a two-dimensional aggregation as a grid of intensity-shaded cells — no charting dependency, real clickable buttons for cells and axis labels, readable by a screen reader.



A two-dimensional distribution — documents by source **and** by format, say — needs more than a list: a
heatmap shows both axes at once, with colour standing in for count. `<Heatmap>` renders it as a CSS grid,
which is what lets every cell and every axis label be a real, clickable, keyboard-reachable `<button>`.

<Callout title="Concept — cross-distribution encoding">
  Sinequa encodes a two-dimensional aggregation's two axes inside each item's single `value` field, one of three
  ways depending on how the aggregation was configured on the server: `"separator"` (both values joined by a
  delimiter), `"cooccurrence"` (a nested structure) or `"cross"` (a fielded expression, where the filterable
  value differs from the displayed label). `<Heatmap>`'s `encoding` input tells it which one to parse.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="heatmap-basic" title="Sources by format">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { HeatmapComponent } from "@sinequa/atomic-angular";
    import type { AggregationLike, HeatmapAxisSelection, HeatmapCellSelection } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [HeatmapComponent],
      template: `
        <div class="h-80">
          <Heatmap
            [aggregation]="sourcesByFormat()"
            (cellSelected)="onCell($event)"
            (axisSelected)="onAxis($event)"
          />
        </div>
      `,
    })
    export class SampleComponent {
      // Fed from AggregationsStore, QueryService.search() or fetchQuery() — the component only reads it.
      readonly sourcesByFormat = signal<AggregationLike | undefined>(undefined);

      protected onCell(selection: HeatmapCellSelection) {
        console.log(`${selection.x} / ${selection.y}: ${selection.count}`);
      }

      protected onAxis(selection: HeatmapAxisSelection) {
        console.log(`Filter the whole ${selection.axis} axis on`, selection.value);
      }
    }
    ```
  </Lang>
</CodeSample>

The host needs a resolved height (`class="h-80"` above) for the same reason every chart in this section does:
the grid fills its container, and a container with no height renders nothing to see.

## How it works [#how-it-works]

`<Heatmap>` never fetches and never transforms the aggregation itself — `buildHeatmap()`, a pure function, does
both jobs: it parses `encoding`, ranks and caps both axes at `maxX`/`maxY`, and returns an indexed grid the
template renders directly.

<Mermaid
  chart="flowchart TD
    A[&#x22;aggregation input (AggregationLike)&#x22;] --> B[&#x22;buildHeatmap(aggregation, options)&#x22;]
    B --> C[&#x22;xLabels / yLabels, capped and ranked&#x22;]
    B --> D[&#x22;cells, indexed by 'x y'&#x22;]
    D --> E[&#x22;quantileScale(cells) — intensity per cell&#x22;]
    C --> F[&#x22;CSS grid render&#x22;]
    E --> F
    F -- &#x22;click a cell&#x22; --> G[[&#x22;cellSelected&#x22;]]
    F -- &#x22;click an axis label&#x22; --> H[[&#x22;axisSelected&#x22;]]"
/>

`AggregationLike` is a **structural** type, not an import of `@sinequa/atomic`'s `Aggregation` — a real
`Aggregation` is assignable to it with no cast, so nothing here depends on that package. The same pattern
recurs across every component in this section: a pure, dependency-free data module (`buildHeatmap`,
`toSeries`, `buildTimeline`, `buildTagCloud`) does the parsing, and the component only renders.

Colour comes from a **primitive** galactik token (`--blue-500`), resolved once after the first render — reading
it any earlier returns nothing useful, since `getComputedStyle` has nothing to compute against before styles
apply. A primitive token is invariant across themes, which is why the ramp keeps its identity when the page
flips to dark mode, unlike the semantic tokens (axis text, grid lines) the Chart.js-based charts use instead.

## Recipes [#recipes]

### Filtering from an axis label [#filtering-from-an-axis-label]

`(axisSelected)` reports the value **behind** the label, not the label text — under the `"cross"` encoding the
two differ, so always read `.value` when building a filter, never `.label`.

<CodeSample id="heatmap-filter-axis" title="Turn an axis click into a filter">
  <Lang value="angular">
    ```ts title="heatmap-facet.component.ts"
    import { Component, inject, signal } from "@angular/core";
    import { HeatmapComponent, QueryParamsStore } from "@sinequa/atomic-angular";
    import type { AggregationLike, HeatmapAxisSelection } from "@sinequa/atomic-angular";
    import type { LegacyFilter } from "@sinequa/atomic";

    @Component({
      selector: "heatmap-facet",
      imports: [HeatmapComponent],
      template: `
        <div class="h-80">
          <Heatmap [aggregation]="data()" [encoding]="{ kind: 'cross' }" (axisSelected)="onAxis($event)" />
        </div>
      `,
    })
    export class HeatmapFacetComponent {
      private readonly queryParams = inject(QueryParamsStore);
      readonly data = signal<AggregationLike | undefined>(undefined);

      protected onAxis(selection: HeatmapAxisSelection) {
        const field = selection.axis === "x" ? "docformat" : "sourcestr4";
        const legacyFilter: LegacyFilter = { field, operator: "eq", values: [selection.value] };
        this.queryParams.updateFilter(legacyFilter);
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  aggregation: { type: &#x22;AggregationLike | undefined&#x22;, description: &#x22;The two-dimensional aggregation to render.&#x22; },
  encoding: {
    type: '{ kind: &#x22;separator&#x22;, separator?: string } | { kind: &#x22;cooccurrence&#x22; } | { kind: &#x22;cross&#x22; }',
    default: '{ kind: &#x22;separator&#x22;, separator: &#x22;$@$&#x22; }',
    description: &#x22;How the two axes are packed into each item's value — must match the server-side configuration.&#x22;,
  },
  maxX: { type: &#x22;number&#x22;, default: &#x22;20&#x22;, description: &#x22;Columns kept, ranked by total weight.&#x22; },
  maxY: { type: &#x22;number&#x22;, default: &#x22;20&#x22;, description: &#x22;Rows kept, ranked by total weight.&#x22; },
  emptyLabel: { type: &#x22;string&#x22;, default: '&#x22;No data&#x22;', description: &#x22;Shown when the aggregation resolves to no cells.&#x22; },
  class: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;Extra classes on the host.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The grid renders empty, or every cell looks the same faint grey">
    Check `encoding` against how the aggregation was actually configured on the server first — a `"separator"`
    aggregation parsed with `{ kind: "cross" }` produces no valid cells, and `<Heatmap>` has no way to detect the
    mismatch on its own. A faint, uniform grey grid with no data-colored cells is the same symptom as a missing
    aggregation: nothing parsed.
  </Accordion>

  <Accordion title="I need thousands of cells and the grid becomes the performance bottleneck">
    Expected — `<Heatmap>` is capped at 20×20 by default and is not meant to grow into the thousands: the DOM node
    count is what buys its accessibility (real buttons, screen-reader support, text selection), and that stops
    scaling long before a canvas would. Reach for
    [`<AggregationHeatmap>`](./aggregation-heatmap.mdx) instead — same inputs, same output payloads, an import
    change — and accept the accessibility trade-off it documents.
  </Accordion>

  <Accordion title="Filtering on the axis label's text matches nothing">
    Only under the `"cross"` encoding, where the displayed label (`item.display`) and the filterable value (a
    fielded expression) are different strings — filtering on the label sends a value the server never indexed.
    `(axisSelected)`'s `.value` field is already resolved to the right one for whichever encoding is in effect; use
    it instead of reading the label back out of the DOM or the event source.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Tag Cloud" href="./tag-cloud.mdx">
    A one-dimensional aggregation as a wrapping list of tags — the lightweight option.
  </Card>

  <Card title="Aggregation Heatmap" href="./aggregation-heatmap.mdx">
    The canvas sibling, for a matrix too large for the DOM.
  </Card>
</Cards>
