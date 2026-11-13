# Aggregation Heatmap (/docs/atomic-angular/dataviz/aggregation-heatmap)

The canvas sibling of Heatmap, for a two-dimensional distribution too large for the DOM — same inputs, same output payloads, one import change.



[`<Heatmap>`](./heatmap.mdx) is the one to reach for first — it costs no dependency and is fully accessible.
`<AggregationHeatmap>` exists for the case `<Heatmap>` cannot serve: a matrix large enough that hundreds of DOM
nodes become the bottleneck. Canvas rendering is flat in the cell count; a DOM grid is not.

<Callout title="Two costs, one thing you do not lose">
  Switching to this component costs a dependency (`chartjs-chart-matrix`, on top of `chart.js`) and it costs
  accessibility — a canvas is opaque to screen readers and to text selection, and nothing brings that back.
  What it does **not** cost is the clickable axis label: `createAxisClickPlugin()` reproduces it on canvas, and
  `(axisSelected)` emits the exact same payload shape as `<Heatmap>`.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="aggregation-heatmap-basic" title="A matrix too large for the DOM">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { AggregationHeatmapComponent } from "@sinequa/atomic-angular/charts/heatmap";
    import type { AggregationLike, HeatmapAxisSelection, HeatmapCellSelection } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [AggregationHeatmapComponent],
      template: `
        <div class="h-96">
          <AggregationHeatmap
            [aggregation]="matrix()"
            [maxX]="60"
            [maxY]="60"
            (cellSelected)="onCell($event)"
            (axisSelected)="onAxis($event)"
          />
        </div>
      `,
    })
    export class SampleComponent {
      readonly matrix = signal<AggregationLike | undefined>(undefined);

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

```bash
# only if you use @sinequa/atomic-angular/charts/heatmap
npm i chart.js chartjs-chart-matrix
```

## How it works [#how-it-works]

`chartjs-chart-matrix` ships no other chart in this library needs, so it lives in its own tertiary entry point
(`@sinequa/atomic-angular/charts/heatmap`) rather than the shared `/charts` one — an application drawing only
bar charts never resolves it.

The same `buildHeatmap()` pure function [`<Heatmap>`](./heatmap.mdx) uses parses the aggregation here too, so
the two components are interchangeable: identical inputs, identical `(cellSelected)`/`(axisSelected)` payload
shapes. Swapping one for the other is an import change, nothing more.

**Clickable axis labels, reproduced on canvas.** Chart.js's own `options.onClick` never fires on an axis
label — it only fires inside the chart area, and labels sit outside it by construction. `createAxisClickPlugin()`
does its own hit test against the scale's box instead, walking `getPixelForTick()` rather than inverting
`getValueForPixel()` (which assumes uniform spacing and breaks under `offset`/`autoSkip`, both of which this
component sets).

## Options [#options]

<TypeTable
  type="{
  aggregation: { type: &#x22;AggregationLike | undefined&#x22;, description: &#x22;The two-dimensional aggregation to render.&#x22; },
  encoding: {
    type: 'HeatmapEncoding',
    default: '{ kind: &#x22;separator&#x22;, separator: &#x22;$@$&#x22; }',
    description: &#x22;Same shape and meaning as on <Heatmap> — see that page.&#x22;,
  },
  maxX: { type: &#x22;number&#x22;, default: &#x22;20&#x22;, description: &#x22;Columns kept, ranked by total weight.&#x22; },
  maxY: { type: &#x22;number&#x22;, default: &#x22;20&#x22;, description: &#x22;Rows kept, ranked by total weight.&#x22; },
  enableAxisSelection: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;Makes axis labels clickable. Turn off when nothing listens to axisSelected — a pointer cursor with nothing behind it is worse than none.&#x22;,
  },
  emptyLabel: { type: &#x22;string&#x22;, default: '&#x22;No data&#x22;', description: &#x22;Shown when the aggregation resolves to no cells.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Clicking an axis label does nothing, even with enableAxisSelection true">
    Check that nothing overrode `options.events` on a custom configuration passed further down the chain — the
    same event-list requirement [`<AggregationTimeline>`](./aggregation-timeline.mdx)'s brush has does not apply
    here (the axis-click plugin uses a different hookup), but a heavily customized chart configuration can still
    interfere with hit testing. Confirm first with the defaults, then reintroduce customization incrementally.
  </Accordion>

  <Accordion title="I need screen-reader support or text selection and this component can't provide it">
    By design — canvas rendering is opaque to assistive technology and to text selection, and no plugin restores
    either. If accessibility matters more than raw cell count, use [`<Heatmap>`](./heatmap.mdx) instead; if the
    matrix is genuinely too large for a DOM grid, this trade-off is the one to accept.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Heatmap" href="./heatmap.mdx">
    The accessible DOM sibling — reach for it first.
  </Card>
</Cards>
