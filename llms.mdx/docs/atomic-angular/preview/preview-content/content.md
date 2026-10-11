# Preview Content (/docs/atomic-angular/preview/preview-content)

Render a document's converted preview in an iframe — with zoom, search-in-document, highlights, an AI-description toggle, and a Markdown fallback — from a single drop-in component.



`<preview-content>` is the whole document preview surface: it loads the previewed document, picks the right
rendering path (a converted-document iframe, or a Markdown fallback when no conversion is available), and
layers the toolbar (`<preview-actions>`) and page navigator (`<preview-navigator>`) on top.

<Callout title="Concept — conversion">
  A Sinequa index can store more than one rendered form of a document — its **conversions** (a PDF-like page
  image, a Markdown extraction, a multi-format bundle). `<preview-content>` resolves which conversion is active
  and swaps its whole rendering strategy (iframe vs. Markdown) based on it — this is not a cosmetic detail, the
  markdown branch skips the iframe and `<preview-actions>`'s search/highlights entirely.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="preview-content-basic" title="A document preview panel">
  <Lang value="angular">
    ```ts title="document-preview.component.ts"
    import { Component, input } from "@angular/core";
    import { PreviewContentComponent } from "@sinequa/atomic-angular";
    import type { Article, PreviewData } from "@sinequa/atomic";

    @Component({
      selector: "document-preview",
      imports: [PreviewContentComponent],
      template: `<preview-content [article]="article()" (onLoadedData)="onLoaded($event)" class="h-full" />`,
    })
    export class DocumentPreviewComponent {
      readonly article = input<Article>();

      protected onLoaded(data: PreviewData | undefined) {
        console.log("Preview loaded:", data?.record?.title);
      }
    }
    ```
  </Lang>
</CodeSample>

Leave `article` unset to preview whatever the shared selection store currently holds — the common case when
`<preview-content>` sits in a side panel or a route that reacts to document selection elsewhere on the page.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Start[&#x22;previewDataResource loads&#x22;] --> Markdown{&#x22;isMarkdown()?&#x22;}
    Markdown -->|&#x22;yes&#x22;| MD[&#x22;Render markdown pipe + local CSS zoom\n(no preview-actions, no iframe)&#x22;]
    Markdown -->|&#x22;no&#x22;| Validate[&#x22;previewValidationResource HEAD-checks the cached URL&#x22;]
    Validate -->|&#x22;valid&#x22;| Iframe[&#x22;iframe + preview-actions + preview-navigator&#x22;]
    Validate -->|&#x22;invalid&#x22;| Unavailable[&#x22;Preview unavailable&#x22;]"
/>

The iframe stays hidden behind a spinner overlay until it posts a `ready` message back (its own layout has
settled) — only then does the component scroll it to the requested page and reveal it, so the user never sees
the intermediate scroll jump. A `current-page` message keeps `<preview-navigator>` in sync as the user scrolls
or pages manually inside the iframe.

## Recipes [#recipes]

### Hide search-in-document in a narrow host [#hide-search-in-document-in-a-narrow-host]

`showSearchActions` reaches all the way down to `<preview-actions>`'s own `showSearch` input — set it once here
rather than wrapping the nested component yourself.

<CodeSample id="preview-content-narrow" title="A preview embedded in a resizable side panel">
  <Lang value="angular">
    ```ts title="side-panel-preview.component.ts"
    import { Component, input } from "@angular/core";
    import { PreviewContentComponent } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "side-panel-preview",
      imports: [PreviewContentComponent],
      template: `<preview-content [article]="article()" [showSearchActions]="false" class="h-full" />`,
    })
    export class SidePanelPreviewComponent {
      readonly article = input<Article>();
    }
    ```
  </Lang>
</CodeSample>

### Mirror the active conversion in a parent badge [#mirror-the-active-conversion-in-a-parent-badge]

`onConversionSelect` fires whenever the active conversion changes (including the very first auto-selection),
so a parent can mirror it without owning any conversion state of its own.

<CodeSample id="preview-content-conversion-badge" title="A &#x22;primary format&#x22; badge next to the preview">
  <Lang value="angular">
    ```ts title="preview-with-badge.component.ts"
    import { Component, input, signal } from "@angular/core";
    import { PreviewContentComponent } from "@sinequa/atomic-angular";
    import type { CConverter } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "preview-with-badge",
      imports: [PreviewContentComponent],
      template: `
        @if (activeConverter(); as converter) {
          <span class="badge">{{ converter.display ?? converter.format }}</span>
        }
        <preview-content [article]="article()" (onConversionSelect)="activeConverter.set($event)" class="h-full" />
      `,
    })
    export class PreviewWithBadgeComponent {
      readonly article = input<Article>();
      protected readonly activeConverter = signal<CConverter | undefined>(undefined);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  article: {
    type: &#x22;Article | undefined&#x22;,
    description: &#x22;The document to preview. Left unset, falls back to the shared selection store's current article.&#x22;,
  },
  showSearchActions: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;Forwarded to preview-actions' showSearch — hides the search-in-document trigger/popover. Zoom and highlights stay unaffected.&#x22;,
  },
  class: { type: &#x22;string&#x22;, description: &#x22;Standard host class — the host itself carries display: block.&#x22; },
}"
/>

### Outputs [#outputs]

<TypeTable
  type="{
  onLoadedData: { type: &#x22;OutputEmitterRef<PreviewData | undefined>&#x22;, description: &#x22;Emits once the preview data has loaded (or failed, as undefined).&#x22; },
  onConversionSelect: { type: &#x22;OutputEmitterRef<CConverter | undefined>&#x22;, description: &#x22;Mirrors the conversion selected inside preview-actions' converter dropdown.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="There is no [conversion] input to set the active conversion from outside">
    Unlike what an older revision of this documentation claimed, `<preview-content>` has no `conversion` input.
    The active conversion is picked internally — auto-selected on load (defaults and primaries sorted first), then
    overridden once the user picks one in `<preview-actions>`'s converter dropdown, which lives several levels
    down inside this component. Read it back through `(onConversionSelect)` if a parent needs to display it;
    nothing feeds a value back in.
  </Accordion>

  <Accordion title="The preview never loads, silently, in an app with more than one web service">
    The preview resolves its query name from `?n=` in the URL, then from the route's data, then falls back to the
    app's default query — in that order. If your route shape does not carry a `wsName` where the library expects
    it, the preview silently asks the wrong (or no) web service for the document: the error interceptor
    deliberately skips the toast for the preview endpoint, and the failure is swallowed to release the loading
    spinner. Check the current route's query name matches the tab actually being previewed.
  </Accordion>

  <Accordion title="The AI-description toggle never shows up, even though I want it everywhere">
    It is not exposed as an input — it appears only when the currently active conversion is the **primary** one
    *and* the previewed article's own `flags` include `"ps"`. There is no way to force it on for a document that
    does not carry that flag.
  </Accordion>

  <Accordion title="Switching to a Markdown conversion loses search-in-document and highlights">
    Expected: the Markdown branch renders the raw content through the `markdown` pipe directly into a `<div>`, not
    into `preview.js`'s instrumented iframe — so nothing there can `postMessage` a search or a highlight toggle.
    Only the converter dropdown and a locally-reimplemented zoom (CSS `zoom`, not the iframe's transform-based one)
    survive on that branch.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Preview Actions" href="./preview-actions.mdx">
    The toolbar nested inside — converter dropdown, zoom, search-in-document, highlights.
  </Card>

  <Card title="Preview Header" href="./preview-header.mdx">
    A collapsible metadata panel to place above the preview.
  </Card>

  <Card title="Preview service" href="./preview.mdx">
    The service both components delegate to — fetch, close, zoom, pagination.
  </Card>
</Cards>
