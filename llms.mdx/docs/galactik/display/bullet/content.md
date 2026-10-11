# Bullet (/docs/galactik/display/bullet)

A colored dot showing a status, category or priority next to a label — the dot half of Badge, without the content.



`Bullet` is a colored dot: a status, a category or a priority, shown next to a label. It is a bare directive
with no template — you write it as its own empty element. Think of it as the dot half of
[`Badge`](./badge.mdx): the same twelve schemes, the same two fills, without the content — a bullet and a
badge of the same scheme share the same background tokens.

## Minimal example [#minimal-example]

<CodeSample id="bullet-basic" title="A legend row">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { BulletComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [BulletComponent],
      template: `
        <ul>
          <li class="flex items-center gap-2"><bullet scheme="success" size="sm" /> Indexed</li>
          <li class="flex items-center gap-2"><bullet scheme="warning" size="sm" /> Pending</li>
          <li class="flex items-center gap-2"><bullet scheme="error" size="sm" /> Failed</li>
        </ul>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

A bullet has no text, so on its own it says nothing to assistive technology — when the label next to it
already names the status, that is correct: the dot is decoration, and stays out of the accessibility tree. Set
`aria-label` only when the dot is the *only* indication of the state, and it renders `role="img"` with that
accessible name.

`pulse` wraps the dot in an expanding, fading halo for a live "right now" status — a `::before` on the dot
itself, not a second element, so it stays a single boolean to toggle:

```html
<bullet scheme="success" size="sm" pulse />
<bullet scheme="error" size="sm" [pulse]="hasAlert()" />
```

## Options [#options]

<TypeTable
  type="{
  scheme: { type: '&#x22;sage&#x22; | &#x22;almond&#x22; | &#x22;pink&#x22; | &#x22;grey&#x22; | &#x22;success&#x22; | &#x22;warning&#x22; | &#x22;info&#x22; | &#x22;error&#x22; | &#x22;cyan&#x22; | &#x22;yellow&#x22; | &#x22;cherry&#x22; | &#x22;indigo&#x22;', default: '&#x22;sage&#x22;', description: &#x22;Color, in Badge's scheme names.&#x22; },
  fill: { type: '&#x22;primary&#x22; | &#x22;secondary&#x22;', default: '&#x22;primary&#x22;', description: &#x22;primary is the solid fill, secondary the light tonal one.&#x22; },
  size: { type: '&#x22;md&#x22; | &#x22;sm&#x22; | &#x22;xs&#x22;', default: '&#x22;md&#x22;', description: &#x22;Diameter: 18px / 12px / 8px.&#x22; },
  pulse: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Wraps the dot in an expanding, fading halo. No animation under prefers-reduced-motion.&#x22; },
  &#x22;aria-label&#x22;: { type: &#x22;string | undefined&#x22;, description: &#x22;Accessible name. Set it and the dot becomes role=\&#x22;img\&#x22;.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A pulsing bullet still animates for a user who asked for reduced motion, or doesn't">
    Expected the second way, not the first: `pulse`'s halo animates nothing under `prefers-reduced-motion` — a
    blinking indicator is precisely what such a user asked to be spared (WCAG 2.3.3). If you instead reach for
    `class="animate-pulse"` for a softer, no-halo variation, pair it with `motion-reduce:animate-none` yourself;
    and do not stack the two — `animate-pulse` fades the whole element, halo included, cancelling `pulse` out.
  </Accordion>

  <Accordion title="A color-only status dot fails an accessibility audit">
    A color is never the only carrier of information (WCAG 1.4.1). Pair the bullet with a text label, or give it
    an `aria-label` when there genuinely is no label next to it. Do not put text inside a bullet either — its
    size is fixed and content would be clipped; write the label as a sibling instead.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Badge" href="./badge.mdx">
    The same twelve schemes and two fills, with projected content instead of a bare dot.
  </Card>
</Cards>
