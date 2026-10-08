# Floating panel (/docs/galactik/overlay/floating-panel)

injectFloatingPanel keeps a popup — a combobox's list, a submenu — under or beside an anchor with Floating UI, as wide as the anchor on request and in the top layer above a dialog.



`injectFloatingPanel()` positions a panel against an anchor with Floating UI. It is what `Select`, `Autocomplete`,
`SubMenu` and a combobox's popup in general need, and what each of them used to write by hand: wait for the panel and the
anchor, follow them with `autoUpdate`, compute the position, write `left` and `top`, stop on destroy. For a panel opened by
a button and light-dismissed, [`PopoverDirective`](./popover.mdx) is enough; reach for this one when the anchor is not the
trigger, the panel is created later (a combobox renders its popup when it opens), or it must not close on an outside press.

## Minimal example [#minimal-example]

<CodeSample id="floating-panel-basic" title="A panel under a field, as wide as it">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, ElementRef, signal, viewChild } from "@angular/core";
    import { injectFloatingPanel } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      template: `
        <button #anchor type="button" (click)="open.set(!open())">Open</button>
        @if (open()) {
          <div #panel class="fixed z-50 rounded border bg-white p-3 shadow">Hung from the button.</div>
        }
      `,
    })
    export class SampleComponent {
      protected readonly open = signal(true);
      private readonly anchor = viewChild<ElementRef<HTMLElement>>("anchor");
      private readonly panel = viewChild<ElementRef<HTMLElement>>("panel");

      constructor() {
        injectFloatingPanel({
          panel: () => this.panel()?.nativeElement,
          anchor: () => this.anchor()?.nativeElement,
          matchAnchorWidth: true,
        });
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

* **The panel must be `position: fixed`**, as a class on it: it is then never in flow, not even on the frame it is created.
  Floating UI answers in viewport coordinates; without `fixed` they would be relative to the offset parent and the panel
  would drift by the page's scroll.
* **It is hidden until placed.** The panel is `visibility: hidden` until its first position is computed, so it never
  paints for a frame in the corner of the page.
* **It may come and go.** `panel` and `anchor` are signal reads: the panel is positioned each time it appears, and the
  `autoUpdate` of the previous one is stopped.
* **`topLayer`** makes the panel a manual popover (`popover="manual"` and `showPopover()`): it goes above a `<dialog>`
  and outside the clipping of every ancestor, and is hidden again when it goes away. Without it, a modal dialog clips what
  overflows its own box.

## Options [#options]

<TypeTable
  type="{
  panel: { type: &#x22;() => HTMLElement | null | undefined&#x22;, description: &#x22;Required. The panel; a signal read — it may appear and disappear.&#x22; },
  anchor: { type: &#x22;() => HTMLElement | null | undefined&#x22;, description: &#x22;Required. The element the panel hangs from: the field box, a trigger, the parent item of a submenu.&#x22; },
  placement: { type: &#x22;Placement | (() => Placement)&#x22;, default: '&#x22;bottom-start&#x22;', description: &#x22;Any Floating UI placement; it flips and shifts when the room runs out.&#x22; },
  offset: { type: &#x22;number&#x22;, default: &#x22;4&#x22;, description: &#x22;Distance from the anchor, in pixels.&#x22; },
  padding: { type: &#x22;number&#x22;, default: &#x22;8&#x22;, description: &#x22;Margin kept from the viewport edges when the panel is shifted back in.&#x22; },
  anchorWidthVariable: { type: &#x22;string&#x22;, description: 'A CSS custom property (&#x22;--select-trigger-w&#x22;) that receives the anchor\'s width, for the panel\'s own CSS.' },
  matchAnchorWidth: { type: &#x22;boolean | (() => boolean)&#x22;, default: &#x22;false&#x22;, description: &#x22;Gives the panel the width of the anchor (an inline width).&#x22; },
  topLayer: { type: &#x22;boolean | (() => boolean)&#x22;, default: &#x22;false&#x22;, description: &#x22;Puts the panel in the browser's top layer, above a dialog.&#x22; },
  afterPosition: { type: &#x22;(anchor: HTMLElement, panel: HTMLElement) => void&#x22;, description: &#x22;Runs after each position update.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The panel appears at the corner of the page, or drifts when the page scrolls">
    It is not `position: fixed`. Put `fixed` in the panel's class: the helper writes viewport coordinates and relies on it.
  </Accordion>

  <Accordion title="The panel is cut by a dialog or by an ancestor with overflow hidden">
    Turn on `topLayer`. A `fixed` panel escapes an ancestor's `overflow`, but a modal `<dialog>` and a `transform`ed ancestor
    still clip or re-anchor it; the top layer is above all of them.
  </Accordion>

  <Accordion title="Calling it outside a constructor throws">
    It creates an `afterRenderEffect`, which needs an injection context: call it from the constructor (or a field initializer)
    of the component that owns the panel.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Popover" href="./popover.mdx">
    The directive for a panel opened by a button and light-dismissed.
  </Card>

  <Card title="Menu" href="./menu.mdx">
    Its submenus are positioned with this helper.
  </Card>
</Cards>
