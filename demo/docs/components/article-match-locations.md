# Article Match Locations

The **Snippet** panel: the terms of the user's search that were found in the previewed document, each with the number of times it occurs and a cyclic previous / next navigation to jump from one occurrence to the next in the preview.

It is fully driven by `PreviewService` (the preview data it holds), so it needs no input. It comes in two presentations: the accordion `<article-match-locations>` below, and the tab content of [Advanced Search Tabs](/components/advanced-search-tabs) (`<article-match-locations-tab-panel>`).

## Imports

```ts
import { ArticleMatchLocations, ArticleMatchLocationsTabPanel } from "@sinequa/atomic-angular";
```

## Demo

Open the **Search terms** section, then hover a term with a mouse, or **tap it on a tablet**: its `‹ 1 / 5 ›` buttons appear and stay on that row until another one is tapped. The rows are taller, with larger text, on a touch screen, and the keyboard-shortcut legend of the tab presentation is hidden there.

<demo-article-match-locations-accordion></demo-article-match-locations-accordion>

```html
<article-match-locations />
```

```typescript
// The panel reads the preview data of the PreviewService: in a real application it is set by <preview-content>.
inject(PreviewService).setPreviewData(previewData);
```

## Empty states

A panel with nothing in it shows the icon of the feature on a coloured tile, a title and one hint line. The tab presentation always says why it is empty:

- **No search yet** — the user has not typed anything:

<demo-article-match-locations-no-search></demo-article-match-locations-no-search>

- **No match** — there is a search, and the document does not contain it:

<demo-article-match-locations-no-match></demo-article-match-locations-no-match>

```html
<article-match-locations-tab-panel [state]="state" [queryText]="queryText()" />
```

## API Reference

### ArticleMatchLocations

This component has no input: it reads `PreviewService`.

### ArticleMatchLocationsTabPanel

| Input       | Type                   | Default        | Description                                                                                  |
| ----------- | ---------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `state`     | `MatchLocationsState`  | — _(required)_   | The panel's state, built by `<advanced-search-tabs>`. Internal to the library.               |
| `queryText` | `string`               | `""`           | The text being searched for: tells an empty panel "no search yet" from "no match".           |

## Notes

- The accordion hides itself while there is no match. The tab presentation stays and shows its empty state, so the Snippet tab always says something.
- On a touch screen nothing hovers, so a **tap on a row** marks it as the active one (the pretend `mouseenter` a browser fires at a tap is ignored). The tab presentation also keeps the keyboard behaviour: the buttons show on focus, and <kbd>Ctrl</kbd> + <kbd>←</kbd> / <kbd>→</kbd> step through the occurrences.
