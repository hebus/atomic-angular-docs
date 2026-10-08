# Filtering results (/docs/atomic-angular/filters)

Rendering facets over a query's aggregations, and turning clicks into filters — the aggregation family, the filters bar and its overflow, and what ends up applied.



A search rarely stays a plain text query. The user ticks "PDF only", expands a folder in a tree, picks "last
month" — each facet renders one aggregation of the query's result, and clicking an item turns into a filter on
the next query. This section covers that whole loop: rendering a facet, applying and clearing its selection,
and showing the user what is currently filtered.

## What's next [#whats-next]

<Cards>
  <Card title="Aggregation" href="./aggregation.mdx">
    Render a facet as a list, a tree or a date range, and turn a click into an applied filter.
  </Card>

  <Card title="Aggregation date" href="./aggregation-date.mdx">
    The date variant's preset options and custom-range dialog, live or deferred.
  </Card>

  <Card title="Filters bar" href="./filters-bar.mdx">
    One popover button per authorized facet, with overflow handled by More.
  </Card>

  <Card title="Filter button" href="./filter-button.mdx">
    The single-facet popover the bar renders one of.
  </Card>

  <Card title="More" href="./more.mdx">
    Filters beyond the bar's visible count — popover, Dialog, or a mobile Sheet.
  </Card>

  <Card title="Aside filters" href="./aside-filters.mdx">
    The same stacked facets, in a persistent sidebar accordion.
  </Card>

  <Card title="Applied filters" href="./applied-filters.mdx">
    What the query is currently filtered by — one removable chip per value.
  </Card>
</Cards>
