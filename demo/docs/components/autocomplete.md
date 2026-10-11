# Autocomplete

An editable combobox that searches a backend as the user types and builds a multi-selection of removable chips. It is the one component behind every "type, pick from a list" field of the library: a label picker, an advanced-filter facet, a people picker. Built on `@angular/aria` (an editable combobox + a listbox popup) plus Angular's `resource()`, the same primitives `SelectMenu` uses — but always multi and always backed by an async `loader`, which `SelectMenu`'s fixed/synchronous options list doesn't cover.

Visually it *is* a `SelectMenu`: both wear the same design-system wrap, so the label, the field (border, height, hover, open and focus states, chevron), the popup surface, the option rows, the empty row and the hint are painted from one source of truth. The only structural differences are that the trigger is an editable `<input>` and that picked values live in chips — inside the field box by default (it grows with them), under it with `chips="below"`, or nowhere with `chips="none"`.

`Autocomplete` never persists a selection itself: `selected` is the currently-applied set (an input, not owned by the component), and `picked` / `removed` let the host perform its own backend call — with error handling — before updating it. This is the contract `MultiSelectLabelsComponent`, the advanced-filters facet pickers and the document workspaces' people picker share. It replaces `SearchSelect`.

## Imports

```ts
import { AutocompleteComponent } from "@sinequa/galactik";
```

## Field

A `loader` receives the (debounced) typed query and returns a `Promise` of matching options — a real one would call a backend endpoint; this demo simulates network latency over a fixed list. `key` / `label` give each option a comparable identity and a display string, exactly like `SelectMenu`.

<demo-autocomplete-field></demo-autocomplete-field>

```html
<Autocomplete
  [selected]="selected()" [loader]="loadCountries" [key]="keyOf" [label]="labelOf"
  fieldLabel="Countries" placeholder="Search a country…" noResultsText="No matching country"
  hint="Type at least one character to search."
  (picked)="selected.set([...selected(), $event])"
  (removed)="selected.set(selected().filter((c) => c.id !== $event.id))" />
```

```ts
readonly selected = signal<Country[]>([]);
readonly loadCountries = (query: string, { signal }: { signal: AbortSignal }) =>
  fetch(`/api/countries?q=${query}`, { signal }).then((r) => r.json());
```

A search fires once the query reaches `minLength` (default `1`) characters, after `debounceMs` (default `300`) of no typing. Suggestions already present in `selected` (and the identities in `excludeKeys`) are excluded automatically.

## While it searches, and when it fails

While a search is in flight the field's chevron gives way to a spinner. The rows of the *previous* search stay on screen — swapping them for a "Searching…" line made the list blink on every keystroke — and `searchingText` only shows when there is nothing to show. "No results" (`noResultsText`) is only claimed by a search that came back. A failed search says so in an alert row (`errorText`). The `loader` gets an `AbortSignal`: a newer query aborts the request of the older one, so a slow answer never lands after a fast one — pass it to `fetch`.

Toggle the backend below and watch the counters.

<demo-autocomplete-states></demo-autocomplete-states>

```ts
readonly load: AutocompleteLoader<Country> = (query, { signal }) =>
  fetch(`/api/countries?q=${query}`, { signal }).then((r) => r.json());
```

## Where the chips go

By default the applied values are chips **inside the field**, before the text being typed: the box grows with them, a click anywhere in it puts the caret in the text, and **Backspace** in an empty field removes the last one (through `removed`, like a click on its ×). With `chips="below"` the field keeps its select-trigger look and the chips sit in a row under it.

<demo-autocomplete-chips-position></demo-autocomplete-chips-position>

```html
<!-- inside the field (default) -->
<Autocomplete [selected]="selected()" [loader]="load" [label]="labelOf" … />

<!-- under the field -->
<Autocomplete chips="below" [selected]="selected()" [loader]="load" [label]="labelOf" … />
```

With `chips="none"` the component draws no chip at all: the host shows the applied values itself, wherever it wants.

<demo-autocomplete-chips-none></demo-autocomplete-chips-none>

```html
<Autocomplete chips="none" [selected]="selected()" [loader]="load" (picked)="…" />
<!-- …and your own chips, anywhere -->
```

## Free-text creation

Set `createFromText` to let the user create a value that isn't in the suggestions: pressing Enter while no suggestion is shown calls it with the typed text and emits the result through `picked`, clearing the field. Leave it unset to only allow picking existing suggestions (Enter then just validates the active one, standard combobox behavior).

<demo-autocomplete-free-text></demo-autocomplete-free-text>

```html
<Autocomplete
  [selected]="tags()" [loader]="loadTags" [createFromText]="identity"
  fieldLabel="Tags" placeholder="Type a tag and press Enter…"
  (picked)="tags.set([...tags(), $event])"
  (removed)="tags.set(tags().filter((t) => t !== $event))" />
```

```ts
readonly identity = (s: string) => s;
```

## Sizes

`size="sm | md | lg"` scales the whole control, the same way `SelectMenu` does: field height 24 / 36 / 44px, field text 12 / 14 / 14px, label 12 / 14 / 16px semibold, and the gap between label and field 2 / 4 / 8px. A label is the heading of its field: it scales with it, is never the smaller of the two, and stays close enough to read as part of it.

<demo-autocomplete-sizes></demo-autocomplete-sizes>

## Custom option / chip content

Project `#autocompleteOption` (context: `AutocompleteOptionContext<TOption>`, same shape as `SelectMenu`'s `#selectOption`) to customize a suggestion row, and/or `#autocompleteTag` (context: `{ $implicit: TSelected, index: number }`) to customize an applied-value chip — e.g. a leading icon, a sub-label, a role toggle, or a non-`Tag` presentation entirely. A custom chip owns its remove button: `removed` then only fires for Backspace.

A suggestion row is a `.select-option`, exactly like `SelectMenu`'s, so its content is built from the same DS slots: `.select-option-body` wrapping a `.select-option-label` and an optional `.select-option-sublabel`, plus `.select-option-leading-icon` / `.select-option-check` if needed.

<demo-autocomplete-option-template></demo-autocomplete-option-template>

```html
<Autocomplete [selected]="selected()" [loader]="loadCountries" [key]="keyOf" [label]="labelOf" …>
  <ng-template #autocompleteOption let-country>
    <span class="select-option-body">
      <span class="select-option-label">{{ country.label }}</span>
      <span class="select-option-sublabel">{{ country.id }}</span>
    </span>
  </ng-template>
</Autocomplete>
```

## A people picker, in a dialog

Everything above together, as the document workspaces' share dialog builds it. The suggestions are people but the applied values are entries with a role, so `selectedKey` / `selectedLabel` tell the component how to read them. `excludeKeys` keeps out the people who already have access, `closeOnPick` closes the list and clears the text after a pick (the chat mention box: type `a`, Enter, done), `[indicator]="false"` hides the chevron, and an element marked `autocompleteSuffix` is projected inside the field, after the text — here the role the next people get. The popup is a popover in the top layer (`popup="top-layer"`, the default), so the dialog's edges don't clip it.

<demo-autocomplete-people></demo-autocomplete-people>

```html
<Autocomplete
  [selected]="entries()" [loader]="loadPeople"
  [key]="personKey" [label]="personName"
  [selectedKey]="entryKey" [selectedLabel]="entryName"
  [excludeKeys]="alreadyHaveAccess" [indicator]="false" [closeOnPick]="true"
  placeholder="Search people…" ariaLabel="Search people"
  (picked)="pick($event)" (removed)="remove($event)">
  <ng-template #autocompleteOption let-person>…avatar, name, email…</ng-template>
  <ng-template #autocompleteTag let-entry let-i="index">…name, role toggle, <tag-remove />…</ng-template>
  <button autocompleteSuffix type="button">as {{ nextRole() }}</button>
</Autocomplete>
```

## Keyboard shortcuts

Handled automatically by `@angular/aria`.

| Key            | Behavior                                                                       |
| -------------- | ------------------------------------------------------------------------------- |
| `↓` / `↑`      | Navigate suggestions.                                                           |
| `Enter`        | Pick the active suggestion — the first one without any arrow — or create a free-text value if none. |
| `Escape`       | Close the popup; only a second one reaches a dialog around the field.           |
| `Backspace`    | In an empty field with the chips inside it: remove the last chip.               |

## API Reference

### AutocompleteComponent&lt;TOption, TSelected = TOption&gt;

| Input             | Type                                   | Default     | Description                                                                 |
| ------------------ | --------------------------------------- | ----------- | ---------------------------------------------------------------------------- |
| `selected`         | `readonly TSelected[]` (required)       | —           | Currently-applied values — display only; the host owns persistence.        |
| `query`            | `string` (model)                        | `""`        | Typed query text — supports `[(query)]`.                                    |
| `loader`           | `(query: string, context: { signal: AbortSignal }) => Promise<TOption[]>` (required) | — | Backend search. Capture any extra context (e.g. a fixed flag) by closure. The signal is aborted when a newer query supersedes this one. |
| `minLength`        | `number`                                | `1`         | Minimum typed length before searching (and the popup can open).             |
| `debounceMs`       | `number`                                | `300`       | Debounce delay applied to the typed query.                                  |
| `key`              | `(option: TOption) => unknown`          | identity    | Comparable identity of a suggestion (exclusion).                            |
| `label`            | `(option: TOption) => string`           | `String(option)` | Text label — suggestion rows and typeahead.                            |
| `selectedKey`      | `(selected: TSelected) => unknown`      | `key`       | Identity of an applied value, when it isn't shaped like a suggestion.       |
| `selectedLabel`    | `(selected: TSelected) => string`       | `label`     | Text of an applied value — chips.                                           |
| `optionDisabled`   | `(option: TOption) => boolean`          | `() => false` | Predicate disabling a suggestion row.                                    |
| `excludeKeys`      | `readonly unknown[]`                    | `[]`        | Identities kept out of the suggestions, besides the applied values.         |
| `createFromText`   | `(text: string) => TOption`             | —           | If set, Enter with no suggestions creates a free-text value.                |
| `closeOnPick`      | `boolean`                               | `false`     | Picking closes the list and clears the text. Off: the list stays open to pick several in a row. |
| `chips`            | `"inline" \| "below" \| "none"`         | `"inline"`  | Applied values inside the field (it grows with them), in a row under it, or not drawn. |
| `popup`            | `"top-layer" \| "inline"`               | `"top-layer"` | The popup as a manual popover in the top layer (above a dialog), or a plain `fixed` panel. |
| `indicator`        | `boolean`                               | `true`      | Shows the chevron. The spinner still shows while a search runs.             |
| `fieldLabel`       | `string`                                | —           | Label above the field.                                                       |
| `placeholder`      | `string`                                | `""`        | Input placeholder.                                                           |
| `ariaLabel`        | `string`                                | placeholder | Accessible name of the field when there is no `fieldLabel`.                  |
| `noResultsText`    | `string`                                | `"No results"` | Shown once a search has answered with nothing.                           |
| `searchingText`    | `string`                                | `"Searching…"` | Shown while a search runs and there are no rows to keep on screen.       |
| `errorText`        | `string`                                | `"Search failed"` | Shown, as an alert, when the search failed.                           |
| `size`             | `"sm" \| "md" \| "lg"`                  | `"md"`      | Field height.                                                                |
| `hint`             | `string`                                | —           | Help text under the field (`.select-hint`), like `SelectMenu`'s.             |
| `class`            | `string`                                | —           | Extra class(es) merged into the host — the DS styling root.                 |
| `contentClass`     | `string`                                | —           | Extra class(es) merged into the popup surface.                               |
| `allowRemove`      | `boolean`                               | `true`      | Shows/hides the remove (×) button on the default chip, and Backspace removal. |
| `removeLabel`      | `string`                                | `"Remove {label}"` | Accessible name of a chip's remove button (`{label}` is replaced). Pass it translated. |

| Output    | Payload     | Description                                                              |
| --------- | ----------- | -------------------------------------------------------------------------- |
| `picked`  | `TOption`   | Emitted once per suggestion picked, or once for a free-text creation.      |
| `removed` | `TSelected` | Emitted when a default chip's remove button is clicked, or Backspace removes the last. |

### Content

| Ref / selector          | Context                                  | Description                                             |
| ------------------------ | ----------------------------------------- | -------------------------------------------------------- |
| `#autocompleteOption`    | `AutocompleteOptionContext<TOption>`      | Suggestion row template (default: `label(option)`).      |
| `#autocompleteTag`       | `AutocompleteTagContext<TSelected>`       | Chip template (default: `Tag` + remove).                 |
| `[autocompleteSuffix]`   | projected content                         | Inside the field box, after the text — a role menu, a button. |

### Methods

| Method     | Description                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `reload()` | Forces the current search to re-run — an escape hatch if a signal captured by `loader`'s closure changes and the fetch needs to reflect it immediately. |
