# Bullet

A small colored dot used to indicate status, category or priority. 12 schemes, 2 fills, 3 sizes — the dot half of [Badge](/components/badge), sharing its color tokens.

```typescript
import { BulletComponent } from "@sinequa/galactik";
```

## Sizes

Three sizes: `md` (18px), `sm` (12px), `xs` (8px).

<demo-bullet-sizes></demo-bullet-sizes>

```html
<bullet size="md" scheme="sage" />
<bullet size="sm" scheme="sage" />
<bullet size="xs" scheme="sage" />
```

## Fills — primary & secondary

`primary` is the solid fill, `secondary` the light tonal one. Same two fills as `Badge`, same tokens.

<demo-bullet-fill></demo-bullet-fill>

```html
<bullet scheme="sage" fill="primary" />
<bullet scheme="sage" fill="secondary" />
```

## In a legend

A bullet carries no text: keep a label next to it. When the dot is the only indication, pass `aria-label` — it then renders as a named `img`.

<demo-bullet-legend></demo-bullet-legend>

```html
<li class="flex items-center gap-2"><bullet scheme="success" size="sm" /> Indexed</li>
<li class="flex items-center gap-2"><bullet scheme="warning" size="sm" /> Pending</li>

<!-- no label next to it -->
<bullet scheme="error" aria-label="Indexing failed" />
```

## Live status — `pulse`

One boolean: `pulse` wraps the dot in an expanding, fading halo. The halo is a `::before` on the dot
itself and uses `bg-inherit`, so it follows `scheme` and `fill` with no color to repeat — and it
animates nothing under `prefers-reduced-motion`.

<demo-bullet-pulse></demo-bullet-pulse>

```html
<!-- bare attribute, or bound -->
<bullet scheme="success" size="sm" pulse />
<bullet scheme="error" size="sm" [pulse]="hasAlert()" />
```

## Breathing dot

The softer form: no halo, the dot itself fades in and out. There is no variant for it — `class` is
merged into the variant classes, so Tailwind's own `animate-pulse` composes with the bullet.

<demo-bullet-breath></demo-bullet-breath>

```html
<span class="flex items-center gap-2">
  <bullet scheme="success" size="sm" class="animate-pulse motion-reduce:animate-none" />
  Indexing
</span>
```

Keep the `motion-reduce:animate-none`: a blinking indicator is exactly what a user asking for reduced
motion asked to be spared. And do not stack it on `pulse` — `animate-pulse` fades the whole element,
halo included, so the two cancel each other out. Pick one.

## All sizes × all schemes

<demo-bullet-matrix></demo-bullet-matrix>

```html
<bullet size="md" scheme="success" fill="primary" />
<bullet size="sm" scheme="error"   fill="secondary" />
<bullet size="xs" scheme="warning" fill="primary" />
```

## API Reference

### BulletComponent

Selector: `bullet` (or `Bullet`).

| Input       | Type                                                    | Default     | Description                                                                                            |
| ----------- | -------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `class`     | `string`                                                  | —           | Extra classes merged into the host.                                                                    |
| `scheme`    | one of the 12 color schemes (e.g. `"sage"`, `"error"`)    | `"sage"`    | Color scheme — shares its tokens with `Badge`.                                                          |
| `fill`      | `"primary" \| "secondary"`                                | `"primary"` | Solid fill or light tonal fill — same axis as `Badge`'s `fill`.                                          |
| `size`      | `"md" \| "sm" \| "xs"`                                    | `"md"`      | Dot diameter: 18px / 12px / 8px.                                                                        |
| `pulse`     | `boolean`                                                 | `false`     | Wraps the dot in an expanding, fading halo (the "live" status light). No animation under `prefers-reduced-motion`. |
| `ariaLabel` | `string \| undefined` (alias `aria-label`)                | —           | Accessible name for a dot carrying meaning on its own (no adjacent label). When set, the host also gets `role="img"`. |
