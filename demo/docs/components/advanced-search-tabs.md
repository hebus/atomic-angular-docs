# Advanced Search Tabs

Search bar + tabbed presentation of the advanced search panels — a more accessible replacement for `AdvancedSearch`'s `<details>/<summary>` accordion. Same inputs/outputs, so it is a drop-in replacement wherever `<advanced-search>` is used inline (e.g. inside an already-tabbed host, or behind a search popover trigger). **Extracts** and **Entities** are always shown (they have their own empty states); **Match locations**, **Labels** and **Similar documents** only appear when non-empty.

## Imports

```ts
import { AdvancedSearchTabs } from "@sinequa/atomic-angular";
```

## Demo

The component only requires an `Article`. Each panel reads from a root store; the demo seeds all of them — `SelectionStore` (query text), `ApplicationStore` (extracts), `AppStore`'s preview web service + the article's entity fields (**Entities**), `AppStore`'s labels web service + the article's label fields (**Labels**), and `PreviewService.setPreviewData` (**Match locations**) — plus the controlled `[similarDocuments]` input, so all five tabs render with content offline.

<demo-advanced-search-tabs-basic></demo-advanced-search-tabs-basic>

```html
<!-- The component has no height of its own — every TabPanel is absolute/inset-0 (out of flow), so
     without an explicit height the content region collapses to 0. Size it on the component itself
     (min-h-*/h-* or a CSS var, per caller), not on a wrapping div. -->
<advanced-search-tabs
  class="min-h-64 h-[28rem]"
  [article]="article()"
  previewStrategy="replace"
  (selected)="onSelected($event)" />
```

```typescript
const article = {
  id: "demo-advanced-search-tabs-doc",
  title: "FY2025 Annual Report",
  collection: ["/Intranet/"],
  connector: "intranet",
  publiclabels1: ["reviewed", "finance"],
  privatelabels1: ["to-follow-up"]
} as Article;

// Panels read from root stores — seed them to render content offline:
selectionStore.update({ article, id: article.id, queryText: "annual report" });
applicationStore.updateExtracts(article.id, extracts);
appStore.update({
  webServices: {
    preview: { name: "preview", webServiceType: "preview", highlights: "company,person,geo" },
    labels: { name: "labels", webServiceType: "labels", publicLabelsField: "publiclabels1", privateLabelsField: "privatelabels1" }
  }
});
previewService.setPreviewData(previewData); // feeds the "Match locations" tab
```

## API Reference

### AdvancedSearchTabs

Selector: `advanced-search-tabs` (or `AdvancedSearchTabs`).

| Input              | Type                | Default        | Description                                                                                                                |
| ------------------ | -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `article`           | `Article`             | — _(required)_ | The document explored by the header and every tab.                                                                       |
| `previewStrategy`   | `SelectionStrategy`   | `"replace"`    | How a picked similar document affects the preview (relayed to the "Similar documents" tab).                              |
| `similarDocuments`  | `Article[] \| undefined` | —           | Controlled similar documents, forwarded to the "Similar documents" tab. When set, that tab renders these instead of fetching from the backend — useful for embedding/demos without a live query. |

| Output     | Payload   | Description                                     |
| ---------- | --------- | ------------------------------------------------ |
| `selected` | `Article` | Emitted when the user picks a similar document. |

## Notes

- The header input is two-way bound to a `linkedSignal` seeded from `SelectionStore.queryText`; pressing **Enter** or the search button writes the trimmed text back to the store, and the clear button empties it. Enter is captured on the component's own host (capture phase) because ARIA `Combobox`'s own `(keydown)` listener on the input otherwise swallows it before a bubble-phase handler ever sees it.
- Each tab is a standalone component (`article-extracts-tab`, `article-entities-tab`, `article-match-locations-tab`, `article-labels-tab`, `article-similar-documents-tab`) that reads from the same shared panel state as the accordion presentation (`inject-*-state.ts`) — nothing extra needs to be provided beyond what `AdvancedSearch` already needs.
- Tabs degrade gracefully: no extracts → "no relevant extracts"; no preview highlights → no entities; no match locations, labels or similar documents → the corresponding tab is not rendered at all (unlike Extracts/Entities, which always show).
- **The component has no height of its own** — its host is `flex flex-col` with no `h-*`, and every `TabPanel` is `absolute inset-0` (out of flow), so its content contributes nothing to the parent's intrinsic height. Give it an explicit height on the `<advanced-search-tabs>` element itself (`class="min-h-64 h-[28rem]"`, a CSS var, etc.) — not on a wrapping div — or the tab content region renders with zero visible height. See the real caller in `preview-actions.ts` (`<advanced-search-tabs class="min-h-64 h-[var(--popover-available-height,28rem)]">`).
- See also `AdvancedSearch`, the `<details>/<summary>` accordion presentation of the same panels.
