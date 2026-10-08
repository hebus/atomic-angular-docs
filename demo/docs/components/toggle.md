# Toggle

A pill-shaped toggle button (`<Toggle>`) and its container (`<ToggleGroup>`), built on the accessible
`@angular/aria/toolbar` primitive (roving tabindex, keyboard navigation, `role="toolbar"`). The pressed
state is exposed via `aria-pressed`.

## Group — single (exclusive)

Only one toggle active at a time (radio-like). Selection lives in the group's `value` model (`string[]`).

<demo-toggle-group-single></demo-toggle-group-single>

```html
picked = signal<string[]>(['all']);

<ToggleGroup [(value)]="picked">
  <Toggle value="all">All</Toggle>
  <Toggle value="docs">Documents</Toggle>
  <Toggle value="people">People</Toggle>
</ToggleGroup>
```

## Group — multi (independent)

Add `multi` on the group: toggles are selected independently, and `value` holds every active id.

<demo-toggle-group-multi></demo-toggle-group-multi>

```html
facets = signal<string[]>(['all', 'people']);

<ToggleGroup multi [(value)]="facets">
  <Toggle value="all">All</Toggle>
  <Toggle value="docs">Documents</Toggle>
  <Toggle value="people">People</Toggle>
</ToggleGroup>
```

## Standalone

Outside a group, a `<Toggle>` owns its own pressed state via `[(pressed)]` (no `value`).

<demo-toggle-standalone></demo-toggle-standalone>

```html
bookmarked = signal(false);

<Toggle variant="multi" [(pressed)]="bookmarked">Bookmark</Toggle>
```

## Sizes

`md` (36px) and `sm` (24px, default). Aliases `medium` / `small` are also accepted.

<demo-toggle-sizes></demo-toggle-sizes>

```html
<Toggle size="md" value="a">Medium</Toggle>
<Toggle size="sm" value="a">Small</Toggle>
```

## Disabled

`disabled` reflects to `aria-disabled` (custom element — not a native form control), making the toggle
non-focusable and non-interactive.

<demo-toggle-disabled></demo-toggle-disabled>

```html
<ToggleGroup [(value)]="val">
  <Toggle value="a">Enabled</Toggle>
  <Toggle value="b" disabled>Disabled</Toggle>
</ToggleGroup>

<Toggle variant="multi" disabled [pressed]="true">Disabled pressed</Toggle>
```

## Notes

- **`value`** is required for grouped toggles (it is the widget's identity in the toolbar selection) and
  is reserved for grouped use — a `<Toggle value>` outside a `<ToggleGroup>` will fail (the widget
  requires an `ngToolbar` ancestor).
- **`variant`** (`unique` / `multi`) is inherited from the group (`single` → `unique`, `multi` → `multi`)
  unless set explicitly on the toggle.
- **Icon / label slots**: wrap projected content with `class="toggle-icon"` / `class="toggle-label"`
  (`TOGGLE_ICON_CLASS` / `TOGGLE_LABEL_CLASS`) — the CVA sizes them per `size` and `iconOnly`.
- `showIcon` is a rendering discriminant only (no visual effect on its own today).

## API Reference

### ToggleComponent — standalone `<Toggle>` (no value)

| Input      | Type                                  | Default    | Description                                                        |
| ---------- | ------------------------------------- | ---------- | ------------------------------------------------------------------- |
| `class`    | `string`                              | —          | Extra class(es), merged via `cn`.                                  |
| `variant`  | `"unique" \| "multi"`                 | `"unique"` | Palette: `unique` (primary) or `multi` (secondary).                |
| `size`     | `"sm" \| "md" \| "small" \| "medium"` | `"sm"`     | Height — `sm`/`small` (24px) or `md`/`medium` (36px).               |
| `iconOnly` | `boolean`                             | `false`    | Square pill sized for icon-only content.                           |
| `showIcon` | `boolean`                             | `true`     | Rendering discriminant only — no visual effect on its own today.   |
| `disabled` | `boolean`                             | `false`    | Reflects to `aria-disabled` — non-focusable, clicks ignored.       |
| `pressed`  | `boolean` (model)                     | `false`    | Pressed state — supports `[(pressed)]`.                            |

| Output          | Payload   | Description                                  |
| --------------- | --------- | --------------------------------------------- |
| `pressedChange` | `boolean` | Emits the new pressed state — from `model`. |

### ToggleItemComponent — grouped `<Toggle value>`

Composes `@angular/aria/toolbar`'s `ToolbarWidget` as a host directive for `value`/`disabled`/`id`. Requires a `<ToggleGroup>` ancestor — a `<Toggle value>` outside one fails (the widget requires an `ngToolbar` ancestor).

| Input      | Type                                  | Default | Description                                                                          |
| ---------- | ------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| `value`    | `V` (required)                       | —       | Identity of the widget in the group's selection (from `ToolbarWidget`).               |
| `disabled` | `boolean`                             | `false` | Disables the widget in keyboard navigation and selection (from `ToolbarWidget`).       |
| `id`       | `string`                              | auto    | Unique identifier for the widget (from `ToolbarWidget`).                               |
| `class`    | `string`                              | —       | Extra class(es), merged via `cn`.                                                      |
| `variant`  | `"unique" \| "multi"`                 | —       | Explicit palette override; otherwise inherited from the parent `<ToggleGroup>`, else `"unique"`. |
| `size`     | `"sm" \| "md" \| "small" \| "medium"` | `"sm"`  | Height — `sm`/`small` (24px) or `md`/`medium` (36px).                                  |
| `iconOnly` | `boolean`                             | `false` | Square pill sized for icon-only content.                                               |
| `showIcon` | `boolean`                             | `true`  | Rendering discriminant only — no visual effect on its own today.                       |

### ToggleGroupComponent

Composes `@angular/aria/toolbar`'s `Toolbar` (inputs `value`/`orientation`/`wrap`/`disabled`/`softDisabled`, output `valueChange`) and `ToolbarWidgetGroup` (input `multi`) as host directives.

| Input          | Type                         | Default        | Description                                                                 |
| -------------- | ---------------------------- | -------------- | ----------------------------------------------------------------------------- |
| `value`        | `V[]` (model)                 | `[]`           | Selected widget value(s) — supports `[(value)]` (from `Toolbar`).            |
| `multi`        | `boolean`                    | `false`        | `false` (single): exclusive selection. `true`: independent selections (from `ToolbarWidgetGroup`). |
| `orientation`  | `"horizontal" \| "vertical"` | `"horizontal"` | Keyboard navigation axis (from `Toolbar`).                                    |
| `wrap`         | `boolean`                    | `true`         | Loop focus from the last item back to the first (from `Toolbar`).            |
| `disabled`     | `boolean`                    | `false`        | Disable the whole group (from `Toolbar`).                                    |
| `softDisabled` | `boolean`                    | `true`         | When `true`, disabled items stay focusable but not interactive (from `Toolbar`). |
| `class`        | `string`                     | —              | Extra class(es), merged via `cn`.                                            |

| Output        | Payload | Description                                              |
| ------------- | ------- | ---------------------------------------------------------- |
| `valueChange` | `V[]`   | Emits the updated selection — from `Toolbar`'s `value` model. |
