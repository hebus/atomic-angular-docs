# Search Bar (/docs/galactik/form/search-bar)

A self-contained, pill-shaped search field with a leading icon and built-in clear/send controls, meant to stand on its own rather than inside a form.



A self-contained search field — think an application's global search — with a leading magnifier icon and
built-in clear (×) and send controls, distinct from [`SearchInput`](./search-input.mdx) which blends into a
form alongside other fields.

## Minimal example [#minimal-example]

<CodeSample id="search-bar-basic" title="A search field with a submit output">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { SearchBarComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [SearchBarComponent],
      template: `<SearchBar [(value)]="query" placeholder="Search…" (search)="onSearch($event)" />`,
    })
    export class SampleComponent {
      query = signal("");

      onSearch(query: string) {
        console.log("Submitted:", query);
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

The clear (×) button appears automatically once `value` is non-empty and calls `value.set("")` internally; the
send button emits the current `value()` on click or <kbd>Enter</kbd>. `SearchBar` never navigates or calls a
backend itself — `search` only reports the submitted text, leaving persistence/navigation entirely to the host.

Content projected into the pill lands in one of two places: the **default** slot, between the clear and send
buttons (query-scoped actions like a favourite toggle), or `slot="trailing"`, after the send button (an
end-of-pill call to action).

## Recipes [#recipes]

### Projecting app actions on both sides of the send button [#projecting-app-actions-on-both-sides-of-the-send-button]

<CodeSample id="search-bar-slots" title="A favourite toggle before send, an AI action after it">
  <Lang value="angular">
    ```html title="search-actions.html"
    <SearchBar [(value)]="query" (search)="onSearch($event)">
      <!-- query-scoped action: sits right before the send button -->
      <button variant="tertiary" scheme="neutral" [iconOnly]="true" size="sm" type="button" (click)="toggleFavorite()">
        ★
      </button>

      <!-- end-of-pill call to action: stays after the send button -->
      <button variant="accent" size="sm" slot="trailing" type="button" (click)="askAI()">Ask AI</button>
    </SearchBar>
    ```
  </Lang>
</CodeSample>

Conditional trailing content needs the `slot="trailing"` marker on an `<ng-container>` wrapping the block —
Angular only hoists a block's marker onto the block itself when it has a single root node, and a sibling
element or a `@let` breaks that (see [Pitfalls](#pitfalls)).

## Options [#options]

<TypeTable
  type="{
  value: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;The search text (two-way binding). Also the FormValueControl<string> contract member.&#x22; },
  placeholder: { type: &#x22;string&#x22;, default: '&#x22;Search...&#x22;', description: &#x22;Placeholder text of the inner input.&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the field and both action buttons.&#x22; },
  clearLabel: { type: &#x22;string&#x22;, default: '&#x22;Clear search&#x22;', description: &#x22;Accessible name of the clear button. Nothing in the library translates: pass it translated.&#x22; },
  sendLabel: { type: &#x22;string&#x22;, default: '&#x22;Send&#x22;', description: &#x22;Accessible name of the send button. Nothing in the library translates: pass it translated.&#x22; },
  hotkey: { type: &#x22;string&#x22;, description: &#x22;Value written to aria-keyshortcuts — informational only, no global key listener is wired.&#x22; },
  size: { type: '&#x22;small&#x22; | &#x22;medium&#x22; | &#x22;large&#x22;', default: '&#x22;large&#x22;', description: &#x22;Field height and icon size.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Conditional trailing content silently falls back to the default slot">
    Angular hoists a `slot="trailing"` marker onto a block only when that block has a single root node. Putting the
    marker on an element that is itself inside an `@if`/`@for`, or beside a `@let`, breaks the hoist (the compiler
    reports `NG8011`) and the content lands in the default slot instead. Put the marker on an `<ng-container>`
    wrapping the whole block:

    ```html title="fix" partial
    <ng-container slot="trailing">
      @if (allowAI()) {
        <button variant="accent" size="sm" type="button">Ask AI</button>
      }
    </ng-container>
    ```
  </Accordion>

  <Accordion title="Projecting a disabled action greys out and disables the whole search bar">
    `searchBarVariants` styles the disabled state with `has-disabled:` (`:has(:disabled)`), which matches **any**
    disabled descendant — including your own projected content — and greys out the entire pill. Use `aria-disabled`
    plus `pointer-events-none opacity-50` and guard the handler yourself instead of the native `disabled` attribute
    on projected content.
  </Accordion>

  <Accordion title="A projected bare icon collapses to zero width">
    Galactik icons render with `display: contents`, so the `<svg>` itself is the flex item — inside the pill's tight
    layout it collapses without an explicit size. Add `shrink-0` to a bare projected icon; icons already wrapped in
    a `<Button>` are unaffected.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Search Input" href="./search-input.mdx">
    The inline-form sibling, styled like InputGroup, no send button.
  </Card>
</Cards>
