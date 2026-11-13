# Kbd

A keyboard key, and a group that presents several keys as one combination.

## Imports

```ts
import { KbdComponent, KbdGroupComponent } from "@sinequa/galactik";
```

## Sizes

`kbd` is a directive on the native element. `size` is `xs`, `sm` (default) or `md`.

<demo-kbd-sizes></demo-kbd-sizes>

```html
<kbd size="xs">Esc</kbd>
<kbd size="sm">Esc</kbd>
<kbd size="md">Esc</kbd>
```

## Key combinations

`kbd-group` carries the accessible name of the **whole** combination, and its keys are hidden from assistive technology. Without that, a screen reader announces "Control", "plus", "Shift" as separate items. The host has `role="group"`, which is what makes `aria-label` legal on it.

<demo-kbd-group></demo-kbd-group>

```html
<kbd-group aria-label="Control+Shift+P">
  <kbd aria-hidden="true">Ctrl</kbd>
  <span aria-hidden="true">+</span>
  <kbd aria-hidden="true">Shift</kbd>
  <span aria-hidden="true">+</span>
  <kbd aria-hidden="true">P</kbd>
</kbd-group>
```

## API Reference

### KbdComponent (`kbd`)

| Input   | Type                   | Default | Description                              |
| ------- | ---------------------- | ------- | ---------------------------------------- |
| `size`  | `"xs" \| "sm" \| "md"` | `"sm"`  | Key size.                                |
| `class` | `string`               |         | Extra classes, merged with the variants. |

### KbdGroupComponent (`kbd-group`)

No input. Set `aria-label` to the full combination, in ARIA form (`Control+Shift+P`).
