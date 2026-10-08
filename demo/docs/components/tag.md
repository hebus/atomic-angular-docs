# Tag

A pill-shaped label for categories, keywords, or status. Supports 2 variants (primary/secondary), 12 color schemes, and 3 sizes.

## Variants

`primary` (solid fill) vs `secondary` (outlined with light background).

<demo-tag-variants></demo-tag-variants>

```html
<tag variant="primary"   scheme="sage">Primary</tag>
<tag variant="secondary" scheme="sage">Secondary</tag>
```

## Sizes

`md` (24px), `sm` (20px), `xs` (18px).

<demo-tag-sizes></demo-tag-sizes>

```html
<tag size="md" scheme="sage">Medium</tag>
<tag size="sm" scheme="sage">Small</tag>
<tag size="xs" scheme="sage">Xsmall</tag>
```

## Schemes — primary

All 12 color schemes with `variant="primary"`.

<demo-tag-schemes-primary></demo-tag-schemes-primary>

```html
<tag scheme="sage"    variant="primary">sage</tag>
<tag scheme="almond"  variant="primary">almond</tag>
<tag scheme="pink"    variant="primary">pink</tag>
<tag scheme="grey"    variant="primary">grey</tag>
<tag scheme="cherry"  variant="primary">cherry</tag>
<tag scheme="indigo"  variant="primary">indigo</tag>
<tag scheme="yellow"  variant="primary">yellow</tag>
<tag scheme="cyan"    variant="primary">cyan</tag>
<tag scheme="success" variant="primary">success</tag>
<tag scheme="warning" variant="primary">warning</tag>
<tag scheme="info"    variant="primary">info</tag>
<tag scheme="error"   variant="primary">error</tag>
```

## Schemes — secondary

All 12 color schemes with `variant="secondary"`.

<demo-tag-schemes-secondary></demo-tag-schemes-secondary>

```html
<tag scheme="sage"    variant="secondary">sage</tag>
<tag scheme="almond"  variant="secondary">almond</tag>
<tag scheme="pink"    variant="secondary">pink</tag>
<tag scheme="grey"    variant="secondary">grey</tag>
<tag scheme="cherry"  variant="secondary">cherry</tag>
<tag scheme="indigo"  variant="secondary">indigo</tag>
<tag scheme="yellow"  variant="secondary">yellow</tag>
<tag scheme="cyan"    variant="secondary">cyan</tag>
<tag scheme="success" variant="secondary">success</tag>
<tag scheme="warning" variant="secondary">warning</tag>
<tag scheme="info"    variant="secondary">info</tag>
<tag scheme="error"   variant="secondary">error</tag>
```

## All sizes × all schemes

<demo-tag-matrix></demo-tag-matrix>

```html
<tag size="md" scheme="success" variant="primary">success</tag>
<tag size="sm" scheme="error"   variant="secondary">error</tag>
<tag size="xs" scheme="indigo"  variant="primary">indigo</tag>
```

## Removable

A `tag-remove` after the label makes a tag removable: a real `<button>` named after the tag, reachable with Tab and activated with Enter or Space. Remove a few, then put them back.

<demo-tag-removable></demo-tag-removable>

```html
<tag scheme="grey" size="xs">
  design
  <tag-remove [aria-label]="'Remove design'" (removed)="remove('design')" />
</tag>
```

## API Reference

### TagRemoveComponent — `<tag-remove>`

| Input        | Type      | Default | Description                                                                                                  |
| ------------ | --------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `aria-label` | `string`  | —       | Required. What the button removes ("Remove design"). Bind it as `[aria-label]`.                                |
| `disabled`   | `boolean` | `false` | The button stays and removes nothing.                                                                          |

| Output    | Payload | Description                                                          |
| --------- | ------- | ---------------------------------------------------------------------- |
| `removed` | —       | A click, Enter or Space. The click does not bubble.                    |

### TagComponent

| Input     | Type                                                                                                                     | Default   | Description                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | --------- | -------------------------------------------------- |
| `class`   | `string`                                                                                                                  | —         | Extra classes merged into the host.                 |
| `variant` | `"primary" \| "secondary"`                                                                                                | `"primary"` | Solid fill vs outlined with light background.    |
| `scheme`  | `"sage" \| "almond" \| "pink" \| "grey" \| "cherry" \| "indigo" \| "yellow" \| "cyan" \| "success" \| "warning" \| "info" \| "error"` | `"sage"`  | Color scheme.                                       |
| `size`    | `"md" \| "sm" \| "xs"`                                                                                                    | `"md"`    | Tag height — `md` (24px), `sm` (20px), `xs` (18px). |
