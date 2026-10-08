# Avatar

A circular avatar built by composition: `<avatar>` wraps an `<AvatarImage>` (shown once the image loads) and an `<AvatarFallback>` (initials shown while loading or on error). Supports 4 sizes: `xsmall`, `small`, `medium`, `large`.

## Sizes

`xsmall` (18px), `small` (24px), `medium` (36px), `large` (44px) — dimensions follow the galactik `--row-height-*` design tokens. `xsmall` is picture-only (initials would be illegible at 18px).

<demo-avatar-sizes></demo-avatar-sizes>

```html
<avatar size="large">
  <AvatarImage src="https://example.com/photo.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</avatar>
```

`AvatarFallback` inherits `size` from its parent `<avatar>` automatically — no need to repeat it (it can still be overridden locally).

## With image

The image is preloaded and only rendered once it has loaded; if it fails, the fallback initials are shown instead.

<demo-avatar-with-image></demo-avatar-with-image>

```html
<!-- loads → image; fails → fallback -->
<avatar size="large">
  <AvatarImage src="https://example.com/photo.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</avatar>
```

## Fill & schemes

`fill="primary"` (dark solid fill, default) and `fill="secondary"` (light tonal fill), combined with any of the 12 color `scheme`s. `AvatarFallback` inherits `fill`/`scheme` from its parent `<avatar>` automatically.

<demo-avatar-fill></demo-avatar-fill>

```html
<avatar fill="primary" scheme="sage">
  <AvatarFallback>AB</AvatarFallback>
</avatar>
<avatar fill="secondary" scheme="sage">
  <AvatarFallback>AB</AvatarFallback>
</avatar>
```

## Fallback only

Without an `<AvatarImage>`, the initials always render. `AvatarFallback` inherits `size` from `<avatar>` automatically.

<demo-avatar-fallback></demo-avatar-fallback>

```html
<avatar size="medium">
  <AvatarFallback>AB</AvatarFallback>
</avatar>
```

## API Reference

### AvatarComponent

Selector: `avatar` (or `Avatar`).

| Input    | Type                                                | Default     | Description                                                                 |
| -------- | --------------------------------------------------- | ----------- | ---------------------------------------------------------------------------- |
| `class`  | `string`                                             | —           | Extra classes merged into the host.                                        |
| `size`   | `"xsmall" \| "small" \| "medium" \| "large"`         | `"large"`   | Dimensions, following the galactik `--row-height-*` tokens.                |
| `fill`   | `"primary" \| "secondary"`                           | `"primary"` | Dark solid fill or light tonal fill. Exposed as `fill` (not `style`) since `style` collides with the native HTML attribute. |
| `scheme` | one of the 12 color schemes (e.g. `"sage"`, `"error"`) | `"sage"`  | Color scheme, combined with `fill`.                                       |

### AvatarImageComponent

Selector: `avatar-image` (or `AvatarImage`, `avatarimage`). Rendered only once the image has loaded — falls back to `AvatarFallback` while loading or on error.

| Input            | Type                | Default | Description                                                    |
| ---------------- | ------------------- | ------- | ------------------------------------------------------------------ |
| `class`          | `string`            | —       | Extra classes merged into the rendered `<img>`.                    |
| `src`            | `string` (required) | —       | Image URL.                                                          |
| `alt`            | `string`            | —       | Alt text on the rendered `<img>`.                                  |
| `width`          | `string`            | —       | `width` attribute on the rendered `<img>`.                         |
| `height`         | `string`            | —       | `height` attribute on the rendered `<img>`.                        |
| `referrerPolicy` | `string`            | `""`    | Forwarded to the underlying `Image` used to preload/probe the src. |
| `crossOrigin`    | `string`            | `""`    | Forwarded to the underlying `Image` used to preload/probe the src. |

### AvatarFallbackComponent

Selector: `avatar-fallback` (or `AvatarFallback`, `avatarfallback`). Renders its content (typically initials) while the sibling `AvatarImage` is loading, failed, or absent.

| Input    | Type                                                | Default                          | Description                                                     |
| -------- | ---------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------- |
| `class`  | `string`                                             | —                                  | Extra classes merged into the rendered `<span>`.                     |
| `size`   | `"xsmall" \| "small" \| "medium" \| "large"`         | inherited from the parent `avatar`, else `"large"` | Explicit size override.                          |
| `fill`   | `"primary" \| "secondary"`                           | inherited from the parent `avatar`, else `"primary"` | Explicit fill override.                        |
| `scheme` | one of the 12 color schemes                          | inherited from the parent `avatar`, else `"sage"` | Explicit scheme override.                         |
