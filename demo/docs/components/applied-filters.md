# Applied Filters

The applied filters of the query, as removable chips — one per value, not one per stored entry.

## Imports

```ts
import { AppliedFiltersComponent, filterKey, filterLeaves, filterValues } from "@sinequa/atomic-angular";
```

## Why a component

`filters-bar` shows the aggregations a user can filter _on_; `applied-filters` shows what the query is filtered _by_. `QueryParamsStore` keeps **one entry per field or aggregation**, so three selected authors collapse into a single `values` array, and a date distribution into a nested `filters` tree. Rendering the store directly would show one chip for three selections, and removing it would drop all three.

## Controlled

Pass `filters` and the component writes nothing to the store: it emits `filtersChange` with the new list and leaves you to apply it. Note the date entry: its two buckets ("This year" and "Before this year") share the value `2026-01-01` and differ only by operator, so removing one leaves the other.

<demo-applied-filters-controlled></demo-applied-filters-controlled>

```html
<applied-filters [filters]="mine()" (filtersChange)="mine.set($event)" (changed)="search()" />
```

## Uncontrolled — QueryParamsStore

Without `filters`, the component reads and rewrites the current query's filters. Use `syncUrl="false"` when two scopes share a screen, so the shared URL is left alone.

<demo-applied-filters-store></demo-applied-filters-store>

```html
<applied-filters [syncUrl]="false" (changed)="search()" />
```

## Appearance

`showField` hides the aggregation prefix. `variant`, `scheme` and `size` are passed straight to galactik's `tag`.

<demo-applied-filters-appearance></demo-applied-filters-appearance>

```html
<applied-filters [filters]="filters" [showField]="false" />
<applied-filters [filters]="filters" scheme="indigo" size="md" />
<applied-filters [filters]="filters" variant="secondary" scheme="grey" size="sm" />
```

## Aggregation icon

When the custom JSON `filters` gives an aggregation an `icon`, the chip shows it instead of `<name>:`. The name stays as the tooltip and as text for screen readers. Aggregations without an icon keep their name. Set `fieldIcon` to `false` to always show the name.

<demo-applied-filters-icon></demo-applied-filters-icon>

```html
<applied-filters [filters]="filters" />
<applied-filters [filters]="filters" [fieldIcon]="false" />
```

## Events

`removed` carries the chip, `cleared` fires when everything goes, and `changed` fires on both — re-run the search on that one.

<demo-applied-filters-events></demo-applied-filters-events>

```html
<applied-filters (removed)="onRemoved($event)" (cleared)="onCleared()" (changed)="search()" />
```

## Reconciling a local selection

A chip's identity is its **leaf filter**, not its value. Compare on `filterKey`, never on values:

```ts
const inStore = new Set(queryParamsStore.filters().flatMap(filterLeaves).map(filterKey));
selection.update(current => current.filter(s => inStore.has(filterKey(s.filter))));
```

## API Reference

### AppliedFiltersComponent

| Input       | Type                          | Default       | Description                                                                                         |
| ----------- | ----------------------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| `filters`   | `LegacyFilter[] \| undefined` | `undefined`   | Filters to display. Providing it switches to controlled mode: nothing is written to the store.      |
| `syncUrl`   | `boolean`                     | `true`        | Whether a removal is reflected in the URL. Pass `false` when two scopes share one screen.           |
| `showField` | `boolean`                     | `true`        | Prefix each chip with its aggregation (or field) name.                                              |
| `fieldIcon` | `boolean`                     | `true`        | Show the aggregation's icon (custom JSON) instead of its name, when it has one. Needs `showField`.  |
| `variant`   | `TagVariants["variant"]`      | `undefined`   | Chip fill, passed to `tag`. Left `undefined` on purpose: `null` would neutralise `scheme`.          |
| `scheme`    | `TagVariants["scheme"]`       | `"grey"`      | Chip colour scheme.                                                                                 |
| `size`      | `TagVariants["size"]`         | `"sm"`        | Chip size.                                                                                          |
| `chipClass` | `string`                      | `""`          | Extra classes for each chip, merged by `tag`.                                                       |

| Output          | Payload              | Description                                                         |
| --------------- | -------------------- | ------------------------------------------------------------------- |
| `removed`       | `AppliedFilterChip`  | A chip was removed.                                                 |
| `cleared`       | `void`               | Every chip was removed.                                             |
| `filtersChange` | `LegacyFilter[]`     | The applied filters after the change — what a controlled caller stores. |
| `changed`       | `void`               | Something changed, whichever way. Re-run the search on this one.    |

### Helpers

| Method                          | Description                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `filterLeaves(filter)`          | The leaf filters of a stored entry, flattening a nested `and`/`or` tree.                         |
| `filterValues(filter)`          | The values a stored filter carries. Not unique: a distribution's two bounds can share one.       |
| `filterKey(leaf)`               | A leaf's stable identity as a string (field, operator, value) — survives a store round-trip.     |
| `rebuildWithout(source, chip)`  | The filter `source` amounts to once one chip is dropped, or `undefined` when nothing is left.    |
