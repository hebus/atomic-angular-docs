# Checkbox

A checkbox with unchecked, checked, and indeterminate states. Label and hint text are projected via content. Two-way binding via `[(checked)]`.

## Interactive

<demo-checkbox-interactive></demo-checkbox-interactive>

```html
checkA = signal(false);
checkB = signal(true);

<checkbox [(checked)]="checkA">Accept terms and conditions</checkbox>
<checkbox [(checked)]="checkB">Subscribe to newsletter</checkbox>
```

## States

<demo-checkbox-states></demo-checkbox-states>

```html
<checkbox>Unchecked</checkbox>
<checkbox [checked]="true">Checked</checkbox>
<checkbox [indeterminate]="true">Indeterminate</checkbox>
```

## With hint

<demo-checkbox-hint></demo-checkbox-hint>

```html
<checkbox [(checked)]="notifications" hint="We'll only send relevant updates.">Email notifications</checkbox>
<checkbox [(checked)]="analytics" hint="Helps us improve the product.">Share analytics</checkbox>
```

## Disabled

<demo-checkbox-disabled></demo-checkbox-disabled>

```html
<checkbox disabled>Disabled</checkbox>
<checkbox disabled [checked]="true">Disabled checked</checkbox>
<checkbox disabled [indeterminate]="true">Disabled indeterminate</checkbox>
```

## API Reference

### CheckboxComponent

| Input           | Type                  | Default | Description                                                                            |
| ---------------- | ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `checked`        | `boolean` (model)      | `false` | Checked state — supports `[(checked)]`.                                                |
| `disabled`       | `boolean`              | `false` | Disables the inner `<input>`.                                                          |
| `indeterminate`  | `boolean`              | `false` | Mixed state — sets the DOM `indeterminate` property (not reflectable via HTML attribute). |
| `hint`           | `string`               | —       | Help text shown under the label.                                                       |
| `class`          | `string`               | —       | Extra classes merged into the host label.                                              |
| `ariaLabel`      | `string \| undefined`  | —       | Accessible name of the inner `<input>`, aliased on `aria-label` — for a checkbox with no projected label (e.g. a "select all" box). |

| Output          | Payload   | Description                              |
| ---------------- | --------- | ------------------------------------------ |
| `checkedChange`  | `boolean` | Emits the new checked state — from `model`. |
