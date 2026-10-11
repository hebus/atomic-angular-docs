# Preview

Building blocks for a document preview surface. This page covers `PreviewContentComponent` (the document itself), `PreviewHeaderComponent` (the collapsible metadata panel above it), `PreviewNavigator` (the page-navigation bar), and the toolbar pieces `ZoomControlsComponent`, `FloatingToolbarComponent` and `ConverterSelectComponent`.

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

Renders the previewed document: it resolves the preview through `PreviewService`, loads the converted document in an iframe, and overlays the toolbar (converter select, zoom, highlights) and the page navigator. The iframe content talks to the host through `postMessage` — `ready`, `page-info`, `page-changed` going out, `zoom-*` / `*-page` actions coming in.

The demo below replaces only the backend call of `PreviewService` with a stub, and serves a real HTML document (`/preview-demo-document.html`, three pages with headings, tables and lists) that speaks the same `postMessage` protocol as a converted document. Use the toolbar behind the "…" button to zoom, and the navigator to move between pages.

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

A title, a chevron toggle, and a body whose rows are entirely projected by the caller. Each row is a `<tr>` with a `<th>` (label) and a `<td>` (value): the component renders them as a native two-column table, **key | value**. It starts collapsed — click the title to open it.

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

Compact page-navigation bar: first / previous / next / last buttons around a "go to page" number input. It is self-contained — it reads `PreviewService.totalPages()` and `PreviewService.currentPage()` and calls `firstPage()` / `prevPage()` / `nextPage()` / `lastPage()` / `gotoPage()` on it. Provide a seeded `PreviewService` and the bar renders on its own. Type a page number and press <kbd>Enter</kbd> to jump; the value is clamped to `[1, totalPages]`.

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

The first/previous buttons are disabled on page 1, and the next/last buttons are disabled on the final page. Disabling is derived from the current page relative to the total.

<demo-preview-navigator-boundaries></demo-preview-navigator-boundaries>

### Single page

When there is at most one page, the whole bar hides itself via `[class.invisible]` — navigation would be meaningless. Note that `invisible` keeps the element in the layout (it still reserves its space) rather than removing it.

<demo-preview-navigator-single></demo-preview-navigator-single>

## Zoom controls

Three icon buttons — fit, zoom in, zoom out. The component is purely presentational: it only emits `zoomFit`, `zoomIn` and `zoomOut`, and the host decides what "zoom" means (the iframe via `PreviewService` in `<preview-actions>`, a local CSS `zoom` for the Markdown branch of `<preview-content>`).

<demo-zoom-controls-basic></demo-zoom-controls-basic>

```html
<zoom-controls (zoomFit)="zoomFit()" (zoomIn)="zoomIn()" (zoomOut)="zoomOut()" />
```

## Floating toolbar

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

| Output               | Payload                    | Description                                 |
| -------------------- | -------------------------- | ------------------------------------------- |
| `onLoadedData`       | `PreviewData \| undefined` | The preview data once loaded.               |
| `onConversionSelect` | `CConverter \| undefined`  | Mirrors the conversion currently in effect. |

### PreviewHeaderComponent

Selector: `preview-header` (or `PreviewHeader`, `previewheader`).

| Input   | Type               | Default | Description                                                               |
| ------- | ------------------ | ------- | ------------------------------------------------------------------------- |
| `title` | `string` (required) | —       | The document's title, shown in the always-visible summary.                |

The rows are projected: each `<tr>` must contain exactly one `<th>` (key) and one `<td>` (value). The component has no outputs; it manages its open/collapsed state internally.

### PreviewNavigator

Selector: `preview-navigator`. The component has no inputs or outputs: all state and actions flow through the injected `PreviewService`. It reads `totalPages()` (falls back to `1`) and `currentPage()` (1-based, falls back to `1`), and calls:

| Method             | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `firstPage()`      | Jump to the first page.                                          |
| `prevPage()`       | Go to the previous page.                                         |
| `nextPage()`       | Go to the next page.                                             |
| `lastPage()`       | Jump to the last page.                                           |
| `gotoPage(page)`   | Jump to an explicit page (the input is clamped to `[1, total]`). |

### ZoomControlsComponent

Selector: `zoom-controls`.

| Output    | Payload | Description                |
| --------- | ------- | -------------------------- |
| `zoomFit` | `void`  | The "fit" button was used. |
| `zoomIn`  | `void`  | The "zoom in" button.      |
| `zoomOut` | `void`  | The "zoom out" button.     |

### FloatingToolbarComponent

Selector: `floating-toolbar`.

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
