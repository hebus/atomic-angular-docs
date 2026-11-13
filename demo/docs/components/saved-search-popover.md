# Saved Search Popover

Starred toggle button for the current search: saves it (via {@link SavedSearchDialog}) when unstarred, unsaves it directly when already saved.

## Example

```ts
import { SavedSearchPopover } from "@sinequa/atomic-angular";
```

```html
<saved-search-popover [queryText]="searchInputText()" (onSavedSearch)="onSavedSearch($event)" />
```

## Notes

- Backed by `UserSettingsStore` (to detect whether the current query is already saved) and `SavedSearchesService`.
- Saving opens `SavedSearchDialog` to name the search; unsaving happens immediately, with a confirmation toast.
