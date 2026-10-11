# Resizable

A group of panels whose boundary the user moves — by dragging a handle, or by focusing it and pressing an arrow key. Sizes are percentages of the group, so a layout survives a window resize.

```typescript
import { ResizableHandleComponent, ResizablePanelComponent, ResizablePanelGroupComponent } from "@sinequa/galactik";
```

Three components work together: the group owns the sizes, the panels take a share each, and one handle sits between every two panels.

## Horizontal

The group fills its parent, so give the parent a height.

<demo-resizable-horizontal></demo-resizable-horizontal>

```html
<div class="h-64">
  <resizable-panel-group direction="horizontal">
    <resizable-panel [defaultSize]="30" [minSize]="15">Filters</resizable-panel>
    <resizable-handle [withHandle]="true" aria-label="Resize the filters panel" />
    <resizable-panel [defaultSize]="70">Results</resizable-panel>
  </resizable-panel-group>
</div>
```

## Vertical

<demo-resizable-vertical></demo-resizable-vertical>

```html
<resizable-panel-group direction="vertical">
  <resizable-panel [defaultSize]="60" [minSize]="25">Document</resizable-panel>
  <resizable-handle [withHandle]="true" aria-label="Resize the document panel" />
  <resizable-panel [defaultSize]="40" [minSize]="15">Passages</resizable-panel>
</resizable-panel-group>
```

## Bounds, live layout, reset

`minSize`/`maxSize` are honoured by the pointer and by the keyboard alike: what one panel refuses to take, its neighbour keeps, so the total stays at 100%. `(layout)` fires on every change, and `setLayout()` writes the whole layout back.

Focus a handle and press <kbd>←</kbd>/<kbd>→</kbd>: it moves by 10%.

<demo-resizable-controlled></demo-resizable-controlled>

```html
<resizable-panel-group #group="resizablePanelGroup" (layout)="sizes.set($event)">
  <resizable-panel [defaultSize]="25" [minSize]="15" [maxSize]="40">Navigation</resizable-panel>
  <resizable-handle [withHandle]="true" aria-label="Resize the navigation panel" />
  <resizable-panel [defaultSize]="50">Content</resizable-panel>
  <resizable-handle [withHandle]="true" aria-label="Resize the content panel" />
  <resizable-panel [defaultSize]="25" [minSize]="15" [maxSize]="40">Preview</resizable-panel>
</resizable-panel-group>

<button variant="secondary" size="sm" type="button" (click)="group.setLayout([25, 50, 25])">Reset</button>
```

## Persisted layout

With an `autoSaveId`, the layout is stored under `resizable-panel:<autoSaveId>` and restored on the next visit — as long as the group still has the same number of panels.

This example also shows a handle **without** its grip, which is the default: `withHandle` paints the pill when set.

<demo-resizable-persisted></demo-resizable-persisted>

```html
<resizable-panel-group direction="horizontal" autoSaveId="demo-resizable">
  <resizable-panel [defaultSize]="40" [minSize]="20">Left</resizable-panel>
  <resizable-handle aria-label="Resize the left panel" />
  <resizable-panel [defaultSize]="60">Right</resizable-panel>
</resizable-panel-group>
```

## Accessibility

The handle implements the ARIA [window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/): a focusable `separator` reporting the share of the panel before it through `aria-valuenow`, bounded by that panel's `minSize`/`maxSize` and pointing at it with `aria-controls`. `aria-orientation` describes the *line*, so a separator between side-by-side panels is `vertical`.

Give each handle its own `aria-label` when a group has more than one — otherwise a screen-reader user hears the same name twice.

## API Reference

### ResizablePanelGroupComponent

Selector: `resizable-panel-group, resizablepanelgroup, ResizablePanelGroup`. `exportAs="resizablePanelGroup"`.

| Input        | Type                         | Default        | Description                                                                 |
| ------------ | ---------------------------- | -------------- | ------------------------------------------------------------------------------ |
| `direction`  | `"horizontal" \| "vertical"` | `"horizontal"` | Axis the panels are laid out along.                                          |
| `autoSaveId` | `string`                     | —              | Key under which the layout is persisted to `localStorage`. Without it, nothing is stored. |
| `class`      | `string`                     | —              | Extra classes merged into the host.                                           |

| Output   | Payload    | Description                                                    |
| -------- | ---------- | ------------------------------------------------------------------ |
| `layout` | `number[]` | Emitted on every change of the panel sizes, drag included.        |

#### Methods

| Method                         | Description                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| `isResizing()`                 | Whether a drag is currently in progress.                                              |
| `setLayout(sizes: number[])`   | Sets every panel's share at once. Ignored unless `sizes.length` matches the panel count. |

### ResizablePanelComponent

Selector: `resizable-panel, resizablepanel, ResizablePanel`. `exportAs="resizablePanel"`.

| Input         | Type     | Default                       | Description                                                          |
| ------------- | -------- | ------------------------------ | ------------------------------------------------------------------------ |
| `id`          | `string` | `"resizable-panel-<counter>"` | Written to the DOM as the panel's `id`, so a handle can point at it with `aria-controls`. |
| `defaultSize` | `number` | `50`                            | Share of the group, in percent, before any user resize. Normalized across siblings. |
| `minSize`     | `number` | `0`                             | Minimum share, in percent, honoured by both the pointer and the keyboard.  |
| `maxSize`     | `number` | `100`                           | Maximum share, in percent, honoured by both the pointer and the keyboard.  |
| `class`       | `string` | —                               | Extra classes merged into the host.                                       |

### ResizableHandleComponent

Selector: `resizable-handle, resizablehandle, ResizableHandle`. `exportAs="resizableHandle"`.

| Input        | Type      | Default            | Description                                                     |
| ------------ | --------- | -------------------- | -------------------------------------------------------------------- |
| `withHandle` | `boolean` | `false`              | Shows the grip pill on the divider line. Off by default (bare line). |
| `ariaLabel`  | `string`  | `"Resize panels"`    | Accessible name of the separator (alias `aria-label`). Set one per handle when a group has more than one. |
| `class`      | `string`  | —                    | Extra classes merged into the host.                                  |
