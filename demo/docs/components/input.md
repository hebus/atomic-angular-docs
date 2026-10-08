# Input

A text input built by composition: `<input-group>` wraps the native control and optional icon slots. Focus, disabled and read-only visuals are derived from the inner `<input>` state. Supports 3 sizes, validation schemes, a filled style, icon slots, a character counter and number alignment.

## Anatomy

Helper directives apply the slot classes for you — no manual class strings:

```html
<input-group size="md" scheme="default">
  <span input-icon-left><SearchIcon /></span>
  <input input-control type="text" placeholder="Search…" />
  <button input-icon-right type="button" aria-label="Clear"><CircleXIcon /></button>
</input-group>
```

## Sizes

`lg` (44px), `md` (36px), `sm` (24px).

<demo-input-sizes></demo-input-sizes>

```html
<input-group size="lg"><input input-control type="text" placeholder="Large" /></input-group>
<input-group size="md"><input input-control type="text" placeholder="Medium" /></input-group>
<input-group size="sm"><input input-control type="text" placeholder="Small" /></input-group>
```

## Schemes

`default`, `success`, `error` — drive the border, focus ring and text colour.

<demo-input-schemes></demo-input-schemes>

```html
<input-group scheme="default"><input input-control type="text" placeholder="Default" /></input-group>
<input-group scheme="success"><input input-control type="text" value="Looks good" /></input-group>
<input-group scheme="error"><input input-control type="text" value="Invalid value" /></input-group>
```

## Filled

`filled` swaps the bordered look for a tinted background. It combines with schemes.

<demo-input-filled></demo-input-filled>

```html
<input-group filled><input input-control type="text" placeholder="Filled" /></input-group>
<input-group filled scheme="error"><input input-control type="text" value="Filled error" /></input-group>
```

## With icons

Add a leading icon (`input-icon-left`) and/or a trailing button (`input-icon-right`). Icons come from `@sinequa/galactik`.

<demo-input-icons></demo-input-icons>

```html
<input-group>
  <span input-icon-left><SearchIcon /></span>
  <input input-control type="text" placeholder="Search…" />
</input-group>

<input-group>
  <input input-control type="text" value="Clear me" />
  <button input-icon-right type="button" aria-label="Clear"><CircleXIcon /></button>
</input-group>
```

## States

Disabled and read-only styles are driven by the native `<input>` attributes via `has-[]` selectors.

<demo-input-states></demo-input-states>

```html
<input-group><input input-control type="text" placeholder="Disabled" disabled /></input-group>
<input-group><input input-control type="text" value="Read only" readonly /></input-group>
```

## With counter

`<input-counter>` is styled by its own variants — mirror its `scheme`/`size` to the group. Place it **inside** `<input-group>` for a trailing in-field count, or **below** the group as a standalone line.

<demo-input-counter></demo-input-counter>

```html
<!-- inside the group — trailing in-field count -->
<input-group>
  <input input-control type="text" value="Hello" maxlength="100" />
  <input-counter>5 / 100</input-counter>
</input-group>

<!-- below the group — standalone line -->
<input-group><input input-control type="text" value="Hello" maxlength="100" /></input-group>
<input-counter>5 / 100</input-counter>
```

## Numbers

`numbers` right-aligns the text with tabular numerals.

<demo-input-numbers></demo-input-numbers>

```html
<input-group numbers><input input-control type="text" inputmode="numeric" value="1234" /></input-group>
```

## Auto height

By default the group keeps the fixed height of its size, so content that wraps (chips before the text being typed) overflows it. `autoHeight` lets the group grow with its content; the size's height becomes its minimum. The first group below overflows, the second wraps and grows.

<demo-input-auto-height></demo-input-auto-height>

```html
<input-group autoHeight>
  <tag scheme="grey" size="xs">design</tag>
  <tag scheme="grey" size="xs">angular</tag>
  <input input-control type="text" class="min-w-16" aria-label="Tags" />
</input-group>
```

## API Reference

### InputComponent — `<input-group>`

| Input     | Type                       | Default     | Description                                                     |
| --------- | -------------------------- | ----------- | ------------------------------------------------------------------ |
| `class`   | `string`                  | —           | Extra class(es), merged via `cn`.                                  |
| `size`    | `"lg" \| "md" \| "sm"`    | `"md"`      | Height — `lg` (44px), `md` (36px), `sm` (24px).                    |
| `scheme`  | `"default" \| "success" \| "error"` | `"default"` | Border, focus ring and text colour.                       |
| `filled`  | `boolean`                 | `false`     | Swaps the bordered look for a tinted background. Combines with `scheme`. |
| `numbers` | `boolean`                 | `false`     | Right-aligns the text with tabular numerals.                      |
| `autoHeight` | `boolean`              | `false`     | Grows with the content (wrapping chips) instead of a fixed height; the size's height is the minimum. |

### InputControlDirective — input[input-control]

| Input   | Type     | Default | Description                                                        |
| ------- | -------- | ------- | --------------------------------------------------------------------- |
| `class` | `string` | —       | Extra class(es) applied to the native `<input>`, merged via `cn`.    |

### InputIconLeftDirective — [input-icon-left]

| Input   | Type     | Default | Description                                              |
| ------- | -------- | ------- | ------------------------------------------------------------ |
| `class` | `string` | —       | Extra class(es) on the leading icon slot, merged via `cn`.  |

### InputIconRightDirective — [input-icon-right]

| Input   | Type     | Default | Description                                              |
| ------- | -------- | ------- | ------------------------------------------------------------ |
| `class` | `string` | —       | Extra class(es) on the trailing icon/button slot, merged via `cn`. |

### InputCounterComponent — `<input-counter>`

| Input    | Type                                 | Default     | Description                                                       |
| -------- | ------------------------------------- | ----------- | --------------------------------------------------------------------- |
| `class`  | `string`                             | —           | Extra class(es), merged via `cn`.                                     |
| `size`   | `"lg" \| "md" \| "sm"`              | `"md"`      | Text size — mirror the parent `<input-group>`'s `size`.               |
| `scheme` | `"default" \| "success" \| "error"` | `"default"` | Text colour — mirror the parent `<input-group>`'s `scheme`.           |
