# Add to Collection

Dialog to add one or more articles to a collection (basket), or create a new one. Invoked via the `AddToCollection` callable. It is a two-screen callable: a **list** screen (toggle the article's membership in each collection) and a **create** screen (name a new collection). The footer stays stable — `Close` / `New collection` on the list, `Back` / `Create` on the form. The "create" field uses the galactik `input-group`.

## Example

<demo-add-to-collection></demo-add-to-collection>

```ts
import { AddToCollection } from "@sinequa/atomic-angular";

// accepts a single article or an array
AddToCollection.call(article, { injector });
```

## Notes

- Backed by `UserSettingsStore` + `QueryParamsStore` (both `providedIn: 'root'`).
- With no collections seeded, the list screen shows the empty state — click **Create collection** to switch to the create screen.
- **Seed 50 collections** (demo-only button) populates `UserSettingsStore` with varied membership so the search field and virtualized list can be exercised. The demo has no Sinequa backend, so it seeds the store state directly and stubs the `usersettings` endpoint — toggling and creating collections then work locally. **Open** launches the dialog with three articles, so rows show every state (checked / indeterminate / unchecked).
- Creating a collection pre-adds the current article(s) to it, then returns to the list (where it appears checked).
- The list rows use the galactik `checkbox` (tri-state via `checked` + `indeterminate`): `all` = checked, `some` = indeterminate, `none` = unchecked. The whole row toggles.
- At scale: the list is **virtualized** (`@tanstack/angular-virtual` — only visible rows are rendered) and a **search field** appears past 6 collections.
