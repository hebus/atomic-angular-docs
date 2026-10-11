# Avatar (/docs/galactik/display/avatar)

Represent a user or entity as a picture or initials, with an automatic fallback when the image hasn't loaded yet or fails to load.



`Avatar` represents a user or entity as a picture or initials, switching between the two automatically as the
image loads, fails, or is absent — no manual state handling required. It is composed of the `Avatar`
container plus two projected sub-components, `AvatarImage` and `AvatarFallback`.

## Minimal example [#minimal-example]

<CodeSample id="avatar-basic" title="Picture with an initials fallback">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AvatarComponent, AvatarImageComponent, AvatarFallbackComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [AvatarComponent, AvatarImageComponent, AvatarFallbackComponent],
      template: `
        <avatar size="large">
          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Jane Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </avatar>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`AvatarImage` preloads its `src` through an off-DOM `Image()` probe before anything renders, so there is never
a layout-shifting broken-image icon. `AvatarFallback` is shown until that probe resolves, and stays shown
permanently if it fails — or if there is no `AvatarImage` at all, for an initials-only avatar.

<Mermaid
  chart="flowchart TD
    Avatar -- contentChild --> AvatarImage
    Avatar -- contentChild --> AvatarFallback
    Avatar -- &#x22;provides AVATAR_REF&#x22; --> Ref((&#x22;AVATAR_REF token&#x22;))
    Ref -- &#x22;inject(AVATAR_REF, optional)&#x22; --> AvatarFallback
    AvatarFallback -- &#x22;size()/fill()/scheme() ?? avatar?.size()/fill()/scheme() ?? hardcoded default&#x22; --> Resolved[[&#x22;resolvedSize / resolvedFill / resolvedScheme&#x22;]]
    AvatarImage -- &#x22;creates off-DOM probe&#x22; --> Probe((&#x22;window.Image probe&#x22;))
    Probe -- onload --> StatusLoaded[[&#x22;status = 'loaded'&#x22;]]
    Probe -- onerror --> StatusError[[&#x22;status = 'error'&#x22;]]
    StatusLoaded -- renders --> Img[[&#x22;&lt;img&gt;&#x22;]]
    Avatar -- &#x22;effect(): status()==='loaded'?&#x22; --> Decision{&#x22;loaded?&#x22;}
    Decision -- yes --> HideFallback[&#x22;AvatarFallback.canrender = false&#x22;]
    Decision -- no loading/error --> ShowFallback[&#x22;AvatarFallback.canrender = true&#x22;]
    ShowFallback -- renders --> Span[[&#x22;&lt;span&gt; initials (Resolved classes)&#x22;]]"
/>

`AvatarFallback` also inherits `size`/`fill`/`scheme` from its parent `<avatar>` through the `AVATAR_REF`
token, so a size set once on `<avatar>` sizes the fallback too — set a prop directly on `<AvatarFallback>` to
override just that one.

## Recipes [#recipes]

### Status badge composition [#status-badge-composition]

`Avatar` has no built-in slot for a status dot; it composes with `Badge` through a relatively-positioned
wrapper — the same pattern the design system uses everywhere a status pill is glued to another element.

<CodeSample id="avatar-badge" title="Avatar with an online status dot">
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
  size: { type: '&#x22;xsmall&#x22; | &#x22;small&#x22; | &#x22;medium&#x22; | &#x22;large&#x22;', default: '&#x22;large&#x22;', description: &#x22;Footprint, mapped to --row-height-* tokens. xsmall is meant to stay picture-only per the design guideline, though nothing enforces it.&#x22; },
  fill: { type: '&#x22;primary&#x22; | &#x22;secondary&#x22;', default: '&#x22;primary&#x22;', description: &#x22;Only visibly affects AvatarFallback (initials) — an AvatarImage that has loaded covers the whole surface.&#x22; },
  scheme: { type: '&#x22;sage&#x22; | &#x22;almond&#x22; | &#x22;grey&#x22; | &#x22;indigo&#x22; | &#x22;cyan&#x22; | &#x22;yellow&#x22; | &#x22;cherry&#x22; | &#x22;info&#x22; | &#x22;error&#x22; | &#x22;pink&#x22; | &#x22;success&#x22; | &#x22;warning&#x22;', default: '&#x22;sage&#x22;', description: &#x22;Semantic color palette, applied to the fallback initials.&#x22; },
}"
/>

`AvatarImage` additionally takes `src` (required), `alt`, `width`, `height`. `AvatarFallback` accepts explicit
`size`/`fill`/`scheme` overrides, inherited from the parent `<avatar>` when omitted.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="AvatarFallback silently disappears, or renders as plain text with no slot styling">
    `Avatar`'s template projects content through two typed `<ng-content select>` slots, tied to the exact tag
    spelling `AvatarImage`/`AvatarFallback` — any other projected content (plain text, a different element) is
    silently dropped rather than falling through to a default slot. The kebab-case (`<avatar-image>`) and
    lowercase (`<avatarimage>`) selector aliases exist for standalone use elsewhere, but are not guaranteed to
    land in `Avatar`'s projection slots — stick to the PascalCase forms when nesting inside `<avatar>`.
  </Accordion>

  <Accordion title="A broken avatar image logs to the console on every load">
    `AvatarImageComponent`'s probe calls `console.log("Image failed to load", src)` — not `console.error` — on
    `onerror`. Expect console noise in views with unreliable avatar URLs; there is no output to intercept this
    instead.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Badge" href="./badge.mdx">
    The status-dot composition pattern shown above, in full.
  </Card>

  <Card title="Tag" href="./tag.mdx">
    An adjacent role/category label to pair with an avatar in a member row.
  </Card>
</Cards>
