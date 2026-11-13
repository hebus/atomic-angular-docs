# Article Extracts

The most relevant **passages** of a document for the user's search. Choosing one scrolls the preview to it.

It comes in two presentations: the accordion `<article-extracts>` below, and the tab content of [Advanced Search Tabs](/components/advanced-search-tabs) (`<article-extracts-tab-panel>`).

## Imports

```ts
import { ArticleExtracts, ArticleExtractsTabPanel } from "@sinequa/atomic-angular";
```

## Demo

The extracts of a document are read from `ApplicationStore`, under the id of the article. While the preview loads, the panel shows loading dots. Open the **extracts** section (the accordions of a page are exclusive: opening one closes the other).

<demo-article-extracts-accordion></demo-article-extracts-accordion>

```html
<article-extracts [article]="article()" />
```

```typescript
// In a real application the extracts come with the search results.
inject(ApplicationStore).updateExtracts(article.id, extracts);
```

## Empty states

A panel with nothing in it shows the icon of the feature on a coloured tile, a title and one hint line. Here no extract is stored for the article, in the accordion:

<demo-article-extracts-empty></demo-article-extracts-empty>

and in the tab presentation:

<demo-article-extracts-tab-empty></demo-article-extracts-tab-empty>

## API Reference

### ArticleExtracts

| Input     | Type      | Default        | Description                                       |
| --------- | --------- | -------------- | ------------------------------------------------- |
| `article` | `Article` | — _(required)_   | The article whose extracts are listed, by its id. |

### ArticleExtractsTabPanel

| Input   | Type             | Default        | Description                                                                    |
| ------- | ---------------- | -------------- | ------------------------------------------------------------------------------ |
| `state` | `ExtractsState`  | — _(required)_   | The panel's state, built by `<advanced-search-tabs>`. Internal to the library. |

## Notes

- The panel is only "loading" while the preview is being fetched (`PreviewService.events() === "fetching"`): the empty state shows once it is done and nothing was found, never before.
- Choosing an extract (click, <kbd>Enter</kbd> or <kbd>Space</kbd>) sends a `select` message to the preview iframe, with the passage highlighter.
