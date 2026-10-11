# Badge

A small round/pill badge that holds a **number** or an **icon** — for notification counts, statuses, or markers. Supports 2 variants (`number`/`icon`), 12 color schemes, and 3 sizes.

## Variants

`number` (pill sized for 1–2 digit counts) and `icon` (square, holds a single SVG icon). Provide an `aria-label` for icon badges since they have no readable text.

<demo-badge-variants></demo-badge-variants>

```html
<badge variant="number" scheme="sage">3</badge>
<badge variant="number" scheme="error">9</badge>
<badge variant="icon" scheme="sage" aria-label="Verified"><circle-check-icon /></badge>
```

## Fill

`fill="primary"` (dark solid fill, default) and `fill="secondary"` (light tonal fill) — combine with any `scheme`.

<demo-badge-fill></demo-badge-fill>

```html
<badge variant="number" fill="primary" scheme="sage">9</badge>
<badge variant="number" fill="secondary" scheme="sage">9</badge>
```

## Sizes

`md` (36px), `sm` (24px), `xs` (18px) — dimensions follow the galactik `--row-height-*` design tokens.

<demo-badge-sizes></demo-badge-sizes>

```html
<badge variant="number" size="md" scheme="sage">3</badge>
<badge variant="number" size="sm" scheme="sage">3</badge>
<badge variant="number" size="xs" scheme="sage">3</badge>
```

## Schemes

All 12 color schemes.

<demo-badge-schemes></demo-badge-schemes>

```html
<badge variant="number" scheme="sage">9</badge>
<badge variant="number" scheme="success">9</badge>
<badge variant="number" scheme="error">9</badge>
```

## Multi-digit numbers

The `number` variant is a perfect circle for a single digit; it only widens into a pill once the content (2–3 digits) needs more room than the row height, at every size.

<demo-badge-numbers></demo-badge-numbers>

```html
<badge variant="number" size="sm" scheme="sage">3</badge>
<badge variant="number" size="sm" scheme="almond">12</badge>
<badge variant="number" size="sm" scheme="info">47</badge>
<badge variant="number" size="sm" scheme="error">99</badge>
<badge variant="number" size="sm" scheme="indigo">128</badge>
```

## With icons

Use `variant="icon"` with a single SVG icon as content. Always pair it with an `aria-label`.

<demo-badge-icons></demo-badge-icons>

```html
<badge variant="icon" scheme="success" aria-label="Done"><circle-check-icon /></badge>
<badge variant="icon" scheme="warning" aria-label="Warning"><InfoCircleIcon /></badge>
<badge variant="icon" scheme="indigo" aria-label="Featured"><StarIcon /></badge>
```

## All sizes × all schemes

<demo-badge-matrix></demo-badge-matrix>

```html
<badge variant="number" size="md" scheme="success">9</badge>
<badge variant="number" size="sm" scheme="error">9</badge>
<badge variant="number" size="xs" scheme="indigo">9</badge>
```

## API Reference

### BadgeComponent

Selector: `badge` (or `Badge`).

| Input       | Type                                                    | Default     | Description                                                                                            |
| ----------- | -------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `class`     | `string`                                                  | —           | Extra classes merged into the host.                                                                    |
| `variant`   | `"number" \| "icon"`                                      | `"number"`  | Pill sized for 1–2 digit counts, or a square holding a single SVG icon.                                |
| `fill`      | `"primary" \| "secondary"`                                | `"primary"` | Dark solid fill or light tonal fill. Exposed as `fill` (not `style`) since `style` collides with the native HTML attribute. |
| `scheme`    | one of the 12 color schemes (e.g. `"sage"`, `"error"`)    | `"sage"`    | Color scheme, combined with `fill`.                                                                     |
| `size`      | `"md" \| "sm" \| "xs"`                                    | `"sm"`      | Dimensions, following the galactik `--row-height-*` tokens.                                            |
| `ariaLabel` | `string \| undefined` (alias `aria-label`)                | —           | Accessible name — required for `variant="icon"` (no readable text otherwise). When set, the host also gets `role="img"`. |
