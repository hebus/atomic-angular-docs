# Tag (/docs/galactik/display/tag)

A static, read-only chip for categorizing content — a document type, an applied filter shown for reference, a status label.



`Tag` categorizes content read-only — a document type, an applied filter shown for reference, a status label.
It is a bare directive with no template: it only contributes host classes to whichever tag you write it on,
projecting its content as-is.

## Minimal example [#minimal-example]

<CodeSample id="tag-basic" title="A single tag">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { TagComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TagComponent],
      template: `<tag variant="primary" scheme="sage">Document</tag>`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`variant` (`primary` soft fill / `secondary` outline) is crossed with `scheme` (12 semantic palettes). Having
no template means a `Tag` composes with anything projected inside it — plain text, or an icon alongside a
label, sized automatically through the `.tag-icon` slot class:

<CodeSample id="tag-icon" title="Tag with an icon">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { TagComponent, CircleCheckIcon } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TagComponent, CircleCheckIcon],
      template: `
        <tag variant="primary" scheme="success" size="sm">
          <CircleCheckIcon class="tag-icon" />
          Verified
        </tag>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Removable tags [#removable-tags]

A tag the user can take away carries a `tag-remove` after its label: a real `<button>` (Tab to reach it, Enter or Space
to activate it) named after the tag, with an `removed` event.

<CodeSample id="tag-removable" title="A list of removable tags">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { TagComponent, TagRemoveComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TagComponent, TagRemoveComponent],
      template: `
        @for (tag of tags(); track tag) {
          <tag scheme="grey" size="xs">
            {{ tag }}
            <tag-remove [aria-label]="'Remove ' + tag" (removed)="remove(tag)" />
          </tag>
        }
      `,
    })
    export class SampleComponent {
      protected readonly tags = signal(["design", "angular", "tokens"]);

      protected remove(tag: string) {
        this.tags.update(tags => tags.filter(t => t !== tag));
      }
    }
    ```
  </Lang>
</CodeSample>

`TagInput`, the principal picker's chips and `Autocomplete`'s chips all use it. It is an element with its own button, not an
attribute on yours: a component that imports `ButtonComponent` (which matches every `button` of its template) would
otherwise restyle it.

## Options [#options]

<TypeTable
  type="{
  variant: { type: '&#x22;primary&#x22; | &#x22;secondary&#x22;', default: '&#x22;primary&#x22;', description: &#x22;primary = soft/tinted fill; secondary = transparent background with a colored outline.&#x22; },
  scheme: { type: '&#x22;sage&#x22; | &#x22;almond&#x22; | &#x22;pink&#x22; | &#x22;grey&#x22; | &#x22;yellow&#x22; | &#x22;cherry&#x22; | &#x22;indigo&#x22; | &#x22;cyan&#x22; | &#x22;success&#x22; | &#x22;warning&#x22; | &#x22;info&#x22; | &#x22;error&#x22;', default: '&#x22;sage&#x22;', description: &#x22;Semantic color palette.&#x22; },
  size: { type: '&#x22;xs&#x22; | &#x22;sm&#x22; | &#x22;md&#x22;', default: '&#x22;md&#x22;', description: &#x22;Controls padding, radius, text size and the .tag-icon slot size. xsmall/small/medium are accepted aliases, kept for BEM parity — prefer the short forms.&#x22; },
}"
/>

`<tag-remove>`:

<TypeTable
  type="{
  &#x22;aria-label&#x22;: { type: &#x22;string&#x22;, description: &#x22;Required. What the button removes (\&#x22;Remove design\&#x22;): an icon alone names nothing. Nothing in the library translates, so pass it translated and bind it as [aria-label].&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;The button stays in place and removes nothing.&#x22; },
  removed: { type: &#x22;void&#x22;, description: &#x22;Output. Fires on a click, Enter or Space. The click does not bubble, so a handler on the field around the tags is not triggered.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A removable/dismissible tag list doesn't build on Tag alone">
    `Tag` has no click handler, no `disabled` state, and no built-in remove/close button — it is read-only by
    design. For a removable tag list backed by search/selection state, reach for `Autocomplete`, which renders its
    applied values as `Tag`s internally and exposes the removal outputs; don't try to bolt dismiss behavior onto a
    bare `Tag`.
  </Accordion>

  <Accordion title="Tag and Badge's variant values aren't interchangeable">
    `Tag` uses `variant` itself for solid/outline styling (`primary`/`secondary`) and has no separate `fill`
    input. `Badge` (see [Badge](./badge.mdx)) instead uses `variant` for its icon/number discriminator and a
    separate `fill` for solid/tonal styling. The two components' `variant` values name unrelated things.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Badge" href="./badge.mdx">
    A pastille apposed on another element — a counter or a status icon — rather than an inline chip.
  </Card>

  <Card title="List" href="./list.mdx">
    Render rows that might carry a Tag as a status column, alongside an icon and a label.
  </Card>
</Cards>
