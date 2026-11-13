# More

Overflow filters shown as a list inside a popover, triggered by the "More" button: picking a filter opens it alone, with a back button to return to the list (or, with `layout="accordion"`, as collapsible sections). Used internally by `<filters-bar>` when filters don't fit the available space, but usable standalone.

## Imports

```ts
import { MoreButtonComponent } from "@sinequa/atomic-angular";
```

## Basic usage

With `count` set to `1`, only the first authorized filter is considered already shown in the bar — the rest overflow into the popover. Click the button to open it.

<demo-more-basic></demo-more-basic>

```html
<!-- only the 1st authorized filter counts as "already shown" — the rest overflow -->
<more-button [count]="1" />
```

## Pill look (`appearance`)

`appearance="pill"` makes the trigger a rounded outlined pill, as `<filters-bar appearance="pill">` relays it so the trigger matches its filter buttons. The trigger also exposes `aria-expanded` while the popover is open, and its accessible name is the translated `filters.moreFilters`.

<demo-more-pill></demo-more-pill>

```html
<more-button [count]="1" appearance="pill" />
```

## Layout (`layout`)

By default (`layout="drilldown"`) the popover has two screens: a list of the facets (icon, name, number of values applied, chevron), and, once one is picked, that facet alone under a header with a back button. Applying the facet brings the list back; **Escape** closes the popover from either screen. The two screens share one height, so the popover does not jump, and the resize handles work on both. The focus moves into the facet when it opens (its search field, or its name when it has none) and returns to its row on the way back.

A facet with nothing to pick and nothing applied stays in the list, dimmed and inert (`hideWhenEmpty` removes it).

With `applyOnSelect` every gesture applies at once and the facet stays open, to tick several values in a row.

<demo-more-drilldown></demo-more-drilldown>

```html
<more-button [count]="1" />

<!-- or from the bar -->
<filters-bar />
```

### Accordion

`layout="accordion"` (`moreLayout="accordion"` on the bar) keeps every filter as a collapsible section of one scrolling list. Its headers are dressed as the rows above (same height, weight, hover, and a focus ring around the whole row, the chevron being the tab stop), so the two layouts read alike.

<demo-more-accordion></demo-more-accordion>

```html
<more-button [count]="1" layout="accordion" />

<!-- or from the bar -->
<filters-bar moreLayout="accordion" />
```

## Empty aggregation (`hideWhenEmpty`)

By default, a facet resolving to zero items stays in the popover, dimmed and not openable (a dimmed, non-expandable header in the accordion). Set `hideWhenEmpty` on `<more-button>` to also remove it from the layout. A **missing** aggregation always hides regardless. Open the popover and toggle the switches below.

<demo-more-hide-when-empty></demo-more-hide-when-empty>

```html
<!-- Empty demo keeps a dimmed header by default; hidden once hideWhenEmpty is set -->
<more-button [count]="1" [hideWhenEmpty]="true" />
```

## Search & adaptive container

Beyond a handful of overflow filters, a search box appears above the list to find one by name. On a narrow viewport (below 768px — try resizing the window) the container becomes a bottom `Sheet` instead of an anchored popover. And with `enrichedThreshold` explicitly set — unlike the demos above, which leave it unset — the Popover escalates to a modal `Dialog` once overflow filters exceed it, for a case where an anchored popover would feel cramped even with the Popover's own shrink-to-fit behavior. This demo sets it to `6` and scopes itself to 19 facets (`Authors` plus 18 more) via `includedFilters` to stay independent from the demos above, and gives a realistic feel for both the search box and the Dialog at scale.

<demo-more-search-adaptive></demo-more-search-adaptive>

```html
<!-- 19 facets, none already shown (count=0) → search box + modal Dialog past enrichedThreshold -->
<more-button [count]="0" [enrichedThreshold]="6" [includedFilters]="['Authors', 'Category', 'Type', /* ...18 facets total */]" />
```

The Popover positions itself with [floating-ui](https://floating-ui.com/), whose `flip()`/`shift()` middleware reposition it but never shrink it — so a fixed max-height could overflow past the viewport when there isn't enough room. The `size()` middleware (in `injectPopover`, shared with `<filter-button>`) exposes the actual available space as a `--popover-available-height` CSS variable, which the Popover's inner list reads to shrink instead. The Popover is a native `[popover]` element, in the browser's top layer — it can never be clipped by an `overflow: hidden` ancestor the way an absolutely-positioned dropdown could, so the only boundary that still matters is the viewport itself: shrink your actual browser window (narrower or shorter) with the demo above open to see the search list adapt.

## Placement (`position` / `lockPosition`)

`position` sets the popover's [floating-ui](https://floating-ui.com/) placement relative to the trigger — by default, `flip()`/`shift()` still reposition it away from `position` when there isn't enough room in that direction. Set `lockPosition` to force the popover to stay at the exact `position`, disabling that automatic repositioning. Pick a position below, then toggle `lockPosition` and shrink the demo's container (or the browser window) to see the difference.

<demo-more-lock-position></demo-more-lock-position>

```html
<more-button [count]="1" position="top-start" [lockPosition]="true" />
```

## API reference

| Input               | Type                         | Default        | Description                                                                                                                                                                                                                 |
| ------------------- | ---------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`             | `number`                     | `2`            | Number of filters considered already shown elsewhere (e.g. in the bar) — the rest overflow into the popover.                                                                                                                |
| `position`          | `Placement`                  | `"bottom-end"` | Position of the popover.                                                                                                                                                                                                    |
| `lockPosition`      | `boolean`                    | `false`        | When `true`, forces the popover to stay at the exact `position`, disabling automatic repositioning based on available viewport space.                                                                                       |
| `includedFilters`   | `string[]`                   | `[]`           | Filters to only be included in the overflow list.                                                                                                                                                                           |
| `excludedFilters`   | `string[]`                   | `[]`           | Filters to exclude from the overflow list.                                                                                                                                                                                  |
| `aggregations`      | `Aggregation[] \| undefined` | `undefined`    | Explicit aggregations to consider for overflow, instead of the app's configured filters.                                                                                                                                    |
| `homepage`          | `boolean`                    | `false`        | Whether the overflow list is computed for the homepage filters bar.                                                                                                                                                         |
| `hideWhenEmpty`     | `boolean`                    | `false`        | Whether a section removes itself from the layout when its aggregation resolves to zero items, instead of a dimmed header. A missing aggregation always hides regardless.                                                    |
| `appearance`        | `"default" \| "pill"`        | `"default"`    | Look of the trigger: the default flat button, or a rounded outlined pill.                                                                                                                                                   |
| `scheme`            | `FilterScheme`               | `"sage"`       | Colour family of the `pill` look, relayed by `<filters-bar>`: its border and its hover.                                                                                                                                    |
| `layout`            | `"drilldown" \| "accordion"` | `"drilldown"`  | Layout of the facets: a list that opens one facet at a time under a header with a back button, or collapsible sections. |
| `applyOnSelect`     | `boolean`                    | `false`        | Every selection gesture applies the filter at once, without the Apply button. In `drilldown` the opened facet then stays open. |
| `enrichedThreshold` | `number \| undefined`        | `undefined`    | Above this many overflow filters, the desktop Popover escalates to a modal Dialog instead. Left unset, the Popover always shows every overflow facet, adapting its own height to the available space instead of escalating. |
