# Search Input (/docs/galactik/form/search-input)

A search field styled like InputGroup, meant to sit inline among other form fields rather than standing alone as a pill.



`SearchInput` reuses [`InputGroup`](./input.mdx)'s visual system (icon slots, border/focus/disabled states) and
adds only a clear (×) button — no send button, no pill shape. For a self-contained search field with its own
submit control, see [`SearchBar`](./search-bar.mdx) instead.

## Minimal example [#minimal-example]

<CodeSample id="search-input-basic" title="A search field inline with other fields">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SearchInputComponent, InputComponent, InputControlDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SearchInputComponent, InputComponent, InputControlDirective],
      template: `
        <form class="flex flex-col gap-4">
          <input-group>
            <input input-control type="text" placeholder="First name" />
          </input-group>

          <SearchInput [(value)]="query" placeholder="Search documents…" />
        </form>
      `,
    })
    export class SampleComponent {
      query = signal("");
    }
    ```
  </Lang>
</CodeSample>

## With suggestions [#with-suggestions]

Without suggestions, `SearchInput` is a native search field. To show a list of suggestions under it, add the static
`suggestions` attribute and import `SearchInputSuggestionsComponent` instead: its inner `<input>` then carries
`ngCombobox`, so assistive technology announces a combobox only when there is a popup to go with it. The popup is yours:
an `ng-template` bound to the combobox the component exposes through `combobox()`.

<CodeSample id="search-input-suggestions" title="A search field with a suggestions list">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { ComboboxPopup, ComboboxWidget } from "@angular/aria/combobox";
    import { Listbox, Option } from "@angular/aria/listbox";
    import { Component, computed, signal } from "@angular/core";
    import { SearchInputSuggestionsComponent } from "@sinequa/galactik";

    const FRUITS = ["Apple", "Apricot", "Banana", "Cherry"];

    @Component({
      selector: "sample-component",
      imports: [SearchInputSuggestionsComponent, ComboboxPopup, ComboboxWidget, Listbox, Option],
      template: `
        <SearchInput suggestions #si aria-label="Fruit" [(value)]="query" />

        <ng-template ngComboboxPopup [combobox]="si.combobox()">
          <ul
            ngComboboxWidget
            ngListbox
            #lb="ngListbox"
            focusMode="activedescendant"
            selectionMode="explicit"
            [activeDescendant]="lb.activeDescendant()"
            (valueChange)="pick($event)">
            @for (fruit of matches(); track fruit) {
              <li ngOption [value]="fruit">{{ fruit }}</li>
            }
          </ul>
        </ng-template>
      `,
    })
    export class SampleComponent {
      query = signal("");
      matches = computed(() => FRUITS.filter(fruit => fruit.toLowerCase().includes(this.query().toLowerCase())));

      pick(values: readonly string[]) {
        const picked = values.at(-1);
        if (picked) this.query.set(picked);
      }
    }
    ```
  </Lang>
</CodeSample>

The `suggestions` attribute is a choice made once, when the field is created: it cannot be bound or toggled afterwards.
`SearchBar` works the same way (`SearchBarSuggestionsComponent`).

## On a landscape tablet [#on-a-landscape-tablet]

In landscape the on-screen keyboard of an iPad covers half of the screen, and the popup of its suggestions is left with a sliver to
show itself in. While the page is driven with a finger and the screen is landscape, the field gets a keyboard button: it puts
the keyboard away while the field keeps the focus and its popup stays open, and brings it back at the next tap. The field
opens its keyboard as usual each time it takes the focus, and a hardware keyboard types in it all the same. Nothing changes
with a mouse or on a phone held upright (and the plain field, which has no popup, never shows the button).

The button's accessible names are `hideKeyboardLabel` (default "Hide keyboard") and `keyboardLabel` ("Show keyboard"): pass
them translated. The behaviour comes from `VirtualKeyboardDirective` (`input[virtualKeyboard]`: `applicable()`, `hidden()`,
`toggle()`), which you can put on an input of your own that opens a popup.

## Options [#options]

<TypeTable
  type="{
  value: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;The search text (two-way binding). Also the FormValueControl<string> contract member.&#x22; },
  placeholder: { type: &#x22;string&#x22;, default: '&#x22;Search...&#x22;', description: &#x22;Placeholder text of the inner input.&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the field and dims the host.&#x22; },
  clearLabel: { type: &#x22;string&#x22;, default: '&#x22;Clear search&#x22;', description: &#x22;Accessible name of the clear button. Nothing in the library translates: pass it translated.&#x22; },
  hotkey: { type: &#x22;string&#x22;, description: &#x22;Value written to aria-keyshortcuts — informational only, no global key listener is wired.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A test on input.disabled fails on a field with suggestions">
    Only with the `suggestions` attribute: the inner `<input>` then carries the combobox directive, which takes over
    `[disabled]` and exposes `aria-disabled="true"` and `readonly`, while the host is dimmed and ignores the pointer. The DOM
    `disabled` property stays `false`, and the field stays reachable with `Tab`. Assert on `input.getAttribute("aria-disabled")`
    instead. This follows the combobox pattern, which wants a disabled field to remain focusable. Without `suggestions` the
    field is a native input and `disabled` is the DOM property.
  </Accordion>

  <Accordion title="Pressing Enter doesn't submit anything">
    Expected — `SearchInput` has no `search` output and no send button by design: submission is driven by the
    surrounding form (native `submit`, a button, or `(keydown.enter)` on the input), consistent with it being "just
    another field" in a larger form. A `(search)` written on `<SearchInput>` would only listen to the browser's native
    `search` event (an `Event`, not text): do not use it. Reach for `SearchBar` when a self-contained field with its own submit is
    wanted.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Search Bar" href="./search-bar.mdx">
    The self-contained sibling — a pill with its own clear and send controls.
  </Card>
</Cards>
