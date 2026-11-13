# Article Similar Documents

The documents that **resemble** the previewed one, with the icon of their source. Choosing one emits it, so the host opens it or replaces the preview.

It comes in two presentations: the accordion `<article-similar-documents>` below, and the tab content of [Advanced Search Tabs](/components/advanced-search-tabs) (`<article-similar-documents-tab-panel>`).

## Imports

```ts
import { ArticleSimilarDocuments, ArticleSimilarDocumentsTabPanel } from "@sinequa/atomic-angular";
```

## Demo

By default the panel fetches the similar documents of the article from the backend. Here they are given through the controlled `[documents]` input, so it renders offline.

<demo-article-similar-documents-accordion></demo-article-similar-documents-accordion>

```html
<article-similar-documents
  [article]="article()"
  [documents]="documents()"
  (selected)="open($event)" />
```

## Empty state

A panel with nothing in it shows the icon of the feature on a coloured tile, a title and one hint line. This is the tab presentation given no document:

<demo-article-similar-documents-empty></demo-article-similar-documents-empty>

```html
<article-similar-documents-tab-panel [article]="article()" [state]="state" />
```

## API Reference

### ArticleSimilarDocuments

| Input       | Type                           | Default        | Description                                                                              |
| ----------- | ------------------------------ | -------------- | ---------------------------------------------------------------------------------------- |
| `article`   | `Article`                      | — _(required)_   | The article whose similar documents are listed; its collection and connector give the icon. |
| `strategy`  | `SelectionStrategy`            | `"replace"`    | What choosing a document does to the preview.                                            |
| `documents` | `Article[] \| undefined`       | `undefined`    | Controlled documents: when set, they are listed and nothing is fetched.                  |

| Output     | Payload   | Description                       |
| ---------- | --------- | --------------------------------- |
| `selected` | `Article` | The document that was chosen.     |

### ArticleSimilarDocumentsTabPanel

| Input      | Type                     | Default        | Description                                                                    |
| ---------- | ------------------------ | -------------- | ------------------------------------------------------------------------------ |
| `article`  | `Article`                | — _(required)_   | The article, for the source icon.                                              |
| `strategy` | `SelectionStrategy`      | `"replace"`    | What choosing a document does to the preview.                                  |
| `state`    | `SimilarDocumentsState`  | — _(required)_   | The panel's state, built by `<advanced-search-tabs>`. Internal to the library. |

| Output     | Payload   | Description                       |
| ---------- | --------- | --------------------------------- |
| `selected` | `Article` | The document that was chosen.     |

## Notes

- The accordion hides itself while there is no document: they are fetched, and an empty section would flash before they arrive. `<advanced-search-tabs>` mounts the tab only once there is one, so the tab panel's empty state is for a host that mounts the panel on its own.
