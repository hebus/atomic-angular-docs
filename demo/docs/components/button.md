# Button

Triggers an action or event. Supports multiple variants, sizes, icon-only mode, schemes, and disabled state.

## Variants

All visual variants of the button.

<demo-button-variants></demo-button-variants>

```html
<button variant="primary">Primary</button>
<button variant="secondary">Secondary</button>
<button variant="tertiary">Tertiary</button>
<button variant="accent">Accent</button>
```

## Sizes

Available sizes: `sm`, `md` (default), `lg`.

<demo-button-sizes></demo-button-sizes>

```html
<button variant="primary" size="sm">Small</button>
<button variant="primary" size="md">Medium</button>
<button variant="primary" size="lg">Large</button>
```

## With icons

Place an icon before or after the label.

<demo-button-icons></demo-button-icons>

```html
<!-- Icon before label -->
<button variant="primary">
  <PlusIcon />
  Create
</button>

<!-- Icon after label -->
<button variant="primary">
  Save
  <CircleCheckIcon />
</button>
```

## Icon only

Square buttons with `iconOnly="true"`.

<demo-button-icon-only></demo-button-icon-only>

```html
<button variant="primary" [iconOnly]="true" size="sm" aria-label="Add">
  <PlusIcon />
</button>
```

## Scheme — tertiary neutral

The `tertiary` variant with `scheme="neutral"` uses secondary/neutral colors.

<demo-button-scheme></demo-button-scheme>

```html
<button variant="tertiary" scheme="default">Tertiary default</button>
<button variant="tertiary" scheme="neutral">Tertiary neutral</button>
```

## Disabled

<demo-button-disabled></demo-button-disabled>

```html
<button variant="primary"   disabled>Primary</button>
<button variant="secondary" disabled>Secondary</button>
<button variant="tertiary"  disabled>Tertiary</button>
```

## API Reference

### ButtonComponent

Applied directly on native `<button>` elements (selector: `button`) — `disabled` is the native HTML attribute, not a component input.

| Input      | Type                                                                          | Default     | Description                                                                 |
| ---------- | ------------------------------------------------------------------------------ | ----------- | ---------------------------------------------------------------------------- |
| `variant`  | `"primary" \| "secondary" \| "tertiary" \| "accent" \| "light-accent" \| "none"` | `"primary"` | Visual style. `"none"` bypasses all variant styling — an escape hatch that returns `class` as-is (see icon-only buttons pattern below). |
| `scheme`   | `"default" \| "neutral"`                                                       | `"default"` | Only affects the `tertiary` variant — `neutral` swaps to secondary/neutral colors. |
| `size`     | `"xs" \| "sm" \| "md" \| "lg"`                                                 | `"md"`      | Button height and padding.                                                  |
| `iconOnly` | `boolean`                                                                      | `false`     | Renders a square button sized for a single icon child instead of a label.   |
| `class`    | `string`                                                                       | —           | Extra classes merged into the host.                                        |
