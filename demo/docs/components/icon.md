# Icon

Galactik ships its icons as standalone components (`<refresh-icon />`, `<check-icon />`…), each rendering an inline `<svg>` that follows `currentColor`. Their size is **16 px by default and can be driven from a container**.

## Imports

```ts
import { RefreshIcon, DebugIcon, CheckIcon } from "@sinequa/galactik";
```

## Default size

The default comes from the `width="1rem"` / `height="1rem"` presentation attributes of the `<svg>`, not from a `size-*` class.

<demo-icon-default></demo-icon-default>

```html
<refresh-icon />
<debug-icon />
<check-icon />
```

## Size one icon

A `size-*` class given to the icon always wins. Use it for a single icon.

<demo-icon-class></demo-icon-class>

```html
<refresh-icon class="size-(--icon-xs)" />
<refresh-icon class="size-(--icon-md)" />
<refresh-icon class="size-8 text-(--font-error-base)" />
```

## Size a whole container

Because the icon carries no `size-*` class, a rule written on the container applies to every icon that does not set its own size. Nothing has to be repeated per icon.

<demo-icon-container></demo-icon-container>

```html
<div class="[&_svg:not([class*='size-'])]:size-(--icon-xs)">
  <refresh-icon />
  <debug-icon />
  <check-icon />
</div>
```

## An explicit size still wins

An icon that sets its own `size-*` class is excluded by the `:not([class*='size-'])` selector and keeps its size.

<demo-icon-container-override></demo-icon-container-override>

```html
<div class="[&_svg:not([class*='size-'])]:size-(--icon-xs)">
  <refresh-icon />
  <debug-icon class="size-6" />
  <check-icon />
</div>
```

## Icons rendered dynamically

The container rule also sizes icons created with `NgComponentOutlet`, where passing a `class` input to each one would be impractical.

<demo-icon-dynamic></demo-icon-dynamic>

```html
<div class="[&_svg:not([class*='size-'])]:size-(--icon-xs)">
  @for (icon of icons; track icon) {
    <ng-container [ngComponentOutlet]="icon" />
  }
</div>
```

```typescript
protected readonly icons = [RefreshIcon, DebugIcon, CheckIcon];
```

## Solid variant

Icons with a filled variant (`thumbs-up`, `thumbs-down`, `bookmark`…) expose a `solid` input.

<demo-icon-solid></demo-icon-solid>

```html
<thumbs-up-icon />
<thumbs-up-icon [solid]="true" />
<thumbs-down-icon />
<thumbs-down-icon [solid]="true" />
```

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `class` | `string` | — | Classes appended to the `<svg>`. A `size-*` class overrides the 16 px default and the container rule. |
| `solid` | `boolean` | `false` | Filled variant, on icons that have one. |
