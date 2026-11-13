# Loading Dots (/docs/atomic-angular/preview/loading-dots)

Three dots that wave one after the other — a quiet loader for a control or a panel that is waiting for its content, used by the preview and by the Load more button of the facets.



`<loading-dots>` is the loader of the preview while a document is fetched, converted and scrolled to its page, of the
Extracts tab of the find results, and of the **Load more** button of the list and tree facets: three dots that wave one
after the other, in place of a spinner.

```html
<loading-dots size="lg" class="text-(--font-primary-base)" [label]="'preview.loading' | transloco" />
```

The dots are drawn in the current text colour: the colour, the margin and the place are the host's, through its `class`.
Under `prefers-reduced-motion` the dots keep still.

## Accessibility [#accessibility]

Without a `label` the component is decoration (`aria-hidden="true"`): use it inside a control that already says it is
busy, as the Load more button does with `aria-busy`. With a `label` it is a polite live region (`role="status"`) that
says it to a screen reader and shows nothing but the dots.

## API [#api]

<TypeTable
  type="{
  size: { type: '&#x22;sm&#x22; | &#x22;md&#x22; | &#x22;lg&#x22;', default: '&#x22;md&#x22;', description: &#x22;The size of the dots: 6px (fits in a button), 8px (next to a line of text) or 12px (stands alone in a panel). The room between them follows.&#x22; },
  label: { type: &#x22;string&#x22;, description: &#x22;What a screen reader says while it waits. Without it the dots are decoration only.&#x22; },
}"
/>
