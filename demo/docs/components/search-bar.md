# Search Bar

A pill-shaped search bar driven by its own CVA (`searchBarVariants`). It reuses the galactik `Button` for its built-in **clear** and **send** controls, which fade in as soon as text is typed. Implements the signal forms `FormValueControl` contract: bind it with a plain two-way binding (`[(value)]`) or as a form field (`[formField]`).

## Demo

Four sizes (`small` / `medium` / `large` / `hero`), the `(search)` send output, and the disabled state. `hero` is the field of a home page: no leading magnifier, a shadow, and a round primary send button (a magnifier) that is always shown, a little faded while the field is empty.

<demo-search-bar></demo-search-bar>

```typescript
@Component({
  selector: 'example',
  imports: [SearchBarComponent],
  template: `<SearchBar [(value)]="query" (search)="onSearch($event)" />`,
})
export class Example {
  query = signal("");
  onSearch(q: string) { /* run the search */ }
}
```

```html
<!-- Default size (large) -->
<SearchBar [(value)]="query" />

<!-- Sizes -->
<SearchBar size="small"  [(value)]="query" />
<SearchBar size="medium" [(value)]="query" />
<SearchBar size="large"  [(value)]="query" />
<SearchBar size="hero"   [(value)]="query" />

<!-- Send action: emitted with the current value on the built-in send button -->
<SearchBar [(value)]="query" (search)="onSearch($event)" />

<!-- As a signal forms field -->
<SearchBar [formField]="searchForm.query" />
```

## Action slots

App-specific controls are projected **inside the pill**. Unmarked content lands in the default slot, between the clear (×) and the send button — the natural place for an action scoped to the query. Mark with `slot="trailing"` whatever must stay after the send button, such as an end-of-pill call to action.

<demo-search-bar-actions></demo-search-bar-actions>

```html
<SearchBar [(value)]="query">
  <!-- default slot: before the send button -->
  <button variant="tertiary" scheme="neutral" [iconOnly]="true" size="sm" type="button" (click)="toggleFavorite()">
    <StarIcon [solid]="favorite()" />
  </button>

  <!-- trailing slot: after the send button -->
  <button variant="accent" size="sm" slot="trailing" type="button" (click)="askAI()">
    <SparklesIcon class="me-1" />
    Ask AI
  </button>
</SearchBar>
```

For **conditional** trailing content, put the marker on an `<ng-container>` around the block: Angular only hoists a block's marker when the block has a single root node, and anything else (a sibling element, a `@let`) sends the content back to the default slot — reported as `NG8011`. The default slot needs no such care.

```html
<SearchBar [(value)]="query">
  @if (canSave()) {
    <SavedSearchButton [query]="query()" />
  }

  <ng-container slot="trailing">
    @if (allowAI()) {
      @let label = "askAI" | transloco;
      <button variant="accent" size="sm" type="button" [attr.aria-label]="label">{{ label }}</button>
    }
  </ng-container>
</SearchBar>
```

Never put `disabled` on projected content: the pill styles its disabled state with `has-disabled:` (`:has(:disabled)`), which matches any disabled descendant and greys out the whole bar — the input included. Use `aria-disabled` + `pointer-events-none opacity-50` + `tabindex="-1"` and guard the handler instead.

## With suggestions

Without suggestions, `SearchBar` is a plain native search field. To show suggestions, add the static `suggestions` attribute and import `SearchBarSuggestionsComponent` (instead of, or next to, `SearchBarComponent`): its inner `<input>` then carries `ngCombobox`, so it is announced as a combobox, as it should be once a popup is attached. Attach the popup with the `@angular/aria/combobox` directives: it is an `ng-template` bound to the `Combobox` instance exposed by `SearchBarSuggestionsComponent`. It only renders while expanded, and keyboard navigation (`ArrowDown`, `Enter`, `aria-activedescendant`) is handled for you. The send button remains available to submit the free-text query. The popup is placed by `injectFloatingPanel` (exported by `@sinequa/galactik`): `fixed`, under the field, as wide as it, flipped above when there is no room, and in the top layer (`topLayer: true`), so that no ancestor with an `overflow` — a card, a dialog, a frame — can clip it. Give the `<ul>` the classes `fixed z-50 m-0 inset-auto` (a `fixed` panel, with the user agent's centring of a popover undone), and call it from the constructor with the `<ul>` (rendered while the combobox is expanded) as the panel and the `SearchBar` as the anchor. To give it the look of the `Select` popup, take its class from `selectMenuVariants()` on the `<ul>` and `selectOptionVariants()` on each `<li ngOption>`, both exported by `@sinequa/galactik`.

<demo-search-bar-suggestions></demo-search-bar-suggestions>

```html
<SearchBar suggestions #sb [(value)]="query" placeholder="Search a fruit..." (search)="onSearch($event)" />

<ng-template ngComboboxPopup [combobox]="sb.combobox()">
  <ul
    #list
    class="fixed z-50 m-0 inset-auto"
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

```ts
private readonly list = viewChild<ElementRef<HTMLElement>>("list");
private readonly bar = viewChild(SearchBarSuggestionsComponent, { read: ElementRef });

constructor() {
  injectFloatingPanel({
    panel: () => this.list()?.nativeElement,
    anchor: () => this.bar()?.nativeElement,
    offset: 4,
    matchAnchorWidth: true,
    topLayer: true
  });
}
```

## Notes

- Built-in **clear** (`XMarkIcon`) and **send** (`SendHorizontalIcon`) buttons appear only when the field is non-empty, and are removed from the tab order while hidden. At `size="small"` they shrink (`xs` button, `size-3` icon) to fit the compact pill.
- The visual is fully driven by `searchBarVariants` (pill shape, `.sb-icon` / `.sb-input` slots, focus/disabled states via `has-*` selectors on the inner `<input>`). Sizing utilities passed via `class` override the `size` default through tailwind-merge.
- For a rectangular, input-group-based variant, see **Search Input**.

## API Reference

### SearchBarComponent

| Input         | Type                             | Default       | Description                                                                                                                                                                      |
| ------------- | -------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `string` (model)                 | `""`          | The search text — supports `[(value)]` or `[formField]` (signal forms `FormValueControl` contract).                                                                              |
| `placeholder` | `string`                         | `"Search..."` | Input placeholder.                                                                                                                                                               |
| `ariaLabel`   | `string \| undefined`            | —             | Accessible name of the inner `<input>` — aliased on the `aria-label` attribute, as on `SearchInput`, since a placeholder alone isn't a label (RGAA 11.1).                         |
| `disabled`    | `boolean`                        | `false`       | Disables the inner `<input>` and both built-in buttons.                                                                                                                          |
| `hotkey`      | `string`                         | —             | Shortcut announced on the `<input>` via `aria-keyshortcuts` (e.g. `"alt+1"`). No default — a library can't preempt a global key; wiring the actual key handler is the app's job. |
| `size`        | `"small" \| "medium" \| "large"` | `"large"`     | Pill height.                                                                                                                                                                     |
| `class`       | `string`                         | —             | Extra class(es) merged into the host via `tailwind-merge`.                                                                                                                       |

| Output   | Payload  | Description                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------- |
| `search` | `string` | Emitted with the current `value` when the built-in send button is activated (click or Enter). |

### Methods

| Method       | Description                                                                                                                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `combobox()` | `SearchBarSuggestionsComponent` only (`<SearchBar suggestions>`). Returns the `Combobox` instance (from `@angular/aria/combobox`) applied to the inner `<input>` — use it to attach a suggestions popup, see "With suggestions". |
