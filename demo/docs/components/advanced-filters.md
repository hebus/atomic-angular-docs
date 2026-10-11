# Advanced Filters

A full-page filter panel used inside sheets. Combines free-text fielded search (`content`, `title` with operators such as *contains all*, *exact*, *any*, *none*, *matches*), a route-driven tab selector, and a dropdown filter per aggregation column.

## Imports

```ts
import { AdvancedFiltersComponent } from "@sinequa/atomic-angular";
```

## Demo

The component is wired to `AppStore`, `QueryParamsStore`, `SheetService` and the Angular router. The demo seeds a `customJSONs.filters` entry and a default query so the fielded-search inputs and per-column dropdowns render. Aggregations are normally fetched from the backend — here they come from a local mock.

<demo-advanced-filters-basic></demo-advanced-filters-basic>

```html
<advanced-filters />
```

```typescript
constructor() {
  const appStore = inject(AppStore);

  appStore.update({
    queries: {
      default: {
        name: "default",
        allowEmptySearch: true,
        enableFieldedSearch: true
      } as CCQuery
    },
    columnMap: {
      modified: { name: "modified", eType: EngineType.date } as CCColumn
    },
    customJSONs: [
      {
        name: "filters",
        preLogin: false,
        data: [
          { name: "Authors",  column: "author",   display: "Authors"  },
          { name: "Sources",  column: "source",   display: "Sources"  },
          { name: "Folders",  column: "folder",   display: "Folders"  },
          { name: "Modified", column: "modified", display: "Modified" }
        ]
      }
    ]
  });
}
```

## How it works

- **Find in content / title** — toggled by the query's `enableFieldedSearch` flag. Operators map to Sinequa fielded-search syntax: `all` → `[term]`, `exact` → `"term"`, `any` → `(field:[w1] OR field:[w2])`, `none` → `NOT [term]`, `matches` → AND/OR aware expression.
- **Scope tabs** — read from the Angular router config (`router.config.find(c => c.path === "search").children`). Selecting a tab sets the target route segment used when search is submitted.
- **Filters** — built from the union of `customJSONs.filters` and the loaded aggregations. Tree columns are flattened so suggestions include nested nodes.
- **Submit** — composes the query text, applies the selected filter values via `QueryParamsStore.updateFilter`, closes the sheet and navigates to `/search/<tab>` with the merged query params.

## Notes

- The component is presentational — it doesn't perform the search itself, it patches the `QueryParamsStore` and navigates. The route the user lands on is responsible for executing the query.
- An empty submission is blocked unless the active query has `allowEmptySearch: true`; the content input is then re-rendered with the `destructive` variant and a toast is shown.
