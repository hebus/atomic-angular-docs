# Popover (/docs/galactik/overlay/popover)

Enhance the native HTML Popover API with Floating UI positioning — the bare primitive Menu and every other floating panel in this library are built from.



`PopoverDirective` wraps the native HTML **Popover API** (the `popover` attribute) with intelligent
positioning from Floating UI. It responds to two selectors — `[popover]` and `[dropdown]` — which are the same
directive; `[dropdown]` only changes one default. Reach for it directly when the floating content is not a
list of actions; when it is, [Menu](./menu.mdx) is built on exactly this directive and adds the ARIA menu
semantics on top.

<Callout title="Concept — the native Popover API">
  An element with a `popover` attribute renders in the browser's **top layer** — above everything else, no
  `z-index` required — and is shown/hidden by the browser itself: native focus handling, `Escape`-to-close and
  click-outside dismissal all come from the platform. `PopoverDirective` adds what the platform does not:
  computed placement relative to a trigger, collision-aware repositioning, and a couple of small ergonomics the
  raw attribute leaves to you.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="popover-basic" title="A basic popover">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { DropdownDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [DropdownDirective],
      template: `
        <button popovertarget="my-popover">Open popover</button>

        <div popover id="my-popover" class="w-64 p-3">
          <p>This is popover content.</p>
        </div>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

The trigger/target contract is entirely native HTML: any `<button>` with `popovertarget="<id>"` auto-invokes
the element carrying `[popover]`/`[dropdown]` with a matching, page-unique `id` — `PopoverDirective` only adds
the positioning once it opens.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Trigger[&#x22;button popovertarget&#x22;] -- native click --> Native[(&#x22;native Popover API&#x22;)]
    Native -- toggle event --> Directive[PopoverDirective]
    Directive -- state.set, open --> AutoUpdate[autoUpdate]
    AutoUpdate -- computePosition placement+offset+flip+shift --> FloatingUI[(&#x22;floating-ui/dom&#x22;)]
    FloatingUI -- left/top styles --> Element[[&#x22;div popover / dropdown&#x22;]]
    Element -- click closeOnClick / scroll closeOnScroll --> Directive
    Directive -- hidePopover --> Native"
/>

The element starts `visibility: hidden` until the first position is computed, avoiding a flash at the wrong
spot. `autoUpdate` (repositioning on scroll, resize, or a DOM mutation near the trigger) only runs while the
popover is open — zero overhead while closed. `[dropdown]` is the exact same directive as `[popover]`; it only
changes what `closeOnClick` defaults to (see [Options](#options)).

## Recipes [#recipes]

### Dropdown — closes on item click [#dropdown--closes-on-item-click]

Use `[dropdown]` for menus or lists where picking an item should always close the panel. `PopoverDirective` is
a bare positioning primitive with no "menu item" look of its own — factor the item classes into your own
reusable component, or reach for [Menu](./menu.mdx) when the content is an actions list with keyboard
navigation.

<CodeSample id="popover-dropdown" title="Actions panel that closes on click">
  <Lang value="angular">
    ```ts title="dropdown.component.ts"
    import { Component } from "@angular/core";
    import { DropdownDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [DropdownDirective],
      template: `
        <button popovertarget="my-dropdown">Actions</button>

        <div dropdown id="my-dropdown" placement="bottom-start" class="min-w-48">
          <button class="flex w-full items-center rounded-xs px-3 py-2 text-left text-sm hover:bg-(--bg-primary-lighter)">Edit</button>
          <button class="flex w-full items-center rounded-xs px-3 py-2 text-left text-sm hover:bg-(--bg-primary-lighter)">Duplicate</button>
        </div>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

Opt a `[dropdown]` out of its default click-to-close with an explicit `[config]`:
`[config]="{ closeOnClick: false }"`.

### Locking the position, for a trigger that moves [#locking-the-position-for-a-trigger-that-moves]

By default `flip()`/`shift()` reposition the popover if the viewport runs out of room. `[lockPosition]="true"`
disables both, forcing it to stay at the exact configured `placement` — useful when a consuming component
already accounts for available space itself and a repositioning popover would fight that logic.

<CodeSample id="popover-lock-position" title="A popover pinned to one side">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { DropdownDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [DropdownDirective],
      template: `
        <button popovertarget="pinned">More filters</button>

        <div popover id="pinned" placement="bottom-start" [lockPosition]="true" class="w-72 p-3">
          <p>Always opens bottom-start, regardless of available viewport space.</p>
        </div>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Programmatic control and reactive state [#programmatic-control-and-reactive-state]

Grab the directive instance with `exportAs="popover"` (or `"dropdown"`) to drive it imperatively, and read
`state()` to react to it.

<CodeSample id="popover-programmatic" title="Controlling and observing a popover">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { DropdownDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [DropdownDirective],
      template: `
        <button popovertarget="state-demo" #ref="popover">Toggle</button>

        <div popover id="state-demo" #statePopover="popover">
          <p>Popover content</p>
          <button (click)="statePopover.close()">Close</button>
        </div>

        @if (statePopover.state() === 'open') {
          <p>Popover is currently open!</p>
        }
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  class: { type: &#x22;string&#x22;, description: &#x22;Additional classes merged with the directive's own defaults (m-0 fixed — no padding: the surface that wears the directive decides) via cn().&#x22; },
  placement: {
    type: &#x22;Placement&#x22;,
    default: '&#x22;bottom&#x22;',
    description: &#x22;Position relative to the trigger. Any of the 12 @floating-ui/dom placements.&#x22;,
  },
  offset: { type: &#x22;number&#x22;, default: &#x22;4&#x22;, description: &#x22;Distance in pixels between the trigger and the popover.&#x22; },
  config: {
    type: &#x22;{ closeOnScroll?: boolean; closeOnClick?: boolean }&#x22;,
    default: &#x22;{} — closeOnClick true only via [dropdown]&#x22;,
    description: &#x22;Not re-exported from public-api.ts — pass a matching object literal inline, no import required.&#x22;,
  },
  lockPosition: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description: &#x22;Forces the popover to stay at the exact placement, disabling the flip()/shift() middleware.&#x22;,
  },
}"
/>

Read through a template reference (`#ref="popover"` or `"dropdown"`): `width` (`Signal<number>`, the trigger's
`offsetWidth`, handy for width-matched panels) and `state` (`Signal<"open" | "closed">`). Methods: `close()`,
`show()`, `toggle()`. No outputs — react to `state()` instead.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="import { PopoverDirective } from &#x22;@sinequa/galactik&#x22; fails to resolve">
    Not anymore, on this branch — both `PopoverDirective` and its `DropdownDirective` alias are exported from
    `public-api.ts`. Either import name resolves to the same class; the **selector you write in the template**
    (`[popover]` vs `[dropdown]`), not the TypeScript import name, is what decides the default `closeOnClick`.
  </Accordion>

  <Accordion title="A dropdown flashes open at the wrong position for a frame">
    Expected on the very first paint of a popover that has never opened before: the element starts
    `visibility: hidden` until the first `computePosition` resolves, specifically to avoid a flash at an
    unpositioned spot. If you still see a visible flash, check that nothing overrides that initial visibility with
    a `class` input.
  </Accordion>

  <Accordion title="A non-button trigger doesn't open the popover on click">
    The native auto-invoke behavior for `popovertarget` only applies to `<button>`/`<input type="button">`
    elements. A `<div>` or similar acting as a trigger (a context-menu anchor, for instance) needs to open the
    popover imperatively — grab the directive with a template reference and call `.show()`/`.toggle()` from your
    own event handler, as in [Programmatic control](#programmatic-control-and-reactive-state) above.
  </Accordion>

  <Accordion title="Not supported on this browser">
    The native Popover API requirement means no iOS 16 and below. Minimum versions: Chrome 114+, Edge 114+, Safari
    17+ (iOS 17+), Firefox 125+.
  </Accordion>

  <Accordion title="Two different popover implementations coexist">
    `@sinequa/ui` ships its own `PopoverDirective`/`DropdownDirective` with a similar API shape (the same
    `placement`/`offset`/`config`, the same `exportAs` pattern) but a distinct implementation and CSS — unlike
    `Menu`, which has fully migrated, **both implementations genuinely coexist** on this branch. Always check the
    actual import path before assuming which one a `Popover`/`Dropdown` symbol in a file refers to.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Menu" href="./menu.mdx">
    The ARIA menu built on this same directive, for a list of actions with keyboard navigation.
  </Card>

  <Card title="@sinequa/galactik overview" href="../index.mdx">
    What this library is, and how it relates to atomic-angular.
  </Card>
</Cards>
