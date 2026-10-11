# Heatmap

A two-dimensional Sinequa aggregation — a cross-distribution — rendered as a grid of intensity-shaded cells. Ships from the **main entry point** and needs **no charting dependency**.

## Basic usage

Click a cell to get both filterable values back, or an axis label to filter a whole row or column. That last interaction is the reason this component is a CSS grid rather than a canvas: axis labels are real buttons, so no pixel hit-testing is involved.

<demo-heatmap></demo-heatmap>

```html
<div class="h-80">
  <Heatmap
    [aggregation]="crossAggregation()"
    [encoding]="{ kind: 'separator', separator: '$@$' }"
    (cellSelected)="onCell($event)"
    (axisSelected)="onAxis($event)" />
</div>
```

## The three encodings

Sinequa packs both dimensions into a single `value` string, in one of three shapes. Pick the one matching your aggregation; if unsure, log a single `item.value` and compare.

| `encoding.kind` | `item.value` looks like |
|---|---|
| `separator` | `Apple$@$Steve Jobs` |
| `cooccurrence` | `(Bill Gates)#(Microsoft)` |
| `cross` | a fielded expression carrying both column names and both values |

The `cross` form needs both fields: `display` carries the labels, `value` carries the filterable values.

## Colour scale

Intensity comes from a **quantile** scale, not from `count / max`. Real distributions are heavily skewed, and a linear ramp flattens every cell but the largest to near-transparent. Quantiles give each bucket the same number of cells, so contrast lands where the data actually varies.

Axes are truncated to the 20 most significant rows and columns — ranked by total weight, not by arrival order.

## When a canvas is the right tool instead

A DOM grid costs one node per cell. Past a few hundred cells that becomes the bottleneck, and [`<AggregationHeatmap>`](/components/aggregation-heatmap) draws the same data on a canvas, at a flat cost — including the axis click, hit-tested by a plugin. It costs a dependency (`chartjs-chart-matrix`) and it costs accessibility, so prefer this component while the matrix stays small.
