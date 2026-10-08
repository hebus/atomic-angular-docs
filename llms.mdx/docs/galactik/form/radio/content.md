# Radio (/docs/galactik/form/radio)

A native radio input wrapped in an accessible label, grouped by a shared name and a derived selection signal rather than a container component.



`Radio` wraps a native `<input type="radio">` inside an accessible `<label>`, meant to be used in groups of two
or more sharing the same `name` for a single exclusive choice. There is no `RadioGroup` container — exclusivity
comes from giving every radio the same `name` and deriving each one's `checked` from one shared signal.

## Minimal example [#minimal-example]

<CodeSample id="radio-basic" title="Two mutually exclusive options">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { RadioComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [RadioComponent],
      template: `
        <radio name="delivery" [checked]="delivery() === 'standard'" (checkedChange)="delivery.set('standard')">
          Standard delivery
        </radio>
        <radio name="delivery" [checked]="delivery() === 'express'" (checkedChange)="delivery.set('express')">
          Express delivery
        </radio>
      `,
    })
    export class SampleComponent {
      delivery = signal<"standard" | "express">("standard");
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

Each `<radio>` owns an independent `checked` model — grouping relies on two things working together: the
native `name` attribute (native focus/keyboard roving, and the browser visually unchecking siblings), and
deriving every radio's `[checked]` from one shared signal so the app's own state stays authoritative. As long
as `[checked]` is a derived expression (`selected() === 'x'`) rather than an independent local boolean per
radio, a sibling recomputes to `false` automatically when another one is picked — the native `(change)` only
fires on the newly-selected radio, never on the one that gets unchecked, and this is what makes that safe.

## Options [#options]

<TypeTable
  type="{
  checked: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Two-way bindable checked state of this individual radio.&#x22; },
  name: { type: &#x22;string | undefined&#x22;, description: &#x22;Native name attribute — give every radio in a group the same value for native exclusivity.&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables this radio; usable as a bare attribute.&#x22; },
  hint: { type: &#x22;string | undefined&#x22;, description: &#x22;Optional secondary text rendered under the label.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Signal Forms only models one boolean, not the whole group's exclusivity">
    A single `Radio` exposes exactly `checked = model<boolean>(...)`, the structural shape `FormCheckboxControl`
    requires — so `[formField]` binds one radio to one boolean sub-field, but `FormCheckboxControl` doesn't give a
    whole group mutual exclusivity by itself. For an exclusive choice backed by Signal Forms, keep the shared-signal
    pattern from the minimal example (or wrap the group behind a custom `FormValueControl<string>`).
  </Accordion>

  <Accordion title="Importing Radio resolves to a different component than expected">
    `@sinequa/ui` also exports a `RadioComponent` with the identical selector (`radio, Radio`) and a `checked` model
    of the same name, but it renders `role="radio"` directly on the host — no real native `<input>`, no `name`
    attribute, no native keyboard roving — and adds a `size` input galactik's `Radio` doesn't have. Double-check the
    import path before assuming which accessibility model applies.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Checkbox" href="./checkbox.mdx">
    The independent-selection sibling, with an indeterminate visual state.
  </Card>
</Cards>
