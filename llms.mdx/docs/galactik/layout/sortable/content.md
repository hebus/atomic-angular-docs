# Sortable (/docs/galactik/layout/sortable)

Let the user reorder a list by dragging its items, or from the keyboard with Alt and the arrow keys, with the browser's own drag and drop.



`SortableDirective` (`[sortable]`) makes the items of a list reorderable by drag and drop, and from the keyboard with
<kbd>Alt</kbd> + <kbd>↑</kbd> / <kbd>↓</kbd>. `SortableItemDirective` (`[sortableItem]`) marks each element. The
directive owns the gesture, not the data: it reports the new order through `(reorder)`, and the consumer keeps — and
saves — the list.

<Callout title="Concept — the order shown, and the order given">
  `sortable.items()` is the order **shown**: the list you gave, or, while an item is dragged, the order a drop would
  give. Render from it, not from your own list, and the other items make room for the dragged one as the pointer moves.
  The list you gave only changes when you adopt what `(reorder)` reports.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="sortable-basic" title="A list of steps the user reorders">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SortableDirective, SortableItemDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SortableDirective, SortableItemDirective],
      template: `
        <ul [sortable]="steps()" #sortable="sortable" (reorder)="steps.set($event)">
          @for (step of sortable.items(); track step) {
            <li
              [sortableItem]="step"
              tabindex="0"
              class="data-dragging:border-dashed data-dragging:*:invisible">
              {{ step }}
            </li>
          }
        </ul>
      `,
    })
    export class SampleComponent {
      protected readonly steps = signal(["Collect", "Index", "Search", "Review"]);
    }
    ```
  </Lang>
</CodeSample>

Track the `@for` by the item itself: the elements are moved, not recreated, which is what lets them slide and keep
the keyboard focus. The element being dragged carries `data-dragging` — style it as the placeholder of the slot the
item will land in (`data-dragging:border-dashed`, and `data-dragging:*:invisible` to empty it).

## How it works [#how-it-works]

<Mermaid
  chart="sequenceDiagram
    participant U as User
    participant I as sortableItem
    participant S as sortable
    participant C as Consumer
    U->>I: dragstart
    I->>S: startDrag
    S->>S: build the tilted copy, hide the browser's image
    U->>I: dragover another item
    I->>S: dragOver
    S->>S: items() becomes the preview, the others slide
    U->>I: drop
    S->>C: reorder with the new order
    C->>S: sortable input receives the new order
    S->>S: the copy settles in its slot, the preview is dropped"
/>

The browser's own drag image is made invisible, and the copy that follows the pointer is drawn by the directive: a
clone of the dragged element, tilted by 3° (and by −3° when the pointer goes up), lifted by a shadow, and placed in
the top layer with the `popover` attribute — so it stays above a popover that hosts the list. A browser may flatten
the transform of a native drag image; a clone it does not draw cannot be flattened.

A drag that is abandoned — dropped outside the list, <kbd>Esc</kbd> — puts the items back, sends the copy home, and
emits nothing. With reduced motion requested (`prefers-reduced-motion`), the items and the copy do not animate.

## Recipes [#recipes]

### Telling a screen reader about a move [#telling-a-screen-reader-about-a-move]

The library translates nothing, so a keyboard move is silent until `sortableAnnounce` provides the sentence. It is
read through a live region the directive creates on the first move.

<CodeSample id="sortable-announce" title="Announce a keyboard move">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SortableDirective, SortableItemDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SortableDirective, SortableItemDirective],
      template: `
        <ul [sortable]="items()" #sortable="sortable" [sortableAnnounce]="announce" (reorder)="items.set($event)">
          @for (item of sortable.items(); track item) {
            <li [sortableItem]="item" tabindex="0">{{ item }}</li>
          }
        </ul>
      `,
    })
    export class SampleComponent {
      protected readonly items = signal(["Security", "Performance", "Accessibility"]);

      protected readonly announce = (item: string, position: number, total: number) =>
        `${item} moved to position ${position} of ${total}`;
    }
    ```
  </Lang>
</CodeSample>

### Saving the order [#saving-the-order]

Adopt the new order at once and put the previous one back if the request fails: the list shown follows the list
you gave, so a drop keeps its result on screen while the request is in flight.

<CodeSample id="sortable-save" title="An optimistic save">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SortableDirective, SortableItemDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SortableDirective, SortableItemDirective],
      template: `
        <ul [sortable]="items()" #sortable="sortable" (reorder)="save($event)">
          @for (item of sortable.items(); track item) {
            <li [sortableItem]="item" tabindex="0">{{ item }}</li>
          }
        </ul>
      `,
    })
    export class SampleComponent {
      protected readonly items = signal(["Draft", "Review", "Approved"]);

      protected async save(next: string[]): Promise<void> {
        const previous = this.items();
        this.items.set(next);
        try {
          await fetch("/api/order", { method: "PUT", body: JSON.stringify(next) });
        } catch {
          this.items.set(previous);
        }
      }
    }
    ```
  </Lang>
</CodeSample>

### Turning it off [#turning-it-off]

`sortableDisabled` removes `draggable` and ignores the shortcut — for a list the user may not reorder right now.

<CodeSample id="sortable-disabled" title="A locked list">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SortableDirective, SortableItemDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SortableDirective, SortableItemDirective],
      template: `
        <ul [sortable]="items()" #sortable="sortable" [sortableDisabled]="locked()" (reorder)="items.set($event)">
          @for (item of sortable.items(); track item) {
            <li [sortableItem]="item" tabindex="0">{{ item }}</li>
          }
        </ul>
      `,
    })
    export class SampleComponent {
      protected readonly items = signal(["Draft", "Review", "Approved"]);
      protected readonly locked = signal(true);
    }
    ```
  </Lang>
</CodeSample>

### Keeping one item in place [#keeping-one-item-in-place]

`sortableItemDisabled` keeps one item from being moved, by the pointer or the keyboard, while the others stay free.
They may still be dropped before or after it: a disabled item is not moved by the user, but its position shifts to
make room. It carries `data-disabled`: style it so that it is easy to tell from the others — a flat neutral
background, muted text, no hover, and no handle if the items have one.

<CodeSample id="sortable-item-disabled" title="One fixed item among free ones">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SortableDirective, SortableItemDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SortableDirective, SortableItemDirective],
      template: `
        <ul [sortable]="folders()" #sortable="sortable" (reorder)="folders.set($event)">
          @for (folder of sortable.items(); track folder) {
            <li
              [sortableItem]="folder"
              [sortableItemDisabled]="folder === 'Inbox'"
              tabindex="0"
              class="group not-data-disabled:hover:bg-(--bg-primary-lighter) data-disabled:cursor-default data-disabled:bg-(--bg-neutral-base) data-disabled:text-(--font-neutral-muted)">
              {{ folder }}
            </li>
          }
        </ul>
      `,
    })
    export class SampleComponent {
      protected readonly folders = signal(["Inbox", "Projects", "Archive", "Drafts"]);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

### SortableDirective [#sortabledirective]

<TypeTable
  type="{
  sortable: { type: &#x22;readonly T[]&#x22;, description: &#x22;The items, in their current order. Required.&#x22; },
  sortableDisabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Turns the reordering off: nothing is draggable, the shortcut does nothing.&#x22; },
  sortableAnnounce: { type: &#x22;(item: T, position: number, total: number) => string&#x22;, description: &#x22;The sentence read to screen readers after a keyboard move. Without it, a move is silent.&#x22; },
  reorder: { type: &#x22;OutputEmitterRef<T[]>&#x22;, description: &#x22;The new order, on a drop that changes it and on a keyboard move. Never for an abandoned drag.&#x22; },
  items: { type: &#x22;Signal<readonly T[]>&#x22;, description: &#x22;The order to render: the given one, or the preview of the drop while an item is dragged.&#x22; },
  dragged: { type: &#x22;Signal<T | undefined>&#x22;, description: &#x22;The item being dragged, if any.&#x22; },
}"
/>

### SortableItemDirective [#sortableitemdirective]

<TypeTable
  type="{
  sortableItem: { type: &#x22;T&#x22;, description: &#x22;The item this element stands for — the same value as in the list given to sortable. Required.&#x22; },
  sortableItemDisabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Keeps this item from being moved, by the pointer or the keyboard. The others stay free, and may be dropped before or after it.&#x22; },
}"
/>

The element also gets `draggable="true"` and `aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown"` (neither when it is disabled, or the list is), `data-dragging` while it is the one being dragged, and `data-disabled` when it cannot be moved.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The items jump instead of sliding, or lose the focus after a keyboard move">
    The `@for` is tracked by something that changes when the order does (`track $index`, or a new object per render).
    The directive moves existing elements; give `track` the item itself.
  </Accordion>

  <Accordion title="The dropped item snaps back for an instant">
    The consumer keeps its own copy of the list and adopts the new order late (after a request). Adopt it in the
    `(reorder)` handler, synchronously, and roll it back on failure — the list shown follows the list given.
  </Accordion>

  <Accordion title="Alt + arrow does nothing inside a field of the item">
    Deliberate. The shortcut only works while the item itself has the focus: Alt + arrows inside an input or a button
    of the item are theirs.
  </Accordion>

  <Accordion title="Nothing can be reordered on a touch screen">
    A browser that does not start a native drag on touch leaves no way to reorder: the keyboard shortcut is the only
    alternative, and it is not available there either. Offer another control (move up and down buttons) where touch
    matters.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Resizable" href="./resizable.mdx">
    Panels whose boundary the user moves by dragging or arrowing a handle.
  </Card>
</Cards>
