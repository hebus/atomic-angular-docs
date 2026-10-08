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
  <Accordion title="A test on input.disabled fails although the field is disabled">
    `disabled` is conveyed by ARIA, not by the native property: the inner `<input>` carries the combobox directive, which takes
    over `[disabled]` and exposes `aria-disabled="true"` and `readonly`, while the host is dimmed and ignores the pointer. The
    DOM `disabled` property stays `false`, and the field stays reachable with `Tab`. Assert on
    `input.getAttribute("aria-disabled")` instead. This follows the combobox pattern, which wants a disabled field to remain
    focusable; a native `disabled` would take it out of the tab order.
  </Accordion>

  <Accordion title="Pressing Enter doesn't submit anything">
    Expected — `SearchInput` has no `search` output and no send button by design: submission is driven by the
    surrounding form (native `submit`, a button, or `(keydown.enter)` on the input), consistent with it being "just
    another field" in a larger form. Reach for `SearchBar` when a self-contained field with its own submit is
    wanted.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Search Bar" href="./search-bar.mdx">
    The self-contained sibling — a pill with its own clear and send controls.
  </Card>
</Cards>
