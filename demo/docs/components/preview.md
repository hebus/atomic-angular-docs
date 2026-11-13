# Preview

Building blocks for a document preview surface. This page covers `PreviewContentComponent` (the document itself), `PreviewHeaderComponent` (the title, actions and metadata above it), `PreviewNavigator` (the page navigation), and the pieces of the action bar: `ZoomControlsComponent` and `ConverterSelectComponent` (`FloatingToolbarComponent`, which the bar used to hide behind, is deprecated).

## Imports

```ts
import {
  PreviewContentComponent,
  PreviewHeaderComponent,
  PreviewNavigator,
  ZoomControlsComponent,
  FloatingToolbarComponent,
  ConverterSelectComponent
} from "@sinequa/atomic-angular";
```

## Preview content

Renders the previewed document: it resolves the preview through `PreviewService`, loads the converted document in an iframe, and shows the action bar above it (the find field, converter select, highlights, zoom, page navigation) on the grey desk the document sits on. The iframe content talks to the host through `postMessage` — `ready`, `page-info`, `page-changed` going out, `zoom-*` / `*-page` actions coming in.

The demo below replaces only the backend call of `PreviewService` with a stub, and serves a real HTML document (`/preview-demo-document.html`, three pages with headings, tables and lists) that speaks the same `postMessage` protocol as a converted document. Use the buttons of the bar to zoom and to move between pages, and type in the "Find text…" field to open its results panel.

<demo-preview-content-basic></demo-preview-content-basic>

```html
<preview-content [article]="article" />
```

```typescript
// Stub only the backend call: the real service still handles the iframe messages.
@Service()
class DemoPreviewService extends PreviewService {
  override preview(): Observable<PreviewData> {
    const data = { documentCachedContentUrl: "/preview-demo-document.html", conversions: [] } as unknown as PreviewData;
    this.setPreviewData(data);
    return of(data);
  }
}

@Component({
  imports: [PreviewContentComponent],
  providers: [{ provide: PreviewService, useClass: DemoPreviewService }],
  template: `<preview-content class="h-[32rem]" [article]="article" />`
})
export class DemoPreviewContent {}
```

## Preview header

The header of a document preview: the title (a link when you give it an `href`), the actions of the document next to it, a few always-visible lines of metadata, and the rest behind a **More details** toggle. Everything but the title is projected, so the caller decides what the document shows:

| Slot                  | What goes there                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `[slot='icon']`       | The document-type icon, before the title.                                                                                |
| `[slot='actions']`    | The buttons at the end of the title row (bookmark, close, a menu…). Each icon-only button needs its own accessible name. |
| `<tr slot="summary">` | The lines that are always visible, under the title.                                                                      |
| any other `<tr>`      | The lines behind **More details**, which is not there when there are none.                                               |

Each row is a `<tr>` with a `<th>` (label) and a `<td>` (value): the component renders them as a native two-column table, **key | value**.

<demo-preview-header-actions></demo-preview-header-actions>

```html
<preview-header [title]="article.title" [href]="article.url" (titleClick)="open($event)">
  <file-text-icon slot="icon" />
  <ng-container slot="actions">
    <button variant="tertiary" scheme="neutral" [iconOnly]="true" size="sm" aria-label="Close the preview" (click)="close()">
      <x-mark-icon />
    </button>
  </ng-container>
  <tr slot="summary">
    <th>Date:</th>
    <td>{{ article.modified }}</td>
  </tr>
  <tr>
    <th>Author</th>
    <td><metadata [article]="article" metadata="authors" /></td>
  </tr>
</preview-header>
```

`titleClick` fires with the click event: call `preventDefault()` to open the document your own way (an audit event, a custom viewer). Without an `href` the title is plain text. A header with only plain rows, like below, shows the title and the **More details** toggle.

<demo-preview-header-basic></demo-preview-header-basic>

```html
<preview-header [title]="article.title">
  <tr>
    <th>Type</th>
    <td>{{ article.docformat }}</td>
  </tr>
  <tr>
    <th>Author</th>
    <td><metadata [article]="article" metadata="authors" /></td>
  </tr>
</preview-header>
```

## Shared columns

The key column is sized to the longest key, the value column takes the remaining width, and both are shared by every row — values stay aligned whatever the key lengths. A multi-line value keeps its key on the first line, and a conditional row is a plain `@if` around a `<tr>`.

<demo-preview-header-alignment></demo-preview-header-alignment>

```html
<preview-header [title]="article.title">
  <tr>
    <th>Last modification date</th>
    <td>{{ article.modified }}</td>
  </tr>
  @if (showSummary()) {
    <tr>
      <th>Summary</th>
      <td>{{ article.summary }}</td>
    </tr>
  }
</preview-header>
```

## Preview navigator

Page navigation: previous / next buttons and a "go to page" number input, with the total next to it. The first and the last page are one key away in the input: <kbd>Home</kbd> and <kbd>End</kbd>. It is self-contained — it reads `PreviewService.totalPages()` and `PreviewService.currentPage()` and calls `firstPage()` / `prevPage()` / `nextPage()` / `lastPage()` / `gotoPage()` on it. Provide a seeded `PreviewService` and the bar renders on its own. Type a page number and press <kbd>Enter</kbd> to jump; the value is clamped to `[1, totalPages]`.

<demo-preview-navigator-basic></demo-preview-navigator-basic>

```html
<preview-navigator />
```

```typescript
// The navigator has no inputs — it reflects the PreviewService page state.
preview.totalPages.set(12);
preview.currentPage.set(3);
```

### Boundary states

The previous button is disabled on page 1, and the next button is disabled on the final page. Disabling is derived from the current page relative to the total (`isFirstPage` / `isLastPage` on `PreviewService`).

<demo-preview-navigator-boundaries></demo-preview-navigator-boundaries>

### Single page

When there is at most one page, the navigator is removed from the layout (`display: none`) — navigation would be meaningless, and it leaves no gap in the row.

<demo-preview-navigator-single></demo-preview-navigator-single>

## Zoom controls

Three icon buttons — zoom out, zoom in, fit. The component is purely presentational: it only emits `zoomOut`, `zoomIn` and `zoomFit`, and the host decides what "zoom" means (the iframe via `PreviewService` in `<preview-actions>`, a local CSS `zoom` for the Markdown branch of `<preview-content>`).

<demo-zoom-controls-basic></demo-zoom-controls-basic>

```html
<zoom-controls (zoomOut)="zoomOut()" (zoomIn)="zoomIn()" (zoomFit)="zoomFit()" [canZoomIn]="canZoomIn()" [canZoomOut]="canZoomOut()" />
```

Set `canZoomOut` / `canZoomIn` to `false` once the zoom reached its bound: the matching button is disabled. Fit stays available, as the way back.

## Floating toolbar

**Deprecated**: the document preview no longer uses it — its actions sit in a fixed bar above the document, where they are all in view. It stays for hosts that built their own toolbar on it.

Projected content stays tucked behind a single "…" trigger, so it takes almost no space over the document. It opens on hover or click, and closes on a second click or shortly after the pointer leaves it. `collapsed` is emitted on every collapse, which lets the host close popovers opened from the projected content (they render in the top layer and would otherwise outlive the toolbar).

<demo-floating-toolbar-basic></demo-floating-toolbar-basic>

```html
<floating-toolbar (collapsed)="closePopovers()">
  <zoom-controls />
  <button variant="tertiary" size="sm">Action</button>
</floating-toolbar>
```

## Converter select

Dropdown that lets the user pick which converter/format to preview. Options are the `general.converters` configured with `display: true` that match an entry of `previewData.conversions`; defaults come first, then primaries. It renders only when the `previewMultiConversion` feature is on and at least one option matches — otherwise the host is hidden and leaves no gap.

<demo-converter-select-basic></demo-converter-select-basic>

```html
<converter-select
  [previewData]="previewData()"
  [activeConversion]="conversion()"
  (onConversionSelect)="conversion.set($event)" />
```

```typescript
// Configuration read from the app store (general section of the Mint custom JSON)
general: {
  features: { previewMultiConversion: true },
  converters: [
    { converter: "html", format: "html", name: "HTML", display: true, default: true },
    { converter: "pdf", format: "pdf", name: "PDF", display: true, primary: true }
  ]
}
```

## API Reference

### PreviewContentComponent

Selector: `preview-content`.

| Input               | Type                   | Default | Description                                                                            |
| ------------------- | ---------------------- | ------- | -------------------------------------------------------------------------------------- |
| `article`           | `Article \| undefined` | —       | The article to preview. When undefined, the selection store's current article is used. |
| `showSearchActions` | `boolean`              | `true`  | `false` hides the search-in-document trigger.                                          |
| `showActions`       | `boolean`              | `true`  | `false` hides the whole action bar above the document.                                 |

| Output               | Payload                    | Description                                 |
| -------------------- | -------------------------- | ------------------------------------------- |
| `onLoadedData`       | `PreviewData \| undefined` | The preview data once loaded.               |
| `onConversionSelect` | `CConverter \| undefined`  | Mirrors the conversion currently in effect. |

### PreviewHeaderComponent

Selector: `preview-header` (or `PreviewHeader`, `previewheader`).

| Input   | Type                | Default | Description                                             |
| ------- | ------------------- | ------- | ------------------------------------------------------- |
| `title` | `string` (required) | —       | The document's title.                                   |
| `href`  | `string`            | —       | Where the title links to. Without one it is plain text. |

| Output       | Payload      | Description                                                                   |
| ------------ | ------------ | ----------------------------------------------------------------------------- |
| `titleClick` | `MouseEvent` | The title was clicked. Call `preventDefault()` to open the document yourself. |

The rows are projected: each `<tr>` must contain exactly one `<th>` (key) and one `<td>` (value). `<tr slot="summary">` rows are always visible; any other row is behind **More details**. The icon goes in `[slot='icon']`, the actions in `[slot='actions']`.

### PreviewNavigator

Selector: `preview-navigator`. The component has no inputs or outputs: all state and actions flow through the injected `PreviewService`. It reads `totalPages()`, `currentPage()` (1-based, following the reader's scroll), `isFirstPage()` and `isLastPage()`, and calls:

| Method           | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `firstPage()`    | Jump to the first page (<kbd>Home</kbd> in the input).           |
| `prevPage()`     | Go to the previous page.                                         |
| `nextPage()`     | Go to the next page.                                             |
| `lastPage()`     | Jump to the last page (<kbd>End</kbd> in the input).             |
| `gotoPage(page)` | Jump to an explicit page (the input is clamped to `[1, total]`). |

### ZoomControlsComponent

Selector: `zoom-controls`.

| Input        | Type      | Default | Description                                         |
| ------------ | --------- | ------- | --------------------------------------------------- |
| `canZoomIn`  | `boolean` | `true`  | `false` disables the zoom-in button (upper bound).  |
| `canZoomOut` | `boolean` | `true`  | `false` disables the zoom-out button (lower bound). |

| Output    | Payload | Description                |
| --------- | ------- | -------------------------- |
| `zoomFit` | `void`  | The "fit" button was used. |
| `zoomIn`  | `void`  | The "zoom in" button.      |
| `zoomOut` | `void`  | The "zoom out" button.     |

### FloatingToolbarComponent

Selector: `floating-toolbar`. Deprecated, see above.

| Output      | Payload | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| `collapsed` | `void`  | Emitted whenever the toolbar collapses (never on mount). |

### ConverterSelectComponent

Selector: `converter-select`.

| Input              | Type                       | Default | Description                                                                   |
| ------------------ | -------------------------- | ------- | ----------------------------------------------------------------------------- |
| `previewData`      | `PreviewData \| undefined` | —       | Loaded preview data, whose `conversions` are matched against the converters.  |
| `activeConversion` | `CConverter \| undefined`  | —       | Conversion already active upstream, used to re-sync the selection on remount. |

| Output               | Payload                   | Description                                     |
| -------------------- | ------------------------- | ----------------------------------------------- |
| `onConversionSelect` | `CConverter \| undefined` | The selected converter, when the feature is on. |

## Notes

- Each row must contain exactly one `<th>` and one `<td>`. Don't change a cell's `display` (e.g. `inline-flex` on the `<td>`): it leaves the table layout and adds a third column. Put the layout on a `<div>` inside the cell.
- Which fields to show, and what renders them, is up to the host app — two apps can project different rows into the same header.
- The navigator is invisible whenever `totalPages() <= 1`. Its number input accepts digits only (`pattern="\d+"`).
- In the real app `PreviewService` relays every navigation action to the preview iframe via `postMessage` and updates `currentPage` / `totalPages` from the iframe's `page-info` / `page-changed` messages.
