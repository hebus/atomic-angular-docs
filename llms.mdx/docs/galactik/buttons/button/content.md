# Button (/docs/galactik/buttons/button)

Restyle native <button> elements as a Galactik button — six variants, four sizes, icon-only mode — with no wrapper component and no change to native button behavior.



`Button` is a directive on the native `button` selector, not a wrapped component: importing it into a
component's `imports` restyles every `<button>` that component's own template renders directly, while leaving
`type`, `disabled`, form association and keyboard behavior exactly as the platform provides them.

## Minimal example [#minimal-example]

<CodeSample id="button-basic" title="A primary button">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { ButtonComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [ButtonComponent],
      template: `<button variant="primary" (click)="onSave()">Save</button>`,
    })
    export class SampleComponent {
      onSave() {
        /* ... */
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Host[&#x22;Host component template&#x22;] -- &#x22;variant / scheme / size / iconOnly / class&#x22; --> Directive[&#x22;ButtonComponent (directive on button)&#x22;]
    Directive -- &#x22;computed variants()&#x22; --> Native[[&#x22;Native button host element&#x22;]]
    User -- &#x22;click, Space, Enter&#x22; --> Native
    Native -- &#x22;native (click) event&#x22; --> Host"
/>

Because there is no dedicated tag, `ButtonComponent` only activates on `<button>` elements the *importing*
component's own template renders — a nested child component must import it itself too, exactly like any other
Angular directive.

## Recipes [#recipes]

### Variants, sizes and icon-only [#variants-sizes-and-icon-only]

<CodeSample id="button-variants" title="Every variant, size and an icon-only pair">
  <Lang value="angular">
    ```ts title="button-gallery.component.ts"
    import { Component } from "@angular/core";
    import { ButtonComponent, PlusIcon, TrashIcon } from "@sinequa/galactik";

    @Component({
      selector: "button-gallery",
      imports: [ButtonComponent, PlusIcon, TrashIcon],
      template: `
        <div class="flex flex-wrap items-center gap-3">
          <button variant="primary">Primary</button>
          <button variant="secondary">Secondary</button>
          <button variant="tertiary">Tertiary</button>
          <button variant="accent">Accent</button>
          <button variant="light-accent">Light accent</button>
          <button variant="none" class="underline">None (unstyled)</button>
        </div>

        <div class="flex flex-wrap items-end gap-3">
          <button variant="primary" size="xs">Extra small</button>
          <button variant="primary" size="sm">Small</button>
          <button variant="primary" size="md">Medium</button>
          <button variant="primary" size="lg">Large</button>
        </div>

        <div class="flex flex-wrap items-end gap-3">
          <!-- A real variant + [iconOnly]="true" — variant="none" would strip size/iconOnly too, see Pitfalls. -->
          <button variant="tertiary" [iconOnly]="true" size="md" aria-label="Add item">
            <PlusIcon />
          </button>
          <button variant="secondary" [iconOnly]="true" size="lg" aria-label="Delete item">
            <TrashIcon />
          </button>
        </div>
      `,
    })
    export class ButtonGalleryComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  variant: {
    type: '&#x22;primary&#x22; | &#x22;secondary&#x22; | &#x22;tertiary&#x22; | &#x22;accent&#x22; | &#x22;light-accent&#x22; | &#x22;none&#x22;',
    default: '&#x22;primary&#x22;',
    description: '&#x22;none&#x22; returns only class(), bypassing size/scheme/iconOnly entirely — see Pitfalls.',
  },
  scheme: {
    type: '&#x22;default&#x22; | &#x22;neutral&#x22;',
    default: '&#x22;default&#x22;',
    description: &#x22;Only affects variant=\&#x22;tertiary\&#x22;; no visible effect on any other variant.&#x22;,
  },
  size: {
    type: '&#x22;xs&#x22; | &#x22;sm&#x22; | &#x22;md&#x22; | &#x22;lg&#x22;',
    default: '&#x22;md&#x22;',
    description: '&#x22;xsmall&#x22;/&#x22;small&#x22;/&#x22;medium&#x22;/&#x22;large&#x22; accepted as byte-identical aliases.',
  },
  iconOnly: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description: &#x22;Renders a square button matching size, no horizontal padding. Pair with an explicit aria-label.&#x22;,
  },
  class: { type: &#x22;string | undefined&#x22;, description: &#x22;Merged (via cn()) into the computed variant classes.&#x22; },
}"
/>

This component has no outputs of its own — use the native `(click)` and other native button/keyboard events
directly.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="An icon-only button rendered with variant=&#x22;none&#x22; ignores size and iconOnly">
    `variant="none"` short-circuits the whole variant computation and returns `class()` alone — `size`, `iconOnly`
    and `scheme` are silently ignored whenever `variant` is `"none"`. For an icon-only button, keep a real variant
    (commonly `"tertiary"`) together with `[iconOnly]="true"`; never rely on `variant="none"` to get a bare icon
    button.
  </Accordion>

  <Accordion title="Icons don't scale automatically with the button's size">
    The icon-slot compound variants (`.btn-icon-left`/`.btn-icon-right`/`.btn-icon-solo`) only apply to an icon
    element that already carries one of those marker classes — and the constants that name them
    (`BUTTON_ICON_LEFT_CLASS` and friends) are **not** part of the public API (only `ButtonComponent` and the
    `ButtonVariants` type are exported). An icon placed inside a `<button>` keeps its own intrinsic size unless you
    apply the matching class yourself as a literal string.
  </Accordion>

  <Accordion title="Two different Button directives, same selector">
    `@sinequa/ui` (the library Galactik replaces) also exports a class named `ButtonComponent` on the same global
    `button` selector — importing both in one file requires aliasing one of them
    (`import { ButtonComponent as UiButton } from "@sinequa/ui"`). The two are not interchangeable: `@sinequa/ui`'s
    variant vocabulary is much larger and shares no compatible values with Galactik's `Button`. Always check the
    import path.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Toggle" href="./toggle.mdx">
    A pressed/unpressed pill, standalone or grouped into a segmented control.
  </Card>
</Cards>
