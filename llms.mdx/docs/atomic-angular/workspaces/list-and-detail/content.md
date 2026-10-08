# List and detail (/docs/atomic-angular/workspaces/list-and-detail)

Lay out the workspace list and a single workspace yourself — each says what the user asked for, and your host decides where it goes.



`<workspace-list>` shows every workspace the user can reach, as a grid or a list; `<workspace-detail>` shows one
workspace and its documents. Use them instead of [`WorkspacesShell`](./workspaces-shell.mdx) when the two belong
in different places of your layout, or when navigation is the router's business.

## Minimal example [#minimal-example]

<CodeSample id="list-and-detail-basic" title="A list that opens a detail">
  <Lang value="angular">
    ```ts title="workspaces.page.ts"
    import { Component, signal } from "@angular/core";
    import { EditWorkspace, UploadTracker, WorkspaceDetail, WorkspaceList } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "workspaces-page",
      imports: [UploadTracker, WorkspaceDetail, WorkspaceList],
      template: `
        <div class="h-[40rem]">
          @if (workspaceId(); as id) {
            <workspace-detail [workspaceId]="id" uploadEndpoint="/tus" (back)="workspaceId.set(null)" (deleted)="workspaceId.set(null)" />
          } @else {
            <workspace-list (opened)="workspaceId.set($event.id)" (createRequested)="add()" />
          }
        </div>
        <upload-tracker />
      `,
    })
    export class WorkspacesPage {
      protected readonly workspaceId = signal<string | null>(null);

      protected async add() {
        const result = await EditWorkspace.call({ mode: "add" });
        if (typeof result === "object" && "workspace" in result) this.workspaceId.set((result["workspace"] as { id: string }).id);
      }
    }
    ```
  </Lang>
</CodeSample>

`EditWorkspace.call()` without an injector needs `provideCallable()` from `@sinequa/galactik` in the application's
providers; the components themselves pass their own injector and never do.

## How it works [#how-it-works]

Both read `WorkspacesStore`, which is shared: the workspace and its documents are cached, so opening the same one
twice is instant, and a change made anywhere shows everywhere.

* **The list** refreshes each time it is shown — workspaces created by others since the last time appear, and
  the document counts match the server. The list already on screen stays until the answer lands, and a failure leaves
  it untouched behind an inline error. It filters by tab (all, editor, reader) and by search, and offers multi-selection
  and deletion for the workspaces the user can write to.
* **The detail** reads the workspace and its documents, with search, multi-selection, upload, edit, share and delete.
  Only someone who can write to the workspace sees the edit, share, delete, upload and select controls.

## Options [#options]

<TypeTable
  type="{
  workspaceId: { type: &#x22;string&#x22;, description: &#x22;Required on <workspace-detail>. The workspace shown; changing it loads the other one.&#x22; },
  uploadEndpoint: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;<workspace-detail>: the tus endpoint uploads go to.&#x22; },
  previewedDocumentId: { type: &#x22;string | null&#x22;, default: &#x22;null&#x22;, description: &#x22;<workspace-detail>: the document open in the preview. A two-way model, so the host can open one and is told when it changes.&#x22; },
  queryName: { type: &#x22;string&#x22;, default: '&#x22;_query&#x22;', description: &#x22;<workspace-detail>: the query the preview web service renders a document for.&#x22; },
}"
/>

`<workspace-list>` has two outputs: `opened` (the `Workspace` chosen) and `createRequested`. `<workspace-detail>` has
four: `back`, `deleted` (the `Workspace`), `workspaceUpdated` (the `Workspace` as the server now has it) and
`askFollowUp` (`AskFollowUp`).

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Add workspace does nothing">
    The list never creates a workspace itself: it emits `createRequested` and leaves the dialog to its host. Handle the
    output — as above, with `EditWorkspace.call({ mode: "add" })`.
  </Accordion>

  <Accordion title="The list or the detail is cut off at the bottom of the page">
    Both fill their parent and scroll inside it (`h-full`). Give the parent a height, or a flex layout with
    `min-h-0 flex-1`.
  </Accordion>

  <Accordion title="No edit, share, upload or select buttons on a workspace">
    The user is a reader of that workspace: those controls are for creators and owners, and the server refuses the
    rest anyway.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Upload documents" href="./upload-documents.mdx">
    What the upload button and the tracker do.
  </Card>

  <Card title="Share a workspace" href="./share-a-workspace.mdx">
    The "Manage access" dialog the detail opens.
  </Card>
</Cards>
