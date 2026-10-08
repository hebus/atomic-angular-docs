# Search Input

A search input component for user input. Implements the signal forms `FormValueControl` contract: bind it with a plain two-way binding (`[(value)]`) or as a form field (`[formField]`). Supports custom action buttons via content projection.

## Demo

Three size variants of the search input.

<demo-search-input></demo-search-input>

```typescript
@Component({
  selector: 'example',
  imports: [SearchInputComponent],
  template: `<SearchInput [(value)]="searchValue" />`,
})
export class Example {
  searchValue = signal("");
}
```

```html
<!-- Default size -->
<SearchInput [(value)]="searchValue" />

<!-- With action button -->
<SearchInput [(value)]="searchValue">
  <button size="sm">Search</button>
</SearchInput>

<!-- Custom height (36px) -->
<SearchInput class="h-9" [(value)]="searchValue" />

<!-- As a signal forms field -->
<SearchInput [formField]="searchForm.query" />
```

## With suggestions

Attach a suggestions popup with the `@angular/aria/combobox` directives: the popup is an `ng-template` bound to the `Combobox` instance exposed by `SearchInput`. It only renders while expanded, and keyboard navigation (`ArrowDown`, `Enter`, `aria-activedescendant`) is handled for you. The popup is positioned against the nearest positioned ancestor: wrap `SearchInput` and its `ng-template` — and nothing else — in a `relative flex flex-col` container, so that it opens right under the field and has its width. Anything placed in the same container (a caption, a value) would push the popup below it. To give it the look of the `Select` popup, take its class from `selectMenuVariants()` on the `<ul>` and `selectOptionVariants()` on each `<li ngOption>`, both exported by `@sinequa/galactik`.

<demo-search-input-suggestions></demo-search-input-suggestions>

```html
<SearchInput #si [(value)]="searchValue" placeholder="Search a fruit..." />

<ng-template ngComboboxPopup [combobox]="si.combobox()">
  <ul
    ngComboboxWidget
    ngListbox
    #lb="ngListbox"
    focusMode="activedescendant"
    selectionMode="explicit"
    [activeDescendant]="lb.activeDescendant()"
    (valueChange)="pick($event)">
    @for (suggestion of suggestions(); track suggestion) {
      <li ngOption [value]="suggestion">{{ suggestion }}</li>
    }
  </ul>
</ng-template>
```

```typescript
@Component({
  imports: [SearchInputComponent, ComboboxPopup, ComboboxWidget, Listbox, Option],
  ...
})
export class Example {
  searchValue = signal("");
  suggestions = computed(() => {
    const query = this.searchValue().toLowerCase();
    return FRUITS.filter(fruit => fruit.toLowerCase().includes(query));
  });

  /** Commits the option picked in the listbox (Enter key or click) into the search input. */
  pick(values: readonly string[]) {
    const picked = values.at(-1);
    if (picked) this.searchValue.set(picked);
  }
}
```

## Selection modes

The `ngListbox` `selectionMode` controls **when** the selection (and therefore `valueChange`) is committed while navigating with the keyboard:

- **`follow`** (default) — the selection follows the active item: every arrow key press commits the value immediately, like a native `<select>`. Best for **static lists** where selecting has no side effects.
- **`explicit`** — arrow keys only move the highlight; the value is committed on <kbd>Enter</kbd> or click. **Required for filtering suggestions**: with `follow`, every arrow press would rewrite the query and re-filter the list under the user's feet.

<demo-search-input-selection-modes></demo-search-input-selection-modes>

```html
<!-- follow: navigation commits immediately (static list) -->
<ul ngListbox selectionMode="follow" ...>

<!-- explicit: Enter or click commits (filtering suggestions) -->
<ul ngListbox selectionMode="explicit" ...>
```

## API Reference

### SearchInputComponent

| Input         | Type                  | Default     | Description                                                                                       |
| ------------- | ---------------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `value`       | `string` (model)      | `""`        | The search text — supports `[(value)]` or `[formField]` (signal forms `FormValueControl` contract). |
| `placeholder` | `string`              | `"Search..."` | Input placeholder.                                                                                 |
| `disabled`    | `boolean`             | `false`     | Disables the inner `<input>` and dims the field.                                                   |
| `ariaLabel`   | `string \| undefined` | —           | Accessible name of the inner `<input>` — aliased on the `aria-label` attribute, since a placeholder alone isn't a label (RGAA 11.1). |
| `hotkey`      | `string`              | —           | Shortcut announced on the `<input>` via `aria-keyshortcuts`. No default — a library can't preempt a global key. |
| `class`       | `string`              | —           | Extra class(es) — merged into the `<input-group>` host.                                            |

`SearchInputComponent` has no outputs — read the current query from `value`/`(valueChange)`.

### Methods

| Method       | Description                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `combobox()` | Returns the `Combobox` instance (from `@angular/aria/combobox`) applied to the inner `<input>` — use it to attach a suggestions popup, see "With suggestions". |
