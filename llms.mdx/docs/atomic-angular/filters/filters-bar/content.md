# Filters bar (/docs/atomic-angular/filters/filters-bar)

A toolbar listing the facets a user can filter on — one popover button per aggregation, with overflow handled by a "More" button.



`<filters-bar>` renders one [filter button](./filter-button.mdx) per authorized aggregation, in a group of buttons you walk through with `Tab`, and folds whatever does not fit into a ["More" button](./more.mdx). It shows what a user
**can** filter on — contrast with [Applied filters](./applied-filters.mdx), which shows what the query **is**
currently filtered by.

<Callout title="Concept — authorized filters">
  An aggregation becomes a filter button only if the app's `filters` customization JSON lists it — an entry
  matched against the aggregation by `name` when it has one, by `column` otherwise — and the admin has not marked it
  `hidden`. The bar excludes only entries whose `position` is `"left"`: an entry with no `position`, or with `"both"`,
  shows in the bar (`<aside-filters>` is the one that takes `"left"` and `"both"`, and ignores an entry with no
  `position`). Resolving that list is `AggregationsService.getAuthorizedFilters` — the bar and `<more-button>` call
  through it; `<aside-filters>` applies the same `hidden` rule on its own list.

  That JSON is a **whitelist**: an aggregation the query returns but the JSON does not list is rendered nowhere. The
  `tabs.<tab>.filters` field of the customization JSON is typed in `CJsonMint` but read by nothing in the library, so
  it has no effect.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="filters-bar-basic" title="A toolbar over the current query's aggregations">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { FiltersBarComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [FiltersBarComponent],
      template: ` <filters-bar /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

Each button opens its aggregation in a popover — see [Filter button](./filter-button.mdx). Once more filters
are authorized than `filtersCount` allows, the remaining ones move into the "More" button rather than
overflowing the toolbar.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    A[&#x22;FiltersBarComponent&#x22;] --> B[&#x22;getAuthorizedFilters()&#x22;]
    B --> C[&#x22;OverflowManagerDirective measures available width&#x22;]
    C -->|&#x22;fits&#x22;| D[&#x22;FilterButton ×N&#x22;]
    C -->|&#x22;doesn't fit&#x22;| E[&#x22;MoreButton (overflow)&#x22;]"
/>

The bar is a plain `role="group"` of native buttons: `Tab` and `Shift+Tab` move between them (no roving focus, the arrow keys are left alone), and the overflow manager recounts how
many fit whenever the container resizes or the applied filters/basket change — a button hidden by overflow
emits no resize notification of its own when its natural width changes, so the recount is driven by the store
instead.

## Recipes [#recipes]

### Limit and reorder the visible filters [#limit-and-reorder-the-visible-filters]

<CodeSample id="filters-bar-limited" title="Only two filters, before overflowing to More">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { FiltersBarComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [FiltersBarComponent],
      template: ` <filters-bar [filtersCount]="2" [excludeFilters]="['Sources']" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

`filtersCount` can also be set application-wide through the `FILTERS_BREAKPOINT` injection token, rather than
repeating it on every `<filters-bar>`:

```ts title="app.config.ts" partial
import { FILTERS_BREAKPOINT } from "@sinequa/atomic-angular";

providers: [{ provide: FILTERS_BREAKPOINT, useValue: 3 }];
```

### A vertical bar, for a sidebar layout [#a-vertical-bar-for-a-sidebar-layout]

<CodeSample id="filters-bar-vertical" title="Filters stacked in a narrow column">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { FiltersBarComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [FiltersBarComponent],
      template: ` <filters-bar direction="vertical" position="right" class="w-56" /> `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Pills, with a leading "quick filters" entry [#pills-with-a-leading-quick-filters-entry]

<CodeSample id="filters-bar-pill" title="A pill-shaped bar with its own button first and no clear buttons">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { FiltersBarComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [FiltersBarComponent],
      template: `
        <filters-bar appearance="pill" [showClearButtons]="false" [enrichedThreshold]="6">
          <button filtersBarStart type="button">Quick filters</button>
        </filters-bar>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

`appearance="pill"` makes every filter button (and the "More" button) a rounded outlined pill that stays that pill, with no fill, once its
filter holds a selection (the `+N` badge it then carries would not sit on every coloured background). `scheme` picks its colour family — one of the twelve schemes of the galactik `Tag`, `sage` by
default — and it moves the border and the hover (the tint of an open popover included) together; the text is
unchanged. A filter that holds a selection stays the same outlined pill, with no fill. Anything marked `filtersBarStart` is projected **before** the group of buttons, not inside it: it
is a tab stop of its own, and it
stays visible when the bar has no filter to show. `hasContent()` tells a page whether the bar renders anything.

## Options [#options]

<TypeTable
  type="{
  ariaLabel: { type: &#x22;string&#x22;, description: &#x22;Overrides the translated filters.filterControls. Set it when a page shows more than one bar.&#x22; },
  direction: { type: '&#x22;horizontal&#x22; | &#x22;vertical&#x22;', default: '&#x22;horizontal&#x22;' },
  position: { type: &#x22;Placement&#x22;, default: '&#x22;bottom-start&#x22;', description: &#x22;Popover placement for each filter button.&#x22; },
  morePosition: { type: &#x22;Placement&#x22;, default: '&#x22;bottom-end&#x22;', description: &#x22;Popover placement for the More button.&#x22; },
  lockPosition: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables floating-ui's automatic repositioning for every popover in the bar.&#x22; },
  aggregations: { type: &#x22;Aggregation[] | undefined&#x22;, description: &#x22;Explicit aggregation list, bypassing AppStore's own JSON-driven authorization.&#x22; },
  includeFilters: { type: &#x22;string[]&#x22;, default: &#x22;[]&#x22; },
  excludeFilters: { type: &#x22;string[]&#x22;, default: &#x22;[]&#x22; },
  filtersCount: { type: &#x22;number&#x22;, default: &#x22;inject(FILTERS_BREAKPOINT) — 5&#x22;, description: &#x22;Filters shown before the rest overflow into More.&#x22; },
  showMoreFiltersButton: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  homepage: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Only filters flagged homepage: true in the app's JSON; none if none are flagged.&#x22; },
  offset: { type: &#x22;number&#x22;, default: &#x22;8&#x22;, description: &#x22;Distance in pixels between a popover and its trigger.&#x22; },
  appearance: { type: '&#x22;default&#x22; | &#x22;pill&#x22;', default: '&#x22;default&#x22;', description: &#x22;Look of the filter buttons and of the More button.&#x22; },
  align: { type: '&#x22;start&#x22; | &#x22;center&#x22;', default: '&#x22;start&#x22;', description: &#x22;Where the row sits: from the start, or centred as one group with the element in the filtersBarStart slot (under a home page's search field).&#x22; },
  spacing: { type: '&#x22;compact&#x22; | &#x22;comfortable&#x22;', default: '&#x22;compact&#x22;', description: &#x22;How far apart the buttons are: the tight spacing of a toolbar, or comfortable, 20px (--spacing-lg) between every button, the quick filters pill and More included (under a home page's search field).&#x22; },
  scheme: { type: &#x22;FilterScheme&#x22;, default: '&#x22;sage&#x22;', description: &#x22;Colour family of the pill look: its border and its hover. Nothing else changes.&#x22; },
  showClearButtons: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Shows the clear-all-filters and clear-basket buttons.&#x22; },
  enrichedThreshold: { type: &#x22;number | undefined&#x22;, description: &#x22;Relayed to the More button: above this many overflow filters it opens a modal dialog.&#x22; },
  hideWhenEmpty: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Relayed to the More button: a section with no item leaves the layout.&#x22; },
  moreLayout: { type: '&#x22;drilldown&#x22; | &#x22;accordion&#x22;', default: '&#x22;drilldown&#x22;', description: &#x22;Relayed to the More button: a list of filters that opens one at a time with a back button, or collapsible sections.&#x22; },
  applyOnSelect: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Relayed to the More button: a gesture in an opened filter applies at once, without the Apply button.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A filter that exists in the app's configuration never shows in the bar">
    Check the `filters` customization JSON first: the aggregation must be listed there (matched by `name`, else by
    `column`) — it is a whitelist. Then check its `position`: the bar excludes only `"left"`, so an entry with no
    `position` or with `"both"` shows in the bar, while a `"left"` facet lives in the drawer, never the bar. The admin
    `hidden` rule is applied on top of that. These checks happen in `AggregationsService.getAuthorizedFilters`, shared
    with `<more-button>` — if the facet is missing from the bar, the "More" menu and `<aside-filters>`, the
    configuration is the first thing to check, not the component.
  </Accordion>

  <Accordion title="The bar renders empty and announces nothing, even though filters exist">
    If this happens transiently on load, it is expected and harmless: the toolbar is only rendered once
    `hasFilters() || currentBasket() || hasAggregations()` is true, specifically so a keyboard user never lands
    on an empty, zero-height strip that still announces "Filter controls".
  </Accordion>

  <Accordion title="The &#x22;More&#x22; button is hidden even though more filters exist beyond the visible count">
    `showMoreFiltersButton` might be `false`, but if not: the overflow count is measured against the **full**
    authorized list, not the list capped by `filtersCount` — so this should not happen. If it does, check that
    `aggregations`/`includeFilters`/`excludeFilters` are consistent between what you expect and what
    `getAuthorizedFilters` actually resolves; the "More" button and the bar always agree with each other, but not
    necessarily with an assumption made outside the component.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Filter button" href="./filter-button.mdx">
    What a single button in the bar opens, and how its popover sizes itself to the viewport.
  </Card>

  <Card title="More" href="./more.mdx">
    Where the filters beyond filtersCount go, and how it adapts to mobile.
  </Card>

  <Card title="Applied filters" href="./applied-filters.mdx">
    What the bar's siblings show once a filter from it is actually applied.
  </Card>
</Cards>
