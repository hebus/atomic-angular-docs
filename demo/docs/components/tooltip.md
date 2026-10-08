# Tooltip

`tooltip` shows a short description next to any element, on hover **and** on keyboard focus. It is placed by Floating UI in the browser's top layer, so it goes above a `<dialog>` and is never clipped. It replaces the `[tooltip]` directive of `@sinequa/ui`, with the same selector: import `TooltipDirective` from `@sinequa/galactik` instead — one library per template.

```ts
import { TooltipDirective } from "@sinequa/galactik";
```

A tooltip *describes*, it does not name: the host gets `aria-describedby` while the tooltip is open. An icon-only button still needs its own `aria-label`.

## Basic

Hover, or reach the buttons with `Tab`. `Esc` closes the tooltip (and not the dialog around it).

<demo-tooltip-basic></demo-tooltip-basic>

```html
<button type="button" tooltip="Saves the document">Save</button>
<button type="button" aria-label="Delete" tooltip="Delete this item (Del)">…</button>
```

## Position

`tooltipPosition` takes `top`, `bottom`, `left`, `right` or any Floating UI placement (`top-start`…). The default is `bottom`. The tooltip flips and shifts when the room runs out.

<demo-tooltip-positions></demo-tooltip-positions>

```html
<button type="button" tooltip="Placed top" tooltipPosition="top">top</button>
```

## Arrow

The tooltip points at its host with an arrow, on the side that touches it (it follows the flip). `[tooltipArrow]="false"` removes it.

<demo-tooltip-arrow></demo-tooltip-arrow>

```html
<button type="button" tooltip="With an arrow">…</button>
<button type="button" tooltip="Without" [tooltipArrow]="false">…</button>
```

## Timing and events

`showDelay`, `hideDelay` and `life` are in milliseconds. By default the tooltip stays open while the pointer is over it (`autoHide`, WCAG 1.4.13): a short grace lets the pointer cross onto it. Turn `autoHide` off for a tooltip that must close the moment the pointer leaves. `tooltipEvent` is `hover`, `focus` or `both` (default).

<demo-tooltip-timing></demo-tooltip-timing>

```html
<button type="button" tooltip="Shown after 800 ms" [showDelay]="800">…</button>
<button type="button" tooltip="Gone after 2 s" [life]="2000">…</button>
<button type="button" tooltip="Closes at once" [autoHide]="false">…</button>
<button type="button" tooltip="Keyboard only" tooltipEvent="focus">…</button>
```

## Templates and HTML

The content can be given four ways: a text (`tooltip="…"`), a `TemplateRef` (`[tooltip]="help"`), an `<ng-template tooltip-content>` declared inside the host, or `tooltipLabel` in `[tooltipOptions]`. `[escape]="false"` renders a text as HTML (sanitized by Angular). All of them are in the demo below, in the order of the code.

<demo-tooltip-template></demo-tooltip-template>

```html
<!-- 1. A TemplateRef -->
<button type="button" [tooltip]="help">With a template</button>
<ng-template #help>
  <strong>Quick search</strong>
  <span>Press <kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere.</span>
</ng-template>

<!-- 2. A template declared inside the host -->
<button type="button" tooltip>
  With tooltip-content
  <ng-template tooltip-content><em>Declared inside the host</em></ng-template>
</button>

<!-- 3. HTML in a text (sanitized by Angular) -->
<button type="button" tooltip="<b>Bold</b> and <i>italic</i>" [escape]="false">HTML (escape off)</button>

<!-- 4. Everything in one object -->
<button type="button" tooltip [tooltipOptions]="options">With tooltipOptions</button>
```

```typescript
protected readonly options: TooltipOptions = {
  tooltipLabel: "Text, position and delay in one object",
  tooltipPosition: "right",
  showDelay: 300
};
```

## From code

`exportAs="tooltip"` gives the directive instance: `show()` and `hide()` skip the delays, `isOpen` is a signal.

<demo-tooltip-programmatic></demo-tooltip-programmatic>

```html
<button type="button" tooltip="Copied to the clipboard" #copied="tooltip" (click)="copied.show()">Copy</button>
<button type="button" (click)="copied.hide()">Hide it</button>
<span>Open: {{ copied.isOpen() }}</span>
```

## In a dialog

A modal dialog makes the rest of the document `inert`, so the tooltip is rendered inside the closest `<dialog>` of its host (in `body` otherwise): it goes above the dialog's content, stays hoverable, and its text can be selected. The modal also holds a popover with a tooltip (a popover inside a dialog): the tooltip goes into the popover. Open the dialog, then check that the pointer can go onto the tooltip, that `Tab` opens it, and that `Escape` closes the tooltip first and the dialog second.

<demo-tooltip-dialog></demo-tooltip-dialog>

```html
<button type="button" (click)="modal.showModal()">Open a modal dialog</button>

<dialog #modal>
  <DialogContent size="md">
    <DialogHeader closeLabel="Close"><DialogTitle>Tooltips in a modal dialog</DialogTitle></DialogHeader>
    <DialogBody>
      <button type="button" tooltip="Above the dialog, and hoverable">Hover me</button>
      <button type="button" tooltip="Opens on keyboard focus too" tooltipPosition="right">Tab to me</button>
      <button type="button" popovertarget="inner">A popover in the dialog</button>
      <div popover id="inner">
        <button type="button" tooltip="A tooltip in a popover in a modal dialog">Hover me</button>
      </div>
    </DialogBody>
  </DialogContent>
</dialog>
```

## In a popover

A popover in `auto` mode closes on a click outside of it, so the tooltip is rendered inside the closest `[popover]` too: clicking on the tooltip does not close the popover. Hover a button, click on its tooltip, and check that the popover stays open.

<demo-tooltip-popover></demo-tooltip-popover>

```html
<button type="button" popovertarget="my-popover">Open a popover</button>

<div popover id="my-popover" class="w-72 p-3">
  <button type="button" tooltip="Click me: the popover must stay open">Hover me</button>
</div>
```

## Disabled

An empty text shows nothing. `tooltipDisabled` turns a tooltip off without removing it (PrimeNG calls it `disabled`; that name is the native attribute of a button).

<demo-tooltip-disabled></demo-tooltip-disabled>

```html
<button type="button" tooltip="I can be turned off" [tooltipDisabled]="!enabled()">Target</button>
```
