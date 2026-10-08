# Aggregation Heatmap

A two-dimensional Sinequa aggregation — a cross-distribution — rendered as a **canvas** heatmap on Chart.js.

> **Reach for [`<Heatmap>`](/components/heatmap) first.** It draws the same thing as a CSS grid, needs no dependency, is accessible and selectable, and its axis labels are real buttons. This component exists for the case that one cannot serve: a matrix large enough that hundreds of DOM nodes become the bottleneck. Canvas rendering is flat in the cell count; a DOM grid is not.

Ships from its own entry point `@sinequa/atomic-angular/charts/heatmap`, which needs two **optional** peer dependencies:

```bash
npm i chart.js chartjs-chart-matrix
```

`chartjs-chart-matrix` lives one entry point below `/charts` on purpose: no other chart needs a matrix controller, so a bar chart or a timeline never has to resolve it.

## Basic usage

Click a cell to get both filterable values back, or an axis label to filter a whole row or column.

<demo-aggregation-heatmap></demo-aggregation-heatmap>

```html
<div class="h-80">
  <AggregationHeatmap
    [aggregation]="crossAggregation()"
    [encoding]="{ kind: 'separator', separator: '$@$' }"
    (cellSelected)="onCell($event)"
    (axisSelected)="onAxis($event)" />
</div>
```

```typescript
import { AggregationHeatmapComponent } from "@sinequa/atomic-angular/charts/heatmap";
```

The inputs and both output payloads are identical to `<Heatmap>`'s, so switching between the two is an import change and nothing else.

**The container needs a resolved height.** Chart.js measures the canvas' parent box; a blank chart is nearly always a parent with none.

## Clickable axis labels on a canvas

On the CSS grid an axis label is a `<button>`. Here it is painted pixels, so `createAxisClickPlugin()` — exported from `@sinequa/atomic-angular/charts`, and usable on any chart with a category axis — hit-tests the click. Three details make it work:

| | |
|---|---|
| `options.onClick` cannot do this | Chart.js only calls it when the pointer is inside `chartArea`, and axis labels are outside it by construction. A plugin's `afterEvent` sees every event on the canvas. |
| Hit-test the scale's own box | `scale.left/top/right/bottom` is exactly the strip reserved for that axis. The two axis boxes never overlap, so the corner between them — which belongs to neither — is excluded for free. |
| Walk the ticks, don't invert the scale | `getValueForPixel()` assumes uniform spacing from the scale bounds, which stops holding under `offset` (every heatmap axis) or `autoSkip`. `getPixelForTick(i)` is exact. |

The plugin also switches the cursor to `pointer` over a label — on a canvas that is the only affordance available. Set `[enableAxisSelection]="false"` when nothing is wired to `(axisSelected)`: an affordance that filters nothing is worse than none.

## The three encodings

Sinequa packs both dimensions into a single `value` string, in one of three shapes. Pick the one matching your aggregation; if unsure, log a single `item.value` and compare.

| `encoding.kind` | `item.value` looks like |
|---|---|
| `separator` | `Apple$@$Steve Jobs` |
| `cooccurrence` | `(Bill Gates)#(Microsoft)` |
| `cross` | a fielded expression carrying both column names and both values |

## Colour scale

Intensity comes from a **quantile** scale, not from `count / max`. Real distributions are heavily skewed, and a linear ramp flattens every cell but the largest to near-transparent. Quantiles give each bucket the same number of cells, so contrast lands where the data actually varies.

Axes are truncated to the 20 most significant rows and columns — ranked by total weight, not by arrival order.
