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

## Pill look

`appearance="pill"` turns every filter button — and the `More` button — into a rounded outlined pill that stays that pill, with no fill, once its filter holds a selection (the `+N` badge it then carries would not sit on every coloured background). The popovers they open are unchanged. `appearance` is also an input of `<filter-button>` and `<more-button>` when used on their own.

<demo-filters-bar-pill></demo-filters-bar-pill>

```html
<filters-bar appearance="pill" [filtersCount]="5" />
```

## Schemes

`scheme` picks the colour family of the `pill` look — one of the twelve schemes of the galactik `Tag` (`sage` by default). It moves the **border** of the pills and their **hover** (the tint of an open popover and the pressed state included), so the two always agree whatever you pick. Nothing else changes: the text stays the button's own. A filter that holds a selection stays the same outlined pill, with no fill. Choose a scheme, hover a pill, and tick the box to see an applied filter.

<demo-filters-bar-schemes></demo-filters-bar-schemes>

```html
<filters-bar appearance="pill" scheme="indigo" />
```

All twelve schemes side by side:

<demo-filters-bar-all-schemes></demo-filters-bar-all-schemes>

```html
<filters-bar appearance="pill" scheme="success" />
```

## A leading entry, without the clear buttons

Anything marked `filtersBarStart` is projected **before** the toolbar, not inside it: it keeps the injector of where you declared it, so it is a tab stop of its own rather than a roving widget — and it stays visible when the bar has no filter to show. `showClearButtons` hides the "clear all filters" and "clear basket" buttons, for a page that clears the filters elsewhere; the filters stay applied. `hasContent()` tells a page whether the bar renders anything.

<demo-filters-bar-pill-start></demo-filters-bar-pill-start>

```html
<filters-bar appearance="pill" [showClearButtons]="false" [enrichedThreshold]="6">
  <button filtersBarStart type="button">Quick filters</button>
</filters-bar>
```

## Centered

With `align="center"` the bar is centered in its container. When every filter fits, the "More" button is invisible and takes no room, so the visible pills are centered as a whole.

<demo-filters-bar-centered></demo-filters-bar-centered>

```html
<filters-bar appearance="pill" align="center" spacing="comfortable" [filtersCount]="5" />
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

| Input                   | Type                         | Default              | Description                                                                       |
| ----------------------- | ---------------------------- | -------------------- | --------------------------------------------------------------------------------- |
| `filtersCount`          | `number`                     | `FILTERS_BREAKPOINT` | Maximum number of filters rendered in the bar; the rest live in the More popover. |
| `includeFilters`        | `string[]`                   | `[]`                 | Only show the filters whose column names are in this list.                        |
| `excludeFilters`        | `string[]`                   | `[]`                 | Hide the filters whose column names are in this list.                             |
| `showMoreFiltersButton` | `boolean`                    | `true`               | Display the "More filters" button.                                                |
| `homepage`              | `boolean`                    | `false`              | Only show the filters flagged with `homepage: true` in the "filters" custom JSON. |
| `direction`             | `"horizontal" \| "vertical"` | `"horizontal"`       | Layout and overflow measurement direction.                                        |
| `position`              | `Placement`                  | `"bottom-start"`     | Popover placement for filter buttons.                                             |
| `morePosition`          | `Placement`                  | `"bottom-end"`       | Popover placement for the More button.                                            |
| `offset`                | `number`                     | `8`                  | Distance in pixels between a popover and its trigger.                             |
| `appearance`            | `"default" \| "pill"`        | `"default"`          | Look of the filter buttons and of the More button.                                |
| `scheme`                | `FilterScheme`               | `"sage"`             | Colour family of the `pill` look (a galactik `Tag` scheme): its border and its hover. Nothing else changes. |
| `showClearButtons`      | `boolean`                    | `true`               | Show the "clear all filters" and "clear basket" buttons.                          |
| `enrichedThreshold`     | `number \| undefined`        | `undefined`          | Relayed to the More button: above this many overflow filters it opens a modal.    |
| `hideWhenEmpty`         | `boolean`                    | `false`              | Relayed to the More button: a section with no item leaves the layout.             |
| `moreLayout`            | `"drilldown" \| "accordion"` | `"drilldown"`        | Relayed to the More button: a list of filters that opens one at a time, or collapsible sections. |
| `applyOnSelect`         | `boolean`                    | `false`              | Relayed to the More button: a gesture applies at once, without the Apply button.  |

Content: the `[filtersBarStart]` slot, projected before the toolbar. Method: `hasContent()` — whether the bar has an applied filter, a basket or aggregations to show.
