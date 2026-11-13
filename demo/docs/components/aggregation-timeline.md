# Aggregation Timeline

One or more time-bucketed aggregations as a step line, with drag-to-select range selection.

Ships from the secondary entry point `@sinequa/atomic-angular/charts`, which requires `chart.js` (an **optional** peer dependency).

## Basic usage

Drag across the chart to zoom in, double-click or use the button to zoom out.

<demo-aggregation-timeline></demo-aggregation-timeline>

```html
<div class="h-72" (dblclick)="zoomOut()">
  <AggregationTimeline
    [series]="timelineSeries()"
    mask="YYYY-MM-DD"
    [dashSecondary]="true"
    (rangeSelected)="zoomIn($event)" />
</div>
```

## Close the loop

`(rangeSelected)` **only reports a range**. If the host does nothing with it, you drag, a rectangle appears, it vanishes, and the chart is unchanged — the component is working, the loop is simply not closed. This is the most likely reason a freshly wired timeline looks dead.

```typescript
private readonly zoomStack = signal<readonly TimelineRange[]>([]);
readonly currentRange = computed(() => this.zoomStack().at(-1));

zoomIn(range: TimelineRange) {
  if (range.from === range.to) return;
  this.zoomStack.update(stack => [...stack, range]);
}

zoomOut() {
  this.zoomStack.update(stack => stack.slice(0, -1));
}
```

A stack rather than a single range, so successive drags zoom progressively and each zoom-out returns to the previous view.

## Gap filling

Sinequa returns only populated buckets. In the demo above, weekends are absent from the data — they are drawn flat at zero rather than skipped, which is what keeps the chart honest.

The component distinguishes two cases: a bucket **inside** a series own range with no events is zero and drawn flat; a bucket **outside** it is null and bridged. Confusing the two makes the chart lie in one direction or the other.

## No d3

The d3 timeline this replaces was around 800 lines. `d3.curveStep` becomes `stepped: "middle"`, `d3.brushX` becomes a 60-line Chart.js plugin, and the time axis is resolved up front into plain string labels on a `category` scale — Chart.js needs a date adapter for a real `time` axis, and this library does not ship one.
