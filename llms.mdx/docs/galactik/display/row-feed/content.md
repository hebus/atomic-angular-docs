# RowFeed (/docs/galactik/display/row-feed)

A WAI-ARIA feed of articles for a list of cards that grows as the user scrolls — reach for it instead of RowGrid when the list is not a table.



`RowFeed` renders a list as a WAI-ARIA feed: a `role="feed"` container of `<article>`s. A grid without headers
reads as a layout table (RGAA 5.3), so use it instead of [`RowGrid`](./row-grid.mdx) for a list of cards filled
in as the user scrolls. Article content is fully projected through an `ng-template`.

## Minimal example [#minimal-example]

<CodeSample id="row-feed-basic" title="An article-activated results feed">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { RowFeedComponent } from "@sinequa/galactik";

    type Result = { id: string; url: string; title: string };

    @Component({
      selector: "sample-component",
      imports: [RowFeedComponent],
      template: `
        <row-feed [items]="results" [ariaLabel]="'Results'" (rowActivate)="open($event)">
          <ng-template let-item let-index="index">
            <a [href]="item.url">{{ item.title }}</a>
          </ng-template>
        </row-feed>
      `,
    })
    export class SampleComponent {
      results: Result[] = [];

      open(item: Result): void {
        /* … */
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`@angular/aria` has no feed primitive, so the keyboard lives in the component: the articles are a roving tab
stop (`tabindex` 0 on one, -1 on the others), and `↑`/`↓`, `PageUp`/`PageDown`, `Home` and `End` move from one
article to the next without wrapping. `Enter` on the article itself emits `rowActivate`. `Tab` walks the
controls inside the article as in any page, and keys pressed on those controls keep their own meaning.

Each article carries `aria-posinset` and `aria-setsize` (`ariaRowCount` when the source reports a total, else
the rendered length), and the feed carries `aria-busy` while `busy` is set.

## Recipes [#recipes]

### Infinite scroll [#infinite-scroll]

<CodeSample id="row-feed-infinite" title="Loading more as focus approaches the end">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { RowFeedComponent } from "@sinequa/galactik";

    type Result = { id: string; url: string; title: string };

    @Component({
      selector: "sample-component",
      imports: [RowFeedComponent],
      template: `
        <row-feed [items]="results" [ariaRowCount]="totalCount" [busy]="loading" (endApproached)="loadMore()">
          <ng-template let-item>{{ item.title }}</ng-template>
        </row-feed>
      `,
    })
    export class SampleComponent {
      results: Result[] = [];
      totalCount = 0;
      loading = false;

      loadMore(): void {
        /* fetch the next page and append to results */
      }
    }
    ```
  </Lang>
</CodeSample>

`endApproached` fires once keyboard focus reaches the last `rowsBeforeEnd` articles, so the list keeps growing
for a keyboard user who never touches the mouse wheel.

## Options [#options]

<TypeTable
  type="{
  items: { type: &#x22;readonly T[]&#x22;, description: &#x22;Required. The articles to render.&#x22; },
  ariaLabel: { type: &#x22;string | undefined&#x22;, description: &#x22;Names the feed for assistive technology.&#x22; },
  ariaRowCount: { type: &#x22;number | null&#x22;, default: &#x22;null&#x22;, description: &#x22;Total count when items is only a partial page. Leave unset for a fully-loaded list.&#x22; },
  busy: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;More articles are loading (aria-busy).&#x22; },
  trackBy: { type: &#x22;(item: T, index: number) => unknown&#x22;, default: &#x22;(_, index) => index&#x22;, description: &#x22;Track function for the @for loop.&#x22; },
  rowsBeforeEnd: { type: &#x22;number&#x22;, default: &#x22;2&#x22;, description: &#x22;How many articles from the end a focus move starts requesting more via endApproached.&#x22; },
  gridClass: { type: &#x22;string&#x22;, default: '&#x22;gap-(--spacing-sm)&#x22;', description: &#x22;Spacing between articles.&#x22; },
  cellClass: { type: &#x22;string&#x22;, default: '&#x22;rounded-(--radius-lg)&#x22;', description: &#x22;Shape of an article.&#x22; },
}"
/>

## What's next [#whats-next]

<Cards>
  <Card title="RowGrid" href="./row-grid.mdx">
    The ARIA grid, for rows that really are tabular.
  </Card>
</Cards>
