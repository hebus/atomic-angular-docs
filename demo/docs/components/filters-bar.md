# Filters Bar

The real FiltersBar component driven by the overflow directive. Filters that do not fit collapse into a "More" button. This page exercises the overflow behavior across container widths and a flex parent.

## Imports

```ts
import { FiltersBarComponent } from "@sinequa/atomic-angular";
```

## Adjust the width

Drag the slider to change the container width. Filter buttons that no longer fit collapse into the `More` button on the right — click it to reveal the hidden filters. The width is driven by a slider (instead of CSS `resize`) so the container has no `overflow` clipping and the popovers display fully.

<demo-filters-bar-resizable></demo-filters-bar-resizable>

```html
<!-- filtersCount caps how many filters are candidates; the rest collapse by width -->
<div [style.width.px]="width()">
  <filters-bar [filtersCount]="8" />
</div>
```

## filtersCount lower than the available filters

Here `filtersCount` is `5` while 8 filters are authorized: filters 6–8 are never rendered in the bar and are only reachable through the `More` button. The button must therefore stay visible even when all 5 rendered buttons fit in the container — it used to disappear at full width because the "more" list was derived from the capped list instead of the full one.

<demo-filters-bar-capped></demo-filters-bar-capped>

```html
<!-- 8 authorized filters but only 5 rendered: the More button must stay visible -->
<div style="width: 900px">
  <filters-bar [filtersCount]="5" />
</div>
```

## Without filtersCount

Same use case but without the `filtersCount` input: the cap falls back to the `FILTERS_BREAKPOINT` injection token, whose default value is `5`. With 8 authorized filters this is therefore equivalent to the previous example — filters 6–8 live in the `More` popover and its space is always reserved. Provide the token (`{ provide: FILTERS_BREAKPOINT, useValue: n }`) to change the default cap application-wide.

<demo-filters-bar-default-cap></demo-filters-bar-default-cap>

```html
<!-- no filtersCount: the cap falls back to FILTERS_BREAKPOINT (default 5) -->
<div style="width: 900px">
  <filters-bar />
</div>
```

```typescript
// override the default cap application-wide
providers: [{ provide: FILTERS_BREAKPOINT, useValue: 10 }]
```

## Fixed widths

The same bar at decreasing widths — observe how more filters collapse as space shrinks.

<demo-filters-bar-widths></demo-filters-bar-widths>

```html
<div style="width: 420px">
  <filters-bar [filtersCount]="8" />
</div>
```

## Inside a flex container

This is the layout that the previous overflow implementation got wrong. The bar is a `flex-1` child sharing a row with a sibling. Thanks to `min-w-0` on the host and the container-edge measurement, it is correctly constrained and collapses its overflow instead of growing to its content width.

<demo-filters-bar-flex></demo-filters-bar-flex>

```html
<div class="flex items-center gap-3">
  <filters-bar class="flex-1" [filtersCount]="8" />
  <button>Sibling</button>
</div>
```

## API reference

| Input                 | Type                         | Default              | Description                                                                  |
|-----------------------|------------------------------|----------------------|------------------------------------------------------------------------------|
| `filtersCount`        | `number`                     | `FILTERS_BREAKPOINT` | Maximum number of filters rendered in the bar; the rest live in the More popover. |
| `includeFilters`      | `string[]`                   | `[]`                 | Only show the filters whose column names are in this list.                   |
| `excludeFilters`      | `string[]`                   | `[]`                 | Hide the filters whose column names are in this list.                        |
| `showMoreFiltersButton` | `boolean`                  | `true`               | Display the "More filters" button.                                           |
| `homepage`            | `boolean`                    | `false`              | Only show the filters flagged with `homepage: true` in the "filters" custom JSON. |
| `direction`           | `"horizontal" \| "vertical"` | `"horizontal"`       | Layout and overflow measurement direction.                                   |
| `position`            | `Placement`                  | `"bottom-start"`     | Popover placement for filter buttons.                                        |
| `morePosition`        | `Placement`                  | `"bottom-end"`       | Popover placement for the More button.                                       |
| `offset`              | `number`                     | `8`                  | Distance in pixels between a popover and its trigger.                        |
