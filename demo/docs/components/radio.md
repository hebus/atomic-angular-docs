# Radio

A circular radio button. Label is projected via content, hint text is optional. Group radios with a shared `name` and drive selection with `(checkedChange)`.

## Interactive

<demo-radio-interactive></demo-radio-interactive>

```html
selected = signal<string | null>(null);

<radio name="group" [checked]="selected() === 'a'" (checkedChange)="selected.set('a')">Option A</radio>
<radio name="group" [checked]="selected() === 'b'" (checkedChange)="selected.set('b')">Option B</radio>
<radio name="group" [checked]="selected() === 'c'" (checkedChange)="selected.set('c')">Option C</radio>
```

## With hint

<demo-radio-hint></demo-radio-hint>

```html
<radio name="plan" [checked]="true" hint="Best for small datasets.">Standard</radio>
<radio name="plan" hint="Requires additional configuration.">Advanced</radio>
<radio name="plan" [disabled]="true" hint="Coming soon.">Enterprise</radio>
```

## Disabled

<demo-radio-disabled></demo-radio-disabled>

```html
<radio [disabled]="true" />
<radio [disabled]="true" [checked]="true" />
```

## API Reference

### RadioComponent

| Input      | Type              | Default | Description                                          |
| ----------- | ------------------ | -------- | ------------------------------------------------------ |
| `checked`  | `boolean` (model)  | `false` | Checked state — supports `[(checked)]`.              |
| `disabled` | `boolean`          | `false` | Disables the inner `<input>`.                        |
| `name`     | `string`           | —       | Native `name` attribute — group radios by sharing it. |
| `hint`     | `string`           | —       | Help text shown under the label.                     |
| `class`    | `string`           | —       | Extra classes merged into the host label.            |

| Output          | Payload   | Description                              |
| ---------------- | --------- | ------------------------------------------ |
| `checkedChange`  | `boolean` | Emits the new checked state — from `model`. |
