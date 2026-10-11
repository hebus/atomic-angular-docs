# Sort Selector

Dropdown trigger that lets users change the sort order of a result set. Reads the sorting choices from the active query in `AppStore` and filters out relevance-based options when the query has no `text contains` clause.

## Imports

```ts
import { SortSelectorComponent } from "@sinequa/atomic-angular";
```

## Demo

The component takes a `Result`. It resolves the query from `AppStore.getQueryByName(result.queryName)` and renders the matching `sortingChoices`. Each option's icon switches between **A↑Z** and **Z↓A** based on `orderByClause`.

<demo-sort-selector-basic></demo-sort-selector-basic>

```html
<sort-selector [result]="result()" (onSort)="onSort($event)" />
```

```typescript
appStore.update({
  queries: {
    default: {
      name: "_query",
      sortingChoices: [
        { name: "relevance", display: "Relevance", orderByClause: "globalrelevance desc", ... },
        { name: "date-desc", display: "Date — newest", orderByClause: "modified desc", ... },
        ...
      ]
    } as CCQuery
  }
});

const result = signal({ queryName: "_query", sort: "relevance", hasRelevance: true, ... } as Result);
```

## Relevance gating

When `result.hasRelevance` is `false`, any sorting choice whose `orderByClause` contains `globalrelevance` is hidden. This mirrors the runtime behavior — relevance is only meaningful for queries that include text matching.

<demo-sort-selector-no-relevance></demo-sort-selector-no-relevance>

## Position

The dropdown placement is controlled by the `position` input. Accepted values are floating-ui [`Placement`](https://floating-ui.com/docs/computePosition#placement) strings.

<demo-sort-selector-position></demo-sort-selector-position>

```html
<sort-selector [result]="result()" position="bottom-end" (onSort)="onSort($event)" />
```

## API Reference

### Inputs

| Name       | Type        | Default          | Description                                                                |
| ---------- | ----------- | ---------------- | -------------------------------------------------------------------------- |
| `result`   | `Result`    | —                | The active result. Used to resolve the query and the current `sort` name. |
| `position` | `Placement` | `"bottom-start"` | Placement of the dropdown menu.                                            |

### Outputs

| Name     | Payload         | Description                              |
| -------- | --------------- | ---------------------------------------- |
| `onSort` | `SortingChoice` | Emitted when the user picks a new sort. |

## Notes

- For tab-search queries the sorting choices come from the matching `tabSearch.tabs[].sortingChoices`, falling back to the query-level `sortingChoices` otherwise.
- Display labels are passed through `transloco` — provide translation keys (e.g. `msg#sortSelector.relevance`) when running inside an internationalized app.
