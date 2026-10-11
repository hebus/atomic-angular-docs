# Document Locator

Renders the breadcrumb-like path of a document inside a result list. Reads the `treepath` of an `Article` and turns each segment into a clickable link that adds a filter on the matching aggregation. When the container is too narrow, leading segments collapse into an overflow menu.

## Imports

```ts
import { DocumentLocatorComponent } from "@sinequa/atomic-angular";
```

## Demo

The component requires an `Article` (for `treepath` + `collection`) and the name of the tree-aggregation that backs the filter. Selecting a segment patches `QueryParamsStore` and navigates with the new `f` query param.

<demo-document-locator-basic></demo-document-locator-basic>

```html
<document-locator [article]="article" aggregation="Sources" />
```

```typescript
const article = {
  id: "demo-doc",
  title: "Demo document",
  treepath: ["/Intranet/Marketing/Campaigns/Q4-2025/"],
  collection: ["/Intranet/"]
} as Article;
```

## Overflow behavior

A `ResizeObserver` measures the segments and moves the leading ones into a menu when they would overflow the host width. A `chevron` separator and a `…` trigger button appear only when there are hidden segments.

<demo-document-locator-overflow></demo-document-locator-overflow>

```html
<div class="w-[400px]">
  <document-locator [article]="article" aggregation="Sources" />
</div>
```

## API Reference

### Inputs

| Name          | Type      | Default | Description                                                                 |
| ------------- | --------- | ------- | --------------------------------------------------------------------------- |
| `article`     | `Article` | —       | The document whose `treepath[0]` is rendered as segments.                   |
| `aggregation` | `string`  | —       | The name of the aggregation (typically a tree column) used to add filters. |

## Notes

- The first segment of the `treepath` is dropped (it's the root collection name) and the trailing empty segment is also stripped.
- Selecting a segment writes a value such as `/Intranet/Marketing/*` to the matching filter via `QueryParamsStore.updateFilter`, then navigates with `queryParamsHandling: "merge"`.
- The aggregation must be registered in `AggregationsStore` — otherwise the click is a no-op and a warning is logged.
