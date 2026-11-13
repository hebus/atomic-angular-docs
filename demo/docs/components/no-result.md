# No Result

Empty-state block for a search that came back without documents: a frown icon, a title, a suggestion on how to rephrase the query, and a line pointing at the administrator. Every string is translated through the `no-result` transloco scope the component provides itself.

## Imports

```ts
import { NoResultComponent } from "@sinequa/atomic-angular";
```

## Basic usage

The component takes no inputs. Colours come from the host, so the surrounding page decides whether it reads as a warning, a neutral notice or something else.

<demo-no-result></demo-no-result>

```html
<NoResult class="bg-(--bg-warning-base-alt) text-(--font-warning-base)" />
```

## Responsive icon

The title is a full sentence, so it wraps as soon as the container narrows — a mobile viewport, a slim result column, or simply a longer translation (FR and DE are more verbose than EN). The frown icon follows the height of the title block instead of staying at a fixed size: a square as tall as the title's line box while it fits on one line, growing up to a 40px square once it wraps. It stays square at every step, and never pushes the text out of the box.

<demo-no-result-widths></demo-no-result-widths>

```html
<!-- inside the component: a 2.5rem reserved column, empty and stretched, so it
     adds nothing to the row height while the svg fills it absolutely -->
<header class="flex gap-2 text-xl font-semibold">
  <span class="relative w-10 shrink-0">
    <frown-icon class="absolute inset-0 size-full object-contain" />
  </span>
  <p>{{ 'noResult.noResult' | transloco }}</p>
</header>
```

## Notes

- No input is exposed: the icon, its reserved column and the three paragraphs are internal. Only the host classes are yours.
- The wording lives in the library's `no-result` i18n files (`en`, `fr`, `de`) — override the keys in the app's own translations to change it.
