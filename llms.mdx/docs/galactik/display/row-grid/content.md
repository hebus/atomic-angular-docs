# RowGrid (/docs/galactik/display/row-grid)

A keyboard-navigable ARIA grid shell for a list of rows that hold more than one focusable control — reach for it instead of List/ListItem in that case.



`RowGrid` is a keyboard-navigable ARIA grid shell for a list of rows: `↑`/`↓` walk the rows, `Tab` enters the
focused row's own controls, `Enter` activates the row. Row content is fully projected, so it fits any row
shape a consumer needs. Reach for it instead of [`List`](./list.mdx)/`ListItem` whenever a row holds more than
one focusable control — a listbox `option` cannot contain one at all.

## Minimal example [#minimal-example]

<CodeSample id="row-grid-basic" title="A row-activated results grid">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { RowGridComponent } from "@sinequa/galactik";

    type Result = { id: string; url: string; title: string };

    @Component({
      selector: "sample-component",
      imports: [RowGridComponent],
      template: `
        <row-grid [items]="results" [ariaLabel]="'Results'" (rowActivate)="open($event)">
          <ng-template let-item let-index="index">
            <a [href]="item.url">{{ item.title }}</a>
          </ng-template>
        </row-grid>
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

Roles, keyboard navigation and the reflected state come entirely from `@angular/aria/grid`'s
`Grid`/`GridRow`/`GridCell` — `RowGrid` renders no ARIA behavior of its own, only the shell around it and its
two outputs.

<Mermaid
  chart="flowchart TD
    RowGrid[RowGridComponent] -- &#x22;renders&#x22; --> Row[ngGridRow]
    Row -- &#x22;renders&#x22; --> Cell[ngGridCell]
    Cell -- &#x22;ng-template outlet&#x22; --> Content[Caller-projected row content]
    Cell -- &#x22;keydown.enter&#x22; --> RowGrid
    RowGrid -- &#x22;rowActivate(item)&#x22; --> Caller
    RowGrid -- &#x22;focusin, near the end&#x22; --> RowGrid
    RowGrid -- &#x22;endApproached()&#x22; --> Caller"
/>

`rowActivate` fires on `Enter` because the interactive cell sits above the projected content in the DOM.
`endApproached` fires once keyboard focus reaches the last `rowsBeforeEnd` rows, so an infinite-scroll list can
keep growing for a keyboard user who never touches the mouse wheel.

## Recipes [#recipes]

### Infinite scroll [#infinite-scroll]

<CodeSample id="row-grid-infinite" title="Loading more as focus approaches the end">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { RowGridComponent } from "@sinequa/galactik";

    type Result = { id: string; url: string; title: string };

    @Component({
      selector: "sample-component",
      imports: [RowGridComponent],
      template: `
        <row-grid [items]="results" [ariaRowCount]="totalCount" (endApproached)="loadMore()">
          <ng-template let-item>{{ item.title }}</ng-template>
        </row-grid>
      `,
    })
    export class SampleComponent {
      results: Result[] = [];
      totalCount = 0;

      loadMore(): void {
        /* fetch the next page and append to results */
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  items: { type: &#x22;readonly T[]&#x22;, description: &#x22;Required. The rows to render.&#x22; },
  ariaLabel: { type: &#x22;string | undefined&#x22;, description: &#x22;Names the grid for assistive technology.&#x22; },
  ariaRowCount: { type: &#x22;number | null&#x22;, default: &#x22;null&#x22;, description: &#x22;Total row count when items is only a partial page. Leave unset for a fully-loaded list.&#x22; },
  trackBy: { type: &#x22;(item: T, index: number) => unknown&#x22;, default: &#x22;(_, index) => index&#x22;, description: &#x22;Track function for the @for loop.&#x22; },
  rowsBeforeEnd: { type: &#x22;number&#x22;, default: &#x22;2&#x22;, description: &#x22;How many rows from the end a keyboard focus move starts requesting more via endApproached.&#x22; },
  gridClass: { type: &#x22;string&#x22;, default: '&#x22;gap-(--spacing-sm)&#x22;', description: &#x22;Spacing between rows.&#x22; },
  cellClass: { type: &#x22;string&#x22;, default: '&#x22;rounded-(--radius-lg)&#x22;', description: &#x22;Shape of a row's cell.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="ArrowUp on the first row jumps to the last one, unexpectedly">
    It should not — `RowGrid` sets `rowWrap="nowrap"` deliberately: wrapping would send a keyboard user on a
    pointless trip to the far end of an infinitely-scrolling list. If you see wrapping, check that no surrounding
    code is overriding the grid's wrap behavior.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="List" href="./list.mdx">
    The selection-oriented alternative, for rows without their own focusable controls.
  </Card>
</Cards>
