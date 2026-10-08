# Switch

A toggle switch with two states: on and off. Uses a visually-hidden checkbox with `role="switch"` for accessibility. State is driven by CSS `has-[:checked]` — no JS for styling.

## Basic

Click the switch to toggle it.

<demo-switch-basic></demo-switch-basic>

```html
enabled = signal(false);

<switch [(checked)]="enabled" />
```

## Sizes

Two sizes: `small` (38×24 track, default) and `xsmall` (28×18 track).

<demo-switch-sizes></demo-switch-sizes>

```html
<switch size="small"  [(checked)]="checked" />
<switch size="xsmall" [(checked)]="checked" />
```

## Disabled

<demo-switch-disabled></demo-switch-disabled>

```html
<switch disabled />
<switch disabled [checked]="true" />
```

## With label

Common pattern: pair a switch with a descriptive label row.

<demo-switch-with-label></demo-switch-with-label>

```html
<div class="flex items-center justify-between gap-6">
  <div>
    <p>Email notifications</p>
    <p>Receive email updates about your activity.</p>
  </div>
  <switch [(checked)]="notifications" />
</div>
```

## Decorative switch (`presentational`)

When the switch only *reflects* a state owned by an enclosing control — typically a
`<MenuItem role="menuitemcheckbox">`, where a nested interactive control would be invalid ARIA — mark it
`presentational`.

The `<input>` then becomes `inert`: out of the keyboard path **and** out of the accessibility tree, which a
plain `tabindex="-1"` would not achieve (`aria-hidden` with a focusable descendant is a violation). Clicks
fall through to the parent, and the rendering is unchanged.

```html
<MenuItem value="minimap" role="menuitemcheckbox" [checked]="minimap()">
  <span class="label">Show minimap</span>
  <Switch [checked]="minimap()" presentational />
</MenuItem>
```

Bind `[checked]` one-way here: the state lives in the parent, the switch only displays it.

## API Reference

### SwitchComponent

| Input            | Type                    | Default   | Description                                                                                            |
| ----------------- | ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `checked`        | `boolean` (model)        | `false`   | On/off state — supports `[(checked)]`.                                                                |
| `disabled`       | `boolean`                | `false`   | Disables the inner `<input>`.                                                                          |
| `size`           | `"small" \| "xsmall"`     | `"small"` | Track/thumb size.                                                                                       |
| `presentational` | `boolean`                 | `false`   | Decorative mode: the switch only reflects a state owned by an enclosing control (e.g. a `MenuItem role="menuitemcheckbox"`). Makes the inner `<input>` `inert` — removed from both keyboard path and accessibility tree — and lets clicks fall through to the parent. |
| `tabIndex`       | `number \| undefined`     | —         | Tab index of the inner `<input>`, for a host that owns the tab order (e.g. `ngToolbar`'s roving tabindex). No effect when `presentational` is `true`. |
| `class`          | `string`                  | —         | Extra classes merged into the host label.                                                              |

| Output          | Payload   | Description                              |
| ---------------- | --------- | ------------------------------------------ |
| `checkedChange`  | `boolean` | Emits the new checked state — from `model`. |
