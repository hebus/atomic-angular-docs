# Input (/docs/galactik/form/input)

A native input wrapped in a styled flex container that drives its focus, disabled and read-only look purely from the input's own state, with optional icon slots and a character counter.



`InputGroup` wraps a native `<input>` in a styled flex container — no JavaScript state duplication, every
visual state (focus, disabled, read-only) is driven by CSS `has-[]` selectors reading the native control's own
state.

## Minimal example [#minimal-example]

<CodeSample id="input-basic" title="A plain text field">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { InputComponent, InputControlDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [InputComponent, InputControlDirective],
      template: `
        <input-group>
          <input input-control type="text" placeholder="Enter your name" />
        </input-group>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Recipes [#recipes]

### Icon, character counter and validation together [#icon-character-counter-and-validation-together]

<CodeSample id="input-advanced" title="An email field combining an icon, a live counter and an error scheme">
  <Lang value="angular">
    ```ts title="advanced-email-field.component.ts"
    import { Component, computed, signal } from "@angular/core";
    import { InputComponent, InputControlDirective, InputCounterComponent } from "@sinequa/galactik";

    @Component({
      selector: "advanced-email-field",
      imports: [InputComponent, InputControlDirective, InputCounterComponent],
      template: `
        <div class="flex flex-col gap-1">
          <input-group [scheme]="scheme()">
            <input
              input-control
              type="email"
              maxlength="60"
              placeholder="you@example.com"
              [value]="email()"
              (input)="email.set($any($event.target).value)" />
            <input-counter [scheme]="scheme()">{{ email().length }} / 60</input-counter>
          </input-group>
          @if (scheme() === 'error') {
            <span class="text-(length:--size-sm) text-(--font-error-base)">Please enter a valid email address.</span>
          }
        </div>
      `,
    })
    export class AdvancedEmailFieldComponent {
      email = signal("");
      scheme = computed<"default" | "error">(() =>
        this.email().length === 0 || this.email().includes("@") ? "default" : "error",
      );
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  size: { type: '&#x22;lg&#x22; | &#x22;md&#x22; | &#x22;sm&#x22;', default: '&#x22;md&#x22;', description: &#x22;Field height and padding.&#x22; },
  scheme: { type: '&#x22;default&#x22; | &#x22;success&#x22; | &#x22;error&#x22;', default: '&#x22;default&#x22;', description: &#x22;Tints border, icons and, if mirrored, the counter.&#x22; },
  filled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Tinted background, no border.&#x22; },
  numbers: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Right-aligns text and applies tabular numerals.&#x22; },
  autoHeight: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;The group grows with its content (wrapping chips, tags before the text) instead of keeping a fixed height; the size's height is its minimum.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Importing Input resolves to a different implementation than expected">
    `@sinequa/ui` also exports an `InputComponent`, but it styles the native `<input>` directly via a `variant`
    input applied to the element itself — a different composition from galactik's wrap-plus-projected-directives
    model. Always check the import path (`@sinequa/ui` vs `@sinequa/galactik`) before assuming which one is in
    scope.
  </Accordion>

  <Accordion title="The counter's size/scheme doesn't match the field's">
    `size`/`scheme` are not linked automatically between `InputGroup` and `InputCounterComponent` — their CVAs are
    independent. Mirror both explicitly on the counter, as in the recipe above.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Textarea" href="./textarea.mdx">
    The multi-line sibling, sharing the same state model and scheme palette.
  </Card>
</Cards>
