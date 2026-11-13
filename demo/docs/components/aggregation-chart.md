# Aggregation Chart

A Sinequa aggregation as a bar, pie or doughnut chart.

Ships from the secondary entry point `@sinequa/atomic-angular/charts`, which requires `chart.js`:

```bash
npm i chart.js
```

`chart.js` is an **optional** peer dependency — an application that never imports from `/charts` does not need it installed.

## Basic usage

The component does not fetch: it takes an `aggregation` as an input, exactly like the aggregation facet in controlled mode. Feed it from `AggregationsStore`, `QueryService.search()` or `fetchQuery()`.

<demo-aggregation-chart></demo-aggregation-chart>

```html
<!-- The parent MUST have a resolved height: a canvas with no layout measures 0x0. -->
<div class="h-80">
  <AggregationChart
    [aggregation]="companies()"
    type="bar"
    label="Documents"
    (itemSelected)="applyFilter($event)" />
</div>
```

## Turning it into a facet

`(itemSelected)` emits the clicked label. Convert it with `AggregationsService.toFilter()` and push it to `QueryParamsStore.updateFilter()` — the same path a list facet takes.

## Notes

- The legend is shown for pie and doughnut, hidden for bar: a bar axis already labels every bar.
- The tooltip shows both the share and the raw count. A percentage on its own hides the difference between 3 documents out of 6 and 3000 out of 6000.
- Colours come from the galactik **primitive** ramps, which are invariant, so a series keeps its identity when the theme flips. Chart chrome uses **semantic** tokens and does follow the theme — switching theme rebuilds the chart, because Chart.js reads its defaults at construction time only.
