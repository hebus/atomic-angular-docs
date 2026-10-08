# Link

Styles native anchors (and a dedicated `<Link>` element) while keeping host semantics intact — `href`, `routerLink`, `target`, etc. Hover, active and focus states rely on native pseudo-classes; the current-page and disabled looks react directly to the `aria-current="page"` and `aria-disabled` attributes, whichever way they got set.

## Sizes

`sm` (12px, default) · `md` (14px).

<demo-link-sizes></demo-link-sizes>

```html
<a link size="sm" href="#">Small link</a>
<a link size="md" href="#">Medium link</a>
```

## Visited

Set `visited` to add the bottom border used for previously-visited links.

<demo-link-visited></demo-link-visited>

```html
<a link href="#">Not visited</a>
<a link [visited]="true" href="#">Visited</a>
```

## Current page

No dedicated input — the CVA targets the native `aria-current="page"` attribute directly, so it works whether you set it statically, bind it yourself, or let `routerLinkActive` + `[ariaCurrentWhenActive]="'page'"` manage it. The directive never touches `aria-current`, so it can't fight the router for ownership of that attribute.

<demo-link-current-page></demo-link-current-page>

```html
<a link href="#">Overview</a>
<a link href="#" aria-current="page">Pricing</a>
<a link href="#">Docs</a>

<!-- with the router -->
<a link [routerLink]="['/home']" routerLinkActive [ariaCurrentWhenActive]="'page'">Home</a>
```

## With icon

Apply the `link-icon-left` (or `link-icon-right`) marker directive to a custom icon placed inside the link — it tags it with the matching slot class so the link's `size` variant can size it consistently, and keeps it visually on the correct side regardless of where it sits in the markup relative to the label text.

`openWindow` sets `target="_blank"`, `rel="noopener noreferrer"` **and** automatically appends the canonical external-link icon on the trailing side — no markup needed for that icon. It fully owns `target`/`rel` the same way `disabled` owns `aria-disabled`/`tabindex`: don't set `target`/`rel` manually on a link that binds `openWindow`, and don't use `openWindow` if a custom `rel` is needed.

<demo-link-icon></demo-link-icon>

```html
<a link href="#">
  <download-icon link-icon-left />
  Download
</a>
<a link [openWindow]="true" href="#">Read the docs</a>
```

## Disabled

`disabled` reflects `aria-disabled="true"` (native anchors have no `disabled` attribute) and sets `tabindex="-1"` so the link is skipped by keyboard navigation.

<demo-link-disabled></demo-link-disabled>

```html
<a link disabled>Disabled link</a>
<a link [visited]="true" disabled>Disabled visited</a>
```

## API Reference

### LinkComponent

Selector: `a[link], Link`.

| Input             | Type              | Default                       | Description                                                                 |
| ----------------- | ----------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| `size`            | `"sm" \| "md"`     | `"sm"`                         | Text size, and the size of a slotted icon.                                    |
| `visited`         | `boolean`          | `false`                        | Adds the bottom border used for a previously-visited link.                    |
| `icon`            | `boolean`          | `false`                        | Reserves icon spacing even with no `openWindow`, when a slotted icon is used. |
| `openWindow`      | `boolean`          | `false`                        | Sets `target="_blank"` + `rel="noopener noreferrer"` and appends the trailing external-link icon. Fully owns `target`/`rel` — don't set them manually alongside it. |
| `disabled`        | `boolean`          | `false`                        | Reflects `aria-disabled="true"` and sets `tabindex="-1"` (native anchors have no `disabled` attribute). |
| `openWindowLabel` | `string`           | `"(opens in a new window)"`    | Announced after the label when `openWindow` is set — translate it.            |
| `class`           | `string`           | —                              | Extra classes merged into the host.                                            |

Current-page styling has no dedicated input — it targets the native `aria-current="page"` attribute directly, however it was set (statically, bound, or via `routerLinkActive` + `[ariaCurrentWhenActive]="'page'"`).

### LinkIconLeftDirective / LinkIconRightDirective

Marker directives — apply `link-icon-left` (or `linkIconLeft`) / `link-icon-right` (or `linkIconRight`) to a custom icon placed inside the link to size and position it consistently with `size`.

| Input   | Type     | Default | Description                        |
| ------- | -------- | ------- | -------------------------------------- |
| `class` | `string` | —       | Extra classes merged into the icon slot. |
