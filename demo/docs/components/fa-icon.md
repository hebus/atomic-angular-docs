# FA Icon

Renders the galactik SVG icon that matches a **FontAwesome class string**. It exists for icons configured on the backend as FontAwesome classes (for instance in the application's custom JSON: `"fas fa-home"`), which the application now draws with galactik SVG icons instead of a FontAwesome font.

- The component extracts the icon key from the class string (the first `fa-*` token that is not a style modifier such as `fas`, `far` or `fa-fw`).
- If that key is in the mapping, the **SVG icon wins** and is rendered.
- Otherwise it falls back to the native markup `<i class="..." aria-hidden="true">`: if FontAwesome is loaded by the host application the icon still shows, otherwise the `<i>` is empty. No warning is logged — the fallback is intentional.

## Imports

```ts
import { FaIconComponent } from "@sinequa/atomic-angular";
```

## Mapped icons

A sample of the mapped classes, each rendered with its class string below.

<demo-fa-icon-grid></demo-fa-icon-grid>

```html
<!-- Previously: <i class="fa-fw fas fa-home"></i> -->
<fa-icon faClass="fa-fw fas fa-home" />
```

## Size and color

The `class` input is forwarded to the SVG icon (and appended to the class list of the fallback `<i>`). The icon follows `currentColor`, so a text color utility recolors it.

<demo-fa-icon-styling></demo-fa-icon-styling>

```html
<fa-icon faClass="fas fa-bell" class="size-8 text-(--font-error-base)" />
```

## Fallback for an unmapped class

`fa-search` is not in the mapping (the mapped name is `fa-magnifying-glass`), so the component renders an empty `<i class="fas fa-search">` instead of an SVG. Here FontAwesome is not loaded, so nothing is drawn.

<demo-fa-icon-fallback></demo-fa-icon-fallback>

```html
<fa-icon faClass="fas fa-search" />
<!-- renders: <i class="fas fa-search" aria-hidden="true"></i> -->
```

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `faClass` | `string` | required | FontAwesome class string, e.g. `"fa-fw fas fa-home"`. |
| `class` | `string` | — | Extra classes passed to the SVG icon, or appended to the fallback `<i>`. |

## Notes

- The host is `display: contents` and `aria-hidden="true"`: the icon is decorative. Give the surrounding control its own accessible name.
- The mapping covers navigation, UI controls, states, content/actions, theme, AI, settings, media and file-type icons (see `FA_ICON_MAP`).
