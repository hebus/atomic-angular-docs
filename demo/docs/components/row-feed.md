# Row Feed

A WAI-ARIA feed of articles that grows as the user moves through it.

## Imports

```ts
import { RowFeedComponent } from "@sinequa/galactik";
```

## Infinite list

The focus is a roving stop over the articles: ↑↓ / PageUp / PageDown / Home / End move from one to the next, Enter activates, and Tab walks the controls inside the article. Each article carries `aria-posinset` / `aria-setsize` (from `ariaRowCount`, else the rendered length), and the feed is `aria-busy` while `busy` is set.

`endApproached` fires from the **focus**, not from scrolling: a sentinel at the bottom never enters the viewport for a keyboard user, because moving the focus scrolls by the strict minimum. Move the focus to the last articles below to load more.

<demo-row-feed-infinite></demo-row-feed-infinite>

```html
<row-feed [items]="results()" ariaLabel="Results" [ariaRowCount]="total()" [busy]="loading()" (endApproached)="loadMore()">
  <ng-template let-item>
    <a [href]="item.url">{{ item.title }}</a>
  </ng-template>
</row-feed>
```

## Notes

- `@angular/aria` has no feed primitive, so the keyboard handling lives in the component.
- Arrows, Home and End typed inside a field or on a control within a card keep their own meaning.
- For tabular rows, use Row Grid.

## API Reference

### RowFeedComponent

| Input           | Type                                  | Default                   | Description                                               |
| --------------- | ------------------------------------- | ------------------------- | --------------------------------------------------------- |
| `items`         | `readonly T[]` (required)             |                           | The articles.                                             |
| `busy`          | `boolean`                             | `false`                   | More rows are loading (`aria-busy`).                      |
| `ariaLabel`     | `string \| undefined`                 | `undefined`               | Names the feed for assistive technology.                  |
| `ariaRowCount`  | `number \| null`                      | `null`                    | Total, when the list is only a page of it.                |
| `trackBy`       | `(item: T, index: number) => unknown` | `index`                   | Track function of the loop.                               |
| `rowsBeforeEnd` | `number`                              | `2`                       | How many rows from the end `endApproached` starts firing. |
| `gridClass`     | `string`                              | `"gap-(--spacing-sm)"`    | Spacing between articles.                                 |
| `cellClass`     | `string`                              | `"rounded-(--radius-lg)"` | Shape of an article.                                      |

| Output          | Payload | Description                          |
| --------------- | ------- | ------------------------------------ |
| `rowActivate`   | `T`     | Enter pressed on an article.         |
| `endApproached` | `void`  | The focus reached the last articles. |
