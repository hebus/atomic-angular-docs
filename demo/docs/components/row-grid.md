# Row Grid

A keyboard-navigable ARIA grid for a list of rows whose content you project.

## Imports

```ts
import { RowGridComponent } from "@sinequa/galactik";
```

## Example

↑↓ walk the rows, Tab enters the focused row's own controls, Enter activates the row. A grid rather than a listbox, because a row may hold several controls and an `option` may not contain focusable controls. `rowWrap="nowrap"` keeps ↑ on the first row from jumping to the last.

<demo-row-grid-basic></demo-row-grid-basic>

```html
<row-grid [items]="results()" ariaLabel="Documents" (rowActivate)="open($event)">
  <ng-template let-item let-index="index">
    <a [href]="item.url">{{ item.title }}</a>
  </ng-template>
</row-grid>
```

## Notes

- For a list of cards that is not a table, use Row Feed: a grid without headers reads as a layout table (RGAA 5.3).
- The row content comes from the projected `ng-template`, which receives `$implicit` (the item) and `index`.

## API Reference

### RowGridComponent

| Input           | Type                                  | Default                   | Description                                               |
| --------------- | ------------------------------------- | ------------------------- | --------------------------------------------------------- |
| `items`         | `readonly T[]` (required)             |                           | The rows.                                                 |
| `ariaLabel`     | `string \| undefined`                 | `undefined`               | Names the list for assistive technology.                  |
| `ariaRowCount`  | `number \| null`                      | `null`                    | Total, when the list is only a page of it.                |
| `trackBy`       | `(item: T, index: number) => unknown` | `index`                   | Track function of the loop.                               |
| `rowsBeforeEnd` | `number`                              | `2`                       | How many rows from the end `endApproached` starts firing. |
| `gridClass`     | `string`                              | `"gap-(--spacing-sm)"`    | Spacing between rows.                                     |
| `cellClass`     | `string`                              | `"rounded-(--radius-lg)"` | Shape of a row.                                           |

| Output          | Payload | Description                      |
| --------------- | ------- | -------------------------------- |
| `rowActivate`   | `T`     | Enter pressed on a row.          |
| `endApproached` | `void`  | The focus reached the last rows. |
