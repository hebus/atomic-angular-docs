# Data visualization (/docs/atomic-angular/dataviz)

Render a Sinequa aggregation as a heatmap, a tag or word cloud, or a Chart.js bar/pie/doughnut/timeline — all in controlled mode, like <Aggregation>.



Every component here follows the same contract as [`<Aggregation>`](../filters/aggregation.mdx) in controlled
mode: it takes an `aggregation` (or `aggregations`) input, never reads or writes `QueryParamsStore` /
`AggregationsStore`, and reports interactions through outputs. A chart is therefore interchangeable with a
list facet — feed it from `AggregationsStore`, from `QueryService.search()` or from `fetchQuery()`, whichever
suits, and wire its output back into a filter the same way.

<Callout title="Two entry points">
  `Heatmap`, `TagCloud` and `WordCloud` need no charting dependency and ship from the main
  `@sinequa/atomic-angular` entry point. `AggregationChart`, `AggregationTimeline` and `AggregationHeatmap` are
  built on Chart.js, an **optional peer dependency** — they ship from a separate
  `@sinequa/atomic-angular/charts` entry point (and, for the matrix-based heatmap, a further
  `@sinequa/atomic-angular/charts/heatmap`), so an application that never imports from there never needs
  `chart.js` installed.
</Callout>

## What's next [#whats-next]

<Cards>
  <Card title="Heatmap" href="./heatmap.mdx">
    A two-dimensional distribution as a CSS grid — no dependency, accessible, clickable axis labels.
  </Card>

  <Card title="Tag Cloud" href="./tag-cloud.mdx">
    Aggregation values as a wrapping list of tags, sized by count.
  </Card>

  <Card title="Word Cloud" href="./word-cloud.mdx">
    The same data, packed into a compact spiral layout.
  </Card>

  <Card title="Aggregation Chart" href="./aggregation-chart.mdx">
    A bar, pie or doughnut chart, from the Chart.js entry point.
  </Card>

  <Card title="Aggregation Timeline" href="./aggregation-timeline.mdx">
    A time series with a drag-to-select range brush.
  </Card>

  <Card title="Aggregation Heatmap" href="./aggregation-heatmap.mdx">
    The canvas sibling of Heatmap, for matrices too large for the DOM.
  </Card>
</Cards>
