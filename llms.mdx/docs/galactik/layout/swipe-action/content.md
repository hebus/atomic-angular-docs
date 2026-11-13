# SwipeAction (/docs/galactik/layout/swipe-action)

Reveal an action when the user drags a row sideways with a finger — the touch counterpart of an action that only shows on hover.



`<SwipeAction>` wraps a row and lets a finger drag it to the left or to the right: a coloured layer with the action
appears under it, and releasing the row past a threshold triggers the action (the iOS Mail gesture). It is what stands in
for a hover-only action on a touch screen, where nothing hovers.

<Callout title="A swipe is a shortcut, never the only way">
  A hidden gesture does not exist for a screen reader or a switch user. Keep the action reachable by a visible button
  (`pointer-coarse:sr-only` once the swipe replaces it for a sighted finger), and give the row its keyboard path as before.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="swipe-action-basic" title="A row deleted by a swipe to the left">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SwipeActionComponent, XMarkIcon } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SwipeActionComponent, XMarkIcon],
      template: `
        @for (item of items(); track item) {
          <SwipeAction endEnabled (swipedEnd)="remove(item)" contentClass="flex items-center bg-(--layer-page-layer) p-3">
            <span swipeActionEnd><XMarkIcon /> Delete</span>
            <span class="flex-1">{{ item }}</span>
            <button type="button" class="pointer-coarse:sr-only" (click)="remove(item)">Delete</button>
          </SwipeAction>
        }
      `,
    })
    export class SampleComponent {
      protected readonly items = signal(["Quarterly results", "Hiring plan", "Roadmap"]);

      protected remove(item: string): void {
        this.items.update(list => list.filter(entry => entry !== item));
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="sequenceDiagram
    participant F as Finger
    participant S as SwipeAction
    participant C as Consumer
    F->>S: pointerdown
    F->>S: pointermove, 8px
    S->>S: horizontal or vertical?
    Note over S: vertical, the browser scrolls and the gesture ends
    S->>S: horizontal, capture the pointer, the row follows
    F->>S: pointerup past the threshold
    S->>C: swipedEnd or swipedStart
    S->>S: the row slides back, the click of the release is swallowed"
/>

* **Only a finger or a pen** drives it (`pointerType` other than `mouse`): with a mouse the row keeps its hover actions,
  and selecting text by dragging is untouched.
* **A vertical drag is the browser's.** The host sets `touch-action: pan-y`, so a list still scrolls, and a gesture that
  starts vertical is dropped for good.
* **The layers are as wide as the space the drag frees**, pinned to their edge: they never sit behind the row, so the
  row needs no opaque background of its own to hide them.
* **A direction that is not enabled does not move at all** — the row does not give way to the left if only `startEnabled`
  is set.
* **The release does not click.** The click the browser fires under the finger after a drag is swallowed, so a swipe never
  opens the row it deletes.
* Past the threshold the layer turns solid (white text on the full colour of its tone) and the action grows a little: the layer carries `data-armed`, so a release now triggers it. Pulling back under the threshold disarms it.
* The row slides back after every release, whether or not it triggered: the consumer decides what the action does (remove
  the item, toggle a favourite) and the row is re-rendered from there.

## Recipes [#recipes]

### Two actions, one per direction [#two-actions-one-per-direction]

<CodeSample id="swipe-action-both" title="Favourite to the right, delete to the left">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { StarIcon, SwipeActionComponent, XMarkIcon } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SwipeActionComponent, StarIcon, XMarkIcon],
      template: `
        <SwipeAction
          startEnabled
          endEnabled
          startTone="warning"
          endTone="error"
          (swipedStart)="favorite()"
          (swipedEnd)="remove()"
          contentClass="flex items-center bg-(--layer-page-layer) p-3">
          <span swipeActionStart><StarIcon /> Favourite</span>
          <span swipeActionEnd><XMarkIcon /> Delete</span>
          <span>Quarterly results</span>
        </SwipeAction>
      `,
    })
    export class SampleComponent {
      protected favorite(): void {}
      protected remove(): void {}
    }
    ```
  </Lang>
</CodeSample>

By convention the **left** swipe (`end`) is the destructive one, as on iOS, and the **right** swipe (`start`) the
positive one. `startTone` / `endTone` take `success`, `warning`, `error` or `accent`, all galactik tokens.

### Only on a touch screen [#only-on-a-touch-screen]

`SwipeAction` is inert with a mouse, so it can wrap the row on every device. What changes under a finger is the visible
button, which the swipe replaces:

```html
<button class="pointer-coarse:sr-only" (click)="remove()">Delete</button>
```

Keep it in the DOM (`sr-only`), not `hidden`: a screen reader on a tablet still needs it.

### A row that must not swipe [#a-row-that-must-not-swipe]

Set `[disabled]="true"`, or leave both `*Enabled` inputs off. The host then drops `touch-action` too.

## Options [#options]

<TypeTable
  type="{
  startEnabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Allows a drag to the right, which reveals the `[swipeActionStart]` slot.&#x22; },
  endEnabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Allows a drag to the left, which reveals the `[swipeActionEnd]` slot.&#x22; },
  startTone: { type: &#x22;'success' | 'warning' | 'error' | 'accent'&#x22;, default: &#x22;'success'&#x22;, description: &#x22;Colour of the layer a drag to the right reveals.&#x22; },
  endTone: { type: &#x22;'success' | 'warning' | 'error' | 'accent'&#x22;, default: &#x22;'error'&#x22;, description: &#x22;Colour of the layer a drag to the left reveals.&#x22; },
  threshold: { type: &#x22;number&#x22;, default: &#x22;96&#x22;, description: &#x22;Distance in px past which releasing the row triggers the action.&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Turns the gesture off, `touch-action` included.&#x22; },
  contentClass: { type: &#x22;string&#x22;, description: &#x22;Classes of the layer that slides: the layout of the row, its hover colours, its background.&#x22; },
  class: { type: &#x22;string&#x22;, description: &#x22;Classes merged on the host.&#x22; },
  swipedStart: { type: &#x22;OutputEmitterRef<void>&#x22;, description: &#x22;The row was released past the threshold after a drag to the right.&#x22; },
  swipedEnd: { type: &#x22;OutputEmitterRef<void>&#x22;, description: &#x22;The row was released past the threshold after a drag to the left.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The row slides but nothing reveals">
    The slot is projected by its attribute: `<span swipeActionEnd>` for a drag to the left, `<span swipeActionStart>` for a drag
    to the right. A slot with no matching `*Enabled` input is not rendered at all.
  </Accordion>

  <Accordion title="A tap on the row after a swipe does nothing">
    The click that follows a drag is swallowed on purpose, for 400ms at most. If the finger left the row and no click came, the
    swallow ends by itself and the next tap is a genuine one.
  </Accordion>

  <Accordion title="A unit test cannot drive the swipe">
    JSDOM has no layout: `clientWidth` is 0, so the row is not clamped, and `setPointerCapture` may be missing. Dispatch
    `pointerdown`, `pointermove` and `pointerup` events with `pointerType: "touch"` and assert on the emitted output.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Breakpoint observer" href="../integration/breakpoint-observer.mdx">
    `isTouch()` and `provideInputModality()`: how the library tells a finger from a mouse.
  </Card>

  <Card title="Sortable" href="./sortable.mdx">
    The other gesture of a list: reorder it by drag and drop or from the keyboard.
  </Card>
</Cards>
