# Tooltip

`tooltip` shows a short description next to any element, on hover **and** on keyboard focus. It is placed by Floating UI in the browser's top layer, so it goes above a `<dialog>` and is never clipped. It replaces the `[tooltip]` directive of `@sinequa/ui`, with the same selector: import `TooltipDirective` from `@sinequa/galactik` instead — one library per template.

```ts
import { TooltipDirective } from "@sinequa/galactik";
```

A tooltip _describes_, it does not name: the host gets `aria-describedby` while the tooltip is open. An icon-only button still needs its own `aria-label`.

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

## Opening a dialog

Pressing the host closes its tooltip, and a dialog it opens does not leave one behind. When the dialog closes it hands the focus back to the host: that focus follows a click, so it does not bring the tooltip back up (only a keyboard focus — `:focus-visible` — does). A tooltip is also never shown next to another one. Click the first button, close the dialog with the mouse, then hover the second button: a single tooltip is shown.

<demo-tooltip-opens-dialog></demo-tooltip-opens-dialog>

```html
<button type="button" tooltip="Opens a dialog" (click)="modal.showModal()">Open a dialog</button>
<button type="button" tooltip="Never shown together with the first one">Another tooltip</button>

<dialog #modal>
  <DialogContent size="md">
    <DialogHeader closeLabel="Close"><DialogTitle>Opened from a host with a tooltip</DialogTitle></DialogHeader>
    <DialogBody>…</DialogBody>
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

## Only when truncated

A label that is cut off (`truncate`, `line-clamp-2`) hides part of its text, and a tooltip can give it back. A tooltip on a label that fits only repeats it, so `TruncatedDirective` (`[truncated]`) tells the tooltip when to stay quiet.

<demo-tooltip-truncated></demo-tooltip-truncated>

```html
<span class="block truncate" truncated #oneLine="truncated" [tooltip]="label" [tooltipDisabled]="!oneLine.isTruncated()">{{ label }}</span>

<span class="block truncate" truncated #short="truncated" [tooltip]="shortLabel" [tooltipDisabled]="!short.isTruncated()">{{ shortLabel }}</span>

<span class="line-clamp-2" truncated #clamped="truncated" [tooltip]="label" [tooltipDisabled]="!clamped.isTruncated()">{{ label }}</span>
```

The first and the third label are cut off and get a tooltip, the second one fits and gets none.

### How it works

The directive does not change anything on the element: it only reads it. `exportAs="truncated"` hands the instance to a template reference (`#oneLine="truncated"`), and `isTruncated()` is a signal you bind to `tooltipDisabled`.

1. **When it measures.** Once after the element is first rendered (`afterNextRender`), and again each time a `ResizeObserver` reports a size change of the host: a window resize, a panel that is dragged, a container that opens.
2. **How it decides.** On the measured element, the text is cut when its content is larger than its box: `scrollHeight > clientHeight + 1` (a `line-clamp-*` that hides lines) **or** `scrollWidth > clientWidth + 1` (a `truncate` that hides the end of a line). The `+ 1` absorbs sub-pixel rounding, which makes an uncut line read one pixel too large.
3. **Which element it measures.** The host itself, by default. When the cut element is inside the host, give its selector as the value: `truncated=".list-item-text"`. This is needed for a galactik `<ListItemText>`, whose host is never clamped — only the inner `.list-item-text` span is. The selector is looked up inside the host each time it measures.
4. **What the tooltip does with it.** `tooltipDisabled` is `true` while the text is whole: the tooltip cannot open, and it closes if it was open when the text stops being cut.

What it does **not** do: it does not watch the text. A label that changes to a longer one in a box that keeps exactly the same size is measured again at the next resize, not before. It measures nothing on the server (`afterNextRender` only runs in the browser), where `isTruncated()` stays `false`.

### Reading the full text from the keyboard

A tooltip opens on the focus of its host, and a label inside a list row or a card is not focusable — the row is. A keyboard user would never reach the tooltip, and so never read the cut part. Moving `[tooltip]` onto the row is no fix: its `aria-describedby` would make a screen reader read the label twice.

Lift the cut while the row has the focus instead. `in-focus-visible:` applies the class when **an ancestor** is `:focus-visible`: tab to the rows below (Tab, then the arrow keys), and the cut label unfolds. The full text is always in the DOM, so a screen reader reads it whole whether or not it is cut on screen.

<demo-tooltip-truncated-keyboard></demo-tooltip-truncated-keyboard>

```html
<button type="button" class="w-64 text-left">
  <span class="line-clamp-2 in-focus-visible:line-clamp-none" truncated #cut="truncated" [tooltip]="label" [tooltipDisabled]="!cut.isTruncated()">{{ label }}</span>
</button>
```

With the mouse the tooltip shows the full text. With the keyboard the label unfolds in place — and since it is then no longer cut, `isTruncated()` turns `false` and the tooltip stays away.

## Only when the placeholder is cut

`[truncated]` cannot measure the placeholder of a field: it is not content of the element, so the `scrollWidth` of an `<input>` says nothing about it. `PlaceholderClippedDirective` (`input[placeholderClipped]`) measures the text with the font of the field (its letter spacing and `uppercase` transform included) and compares it with the width of the field minus its horizontal padding. `exportAs="placeholderClipped"` hands `isClipped()` to a template reference, as for `truncated`.

<demo-tooltip-placeholder-clipped></demo-tooltip-placeholder-clipped>

```html
<input
  placeholderClipped
  #clip="placeholderClipped"
  [placeholder]="hint"
  [tooltip]="hint"
  [tooltipDisabled]="!clip.isClipped() || !!text()"
  (input)="text.set($any($event.target).value)" />
```

The narrow field is cut and shows its placeholder in a tooltip on hover, the wide one fits and gets none. Type something in the narrow field: the placeholder disappears, and so does the tooltip — `isClipped()` describes the placeholder, not what is on screen, so the `!!text()` is part of the condition.

It measures when the field is rendered, then again when it is resized, when its `placeholder` changes, and once the fonts are loaded. It measures nothing on the server, where `isClipped()` stays `false`. A tooltip is a help for the pointer: the placeholder is not the accessible name of the field, so give it an `aria-label` of its own.

## Disabled

An empty text shows nothing. `tooltipDisabled` turns a tooltip off without removing it (PrimeNG calls it `disabled`; that name is the native attribute of a button).

<demo-tooltip-disabled></demo-tooltip-disabled>

```html
<button type="button" tooltip="I can be turned off" [tooltipDisabled]="!enabled()">Target</button>
```
