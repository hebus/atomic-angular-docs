# Aggregation Chart (/docs/atomic-angular/dataviz/aggregation-chart)

A Sinequa aggregation as a bar, pie or doughnut chart, on Chart.js — an optional peer dependency, from a separate entry point.



The classic chart view of a facet: a bar, pie or doughnut over an aggregation's items, with a click on a
slice or bar reporting its label back so it can become a filter.

<Callout title="Optional peer dependency">
  This component ships from `@sinequa/atomic-angular/charts`, a **secondary entry point** — an application that
  never imports from it does not need `chart.js` installed, and npm will not warn about it.

  ```bash
  npm i chart.js
  ```
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="aggregation-chart-basic" title="Top formats as a bar chart">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { AggregationChartComponent } from "@sinequa/atomic-angular/charts";
    import type { AggregationLike } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [AggregationChartComponent],
      template: `
        <div class="h-64">
          <AggregationChart [aggregation]="formats()" label="Documents" (itemSelected)="onSelect($event)" />
        </div>
      `,
    })
    export class SampleComponent {
      readonly formats = signal<AggregationLike | undefined>(undefined);

      protected onSelect(label: string) {
        console.log("Filter on", label);
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`<AggregationChart>` does three things only: `toSeries()` turns the aggregation into two parallel arrays
(pure, testable, no dependency of its own), a `computed()` builds a Chart.js `ChartConfiguration` from them, and
[`<ChartCanvas>`](#chartcanvas-the-shared-lifecycle) owns the actual canvas lifecycle. It never fetches and
never touches the DOM directly.

### `<ChartCanvas>` — the shared lifecycle [#chartcanvas--the-shared-lifecycle]

Every chart in this entry point renders through the same `<ChartCanvas>`, which enforces four rules no caller
has to think about: create the Chart.js instance only after the first render (a canvas created earlier
measures as 0×0); always destroy it on teardown; rebuild when the chart `type` changes (Chart.js cannot swap
controllers on a live instance); and rebuild when the color theme flips (`Chart.defaults` is read once, at
construction).

**The host must have a resolved height** — Chart.js measures the canvas' parent box, and a blank chart is
almost always a container with no height (`class="h-64"` above).

## Options [#options]

<TypeTable
  type="{
  aggregation: { type: &#x22;AggregationLike | undefined&#x22;, description: &#x22;The aggregation to render.&#x22; },
  type: { type: '&#x22;bar&#x22; | &#x22;pie&#x22; | &#x22;doughnut&#x22;', default: '&#x22;bar&#x22;', description: &#x22;Chart type.&#x22; },
  label: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;Dataset label, shown in the legend and the tooltip.&#x22; },
  limit: { type: &#x22;number&#x22;, default: &#x22;10&#x22;, description: &#x22;Items kept, largest first. Charts stop being readable long before the data runs out.&#x22; },
  asPercentage: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Plot each item as a share of the total instead of a raw count.&#x22; },
  weightField: { type: &#x22;string | undefined&#x22;, description: &#x22;Read operatorResults[weightField] instead of count — for an average response time, say.&#x22; },
  emptyLabel: { type: &#x22;string&#x22;, default: '&#x22;No data&#x22;', description: &#x22;Shown when the aggregation resolves to no items.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The chart area stays blank">
    Almost always a container with no resolved height — Chart.js sizes the canvas from its parent's box. Give the
    host (or its wrapper) an explicit height, as the examples on this page do with `class="h-64"`.
  </Accordion>

  <Accordion title="Setting scales.x.type = &#x22;time&#x22; throws at runtime, even though it compiled">
    This library ships no date adapter, and Chart.js only validates that at runtime, not at compile time. Every
    chart in this entry point uses a `category` axis instead — see
    [Aggregation Timeline](./aggregation-timeline.mdx) for the time-series case.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Aggregation Timeline" href="./aggregation-timeline.mdx">
    A time series with a drag-to-select range brush, on the same ChartCanvas foundation.
  </Card>

  <Card title="Aggregation Heatmap" href="./aggregation-heatmap.mdx">
    A two-dimensional distribution on canvas, for matrices too large for the DOM.
  </Card>
</Cards>
