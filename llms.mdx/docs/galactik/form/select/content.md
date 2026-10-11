# Select (/docs/galactik/form/select)

A single- or multiple-choice dropdown built on the accessible @angular/aria combobox/listbox primitives, with a fully custom trigger and option rendering when the default chrome doesn't fit.



A dropdown that behaves like a native `<select>` — keyboard navigable, `aria-selected`, popup positioned near
the field — but accepts option and trigger content of any shape. `SelectMenu` (`SelectComponent`) covers both
single and multiple selection from one component.

<Callout title="Concept — FormValueControl">
  Angular Signal Forms recognizes a component as a form control when it exposes a `value` model matching the
  `FormValueControl<TValue>` contract. `SelectMenu` implements it through its own `value` model, so `[formField]`
  works exactly like it would on a native input — no adapter needed.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="select-basic" title="A single-choice dropdown over a plain string list">
  <Lang value="angular">
    ```ts title="fruit-select.component.ts"
    import { Component, signal } from "@angular/core";
    import { SelectComponent } from "@sinequa/galactik";

    @Component({
      selector: "fruit-select",
      imports: [SelectComponent],
      template: `
        <SelectMenu
          [options]="fruits"
          [(value)]="fruit"
          fieldLabel="Fruit"
          placeholder="Choose a fruit…"
          hint="Pick your favorite." />
      `,
    })
    export class FruitSelectComponent {
      fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
      fruit = signal<string | null>(null);
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    User -- click / Enter / Space --> Trigger[&#x22;Trigger (ngCombobox / SelectTriggerDirective)&#x22;]
    Trigger -- expand --> Popup[[&#x22;ngComboboxPopup + ngListbox (role=listbox)&#x22;]]
    Popup -- arrow keys / typeahead --> Popup
    User -- click / Enter on an option --> Popup
    Popup -- onSelectionChange --> SelectComponent
    SelectComponent -- &#x22;value.set(...) / [(value)]&#x22; --> Host[[&#x22;Host component state&#x22;]]
    SelectComponent -- touch.emit --> FormField[[&#x22;form.field (marked touched)&#x22;]]
    SelectComponent -- &#x22;autoUpdate / computePosition&#x22; --> Floating[(&#x22;@floating-ui/dom&#x22;)]"
/>

The trigger and popup are the accessible `@angular/aria` combobox/listbox primitives — every role and ARIA
state (`role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` on the trigger; `role="listbox"`,
`aria-activedescendant`, `aria-selected` on the popup) comes from there, nothing to wire by hand. The popup is
positioned with `@floating-ui/dom` (`offset(4)`, `flip()`, `shift({ padding: 8 })`), its width bound to the
trigger's, and reopening it scrolls the current selection into view automatically.

The row under the mouse becomes the active row (`pointermove` on the `ngListbox`, via `activateOnHover`), so only one
row is highlighted at a time and the arrow keys carry on from it; a still pointer under a scrolling list changes nothing.

**Single vs. multiple** only changes the shape of `value` and whether the popup closes on pick: single mode
(default) is `TOption | null` and closes the popup once a choice is made; `multiple` makes `value` an array,
keeps the popup open across picks, and shows a check mark via the option template's `selected` context.

## Recipes [#recipes]

### Multiple selection [#multiple-selection]

<CodeSample id="select-multiple" title="Toggling several options without closing the popup">
  <Lang value="angular">
    ```ts title="fruits-multi-select.component.ts"
    import { Component, signal } from "@angular/core";
    import { SelectComponent } from "@sinequa/galactik";

    @Component({
      selector: "fruits-multi-select",
      imports: [SelectComponent],
      template: `
        <SelectMenu
          multiple
          [options]="fruits"
          [(value)]="selected"
          fieldLabel="Fruits"
          placeholder="Select fruits…"
          hint="Pick one or more — the popup stays open.">
          <ng-template #selectOption let-fruit let-selected="selected">
            <span class="select-option-body">
              <span class="select-option-label">{{ fruit }}</span>
            </span>
            @if (selected) { <span class="select-option-check">✓</span> }
          </ng-template>
        </SelectMenu>
      `,
    })
    export class FruitsMultiSelectComponent {
      fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
      selected = signal<string[]>([]);
    }
    ```
  </Lang>
</CodeSample>

### Object options — custom key, label and row [#object-options--custom-key-label-and-row]

`key`/`label` default to identity/`String(option)`, correct only for primitive options. Any object-shaped
option needs explicit functions — otherwise the trigger prints `[object Object]` and selection comparisons
break (see [Pitfalls](#pitfalls)).

<CodeSample id="select-object-options" title="A country picker with a sub-label per row">
  <Lang value="angular">
    ```ts title="country-select.component.ts"
    import { Component, signal } from "@angular/core";
    import { SelectComponent } from "@sinequa/galactik";

    interface Country {
      id: string;
      label: string;
      capital: string;
    }

    const COUNTRIES: Country[] = [
      { id: "fr", label: "France", capital: "Paris" },
      { id: "de", label: "Germany", capital: "Berlin" },
      { id: "es", label: "Spain", capital: "Madrid" },
    ];

    @Component({
      selector: "country-select",
      imports: [SelectComponent],
      template: `
        <SelectMenu
          [options]="countries"
          [(value)]="selected"
          [key]="keyOf"
          [label]="labelOf"
          fieldLabel="Country"
          placeholder="Select a country…">
          <ng-template #selectOption let-country let-selected="selected">
            <span class="select-option-body">
              <span class="select-option-label">{{ country.label }}</span>
              <span class="select-option-sublabel">{{ country.capital }}</span>
            </span>
            @if (selected) { <span class="select-option-check">✓</span> }
          </ng-template>
        </SelectMenu>
      `,
    })
    export class CountrySelectComponent {
      countries = COUNTRIES;
      selected = signal<Country | null>(null);

      protected readonly keyOf = (c: Country) => c.id;
      protected readonly labelOf = (c: Country) => c.label;
    }
    ```
  </Lang>
</CodeSample>

### A fully custom trigger [#a-fully-custom-trigger]

Project a `[selectTrigger]` element to replace the default trigger entirely — useful for a compact, chrome-less
trigger such as a sort selector. `placeholder` and `#selectValue` no longer apply once a custom trigger is
projected; render the current value yourself.

<CodeSample id="select-custom-trigger" title="A chevron-only sort trigger">
  <Lang value="angular">
    ```ts title="sort-select.component.ts"
    import { Component, signal } from "@angular/core";
    import { SelectComponent, SelectTriggerDirective } from "@sinequa/galactik";

    interface SortOption {
      id: string;
      label: string;
    }

    const SORT_OPTIONS: SortOption[] = [
      { id: "relevance", label: "Relevance" },
      { id: "date-desc", label: "Newest first" },
      { id: "date-asc", label: "Oldest first" },
    ];

    @Component({
      selector: "sort-select",
      imports: [SelectComponent, SelectTriggerDirective],
      template: `
        <SelectMenu [options]="sortOptions" [(value)]="sort" [key]="keyOf" [label]="labelOf">
          <button selectTrigger type="button" class="select-trigger">
            Sort: {{ labelOf(sort()) }}
          </button>
          <ng-template #selectOption let-o let-selected="selected">
            <span class="select-option-label">{{ o.label }}</span>
            @if (selected) { <span class="select-option-check">✓</span> }
          </ng-template>
        </SelectMenu>
      `,
    })
    export class SortSelectComponent {
      sortOptions = SORT_OPTIONS;
      sort = signal<SortOption>(SORT_OPTIONS[0]);

      protected readonly keyOf = (o: SortOption) => o.id;
      protected readonly labelOf = (o: SortOption) => o.label;
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  options: { type: &#x22;readonly TOption[]&#x22;, default: &#x22;[]&#x22;, description: &#x22;Available options.&#x22; },
  value: {
    type: &#x22;TValue&#x22;,
    default: &#x22;null&#x22;,
    description:
      &#x22;Selected value — two-way ([(value)]). Single (default): TOption | null. Multiple: value becomes TOption[]. Empty state is always null, never undefined.&#x22;,
  },
  multiple: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Enables multi-selection; value becomes an array and the popup stays open across picks.&#x22; },
  selectionMode: {
    type: '&#x22;explicit&#x22; | &#x22;follow&#x22;',
    default: '&#x22;explicit&#x22;',
    description: &#x22;explicit: arrow keys only highlight, Enter/click commits. follow: selection follows keyboard navigation.&#x22;,
  },
  size: { type: '&#x22;lg&#x22; | &#x22;md&#x22; | &#x22;sm&#x22;', default: '&#x22;md&#x22;', description: &#x22;Trigger height 44 / 36 / 24px, one ladder for text, label and gaps.&#x22; },
  placement: { type: &#x22;Placement (@floating-ui/dom)&#x22;, default: '&#x22;bottom-start&#x22;', description: &#x22;Popup placement relative to the trigger.&#x22; },
  key: { type: &#x22;(option: TOption) => unknown&#x22;, default: &#x22;(option) => option&#x22;, description: &#x22;Comparable identity of an option. Required for object options.&#x22; },
  label: { type: &#x22;(option: TOption) => string&#x22;, default: &#x22;(option) => String(option)&#x22;, description: &#x22;Text label for typeahead and the default templates.&#x22; },
  fieldLabel: { type: &#x22;string&#x22;, description: &#x22;Visible label above the trigger. It also names the default trigger and the popup's list: the trigger reads “<fieldLabel>, <value>”.&#x22; },
  &#x22;aria-label&#x22;: {
    type: &#x22;string&#x22;,
    description:
      &#x22;Accessible name when there is no visible fieldLabel (a compact sort selector, say). Bound as aria-label=\&#x22;…\&#x22; or [aria-label]=\&#x22;expr\&#x22; — translate it. Ignored with a custom [selectTrigger], whose name is yours.&#x22;,
  },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the default trigger. Ignored with a custom [selectTrigger].&#x22; },
  noOptionsText: { type: &#x22;string&#x22;, default: '&#x22;No options&#x22;', description: &#x22;Text shown in place of the list when options is empty.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A select with no label is announced as its value alone">
    With neither `fieldLabel` nor `aria-label`, the default trigger has no accessible name beyond its own text — a
    screen reader says “Apple”, with no hint of what is being chosen. Give every select one of the two. The default
    trigger is then named `aria-labelledby` the label first and itself second (“Fruit, Apple”), so the current value
    stays part of the announcement; a native `<label for>` would not do that, since it replaces a button's content in
    the name. The popup's list carries the same name.

    A rich label that `fieldLabel` cannot express goes in a projected `.select-label` element, with
    `SelectLabelDirective` in the `imports` of the declaring component: the directive gives the element an id and the
    select names the trigger and the list from it (the projected label wins over `fieldLabel`). Without the directive
    the element is painted but is not part of the accessible name.

    One limit: a projected `[selectTrigger]` gets no automatic name — put an `aria-label` or `aria-labelledby` on it.
  </Accordion>

  <Accordion title="A signal-forms field reports NG01902 (orphan field) after clearing a select">
    The empty state of `value` must be `null`, never `undefined` — setting it to `undefined` removes the property
    from the field entirely, which Signal Forms reports as an orphan field (`NG01902`) rather than a valid empty
    value. Type the field as `string | null` (or your option type `| null`), initial `null`, and never write
    `undefined` to it yourself.
  </Accordion>

  <Accordion title="The trigger prints [object Object], or the wrong option shows as selected">
    `key`/`label` default to identity/`String(option)`, which only makes sense for primitive options (strings,
    numbers). Any object-shaped option needs explicit `[key]` and `[label]` functions — see [Object
    options](#object-options--custom-key-label-and-row) above.
  </Accordion>

  <Accordion title="Changing the size or projecting a custom option doesn't move the chevron/placeholder">
    `placeholder`, `size` and the built-in chevron only apply to the **default** trigger. Once you project a
    `[selectTrigger]`, you own the whole trigger element — size it, disable it and render its value yourself; none
    of the default-trigger inputs apply anymore.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Autocomplete" href="./autocomplete.mdx">
    The async, backend-searched sibling of Select — same look, always multi-selection, always tag-based.
  </Card>

  <Card title="Getting started" href="../start.mdx">
    Install galactik and set up its design tokens.
  </Card>
</Cards>
