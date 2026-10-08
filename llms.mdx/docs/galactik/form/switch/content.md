# Switch (/docs/galactik/form/switch)

A native checkbox styled as an on/off track-and-thumb toggle, with the same Signal Forms shape as Checkbox.



`Switch` wraps a native `<input type="checkbox" role="switch">` inside an accessible `<label>`, styled as an
on/off track-and-thumb toggle with a built-in check/cross icon in the thumb.

## Minimal example [#minimal-example]

<CodeSample id="switch-basic" title="A two-way bound on/off toggle">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SwitchComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SwitchComponent],
      template: `
        <switch [(checked)]="enabled" />
        <span>{{ enabled() ? 'On' : 'Off' }}</span>
      `,
    })
    export class SampleComponent {
      enabled = signal(false);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  checked: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Two-way bindable on/off state.&#x22; },
  size: { type: '&#x22;small&#x22; | &#x22;xsmall&#x22;', default: '&#x22;small&#x22;', description: '&#x22;xs&#x22; is also accepted, identical to &#x22;xsmall&#x22;.' },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the control; usable as a bare attribute.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A switch nested in a clickable row also triggers the row's own click handler">
    Unlike `Checkbox`, `Switch` does not stop click propagation on its host — a `<switch>` nested inside another
    clickable row will also fire that row's own click handler. Stop propagation yourself on the row if that is not
    wanted.
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
