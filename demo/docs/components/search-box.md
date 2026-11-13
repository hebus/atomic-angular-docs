# Search Box

The search field of an application: a pill-shaped bar with a popup of two tabs, **Suggestions** (the user's own searches and the suggest queries, grouped by category) and **Saved** (the saved searches). It works on its own: dropped in a template with nothing given to it, it reads the app configuration and the user settings itself and, once a search is validated, goes to the results page with the text and the filters.

## Imports

```ts
import { SearchBoxComponent } from "@sinequa/atomic-angular";
```

## Default size

Click in the field to open the popup. Type to filter the suggestions; the arrows move in the list and the field takes the text of the active row (on both tabs, the first arrow on the first row), Enter runs the search, Escape closes the popup. Shift+Tab goes up to the tabs, where the left and right arrows change tab and Tab goes down into the list (its first row becomes the active one), Shift+Tab again comes back to the field, and Escape closes the popup from there too. The **Saved** tab lists the saved searches: a click replays one as it was saved (text, filters and tab) and the star removes it. The searches in this demo never leave the page.

<demo-search-box-basic></demo-search-box-basic>

```html
<search-box (searched)="onSearch($event)" />
```

## Home page: hero size and inline popup

`size="hero"` is the field of a home page (no leading magnifier, a shadow, a round send button that is always shown), and `popup="inline"` presents the popup as the prototype does there: flat, right under the field and a little narrower than it, out of the flow (opening it moves nothing), so it takes the place of what sits below (the filters). It tells the host when it opens with `expandedChange`, which is how the filters step aside here. Hover a row to reveal the star that saves the search or removes it from the saved ones (it plays a short pop animation); from the keyboard, Ctrl+Enter does the same on the highlighted row, on either tab, and is announced. A host can replace the placeholder with `placeholder`.

<demo-search-box-large></demo-search-box-large>

```html
<search-box size="hero" popup="inline" (expandedChange)="open.set($event)" />
@if (!open()) {
  <filters-bar />
}
```

## Fit the popup to the screen

`popupFitScreen` caps the height of the popup by the room the screen leaves on the side it opens, its list scrolling inside, as the facet popovers do. `popupFlip` (on by default, off for the `hero` size) lets it go above the field when there is no room under it; turned off, the popup stays under the field and shrinks down to the edge of the screen. Both work with `card` and with `inline` (which is then placed by Floating UI and is no longer in the flow).

The room depends on where the field is in the window, so the demo pins the field at the top, middle or bottom of the window. Open the popup, then resize the window (or the DevTools) to see the height follow.

<demo-search-box-fit-screen></demo-search-box-fit-screen>

```html
<search-box size="hero" popup="inline" />
<!-- the same, spelled out: -->
<search-box size="hero" popup="inline" popupFitScreen [popupFlip]="false" />
```

## A call to action after the send button

An application can add its own button to the bar, after the send button (an "Ask AI", say), by marking it `slot="trailing"`.
The text of the field reaches it through `[(searchInputText)]`. Give it `type="button"` — it sits in the form of the field — and
`aria-disabled` rather than `disabled`: the bar greys out whole on any disabled descendant. Behind an `@if`, wrap it in an
`<ng-container slot="trailing">`, since the projection only looks at the attributes of a single root element.

<demo-search-box-trailing></demo-search-box-trailing>

```html
<search-box [(searchInputText)]="text">
  <button slot="trailing" type="button" variant="accent" size="sm" [attr.aria-disabled]="!text()" (click)="ask()">Ask AI</button>
</search-box>

<!-- conditional -->
<search-box>
  <ng-container slot="trailing">
    @if (allowAi()) {
      <button type="button" variant="accent" size="sm">Ask AI</button>
    }
  </ng-container>
</search-box>
```

## Your own popup and your own suggestions

The popup is the search box's, but what it shows is yours to replace. Put an `<ng-template searchBoxPopup let-ctx>` inside `<search-box>` and it takes the place of the tabs and their lists, while the card, its placement and its opening stay the search box's. `[suggestionsProvider]` replaces the suggest queries as the source: it is called with the text of the field once it has settled, and the rows it returns are shown as they are (no category titles). The `ctx` of the template carries the signals `text`, `typed`, `suggestions`, `loading`, `savedSearches` and `navigatedSinceTyping`, and the actions `commit` (writes the text, closes the popup, runs the search), `preview`, `openSaved`, `isSaved`, `toggleSaved`, `collapse` and `focusField`.

The list is yours too: it must carry `ngComboboxWidget` and `ngListbox` (`focusMode="activedescendant"`) so the field stays a combobox, and the search box does not drive it, apart from scrolling the active row into view while the arrows walk the list. Call `preview` from `(valueChange)` while the keyboard navigates, as here.

<demo-search-box-custom-popup></demo-search-box-custom-popup>

```html
<search-box [suggestionsProvider]="provider" (searched)="onSearch($event)">
  <ng-template searchBoxPopup let-ctx>
    <ul
      ngComboboxWidget
      ngListbox
      #lb="ngListbox"
      focusMode="activedescendant"
      [activeDescendant]="lb.activeDescendant()"
      (valueChange)="ctx.navigatedSinceTyping() && ctx.preview($event.at(-1)?.display ?? '')">
      @for (suggestion of ctx.suggestions(); track suggestion.display) {
        <li ngOption [value]="suggestion" [label]="suggestion.display ?? ''" (click)="ctx.commit(suggestion.display ?? '')">
          {{ suggestion.display }}
        </li>
      } @empty {
        <li role="option" aria-disabled="true" aria-selected="false">No department</li>
      }
    </ul>
  </ng-template>
</search-box>
```

```ts
provider = async (text: string): Promise<SearchBoxSuggestion[]> =>
  departments.filter(d => d.name.toLowerCase().includes(text.toLowerCase())).map(d => ({ display: d.name }));
```

## API Reference

### SearchBoxComponent (`<search-box>`)

| Input | Type | Default | Description |
|---|---|---|---|
| `size` | `"small" \| "medium" \| "large" \| "hero"` | `"medium"` | Size of the bar. `hero` is the field of a home page. |
| `showSave` | `boolean` | `true` | Shows the button that saves the current search. |
| `popup` | `"card" \| "inline"` | `"card"` | `card` floats over the page under the field (a results header). `inline` is flat, out of the flow and 74px narrower than the field (a home page). |
| `popupOffset` | `number` | `12` | Distance in pixels between the field and the `card` popup, which is placed with Floating UI (flipped above when there is no room below). |
| `popupFitScreen` | `boolean` | `true` for `size="hero"` with `popup="inline"`, `false` otherwise | Makes the popup fit the screen like the facet popovers: its height is capped by the room left on the side it opens (the list scrolls inside). With `popup="inline"` it is then placed by Floating UI instead of staying in the flow. |
| `popupFlip` | `boolean` | `true`, `false` for `size="hero"` | Whether the popup goes above the field when there is no room under it. Set to `false` to keep it under the field: with `popupFitScreen` its height then shrinks down to the edge of the screen. Ignored by an `inline` popup without `popupFitScreen`, which stays in the flow. |
| `searchPath` | `string` | `"/search"` | Route a validated search navigates to, with `q` and `f` as query parameters. |
| `placeholder` | `string` | translated text | Replaces the default placeholder, which is also the accessible name of the field. |
| `suggestionsProvider` | `(text: string) => SearchBoxSuggestion[] \| Promise<SearchBoxSuggestion[]>` | none | Replaces the suggest queries and the user's own searches as the source of the suggestions. Rows are shown as returned; a rejected promise leaves an empty list. |
| `searchInputText` | `string` | `""` | Two-way (`model`): the text in the field. |

| Content | Context | Description |
|---|---|---|
| `[slot="trailing"]` | — | A call to action of the application, projected in the bar after the send button. |
| `ng-template[searchBoxPopup]` | `SearchBoxPopupContext` (`let-ctx`) | Replaces the tabs and lists of the popup. See above. |

| Output | Payload | Description |
|---|---|---|
| `searched` | `string` | The text of a validated search (Enter, a clicked suggestion, the send button). |
| `debounced` | `string` | The text as it is typed, once the user pauses. |
| `saved` | `SearchItem \| undefined` | The search was saved from the save button. |
| `expandedChange` | `boolean` | The popup opened or closed: a host hides what the inline popup replaces. |
