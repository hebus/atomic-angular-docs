# Search box (/docs/atomic-angular/bookmarks-and-searches/search-box)

The search field of an application, with a popup of suggestions and saved searches.



`<search-box>` is the search field of an application: a pill-shaped bar with a popup of two tabs, **Suggestions**
(the user's own searches and the suggest queries, grouped by category) and **Saved** (the saved searches). It reads
the app configuration and the user settings itself and, once a search is validated, navigates to the results page with
the text and the filters, so there is nothing to wire for the common case.

## Minimal example [#minimal-example]

<CodeSample id="search-box-basic" title="A search box with nothing given to it">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { SearchBoxComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [SearchBoxComponent],
      template: `<search-box (searched)="onSearch($event)" />`,
    })
    export class SampleComponent {
      onSearch(text: string) {
        console.log(text);
      }
    }
    ```
  </Lang>
</CodeSample>

## Behaviour [#behaviour]

* The popup opens when the field gets the focus and goes back to the **Suggestions** tab each time it opens.
* Enter, a clicked suggestion or the send button validates the search: the component emits `searched` and navigates
  to `searchPath` (`/search` by default) with `q` (the text) and `f` (the filters) as query parameters.
* The **Saved** tab replays a saved search as it was saved (text, filters and tab). The star on a row removes it.
* `popup="card"` (default) floats under the field, as in a results header. `popup="inline"` is flat, right under the field,
  out of the flow (opening it moves nothing) and 74px narrower than the field, as on a home page: it takes the place of what
  sits under the field, and `expandedChange` lets the host hide it (the filters) while the popup is open.
* From the field, Shift+Tab goes up to the tabs (left and right arrows change tab, Tab goes down into the list), Shift+Tab again comes back to the field and Escape closes the popup. The arrows in either list put the text of the active row in the field.
* Hovering a row reveals a star that saves the search, or removes it from the saved ones, without running it. The star is a
  mouse shortcut (decorative for assistive technology): from the keyboard, **Ctrl+Enter** (Cmd+Enter) does the same on the
  highlighted row of either tab, announces the result, and is described on the field.
* A suggestion or a saved search too long for its row is cut with an ellipsis, and a tooltip shows the whole text (only when it is cut).
* An empty search is refused, with a notification, when the query does not allow it.
* The application can add a call to action to the bar, after the send button (an "Ask AI", say), by marking it
  `slot="trailing"`: `<search-box [(searchInputText)]="text"><button slot="trailing" type="button" …>Ask AI</button></search-box>`.
  It reads the text of the field through `searchInputText`. It sits in the form of the field, so give it `type="button"`, and
  use `aria-disabled` rather than `disabled`: the bar greys out whole on any disabled descendant. Behind an `@if`, wrap it in an
  `<ng-container slot="trailing">`.

## Recipes [#recipes]

### Your own popup and your own suggestions [#your-own-popup-and-your-own-suggestions]

Give the popup your own content with an `<ng-template searchBoxPopup>`, and your own source with `suggestionsProvider`.
The template replaces the tabs and their lists; the card, its placement and its opening stay the search box's. It receives
a context (`let-ctx`) with signals (`text`, `typed`, `suggestions`, `loading`, `savedSearches`) and actions (`commit`,
`preview`, `openSaved`, `isSaved`, `toggleSaved`, `collapse`, `focusField`).

<CodeSample id="search-box-custom-popup" title="A search box with its own suggestions and popup">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { ComboboxWidget } from "@angular/aria/combobox";
    import { Listbox, Option } from "@angular/aria/listbox";
    import { SearchBoxComponent, SearchBoxPopupDirective, type SearchBoxSuggestion } from "@sinequa/atomic-angular";

    const FRUITS = ["apple", "apricot", "banana", "cherry"];

    @Component({
      selector: "sample-component",
      imports: [SearchBoxComponent, SearchBoxPopupDirective, ComboboxWidget, Listbox, Option],
      template: `
        <search-box [suggestionsProvider]="provider">
          <ng-template searchBoxPopup let-ctx>
            <ul
              ngComboboxWidget
              ngListbox
              #lb="ngListbox"
              focusMode="activedescendant"
              [activeDescendant]="lb.activeDescendant()"
              (valueChange)="ctx.navigatedSinceTyping() && ctx.preview($event.at(-1)?.display ?? '')">
              @for (s of ctx.suggestions(); track s.display) {
                <li ngOption [value]="s" [label]="s.display ?? ''" (click)="ctx.commit(s.display ?? '')">{{ s.display }}</li>
              }
            </ul>
          </ng-template>
        </search-box>
      `,
    })
    export class SampleComponent {
      provider = async (text: string): Promise<SearchBoxSuggestion[]> =>
        FRUITS.filter(f => f.startsWith(text.toLowerCase())).map(display => ({ display }));
    }
    ```
  </Lang>
</CodeSample>

## API [#api]

| Input                 | Type                                                                        | Default                                                           | Description                                                                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`                | `"small" \| "medium" \| "large" \| "hero"`                                  | `"medium"`                                                        | Size of the bar. `hero` is the field of a home page.                                                                                                                                                                                        |
| `showSave`            | `boolean`                                                                   | `true`                                                            | Shows the button that saves the current search.                                                                                                                                                                                             |
| `popup`               | `"card" \| "inline"`                                                        | `"card"`                                                          | How the popup is presented.                                                                                                                                                                                                                 |
| `popupOffset`         | `number`                                                                    | `12`                                                              | Distance in pixels between the field and the card popup (placed with Floating UI).                                                                                                                                                          |
| `popupFitScreen`      | `boolean`                                                                   | `true` for `size="hero"` with `popup="inline"`, `false` otherwise | Fits the popup to the screen: its height is capped by the room left on the side it opens (the list scrolls inside). In `inline` mode it is then placed by Floating UI instead of staying in the flow.                                       |
| `popupFlip`           | `boolean`                                                                   | `true`, `false` for `size="hero"`                                 | Goes above the field when there is no room under it. Set to `false` to keep the popup under the field: with `popupFitScreen` its height then shrinks down to the edge of the screen. Ignored by an `inline` popup without `popupFitScreen`. |
| `searchPath`          | `string`                                                                    | `"/search"`                                                       | Route a validated search navigates to.                                                                                                                                                                                                      |
| `placeholder`         | `string`                                                                    | translated text                                                   | Replaces the default placeholder.                                                                                                                                                                                                           |
| `suggestionsProvider` | `(text: string) => SearchBoxSuggestion[] \| Promise<SearchBoxSuggestion[]>` | none                                                              | Replaces the suggest queries and the user's own searches as the source of the suggestions. The rows are shown as returned (no category titles); a rejected promise leaves an empty list.                                                    |
| `searchInputText`     | `string`                                                                    | `""`                                                              | Two-way: the text in the field.                                                                                                                                                                                                             |

| Output           | Payload                   | Description                                    |
| ---------------- | ------------------------- | ---------------------------------------------- |
| `searched`       | `string`                  | The text of a validated search.                |
| `debounced`      | `string`                  | The text as it is typed, once the user pauses. |
| `saved`          | `SearchItem \| undefined` | The search was saved from the save button.     |
| `expandedChange` | `boolean`                 | The popup opened or closed.                    |

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Arrow keys do not preview the row in my own list">
    The search box drives only its own lists (it does scroll the active row of yours into view). A list in an
    `ng-template searchBoxPopup` lives in your view, so call `ctx.preview(text)` from `(valueChange)` while the keyboard
    navigates. Enter in the field searches the text it holds, so a previewed row is what gets searched.
  </Accordion>

  <Accordion title="The field is no longer announced as a combobox">
    The template must carry the widget: an element with `ngComboboxWidget` and `ngListbox` (`focusMode="activedescendant"`).
    Without it the field has nothing to control.
  </Accordion>
</Accordions>

Translations come from the `search-box` scope (`en`, `fr`, `de`).
