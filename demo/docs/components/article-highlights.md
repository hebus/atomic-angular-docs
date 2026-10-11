# Article Highlights

Side panel that lists the **highlight categories** of a previewed document and lets the user
activate/deactivate each one. Each category shows a colored swatch, a live occurrence count and
cyclic prev/next navigation. Toggling a category off removes its highlight background in the preview
iframe; navigating selects the next/previous occurrence of that category.

It complements the coarse, all-extracts / all-entities toggle by offering **per-category** control —
the Angular equivalent of the React preview legend.

## Imports

```ts
import { ArticleHighlights } from "@sinequa/atomic-angular";
```

## Demo

The component only needs a `PreviewData` carrying `highlightsPerCategory`. Here it is fully mocked
(`company`, `person`, `geo`, `matchingpassages`) so it renders offline. There is no live preview
iframe, so the `highlight`/`select` messages the component emits are harmless no-ops; the readout
below the panel reflects the active categories.

<demo-article-highlights-basic></demo-article-highlights-basic>

```html
<article-highlights
  [previewData]="previewData()"
  (activeCategoriesChange)="onActiveChange($event)" />
```

```typescript
// PreviewData is returned by PreviewService.preview(...) — in a real app it comes from the
// same resource that feeds the preview iframe (see preview-content in the host application).
const previewData = signal(myPreviewData);

function onActiveChange(active: string[]): void {
  console.log("active categories:", active);
}
```

## API Reference

### Inputs

| Name          | Type          | Default        | Description                                               |
| ------------- | ------------- | -------------- | --------------------------------------------------------- |
| `previewData` | `PreviewData` | — _(required)_ | Preview data whose `highlightsPerCategory` drives the list. |

### Outputs

| Name                     | Payload    | Description                                                     |
| ------------------------ | ---------- | -------------------------------------------------------------- |
| `activeCategoriesChange` | `string[]` | The active category keys, emitted whenever a category is toggled. |

## Notes

- Categories come from `PreviewData.highlightsPerCategory` — **both** entity types (company, person,
  geo…) and extract types (matchingpassages, extractslocations…). Categories with no occurrence are
  hidden.
- Colors come from the `HIGHLIGHTS` injection token; categories absent from the token fall back to a
  built-in palette.
- Toggling drives the preview iframe through `PreviewService.sendMessage({ action: "highlight", … })`,
  which replaces the whole active highlight set — so the component composes the active list
  client-side. Deactivating a category also sends `{ action: "unselect" }` to clear a lingering
  selection.
- Per-category navigation sends `{ action: "select", id: "<category>_<index>" }`; `matchingpassages`
  uses the passage highlighter. Navigation is disabled while a category is inactive.
- All categories start active; the component emits `activeCategoriesChange` only on a user toggle.
