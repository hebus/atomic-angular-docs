# Aside Filters

A standalone "Facets List": renders a finite list of aggregations as collapsible accordion sections. Driven either by an explicit list of aggregations (the `aggregations` input) or, when none is given, by the JSON `filters` configuration.

## Imports

```ts
import { AsideFiltersComponent } from "@sinequa/atomic-angular";
```

## Explicit list (standalone)

Provide `aggregations` with the aggregation names (or columns) to display. The list is rendered exactly as passed, in order, fully decoupled from the JSON configuration and from the filters bar.

<demo-aside-filters-explicit></demo-aside-filters-explicit>

```html
<!-- prefer aggregation names: a column can be shared by several aggregations -->
<aside-filters [aggregations]="['Authors', 'Sources', 'Modified']" />
```

## Independent sections (exclusive = false)

By default a single section is open at a time (native `<details name>` accordion). Set `exclusive` to `false` so each facet expands independently.

<demo-aside-filters-independent></demo-aside-filters-independent>

```html
<!-- let several facets stay open at once -->
<aside-filters [aggregations]="['Authors', 'Sources', 'Folders']" [exclusive]="false" />
```

## JSON-driven fallback (no aggregations)

Without `aggregations`, the component keeps the configured filters flagged `position: 'left'` or `'both'` in the `filters` custom JSON and intersects them with the authorized aggregations. Filters flagged `hidden: true` (here `Folders`) are excluded.

<demo-aside-filters-fallback></demo-aside-filters-fallback>

```html
<!-- no aggregations: filters flagged position 'left' | 'both' in the filters JSON (hidden excluded) -->
<aside-filters />
```

## Admin-hidden filters (`hidden: true`)

A filter flagged `hidden: true` in the JSON config is never shown on the default (config-driven) path — the administrator hid it. Below, `Folders` is hidden: it is absent from the JSON fallback (left), but an explicit list is a deliberate bypass and still renders it (right).

<demo-aside-filters-hidden></demo-aside-filters-hidden>

```typescript
// filters JSON (admin config) — Folders is hidden
[
  { name: "Authors", column: "author", position: "left" },
  { name: "Folders", column: "folder", position: "left", hidden: true }
]
```

```html
<!-- default path: Folders is excluded -->
<aside-filters />

<!-- explicit list: deliberate bypass, Folders is shown -->
<aside-filters [aggregations]="['Authors', 'Folders']" />
```

## Empty aggregation (`hideWhenEmpty`)

By default, a facet resolving to zero items keeps a dimmed, non-expandable header. Set `hideWhenEmpty` on `<aside-filters>` to also remove it from the layout — relayed as-is to every `<Aggregation>` section. A **missing** aggregation always hides regardless. Toggle the switches below.

<demo-aside-filters-hide-when-empty></demo-aside-filters-hide-when-empty>

```html
<!-- EmptyDemo keeps a dimmed header by default; hidden once hideWhenEmpty is set -->
<aside-filters [aggregations]="['Authors', 'EmptyDemo']" [hideWhenEmpty]="true" />
```

## API reference

| Input          | Type       | Default     | Description                                                                                                                                          |
|----------------|------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `aggregations` | `string[]` | `[]`        | Explicit list of aggregations to display, by **name** (preferred) or column. When provided, it bypasses the JSON `filters` config. Empty ⇒ JSON-driven. |
| `exclusive`    | `boolean`  | `true`      | `true`: all sections share one `id` (single section open at a time). `false`: each section expands independently.                                    |
| `collapsible`  | `boolean`  | `true`      | Whether every section can be collapsed/expanded by the user. |
| `collapsed`    | `boolean`  | `true`      | Whether every section starts collapsed. |
| `hideWhenEmpty` | `boolean` | `false`     | Whether a section removes itself from the layout when its aggregation resolves to zero items, instead of a dimmed header. A missing aggregation always hides regardless. |
| `class`        | `string`   | `undefined` | Extra CSS classes applied to the host.                                                                                                               |
