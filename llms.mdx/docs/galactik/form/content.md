# Form (/docs/galactik/form)

Form controls — Checkbox, Radio, Switch, Input, Textarea, Search fields, Select and Autocomplete — and how they compose with Angular Signal Forms.



Every control in this section wraps a real native element (`<input>`, `<textarea>`, or the accessible
`@angular/aria` combobox/listbox primitives for `Select`) and drives its visual state from CSS reading that
native element — never from a JavaScript class toggle. Most also implement one of Angular Signal Forms'
control contracts (`FormValueControl` or `FormCheckboxControl`), so `[formField]` works alongside plain
two-way binding.

<Callout title="Naming collisions with @sinequa/ui">
  Several of these components share a selector and a bound-property name with an equivalent still exported by
  `@sinequa/ui` (the library galactik replaces) — but with a different implementation underneath. Each page's
  Pitfalls section calls out the specific difference; always check the import path when in doubt.
</Callout>

## What's next [#whats-next]

<Cards>
  <Card title="Checkbox" href="./checkbox.mdx">
    Independent on/off selection, with an indeterminate visual state.
  </Card>

  <Card title="Radio" href="./radio.mdx">
    Exclusive selection within a native-name group.
  </Card>

  <Card title="Switch" href="./switch.mdx">
    An on/off track-and-thumb toggle.
  </Card>

  <Card title="Input" href="./input.mdx">
    A single-line text field with icon slots and a character counter.
  </Card>

  <Card title="Textarea" href="./textarea.mdx">
    The multi-line sibling, with content-driven auto-sizing.
  </Card>

  <Card title="Search Input" href="./search-input.mdx">
    A search field styled to blend into a form.
  </Card>

  <Card title="Search Bar" href="./search-bar.mdx">
    A self-contained pill search field with clear and send controls.
  </Card>

  <Card title="Select" href="./select.mdx">
    A single- or multiple-choice dropdown over a fixed, synchronous options list.
  </Card>

  <Card title="Autocomplete" href="./autocomplete.mdx">
    The async, backend-searched sibling of Select: multi-selection as chips — labels, facets, people.
  </Card>

  <Card title="Tag Input" href="./tag-input.mdx">
    A free-text field that turns what is typed into removable tags.
  </Card>
</Cards>
