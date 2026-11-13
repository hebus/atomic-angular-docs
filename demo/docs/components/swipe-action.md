# SwipeAction

A row a finger drags sideways to reveal an action — the touch counterpart of a button that only shows on hover, where a tablet has no hover. A coloured layer with the action appears under the row, and releasing it past a threshold triggers the action, as in iOS Mail.

```typescript
import { SwipeActionComponent } from "@sinequa/galactik";
```

Only a finger or a pen drives it: with a mouse the row is untouched, and selecting text by dragging still works. A vertical drag is left to the browser, so the list keeps scrolling. **A swipe is a shortcut, never the only way**: the action stays reachable by a visible button, which `pointer-coarse:sr-only` takes out of sight under a finger and leaves to a screen reader.

## Delete to the left

By convention the left swipe — the `end` slot — is the destructive one. Try it with a finger, or with the touch emulation of the browser's developer tools.

<demo-swipe-action-delete></demo-swipe-action-delete>

```html
<SwipeAction endEnabled (swipedEnd)="remove(item)" contentClass="flex items-center bg-(--layer-page-layer) p-3">
  <span swipeActionEnd><XMarkIcon /> Delete</span>
  <span class="flex-1">{{ item }}</span>
  <button type="button" class="pointer-coarse:sr-only" (click)="remove(item)">Delete</button>
</SwipeAction>
```

## One action per direction

`startEnabled` allows the swipe to the right and its `[swipeActionStart]` slot, `endEnabled` the swipe to the left and `[swipeActionEnd]`. `startTone` and `endTone` take `success`, `warning`, `error` or `accent`. A direction that is not enabled does not move at all.

<demo-swipe-action-both></demo-swipe-action-both>

```html
<SwipeAction
  startEnabled
  endEnabled
  startTone="warning"
  endTone="error"
  (swipedStart)="toggleFavorite(item)"
  (swipedEnd)="remove(item)"
  [contentClass]="rowClass">
  <span swipeActionStart><StarIcon /> Favourite</span>
  <span swipeActionEnd><XMarkIcon /> Delete</span>
  {{ item }}
</SwipeAction>
```

## Threshold

`threshold` is the distance, in pixels, past which releasing the row triggers the action (96 by default). Past it, the layer turns to the solid colour with white text and the action grows a little (`data-armed`): releasing now triggers it. The row slides back after every release, triggered or not: the consumer decides what the action does.

<demo-swipe-action-threshold></demo-swipe-action-threshold>

```html
<SwipeAction endEnabled [threshold]="200" (swipedEnd)="act()">...</SwipeAction>
```

## Notes

- The click the browser fires under the finger after a drag is swallowed (400ms at most), so a swipe never opens the row it deletes.
- `[disabled]="true"` turns the gesture off, and with it `touch-action`.
- The layers are as wide as the space the drag frees and pinned to their edge: the sliding layer needs an opaque background of its own for its look only, not to hide them.

## API Reference

### SwipeActionComponent

| Input          | Type                                            | Default     | Description                                                                                 |
| -------------- | ----------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `startEnabled` | `boolean`                                       | `false`     | Allows a drag to the right, which reveals the `[swipeActionStart]` slot.                    |
| `endEnabled`   | `boolean`                                       | `false`     | Allows a drag to the left, which reveals the `[swipeActionEnd]` slot.                       |
| `startTone`    | `'success' \| 'warning' \| 'error' \| 'accent'` | `'success'` | Colour of the layer a drag to the right reveals.                                            |
| `endTone`      | `'success' \| 'warning' \| 'error' \| 'accent'` | `'error'`   | Colour of the layer a drag to the left reveals.                                             |
| `threshold`    | `number`                                        | `96`        | Distance in px past which releasing the row triggers the action.                            |
| `disabled`     | `boolean`                                       | `false`     | Turns the gesture off.                                                                      |
| `contentClass` | `string`                                        | —           | Classes of the layer that slides: the layout of the row, its hover colours, its background. |
| `class`        | `string`                                        | —           | Classes merged on the host.                                                                 |

| Output        | Payload | Description                                                         |
| ------------- | ------- | ------------------------------------------------------------------- |
| `swipedStart` | `void`  | The row was released past the threshold after a drag to the right.  |
| `swipedEnd`   | `void`  | The row was released past the threshold after a drag to the left.   |
