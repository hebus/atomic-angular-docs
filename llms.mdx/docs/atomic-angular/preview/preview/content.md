# Preview service (/docs/atomic-angular/preview/preview)

Fetch a document's preview data, drive its zoom and pagination, and toggle its highlights — the service every preview component delegates to.



`PreviewService` is what `<preview-content>` and `<preview-actions>` both delegate to: fetching the preview
data for a document, talking to the preview iframe through `postMessage`, and tracking zoom/page/highlight
state. Inject it directly only when building a preview surface that does not compose the existing components.

## Minimal example [#minimal-example]

<CodeSample id="preview-service-basic" title="Fetching and closing a preview manually">
  <Lang value="angular">
    ```ts title="manual-preview.component.ts"
    import { Component, inject } from "@angular/core";
    import { PreviewService } from "@sinequa/atomic-angular";

    @Component({
      selector: "manual-preview",
      template: `<button (click)="open('doc-42')">Open preview</button>`,
    })
    export class ManualPreviewComponent {
      private readonly previewService = inject(PreviewService);

      protected open(id: string) {
        this.previewService.preview(id, { name: "my-query", text: "" }).subscribe(data => {
          console.log("Preview loaded:", data.record?.title);
        });
      }
    }
    ```
  </Lang>
</CodeSample>

## Recipes [#recipes]

### Paginate a multi-page conversion [#paginate-a-multi-page-conversion]

`gotoPage`/`nextPage`/`prevPage`/`firstPage`/`lastPage` all message the iframe directly; `currentPage` and
`totalPages` are signals a toolbar can read to render page numbers.

<CodeSample id="preview-service-pagination" title="A page-number readout with next/previous buttons">
  <Lang value="angular">
    ```ts title="page-controls.component.ts"
    import { Component, inject } from "@angular/core";
    import { PreviewService } from "@sinequa/atomic-angular";

    @Component({
      selector: "page-controls",
      template: `
        <button (click)="previewService.prevPage()">Previous</button>
        <span>{{ previewService.currentPage() }} / {{ previewService.totalPages() }}</span>
        <button (click)="previewService.nextPage()">Next</button>
      `,
    })
    export class PageControlsComponent {
      protected readonly previewService = inject(PreviewService);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  &#x22;preview(id, q, customHighlights?, audit?)&#x22;: {
    type: &#x22;(id: string, q: Partial<Query>, customHighlights?: CustomHighlights[], audit?: AuditEvents) => Observable<PreviewData>&#x22;,
    description: &#x22;Fetches preview data for a document.&#x22;,
  },
  &#x22;close(id, query)&#x22;: { type: &#x22;(id: string, query: Partial<Query>) => void&#x22;, description: &#x22;Closes a preview and updates the audit log.&#x22; },
  &#x22;openExternal(article)&#x22;: { type: &#x22;(article: Article) => void&#x22;, description: &#x22;Opens an article's preview in a new browser tab.&#x22; },
  &#x22;zoomFit() · zoomIn() · zoomOut()&#x22;: { type: &#x22;() => void&#x22;, description: &#x22;Message the iframe to fit/zoom the current page.&#x22; },
  &#x22;gotoPage(page) · nextPage() · prevPage() · firstPage() · lastPage()&#x22;: {
    type: &#x22;(page?: number) => void&#x22;,
    description: &#x22;Page navigation inside a multi-page conversion, driven through postMessage.&#x22;,
  },
  &#x22;toggle(extracts, entities)&#x22;: { type: &#x22;(extracts: boolean, entities: boolean) => void&#x22;, description: &#x22;Toggles extract and entity highlight categories in the preview.&#x22; },
  &#x22;toggleAIDescription(enabled)&#x22;: { type: &#x22;(enabled: boolean) => void&#x22;, description: &#x22;Enables or disables the AI-generated page description overlay.&#x22; },
  &#x22;totalPages · currentPage&#x22;: { type: &#x22;Signal<number>&#x22;, description: &#x22;Current pagination state, read-only from outside the service.&#x22; },
}"
/>

Lower-level, for a custom preview surface: `setIframe(iframe)` registers the iframe window the service talks
to; `setPreviewData(data)` updates the active highlight category from freshly-loaded data; `sendMessage(msg)`
posts an arbitrary message; `retrieveHtmlContent(id, highlightCategory, previewData)` asks the iframe for a
highlight category's HTML.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Calling zoomFit()/nextPage()/toggle() before the iframe has loaded does nothing">
    Every one of these methods `postMessage`s the iframe registered through `setIframe()` — `<preview-content>`
    does that registration for you once its own iframe mounts. Called before any iframe is registered (or while
    the previous document's iframe is still tearing down), the message has nowhere to go and is silently dropped;
    there is no queueing or replay.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Preview Content" href="./preview-content.mdx">
    The component that wires this service to a real iframe.
  </Card>

  <Card title="Text Chunk" href="./text-chunk.mdx">
    Fetch surrounding-context text chunks for a set of highlight locations.
  </Card>
</Cards>
