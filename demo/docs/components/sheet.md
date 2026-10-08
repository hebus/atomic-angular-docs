# Sheet

A modal panel anchored to one edge of the viewport — the "drawer" pattern. It is built on a
**native `<dialog>`** opened with `showModal()`, exactly as `Dialog` is, and composed with three
layout slots (`SheetHeader`, `SheetBody`, `SheetFooter`) plus `DialogTitle`, reused unchanged from
the Dialog family.

Because the panel really is a `<dialog>`, everything an overlay has to get right comes from the
platform: the top layer (no z-index to arbitrate), the focus trap, the focus returned to whatever
opened the panel, `Escape` from anywhere, the rest of the document made inert for assistive
technology, and a real `::backdrop`.

The `<dialog>` **is** the panel — it carries the surface, the geometry, the animation and the
accessible name. There is no inner content element, and deliberately so: a native modal `<dialog>`
already exposes `role="dialog"` and `aria-modal="true"`, so a nested element repeating them would
put a second, redundant dialog in the accessibility tree. (This is where `Sheet` parts ways with
`Dialog`, which does have a `DialogContent[role=dialog]` inside its `<dialog>`.)

Anchor it with `side` (`left` · `right` · `top` · `bottom`, default `right`) and size it with `size`
(`sm` · `md` · `lg` · `xl` · `full`, default `md`) — a **width** on a left/right panel, a **height**
on a top/bottom one.

> **Give every sheet an accessible name**: either a `DialogTitle` projected into the `SheetHeader`,
> or `ariaLabel`. A sheet with neither is announced as a bare "dialog".

## Basic

`#panel="sheet"` reads the component off its `exportAs`, then `open()` shows it. The slots go
straight into `<Sheet>`.

<demo-sheet-basic></demo-sheet-basic>

```html
<button variant="secondary" size="md" (click)="panel.open()">Open panel</button>

<Sheet #panel="sheet" side="right" size="md">
  <SheetHeader closeLabel="Close panel">
    <DialogTitle>Document details</DialogTitle>
  </SheetHeader>
  <SheetBody>
    <p class="modal-body-text">…</p>
  </SheetBody>
</Sheet>
```

## Sides

`side` is what distinguishes a sheet from a dialog, so it drives the inset, the size axis, the
border, the rounded corners and the direction the panel slides from, all together. The two corners
flush against the viewport stay square.

Both halves of the animation are pure CSS. The entrance comes from `@starting-style`. The exit is
the harder half: closing a `<dialog>` normally flips it to `display: none` and drops it out of the
top layer at once, so there would be nothing left to animate — declaring `display` and `overlay`
transitionable with `allow-discrete` defers both to the end of the transition, keeping the panel
visible, and in the top layer, while it slides out. The direction is read from `--sheet-x` /
`--sheet-y`, set per side by the CVA. `prefers-reduced-motion` removes every movement but keeps the
discrete part — without it the panel would vanish instead of closing.

<demo-sheet-sides></demo-sheet-sides>

```html
<!-- side is bound to a signal driven by the button group -->
<div class="flex gap-2">
  @for (s of sides; track s) {
    <button [variant]="side() === s ? 'primary' : 'secondary'" (click)="side.set(s)">{{ s }}</button>
  }
</div>

<button (click)="panel.open()">Open from {{ side() }}</button>

<Sheet #panel="sheet" [side]="side()" size="md">
  <SheetHeader closeLabel="Close">
    <DialogTitle>Anchored {{ side() }}</DialogTitle>
  </SheetHeader>
  <SheetBody>…</SheetBody>
</Sheet>
```

## Sizes

`size` is resolved against `side` by the CVA's compound variants, so the same token means a width on
one axis and a height on the other:

| `size` | `left` / `right` (width) | `top` / `bottom` (height) |
|---|---|---|
| `sm` | 400px | 25% of the viewport |
| `md` *(default)* | 520px | 33% of the viewport |
| `lg` | 720px | 50% of the viewport |
| `xl` | 960px | 75% of the viewport |
| `full` | `100dvw` | `100dvh` |

<demo-sheet-sizes></demo-sheet-sizes>

```html
<Sheet #panel="sheet" side="right" [size]="size()">
  <SheetHeader closeLabel="Close">
    <DialogTitle>Sheet — size "{{ size() }}"</DialogTitle>
  </SheetHeader>
  <SheetBody>…</SheetBody>
</Sheet>
```

## Footer with actions

`SheetFooter` is a right-aligned action row on a tinted band, pinned below the body. Cancel, Apply,
the header's close button, `Escape` and a click on the scrim all land on the same `closed` output —
only the `DialogEvent` differs.

<demo-sheet-footer></demo-sheet-footer>

```html
<Sheet #panel="sheet" side="right" size="md" (closed)="result.set($event)">
  <SheetHeader closeLabel="Close">
    <DialogTitle>Filters</DialogTitle>
  </SheetHeader>
  <SheetBody>…</SheetBody>
  <SheetFooter>
    <button variant="secondary" (click)="panel.cancel()">Cancel</button>
    <button variant="primary" (click)="panel.close('dialog-confirm')">Apply</button>
  </SheetFooter>
</Sheet>
```

## No visible title — `ariaLabel`

When the design shows no heading, the panel still needs an accessible name. `ariaLabel` provides it
directly and takes precedence over `labelledby` and over any projected title. The `SheetHeader` here
carries no title — it is there only to place the close button and translate its label. Omit it
entirely and `Sheet` still falls back to a bare `<SheetHeader />`, close button included, but with
the untranslated default `"Close"`.

<demo-sheet-aria-label></demo-sheet-aria-label>

```html
<Sheet #panel="sheet" side="bottom" size="sm" ariaLabel="Quick actions">
  <SheetHeader closeLabel="Close quick actions" />
  <SheetBody>
    <div class="flex flex-wrap gap-2">
      <button variant="secondary" (click)="panel.close()">Share</button>
      <button variant="secondary" (click)="panel.close()">Export</button>
      <button variant="secondary" (click)="panel.close()">Print</button>
    </div>
  </SheetBody>
</Sheet>
```

## Scrollable body

The panel is a flex column: header and footer are `shrink-0`, `SheetBody` takes the rest and scrolls
on its own. `overscroll-contain` stops a scroll that reaches the end of the body from chaining to
the page behind. And unlike `Dialog`, a sheet **locks the page scroll** while it is open — a dialog
covers a small part of the viewport, a sheet covers a whole edge of it.

<demo-sheet-scroll></demo-sheet-scroll>

```html
<Sheet #panel="sheet" side="right" size="md">
  <SheetHeader closeLabel="Close">
    <DialogTitle>Terms of service</DialogTitle>
  </SheetHeader>
  <SheetBody>
    <!-- lots of content — this area scrolls, the header and footer stay put -->
    <p class="modal-body-text">…</p>
  </SheetBody>
  <SheetFooter>
    <button variant="secondary" (click)="panel.cancel()">Decline</button>
    <button variant="primary" (click)="panel.close('dialog-confirm')">Accept</button>
  </SheetFooter>
</Sheet>
```

## Navbar

Inside a sheet, the atomic-angular `SheetNavbar` renders a back button (translated with the root `back` key) followed by a separator and whatever you project into it. The button closes the enclosing panel through `DIALOG_REF`, so it only does something when placed under a galactik `Sheet`. The component is internal to the library and not exported from the public API; it is used by the library's own sheet features.

<demo-sheet-navbar></demo-sheet-navbar>

```html
<Sheet #panel="sheet" side="right" size="md">
  <SheetHeader closeLabel="Close">
    <DialogTitle>Document</DialogTitle>
  </SheetHeader>
  <SheetBody>
    <SheetNavbar>
      <li class="text-sm">Annual report 2025</li>
      <li class="ms-auto"><button variant="secondary" size="sm">Share</button></li>
    </SheetNavbar>
    …
  </SheetBody>
</Sheet>
```

## Notes

- Projected content stays mounted for the length of the exit animation, then leaves the DOM on the
  `<dialog>`'s own `transitionend` — not on a timer, so the duration lives in the stylesheet and
  nowhere else. Angular's `animate.enter` / `animate.leave` do not apply: they hold an element that
  control flow *removes*, whereas here the `<dialog>` is closed and never removed. Removing it
  instead of closing it would forfeit the focus handed back to whatever opened the panel.
- `isOpen` goes `false` the moment closing starts, i.e. before the panel has finished sliding out.
  It answers "is the panel open", not "do its children still exist".
- `[dismissible]="false"` only neutralizes the scrim click. `Escape` still closes — that is native
  `<dialog>` behavior, and a modal panel a keyboard user cannot leave is a trap.

## Imports

```typescript
import {
  DialogTitleComponent,
  SheetBodyComponent,
  SheetComponent,
  SheetFooterComponent,
  SheetHeaderComponent,
} from "@sinequa/galactik";
```

## API Reference

### SheetComponent

| Input         | Type                        | Default   | Description                                                                     |
| ------------- | --------------------------- | --------- | -------------------------------------------------------------------------------- |
| `side`        | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Edge the panel is anchored to — drives the inset, the size axis and the slide direction. |
| `size`        | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"`    | Extent along the axis `side` implies — a width for left/right, a height for top/bottom. |
| `labelledby`  | `string`                    | —         | Explicit id for `aria-labelledby`; falls back to the projected `DialogTitle` id.  |
| `ariaLabel`   | `string`                    | —         | Accessible name for a panel with no visible title. Takes precedence over `labelledby`. |
| `dismissible` | `boolean`                   | `true`    | Whether a click on the scrim closes the sheet. `Escape` closes it either way.    |
| `closeButton` | `boolean`                   | `false`   | Floats a close button over the panel, for a sheet with no `SheetHeader`.         |
| `closeLabel`  | `string`                    | `"Close"` | Accessible name of the floating close button.                                    |
| `class`       | `string`                    | —         | Extra classes merged into the `<dialog>` host.                                   |

| Output      | Payload        | Description                                                                 |
| ----------- | -------------- | ---------------------------------------------------------------------------- |
| `closed`    | `DialogEvent`  | Emitted once closing starts — `Escape`, scrim click, `close()`/`cancel()`.    |
| `closeEnd`  | `void`         | Emitted once the exit animation has finished and the content leaves the DOM. |

### Methods

| Method                    | Description                                                          |
| ------------------------- | ---------------------------------------------------------------------- |
| `open()`                  | Opens the sheet. Alias of `showModal()`.                              |
| `showModal()`             | Opens the sheet and locks the page scroll.                            |
| `close(eventType?)`       | Closes the sheet and emits `closed` with the given `DialogEvent` (default `"dialog-close"`). Idempotent. |
| `cancel(eventType?)`      | Alias of `close()` with `"dialog-cancel"` as the default event type.   |

### SheetHeaderComponent

| Input        | Type     | Default   | Description                                        |
| ------------ | -------- | --------- | ----------------------------------------------------- |
| `closeLabel` | `string` | `"Close"` | Accessible name of the header's close button.       |
| `class`      | `string` | —         | Extra classes merged into the header host.          |

### SheetBodyComponent

| Input   | Type     | Default | Description                             |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | `""`    | Extra classes merged into the body host. |

### SheetFooterComponent

| Input   | Type     | Default | Description                              |
| ------- | -------- | ------- | -------------------------------------------- |
| `class` | `string` | `""`    | Extra classes merged into the footer host. |
