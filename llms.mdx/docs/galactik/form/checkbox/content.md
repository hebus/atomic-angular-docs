# Checkbox (/docs/galactik/form/checkbox)

A native checkbox wrapped in an accessible label, with an indeterminate visual state and Signal Forms integration.



`Checkbox` wraps a native `<input type="checkbox">` inside an accessible `<label>`, with built-in support for a
secondary hint line and an indeterminate ("mixed") visual state.

## Minimal example [#minimal-example]

<CodeSample id="checkbox-basic" title="Two-way bound checked state">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { CheckboxComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [CheckboxComponent],
      template: `<checkbox [(checked)]="acceptTerms">Accept terms and conditions</checkbox>`,
    })
    export class SampleComponent {
      acceptTerms = signal(false);
    }
    ```
  </Lang>
</CodeSample>

## Recipes [#recipes]

### Indeterminate state, driven from a "select all" parent [#indeterminate-state-driven-from-a-select-all-parent]

`indeterminate` is purely visual/AT-facing — it never changes `checked`, and clicking still toggles `checked`
from whatever value it currently holds.

<CodeSample id="checkbox-select-all" title="A parent checkbox summarizing a list's selection">
  <Lang value="angular">
    ```ts title="select-all.component.ts"
    import { Component, computed, signal } from "@angular/core";
    import { CheckboxComponent } from "@sinequa/galactik";

    interface Item {
      id: string;
      label: string;
      selected: boolean;
    }

    @Component({
      selector: "select-all-list",
      imports: [CheckboxComponent],
      template: `
        <checkbox
          [checked]="allSelected()"
          [indeterminate]="someSelected() && !allSelected()"
          (checkedChange)="toggleAll($event)">
          Select all
        </checkbox>
        <div class="flex flex-col gap-2 pl-4">
          @for (item of items(); track item.id) {
            <checkbox [checked]="item.selected" (checkedChange)="toggle(item.id, $event)">
              {{ item.label }}
            </checkbox>
          }
        </div>
      `,
    })
    export class SelectAllListComponent {
      items = signal<Item[]>([
        { id: "1", label: "Document A", selected: false },
        { id: "2", label: "Document B", selected: true },
        { id: "3", label: "Document C", selected: false },
      ]);

      allSelected = computed(() => this.items().every((i) => i.selected));
      someSelected = computed(() => this.items().some((i) => i.selected));

      toggle(id: string, selected: boolean) {
        this.items.update((items) => items.map((i) => (i.id === id ? { ...i, selected } : i)));
      }

      toggleAll(selected: boolean) {
        this.items.update((items) => items.map((i) => ({ ...i, selected })));
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  checked: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Two-way bindable checked state ([(checked)], or [checked] + (checkedChange)).&#x22; },
  indeterminate: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Renders the mixed state (dash icon) and sets aria-checked=\&#x22;mixed\&#x22;. DOM-only, does not affect checked.&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the control; usable as a bare attribute.&#x22; },
  hint: { type: &#x22;string | undefined&#x22;, description: &#x22;Optional secondary text rendered under the label.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A checkbox nested in a clickable row triggers the row's own click handler too — or doesn't">
    `Checkbox` stops click propagation on its host, so nesting it inside a clickable row (a list item, say) never
    also fires the row's handler. `Radio` and `Switch` do **not** do this — the same nesting on those two
    components will trigger the row's click handler as well.
  </Accordion>

  <Accordion title="Importing Checkbox resolves to a different component than expected">
    `@sinequa/ui` also exports a `CheckboxComponent` with the identical selector (`checkbox, Checkbox`) and a
    `checked` model of the same name, but it renders a `role="checkbox"` `<div>`-like host with a manual click
    handler and no real native `<input>` underneath, plus a `size` input galactik's `Checkbox` doesn't have.
    Double-check the import path (`@sinequa/ui` vs. `@sinequa/galactik`) before assuming which accessibility model
    applies.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Radio" href="./radio.mdx">
    The mutually-exclusive sibling — grouped by native name attribute rather than a container component.
  </Card>

  <Card title="Switch" href="./switch.mdx">
    An on/off toggle with the same Signal Forms shape as Checkbox.
  </Card>
</Cards>
