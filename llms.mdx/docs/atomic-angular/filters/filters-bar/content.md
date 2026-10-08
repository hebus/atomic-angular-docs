# Filters bar (/docs/atomic-angular/filters/filters-bar)

A toolbar listing the facets a user can filter on — one popover button per aggregation, with overflow handled by a "More" button.



`<filters-bar>` renders one [filter button](./filter-button.mdx) per authorized aggregation, in a keyboard-
navigable toolbar, and folds whatever does not fit into a ["More" button](./more.mdx). It shows what a user
**can** filter on — contrast with [Applied filters](./applied-filters.mdx), which shows what the query **is**
currently filtered by.

<Callout title="Concept — authorized filters">
  An aggregation becomes a filter button only if the app's JSON configuration says so (`position: "left" |
  "both"`, never `"left"` only in the bar) and the admin has not marked it `hidden`. Resolving that list is
  `AggregationsService.getAuthorizedFilters` — the bar, `<more-button>` and `<aside-filters>` all call through it,
  so the three surfaces never disagree on which facets exist.
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

The bar is an `@angular/aria` `Toolbar`: arrow keys rove between buttons, and the overflow manager recounts how
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
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A filter that exists in the app's configuration never shows in the bar">
    Check its `position` first — the bar only ever renders `"left"` **or** `"both"` aggregations (a JSON-only
    `"left"` facet lives in a drawer, never the bar), and the admin `hidden` rule is applied on top of that. Both
    checks happen in `AggregationsService.getAuthorizedFilters`, shared with `<more-button>` and
    `<aside-filters>` — if it is missing from all three, the configuration is the first thing to check, not the
    component.
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
