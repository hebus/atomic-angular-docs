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

The clear (×) button appears automatically once `value` is non-empty and calls `value.set("")` internally.
`SearchBar` never navigates or calls a backend itself — `search` only reports the submitted text, leaving
persistence/navigation entirely to the host.

`search` is emitted with the current `value()`, always a `string`, in these cases:

* a click on the send button, or <kbd>Enter</kbd> pressed while it has the focus;
* <kbd>Enter</kbd> pressed in the field (plain bar only). It is not emitted while an IME composition is running
  (that <kbd>Enter</kbd> validates a candidate) nor while the bar is disabled, and it is emitted for an empty
  field too: whether an empty query means anything is up to the host. The keydown is not stopped, so a
  `(keydown.enter)` on the host still hears it.

The bar with `suggestions` is a combobox: <kbd>Enter</kbd> in its field commits the active option and does not
emit `search`, so listen to the send button's output, or to the value you bind, for the free-text query.

The native DOM `search` event that Chromium fires on <kbd>Enter</kbd> in an `<input type="search">` is stopped
inside the component, so `(search)` on `<SearchBar>` only ever receives that `string`.

<Callout title="Before the fix" type="warn">
  Up to `@sinequa/galactik` 2.3.0, <kbd>Enter</kbd> in the field did not emit the output, and `(search)` on the host
  received the browser's native `search` `Event` instead of text (a `[object Event]` in the field or in a URL).
  On those versions, listen to `(keydown.enter)` on the host (reading your bound value) and ignore anything that
  is not a string in `(search)`.
</Callout>

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

## With suggestions [#with-suggestions]

Without suggestions, `SearchBar` is a native search field. To show suggestions under it, add the static `suggestions`
attribute and import `SearchBarSuggestionsComponent` instead: the inner `<input>` then carries `ngCombobox` and is announced
as a combobox, which it is once a popup is attached. The popup is an `ng-template` bound to the combobox exposed by
`combobox()`, exactly as for [`SearchInput`](./search-input.mdx#with-suggestions); the send button still submits the free-text
query. The attribute is a choice made once, when the bar is created.

## On a landscape tablet [#on-a-landscape-tablet]

In landscape the on-screen keyboard of an iPad covers half of the screen, and the popup of its suggestions is left with a sliver to
show itself in. While the page is driven with a finger and the screen is landscape, the field gets a keyboard button: it puts
the keyboard away while the field keeps the focus and its popup stays open, and brings it back at the next tap. The field
opens its keyboard as usual each time it takes the focus, and a hardware keyboard types in it all the same. Nothing changes
with a mouse or on a phone held upright (and the plain bar, which has no popup, never shows the button).

The button's accessible names are `hideKeyboardLabel` (default "Hide keyboard") and `keyboardLabel` ("Show keyboard"): pass
them translated. The behaviour comes from `VirtualKeyboardDirective` (`input[virtualKeyboard]`: `applicable()`, `hidden()`,
`toggle()`), which you can put on an input of your own that opens a popup.

## Options [#options]

<TypeTable
  type="{
  value: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;The search text (two-way binding). Also the FormValueControl<string> contract member.&#x22; },
  placeholder: { type: &#x22;string&#x22;, default: '&#x22;Search...&#x22;', description: &#x22;Placeholder text of the inner input.&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the field and both action buttons.&#x22; },
  search: { type: &#x22;OutputEmitterRef<string>&#x22;, description: &#x22;The submitted text: send button click or Enter, Enter in the field (plain bar), never an Event.&#x22; },
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
