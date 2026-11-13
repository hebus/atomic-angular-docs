# Switch (/docs/galactik/form/switch)

A native checkbox styled as an on/off track-and-thumb toggle, with the same Signal Forms shape as Checkbox.



`Switch` wraps a native `<input type="checkbox" role="switch">` inside an accessible `<label>`, styled as an
on/off track-and-thumb toggle with a built-in check/cross icon in the thumb.

## Minimal example [#minimal-example]

<CodeSample id="switch-basic" title="A two-way bound on/off toggle, labelled by its content">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SwitchComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SwitchComponent],
      template: `
        <switch [(checked)]="enabled">Notifications</switch>
      `,
    })
    export class SampleComponent {
      enabled = signal(false);
    }
    ```
  </Lang>
</CodeSample>

## Label [#label]

Project the label as the content of the switch. It renders to the right of the switch, inside the switch's own
`<label>`: it names the switch and a click on the text toggles it, as with `Checkbox`. The content can be
text, optionally with a decorative icon (`aria-hidden`).

<CodeSample id="switch-label" title="A switch labelled by its projected content">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SwitchComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SwitchComponent],
      template: `<switch [(checked)]="debug">Debug mode</switch>`,
    })
    export class SampleComponent {
      debug = signal(false);
    }
    ```
  </Lang>
</CodeSample>

## Accessible name without a label [#accessible-name-without-a-label]

When the label cannot be projected, name the inner `<input role="switch">` with one of the two inputs below.
Do not wrap the switch in a `<label>`: it already renders its own, and nested labels are invalid.

* `aria-label`: a text, for a switch with no visible label.
* `aria-labelledby`: the id of a visible element elsewhere, for a label that must not toggle the switch
  (for example the header of an expandable card). It takes precedence over `aria-label` and over the projected content.

<CodeSample id="switch-accessible-name" title="Naming a switch from a text or from a visible label">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SwitchComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SwitchComponent],
      template: `
        <switch aria-label="Debug mode" [(checked)]="debug" />

        <switch aria-labelledby="notifications-label" [(checked)]="notifications" />
        <span id="notifications-label">Notifications</span>
      `,
    })
    export class SampleComponent {
      debug = signal(false);
      notifications = signal(true);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  &#x22;aria-label&#x22;: { type: &#x22;string | undefined&#x22;, description: &#x22;Accessible name of the inner input.&#x22; },
  &#x22;aria-labelledby&#x22;: { type: &#x22;string | undefined&#x22;, description: &#x22;Id of the element that names the inner input; takes precedence over aria-label.&#x22; },
  checked: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Two-way bindable on/off state.&#x22; },
  size: { type: '&#x22;small&#x22; | &#x22;xsmall&#x22; | &#x22;xs&#x22;', default: '&#x22;small&#x22;', description: '&#x22;xs&#x22; is identical to &#x22;xsmall&#x22;.' },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the control; usable as a bare attribute.&#x22; },
  compact: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Drops the 44×44 touch target: the hitbox shrinks to the track. For a switch inside a row that is already the touch target.&#x22; },
  presentational: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Decorative state indicator inside a parent control: not focusable, hidden from assistive technology, implies compact.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A switch nested in a clickable row also triggers the row's own click handler">
    Unlike `Checkbox`, `Switch` does not stop click propagation on its host — a `<switch>` nested inside another
    clickable row will also fire that row's own click handler. Stop propagation yourself on the row if that is not
    wanted. This includes a click on the projected label, which reaches the row once for the label and once for the
    input it forwards to.
  </Accordion>

  <Accordion title="Importing Switch resolves to a component with a different bound property">
    `@sinequa/ui` also exports a `SwitchComponent` with the identical selector (`switch, Switch&#x60;), but its two-way
    bindable state is named &#x2A;*`toggled`**, not `checked`, and it adds a `variant` input galactik's `Switch` doesn't
    have. The property name difference means example code does not silently port between the two — double-check
    both the import path and the binding name before reusing it.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Checkbox" href="./checkbox.mdx">
    The multi-select sibling, with an indeterminate state and Signal Forms integration.
  </Card>
</Cards>
