# Aggregation Timeline (/docs/atomic-angular/dataviz/aggregation-timeline)

A time series with a drag-to-select range brush, on Chart.js — no d3, no date adapter, gap-filled buckets.



A date aggregation's buckets, plotted as a stepped line with an optional drag-to-select brush — replacing an
\~800-line d3 timeline with Chart.js alone, plus a category axis and a small brush plugin.

<Callout title="Optional peer dependency">
  Ships from `@sinequa/atomic-angular/charts`, same as [`<AggregationChart>`](./aggregation-chart.mdx) — see that
  page for the `chart.js` install note and the shared `<ChartCanvas>` lifecycle rules.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="aggregation-timeline-basic" title="Documents by modification date">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { AggregationTimelineComponent } from "@sinequa/atomic-angular/charts";
    import type { TimelineRange } from "@sinequa/atomic-angular/charts";
    import type { TimelineSeriesInput } from "@sinequa/atomic-angular/charts";

    @Component({
      selector: "sample-component",
      imports: [AggregationTimelineComponent],
      template: `
        <div class="h-64">
          <AggregationTimeline [series]="series()" (rangeSelected)="onRange($event)" />
        </div>
      `,
    })
    export class SampleComponent {
      readonly series = signal<TimelineSeriesInput[]>([]);

      protected onRange(range: TimelineRange) {
        console.log(`Zoom into ${range.from} .. ${range.to}`);
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

A `category` axis, never `"time"` — this library ships no Chart.js date adapter, and setting
`scales.x.type = "time"` without one compiles perfectly and throws at runtime. Bucket labels are resolved by
`buildTimeline()` (a pure function, unit-testable without a chart), which also fills gaps: an empty bucket is
drawn flat at zero rather than skipped, so the shape of the series is never silently misrepresented.

<Mermaid
  chart="flowchart TD
    A[&#x22;series input&#x22;] --> B[&#x22;buildTimeline(series, options)&#x22;]
    B --> C[&#x22;labels + gap-filled values per series&#x22;]
    C --> D[&#x22;ChartConfiguration (category axis, stepped line)&#x22;]
    E[&#x22;createTimelineBrushPlugin()&#x22;] --> F[&#x22;drag-to-select&#x22;]
    F -- &#x22;on release&#x22; --> G[[&#x22;rangeSelected&#x22;]]"
/>

**`(rangeSelected)` only reports a range — it does not zoom anything on its own.** If nothing in the host reacts
to it, dragging paints a selection rectangle that then disappears and nothing else happens; the component is
working as designed. Keep a stack of ranges in the host: a drag pushes one (zoom in), a control pops it (zoom
out).

## Recipes [#recipes]

### Comparing two periods [#comparing-two-periods]

`dashSecondary` renders every second series dashed, the "previous period" convention, and pairs it with the
same color as the series it compares against rather than doubling the palette.

<CodeSample id="aggregation-timeline-compare" title="This period vs. the previous one">
  <Lang value="angular">
    ```ts title="period-comparison.component.ts"
    import { Component, signal } from "@angular/core";
    import { AggregationTimelineComponent } from "@sinequa/atomic-angular/charts";
    import type { TimelineSeriesInput } from "@sinequa/atomic-angular/charts";

    @Component({
      selector: "period-comparison",
      imports: [AggregationTimelineComponent],
      template: `
        <div class="h-64">
          <AggregationTimeline [series]="series()" [dashSecondary]="true" mask="YYYY-MM-DD" />
        </div>
      `,
    })
    export class PeriodComparisonComponent {
      // This-period and previous-period series, interleaved: [current, previous, current, previous, ...].
      readonly series = signal<TimelineSeriesInput[]>([]);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  series: { type: &#x22;readonly TimelineSeriesInput[]&#x22;, default: &#x22;[]&#x22;, description: &#x22;The series to plot. Each carries an aggregation whose items are date buckets.&#x22; },
  mask: {
    type: &#x22;TimelineMask | undefined&#x22;,
    default: '&#x22;YYYY-MM-DD&#x22;',
    description: &#x22;Bucket width, for gap filling. Without it, empty buckets are skipped instead of drawn flat at zero.&#x22;,
  },
  enableSelection: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Enable the drag-to-select brush.&#x22; },
  dashSecondary: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Render every second series dashed — the previous-period convention.&#x22; },
  emptyLabel: { type: &#x22;string&#x22;, default: '&#x22;No data&#x22;', description: &#x22;Shown when every series is empty.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Dragging paints a selection rectangle that then vanishes, and nothing zooms">
    Expected — `(rangeSelected)` only reports the drag; it changes nothing on its own. See "How it works" above:
    keep a stack of ranges in the host and re-fetch on push/pop.
  </Accordion>

  <Accordion title="The brush never starts a drag, or ends one that never completes">
    If a custom `options.events` was set on the underlying configuration, check it still includes
    `"mousedown"` and `"mouseup"` — Chart.js' own default event list omits both, which the brush plugin relies on
    to detect a drag start and end. Overriding `events` without keeping them makes the brush silently inert, with
    no error.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Aggregation Chart" href="./aggregation-chart.mdx">
    The bar/pie/doughnut sibling, for a ranked distribution rather than a time series.
  </Card>
</Cards>
