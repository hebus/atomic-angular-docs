# Preview a document (/docs/atomic-angular/workspaces/preview-a-document)

Show the converted copy of a workspace document in a frame, with a zoom, a find-in-text box and an "Ask follow-up" action.



`<document-preview-panel>` previews one document. `<workspace-detail>` opens it beside the list when a document is
chosen; use the panel on its own to preview a `WorkspaceDocument` anywhere else.

## Minimal example [#minimal-example]

<CodeSample id="preview-a-document-basic" title="A panel for one document">
  <Lang value="angular">
    ```ts title="preview.component.ts"
    import { Component } from "@angular/core";
    import { AskFollowUp, DocumentPreviewPanel, type WorkspaceDocument } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "preview-example",
      imports: [DocumentPreviewPanel],
      template: `
        <document-preview-panel class="h-[40rem] w-[28rem]" [document]="document" (closed)="close()" (askFollowUp)="ask($event)" />
      `,
    })
    export class PreviewExample {
      document!: WorkspaceDocument;

      close() {}

      ask(followUp: AskFollowUp) {
        console.log(followUp.title);
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

The panel asks the preview web service for the document by id, as a search application does, and shows the converted
copy the service points at in a frame. Until the backend hands out the index id for an uploaded document (the listing
carries the upload-side id) the service answers an error — the panel then says the document cannot be previewed,
rather than showing a stand-in.

Finding text has to read the frame, so it only works when the converted copy is served from the **same origin** as
the page. Otherwise the box is disabled, and says why in its tooltip.

## Options [#options]

<TypeTable
  type="{
  document: { type: &#x22;WorkspaceDocument&#x22;, description: &#x22;Required. The document to preview.&#x22; },
  queryName: { type: &#x22;string&#x22;, default: '&#x22;_query&#x22;', description: &#x22;The query the preview web service renders the document for.&#x22; },
}"
/>

Outputs: `closed`, and `askFollowUp` (`AskFollowUp`: the document's `title` and `type`, a `placeholder` and
three `suggestions`, already translated).

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The panel says the document cannot be previewed">
    The preview service did not know the id — "This document cannot be previewed." For an uploaded document the
    listing only carries the upload-side id, so the service has nothing to convert until the backend exposes the index id.
  </Accordion>

  <Accordion title="The find box is greyed out">
    The frame is from another origin, so the page may not read its text ("This document cannot be searched from here."). Serve
    the converted copy under the page's own origin, for instance behind a reverse proxy, to enable the search.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="List and detail" href="./list-and-detail.mdx">
    The detail view that opens the panel beside the documents.
  </Card>
</Cards>
