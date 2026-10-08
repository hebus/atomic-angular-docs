# Overflow Manager

A set of directives that count how many items fit inside a container and collapse the overflow behind a "More" trigger. This is the layout engine behind FiltersBar and NavbarTabs.

## Imports

```ts
import {
  OverflowManagerDirective,
  OverflowItemDirective,
  OverflowStopDirective
} from "@sinequa/atomic-angular";
```

## Live demo — resize me

Drag the bottom-right handle to shrink the container. Items that no longer fit are hidden and counted on the `More` button. The measurement is based on the container's own content edge, so it stays correct regardless of the surrounding layout.

<demo-overflow-resizable></demo-overflow-resizable>

```html
<div overflowManager (count)="visibleCount.set($event)" class="flex items-center gap-2">
  <div class="flex flex-1 min-w-0 gap-1">
    @for (item of items; track item) {
      <button overflowItem>{{ item }}</button>
    }
  </div>

  <!-- Always mounted so its size can be reserved -->
  <button overflowStop [class.invisible]="hidden().length === 0">
    More ({{ hidden().length }})
  </button>
</div>
```

## Inside a flex container

This is the case the previous implementation got wrong. When the bar is a `flex` child, its default `min-width: auto` lets it grow to its content width instead of being constrained — so nothing ever overflowed and the `More` button never appeared.

The top bar omits `min-w-0` (the pre-fix behavior): it grows and pushes its sibling, no collapse. The bottom bar adds `min-w-0` (the fix): it shares the row and collapses correctly.

<demo-overflow-flex></demo-overflow-flex>

```html
<!-- ❌ Pre-fix: no min-w-0 → the bar grows to its content, never collapses -->
<div class="flex">
  <my-bar class="flex-1" />
  <button>Sibling</button>
</div>

<!-- ✅ Fix: min-w-0 on the host constrains the bar so the manager can measure overflow -->
:host { /* block min-w-0 */ }
```

## Vertical direction

Set `direction="vertical"` to measure the bottom edge instead of the right edge. Resize the box vertically to collapse stacked items.

<demo-overflow-vertical></demo-overflow-vertical>

```html
<div overflowManager direction="vertical" (count)="visibleCount.set($event)"
     class="flex h-full flex-col gap-2">
  <div class="flex flex-1 flex-col min-h-0 gap-1">
    @for (item of items; track item) {
      <button overflowItem>{{ item }}</button>
    }
  </div>
  <button overflowStop>More ({{ hidden().length }})</button>
</div>
```

## Usage

Put `overflowManager` on the container, `overflowItem` on each measurable item, and `overflowStop` on the "More" trigger. Listen to the `count` output to render the collapsed items wherever you need them.

```typescript
import {
  OverflowManagerDirective,
  OverflowItemDirective,
  OverflowStopDirective
} from "@sinequa/atomic-angular";

@Component({
  imports: [OverflowManagerDirective, OverflowItemDirective, OverflowStopDirective],
  template: `...`
})
export class MyBar {
  visibleCount = signal(0);
  hidden = computed(() => this.items().slice(this.visibleCount()));
}
```

## API reference

### overflowManager

| Input/Output  | Type                         | Default        | Description                                                                  |
|---------------|------------------------------|----------------|------------------------------------------------------------------------------|
| `direction`   | `"horizontal" \| "vertical"` | `"horizontal"` | Which container edge is measured to decide what fits.                        |
| `reserveStop` | `boolean`                    | `false`        | Always reserve the `overflowStop` element's space, even when everything fits — use it when the trigger is permanently visible. |
| `target`      | `HTMLElement \| undefined`   | `undefined`    | Element to observe for resize events; defaults to the host element.          |
| `margin`      | `number`                     | `4`            | Margin added when calculating the overflow.                                  |
| `(count)`     | `number`                     | —              | Emits how many `overflowItem` elements currently fit (debounced).            |

### overflowItem

Marks an element as measurable. Items beyond the computed count are hidden with `display: none`.

### overflowStop

Marks the "More" trigger. Its size is reserved when at least one item overflows (always, with `reserveStop`).
