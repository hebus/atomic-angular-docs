# Badge (/docs/galactik/display/badge)

A small pastille apposed on another element — a numeric counter or a status icon — glued on with your own positioning.



`Badge` is a small pastille apposed on another element — a numeric counter (notifications, result counts) or a
status icon (online, verified, featured). It is a bare directive with no template: it only contributes host
classes (and, optionally, ARIA attributes) to whichever tag you write it on.

## Minimal example [#minimal-example]

<CodeSample id="badge-basic" title="A numeric badge">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { BadgeComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [BadgeComponent],
      template: `<badge variant="number" scheme="error">3</badge>`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`variant="number"` gives breathing-room padding and a minimum width equal to the row height, so it grows into
a pill past one or two digits. `variant="icon"` forces a square aspect ratio, meant for a single icon child.
Neither variant carries any positioning of its own — gluing a badge onto another element (a status dot on an
`Avatar`, an unread count on a tab) is your own `relative`/`absolute` wrapper:

<CodeSample id="badge-composition" title="Status dot glued to an Avatar">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AvatarComponent, AvatarImageComponent, AvatarFallbackComponent, BadgeComponent, CircleCheckIcon } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [AvatarComponent, AvatarImageComponent, AvatarFallbackComponent, BadgeComponent, CircleCheckIcon],
      template: `
        <div class="relative inline-block">
          <avatar size="large">
            <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Jane Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </avatar>
          <badge
            variant="icon"
            scheme="success"
            aria-label="Online"
            class="absolute -bottom-0.5 -right-0.5 ring-2 ring-(--bg-neutral-white)"
          >
            <CircleCheckIcon />
          </badge>
        </div>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  variant: { type: '&#x22;icon&#x22; | &#x22;number&#x22;', default: '&#x22;number&#x22;', description: &#x22;icon forces a square aspect ratio for a single icon child; number adds horizontal padding and a min-width floor.&#x22; },
  fill: { type: '&#x22;primary&#x22; | &#x22;secondary&#x22;', default: '&#x22;primary&#x22;', description: &#x22;primary = solid fill, secondary = tonal fill.&#x22; },
  scheme: { type: '&#x22;sage&#x22; | &#x22;almond&#x22; | &#x22;pink&#x22; | &#x22;grey&#x22; | &#x22;success&#x22; | &#x22;warning&#x22; | &#x22;info&#x22; | &#x22;error&#x22; | &#x22;cyan&#x22; | &#x22;yellow&#x22; | &#x22;cherry&#x22; | &#x22;indigo&#x22;', default: '&#x22;sage&#x22;', description: &#x22;Semantic color palette.&#x22; },
  size: { type: '&#x22;md&#x22; | &#x22;sm&#x22; | &#x22;xs&#x22;', default: '&#x22;sm&#x22;', description: &#x22;Row-height-driven size.&#x22; },
  &#x22;aria-label&#x22;: { type: &#x22;string | undefined&#x22;, description: 'When set, the host also gets role=&#x22;img&#x22; — see Pitfalls.' },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="An icon badge is invisible to a screen reader">
    By default `Badge` carries no ARIA role at all. Plain text content (a digit) is still read because it is real
    text, but an `icon` badge's SVG typically carries `aria-hidden="true"` of its own — which makes the whole
    badge invisible to assistive technology unless you opt in. Set `aria-label`: the host then gets `role="img"`
    and the given name, so the icon and its chrome are announced as one meaningful unit.
  </Accordion>

  <Accordion title="Galactik icon import resolves to the wrong component">
    The generated icon catalog (`CircleCheckIcon`, `BellIcon`, …) is exported from the main `@sinequa/galactik` barrel, like
    every other component. `@sinequa/ui` exports over a hundred icons under the **same class names** — in a file
    importing from both libraries, alias the import or take every icon from a single source to avoid silently
    picking the wrong one.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Avatar" href="./avatar.mdx">
    Compose a status Badge with a user avatar, as shown above.
  </Card>

  <Card title="Tag" href="./tag.mdx">
    A read-only inline chip for categorizing content, instead of a pastille glued to another element.
  </Card>
</Cards>
