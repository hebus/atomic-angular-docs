# Sheet (/docs/galactik/overlay/sheet)

A modal panel anchored to one edge of the viewport — the drawer pattern — built on the same native <dialog> as Dialog, with its own slide-in/out animation and scroll lock.



Filters sliding in from the right, a navigation panel from the left, a mobile action tray from the bottom —
`Sheet` is that edge-anchored panel. It is built on a native `<dialog>` opened with `showModal()`, exactly as
[Dialog](./dialog.mdx) is: a sheet **is** a modal dialog, only its geometry differs, so both share the same
`DIALOG_REF`/`MODAL_LABEL` tokens and the same `DialogEvent` close events.

<Callout title="Concept — the dialog *is* the panel">
  Unlike `Dialog`, `Sheet` has no inner content element: the `<dialog>` itself carries the surface, the geometry
  and the animation. A native modal `<dialog>` already exposes `role="dialog"` and `aria-modal="true"`, so an
  inner element repeating them would put a second, redundant dialog in the accessibility tree — and the element
  that animates has to be the one the component owns, which projected content is not.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="sheet-basic" title="A right-hand panel, opened from a button">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import {
      ButtonComponent,
      DialogTitleComponent,
      SheetBodyComponent,
      SheetComponent,
      SheetHeaderComponent,
    } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SheetComponent, SheetHeaderComponent, SheetBodyComponent, DialogTitleComponent, ButtonComponent],
      template: `
        <button variant="secondary" size="md" (click)="panel.open()">Open panel</button>

        <Sheet #panel="sheet" side="right" size="md">
          <SheetHeader closeLabel="Close panel">
            <DialogTitle>Document details</DialogTitle>
          </SheetHeader>
          <SheetBody>
            <p class="modal-body-text">Everything you never wanted to know about this document.</p>
          </SheetBody>
        </Sheet>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

`#panel="sheet"` reads `SheetComponent` off its `exportAs`, then `open()` (an alias for `showModal()`) shows it.
There is no intermediate content element — `SheetHeader`/`SheetBody` project straight into `<Sheet>`.

## How it works [#how-it-works]

`side` is what distinguishes a sheet from a dialog: it drives the inset, the size axis (a **width** for
`left`/`right`, a **height** for `top`/`bottom`), the border, the rounded corners (the two corners flush
against the viewport stay square) and the slide direction, all from the one input.

| `size`                     | `left` / `right` (width) | `top` / `bottom` (height) |
| -------------------------- | ------------------------ | ------------------------- |
| `sm`                       | 400px                    | 25% of the viewport       |
| `md&#x60; &#x2A;(default)* | 520px                    | 33% of the viewport       |
| `lg`                       | 720px                    | 50% of the viewport       |
| `xl`                       | 960px                    | 75% of the viewport       |
| `full`                     | `100dvw`                 | `100dvh`                  |

Opening and closing both come from the same two CSS declarations — no keyframes, no JavaScript timer:

<Mermaid
  chart="flowchart TD
    A[&#x22;showModal()&#x22;] --> B[&#x22;native dialog opens: top layer, focus trap, ::backdrop&#x22;]
    B --> C[&#x22;@starting-style gives the transition a starting value -> slides in&#x22;]
    D[&#x22;close()&#x22;] --> E[&#x22;display / overlay declared allow-discrete&#x22;]
    E --> F[&#x22;panel stays visible and in the top layer while it slides out&#x22;]
    F --> G[&#x22;getAnimations() + Promise.allSettled -> closeEnd once settled&#x22;]"
/>

`getAnimations()` rather than a `transitionend` listener: a transition that is **interrupted** emits
`transitioncancel`, never `transitionend`, and one that never starts — under `prefers-reduced-motion`, where
every duration is zero — emits nothing at all. Both were measured on a consumer, where the projected content
stayed mounted for good inside a hidden panel because `closeEnd` never fired to release it.

**The page scroll is locked while a sheet is open** — the one deliberate divergence from `Dialog`. A dialog
covers a small part of the viewport and locks nothing; a sheet covers a whole edge of it, so a wheel or touch
drag scrolling the page behind it would be disorienting. The lock is counted (`openSheets`), so stacked sheets
restore the previous value only once, at the last close — and it compensates for the scrollbar it removes with
an equal `padding-right`, so a consumer's width-based media query (a `BreakpointObserverService` mobile/desktop
split, say) never observes a spurious viewport-width change from opening one.

## Recipes [#recipes]

### The four sides [#the-four-sides]

<CodeSample id="sheet-sides" title="Switching side and size at runtime">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import {
      ButtonComponent,
      DialogTitleComponent,
      SheetBodyComponent,
      SheetComponent,
      SheetHeaderComponent,
    } from "@sinequa/galactik";

    type Side = "left" | "right" | "top" | "bottom";

    @Component({
      selector: "sample-component",
      imports: [SheetComponent, SheetHeaderComponent, SheetBodyComponent, DialogTitleComponent, ButtonComponent],
      template: `
        @for (s of sides; track s) {
          <button variant="secondary" size="md" (click)="side.set(s)">{{ s }}</button>
        }
        <button variant="secondary" size="md" (click)="panel.open()">Open from {{ side() }}</button>

        <Sheet #panel="sheet" [side]="side()" size="md">
          <SheetHeader closeLabel="Close">
            <DialogTitle>Anchored {{ side() }}</DialogTitle>
          </SheetHeader>
          <SheetBody>
            <p class="modal-body-text">A left/right panel is sized by its width, a top/bottom one by its height.</p>
          </SheetBody>
        </Sheet>
      `,
    })
    export class SampleComponent {
      protected readonly sides: Side[] = ["left", "right", "top", "bottom"];
      protected readonly side = signal<Side>("right");
    }
    ```
  </Lang>
</CodeSample>

### A footer with actions [#a-footer-with-actions]

`SheetFooter` is a right-aligned action row on a tinted band, pinned below the scrollable body. Every close
path — a footer button, the header's close button, `Escape`, a scrim click — lands on the same `closed` output.

<CodeSample id="sheet-footer" title="Filters panel with Cancel/Apply">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import {
      ButtonComponent,
      type DialogEvent,
      DialogTitleComponent,
      SheetBodyComponent,
      SheetComponent,
      SheetFooterComponent,
      SheetHeaderComponent,
    } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [
        SheetComponent,
        SheetHeaderComponent,
        SheetBodyComponent,
        SheetFooterComponent,
        DialogTitleComponent,
        ButtonComponent,
      ],
      template: `
        <button variant="secondary" size="md" (click)="panel.open()">Edit filters</button>

        <Sheet #panel="sheet" side="right" size="md" (closed)="onClosed($event)">
          <SheetHeader closeLabel="Close">
            <DialogTitle>Filters</DialogTitle>
          </SheetHeader>
          <SheetBody>
            <p class="modal-body-text">Narrow the result set.</p>
          </SheetBody>
          <SheetFooter>
            <button variant="secondary" size="md" (click)="panel.cancel()">Cancel</button>
            <button variant="primary" size="md" (click)="panel.close('dialog-confirm')">Apply</button>
          </SheetFooter>
        </Sheet>
      `,
    })
    export class SampleComponent {
      protected onClosed(event: DialogEvent) {
        console.log("Sheet closed with", event);
      }
    }
    ```
  </Lang>
</CodeSample>

### A panel with no visible title [#a-panel-with-no-visible-title]

A sheet still needs an accessible name with no heading in the design. `ariaLabel` provides it directly and
takes precedence over `labelledby` and over any projected title; `closeButton` floats a close affordance for a
full-bleed panel that carries no `SheetHeader` at all.

<CodeSample id="sheet-no-title" title="A full-bleed action tray">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { ButtonComponent, SheetBodyComponent, SheetComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SheetComponent, SheetBodyComponent, ButtonComponent],
      template: `
        <button variant="secondary" size="md" (click)="panel.open()">Quick actions</button>

        <Sheet #panel="sheet" side="bottom" size="sm" ariaLabel="Quick actions" [closeButton]="true" closeLabel="Close quick actions">
          <SheetBody>
            <button variant="secondary" size="md">Share</button>
            <button variant="secondary" size="md">Export</button>
          </SheetBody>
        </Sheet>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Returning a value — `createCallable` [#returning-a-value--createcallable]

A sheet that answers a question — pick a collection, confirm an export — opens imperatively and resolves,
exactly like a callable dialog: `createCallable` takes any standalone component, and nothing in that path
requires a `<dialog>` element, so a `Sheet` works with it unchanged. Wire `end()` to `closeEnd` rather than to
the click that closes the panel — that is what lets the exit animation play before the component is destroyed.

<CodeSample id="sheet-callable" title="Picking a collection, awaited">
  <Lang value="angular">
    ```ts title="pick-collection.sheet.ts"
    import { afterNextRender, Component, viewChild } from "@angular/core";
    import {
      createCallable,
      DialogTitleComponent,
      injectCallRef,
      SheetBodyComponent,
      SheetComponent,
      SheetFooterComponent,
      SheetHeaderComponent,
    } from "@sinequa/galactik";

    @Component({
      selector: "pick-collection-sheet",
      imports: [SheetComponent, SheetHeaderComponent, SheetBodyComponent, SheetFooterComponent, DialogTitleComponent],
      template: `
        <Sheet #panel side="right" size="sm" (closeEnd)="call.end(picked)">
          <SheetHeader closeLabel="Close">
            <DialogTitle>{{ call.props().title }}</DialogTitle>
          </SheetHeader>

          <SheetBody>
            @for (name of call.props().collections; track name) {
              <button type="button" (click)="choose(name)">{{ name }}</button>
            }
          </SheetBody>

          <SheetFooter>
            <button type="button" (click)="panel().close()">Cancel</button>
          </SheetFooter>
        </Sheet>
      `,
    })
    export class PickCollectionSheet {
      protected readonly call = injectCallRef<{ title: string; collections: string[] }, string | undefined>();
      protected readonly panel = viewChild.required(SheetComponent);
      protected picked: string | undefined;

      constructor() {
        // The component is created already "open" — nothing else would show it.
        afterNextRender(() => this.panel().open());
      }

      protected choose(name: string) {
        this.picked = name;
        this.panel().close();
      }
    }

    export const PickCollection = createCallable(PickCollectionSheet);
    ```
  </Lang>
</CodeSample>

Cancelling resolves with `undefined`, since `picked` was never set — the promise always settles, whichever way
the panel closed, `Escape` and a scrim click included. Reach for this only when the panel's *purpose* is to
produce an answer for its caller; a panel driven by state that lives elsewhere (a preview bound to the current
selection) has no result to await, and a declarative `<Sheet>` fits better there.

## Options [#options]

<TypeTable
  type="{
  side: {
    type: '&#x22;left&#x22; | &#x22;right&#x22; | &#x22;top&#x22; | &#x22;bottom&#x22;',
    default: '&#x22;right&#x22;',
    description: &#x22;Edge the panel is anchored to. Drives the inset, the size axis, the border, the corners and the slide direction.&#x22;,
  },
  size: {
    type: '&#x22;sm&#x22; | &#x22;md&#x22; | &#x22;lg&#x22; | &#x22;xl&#x22; | &#x22;full&#x22;',
    default: '&#x22;md&#x22;',
    description: &#x22;Extent along the axis side implies — a width for left/right, a height for top/bottom. See the table above.&#x22;,
  },
  labelledby: {
    type: &#x22;string&#x22;,
    description: &#x22;Explicit aria-labelledby; otherwise falls back to the id published by a projected DialogTitle.&#x22;,
  },
  ariaLabel: {
    type: &#x22;string&#x22;,
    description: &#x22;Accessible name for a panel with no visible title. Takes precedence over labelledby and any projected title.&#x22;,
  },
  dismissible: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;Whether a click on the scrim closes the sheet. Escape closes it either way — see Pitfalls.&#x22;,
  },
  closeButton: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description: &#x22;Floats a close button over the panel, for a full-bleed sheet with no SheetHeader to carry one.&#x22;,
  },
  closeLabel: {
    type: &#x22;string&#x22;,
    default: '&#x22;Close&#x22;',
    description: &#x22;Accessible name of the close buttons: the floating one, and every SheetHeader's unless it sets its own closeLabel. Its icon is decorative — translate this.&#x22;,
  },
  class: {
    type: &#x22;string&#x22;,
    description: &#x22;Additional CSS classes, merged via cn(), onto the <dialog> itself.&#x22;,
  },
}"
/>

`closed` emits a `DialogEvent` once per close, however triggered. `closeEnd` emits once the exit animation has
settled and the content has left the DOM — use it, not `closed`, to release anything rendered inside the
panel.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A panel with no title is announced as a bare &#x22;dialog&#x22; by screen readers">
    `Sheet` invents no default accessible name. Project a `DialogTitle` into `SheetHeader`, or set `ariaLabel` (or
    `labelledby`) — one of the three is required for an accessible sheet, and this is the single most common way
    to ship one that is not.
  </Accordion>

  <Accordion title="Escape still closes the sheet even with [dismissible]=&#x22;false&#x22;">
    Expected. `dismissible` only neutralizes the scrim click — `Escape` is native `<dialog>` behavior, and the
    component does not fight it. Suppressing `Escape` would trap a keyboard user inside the panel, which is worse
    than the dismissal you were trying to prevent.
  </Accordion>

  <Accordion title="A form inside the sheet resets every time the panel reopens">
    The projected tree is destroyed once the exit animation ends, so any state held in a component inside the body
    starts over on the next `open()`. Keep state that must survive a close in the host component, not in a child
    mounted only while the sheet is open.
  </Accordion>

  <Accordion title="Content briefly stays visible, or a selection driving the panel is never released">
    If you release resources or reset selection state in response to `(closed)`, do it in `(closeEnd)` instead.
    `closed` fires when closing **starts** — reacting to it by dropping the content a consumer renders inside the
    panel empties it while it is still sliding off-screen. `closeEnd` fires once the exit animation has actually
    settled (immediately, under reduced motion).
  </Accordion>

  <Accordion title="Two different Sheet components, same class names">
    `@sinequa/ui` ships its own `Sheet` (a Radix-style tree of `sheet-root`/`sheet-content`/… driven by a
    `SheetService`, no native `<dialog>` underneath) exporting the very same class names —
    `SheetComponent`/`SheetHeaderComponent`/`SheetFooterComponent` — and, critically, its root selector is the bare
    `sheet`, which also matches Galactik's `Sheet, sheet` selector pattern. That collision is why this `Sheet` has
    **no lowercase `sheet` alias yet**: importing both into the same template makes two components fight over one
    element. Always check the import path, and never import a `Sheet*`/`[sheetClose]`/`[sheetTrigger]` symbol from
    `@sinequa/ui` in a file that also uses this one.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Dialog" href="./dialog.mdx">
    The tokens, close events and imperative call/result API this component shares with Sheet.
  </Card>

  <Card title="Menu" href="./menu.mdx">
    An accessible dropdown/contextual menu, itself built as a popover.
  </Card>
</Cards>
