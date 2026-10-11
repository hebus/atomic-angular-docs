# Saved Search

Dialog to name and save the current search. Invoked imperatively via the `SavedSearch` callable. The name field uses the galactik `input-group`.

## Example

<demo-saved-search></demo-saved-search>

```ts
import { SavedSearch } from "@sinequa/atomic-angular";

// initial name is optional
SavedSearch.call("My search", { injector });
```

## Notes

- Backed by `SavedSearchesService` (`providedIn: 'root'`) — it saves the current query under the given name, tagged with the active tab read internally from `QueryParamsStore`.
- Confirming saves the current query under the given name; focus lands on the name field automatically when the dialog opens, and `Enter` confirms.
