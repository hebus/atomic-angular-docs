# Textarea

A multi-line field built by composition, the sibling of [Input](/components/input): `<textarea-group>` wraps the native control and an optional counter. Focus, disabled and read-only visuals are derived from the inner `<textarea>` state — nothing is duplicated in JavaScript. Supports 3 sizes, validation schemes, a filled style, three height strategies and a character counter.

## Anatomy

Helper directives apply the slot classes for you — no manual class strings. The group is full width by default, so call sites usually carry no class at all.

```html
<textarea-group size="md" scheme="default" resize="auto">
  <textarea textarea-control rows="4" placeholder="Your message…"></textarea>
  <textarea-counter>12 / 300</textarea-counter>
</textarea-group>
```

## Sizes

`size` drives padding, radius and type scale — not height. The box is sized by `rows`, by the resize handle, or by its content.

<demo-textarea-sizes></demo-textarea-sizes>

```html
<textarea-group size="lg"><textarea textarea-control rows="2" placeholder="Large"></textarea></textarea-group>
<textarea-group size="md"><textarea textarea-control rows="2" placeholder="Medium"></textarea></textarea-group>
<textarea-group size="sm"><textarea textarea-control rows="2" placeholder="Small"></textarea></textarea-group>
```

## Schemes

`default`, `success`, `error` — drive the border, focus ring and text colour.

<demo-textarea-schemes></demo-textarea-schemes>

```html
<textarea-group scheme="default"><textarea textarea-control rows="2" placeholder="Default"></textarea></textarea-group>
<textarea-group scheme="success"><textarea textarea-control rows="2">Looks good</textarea></textarea-group>
<textarea-group scheme="error"><textarea textarea-control rows="2">Invalid value</textarea></textarea-group>
```

## Filled

`filled` swaps the bordered look for a tinted background. It combines with schemes.

<demo-textarea-filled></demo-textarea-filled>

```html
<textarea-group filled><textarea textarea-control rows="2" placeholder="Filled"></textarea></textarea-group>
<textarea-group filled scheme="error"><textarea textarea-control rows="2">Filled error</textarea></textarea-group>
```

## Resize

`resize` picks how the box gets its height:

| Value | Behaviour |
|---|---|
| `vertical` *(default)* | native drag handle, height seeded by `rows` |
| `none` | locked to `rows` |
| `auto` | grows with the content via `field-sizing: content` |

<demo-textarea-resize></demo-textarea-resize>

```html
<textarea-group resize="vertical"><textarea textarea-control rows="2"></textarea></textarea-group>
<textarea-group resize="none"><textarea textarea-control rows="2"></textarea></textarea-group>
<textarea-group resize="auto"><textarea textarea-control placeholder="Keep typing…"></textarea></textarea-group>
```

:::warning
`auto` is a progressive enhancement. `field-sizing` ships in Chrome/Edge 123+ and Safari 17.4+, but **not in Firefox** — there the field keeps its drag handle instead of growing. Note also that `rows` and `cols` are ignored wherever `field-sizing: content` applies, so an `auto` field starts one line tall whatever `rows` says. Bound it with `minRows`/`maxRows` below, never a fixed `h-*` — a `height` cancels `field-sizing` outright.
:::

## Row bounds

`minRows` and `maxRows` set a floor and a ceiling in lines of text. They are the sizing API to reach for in `auto` mode, since `rows` no longer applies there — and because they compile to `min-height`/`max-height`, which `field-sizing` honours, they keep working in every mode and wherever the property is unsupported. Past `maxRows` the control scrolls.

<demo-textarea-rows></demo-textarea-rows>

```html
<!-- one line by default, three at most -->
<textarea-group resize="auto" [maxRows]="3">
  <textarea textarea-control rows="1" placeholder="Grows to 3 lines, then scrolls"></textarea>
</textarea-group>

<!-- never shorter than three lines -->
<textarea-group resize="auto" [minRows]="3">
  <textarea textarea-control placeholder="Starts at 3 lines"></textarea>
</textarea-group>
```

The `rows="1"` in the first example is not redundant: it is what the fallback uses where `field-sizing` is unsupported, so the field still starts on a single line there.

`maxlength` also stops the growth at the character limit, which pairs naturally with the counter.

## States

Disabled and read-only styles are driven by the native `<textarea>` attributes via `has-[]` selectors. A disabled field also loses its resize handle.

<demo-textarea-states></demo-textarea-states>

```html
<textarea-group><textarea textarea-control rows="2" disabled placeholder="Disabled"></textarea></textarea-group>
<textarea-group><textarea textarea-control rows="2" readonly>Read only</textarea></textarea-group>
```

## With counter

`<textarea-counter>` sits under the control, aligned to its trailing edge. The count is not computed — project the text you want, and mirror `scheme`/`size` to the group.

<demo-textarea-counter></demo-textarea-counter>

```html
<textarea-group>
  <textarea textarea-control rows="3" maxlength="300" [(ngModel)]="comment"></textarea>
  <textarea-counter [scheme]="comment().length === 300 ? 'error' : 'default'">
    {{ comment().length }} / 300
  </textarea-counter>
</textarea-group>
```

## API Reference

### TextareaComponent

Selector: `textarea-group` (or `textareagroup`).

| Input     | Type                                 | Default      | Description                                                                                                   |
| --------- | ------------------------------------ | ------------ | --------------------------------------------------------------------------------------------------------------- |
| `class`   | `string`                             | —            | Extra classes merged into the group — the styling root.                                                       |
| `size`    | `"sm" \| "md" \| "lg"`               | `"md"`       | Drives padding, radius and type scale — not height (the box is sized by `rows`, the resize handle, or content). |
| `scheme`  | `"default" \| "success" \| "error"`  | `"default"`  | Border, focus ring and text colour.                                                                            |
| `resize`  | `"vertical" \| "none" \| "auto"`     | `"vertical"` | How the box gets its height: native drag handle, locked to `rows`, or grows with content via `field-sizing`.   |
| `filled`  | `boolean`                            | `false`      | Swaps the bordered look for a tinted background — combines with `scheme`.                                     |
| `minRows` | `number \| undefined`                | —            | Height floor in lines of text (compiles to `min-height`) — the sizing API that keeps working in every `resize` mode. |
| `maxRows` | `number \| undefined`                | —            | Height ceiling in lines of text (compiles to `max-height`); past it the control scrolls.                       |

### TextareaControlDirective

Selector: `textarea[textarea-control]` (or `[textareaControl]`) — tags the native `<textarea>` the wrapper styles via `[&_.textarea-control]`.

| Input   | Type     | Default | Description                                        |
| ------- | -------- | ------- | ----------------------------------------------------- |
| `class` | `string` | —       | Extra classes merged into the native control.         |

### TextareaCounterComponent

Selector: `textarea-counter` (or `textareacounter`).

| Input    | Type                                | Default     | Description                                                            |
| -------- | ------------------------------------ | ----------- | -------------------------------------------------------------------------- |
| `class`  | `string`                             | —           | Extra classes.                                                            |
| `size`   | `"sm" \| "md" \| "lg"`               | `"md"`      | Typography size — mirror the group's `size`.                              |
| `scheme` | `"default" \| "success" \| "error"`  | `"default"` | Text colour — mirror the group's `scheme`, e.g. once a max length is hit. |

The count itself is not computed — project the text you want, as shown above.
