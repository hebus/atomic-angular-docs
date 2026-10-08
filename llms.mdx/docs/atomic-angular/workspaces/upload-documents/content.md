# Upload documents (/docs/atomic-angular/workspaces/upload-documents)

Stage files, send them to a workspace as one batch over tus, and follow each one from upload to indexed — with retries and session recovery.



Uploading goes through `UploadService`: it sends the files to the tus endpoint, then follows the indexing of each
one until the document is in the workspace. `<upload-tracker>` shows that progress, and `UploadDocuments` is the
dialog that stages the files first.

## Minimal example [#minimal-example]

<CodeSample id="upload-documents-basic" title="An upload button and the tracker">
  <Lang value="angular">
    ```ts title="upload.component.ts"
    import { Component } from "@angular/core";
    import { UploadDocuments, UploadTracker, type Workspace } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "upload-example",
      imports: [UploadTracker],
      template: `
        <button (click)="upload()">Upload documents…</button>
        <upload-tracker />
      `,
    })
    export class UploadExample {
      /** A workspace the user can write to, e.g. the one a detail view is showing. */
      workspace!: Pick<Workspace, "id" | "name" | "currentUserRole">;

      upload() {
        void UploadDocuments.call({ workspace: this.workspace, endpoint: "/tus" });
      }
    }
    ```
  </Lang>
</CodeSample>

`UploadDocuments.call()` without an injector needs `provideCallable()` from `@sinequa/galactik` in the providers.
The dialog refuses to open for someone who cannot write to the workspace and ends with `dialog-cancel`.

## How it works [#how-it-works]

The dialog only *stages*: nothing leaves the browser until "Upload" is pressed, so the whole selection goes out as
**one** ingest job instead of each drop starting its own. Dismissing the dialog any other way discards the selection.
Two files with the same name collapse into one, because a document is addressed as `<jobId>/<fileName>` and two
files sharing a name inside a job would collide on the server.

<Mermaid
  chart="sequenceDiagram
  participant U as User
  participant D as UploadDocuments
  participant S as UploadService
  participant T as UploadTrackerStore
  U->>D: drops files, presses Upload
  D->>S: addFiles(workspace, files, endpoint)
  S->>T: track(files)
  S->>S: tus upload, then poll the job status
  S->>T: progress, indexing, done or error"
/>

While a job is moving, the service matches the server's documents listing to the tracked files by job and file name
(the server names a document `/DocUpload/DocUpload/|<containerId>/<fileName>`, not `<jobId>/<fileName>`), and a file
takes the server's id as soon as the listing shows it — that is the id a delete needs. `sent_for_indexing` counts as
`indexing`, and a file completes when its job does. The server only reports indexing per job (indexed files out of
total), so the tracker's uploading and indexing bars show the overall progress of the phase (`UploadTrackerStore.progress()`),
and files being indexed show animated dots rather than the job's percentage. The workspace detail only lists documents
that are indexed or being indexed: transfers and failures stay in the tracker.

The tracker only reads `UploadTrackerStore`, so it shows whatever is in it — which is also how you can drive it in
a test or a demo, without any network.

## Recipes [#recipes]

### Send files without the dialog [#send-files-without-the-dialog]

<CodeSample id="upload-documents-service" title="UploadService.addFiles">
  <Lang value="angular">
    ```ts title="drop.component.ts"
    import { Component, inject } from "@angular/core";
    import { UploadService } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "drop-example",
      template: `<input type="file" multiple (change)="send($event)" />`,
    })
    export class DropExample {
      private readonly uploads = inject(UploadService);

      send(event: Event) {
        const files = Array.from((event.target as HTMLInputElement).files ?? []);
        this.uploads.addFiles({ id: "w1", name: "Legal" }, files, { endpoint: "/tus" });
      }
    }
    ```
  </Lang>
</CodeSample>

`addFiles` returns the tracked id of each file, in order. `cancel(id)`, `retry(id)` and `resumeStalled()` act on
tracked uploads. `watch(workspaceId)` tells the service which workspace is open, so that the status polling is scoped
to it and starts when that workspace already holds documents that are not finished — a page reload loses every
local upload handle, and the listing is then the only way to know. `<workspace-detail>` calls it for the workspace it shows.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The tracker shows nothing after addFiles">
    `<upload-tracker>` has to be in the page: the service only fills the store. `<workspaces-shell>` includes it;
    with the parts, add `<upload-tracker />` once, anywhere that stays on screen.
  </Accordion>

  <Accordion title="An upload is marked failed after the connection came back">
    Uploads retry on their own, with a back-off, and a 401 triggers a silent re-authentication before they resume.
    A failure that persists is shown with a retry button, and the connection banner says whether the library is retrying
    or the session is gone — in which case "Retry" probes the session again.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="List and detail" href="./list-and-detail.mdx">
    Where the upload button lives.
  </Card>
</Cards>
