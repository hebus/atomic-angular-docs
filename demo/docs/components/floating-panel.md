# Floating Panel

`injectFloatingPanel()` keeps a floating panel — the popup of a combobox, a submenu, any list that hangs from a field — under (or beside) an anchor with Floating UI. `Select`, `Autocomplete`, `SubMenu` and the principal picker all use it: one place for what each of them used to do by hand. Call it from a constructor.

```ts
private readonly anchor = viewChild<ElementRef<HTMLElement>>("anchor");
private readonly panel = viewChild<ElementRef<HTMLElement>>("panel");

constructor() {
  injectFloatingPanel({
    panel: () => this.panel()?.nativeElement,
    anchor: () => this.anchor()?.nativeElement,
    placement: "bottom-start",
    matchAnchorWidth: true
  });
}
```

The panel is `position: fixed` (a class on it, so it is never in flow, not even on the frame it is created), and `visibility: hidden` until its first position is computed. It may appear and disappear: it is positioned each time it shows.

## Placement and width

Pick a placement and turn the width matching on and off. The panel flips and shifts when the room runs out.

<demo-floating-panel-basic></demo-floating-panel-basic>

```html
<button #anchor (click)="open.set(!open())">Open the panel</button>
@if (open()) {
  <div #panel class="fixed z-50 …">Hung from the button.</div>
}
```

## Out of a box that clips

An `absolute` panel is cut at the edge of an ancestor with `overflow: hidden`. A `fixed` one, positioned in viewport coordinates, is not.

<demo-floating-panel-clipped></demo-floating-panel-clipped>

## Above a dialog

A modal `<dialog>` clips what overflows its own box. With `topLayer`, the panel becomes a manual popover and goes into the browser's top layer, above the dialog and every ancestor.

<demo-floating-panel-top-layer></demo-floating-panel-top-layer>

```ts
injectFloatingPanel({ panel, anchor, topLayer: true });
```

## API Reference

| Option                | Type                                     | Default          | Description                                                                       |
| --------------------- | ---------------------------------------- | ---------------- | --------------------------------------------------------------------------------- |
| `panel`               | `() => HTMLElement \| null \| undefined` | —                | The panel. A signal read; it may appear and disappear.                            |
| `anchor`              | `() => HTMLElement \| null \| undefined` | —                | The element the panel hangs from.                                                 |
| `placement`           | `Placement \| (() => Placement)`         | `"bottom-start"` | Any Floating UI placement.                                                        |
| `offset`              | `number`                                 | `4`              | Distance from the anchor, in pixels.                                              |
| `padding`             | `number`                                 | `8`              | Margin kept from the viewport edges.                                              |
| `anchorWidthVariable` | `string`                                 | —                | A CSS custom property (`"--select-trigger-w"`) that receives the anchor's width.  |
| `matchAnchorWidth`    | `boolean \| (() => boolean)`             | `false`          | Gives the panel the anchor's width.                                               |
| `topLayer`            | `boolean \| (() => boolean)`             | `false`          | `popover="manual"` + `showPopover()`: above a dialog.                             |
| `afterPosition`       | `(anchor, panel) => void`                | —                | Runs after each position update.                                                  |
