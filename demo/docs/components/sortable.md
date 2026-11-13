# Sortable

A list the user reorders by dragging its items, or from the keyboard with <kbd>Alt</kbd> + <kbd>↑</kbd> / <kbd>↓</kbd>. It uses the browser's own drag and drop — no dependency. While an item is dragged the others slide out of the way, and a slightly tilted copy of the item follows the pointer, leaning the other way when it goes up; dropped, it settles in its slot.

```typescript
import { SortableDirective, SortableItemDirective } from "@sinequa/galactik";
```

Two directives work together: `[sortable]` goes on the list and is given the items, `[sortableItem]` goes on each element and is given its item. The directive owns the gesture, not the data: it reports the new order through `(reorder)`, and the consumer keeps the list.

## Basic

Render from `sortable.items()` — the order **shown**, which follows the pointer while an item is dragged — and track the `@for` by the item itself: the elements are moved, not recreated, which is what lets them slide and keep the focus. The element being dragged carries `data-dragging`: style it as a placeholder.

<demo-sortable-basic></demo-sortable-basic>

```html
<ul [sortable]="steps()" #sortable="sortable" (reorder)="steps.set($event)">
  @for (step of sortable.items(); track step) {
    <li [sortableItem]="step" tabindex="0" class="data-dragging:border-dashed data-dragging:*:invisible">
      {{ step }}
    </li>
  }
</ul>
```

## Keyboard and screen readers

A focused item moves with <kbd>Alt</kbd> + <kbd>↑</kbd> / <kbd>↓</kbd>, and keeps the focus. The library translates nothing, so a move is silent until `[sortableAnnounce]` gives the sentence to read.

<demo-sortable-announce></demo-sortable-announce>

```html
<ul [sortable]="items()" #sortable="sortable" [sortableAnnounce]="announce" (reorder)="items.set($event)">
  ...
</ul>
```

```typescript
protected readonly announce = (item: string, position: number, total: number) => `${item} moved to position ${position} of ${total}`;
```

## Disabled

`[sortableDisabled]` turns the reordering off: nothing is draggable and the shortcut does nothing.

<demo-sortable-disabled></demo-sortable-disabled>

```html
<ul [sortable]="items()" #sortable="sortable" [sortableDisabled]="locked()" (reorder)="items.set($event)">
  ...
</ul>
```

## One item disabled

`[sortableItemDisabled]` keeps one item from being moved — by the pointer or the keyboard — while the others stay free. They may be dropped before or after it: a disabled item is not moved by the user, but its position still shifts to make room. It carries `data-disabled`, to style it: a flat neutral background, muted text, no hover and no handle make a row that cannot be moved easy to tell from the others.

<demo-sortable-item-disabled></demo-sortable-item-disabled>

```html
<li
  [sortableItem]="folder"
  [sortableItemDisabled]="folder === 'Inbox'"
  class="group not-data-disabled:hover:bg-(--bg-primary-lighter) data-disabled:cursor-default data-disabled:bg-(--bg-neutral-base) data-disabled:text-(--font-neutral-muted)">
  <grip-vertical-icon class="group-data-disabled:invisible" />
  {{ folder }}
</li>
```

## Notes

- `(reorder)` fires on drop, and on a keyboard move — never for a drag that is abandoned (dropped outside the list, <kbd>Esc</kbd>), nor when an item lands where it was.
- To save the order with a server, update your list at once and put the previous one back if the request fails: the list shown follows the list given.
- A touch screen that does not start a native drag has no way to reorder.
- With reduced motion requested, the items and the copy do not animate.
