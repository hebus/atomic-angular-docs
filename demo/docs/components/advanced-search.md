# Advanced Search

Side panel that explores a single document in depth. It pairs a search header (a galactik `input-group`) with a stack of collapsible article panels — **extracts**, **labels**, **entities** and **similar documents** — so users can dig into one result without leaving the preview. Typing in the header updates `SelectionStore.queryText`; picking a similar document emits `selected`.

## Imports

```ts
import { AdvancedSearch } from "@sinequa/atomic-angular";
```

## Demo

The component only requires an `Article`. Each panel reads from a root store and renders gracefully when its data is absent: the demo seeds `SelectionStore` (query text) and `ApplicationStore` (extracts) so the header and the **Extracts** panel show content without a live backend. The labels, entities and similar-documents panels stay hidden here because they depend on app web-service configuration and a backend query.

<demo-advanced-search-basic></demo-advanced-search-basic>

```html
<advanced-search [article]="article()" previewStrategy="replace" (selected)="onSelected($event)" />
```

```typescript
const article = {
  id: "demo-advanced-search-doc",
  title: "FY2025 Annual Report",
  collection: ["/Intranet/"],
  connector: "intranet"
} as Article;

// Panels read from root stores — seed them to render content offline:
selectionStore.update({ article, id: article.id, queryText: "annual report" });
applicationStore.updateExtracts(article.id, extracts);
```

## API Reference

### Inputs

| Name              | Type                | Default     | Description                                                              |
| ----------------- | ------------------- | ----------- | ------------------------------------------------------------------------ |
| `article`         | `Article`           | — _(required)_ | The document explored by the header and every panel.                  |
| `previewStrategy` | `SelectionStrategy` | `"replace"` | How a picked similar document affects the preview (relayed to the panel). |

### Outputs

| Name       | Payload   | Description                                            |
| ---------- | --------- | ----------------------------------------------------- |
| `selected` | `Article` | Emitted when the user picks a similar document.        |

## Notes

- The header input is two-way bound to a `linkedSignal` seeded from `SelectionStore.queryText`; pressing **Enter** or the search button writes the trimmed text back to the store, and the clear button empties it.
- Each panel is a standalone component (`article-extracts`, `article-labels`, `article-entities`, `article-similar-documents`) and injects its own root store/service — nothing extra needs to be provided.
- Panels degrade to empty/hidden when their backing data is missing: no extracts → "no relevant extracts"; no labels web service → the labels panel is not rendered; no preview highlights → no entities; the similar-documents lookup (`fetchSimilarDocuments`) needs a backend, so that panel is empty offline.
