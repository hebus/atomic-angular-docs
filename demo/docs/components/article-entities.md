# Article Entities

The **entities** found in a document — people, companies, places… — grouped by category, each with the number of times it occurs and a cyclic previous / next navigation to jump from one occurrence to the next in the preview.

It comes in two presentations: the accordion `<article-entities>` below (one collapsible section per category), and the tab content of [Advanced Search Tabs](/components/advanced-search-tabs) (`<article-entities-tab-panel>`, a single tree).

## Imports

```ts
import { ArticleEntities, ArticleEntitiesTabPanel } from "@sinequa/atomic-angular";
```

## Demo

Open a category, then hover a value with a mouse, or **tap it on a tablet**: its `‹ 1 / 12 ›` buttons appear and stay on that row until another one is tapped.

<demo-article-entities-accordion></demo-article-entities-accordion>

```html
<article-entities [article]="article()" />
```

```typescript
// The categories to show come from the preview web service; each one is a field of the article.
inject(AppStore).update({
  webServices: { preview: { name: "preview", webServiceType: "preview", highlights: "company,person" } }
});
```

## Empty state

A panel with nothing in it shows the icon of the feature on a coloured tile, a title and one hint line. This is the tab presentation when no category holds a value:

<demo-article-entities-empty></demo-article-entities-empty>

## API Reference

### ArticleEntities

| Input     | Type      | Default        | Description                                              |
| --------- | --------- | -------------- | -------------------------------------------------------- |
| `article` | `Article` | — _(required)_   | The article whose entity fields (`company`, `person`…) are listed. |

### ArticleEntitiesTabPanel

| Input   | Type             | Default        | Description                                                                    |
| ------- | ---------------- | -------------- | ------------------------------------------------------------------------------ |
| `state` | `EntitiesState`  | — _(required)_   | The panel's state, built by `<advanced-search-tabs>`. Internal to the library. |

## Notes

- The count of a value is the number of occurrences actually highlighted in the preview, not the indexed `count`, once the preview is loaded.
- The accordion shows nothing for a category without value. `<advanced-search-tabs>` mounts the Entities tab only once a category has one, so the tab panel's empty state is for a host that mounts the panel on its own.
- In the tab presentation, a **tap on a row** marks it as the active one on a touch screen, and the keyboard legend is hidden there. <kbd>Ctrl</kbd> + <kbd>←</kbd> / <kbd>→</kbd> step through the occurrences from the keyboard.
