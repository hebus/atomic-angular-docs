# Tooltip (/docs/galactik/overlay/tooltip)

A short description shown next to any element on hover and keyboard focus, placed in the top layer — the galactik replacement of the @sinequa/ui tooltip directive.



`TooltipDirective` (`[tooltip]`) shows a short text, or a template, next to the element it sits on. It opens on
hover **and** on keyboard focus, closes on `Escape`, on blur and on scroll, and lets the pointer move onto the
tooltip without closing it.

<Callout title="Concept — a tooltip describes, it does not name">
  The host gets `aria-describedby` pointing at the tooltip **while it is open**. A screen reader reads the
  description after the element's own name, so an icon-only button still needs an `aria-label`: the tooltip is
  never its accessible name. Keep the text short — anything the user must read or interact with belongs in a
  [Popover](./popover.mdx) or a [Dialog](./dialog.mdx).
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="tooltip-basic" title="A tooltip on a button">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { TooltipDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TooltipDirective],
      template: `
        <button type="button" aria-label="Delete" tooltip="Delete this item" tooltipPosition="top">Delete</button>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="sequenceDiagram
    participant U as User
    participant H as Host with tooltip
    participant D as TooltipDirective
    participant P as tooltip-panel
    U->>H: mouseenter or keyboard focus
    H->>D: event, after showDelay
    D->>P: createComponent, appended to body
    P->>P: injectFloatingPanel, top layer, autoUpdate, flip, shift
    D->>H: aria-describedby gets the panel id
    U->>D: Escape, blur, scroll, a click elsewhere, press, or the pointer leaves
    D->>P: destroy, listeners and aria-describedby removed"
/>

The panel is a `role="tooltip"` element created on demand — inside the closest `<dialog>` or `[popover]` when the host is in one (a modal dialog makes everything outside it `inert`, and a popover closes on a click outside of it: left on `body`, the tooltip could no longer be hovered or clicked), in `body` otherwise — and positioned by
[`injectFloatingPanel`](./floating-panel.mdx) as a manual popover: it renders in the top layer, above a `<dialog>`
and outside the clipping of any ancestor, with no `z-index`. Nothing listens on the document while the tooltip is
closed — the `Escape`, `scroll` and `click` listeners are added when it opens and removed when it closes.

A press on the host (`pointerdown`, `click`) closes the tooltip, and the focus that a press gives a button does
not open it again: only a keyboard focus does.

A tap does not open it: a browser follows a tap with the pretend mouse events of a mouse (a `mouseenter` among them), and the
tooltip ignores the one that comes after a touch `pointerdown`. A mouse, and a pen, which does hover, open it as usual.

A click or a tap anywhere outside the tooltip and its host closes it too. It is what makes a tooltip usable on a touch
screen, where nothing hovers and no keyboard focus ever comes: give the information a button that opens it
with `show()` (`#tip="tooltip"`, then `(click)="tip.isOpen() ? tip.hide() : tip.show()"`), and the next tap
elsewhere closes it. The listener is armed one task after the tooltip opens, so the click of that button never
closes what it has just opened, and a second tap on it closes the tooltip without reopening it.

## Recipes [#recipes]

### A template as the content [#a-template-as-the-content]

Pass a `TemplateRef`, or declare an `<ng-template tooltip-content>` inside the host.

<CodeSample id="tooltip-template" title="A tooltip with a template">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { KbdComponent, TooltipContentDirective, TooltipDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [KbdComponent, TooltipContentDirective, TooltipDirective],
      template: `
        <button type="button" [tooltip]="help">Search</button>
        <ng-template #help>Press <kbd>Ctrl</kbd> + <kbd>K</kbd></ng-template>

        <button type="button" tooltip>
          Filters
          <ng-template tooltip-content><em>Narrow the results</em></ng-template>
        </button>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Delays, lifetime, and which event opens it [#delays-lifetime-and-which-event-opens-it]

<CodeSample id="tooltip-timing" title="Delays and events">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { TooltipDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TooltipDirective],
      template: `
        <button type="button" tooltip="Opens after 800 ms" [showDelay]="800">Slow</button>
        <button type="button" tooltip="Gone after 2 s" [life]="2000">Short-lived</button>
        <button type="button" tooltip="Closes the moment you leave" [autoHide]="false">Strict</button>
        <button type="button" tooltip="Keyboard focus only" tooltipEvent="focus">Focus</button>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Everything in one object [#everything-in-one-object]

`[tooltipOptions]` takes the same settings as the inputs. An input set on its own wins over the object.

<CodeSample id="tooltip-options" title="tooltipOptions">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { TooltipDirective, type TooltipOptions } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TooltipDirective],
      template: `<button type="button" tooltip [tooltipOptions]="options">Save</button>`,
    })
    export class SampleComponent {
      protected readonly options: TooltipOptions = {
        tooltipLabel: "Saves the document",
        tooltipPosition: "right",
        showDelay: 300,
      };
    }
    ```
  </Lang>
</CodeSample>

### Driving it from code [#driving-it-from-code]

`exportAs="tooltip"` gives the instance: `show()`, `hide()` and the `isOpen` signal.

<CodeSample id="tooltip-programmatic" title="Show and hide from code">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { TooltipDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TooltipDirective],
      template: `
        <button type="button" tooltip="Copied" #copied="tooltip" (click)="copied.show()">Copy</button>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Only when the text is cut off [#only-when-the-text-is-cut-off]

A truncated label (`truncate`, `line-clamp-2`) hides part of its text, and a tooltip is the natural way to give it back —
but a tooltip on a label that fits only repeats it. `TruncatedDirective` (`[truncated]`) measures the element and
exposes `isTruncated()` through `exportAs="truncated"`: bind its negation to `tooltipDisabled`.

<CodeSample id="tooltip-truncated" title="A tooltip that appears only on a cut-off text">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { TooltipDirective, TruncatedDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TooltipDirective, TruncatedDirective],
      template: `
        <p class="w-48">
          <span class="block truncate" truncated #cut="truncated" [tooltip]="label" [tooltipDisabled]="!cut.isTruncated()">{{ label }}</span>
        </p>
      `,
    })
    export class SampleComponent {
      protected readonly label = "Consolidated financial statements of the european subsidiaries";
    }
    ```
  </Lang>
</CodeSample>

The measure is taken when the element is rendered and again whenever its size changes. When the element that is cut
sits inside the host (the label of a `<ListItemText>`, whose host is never clamped itself), give its CSS selector as
the value: `truncated=".list-item-text"`.

The text counts as cut when its content is larger than its box: `scrollHeight > clientHeight + 1` for a `line-clamp-*`
that hides lines, or `scrollWidth > clientWidth + 1` for a `truncate` that hides the end of a line (the `+ 1`
absorbs sub-pixel rounding). Nothing is measured on the server, where `isTruncated()` stays `false`, and a text that
changes without the box changing size is measured again at the next resize only.

### Only when the placeholder is cut off [#only-when-the-placeholder-is-cut-off]

`TruncatedDirective` cannot measure a placeholder: it is not content of the field, so the `scrollWidth` of an `<input>`
says nothing about it. `PlaceholderClippedDirective` (`input[placeholderClipped]`) measures the text with the font of the
field and compares it with the room the field leaves it. `isClipped()` is exposed through `exportAs="placeholderClipped"`.

<CodeSample id="tooltip-placeholder-clipped" title="A tooltip that gives back a cut-off placeholder">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { PlaceholderClippedDirective, TooltipDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TooltipDirective, PlaceholderClippedDirective],
      template: `
        <input
          class="w-48"
          placeholderClipped
          #clip="placeholderClipped"
          [placeholder]="hint"
          [tooltip]="hint"
          [tooltipDisabled]="!clip.isClipped() || !!text()"
          (input)="text.set($any($event.target).value)" />
      `,
    })
    export class SampleComponent {
      protected readonly hint = "Search by keyword, by author or by document type";
      protected readonly text = signal("");
    }
    ```
  </Lang>
</CodeSample>

The placeholder disappears as soon as the field holds a value, whatever `isClipped()` says: add `!!text()` to the
condition, as above. The measure is taken when the field is rendered, then again whenever its size or its
`placeholder` changes and once the fonts are loaded. It uses the canvas text metrics, with the letter spacing and the
`uppercase` text transform of the field, against its width minus its horizontal padding (1 px of slack). Nothing is
measured on the server, where `isClipped()` stays `false`. The placeholder is not always the accessible name of the
field: give it its own (`aria-label`), the tooltip being a pointer help.

## Options [#options]

<TypeTable
  type="{
  tooltip: { type: &#x22;string | TemplateRef<unknown> | null | undefined&#x22;, description: &#x22;The content. Empty or blank shows nothing.&#x22; },
  tooltipPosition: { type: &#x22;Placement&#x22;, default: '&#x22;bottom&#x22;', description: &#x22;Where it goes. top, bottom, left, right, or any Floating UI placement (top-start…).&#x22; },
  tooltipEvent: { type: '&#x22;hover&#x22; | &#x22;focus&#x22; | &#x22;both&#x22;', default: '&#x22;both&#x22;', description: &#x22;What opens it.&#x22; },
  showDelay: { type: &#x22;number&#x22;, default: &#x22;0&#x22;, description: &#x22;Milliseconds before it opens.&#x22; },
  hideDelay: { type: &#x22;number&#x22;, default: &#x22;0&#x22;, description: &#x22;Milliseconds before it closes once the pointer left. With autoHide, never below a short grace of 100 ms.&#x22; },
  life: { type: &#x22;number&#x22;, default: &#x22;0&#x22;, description: &#x22;Closes it after that many milliseconds, even if the host is still hovered. 0 = no limit.&#x22; },
  tooltipArrow: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;A small arrow pointing at the host, on the side that touches it (follows the flip). false removes it.&#x22; },
  tooltipOffset: { type: &#x22;number&#x22;, default: &#x22;8&#x22;, description: &#x22;Distance to the host, in pixels.&#x22; },
  autoHide: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Stays open while the pointer is over the tooltip (WCAG 1.4.13). Off, it ignores the pointer.&#x22; },
  hideOnEscape: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Closes on Escape, and keeps that Escape from also closing a dialog around it.&#x22; },
  escape: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;The content is text. false renders it as HTML, sanitized by Angular.&#x22; },
  tooltipDisabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Turns it off. PrimeNG calls this disabled, which is the native attribute of a button.&#x22; },
  tooltipStyleClass: { type: &#x22;string&#x22;, description: &#x22;Classes merged last into the tooltip's own.&#x22; },
  tooltipOptions: { type: &#x22;TooltipOptions&#x22;, description: &#x22;All of the above in one object (tooltipLabel for the text, id for the element id).&#x22; },
}"
/>

The tooltip's width is capped by the `--tooltip-max-w` custom property (default `20rem`); set it on the host
or on an ancestor.

`TruncatedDirective` (`[truncated]`, `exportAs="truncated"`):

<TypeTable
  type="{
  truncated: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;CSS selector, relative to the host, of the element that is cut. Empty: the host itself.&#x22; },
  isTruncated: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Whether the text is cut off, vertically or horizontally, ignoring one pixel of rounding. Read it through the template reference.&#x22; },
}"
/>

`PlaceholderClippedDirective` (`input[placeholderClipped]`, `exportAs="placeholderClipped"`):

<TypeTable
  type="{
  isClipped: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Whether the placeholder is wider than the room of the field. false without a placeholder. Read it through the template reference.&#x22; },
}"
/>

## Migration from @sinequa/ui [#migration-from-sinequaui]

The selector is the same, so a consumer moves with an import change — and cannot use both directives in one
template. What changed, and why:

| `@sinequa/ui`                                | `@sinequa/galactik`                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| Hover only                                   | Hover **and** keyboard focus (`tooltipEvent`), `Escape` closes it                       |
| No ARIA                                      | `role="tooltip"` and `aria-describedby` while open                                      |
| `tooltip-position`                           | `tooltipPosition` (the old name still works)                                            |
| `tooltip-delay` (delay before hiding)        | `hideDelay` (the old name still works)                                                  |
| `tooltip-offset`                             | `tooltipOffset` (the old name still works)                                              |
| `tooltip-duration`, default 3000             | `life`, default 0 — **a tooltip no longer closes by itself** (the old name still works) |
| No arrow                                     | An arrow by default (`[tooltipArrow]="false"` removes it)                               |
| `[strategy]`                                 | Removed: always `fixed`, in the top layer                                               |
| `.tooltip` class styled by the application   | Styled by the library, from galactik tokens                                             |
| Appended to the closest `<dialog>` or `body` | Always in the top layer, above dialogs                                                  |
| `document` scroll listener never removed     | Listeners live only while the tooltip is open                                           |

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A tooltip does not appear on a disabled button">
    A disabled `<button>` receives no pointer events in most browsers, so nothing opens the tooltip. Put the
    directive on a wrapper element, or use `aria-disabled="true"` instead of `disabled`.
  </Accordion>

  <Accordion title="Pressing Escape closed the tooltip but I expected it to close my dialog too">
    By design: the first `Escape` dismisses the tooltip and is `preventDefault`-ed, so the native `cancel` of the
    `<dialog>` does not fire; a second `Escape` closes the dialog. Set `[hideOnEscape]="false"` to opt out.
  </Accordion>

  <Accordion title="The tooltip disappears before the pointer reaches it">
    With `autoHide` off the tooltip closes the moment the pointer leaves the host, so it cannot be hovered.
    Leave `autoHide` on (the default): a 100 ms grace lets the pointer cross the gap.
  </Accordion>

  <Accordion title="Tooltip text is read twice, or not at all">
    The tooltip is a *description*. If the element has no accessible name, add an `aria-label` (an icon-only
    button), and do not repeat the same text in both: a screen reader reads the name, then the description.
  </Accordion>

  <Accordion title="A tooltip on a cut-off text never opens from the keyboard">
    A tooltip opens on the focus of its host. A label inside a list row or a card is not focusable — the row is — so
    the keyboard never reaches the tooltip, and a sighted keyboard user would never read the cut part. Do not move the
    tooltip to the focusable row either: its `aria-describedby` would make a screen reader read the label twice. Lift
    the cut while the row has the focus instead, for instance `in-focus-visible:line-clamp-none` (and
    `in-focus-visible:whitespace-normal` on a one-line `truncate`). The full text is always in the DOM: a screen
    reader reads it whole whether or not it is cut on screen.
  </Accordion>

  <Accordion title="Not supported on this browser">
    The tooltip uses the native Popover API, like [Popover](./popover.mdx): Chrome 114+, Edge 114+, Safari 17+,
    Firefox 125+. Without it the tooltip is still positioned, but without the top layer.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Floating panel" href="./floating-panel.mdx">
    The positioning helper the tooltip is placed with.
  </Card>

  <Card title="Popover" href="./popover.mdx">
    For floating content the user must read or interact with.
  </Card>
</Cards>
